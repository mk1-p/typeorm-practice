import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from './app.service';
import { UserModel } from "./entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileModel } from "./entity/profile.entity";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('users')
  async getUser(){
    return this.userRepository.find({
      relations:{
        profile: true,
      }
    });
  }

  @Post('users/profile')
  async createUserAndProfile(){
    const user = await this.userRepository.save({
      email: 'asfqw@gmai.com',
    });
    const profile = await this.profileRepository.save({
      profileImg: 'asf.jpg',
      user,
    });

    return user;
  }


}
