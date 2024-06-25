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
import { ProductEntity } from './product.entity';
import { CategoryFilterEntity } from '../../categories';

@Entity({ name: 'product-filters' })
export class ProductFilterEntity {
  @PrimaryColumn({ name: 'productID' })
  productID: number;

  @JoinColumn({ name: 'productID' })
  @ManyToOne(() => ProductEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
  })
  product: ProductEntity;

  @RelationId((filter: ProductFilterEntity) => filter.filter)
  @PrimaryColumn()
  filterID: number;

  @JoinColumn({ name: 'filterID' })
  @ManyToOne(() => CategoryFilterEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
  })
  filter: CategoryFilterEntity;

  @Column()
  value: string;
}
