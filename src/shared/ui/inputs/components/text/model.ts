import { markRaw } from 'vue';
import { InputValidator } from '../../../../../shared/lib/input-validator';
import { InputFormFundamentalFields } from '../../../../../shared/ui/form';
import BaseInputText from './BaseInputText.vue';
import { Icon } from '../../../../../core/types/icons';

export interface AdditionalTextInputParams {
  clearable: boolean,
  appendInnerIcon: Icon | null,
  suffix: string,

  // Make this props like common in BaseInput component
  // disabled: boolean,
  // loading: boolean,

}

export type TextInputParams = Partial<InputFormFundamentalFields<string> & AdditionalTextInputParams>

export class TextInput {
   component: unknown = markRaw(BaseInputText);

   value = ''

  type = 'text';

   allowValidate = false

  clearable = false;

  appendInnerIcon: Icon | null = null;

  suffix: string;

  constructor(data?: TextInputParams) {
    this.hint = data?.hint || '';
    this.label = data?.label || '';
    this.placeholder = data?.placeholder || data?.label || '';
    this.rules = data.rules || {};
    ////
    this.value = data?.value ?? '';
    this.clearable = data?.clearable ?? false;
    this.appendInnerIcon = data?.appendInnerIcon || null;
    this.suffix = data?.suffix || '';
    this.inputValidator = new InputValidator(this.rules);
  }

  set canValidate(value: boolean) {
    this.allowValidate = value;
  }

  getValue(): string {
    return this.value ?? '';
  }

  isValid(): boolean {
    if (!this.allowValidate) return true;
    return this.inputValidator.isValid(this.getValue());
  }

  getErrors(): string {
    if (!this.allowValidate) return '';
    return this.inputValidator.getErrors(this.getValue());
  }

  setComponent(component: object): TextInput {
    this.component = markRaw(component);
    return this;
  }
}

// interface TextInput extends InputFormAbstract {}
//
// applyMixins(TextInput, [InputFormAbstract]);
