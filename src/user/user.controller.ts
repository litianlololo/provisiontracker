import { Controller, Get, Post, Body, Patch, Param, Delete,Res  } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express'; // 导入 Express 的 Response 对象

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('check')
  async checkUser(@Body() body: { id: string }, @Res() res: Response) {
    const { id } = body;
    // 使用 userService 或者您的数据库访问逻辑来检查用户是否存在
    const user = await this.userService.findById(id);
    if(user){
      res.json({ name: user.name, id: user.id, avatar: user.avatar, company: user.company});
    } else {
      // 如果用户不存在，返回适当的响应，例如 404 Not Found
      res.status(404).json({ message: 'User not found' });
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @Post("members")
  findCompanyMembers(@Body() id)
  {
    // return id;
    return this.userService.findCompanyMembers(id.id);
  }
}
