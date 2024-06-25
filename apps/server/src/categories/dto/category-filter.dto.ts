import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CategoryFilterEntity } from '../entities';
import { IsInt } from 'class-validator';

@Exclude()
export class CategoryFilterDto {
  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the filter',
  })
  id: number;

  @Expose()
  @ApiProperty({
    example: 'Strong',
    description: 'The name of the filter',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 10,
    description: 'The index of the filter',
    required: false,
  })
  index?: number;

  constructor(partial: Partial<CategoryFilterEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class CreateFilterDto {
  @Expose()
  @ApiProperty({
    example: 'Strong',
    description: 'The name of the filter',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The ID of the category',
  })
  @IsInt()
  categoryID: number;
}

@Exclude()
export class UpdateFilterDto {
  @Expose()
  @ApiProperty({
    required: false,
    example: 'Strong',
    description: 'The name of the filter',
  })
  name?: string;
}
