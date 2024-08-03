export enum Rules {

}

export interface InputPrams<T = string> {
    value: T;
    label: string;
    hint: string;
    rules: Array<Rules>
}

export type InputConfig = InputPrams & { component: string; type?: string }

export type DefaultFormConfig = Record<string, InputConfig>
