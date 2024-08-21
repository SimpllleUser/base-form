import {
  ref, type Ref, unref,
} from 'vue';
import { cloneDeep, forOwn } from 'lodash';
import type { DefaultFormConfig } from './types';
import { ABaseInput } from '../../inputs/models/BaseInput';
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

const getStateMethodOfItemForm = (item: unknown, methodName: string, callback: CallableFunction) => {
  forOwn(item, (item: ABaseInput) => {
    if (item[methodName]) callback(item[methodName]());
    else getStateMethodOfItemForm(item, methodName, callback);
  });
};

export interface IUseForm<T> {
  form: Ref<T>,
  validate: CallableFunction,
  resetForm: CallableFunction,
  clearForm: CallableFunction,
  submitForm: CallableFunction,
  isValid: () => boolean
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

  const isValid = () => {
    const states: Array<boolean> = [];
    getStateMethodOfItemForm(form.value, 'isValid', (state: boolean) => {
      states.push(state);
    });
    return states.every(Boolean);
  };

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
