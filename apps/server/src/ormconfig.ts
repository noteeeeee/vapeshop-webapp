import { DataSource } from 'typeorm';
import { EnvConfig } from '@vapeshop-webapp/config';
import { StorageEntity } from './storage';
import { UserEntity } from './users';
import {
  BrandEntity,
  CategoryEntity,
  CategoryFilterEntity,
} from './categories';
import { DeliveryEntity } from './delivery';
import { CartEntity } from './cart';
import { OrderEntity } from './orders';
import {
  ProductEntity,
  ProductFilterEntity,
  ProductSaleEntity,
} from './products';
import { AuditEntity } from './audit';

export default new DataSource({
  type: EnvConfig.DATABASE_TYPE as any,
  host: EnvConfig.DATABASE_HOST,
  port: EnvConfig.DATABASE_PORT,
  username: EnvConfig.DATABASE_USER,
  password: EnvConfig.DATABASE_PASSWORD,
  database: EnvConfig.DATABASE_NAME,
  entities: [
    StorageEntity,
    UserEntity,
    BrandEntity,
    CategoryEntity,
    CategoryFilterEntity,
    ProductEntity,
    ProductSaleEntity,
    ProductFilterEntity,
    DeliveryEntity,
    CartEntity,
    OrderEntity,
    AuditEntity,
  ],
  synchronize: EnvConfig.DEVELOPMENT,
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
});
