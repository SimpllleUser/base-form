import { markRaw } from 'vue';
import { InputFormAbstract } from '@/shared/ui/inputs';
import { InputFormFundamentalFields } from '@/shared/ui/form';
import BaseSelect from './BaseSelect.vue';

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

export class SelectInput extends InputFormAbstract {
  value: SelectorInputValue

  component = markRaw(BaseSelect)

  multiple: boolean

  itemTitle = 'name'

  itemValue = 'id'

  clearable: boolean

  chips: boolean

  options: Array<OptionItem>

  constructor(data: InputSelectorParams) {
    super({
      label: data?.label || '',
      placeholder: data?.placeholder || '',
      hint: data?.hint || '',
    });
    this.value = this.getInputValue(data || {});
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
}
