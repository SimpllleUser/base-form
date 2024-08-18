import type { InputPrams } from '../../form/composables';
import { ValidationRule } from '../../../lib/input-validator/types';
import { InputValidator } from '../../../lib/input-validator';
import { DEFAULT_PARAMS_INPUT } from '../constants';

export interface BaseInputConfig<T> {
  component: string | unknown;
  type?: string;
  inputValidator: InputValidator<T>
  getValue(): unknown;
  isValid(): boolean;
}

export abstract class ABaseInput {
   component: string | unknown = 'input';

  value?: string = DEFAULT_PARAMS_INPUT.value;

  hint?: string = DEFAULT_PARAMS_INPUT.hint;

  label?: string = DEFAULT_PARAMS_INPUT.label;

  rules?: Array<ValidationRule | string> = DEFAULT_PARAMS_INPUT.rules;

  allowValidate = false

  protected constructor(data: Partial<InputPrams<string>> = DEFAULT_PARAMS_INPUT) {
    this.value = data.value;
    this.hint = data.hint;
    this.label = data.label;
    this.rules = data.rules;
  }

  getValue(): void {
    throw new Error('Method not implemented.');
  }

  isValid(): boolean {
    return true;
  }

  set canValidate(value: boolean) {
    this.allowValidate = value;
  }

  resetValue() {
    this.value = '';
  }

  setComponent(component: string | unknown) {
    this.component = component;
  }
}
