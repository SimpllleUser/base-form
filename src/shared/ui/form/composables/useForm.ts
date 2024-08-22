import {
  computed, ComputedRef,
  ref, type Ref, unref,
} from 'vue';
import { cloneDeep, forOwn, has } from 'lodash';
import type { DefaultFormConfig } from './types';
import { ABaseInput, BaseInputConfig } from '../../inputs/models/BaseInput';
import { ListInput } from '../../inputs/models/ListInput';

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

const getStateMethodOfItemForm = <T>(
  item: unknown,
  methodName: keyof BaseInputConfig<T>,
  callback: CallableFunction,
) => {
  if (item && typeof item === 'object') {
    forOwn(item, (subItem: unknown) => {
      if (subItem && typeof subItem === 'object') {
        const method = (subItem as Record<string, any>)[methodName];
        if (typeof method === 'function') {
          callback(method.call(subItem));
        } else {
          getStateMethodOfItemForm(subItem, methodName, callback);
        }
      }
    });
  }
};

export interface IUseForm<T> {
  form: Ref<T>,
  validate: CallableFunction,
  resetForm: CallableFunction,
  clearForm: CallableFunction,
  submitForm: CallableFunction,
  isValid: ComputedRef<boolean>
}

export function useForm<T extends DefaultFormConfig>(config: T): IUseForm<T> {
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

  const isValid = computed(() => {
    const states: Array<boolean> = [];
    getStateMethodOfItemForm(form.value, 'isValid', (state: boolean) => {
      states.push(state);
    });
    return states.every(Boolean);
  });

  const submitForm = () => {
    validate();
  };

  return {
    form,
    validate,
    clearForm,
    resetForm,
    submitForm,
    isValid,
  };
}
