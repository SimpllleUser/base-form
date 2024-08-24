<script setup lang="ts">
import {
  defineProps, defineEmits, onMounted, computed,
} from 'vue';
import { useForm } from '../../index';
import { ActionForm } from '@/shared/ui/form/BaseForm/types';

interface Props {
  config: unknown;
  params?: { action: ActionForm };
}

interface Emits {
  (event: 'on-submit', payload: { isValid: boolean, action: ActionForm, isActionNone: boolean }): void
}

const emit = defineEmits<Emits>();

const props = defineProps<Props>();
const {
  form, submitForm, resetForm, getActionStates, getAction, isActionNone,
} = useForm(props.config);

const onSubmit = (isValid: boolean): void => {
  emit('on-submit', {
    isValid,
    ...getActionStates(props.params),
  });
};

onMounted(() => {
  resetForm();
});

const submitButtonLabel = computed(() => getAction(props?.params || {}));
const showButtonAction = computed(() => !isActionNone(props?.params || {}));
</script>

<template>
  <div>
    <h1>Base form</h1>
    <slot :form="form"/>
  </div>
  <div class="actions">
    <slot name="actions" >
      <button
        v-if="showButtonAction"
        @click="submitForm(onSubmit)">{{ submitButtonLabel }}</button>
    </slot>
  </div>
</template>
