import { InputConfig, InputPrams } from "@/shared/ui/form/composables/types";

const DEFAULT_PARAMS_INPUT: InputPrams = {
    value: '',
    label: '',
    hint: '',
    rules: [],
}

export const text = (params: Partial<InputPrams>): InputConfig => ({
    ...DEFAULT_PARAMS_INPUT,
    ...params,
    component: 'input',
    type: 'text',
})


// const number = () => ({})
// const select = () => ({})
// const check = () => ({})
// const switcher = () => ({})


const input = {
    text,
}

export default inputs
