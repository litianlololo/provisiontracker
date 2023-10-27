import { Model } from 'mongoose';
import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team,TeamDocument  } from '../schemas/team.schema';
import { UserService } from '../user/user.service';
import { UserDocument } from 'src/schemas/user.schema';

class AddMemberDto{
  readonly teamID: string;
  readonly userID: string;
}


@Injectable()
export class TeamService {
  constructor(
    @InjectModel('Team') private teamModel: Model<TeamDocument>, 
    @InjectModel('User') private userModel: Model<UserDocument>,
    private userService: UserService,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const {  ...teamData } = createTeamDto;
  
    // 检查 admin_id 对应的用户是否存在
    const adminUser = await this.userService.findById(createTeamDto.admin_id);
    if (!adminUser) {
      throw new NotFoundException(`Admin user with ID ${createTeamDto.admin_id} not found.`);
    }
  
    const createdTeam = new this.teamModel(teamData);
    //检查成员是否存在
    for (const member of teamData.members) {
      const TeamMemberID = await this.userService.findById(member);
      if (!TeamMemberID) {
        throw new NotFoundException(`TeamMember with ID ${member} not found.`);
      }
    }
    const result = await createdTeam.save();
    return result;
  }
  
  async AddMember(addMember: AddMemberDto) {
    const team = await this.teamModel.findById(addMember.teamID);
    if(!team){
      return {
        status: 404,
        message: 'team not found' 
      }
    }
    const user = await this.userModel.findById(addMember.userID);
    // Push the userID to the members array
    console.log(addMember.userID);
    console.log(user);
    if(user === null){
      return {
        status: 404,
        message: 'user not found' 
      }
    } 
    team.members.push(addMember.userID);

  try {
    // Save the updated team to the database
    const updatedTeam = await team.save();
    return {
      status: 200,
      message: 'Member added to the team',
      team: updatedTeam
    };
  } catch (error) {
    return {
      status: 500,
      message: 'Error while updating the team'
    };
  }

  }
  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  async findMyTeams(id: string) {
    const owned = await this.teamModel.find({ admin_id: id});
    const joined = await this.teamModel.find({ members : { $in: [id] }});
    const teamsData = {
      owned,
      joined,
    };
    return teamsData;
  }

  async TeamInfo(id: string) {
    const team = await this.teamModel.findById(id);
    let ok = false;
    if(team === null) return {
      status: 404,
      message: 'team not found' 
    };
    ok=true;
    let users = [];
    for(let item of team.members) {
      const user = await this.userModel.findById(item);
      users.push(user);
    }
    const teamData = {
      team,
      users,
    };
    return teamData;
  }
}
