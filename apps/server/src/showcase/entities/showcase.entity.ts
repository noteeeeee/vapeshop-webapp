import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { UserEntity } from '../../users';
import { OrderEntity } from '../../orders';
import { ProductEntity } from '../../products';
import { ShowcaseOperation } from '../showcase.types';
import {InventoryEntity} from "./inventory.entity";

@Entity({ name: 'showcase-operations' })
export class ShowcaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: ShowcaseOperation;

  @RelationId((audit: ShowcaseEntity) => audit.user)
  @Column({ nullable: true })
  userID?: number;

  @JoinColumn({ name: 'userID' })
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  user?: UserEntity;

  @RelationId((audit: ShowcaseEntity) => audit.order)
  @Column({ nullable: true })
  orderID?: number;

  @JoinColumn({ name: 'orderID' })
  @ManyToOne(() => OrderEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  order?: OrderEntity;

  @RelationId((audit: ShowcaseEntity) => audit.product)
  @Column({ nullable: true })
  productID?: number;

  @JoinColumn({ name: 'productID' })
  @ManyToOne(() => ProductEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  product?: ProductEntity;

  @OneToMany(() => InventoryEntity, (inventoryOperation) => inventoryOperation.showcase)
  inventoryOperations?: InventoryEntity[];

  @Column('json', { nullable: true })
  details?: Record<string, any>;

  @CreateDateColumn()
  created: Date;
}
