import { InputValidator, ValidationParams } from '../../../../../shared/lib/input-validator';
import { InputFormFundamentalFields } from '../../../../../shared/ui/form';
import { DEFAULT_PARAMS_INPUT } from '../../constants';

interface InputFormParamsFields {
  hint: string
  label: string
  placeholder: string
  rules: Partial<ValidationParams> | object
}

export type InputFormParams = Partial<InputFormParamsFields>

export interface BaseInputConfig<T> {
  component: string | unknown;
  type?: string;
  inputValidator: InputValidator<T>
  getValue(): unknown;
  isValid(): boolean;
}

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}

export class InputFormAbstract {
  value: unknown

  hint: string = DEFAULT_PARAMS_INPUT.hint;

  label: string = DEFAULT_PARAMS_INPUT.label;

  placeholder: string = DEFAULT_PARAMS_INPUT.label;

  rules: Partial<ValidationParams> = DEFAULT_PARAMS_INPUT.rules;

  inputValidator: InputValidator<unknown>

  allowValidate = false

  protected constructor(data: Partial<InputFormFundamentalFields<string>> = DEFAULT_PARAMS_INPUT) {
    this.hint = data?.hint || '';
    this.label = data?.label || '';
    this.placeholder = data?.placeholder || data?.label || '';
    this.rules = data.rules || {};
    this.inputValidator = new InputValidator(this.rules);
  }

  getValue(): unknown {
    throw new Error('Should been implemented getValue');
  }

  isValid(): boolean {
    if (!this.allowValidate) return true;
    return this.inputValidator.isValid(this.getValue());
  }

  set canValidate(value: boolean) {
    this.allowValidate = value;
  }

  resetValue(): void {
    throw Error('Should been implemented resetValue');
  }
}
