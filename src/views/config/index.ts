import input from '../../shared/ui/inputs/models/InputConfigurator';
import { ListInput } from '../../shared/ui/inputs/models/ListInput';
import { TextInput } from '../../shared/ui/inputs/models/TextInput';

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
  list: ListInput<IListItem>;
}

export class TestForm implements IForm {
  id?: string;

  header: TextInput

  list: ListInput<IListItem>

  constructor(data?: ITestFormData) {
    this.id = 'test-id';
    this.header = input.textarea({
      value: data?.header,
      rules: { length: 5 },
      label: 'Header label',
      rows: 3,
      autoGrow: true,
    });
    this.list = input.list(ITEMS_LIST, getInputRowDefault());
  }
}
