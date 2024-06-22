import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BrandDto, CategoryDto } from '../../categories';
import { ProductEntity } from '../entities';
import { ProductSaleDto, UpdateProductPriceDto } from './product-sale.dto';
import { ProductFilterDto, UpdateProductFilterDto } from './product-filter.dto';

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
  prices: ProductSaleDto[];

  @Expose()
  @ApiProperty({
    example: 100,
    description: 'The number of times the product has been purchased',
  })
  purchased: number;

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
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The ID of the category the product belongs to',
    nullable: true,
  })
  categoryID?: number;

  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The ID of the brand the product belongs to',
    nullable: true,
  })
  brandID?: number;

  @Expose()
  @Type(() => UpdateProductFilterDto)
  @ApiProperty({
    type: () => [UpdateProductFilterDto],
    description: 'The filters associated with the product',
    nullable: true,
  })
  filters?: UpdateProductFilterDto[];

  @Expose()
  @Type(() => UpdateProductPriceDto)
  @ApiProperty({
    type: () => [UpdateProductPriceDto],
    description: 'The prices associated with the product',
    nullable: true,
  })
  quantitySales?: UpdateProductPriceDto[];

  @Expose()
  @ApiProperty({
    example: 120,
    description: 'The price of the product',
  })
  price?: number;

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The sale percentage of the product',
    nullable: true,
  })
  sale?: number;

  @Expose()
  @ApiProperty({ description: 'The image URL of the product', nullable: true })
  image?: string;
}

@Exclude()
export class UpdateProductDto {
  @Expose()
  @ApiProperty({
    example: 'Product Name',
    description: 'The name of the product',
    required: false,
  })
  name?: string;

  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The ID of the category the product belongs to',
    nullable: true,
    required: false,
  })
  categoryID?: number;

  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The ID of the brand the product belongs to',
    nullable: true,
    required: false,
  })
  brandID?: number;

  @Expose()
  @Type(() => UpdateProductFilterDto)
  @ApiProperty({
    type: () => [UpdateProductFilterDto],
    description: 'The filters associated with the product',
    nullable: true,
    required: false,
  })
  filters?: UpdateProductFilterDto[];

  @Expose()
  @Type(() => UpdateProductPriceDto)
  @ApiProperty({
    type: () => [UpdateProductPriceDto],
    description: 'The prices associated with the product',
    nullable: true,
    required: false,
  })
  prices?: UpdateProductPriceDto[];

  @Expose()
  @ApiProperty({
    example: 20,
    description: 'The sale percentage of the product',
    nullable: true,
    required: false,
  })
  sale?: number;

  @Expose()
  @ApiProperty({
    description: 'The image URL of the product',
    nullable: true,
    required: false,
  })
  image?: string;
}
