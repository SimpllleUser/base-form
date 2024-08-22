<script setup lang="ts">
import { defineProps, defineEmits, onMounted } from 'vue';
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
  form, submitForm, resetForm, getActionStates,
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
</script>

<template>
  <div>
    <h1>Base form</h1>
    <slot :form="form"/>
  </div>
  <div class="actions">
    <button @click="submitForm(onSubmit)">Submit</button>
  </div>
</template>
