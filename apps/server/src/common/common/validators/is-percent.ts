import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isDefined,
} from 'class-validator';

export function IsPercent(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsPercent',
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

          // Check if value is a number
          if (typeof value !== 'number') {
            return false;
          }

          // Check if value is between 0 and 100
          return !(value < 0 || value > 100);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid percentage between 0 and 100`;
        },
      },
    });
  };
}
