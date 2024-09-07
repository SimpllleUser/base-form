import { TextareaInput, TextareaInputParams } from './model';

export * from './model';

export interface ITextarea {
  textarea: (params?: TextareaInputParams) => TextareaInput
}
export const textarea = (params?: TextareaInputParams) => new TextareaInput(params);
