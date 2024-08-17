import { reactive, type UnwrapNestedRefs } from 'vue';
import { forOwn } from 'lodash';
import type { DefaultFormConfig } from '../../../../shared/ui/form/composables/types';
import { ABaseInput } from '../../../../shared/ui/form/inputs/models/BaseInput';
import { ListInput } from '../inputs/models/ListInput';

const isActualInstance = (item: unknown): boolean => item instanceof ABaseInput || item instanceof ListInput;
const callActionByTree = (item: unknown, callback: (input: ABaseInput) => void) => {
  if (isActualInstance(item)) {
    callback(item as ABaseInput);
  }
  if (typeof item === 'object' && item !== null) {
    forOwn(item as Record<string, unknown>, (value => {
      callActionByTree(value, callback);
    }));
  }
};

export function useForm<T extends DefaultFormConfig>(config: T): {
  form: UnwrapNestedRefs<T>, validate: CallableFunction, resetForm: CallableFunction
} {
  const form = reactive(config);

  const makeActionForAllInputs = (callback: (input: ABaseInput) => void) => {
    forOwn(form, (formItem) => {
      callActionByTree(formItem, (item: ABaseInput) => {
        callback(item);
      });
    });
  };

  const validate = () => {
    makeActionForAllInputs((item) => {
      item.canValidate = true;
      item.isValid();
    });
  };

  const resetForm = () => {
    makeActionForAllInputs((input) => {
      input.canValidate = false;
      input.resetValue();
    });
  };

  return {
    form,
    validate,
    resetForm,
  };
}
