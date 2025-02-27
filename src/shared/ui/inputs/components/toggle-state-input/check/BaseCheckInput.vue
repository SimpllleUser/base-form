<script lang="ts" setup>
  import { computed, defineEmits, defineProps } from 'vue';
  import { ToggleCheckInput } from '../model';

  interface Props {
    modelValue: ToggleCheckInput;
  }

  interface Emits {
    (event: 'update:modelValue', payload: ToggleCheckInput): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const input = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });
</script>

<template>
  <v-checkbox
    v-model="input.value"
    :append-icon="input.appendIcon"
    :color="input.color"
    v-bind="$attrs"
    hide-details
    :placeholder="input.placeholder"
    :prepend-icon-icon="input.prependIcon"
  />
</template>
