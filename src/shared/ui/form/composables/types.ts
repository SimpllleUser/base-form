import { ValidationParams } from '../../../lib/input-validator/types';
import { InputFormAbstract } from '../../inputs/components/input-form/model';

export interface InputFormFundamentalFields<T = string> {
    value: T;
    label: string;
    placeholder: string;
    hint: string;
    rules: Partial<ValidationParams> | object;
}

export type InputConfig = InputFormFundamentalFields & { component: string; type?: string }

export type DefaultFormConfig = Record<string, InputFormAbstract>
