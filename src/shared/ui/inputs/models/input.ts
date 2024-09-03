import { IText, text } from '@/shared/ui/inputs/components/text';
import { TextareaInput, TextareaInputParams } from '@/shared/ui/inputs/models/TextareaInput';
import { ABaseInput } from '@/shared/ui/inputs/models/BaseInput';
import { ListInput } from '@/shared/ui/inputs/models/ListInput';
import { InputConfigurator } from './InputConfigurator';
import { ToggleCheckInput, ToggleCheckInputParams } from '@/shared/ui/inputs/models/ToggleCheckInput';
import { BaseCheckInput, BaseSwitchInput } from '@/shared/ui/inputs';

type InputsOfConfig = IText & {
  textarea: (params?: TextareaInputParams) => TextareaInput
  list: <T extends Record<string, ABaseInput>>(items: Array<T>, item: T) => ListInput<T>
  switch: (params?: ToggleCheckInputParams) => ToggleCheckInput
  check: (params?: ToggleCheckInputParams) => ToggleCheckInput
}

const list: InputsOfConfig = {
  text,
  textarea: (params) => new TextareaInput(params),
  list: (
    items,
    defaultItem,
  ) => new ListInput(items, defaultItem),
  switch: (params) => new ToggleCheckInput(BaseSwitchInput, params),
  check: (params) => new ToggleCheckInput(BaseCheckInput, params),
  /// select
};

const input = new InputConfigurator<InputsOfConfig>(list);

/// Try add class of input internal class of input
export const { addInput } = input;

export default input.getInputs();
