import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { CategoryEntity } from '../entities';
import { IsString } from 'class-validator';

@Exclude()
export class CategoryDto {
  @Expose()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier for the category',
  })
  id: number;

  @Expose()
  @ApiProperty({
    example: 'Liquid',
    description: 'The name of the category',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'The SVG image for the category',
    required: false,
  })
  @Transform(({ value }) => (Array.isArray(value) ? value[0] : value))
  image?: string;

  @Expose()
  @ApiProperty({
    example: 10,
    description: 'The index of the category',
    required: false,
  })
  index?: number;

  @Expose()
  @ApiProperty({
    example: '2024-06-19T12:34:56.789Z',
    description: 'The date when the category was last updated',
  })
  updated: Date;

  @Expose()
  @ApiProperty({
    example: '2024-06-19T12:34:56.789Z',
    description: 'The date when the category was created',
  })
  created: Date;

  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
}

@Exclude()
export class CreateCategoryDto {
  @Expose()
  @ApiProperty({
    example: 'Liquid',
    description: 'The name of the category',
  })
  @IsString()
  name: string;

  @Expose()
  @ApiProperty({
    description: 'The image for the category',
    required: false,
  })
  @IsString()
  @Transform(({ value }) => (Array.isArray(value) ? value[0] : value))
  image?: string;
}

@Exclude()
export class UpdateCategoryDto {
  @Expose()
  @ApiProperty({
    example: 'Liquid',
    description: 'The name of the category',
    required: false,
  })
  name?: string;

  @Expose()
  @ApiProperty({
    description: 'The SVG image for the category',
    required: false,
  })
  @IsString()
  @Transform(({ value }) => (Array.isArray(value) ? value[0] : value))
  image?: string;
}
