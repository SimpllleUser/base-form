import { ValidationRule } from '../../../../shared/lib/input-validator/types';

export interface InputPrams<T = string> {
    value: T;
    label: string;
    hint: string;
    rules: Array<ValidationRule | string>
}

export type InputConfig = InputPrams & { component: string; type?: string }

export type DefaultFormConfig = Record<string, InputConfig>
