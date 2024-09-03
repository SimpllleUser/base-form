import input from '../../shared/ui/inputs/models/input';
import { ListInput } from '../../shared/ui/inputs/models/ListInput';
import { TextInput } from '../../shared/ui/inputs/models/TextInput';
import { ToggleCheckInput } from '@/shared/ui/inputs/models/ToggleCheckInput';

type FieldsOfRecord = 'text' | 'description'

type IListItem = Record<FieldsOfRecord, TextInput>

const getInputRowDefault = (): IListItem => ({
  text: input.text({
    value: '',
    label: 'Label',
    hint: 'Hint',
  }),
  description: input.text({
    value: '',
    label: 'Label description',
    hint: 'Hint description',
  }),
});

const ITEMS_LIST: Array<{ text: TextInput, description: TextInput }> = [
  {
    text: input.text({
      value: 'Some text',
      label: 'Label',
      hint: 'Hint',
    }),
    description: input.text({
      value: 'Some text description',
      label: 'Label description',
      hint: 'Hint description',
    }),
  },
  {
    text: input.text({
      value: 'Some text',
      label: 'Label',
      hint: 'Hint',
    }),
    description: input.text({
      value: 'Some text description',
      label: 'Label description',
      hint: 'Hint description',
    }),
  },
];

export interface ITestFormData {
  header: string;
  list: IListItem[];
}

interface IForm {
  header: TextInput;
  checker: ToggleCheckInput
  // list: ListInput<IListItem>;
}

export class TestForm implements IForm {
  id?: string;

  header: TextInput

  switcher: ToggleCheckInput

  checker: ToggleCheckInput

  // list: ListInput<IListItem>

  constructor(data?: ITestFormData) {
    this.id = 'test-id';
    this.header = input.textarea({
      value: data?.header,
      rules: { length: 5 },
      label: 'Header label',
      rows: 3,
      autoGrow: true,
    });
    this.switcher = input.switch({ label: 'Switcher' });
    this.checker = input.check({ label: 'Checker' });
  }
}
