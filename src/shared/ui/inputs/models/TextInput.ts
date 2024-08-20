import { markRaw } from 'vue';
import { ABaseInput, type BaseInputConfig } from './BaseInput';
import type { InputPrams } from '../../form/composables';
import { InputValidator } from '../../../lib/input-validator';
import BaseInputText from '../components/BaseInputText.vue';

export class TextInput extends ABaseInput implements BaseInputConfig<string> {
   component: unknown = markRaw(BaseInputText);

  type = 'text';

  inputValidator: InputValidator<string>

   allowValidate = false

   constructor(data?: Partial<InputPrams<string>>) {
     super(data);
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
