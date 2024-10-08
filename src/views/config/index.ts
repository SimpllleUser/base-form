import input from '../../shared/ui/inputs/config';
import { TextInput } from '../../shared/ui/inputs/components/text';
import { ToggleCheckInput } from '../../shared/ui/inputs/components/toggle-state-input/model';
import { SelectInput, select } from '../../shared/ui/inputs/components/select';

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

  select: SelectInput

  // list: ListInput<IListItem>

  constructor(data?: ITestFormData) {
    this.id = 'test-id';
    this.header = input.text({
      value: data?.header,
      rules: { length: 5 },
      label: 'Header label',
    });
    this.switcher = input.switch({ label: 'Switcher' });
    this.checker = input.check({ label: 'Checker', rules: { required: true } });
    this.select = input.select({
      multiple: true,
      rules: { required: true, length: 2 },
      value: [{ name: 'three', id: '3' }],
      options: [
        { name: 'one', id: '1' }, { name: 'two', id: '2' }, { name: 'three', id: '3' }],
    });
  }
}
