import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from '../products';
import { UserEntity } from '../users';
import { PriceColumn } from '../common';
import {OrderEntity} from "../orders";

@Entity({
  orderBy: {
    created: 'ASC',
  },
  name: "cart"
})
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @RelationId((cart: CartEntity) => cart.product)
  @Column()
  productID: number;

  @RelationId((cart: CartEntity) => cart.user)
  @Column('bigint')
  userID: number;

  @JoinColumn({ name: 'productID' })
  @ManyToOne(() => ProductEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
  })
  product: ProductEntity;

  @JoinColumn({ name: 'userID' })
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: ['remove'],
  })
  user: UserEntity;

  @Column()
  quantity: number;

  @RelationId((cart: CartEntity) => cart.order)
  @Column({ nullable: true })
  orderID: number;

  @JoinColumn({ name: 'orderID' })
  @ManyToOne(() => OrderEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: ['remove'],
    nullable: true,
  })
  order: OrderEntity;

  @PriceColumn({ nullable: true })
  price: number;

  @Column({ nullable: true })
  sale: number;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn()
  created: Date;
}
