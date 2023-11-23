import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "./entity/user.entity";
import { StudentModel, TeacherModel } from "./entity/person.entity";
import { ProfileModel } from "./entity/profile.entity";
import { PostModel } from "./entity/post.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, ProfileModel, PostModel]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      username: 'postgres',
      password: 'postgres',
      database: 'typeormstudy',
      entities: [UserModel, StudentModel, TeacherModel, ProfileModel, PostModel],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
