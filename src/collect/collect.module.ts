import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectSchema } from 'src/schemas/collect.schema';
import { TeamSchema } from '../schemas/team.schema';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Collect', schema: CollectSchema }]),
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]),
    TeamModule
  ],
  controllers: [CollectController],
  providers: [CollectService],
  exports: [CollectService]
})
export class CollectModule {}
