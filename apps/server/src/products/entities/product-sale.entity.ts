import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PriceColumn } from '../../common';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product-sales' })
export class ProductSaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'productID' })
  @ManyToOne(() => ProductEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
  })
  product: ProductEntity;

  @PriceColumn()
  sale: number;

  @Column()
  quantity: number;
}
