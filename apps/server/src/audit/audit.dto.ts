import { AuditType } from './audit.types';
import { Exclude, Expose, Type } from 'class-transformer';
import {ApiProperty, ApiPropertyOptional, getSchemaPath} from '@nestjs/swagger';
import { UserDto } from '../users';
import { OrderDto } from '../orders';
import {ProductDto} from "../products";
import {OrderStatus} from "../orders/order.types";

@Exclude()
export class BalanceChangeDetailsDto {
  @Expose()
  @ApiProperty({ example: 100, description: 'Old balance' })
  oldBalance: number;

  @Expose()
  @ApiProperty({ example: 150, description: 'New balance' })
  newBalance: number;
}

@Exclude()
export class OrderStatusChangeDetailsDto {
  @Expose()
  @ApiProperty({ enum: OrderStatus, description: 'Old status of the order' })
  oldStatus: string;

  @Expose()
  @ApiProperty({ enum: OrderStatus, description: 'New status of the order' })
  newStatus: string;
}

@Exclude()
export class ProductStockChangeDetailsDto {
  @Expose()
  @ApiProperty({ example: 50, description: 'Old stock level' })
  oldStock: number;

  @Expose()
  @ApiProperty({ example: 100, description: 'New stock level' })
  newStock: number;
}

@Exclude()
export class AuditDto {
  @Expose()
  @ApiProperty({ example: 1, description: 'ID of the audit' })
  id: number;

  @Expose()
  @ApiProperty({
    example: 'user_created',
    description: 'Type of the audit event',
  })
  type: AuditType;

  @Expose()
  @Type(() => UserDto)
  @ApiPropertyOptional({ type: UserDto, description: 'ID of the user' })
  user?: number;

  @Expose()
  @Type(() => OrderDto)
  @ApiPropertyOptional({ type: OrderDto, description: 'ID of the order' })
  order?: number;

  @Expose()
  @Type(() => OrderDto)
  @ApiPropertyOptional({ type: ProductDto, description: 'ID of the product' })
  product?: number;

  @Expose()
  @ApiPropertyOptional({
    oneOf: [
      { $ref: getSchemaPath(BalanceChangeDetailsDto) },
      { $ref: getSchemaPath(OrderStatusChangeDetailsDto) },
      { $ref: getSchemaPath(ProductStockChangeDetailsDto) },
      { type: 'object' },
    ],
    description: 'Additional details of the event',
  })
  details?: Record<string, any>;

  @Expose()
  @ApiProperty({
    example: '2024-06-24T12:34:56.789Z',
    description: 'Creation date of the event',
  })
  created: Date;
}
