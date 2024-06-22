import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { ProductSaleEntity } from '../entities';

@Exclude()
export class ProductSaleDto {
  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the product price',
  })
  id: number;

  @Expose()
  @ApiProperty({ example: 100, description: 'The price of the product' })
  price: number;

  constructor(partial: Partial<ProductSaleEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class UpdateProductPriceDto {
  @Expose()
  @ApiProperty({ example: 100, description: 'The price of the product' })
  price: number;

  @Expose()
  @ApiProperty({ example: 100, description: 'The quantity of the product' })
  quantity: number;
}
