
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCollectDto } from './dto/create-collect.dto';
import { UpdateCollectDto } from './dto/update-collect.dto';
import { Collect, CollectDocument } from '../schemas/collect.schema';
import { TeamService } from '../team/team.service';
import { TeamDocument } from 'src/schemas/team.schema';

@Injectable()
export class CollectService {
  // 注册Schema后，可以使用 @InjectModel() 装饰器将 Collect 模型注入到 CollectService 中:
  constructor(
    @InjectModel('Collect') private CollectModel: Model<CollectDocument>,
    @InjectModel('Team') private teamModel: Model<TeamDocument>,
    private teamService: TeamService,
  ) {}

  async create(createCollectDto: CreateCollectDto) {
    let createcollect = new this.CollectModel(createCollectDto);
    const temp = await createcollect.save();
    const members = await this.findAllmembers(createCollectDto.team); // 使用await等待Promise解析
    console.log(members);
    for (const memberID of members) { // 应该使用of来迭代数组
      const Ncollect = new this.CollectModel(createCollectDto);
      Ncollect.owner = memberID;
      await Ncollect.save(); // 这里你又保存了，但是这会覆盖之前的owner
    }
    return {
      status: 200,
      message: 'collect created',
    }
  }

  async findAllmembers(teamid: string) :Promise<string[]> {
    const team = await this.teamModel.findById(teamid);
    //console.log(team.members);
    return team.members;
  }

  async findMyCollects(id: string) {
    const owned = await this.CollectModel.find({ admin: id, owner: id});
    const joined = await this.CollectModel.find({ owner : id, admin: { $ne: id }});
    const CollectData = {
      owned,
      joined,
    };
    return CollectData;
  }

  findAll() {
    return `This action returns all collect`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collect`;
  }

  update(id: number, updateCollectDto: UpdateCollectDto) {
    return `This action updates a #${id} collect`;
  }

  remove(id: number) {
    return `This action removes a #${id} collect`;
  }
}
