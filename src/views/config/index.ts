import input from '../../shared/ui/inputs/models/InputConfigurator';
import { ListInput } from '../../shared/ui/inputs/models/ListInput';
import { TextInput } from '../../shared/ui/inputs/models/TextInput';
import { ValidationRule } from '../../shared/lib/input-validator';

type FieldsOfRecord = 'text' | 'description'

type IListItem = Record<FieldsOfRecord, TextInput>

const getInputRowDefault = (): IListItem => ({
  text: input.text({
    value: '',
    label: 'Label',
    hint: 'Hint',
    rules: [`${ValidationRule.Length}: 5`],
  }),
  description: input.text({
    value: '',
    label: 'Label description',
    hint: 'Hint description',
    rules: [`${ValidationRule.Length}: 5`],
  }),
});

const ITEMS_LIST: Array<{ text: TextInput, description: TextInput }> = [
  {
    text: input.text({
      value: 'Some text',
      label: 'Label',
      hint: 'Hint',
      rules: [`${ValidationRule.Length}: 5`],
    }),
    description: input.text({
      value: 'Some text description',
      label: 'Label description',
      hint: 'Hint description',
      rules: [`${ValidationRule.Length}: 5`],
    }),
  },
  {
    text: input.text({
      value: 'Some text',
      label: 'Label',
      hint: 'Hint',
      rules: [`${ValidationRule.Length}: 5`],
    }),
    description: input.text({
      value: 'Some text description',
      label: 'Label description',
      hint: 'Hint description',
      rules: [`${ValidationRule.Length}: 5`],
    }),
  },
];

interface ITestFormData {
  header: string;
  list: IListItem[];
}

interface IForm {
  header: {
    title: TextInput;
  };
  list: ListInput<IListItem>;
}

export class TestForm {
  header: {
    title: TextInput
  } = { title: input.text() }

  list: ListInput<IListItem>

  constructor(data?: ITestFormData) {
    this.header.title = input.text();
    this.list = input.list(ITEMS_LIST, getInputRowDefault());
  }
}