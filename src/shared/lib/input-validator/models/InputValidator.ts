import { isBoolean, isString } from 'lodash';
import type { ValidationRule, ValidationFunction } from '../../../../shared/lib/input-validator';
import { rules } from '../../../../shared/lib/input-validator';

export class InputValidator<T> {
  private readonly validationRules?: Array<ValidationRule | string> = [];

  constructor(rules?: Array<ValidationRule | string>) {
    this.validationRules = rules;
  }

  private getRuleValidation(validationRule: ValidationRule | string): (value: T) => boolean | string {
    const [rule, paramsInString] = validationRule?.split(':') || [];
    const paramsInArray: Array<string> = paramsInString?.split(',') || [];

    const validationFunction = rules[rule as ValidationRule] as ValidationFunction | undefined;

    if (!validationFunction) {
      throw new Error('Not rules not exist');
    }

    return (value: T) => validationFunction(value, ...paramsInArray);
  }

  isValid(value: T): boolean {
    if (!this.validationRules?.length) return true;

    return this.validationRules
      .map(this.getRuleValidation.bind(this))
      .map(validationFunction => validationFunction(value))
      .every(isBoolean);
  }

  getErrors(value: T): string {
    return this.validationRules
      ?.map(this.getRuleValidation.bind(this))
      ?.map(validationFunction => validationFunction(value))
      ?.filter(isString)[0] || '';
  }
}
