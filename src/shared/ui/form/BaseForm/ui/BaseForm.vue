<script setup lang="ts">
  import { computed, defineEmits, defineProps, onMounted, ref, watch } from 'vue';
  import { OnSubmitPayload, useForm } from '../../index';
  import { ActionForm } from '../../../../../shared/ui/form/BaseForm/types';
  import { Colors, Variants } from '../../../../../core/types/vuetify';

  interface Props {
    config: unknown;
    params?: { action: ActionForm };
    buttonCreate?: { color: Colors; variant: Variants };
    buttonCancel?: { color: Colors; variant: Variants };
  }

  interface Emits {
    (event: 'on-submit', payload: OnSubmitPayload<unknown>): void;
  }

  const emit = defineEmits<Emits>();

  const props = withDefaults(defineProps<Props>(), {
    params: { action: ActionForm.None },
    buttonCreate: () => ({ color: Colors.Primary, variant: Variants.Flat }),
    buttonCancel: () => ({ color: Colors.Primary, variant: Variants.Outlined })
  });

  const formConfig = ref(useForm(props.config));
  watch(
    () => props.config,
    (newConfig) => {
      formConfig.value = useForm(newConfig);
    },
    { deep: true }
  );

  const onSubmit = (isValid: boolean): void => {
    emit('on-submit', {
      value: formConfig.value.getValue(),
      isValid,
      ...formConfig.value.getActionStates(props.params)
    });
  };

  onMounted(() => {
    formConfig.value.resetForm();
  });

  const submitButtonLabel = computed(() => formConfig.value.getAction(props?.params || {}));
  const showButtonAction = computed(() => !formConfig.value.isActionNone(props?.params || {}));
</script>

<template>
  <VForm @submit.prevent>
    <div class="form-body">
      <slot :form="formConfig.form" />
    </div>
    <div class="actions">
      <slot name="actions">
        <VBtn
          v-if="showButtonAction"
          :color="buttonCreate.color"
          :variant="buttonCreate.variant"
          @click="formConfig.submitForm(onSubmit)"
          >{{ submitButtonLabel }}
        </VBtn>
        <VBtn
          v-if="showButtonAction"
          class="ml-6"
          :color="buttonCancel.color"
          :variant="buttonCancel.variant"
          @click="formConfig.resetForm"
          >Cancel
        </VBtn>
      </slot>
    </div>
  </VForm>
</template>
