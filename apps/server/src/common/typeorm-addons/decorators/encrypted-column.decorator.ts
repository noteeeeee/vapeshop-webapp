import { Column, ColumnOptions } from 'typeorm';
import { EncryptionTransformer } from '../transformers';

// Custom decorator for price column
export function EncryptedColumn(options?: ColumnOptions): PropertyDecorator {
  // Return a function that decorates the property
  return function (target: any, propertyKey: string | symbol): void {
    // Apply the @Column decorator with specified options
    Column({
      type: 'text',
      transformer: new EncryptionTransformer(),
      ...options,
    })(target, propertyKey);
  };
}
