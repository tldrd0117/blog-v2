import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function ArrayIncludes(property: any[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'arrayIncludes',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedValue] = args.constraints;
          if(!(relatedValue instanceof Array)) return false
          if(!(value instanceof Array)) return false
          return value.every(val => relatedValue.includes(val))
        },
      },
    });
  };
}