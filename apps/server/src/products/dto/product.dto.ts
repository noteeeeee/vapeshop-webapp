import {Exclude, Expose, Transform, Type} from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryDto } from '../../categories';
import { ProductEntity } from '../entities';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
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
  @ApiPropertyOptional({
    example: 'Fruity',
    description: 'The flavor of the product',
    nullable: true,
  })
  brand?: string;

  @Expose()
  @ApiPropertyOptional({
    example: 'Fruity',
    description: 'The flavor of the product',
    nullable: true,
  })
  flavor: string;

  @Expose()
  @ApiPropertyOptional({
    example: 'Salty',
    description: 'The nicotine type of the product',
    nullable: true,
  })
  nicotine: string;

  @Expose()
  @ApiPropertyOptional({
    example: '6 MG',
    description: 'The strength of the product',
    nullable: true,
  })
  strength: string;

  @Expose()
  @ApiPropertyOptional()
  quantitySales_5: number;

  @Expose()
  @ApiPropertyOptional()
  quantitySales_10: number;

  @Expose()
  @ApiPropertyOptional()
  quantitySales_20: number;

  @Expose()
  @ApiPropertyOptional()
  quantitySales_40: number;

  @Expose()
  @ApiPropertyOptional()
  quantitySales_100: number;

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
  @Type(() => Number)
  categoryID?: number;

  @Expose()
  @ApiPropertyOptional({
    example: 'Fruity',
    description: 'The flavor of the product',
    nullable: true,
  })
  brand?: string;

  @Expose()
  @ApiPropertyOptional({
    example: 'Fruity',
    description: 'The flavor of the product',
    nullable: true,
  })
  flavor: string;

  @Expose()
  @ApiPropertyOptional({
    example: 'Salty',
    description: 'The nicotine type of the product',
    nullable: true,
  })
  nicotine: string;

  @Expose()
  @ApiPropertyOptional({
    example: '6 MG',
    description: 'The strength of the product',
    nullable: true,
  })
  strength: string;

  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_5: number;

  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_10: number;

  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_20: number;

  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_40: number;

  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_100: number;

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
  @Transform(({ value }) => (Array.isArray(value) ? value[0] : value))
  image?: string;

  @Expose()
  @IsInt()
  @IsOptional()
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
  @Type(() => Number)
  categoryID?: number;

  @Expose()
  @ApiPropertyOptional({
    example: 'Fruity',
    description: 'The flavor of the product',
    nullable: true,
  })
  brand?: string;

  @Expose()
  @ApiPropertyOptional({
    example: 'Fruity',
    description: 'The flavor of the product',
    nullable: true,
  })
  flavor?: string;

  @Expose()
  @ApiPropertyOptional({
    example: 'Salty',
    description: 'The nicotine type of the product',
    nullable: true,
  })
  nicotine?: string;

  @Expose()
  @ApiPropertyOptional({
    example: '6 MG',
    description: 'The strength of the product',
    nullable: true,
  })
  strength?: string;

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
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_5: number;

  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_10: number;

  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_20: number;

  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_40: number;

  @Expose()
  @IsOptional()
  @ApiPropertyOptional()
  @Transform(({ value }) => value ? value * 100 : value)
  quantitySales_100: number;

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
  @Transform(({ value }) => (Array.isArray(value) ? value[0] : value))
  image?: string;

  @Expose()
  @IsInt()
  @IsOptional()
  @ApiPropertyOptional({
    example: 10,
    description: 'The number of items in stock',
  })
  @Type(() => Number)
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
