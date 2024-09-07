import { markRaw } from 'vue';
import { InputValidator } from '@/shared/lib/input-validator';
import { InputPrams } from '@/shared/ui/form';
import { ABaseInput, BaseInputConfig } from '../../models';

import BaseInputText from './BaseInputText.vue';
import { Icon } from '@/core/types/icons';

export interface AdditionalTextInputParams {
  clearable: boolean,
  appendInnerIcon: Icon | null,
  suffix: string,

  // Make this props like common in BaseInput component
  // disabled: boolean,
  // loading: boolean,

}

export type TextInputParams = Partial<InputPrams<string> & AdditionalTextInputParams>

export class TextInput extends ABaseInput implements BaseInputConfig<string> {
   component: unknown = markRaw(BaseInputText);

  type = 'text';

   allowValidate = false

  clearable = false;

  appendInnerIcon: Icon | null = null;

  suffix: string;

  constructor(data?: TextInputParams) {
    super(data);
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