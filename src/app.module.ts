import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TeamModule } from './team/team.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://110.40.206.206:27017/provisiontracker', {
      user: 'litianlololo',
      pass: '888htg328',
    }),
    UserModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
