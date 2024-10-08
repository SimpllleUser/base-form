import { markRaw } from 'vue';
import { TextInput } from '../text/model';
import BaseInputTextarea from './BaseInputTextarea.vue';
import { InputFormFundamentalFields } from '../../../form';

export interface AdditionalTextareaInputParams {
  counter: boolean;
  maxRows: number;
  noResize: boolean
  rows: number
  autoGrow: boolean

}

export type TextareaInputParams = Partial<InputFormFundamentalFields<string> & AdditionalTextareaInputParams>

export class TextareaInput extends TextInput {
   component: unknown = markRaw(BaseInputTextarea);

  counter: boolean;

  maxRows: number;

  noResize: boolean

  rows: number

  autoGrow: boolean

  constructor(data?: TextareaInputParams) {
    super(data);
    this.counter = Boolean(data?.counter);
    this.maxRows = 1000;
    this.noResize = data?.noResize ?? true;
    this.rows = data?.rows ?? 5;
    this.autoGrow = data?.autoGrow ?? false;
  }
}
