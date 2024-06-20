import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isDefined,
} from 'class-validator';

export function IsPrice(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsPrice',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // If the value is not defined and the property is optional, validation passes
          if (
            !isDefined(value) &&
            args.constraints?.some((constraint) => constraint.optional)
          ) {
            return true;
          }

          // Check if value is null or undefined
          if (value === null || value === undefined) {
            return false;
          }

          // Check if value is a number
          if (typeof value !== 'number') {
            return false;
          }

          // Check if value is not negative
          if (value < 0) {
            return false;
          }

          // Check if value has a maximum of 2 decimal places
          const decimalCount = (value.toString().split('.')[1] || '').length;
          return decimalCount <= 2;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a non-negative number with a maximum of 2 decimal places`;
        },
      },
    });
  };
}
