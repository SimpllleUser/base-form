import { forOwn } from 'lodash';
import type { InputPrams } from '../../form/composables';
import { TextInput, ListInput, TextInputParams } from '.';
import { ABaseInput } from './BaseInput';
import { TextareaInput, TextareaInputParams } from '@/shared/ui/inputs/models/TextareaInput';

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
  text: (params?: TextInputParams) => TextInput
  textarea: (params?: TextareaInputParams) => TextareaInput
  list: <T extends Record<string, ABaseInput>>(items: Array<T>, item: T) => ListInput<T>
}

const list: InputsOfConfig = {
  text: (params) => new TextInput(params),
  textarea: (params) => new TextareaInput(params),
  list: (
    items,
    defaultItem,
  ) => new ListInput(items, defaultItem),
};

const input = new InputConfigurator<InputsOfConfig>(list);

export const { addInput } = input;

export default input.getInputs();
