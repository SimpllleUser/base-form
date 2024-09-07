import { InputConfigurator } from './InputConfigurator';
import { ITextarea, textarea } from '../components/textarea';
import { IText, text } from '../components/text';
import { IListInput, listInput } from '../components/list-input';

import {
  ISwitch, switchInput, ICheck, check,
} from '../components/toggle-state-input';

type InputsOfConfig = IText & ITextarea & ISwitch & ICheck & IListInput

const list: InputsOfConfig = {
  text,
  textarea,
  switch: switchInput,
  check,
  list: listInput,
};

const input = new InputConfigurator<InputsOfConfig>(list);

export const { addInput } = input;

export default input.getInputs();
