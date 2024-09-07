import { ToggleCheckInput, ToggleCheckInputParams } from '@/shared/ui/inputs/components/toggle-state-input/ToggleCheckInput';
import BaseSwitchInput from './BaseSwitchInput.vue';

export interface ISwitch {
  switch: (params: ToggleCheckInputParams) => ToggleCheckInput
}
export const switchInput = (params: ToggleCheckInputParams) => new ToggleCheckInput(BaseSwitchInput, params);
export { default as BaseSwitchInput } from './BaseSwitchInput.vue';
