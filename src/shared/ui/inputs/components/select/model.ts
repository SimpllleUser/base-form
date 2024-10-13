import { markRaw } from 'vue';
import {DEFAULT_PARAMS_INPUT} from '../../../../../shared/ui/inputs';
import { InputFormFundamentalFields } from '../../../../../shared/ui/form';
import BaseSelect from './BaseSelect.vue';
import { InputValidator } from '../../../../../shared/lib/input-validator';

export interface InputSelectValue {
  name: string;
  id: string
}

export interface OptionItem {
  id: string | number
  name: string | number
}

export type InputSelectValueMultiple = Array<InputSelectValue>
export type SelectorInputValue = string | Array<string>
export type InputSelectorParams = Partial<InputFormFundamentalFields<InputSelectValue | InputSelectValueMultiple> & {
  multiple: boolean
  clearable: boolean
  chips: boolean
}> & { options: Array<OptionItem> }

export class SelectInput {
  value: SelectorInputValue
  hint: string = DEFAULT_PARAMS_INPUT.hint;

  label: string = DEFAULT_PARAMS_INPUT.label;

  placeholder: string = DEFAULT_PARAMS_INPUT.label;

  rules: Partial<ValidationParams> = DEFAULT_PARAMS_INPUT.rules;

  inputValidator: InputValidator<unknown>


  component = markRaw(BaseSelect)

  multiple: boolean

  itemTitle = 'name'

  itemValue = 'id'

  clearable: boolean

  chips: boolean

  options: Array<OptionItem>

  allowValidate = false

  constructor(data: InputSelectorParams) {
    this.hint = data?.hint || '';
    this.label = data?.label || '';
    this.placeholder = data?.placeholder || data?.label || '';
    this.rules = data.rules || {};
    this.inputValidator = new InputValidator(this.rules);
    //////
    this.value = this.getInputValue(data);
    this.multiple = Boolean(data?.multiple);
    this.clearable = Boolean(data?.clearable);
    this.chips = Boolean(data?.chips);
    this.options = data.options;
  }

  private getInputValue(data: InputSelectorParams): SelectorInputValue {
    if (data.multiple && !Array.isArray(data.value)) return [];
    if (!data?.value) return data?.multiple ? [] : '';
    return Array.isArray(data.value)
      ? data.value.map(({ id }) => id)
      : data.value.id;
  }

  getValue(): string | Array<string> {
    return this.value;
  }

  isValid(): boolean {
    if (!this.allowValidate) return true;
    return this.inputValidator.isValid(this.getValue());
  }

  set canValidate(value: boolean) {
    this.allowValidate = value;
  }

  getErrors(): string {
    if (!this.allowValidate) return '';
    return this.inputValidator.getErrors(this.getValue());
  }
}
