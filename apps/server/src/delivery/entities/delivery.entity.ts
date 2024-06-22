import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users';
import { EncryptedColumn } from '../../common';
import { DeliveryMethod } from '../delivery.types';

@Entity({ name: 'delivery' })
export class DeliveryEntity {
  @PrimaryColumn({ name: 'userID' })
  userID: number;

  @JoinColumn({ name: 'userID' })
  @OneToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  method: DeliveryMethod;

  @EncryptedColumn()
  phone: string;

  @EncryptedColumn({ nullable: true })
  fullName: string;

  @EncryptedColumn({ nullable: true })
  region: string;

  @EncryptedColumn({ nullable: true })
  city: string;

  @EncryptedColumn({ nullable: true })
  zipCode: string;

  @EncryptedColumn()
  address: string;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;
}
