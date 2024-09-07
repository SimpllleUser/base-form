import { markRaw } from 'vue';
import { Nullable } from '@/core/types/common';
import { DEFAULT_PARAMS_INPUT } from '@/shared/ui/inputs';
import { InputPrams } from '@/shared/ui/form';
import { Icon } from '@/core/types/icons';

export type ToggleCheckInputParams = Partial<InputPrams<boolean> & {
  appendIcon: Nullable<Icon>
  prependIcon: Nullable<Icon>
}>

export class ToggleCheckInput {
  component: unknown

   value: boolean;

  hint?: string = DEFAULT_PARAMS_INPUT.hint;

  label?: string = DEFAULT_PARAMS_INPUT.label;

  placeholder?: string = DEFAULT_PARAMS_INPUT.label;

   appendIcon: Nullable<Icon>

   prependIcon: Nullable<Icon>

  allowValidate = false

   color = 'primary'

   constructor(component: object, data?: ToggleCheckInputParams) {
     this.component = markRaw(component);
     this.value = !!data?.value;
     this.appendIcon = data?.appendIcon ?? null;
     this.prependIcon = data?.prependIcon ?? null;
     this.hint = data?.hint || '';
     this.label = data?.label || '';
     this.placeholder = data?.placeholder || '';
   }

   set canValidate(value: boolean) {
     this.allowValidate = value;
   }

   getValue(): boolean {
     return this.value;
   }

   isValid(): boolean {
     return true;
   }

   getErrors(): string {
     return '';
   }

   resetValue() {
     this.value = false;
   }
}
