import { markRaw } from 'vue';
import { ABaseInput, type BaseInputConfig } from './BaseInput';
import type { InputPrams } from '../../form/composables';
import { InputValidator } from '../../../lib/input-validator';
import { Icon } from '../../../../core/types/icons';
import BaseInputText from '../components/BaseInputText.vue';
import { TextInput } from '@/shared/ui/inputs/models/TextInput';
import BaseInputTextarea from '@/shared/ui/inputs/components/BaseInputTextarea.vue';

export interface AdditionalTextareaInputParams {
  counter: boolean;
  maxRows: number;
  noResize: boolean
  rows: number
  autoGrow: boolean

}

export type TextareaInputParams = Partial<InputPrams<string> & AdditionalTextareaInputParams>

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
