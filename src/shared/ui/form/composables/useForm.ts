import {
  computed, ComputedRef, ref, type Ref, unref,
} from 'vue';
import { cloneDeep, forOwn } from 'lodash';
import type { DefaultFormConfig } from './types';
import { InputFormAbstract, BaseInputConfig } from '../../inputs/components/input-form/model';
import { ActionForm, FormParams } from '../../form/BaseForm';
import { ListInput } from '../../inputs/components/list-input/model';

const isActualInstance = (item: unknown): boolean => item instanceof InputFormAbstract || item instanceof ListInput;
const callActionByTree = (item: unknown, callback: (input: InputFormAbstract) => void) => {
  if (isActualInstance(item)) {
    callback(item as InputFormAbstract);
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
  getActionStates: (params: FormParams) => ({ action: ActionForm, isActionNone: boolean })
  getAction: (params: FormParams) => ActionForm
  isActionNone: (params: FormParams) => boolean
  getValue: <T extends Record<string, unknown>> () => T
}

export function useForm<T extends DefaultFormConfig>(config: T): IUseForm<T> {
  const defaultValue = cloneDeep(config);
  const form = ref(config) as Ref<T>;

  const makeActionForAllInputs = (callback: (input: InputFormAbstract) => void) => {
    const unwrappedForm = unref(form);
    forOwn(unwrappedForm, (formItem) => {
      callActionByTree(formItem, (item: InputFormAbstract) => {
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

  const submitForm = (callback: (stateForm: boolean) => void) => {
    validate();
    callback(isValid.value);
  };

  const getAction = (params: FormParams): ActionForm => {
    if (params?.action) return params.action;
    return ActionForm.None;
  };

  const isActionNone = (params: FormParams): boolean => getAction(params) === ActionForm.None;

  const getActionStates = (params: FormParams) => ({
    isActionNone: isActionNone(params),
    action: getAction(params),
  });

  const getValue = <T extends object>(): T => Object
    .fromEntries(Object
      .entries(form.value)
      .map(([key, input]) => [
        key, isActualInstance(input)
          ? input?.getValue()
          : input,
      ])) as T;

  return {
    form,
    validate,
    clearForm,
    resetForm,
    submitForm,
    getActionStates,
    getAction,
    isActionNone,
    getValue,
    isValid,
  };
}
