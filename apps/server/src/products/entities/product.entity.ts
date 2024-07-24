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
import { CategoryEntity } from '../../categories';
import { PriceColumn, VirtualColumn } from '../../common';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @RelationId((product: ProductEntity) => product.category)
  @Column({ nullable: true })
  categoryID: number;

  @JoinColumn({ name: 'categoryID' })
  @ManyToOne(() => CategoryEntity, {
    onDelete: 'SET NULL',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  category: CategoryEntity;

  @Column({ nullable: true })
  flavor: string;

  @Column({ nullable: true })
  strength: string;

  @Column({ nullable: true })
  nicotine: string;

  @Column({ nullable: true })
  brand: string;

  @VirtualColumn()
  purchased: number;

  @PriceColumn()
  price: number;

  @PriceColumn()
  buyingPrice: number;

  @Column({ nullable: true })
  sale: number;

  @Column({ nullable: true })
  quantitySales_5: number;

  @Column({ nullable: true })
  quantitySales_10: number;

  @Column({ nullable: true })
  quantitySales_20: number;

  @Column({ nullable: true })
  quantitySales_40: number;

  @Column({ nullable: true })
  quantitySales_100: number;

  @Column({ nullable: true })
  image: string;

  @Column({ default: 0 })
  inStock: number;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created: Date;
}
