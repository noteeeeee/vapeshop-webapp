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
import { BrandEntity, CategoryEntity } from '../../categories';
import { VirtualColumn } from '../../common';
import { ProductFilterEntity } from './product-filter.entity';
import {ProductPriceEntity} from "./product-price.entity";

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

  @RelationId((product: ProductEntity) => product.brand)
  @Column({ nullable: true })
  brandID: number;

  @JoinColumn({ name: 'brandID' })
  @ManyToOne(() => BrandEntity, {
    onDelete: 'SET NULL',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  brand: BrandEntity;

  @OneToMany(() => ProductFilterEntity, (filter) => filter.product, {
    orphanedRowAction: "delete",
    persistence: false,
    cascade: true,
    nullable: true,
  })
  filters: ProductFilterEntity[];

  @OneToMany(() => ProductPriceEntity, (price) => price.product, {
    orphanedRowAction: "delete",
    persistence: false,
    cascade: true,
    nullable: true,
  })
  prices: ProductPriceEntity[];

  @VirtualColumn()
  purchased: number;

  @Column({ nullable: true })
  sale: number;

  @Column({ nullable: true })
  image: string;

  @UpdateDateColumn()
  updated: Date;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created: Date;
}
