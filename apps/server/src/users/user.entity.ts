import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PriceColumn } from '../common';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn('bigint')
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  isActive: boolean;

  @Column({ nullable: true })
  isAdmin: boolean;

  @Column({ nullable: true })
  isBanned: boolean;

  @PriceColumn({ default: 0 })
  balance: number;

  @Column({ nullable: true })
  discount: number;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;
}
