import { Exclude, Expose, Type } from 'class-transformer';
import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserDto } from '../users';
import { OrderDto } from '../orders';
import { ProductDto } from '../products';
import { ShowcaseOperation } from './showcase.types';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

@Exclude()
export class ProductStockChangeDetailsDto {
  @Expose()
  @ApiProperty({
    example: 50,
    description: 'Previous stock level before the change',
  })
  oldStock: number;

  @Expose()
  @ApiProperty({
    example: 100,
    description: 'New stock level after the change',
  })
  newStock: number;

  @Expose()
  @ApiProperty({
    example: 20.5,
    description: 'New price for the product',
  })
  @IsOptional() // Making price optional, in case it’s not provided
  @IsNumber({}, { message: 'Price must be a number' })
  price?: number;

  @Expose()
  @ApiProperty({
    example: 15.0,
    description: 'New buying price for the product',
  })
  @IsOptional() // Making buyingPrice optional, in case it’s not provided
  @IsNumber({}, { message: 'Buying Price must be a number' })
  buyingPrice?: number;
}

@Exclude()
export class InventoryDto extends ProductStockChangeDetailsDto {
  @Expose()
  @ApiProperty({
    example: 'b0e7b7c8-2d3a-4c8f-b8b7-ec32ef7d1f51',
    description: 'Unique identifier for the inventory operation',
  })
  uuid: string;

  @Expose()
  @ApiPropertyOptional({
    type: ProductDto
  })
  @Type(() => ProductDto)
  product?: number;
}

@Exclude()
export class ShowcaseDto {
  @Expose()
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the audit event',
  })
  id: number;

  @Expose()
  @ApiProperty({
    description:
      'Type of the audit event, such as user creation, order update, etc.',
  })
  type: ShowcaseOperation;

  @Expose()
  @Type(() => UserDto)
  @ApiPropertyOptional({
    type: UserDto,
    description: 'Details of the user involved in the event',
  })
  user?: UserDto;

  @Expose()
  @Type(() => OrderDto)
  @ApiPropertyOptional({
    type: OrderDto,
    description: 'Details of the order involved in the event',
  })
  order?: OrderDto;

  @Expose()
  @Type(() => ProductDto)
  @ApiPropertyOptional({
    type: ProductDto,
    description: 'Details of the product involved in the event',
  })
  product?: ProductDto;

  @Expose()
  @ApiPropertyOptional({
    oneOf: [
      { $ref: getSchemaPath(ProductStockChangeDetailsDto) },
      { type: 'object' },
    ],
    description:
      'Additional details about the audit event, varying based on the event type',
  })
  details?: Record<string, any>;

  @Expose()
  @ApiProperty({
    type: [InventoryDto],
    description: 'Array of inventory operations related to the audit event',
    required: false,
  })
  inventoryOperations?: InventoryDto[];

  @Expose()
  @ApiProperty({
    example: '2024-06-24T12:34:56.789Z',
    description: 'Timestamp of when the audit event was created',
  })
  created: Date;
}

@Exclude()
export class ProductStockChangeRequestDto {
  @Expose()
  @ApiProperty({
    example: 50,
    description: 'Quantity to be updated in the inventory for the product',
  })
  @IsInt({ message: 'Quantity must be an integer' })
  quantity: number;

  @Expose()
  @ApiProperty({
    example: 20.5,
    description: 'New price for the product',
  })
  @IsOptional() // Making price optional, in case it’s not provided
  @IsNumber({}, { message: 'Price must be a number' })
  price?: number;

  @Expose()
  @ApiProperty({
    example: 15.0,
    description: 'New buying price for the product',
  })
  @IsOptional() // Making buyingPrice optional, in case it’s not provided
  @IsNumber({}, { message: 'Buying Price must be a number' })
  buyingPrice?: number;
}

// DTO for a single inventory row request
@Exclude()
export class InventoryRowRequestDto extends ProductStockChangeRequestDto {
  @Expose()
  @ApiProperty({
    example: 1,
    description: 'ID of the product to be updated in inventory',
  })
  @IsInt({ message: 'Product ID must be an integer' })
  productId: number;
}

export class ShowcaseRequestDto {
  @ApiProperty({
    description: 'Type of the audit event',
    enum: ShowcaseOperation,
    example: ShowcaseOperation.StockInventory
  })
  @IsEnum(ShowcaseOperation)
  @IsNotEmpty()
  type: ShowcaseOperation;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID of the user involved in the event, if applicable',
  })
  @IsOptional()
  @IsInt()
  userID?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID of the order involved in the event, if applicable',
  })
  @IsOptional()
  @IsInt()
  orderID?: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'ID of the product involved in the event, if applicable',
  })
  @IsOptional()
  @IsInt()
  productID?: number;

  @ApiPropertyOptional({
    oneOf: [
      { $ref: getSchemaPath(ProductStockChangeDetailsDto) },
      { type: 'object' },
    ],
    description:
      'Additional details about the audit event, varying based on the event type',
  })
  @IsOptional()
  @IsJSON()
  @ValidateNested({ each: true })
  @Type(() => ProductStockChangeRequestDto)
  details?: ProductStockChangeRequestDto;

  @ApiPropertyOptional({
    type: [InventoryRowRequestDto],
    description:
      'Array of inventory operations related to the audit event, if applicable',
    required: false,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => InventoryRowRequestDto)
  inventoryData?: InventoryRowRequestDto[];
}
