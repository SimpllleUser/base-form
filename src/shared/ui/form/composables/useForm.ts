import {
  ref, type Ref, unref,
} from 'vue';
import { cloneDeep, forOwn } from 'lodash';
import type { DefaultFormConfig } from '../../../../shared/ui/form/composables/types';
import { ABaseInput } from '../../../../shared/ui/inputs/models/BaseInput';
import { ListInput } from '../../../../shared/ui/inputs/models/ListInput';

const isActualInstance = (item: unknown): boolean => item instanceof ABaseInput || item instanceof ListInput;
const callActionByTree = (item: unknown, callback: (input: ABaseInput) => void) => {
  if (isActualInstance(item)) {
    callback(item as ABaseInput);
  }
  if (typeof item === 'object' && item !== null) {
    forOwn(item as Record<string, unknown>, (value) => {
      callActionByTree(value, callback);
    });
  }
};

export function useForm<T extends DefaultFormConfig>(config: T): {
  form: Ref<T>,
  validate: CallableFunction,
  resetForm: CallableFunction,
  clearForm: CallableFunction,
} {
  const defaultValue = cloneDeep(config);
  const form = ref(config) as Ref<T>;

  const makeActionForAllInputs = (callback: (input: ABaseInput) => void) => {
    const unwrappedForm = unref(form);
    forOwn(unwrappedForm, (formItem) => {
      callActionByTree(formItem, (item: ABaseInput) => {
        callback(item);
      });
    });
  };

  const setStateValidation = (state: boolean) => {
    makeActionForAllInputs((input) => {
      input.canValidate = state;
    });
  };

  const validate = () => {
    setStateValidation(true);
    makeActionForAllInputs((item) => {
      item.isValid();
    });
  };

  const clearForm = () => {
    setStateValidation(false);
    makeActionForAllInputs((input) => {
      input.resetValue();
    });
  };

  const resetForm = () => {
    form.value = cloneDeep(defaultValue);
    setStateValidation(false);
  };

  return {
    form,
    validate,
    clearForm,
    resetForm,
  };
}
