import { InputConfigurator } from './InputConfigurator';
import { ITextarea, textarea } from '../components/textarea';
import { IText, text } from '../components/text';
import { IInputList, inputList } from '../components/input-list';

import {
  ISwitch, switchInput, ICheck, check,
} from '../components/toggle-state-input';

type InputsOfConfig = IText & ITextarea & ISwitch & ICheck & IInputList

const list: InputsOfConfig = {
  text,
  textarea,
  switch: switchInput,
  check,
  list: inputList,
};

const input = new InputConfigurator<InputsOfConfig>(list);

export const { addInput } = input;

export default input.getInputs();
