import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {BrandEntity, CategoryEntity, CategoryFilterEntity} from './entities';
import {
  BrandsService,
  CategoriesService,
  CategoryFiltersService,
} from './services';
import {
  BrandsController,
  CategoriesController,
  CategoryFiltersController,
} from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, BrandEntity, CategoryFilterEntity])],
  providers: [CategoriesService, BrandsService, CategoryFiltersService],
  controllers: [
    CategoriesController,
    BrandsController,
    CategoryFiltersController,
  ],
  exports: [CategoriesService, BrandsService, CategoryFiltersService],
})
export class CategoriesModule {}
