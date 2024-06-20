import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'categories' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  image: string;

  @Column({ nullable: true })
  index: number;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;
}
