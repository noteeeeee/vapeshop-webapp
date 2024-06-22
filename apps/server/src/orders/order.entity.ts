import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../users';
import { CartEntity } from '../cart';
import { OrderStatus } from './order.types';
import { EncryptionJsonTransformer, VirtualColumn } from '../common';
import { DeliveryDto } from '../delivery';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((order: OrderEntity) => order.user)
  @Column('bigint')
  userID: number;

  @JoinColumn({ name: 'userID' })
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: ['remove'],
  })
  user: UserEntity;

  @OneToMany(() => CartEntity, (item) => item.order, {
    persistence: false,
  })
  items: CartEntity[];

  @Column()
  status: OrderStatus;

  @VirtualColumn()
  totalPrice: number;

  @VirtualColumn()
  totalPriceWithSale: number;

  @Column({
    type: 'text',
    transformer: new EncryptionJsonTransformer(),
  })
  deliveryData: DeliveryDto;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;

  @Column({ type: 'timestamp', nullable: true })
  expire: Date;
}
