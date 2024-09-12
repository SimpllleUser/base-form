import { markRaw } from 'vue';
import { Nullable } from '@/core/types/common';
import { InputFormAbstract, InputFormParams } from '@/shared/ui/inputs';
import { InputFormFundamentalFields } from '@/shared/ui/form';
import { Icon } from '@/core/types/icons';

export type ToggleCheckInputParams = Partial<InputFormFundamentalFields<boolean> & {
  appendIcon: Nullable<Icon>
  prependIcon: Nullable<Icon>
}>

const getInputFormParams = (data: ToggleCheckInputParams): InputFormParams => ({
  hint: data?.hint || '',
  label: data?.label || '',
  rules: data?.rules || {},
  placeholder: data?.placeholder || '',
});

export class ToggleCheckInput extends InputFormAbstract {
  component: unknown

   value: boolean;

   appendIcon: Nullable<Icon>

   prependIcon: Nullable<Icon>

  allowValidate = false

   color = 'primary'

   constructor(component: object, data: ToggleCheckInputParams) {
     super(getInputFormParams(data));
     this.component = markRaw(component);
     this.value = Boolean(data?.value);
     this.appendIcon = data?.appendIcon ?? null;
     this.prependIcon = data?.prependIcon ?? null;
   }

   set canValidate(value: boolean) {
     this.allowValidate = value;
   }

   getValue(): boolean {
     return this.value;
   }

   isValid(): boolean {
     if (!this.allowValidate) return true;
     return this.inputValidator.isValid(this.getValue());
   }

   getErrors(): string {
     if (!this.allowValidate) return '';
     return this.inputValidator.getErrors(this.getValue());
   }
}
