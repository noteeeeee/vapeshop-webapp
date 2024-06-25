import { OrderStatus } from './order.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';
import {
  Exclude,
  Expose,
  instanceToInstance,
  Transform,
  Type,
} from 'class-transformer';
import { DeliveryDto, DeliveryUpsertDto } from '../delivery';
import { CartDto, CartEntity } from '../cart';
import { OrderEntity } from './order.entity';
import { UserDto } from '../users';

@Exclude()
export class OrderUpdateDto {
  @Expose()
  @IsEnum(OrderStatus)
  @ApiProperty({
    enum: OrderStatus,
    enumName: 'OrderStatus',
    description: 'The status of the order',
  })
  status: OrderStatus;

  @Expose()
  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Indicates whether to move the order to the cart',
  })
  moveToCart: boolean;
}

@Exclude()
export class OrderCreateStatusDto extends DeliveryUpsertDto {
  @Expose()
  @ApiProperty({ description: 'UUIDs of cart items' })
  @IsUUID('4', { each: true })
  cartUUIDs: string[];

  @Expose()
  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  save: boolean;
}

@Exclude()
export class OrderDto {
  @Expose()
  @ApiProperty({ description: 'The ID of the order' })
  id: number;

  @Expose()
  @Type(() => CartDto)
  @ApiProperty({
    type: [CartDto],
    description: 'Items included in the order',
  })
  @Transform(({ value }) =>
    value.map((v: Partial<CartEntity>) => instanceToInstance(new CartDto(v))),
  )
  @ApiProperty({ isArray: true, type: CartDto })
  items: CartDto[];

  @Expose()
  @ApiProperty({
    enum: OrderStatus,
    enumName: 'OrderStatus',
    description: 'The status of the order',
  })
  status: OrderStatus;

  @Expose()
  @ApiProperty({
    description: 'The total price of the order',
  })
  @Type(() => Number)
  totalPrice: number;

  @Expose()
  @ApiProperty({
    description: 'The total price of the order with sale',
  })
  @Type(() => Number)
  totalPriceWithSale: number;

  @Expose()
  @ApiProperty({
    description: 'The delivery data associated with the order',
  })
  @Type(() => DeliveryDto)
  deliveryData: DeliveryDto;

  @Expose()
  @ApiProperty({ description: 'The date when the order was last updated' })
  updated: Date;

  @Expose()
  @ApiProperty({ description: 'The date when the order was created' })
  created: Date;

  @Expose()
  @ApiProperty({
    description: 'The date when the order was expired and deleted',
  })
  expire: Date;

  constructor(partial: Partial<OrderEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class OrderCreateResponseDto extends OrderDto {
  @Expose()
  @ApiProperty({
    description:
      'Indicates whether some products were excluded from the order due to insufficient stock.',
  })
  productsExcluded: boolean;
}

@Exclude()
export class OrderAdminResponseDto extends OrderDto {
  @Expose()
  @Type(() => UserDto)
  @ApiProperty({ type: UserDto })
  user: UserDto;

  constructor(partial: Partial<OrderEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}

@Exclude()
export class RevenueByDayDto {
  @Expose()
  @ApiProperty({ description: 'The date for the revenue' })
  created: string;

  @Expose()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ description: 'The revenue for the date' })
  revenue: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class OrderStatsDto {
  @Expose()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  profitToday: number;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  soldItemsToday: number;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  profitTotal: number;

  @Expose()
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  soldItemsTotal: number;

  constructor(partial: Partial<any>) {
    Object.assign(this, partial);
  }
}
