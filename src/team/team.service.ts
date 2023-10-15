import { Model } from 'mongoose';
import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team,TeamDocument  } from '../schemas/team.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel('Team') private teamModel: Model<TeamDocument>,
    private userService: UserService,
  ) {}
  
  
  async create(createTeamDto: CreateTeamDto) {
    const { members, ...teamData } = createTeamDto;
  
    // 检查 admin_id 对应的用户是否存在
    const adminUser = await this.userService.findById(createTeamDto.admin_id);
    if (!adminUser) {
      throw new NotFoundException(`Admin user with ID ${createTeamDto.admin_id} not found.`);
    }
  
    const createdTeam = new this.teamModel(teamData);

    const memberUser = []; // 用于存储成员
    for (const member of members) {
      const userDto = {
        name: member.name,
        pwd: member.pwd,
        company: createTeamDto.company,
        // 其他成员属性
      };
      const tmp = await this.userService.create(userDto)

      memberUser.push({
        name:tmp.name,
        id:tmp.id,
        pwd: tmp.pwd
      });
    }
    
    createdTeam.members = memberUser; // 将成员添加到 Team 的 members 属性
    const result = await createdTeam.save();
    return result;
  }

  findOne(id: number) {
    return `This action returns a #${id} team`;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

}
