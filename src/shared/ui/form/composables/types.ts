import { ValidationRule } from '../../../lib/input-validator/types';
import { ABaseInput } from '../../inputs/models/BaseInput';

export interface InputPrams<T = string> {
    value: T;
    label: string;
    hint: string;
    rules: Array<ValidationRule | string>
}

export type InputConfig = InputPrams & { component: string; type?: string }

export type DefaultFormConfig = Record<string, ABaseInput>
