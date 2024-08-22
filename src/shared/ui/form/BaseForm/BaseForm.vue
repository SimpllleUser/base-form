<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { useForm } from '..';

type ActionForm = 'Update' | 'Create'

interface Props {
  config: unknown;
  params: { action: ActionForm };
}
const props = defineProps<Props>();
const {
  form, submitForm, isValid, resetForm,
} = useForm(props.config);

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
    <button @click="isValid && submitForm">Submit</button>
  </div>
</template>
