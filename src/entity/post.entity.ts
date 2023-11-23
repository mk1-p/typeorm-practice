import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.entity";

@Entity()
export class PostModel{
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * @ManyToOne N:1 의 연관관계
   * user = 1, post = n
   * 별도의 JoinColumn을 작성하지 않아도 자동으로 외래키 지정이 된다.
   */
  @ManyToOne(() => UserModel, (user) => user.posts)
  author: UserModel;
  @Column()
  title: string;
}