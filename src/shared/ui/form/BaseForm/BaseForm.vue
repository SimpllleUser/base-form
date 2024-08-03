<script setup lang="ts">

import { useForm, text, InputConfig } from '../composables/useForm';
import BaseInput from '@/shared/ui/inputs/base/BaseInput.vue';

interface FormConfig {
  text: InputConfig
}

const formConfig: FormConfig = {

  text: text({
    value: 'Some text',
    label: 'Test input',
    hint: 'Hint for text',
  }),
};

const { form } = useForm<FormConfig>(formConfig);

</script>

<template>
    <div>
        BaseForm: {{ form }}
    </div>
  <div>
    <BaseInput v-model="form.text" />
  </div>
</template>

<style scoped lang="scss">

</style>
