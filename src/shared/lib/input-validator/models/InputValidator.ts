import {
  isBoolean,
  isString,
  mapValues,
} from 'lodash';
import {
  rules, ValidationFunctionMap, ValidationParams, ValidationResult,
} from '../../../../shared/lib/input-validator';

type ValidationRulesScheme = Partial<
  Record<
    keyof ValidationFunctionMap,
    Partial<ValidationParams[keyof ValidationParams]>>
> | object;

export class InputValidator<T> {
  private readonly validationRules?: ValidationRulesScheme;

  constructor(rules?: ValidationRulesScheme) {
    this.validationRules = rules || {};
  }

  private isValidationRule(rule: keyof ValidationFunctionMap): boolean {
    return rules[rule] && typeof rules[rule] === 'function';
  }

  private checkRuleByValue(value: unknown, { ruleValue, ruleKey }: {
    ruleValue: never, ruleKey: keyof ValidationFunctionMap
  }): ValidationResult {
    if (this.isValidationRule(ruleKey)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return rules[ruleKey]({ [ruleKey]: ruleValue, value });
    }
    return false;
  }

  isValid(value: unknown): boolean {
    const res = Object.values(
      mapValues(
        this.validationRules,
        (ruleValue, ruleKey: keyof ValidationFunctionMap) => this.checkRuleByValue(value, { ruleValue, ruleKey }),
      ),
    ).every(isBoolean);
    console.log(res);
    return res;
  }

  getErrors(value: T): string {
    return Object.values(
      mapValues(
        this.validationRules,
        (ruleValue, ruleKey: keyof ValidationFunctionMap) => this.checkRuleByValue(value, { ruleValue, ruleKey }),

      ),
    ).filter(isString)[0];
  }
}
