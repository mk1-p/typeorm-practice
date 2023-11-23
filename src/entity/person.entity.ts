import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Entity Embedding
// Spring JPA @Embedded와 유사
// Embedding 하고자 하는 클래스는 엔티티 선언을 하지 않는다.
/**
 * <Entity Embedding>
 * Spring JPA @Embedded 와 유사
 * Embedding 하고자 하는 클래스는 엔티티 선언을 하지 않는다.
 */
export class Name{
  @Column()
  first: string;
  @Column()
  last: string;
}

@Entity()
export class StudentModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column(() => Name)
  name: Name;
  @Column()
  class: string;
}

@Entity()
export class TeacherModel {
  @PrimaryGeneratedColumn()
  id: number;
  @Column(() => Name)
  name: Name;
  @Column()
  class: string;
  @Column()
  salary: number;
}