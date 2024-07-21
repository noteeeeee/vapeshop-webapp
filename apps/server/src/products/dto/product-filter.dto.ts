// import { ApiProperty } from '@nestjs/swagger';
// import { Exclude, Expose } from 'class-transformer';
// import { ProductFilterEntity } from '../entities';
//
// @Exclude()
// export class ProductFilterDto {
//   @Expose()
//   @ApiProperty({
//     example: 1,
//     description: 'The ID of the product this filter belongs to',
//   })
//   productID: number;
//
//   @Expose()
//   @ApiProperty({ example: 1, description: 'The ID of the filter' })
//   filterID: number;
//
//   @Expose()
//   @ApiProperty({ example: 'Value', description: 'The value of the filter' })
//   value: string;
//
//   constructor(partial: Partial<ProductFilterEntity>) {
//     Object.assign(this, partial);
//   }
// }
//
// @Exclude()
// export class UpdateProductFilterDto {
//   @Expose()
//   @ApiProperty({ example: 1, description: 'The ID of the filter' })
//   filterID: number;
//
//   @Expose()
//   @ApiProperty({ example: 'Value', description: 'The value of the filter' })
//   value: string;
// }
