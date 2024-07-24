import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { ShowcaseEntity } from "./showcase.entity";
import { ProductEntity } from "../../products";

@Entity({ name: 'inventory-operations' })
export class InventoryEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  showcaseOperationId: number;

  @ManyToOne(() => ShowcaseEntity, (showcase) => showcase.inventoryOperations, {
    onDelete: 'CASCADE',
  })
  showcase: ShowcaseEntity;

  @Column()
  productId: number;

  @ManyToOne(() => ProductEntity, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;

  @Column('int')
  newStock: number;

  @Column('int')
  oldStock: number;

  @CreateDateColumn()
  created: Date;
}
