import { Column, ColumnOptions } from 'typeorm';
import { ColumnNumericTransformer } from '../transformers';

// Custom decorator for price column
export function PriceColumn(options?: ColumnOptions): PropertyDecorator {
  // Return a function that decorates the property
  return function (target: any, propertyKey: string | symbol): void {
    // Apply the @Column decorator with specified options
    Column({
      type: 'decimal',
      precision: 10,
      scale: 2,
      transformer: new ColumnNumericTransformer(),
      ...options,
    })(target, propertyKey);
  };
}
