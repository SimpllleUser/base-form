import type { InputPrams } from '../../../../shared/ui/form';
import { TextInput } from '../../../ui/form/inputs/models/TextInput';
import { ListInput } from '../../../ui/form/inputs/models/ListInput';
import { ABaseInput } from '@/shared/ui/form/inputs/models/BaseInput';

const text = (params: Partial<InputPrams<string>>): TextInput => new TextInput(params);
const list = <T extends Record<string, ABaseInput>>(
  items: Array<T>,
  defaultItem?: T | null,
): ListInput<T> => new ListInput<T>(items, defaultItem || null);
const input = {
  text,
  list,
};

export default input;
