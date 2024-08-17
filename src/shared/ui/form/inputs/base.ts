import { forOwn } from 'lodash';
import type { InputPrams } from '../../../../shared/ui/form';
import { TextInput } from '../../../ui/form/inputs/models/TextInput';
import { ListInput } from '../../../ui/form/inputs/models/ListInput';
import { ABaseInput } from '@/shared/ui/form/inputs/models/BaseInput';

import BaseInputText from '@/shared/ui/inputs/base/BaseInputText.vue';

const text = (params: Partial<InputPrams<string>>): TextInput => {
  const textInput = new TextInput(params);
  textInput.setComponent(BaseInputText);
  return textInput;
};
export const list = <T extends Record<string, ABaseInput>>(
  items: Array<T>,
  defaultItem: T,
): ListInput<T> => new ListInput<T>(items, defaultItem as T);

type InputDataItem = Record<string, CallableFunction>

class InputConfigurator {
  private static instance: InputConfigurator

   private readonly inputs!: Record<string, CallableFunction>

   constructor(inputs: Record<string, CallableFunction>) {
     if (InputConfigurator.instance) {
       return;
     }
     this.inputs = inputs;
     InputConfigurator.instance = this;
   }

   setComponentToInput(input: InputDataItem) {
     forOwn(input, (value, key) => {
       InputConfigurator.instance.inputs[key] = value;
     });
   }

   getInputs() {
     return this.inputs;
   }
}

const input = new InputConfigurator({ text, list });

export const addInput = input.setComponentToInput;

export default input.getInputs();
