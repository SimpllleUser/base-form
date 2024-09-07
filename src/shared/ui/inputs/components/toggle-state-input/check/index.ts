import { ToggleCheckInput, ToggleCheckInputParams } from '@/shared/ui/inputs/components/toggle-state-input/ToggleCheckInput';
import BaseCheckInput from './BaseCheckInput.vue';

export interface ICheck {
  check: (params: ToggleCheckInputParams) => ToggleCheckInput
}
export const check = (params: ToggleCheckInputParams) => new ToggleCheckInput(BaseCheckInput, params);

export { default as BaseCheckInput } from './BaseCheckInput.vue';
