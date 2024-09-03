import { TextInput, TextInputParams } from '@/shared/ui/inputs/models/TextInput';
import { TextareaInput, TextareaInputParams } from '@/shared/ui/inputs/models/TextareaInput';
import { ABaseInput } from '@/shared/ui/inputs/models/BaseInput';
import { ListInput } from '@/shared/ui/inputs/models/ListInput';
import { InputConfigurator } from './InputConfigurator';
import { ToggleCheckInput, ToggleCheckInputParams } from '@/shared/ui/inputs/models/ToggleCheckInput';

interface InputsOfConfig {
  text: (params?: TextInputParams) => TextInput
  textarea: (params?: TextareaInputParams) => TextareaInput
  list: <T extends Record<string, ABaseInput>>(items: Array<T>, item: T) => ListInput<T>
  switch: (params?: ToggleCheckInputParams) => ToggleCheckInput
}

const list: InputsOfConfig = {
  text: (params) => new TextInput(params),
  textarea: (params) => new TextareaInput(params),
  list: (
    items,
    defaultItem,
  ) => new ListInput(items, defaultItem),
  switch: (params) => new ToggleCheckInput(params),
  /// check make similar class
  /// select
};

const input = new InputConfigurator<InputsOfConfig>(list);

/// Try add class of input internal class of input
export const { addInput } = input;

export default input.getInputs();
