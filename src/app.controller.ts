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

      // 어떤 프로퍼티를 선택할지
      // 기본은 모든 프로퍼티를 가져온다.
      // 만약에 select를 정의하지않으면 모든 프로퍼티를 가져온다.
      // 정의하면 정의된 프로퍼티들만 가져온다.
      select: {
        id: true,
        createAt: true,
        updateAt: true,
        profile: {
          id: true,
        },
      },
      // 필텋링 조건
      // 기본적으로 {} 인경우 and 조건
      // 리스트로 조건을 넣으면 or 조건
      where: [
        {
          id: 3,
        },
        {
          version: 1,
        },
        {
          profile: {
            id: 1,
          },
        },
      ],
      // {
      //   id: 4,
      //   version: 1,
      // },
      // 관계를 가져오는법
      // true인 경우 select, where 조건에도 사용가능
      relations:{
        profile: true,
      },
      // 정렬 기능
      order: {
        id: 'ASC',
      },
      // 처음 몇개의 데이터를 스킵할것인지.
      skip: 0,
      // 테이블에서 몇개를 가져올지
      // 0 인 경우 모든 데이터를 가져옴
      take: 0,
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
