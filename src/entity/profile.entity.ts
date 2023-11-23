import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.entity";


@Entity()
export class ProfileModel {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * <OneToOne>
   * User - Profile 1:1 연관관계를 나타내는 방법
   * @OneToOne - inverseSite 파라메터를 반대 엔티티에 정의된 부분을 선택해준다.
   * @JoinColumn 을 작성해주면, 외래키 컬럼이 추가된다.
   */
  @OneToOne(() => UserModel, (user) => user.profile)
  @JoinColumn() // 연관관계의 ID 값을 가지고 있을 테이블에 만들어준다.
  user: UserModel;

  @Column()
  profileImg: string;
}