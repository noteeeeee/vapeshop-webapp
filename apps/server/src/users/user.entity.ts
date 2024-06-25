import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  RelationId,
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

  @RelationId((user: UserEntity) => user.referrer)
  @Column({ nullable: true })
  referrerID: number;

  @JoinColumn({ name: 'referrerID' })
  @ManyToOne(() => UserEntity, {
    onDelete: 'SET NULL',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  referrer: UserEntity;

  @PriceColumn({ default: 0 })
  referralBalance: number;

  @Column({ nullable: true })
  discount: number;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;
}
