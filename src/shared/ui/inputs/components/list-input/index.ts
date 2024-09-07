import { ListInput } from './model';
import { InputFormAbstract } from '@/shared/ui/inputs/components/input-form';

export interface IListInput {
  list: <T extends Record<string, InputFormAbstract>>(items: Array<T>, defaultItem: T) => ListInput<T>
}

export const listInput = <T extends Record<string, InputFormAbstract>>(
  items: Array<T>,
  defaultItem: T,
) => new ListInput(items, defaultItem);
