import { forOwn } from 'lodash';
import type { InputPrams } from '../../../../shared/ui/form';
import { TextInput } from '../../../ui/form/inputs/models/TextInput';
import { ListInput } from '../../../ui/form/inputs/models/ListInput';
import { ABaseInput } from '@/shared/ui/form/inputs/models/BaseInput';

import BaseInputText from '@/shared/ui/inputs/base/BaseInputText.vue';

type InputDataItem = Record<string, CallableFunction>

class InputConfigurator<T> {
  private static instance: InputConfigurator<any>

   private readonly inputs!: T

   constructor(inputs: T) {
     if (InputConfigurator.instance) {
       return;
     }
     this.inputs = inputs;
     InputConfigurator.instance = this;
   }

   addInput(input: InputDataItem) {
     forOwn(input, (value, key) => {
       InputConfigurator.instance.inputs[key] = value;
     });
   }

   getInputs() {
     return this.inputs;
   }
}

interface InputsOfConfig {
  text: (params?: Partial<InputPrams<string>>) => TextInput
  list: <T extends Record<string, ABaseInput>>(items: Array<T>, item: T) => ListInput<T>
}

const list: InputsOfConfig = {
  text: (params) => new TextInput(params).setComponent(BaseInputText),
  list: (
    items,
    defaultItem,
  ) => new ListInput(items, defaultItem),
};

const input = new InputConfigurator<InputsOfConfig>(list);

export const { addInput } = input;

export default input.getInputs();
