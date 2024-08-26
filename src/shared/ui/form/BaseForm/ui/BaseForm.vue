<script setup lang="ts">
import {
  defineProps, defineEmits, onMounted, computed, ref, watch,
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

const formConfig = ref(useForm(props.config));
watch(() => props.config, (newConfig) => {
  formConfig.value = useForm(newConfig);
}, { deep: true });

const onSubmit = (isValid: boolean): void => {
  emit('on-submit', {
    isValid,
    ...formConfig.value.getActionStates(props.params),
  });
};

onMounted(() => {
  formConfig.value.resetForm();
});

const submitButtonLabel = computed(() => formConfig.value.getAction(props?.params || {}));
const showButtonAction = computed(() => !formConfig.value.isActionNone(props?.params || {}));
</script>

<template>
  <div>
    <h1>Base form</h1>
    <slot :form="formConfig.form"/>
  </div>
  <div class="actions">
    <slot name="actions" >
      <button
        v-if="showButtonAction"
        @click="formConfig.submitForm(onSubmit)">{{ submitButtonLabel }}</button>
    </slot>
  </div>
</template>
