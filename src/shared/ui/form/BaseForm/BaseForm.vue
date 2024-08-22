<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { useForm } from '..';

interface Props {
  config: unknown;
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
    <h1>Base form: {{ isValid }}</h1>
    <slot :form="form"/>
  </div>
  <div class="actions">
    <button @click="submitForm">Submit</button>
  </div>
</template>
