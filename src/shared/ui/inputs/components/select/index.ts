import { InputSelectorParams, SelectInput } from '@/shared/ui/inputs/components/select/model';

export { default as BaseSelect } from './BaseSelect.vue';
export * from './model';

export interface ISelect {
  select: (params: InputSelectorParams) => SelectInput
}

export const select = (params: InputSelectorParams) => new SelectInput(params);
