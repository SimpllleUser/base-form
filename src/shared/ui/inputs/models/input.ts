import { InputFormAbstract } from '@/shared/ui/inputs/components/input-form/model';
import { ListInput } from '@/shared/ui/inputs/models/ListInput';
import { InputConfigurator } from './InputConfigurator';
import { ITextarea, textarea } from '../components/textarea';
import { IText, text } from '../components/text';
import {
  ISwitch, switchInput, ICheck, check,
} from '../components/toggle-state-input';

type InputsOfConfig = IText & ITextarea & ISwitch & ICheck & {
  list: <T extends Record<string, InputFormAbstract>>(items: Array<T>, item: T) => ListInput<T>
  // check: (params?: ToggleCheckInputParams) => ToggleCheckInput
}

const list: InputsOfConfig = {
  text,
  textarea,
  switch: switchInput,
  check,
  list: (
    items,
    defaultItem,
  ) => new ListInput(items, defaultItem),
  /// select
};

const input = new InputConfigurator<InputsOfConfig>(list);

/// Try add class of input internal class of input
export const { addInput } = input;

export default input.getInputs();
