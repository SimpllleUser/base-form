import { ValidationRule } from '../../../../shared/lib/input-validator/types';
import { ABaseInput } from '@/shared/ui/form/inputs/models/BaseInput';

export interface InputPrams<T = string> {
    value: T;
    label: string;
    hint: string;
    rules: Array<ValidationRule | string>
}

export type InputConfig = InputPrams & { component: string; type?: string }

export type DefaultFormConfig = Record<string, ABaseInput>
