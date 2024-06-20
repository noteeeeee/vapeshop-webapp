import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PriceColumn } from '../../common';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product-prices' })
export class ProductPriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'productID' })
  @ManyToOne(() => ProductEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true
  })
  product: ProductEntity;

  @PriceColumn()
  price: number;

  @Column()
  quantity: number;
}
