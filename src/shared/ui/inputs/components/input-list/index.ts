import { InputList } from './model';
import { InputFormAbstract } from '../../../../../shared/ui/inputs/components/input-form';

export interface IInputList {
  list: <T extends Record<string, InputFormAbstract>>(items: Array<T>, defaultItem: T) => InputList<T>
}

export const inputList = <T extends Record<string, InputFormAbstract>>(
  items: Array<T>,
  defaultItem: T,
) => new InputList(items, defaultItem);
