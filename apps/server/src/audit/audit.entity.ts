import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {AuditType} from "./audit.types";
import {BrandEntity} from "../categories";
import {UserEntity} from "../users";
import {OrderEntity} from "../orders";
import {ProductEntity} from "../products";

@Entity({ name: 'audit' })
export class AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: AuditType;

  @RelationId((audit: AuditEntity) => audit.user)
  @Column({ nullable: true })
  userID: number;

  @JoinColumn({ name: 'userID' })
  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  user: UserEntity;

  @RelationId((audit: AuditEntity) => audit.order)
  @Column({ nullable: true })
  orderID: number;

  @JoinColumn({ name: 'orderID' })
  @ManyToOne(() => OrderEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  order: OrderEntity;

  @RelationId((audit: AuditEntity) => audit.product)
  @Column({ nullable: true })
  productID: number;

  @JoinColumn({ name: 'productID' })
  @ManyToOne(() => ProductEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  product: ProductEntity;

  @Column('json', { nullable: true })
  details?: Record<string, any>;

  @CreateDateColumn()
  created: Date;
}