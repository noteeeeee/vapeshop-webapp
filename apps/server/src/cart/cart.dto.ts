import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsInt, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductDto } from '../products';
import { CartEntity } from './cart.entity';

@Exclude()
export class CartCreateDto {
  @Expose()
  @Transform(({ value }) => parseFloat(value))
  @IsInt()
  @ApiProperty({ description: 'The ID of the product to add to the cart' })
  productID: number;

  @Expose()
  @Transform(({ value }) => parseFloat(value))
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  @Max(1000, { message: 'Quantity cannot exceed 1000' })
  @ApiProperty({
    description: 'The quantity of the product to add to the cart',
  })
  quantity: number;
}

@Exclude()
export class CartUpdateDto {
  @Expose()
  @IsUUID()
  @ApiProperty({ description: 'The UUID of the cart item to update' })
  uuid: string;

  @Expose()
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  @Max(1000, { message: 'Quantity cannot exceed 1000' })
  @ApiProperty({
    description: 'The updated quantity of the product in the cart',
  })
  quantity: number;
}

@Exclude()
export class CartDto {
  @Expose()
  @ApiProperty({ description: 'The UUID of the cart item' })
  uuid: string;

  @Expose()
  @ApiProperty({
    description: 'The product details associated with the cart item',
    type: ProductDto,
  })
  @Type(() => ProductDto)
  product: ProductDto;

  @Expose()
  @ApiProperty({ description: 'The quantity of the product in the cart' })
  quantity: number;

  @Expose()
  @ApiPropertyOptional({ description: 'The price of the item' })
  price: number;

  @Expose()
  @ApiPropertyOptional({ description: 'The sale price of the item' })
  sale: number;

  @ApiProperty({
    description:
      'The final price of the product after applying any sale discounts',
    readOnly: true,
  })
  @Expose()
  priceWithSale: number;

  @Expose()
  @ApiProperty({ description: 'The date when the cart item was last updated' })
  updated: Date;

  @Expose()
  @ApiProperty({ description: 'The date when the cart item was created' })
  created: Date;

  constructor(partial: Partial<CartEntity>) {
    Object.assign(this, partial);
    this.product = new ProductDto(this.product as any);
    this.priceWithSale = this.price - (this.price * this.sale) / 100;
  }
}
