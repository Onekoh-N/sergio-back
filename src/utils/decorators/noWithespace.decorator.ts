import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'noWhitespace', async: false })
export class NoWhitespace implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        if (typeof value !== 'string') {
            return false;
        }
        return !/\s/.test(value); // Devuelve true si no hay espacios en blanco
    }

    defaultMessage(args: ValidationArguments) {
        return 'El valor no puede contener espacios en blanco';
    }
}


