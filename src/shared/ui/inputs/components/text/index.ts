import { TextInput, TextInputParams } from '@/shared/ui/inputs/components/text/model';

export * from './model';
export { default as BaseInputText } from './BaseInputText.vue';

export interface IText {
  text: (params?: TextInputParams) => TextInput
}
export const text = (params?: TextInputParams) => new TextInput(params);
