import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BrandEntity } from '../entities';

@Exclude()
export class BrandDto {
  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the brand',
  })
  id: number;

  @Expose()
  @ApiProperty({
    example: 'HotSpot',
    description: 'The name of the brand',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 10,
    description: 'The index of the brand',
    required: false,
  })
  index?: number;

  @Expose()
  @ApiProperty({
    example: '2024-06-19T12:34:56.789Z',
    description: 'The date when the brand was last updated',
  })
  updated: Date;

  @Expose()
  @ApiProperty({
    example: '2024-06-19T12:34:56.789Z',
    description: 'The date when the brand was created',
  })
  created: Date;

  constructor(partial: Partial<BrandEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class CreateBrandDto {
  @Expose()
  @ApiProperty({
    example: 'HotSpot',
    description: 'The name of the brand',
  })
  name: string;
}

@Exclude()
export class UpdateBrandDto {
  @Expose()
  @ApiProperty({
    example: 'HotSpot',
    description: 'The name of the brand',
    required: false,
  })
  name?: string;
}
