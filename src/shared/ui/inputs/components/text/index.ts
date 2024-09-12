import { TextInput, TextInputParams } from './model';

export * from './model';

export interface IText {
  text: (params?: TextInputParams) => TextInput
}
export const text = (params?: TextInputParams) => new TextInput(params);
