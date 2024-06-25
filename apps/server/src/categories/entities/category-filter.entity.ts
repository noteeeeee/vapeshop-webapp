import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'filters' })
export class CategoryFilterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @RelationId((product: CategoryFilterEntity) => product.category)
  @Column({ nullable: true })
  categoryID: number;

  @JoinColumn({ name: 'categoryID' })
  @ManyToOne(() => CategoryEntity, {
    onDelete: 'CASCADE',
    persistence: false,
    cascade: true,
    nullable: true,
  })
  category: CategoryEntity;
}
