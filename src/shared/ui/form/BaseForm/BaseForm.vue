<script setup lang="ts">
import { defineProps } from 'vue';
import { useForm } from '..';

interface Props {
  config: unknown;
}
const props = defineProps<Props>();
const { form, submitForm } = useForm(props.config);

</script>

<template>
  <div>
    <h1>Base form</h1>
    <slot :form="form"/>
  </div>
  <div class="actions">
    <button @click="submitForm">Submit</button>
  </div>
</template>
