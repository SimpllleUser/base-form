<script setup lang="ts">
import {
  defineProps, defineEmits, onMounted, computed, watch, reactive,
} from 'vue';
import { OnSubmitPayload, useForm } from '../../index';
import { ActionForm } from '../../../../../shared/ui/form/BaseForm/types';

interface Props {
  config: unknown;
  params?: { action: ActionForm };
}

interface Emits {
  (event: 'on-submit', payload: OnSubmitPayload<unknown>): void
}

const emit = defineEmits<Emits>();

const props = defineProps<Props>();

const formConfig = reactive(useForm(props.config));

watch(() => props.config, (newConfig) => {
  Object.assign(formConfig, useForm(newConfig));
}, { deep: true });

const onSubmit = (isValid: boolean): void => {
  emit('on-submit', {
    value: formConfig.getValue(),
    isValid,
    ...formConfig.getActionStates(props.params),
  });
};

onMounted(() => {
  formConfig.resetForm();
});

const submitButtonLabel = computed(() => formConfig.getAction(props?.params || {}));
const showButtonAction = computed(() => !formConfig.isActionNone(props?.params || {}));
</script>

<template>
  <VForm @submit.prevent>
    <div>
      <h1>Base form</h1>
      <slot :form="formConfig.form"/>
    </div>
    <div class="actions">
      <slot name="actions" >
        <VBtn
          color="primary"
          v-if="showButtonAction"
          @click="formConfig.submitForm(onSubmit)">{{ submitButtonLabel }}</VBtn>
      </slot>
    </div>
  </VForm>
</template>
