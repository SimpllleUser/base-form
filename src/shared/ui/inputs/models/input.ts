import { ABaseInput } from '@/shared/ui/inputs/models/BaseInput';
import { ListInput } from '@/shared/ui/inputs/models/ListInput';
import { InputConfigurator } from './InputConfigurator';
import { ToggleCheckInput, ToggleCheckInputParams } from '@/shared/ui/inputs/models/ToggleCheckInput';
import { BaseCheckInput, BaseSwitchInput } from '@/shared/ui/inputs';
import { ITextarea, textarea } from '../components/textarea';
import { IText, text } from '../components/text';

type InputsOfConfig = IText & ITextarea & {
  list: <T extends Record<string, ABaseInput>>(items: Array<T>, item: T) => ListInput<T>
  switch: (params?: ToggleCheckInputParams) => ToggleCheckInput
  check: (params?: ToggleCheckInputParams) => ToggleCheckInput
}

const list: InputsOfConfig = {
  text,
  textarea,
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
