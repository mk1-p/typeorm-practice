import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.entity";
import { TagModel } from "./tag.entity";

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

  /**
   * @ManyToMany
   * N:M 관계를 나타낸다.
   * @JoinTable Annotation을 추가해줌으로써 중간 테이블을 만들어야한다.
   * 연관관계 둘중 하나만 만듷어주면된다.
   * Spring JPA 에서는 ManyToMany 를 실무에서 사용하지 않도록 하는데...
   * 작동 방식 및 순환참조의 위험성이 없는지 체크해보자
   */
  @ManyToMany(() => TagModel, (tag) => tag.posts)
  @JoinTable()
  tags: TagModel[];

  @Column()
  title: string;
}