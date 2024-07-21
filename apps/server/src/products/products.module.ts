import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ProductEntity,
  // ProductFilterEntity,
  ProductSaleEntity,
} from './entities';
import { ProductsService } from './products.service';
import { ProductsController } from './prodcuts.controller';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      // ProductFilterEntity,
      ProductSaleEntity,
    ]),
    CategoriesModule,
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
