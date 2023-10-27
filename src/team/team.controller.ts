import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get('team:id')
  TeamInfo(@Param('id') id: string) {
    return this.teamService.TeamInfo(id);
  }

  @Get('user:id')
  findMyTeams(@Param('id') id: string) {
    return this.teamService.findMyTeams(id);
  }
}
