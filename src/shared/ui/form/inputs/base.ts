import type { InputPrams } from '../../../../shared/ui/form';
import { TextInput } from '../../../ui/form/inputs/models/TextInput';
import { ListInput } from '../../../ui/form/inputs/models/ListInput';
import { ABaseInput } from '@/shared/ui/form/inputs/models/BaseInput';

const text = (params: Partial<InputPrams<string>>): TextInput => new TextInput(params);
const list = (
  items: Array<Record<string, ABaseInput>>,
  defaultItem?: Record<string, ABaseInput> | null,
): ListInput => new ListInput(items, defaultItem || null);
const input = {
  text,
  list,
};

export default input;
