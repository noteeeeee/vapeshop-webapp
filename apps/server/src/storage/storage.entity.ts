import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'storage',
})
export class StorageEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  filename: string;

  @Column()
  originalFilename: string;

  @Column({ nullable: true })
  expireIn: Date;

  @CreateDateColumn()
  created: string;
}
