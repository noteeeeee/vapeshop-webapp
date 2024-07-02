import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BrandDto, CategoryDto } from '../../categories';
import { ProductEntity } from '../entities';
import { ProductSaleDto, UpdateProductPriceDto } from './product-sale.dto';
import { ProductFilterDto, UpdateProductFilterDto } from './product-filter.dto';
import {
  IsArray,
  IsInt, IsNumber,
  IsOptional, IsPositive,
  IsString,
  Min,
} from 'class-validator';

@Exclude()
export class ProductDto {
  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the product',
  })
  id: number;

  @Expose()
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  name: string;

  @Expose()
  @Type(() => CategoryDto)
  @ApiProperty({
    type: CategoryDto,
    description: 'The category the product belongs to',
    nullable: true,
  })
  category: CategoryDto;

  @Expose()
  @Type(() => BrandDto)
  @ApiProperty({
    type: BrandDto,
    description: 'The brand the product belongs to',
    nullable: true,
  })
  brand: BrandDto;

  @Expose()
  @Type(() => ProductFilterDto)
  @ApiProperty({
    type: [ProductFilterDto],
    description: 'The filters associated with the product',
    nullable: true,
  })
  filters: ProductFilterDto[];

  @Expose()
  @Type(() => ProductSaleDto)
  @ApiProperty({
    type: () => [ProductSaleDto],
    description: 'The prices associated with the product',
    nullable: true,
  })
  quantitySales: ProductSaleDto[];

  @Expose()
  @ApiProperty({
    example: 100,
    description: 'The number of times the product has been purchased',
  })
  purchased: number;

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The price of the product',
  })
  price: number;

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The price of the product',
  })
  buyingPrice: number;

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The sale percentage of the product',
    nullable: true,
  })
  sale: number;

  @Expose()
  @ApiProperty({
    description: 'The storage image ID of the product',
    nullable: true,
  })
  image: string;

  @Expose()
  @ApiProperty({
    example: 10,
    description: 'The number of items in stock',
  })
  inStock: number;

  @Expose()
  @ApiProperty({
    example: '2024-06-19T12:34:56.789Z',
    description: 'The date when the product was last updated',
  })
  updated: Date;

  @Expose()
  @ApiProperty({
    example: '2024-06-19T12:34:56.789Z',
    description: 'The date when the product was created',
  })
  created: Date;

  constructor(partial: Partial<ProductEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class CreateProductDto {
  @Expose()
  @IsString()
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  name: string;

  @Expose()
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    description: 'The ID of the category the product belongs to',
  })
  categoryID?: number;

  @Expose()
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    example: 1,
    description: 'The ID of the brand the product belongs to',
  })
  brandID?: number;

  @Expose()
  @Type(() => UpdateProductFilterDto)
  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    type: () => [UpdateProductFilterDto],
    description: 'The filters associated with the product',
  })
  filters?: UpdateProductFilterDto[];

  @Expose()
  @Type(() => UpdateProductPriceDto)
  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    type: () => [UpdateProductPriceDto],
    description: 'The prices associated with the product',
  })
  quantitySales?: UpdateProductPriceDto[];

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The price of the product',
  })
  price: number;

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The price of the product',
  })
  buyingPrice: number;

  @Expose()
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    example: 20,
    description: 'The sale percentage of the product',
  })
  sale?: number;

  @Expose()
  @ApiPropertyOptional({ description: 'The image URL of the product' })
  image?: string;

  @Expose()
  @IsInt()
  @ApiPropertyOptional({
    example: 10,
    description: 'The number of items in stock',
  })
  inStock: number;
}

@Exclude()
export class UpdateProductDto {
  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'Product Name',
    description: 'The name of the product',
  })
  name?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    example: 1,
    description: 'The ID of the category the product belongs to',
  })
  categoryID?: number;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 1,
    description: 'The ID of the brand the product belongs to',
  })
  brandID?: number;

  @Expose()
  @Type(() => UpdateProductFilterDto)
  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    type: () => [UpdateProductFilterDto],
    description: 'The filters associated with the product',
  })
  filters?: UpdateProductFilterDto[];

  @Expose()
  @Type(() => UpdateProductPriceDto)
  @IsOptional()
  @IsArray()
  @ApiPropertyOptional({
    type: () => [UpdateProductPriceDto],
    description: 'The prices associated with the product',
  })
  quantitySales?: UpdateProductPriceDto[];

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The price of the product',
  })
  price: number;

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The price of the product',
  })
  buyingPrice: number;

  @Expose()
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    example: 20,
    description: 'The sale percentage of the product',
  })
  sale?: number;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The image URL of the product',
    nullable: true,
    required: false,
  })
  image?: string;

  @Expose()
  @IsInt()
  @ApiPropertyOptional({
    example: 10,
    description: 'The number of items in stock',
  })
  inStock: number;
}

@Exclude()
export class UpdateStockDto {
  @Expose()
  @ApiProperty({
    example: 10,
    description: 'The quantity to increment or decrement',
  })
  @IsInt()
  @Min(1)
  quantity: number;

  @Expose()
  @ApiProperty({
    example: 5.5,
    description: 'The buying price of the new stock',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  buyingPrice?: number;

  @Expose()
  @ApiProperty({
    example: 7.5,
    description: 'The selling price of the new stock',
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;
}

