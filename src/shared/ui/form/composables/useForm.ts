import { reactive, type UnwrapNestedRefs } from 'vue';
import type { DefaultFormConfig } from '@/shared/ui/form/composables/types';
import type { ABaseInput } from '@/shared/ui/form/inputs/models/BaseInput';

export function useForm<T extends object = DefaultFormConfig>(config: T): {
  form: UnwrapNestedRefs<T>, validate: CallableFunction
} {
  const form = reactive(config);
  const validate = () => {
    Object.values(form).forEach((input: ABaseInput) => input.canValidate = true);
    return Object.values(form).every((input: ABaseInput) => input.isValid());
  };

  return {
    form,
    validate,
  };
}
