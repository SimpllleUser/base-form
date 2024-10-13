import { markRaw } from 'vue';
import { Nullable } from '../../../../../core/types/common';
import { InputFormFundamentalFields } from '../../../../../shared/ui/form';
import { Icon } from '../../../../../core/types/icons';
import {InputValidator} from "../../../../lib/input-validator";

export type ToggleCheckInputParams = Partial<InputFormFundamentalFields<boolean> & {
  appendIcon: Nullable<Icon>
  prependIcon: Nullable<Icon>
}>
export class ToggleCheckInput {
  component: unknown

   value: boolean;

   appendIcon: Nullable<Icon>

   prependIcon: Nullable<Icon>

  allowValidate = false

   color = 'primary'

   constructor(component: object, data: ToggleCheckInputParams) {
     this.hint = data?.hint || '';
     this.label = data?.label || '';
     this.placeholder = data?.placeholder || data?.label || '';
     this.rules = data.rules || {};
     this.inputValidator = new InputValidator(this.rules);
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
