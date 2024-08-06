import type { ValidationRule, ValidationFunction } from 'src/shared/lib/input-validator/types';
import { rules } from '@/shared/lib/input-validator/rules';
import { isBoolean, isString } from '@/shared/lib/utils';

export class InputValidator<T> {
  private readonly validationRules?: Array<ValidationRule | string> = [];

  constructor(rules?: Array<ValidationRule | string>) {
    this.validationRules = rules;
  }

  private getRuleValidation(validationRule: ValidationRule | string): (value: T) => boolean | string {
    const [rule, paramsInString] = validationRule?.split(':') || [];
    const paramsInArray: Array<string> = paramsInString?.split(',') || [];

    const validationFunction = rules[rule] as ValidationFunction;

    return (value: T) => validationFunction(value, ...paramsInArray);
  }

  isValid(value: T): boolean {
    if (!this.validationRules) return true;

    return this.validationRules
      .map(this.getRuleValidation.bind(this))
      .map(validationFunction => validationFunction(value))
      .every(isBoolean);
  }

  getErrors(value: T): Array<string> {
    return this.validationRules
      ?.map(this.getRuleValidation.bind(this))
      .map(validationFunction => validationFunction(value))
      .filter(isString) as Array<string>;
  }
}
