import type { InputPrams } from 'src/shared/ui/form';
import { TextInput } from '../../../ui/form/inputs/models/TextInput';
import { ListInput } from '../../../ui/form/inputs/models/ListInput';

const text = (params: Partial<InputPrams<string>>): TextInput => new TextInput(params);
const list = <T>(items: Array<T>): ListInput<T> => new ListInput<T>(items);
const input = {
  text,
  list,
};

export default input;
