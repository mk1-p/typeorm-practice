import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn
} from "typeorm";


/**
 * <Basic Extends>
 * 일반적인 상속 구조
 * 각각 단일 테이블로 구성되며
 * 공통 데이터 클래스인 BaseModel 컬럼들을 상속받아 정의하게 된다.
 */
export class BaseModel{
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel{
  @Column()
  name: string;
}

@Entity()
export class CarModel extends BaseModel{
  @Column()
  brand: string;
}


/**
 * <Table Inheritance>
 * 하나의 테이블에 등록하여 사용하는 경우!
 * @TableInheritance 에 컬럼 타입을 등록하고 사용한다.
 * 실제 테이블이 만들어지면 SingleBaseModel 의 테이블 명을 따라가고
 * @ChildEntity 에 해당하는 컬럼들이 모두 한 테이블에 등록이 된다.
 * 해당 데이터의 구분은 위에서 언급했듯이 @TableInheritance 의 type에 의해 정의되어진다.
 */
@Entity()
@TableInheritance({
  column:{
    name: 'type',
    type: 'varchar',
  }
})
export class SingleBaseModel{ // Entities 등록이 필요하다.
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel{
  @Column()
  brand: string;
}

@ChildEntity()
export class AirportModel extends SingleBaseModel{
  @Column()
  country: string;
}