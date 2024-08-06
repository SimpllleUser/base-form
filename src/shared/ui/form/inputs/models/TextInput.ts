import { ABaseInput, type BaseInputConfig } from './BaseInput';
import type { InputPrams } from '../../composables/types';
import { InputValidator } from './InputValidator';

export class TextInput extends ABaseInput implements BaseInputConfig<string> {
  component = 'input';

  type = 'text';

  inputValidator: InputValidator<string>

   allowValidate = false

   constructor(data: Partial<InputPrams<string>>) {
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

   getErrors(): Array<string> {
     if (!this.allowValidate) return [];
     return this.inputValidator.getErrors(this.getValue());
   }
}
