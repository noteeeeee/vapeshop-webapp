import { Exclude, Expose } from 'class-transformer';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import { DeliveryEntity } from '../entities';
import {DeliveryMethod} from "../delivery.types";
import {IsEnum, IsOptional, IsString} from "class-validator";

@Exclude()
export class DeliveryDto {
  @Expose()
  @ApiProperty({ enum: DeliveryMethod })
  method: DeliveryMethod;

  @Expose()
  @ApiPropertyOptional({ description: 'The full name of the user' })
  fullName: string;

  @Expose()
  @ApiProperty({ description: 'The phone number of the user' })
  phone: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The city of the address' })
  region: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The city of the address' })
  city: string;

  @Expose()
  @ApiProperty({ description: 'The address' })
  address: string;

  @Expose()
  @ApiPropertyOptional({ description: 'The zip code' })
  zipCode: string;

  constructor(partial: Partial<DeliveryEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class DeliveryUpsertDto {
  @Expose()
  @IsEnum(DeliveryMethod)
  @ApiProperty({ enum: DeliveryMethod })
  method: DeliveryMethod;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The full name of the user' })
  fullName: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: 'The phone number of the user' })
  phone: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The city of the address' })
  region: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The city of the address' })
  city: string;

  @Expose()
  @IsString()
  @ApiProperty({ description: 'The address' })
  address: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The zip code' })
  zipCode: string;

  constructor(partial: Partial<DeliveryEntity>) {
    Object.assign(this, partial);
  }
}
