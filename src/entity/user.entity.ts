import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn
} from "typeorm";

enum Role{
  USER = 'user',
  ADMIN = 'admin',
}


/**
 * <Column Annotation & Property>
 */
@Entity()
export class UserModel{
  // ID
  // @PrimaryGeneratedColumn() 자동으로 생성되는 PK 값 : Auto Increment
  // @PrimaryColumn() 일반적인 PK 설정
  // @PrimaryGeneratedColumn('uuid') 자동 UUID 생성
  @PrimaryGeneratedColumn()
  id: number;
  // 제목
  @Column({
    // 데이터베이스에서 인지하는 컬럼 타입
    type: 'varchar',
    // 데이터베이스 컬럼 이름
    name: 'title',
    // 값의 길이
    // 입력할 수 있는 글자의 길이가 300
    length: 300,
    // null이 가능한지
    nullable: true,
    // false 면 처음 저장할때만 값 지정 가능
    // 이후에는 값 변경 불가능
    update: false,
    // find()를 실행할때 기본으로 값을 불러올지 설정
    // 이 컬럼을 기본 find 시 감출 수 있다.
    // find({
    //  select: {
    //     title: true
    //  }
    // }) 시에 보임
    // 기본 값 true
    select: true,
    // 기본 값 설정
    default: 'default value',
    // 유니크 값인지 설정
    unique: false,
  })
  title: string;

  // Enum Type 컬럼
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터 생성 일자
  // 데이터 생성시 자동으로 생성 날짜를 등록
  @CreateDateColumn()
  createAt: Date;
  // 데이터 업데이트 일자
  // 데이터 업데이트 시 자동으로 날짜 등록
  @UpdateDateColumn()
  updateAt: Date;
  // 업데이트 될때마다 숫자가 올라감
  // save() 횟수를 기록한다고 보면됨
  @VersionColumn()
  version: number;
  // @Generated('increment') 1씩 자동으로 증가하는 컬럼
  // @Generated('uuid') 자동 uuid 생성
  // @Column() Annotation과 같이 사용해야한다.
  @Column()
  @Generated('increment')
  additionalId: number;

}