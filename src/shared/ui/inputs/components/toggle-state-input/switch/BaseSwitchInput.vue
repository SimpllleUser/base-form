<script lang="ts" setup>
  import { computed, defineEmits, defineOptions, defineProps } from 'vue';

  import { ToggleCheckInput } from '../model';

  defineOptions({
    name: 'BaseSwitchInput'
  });

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
  <v-switch
    v-model="input.value"
    :append-icon="input.appendIcon"
    :color="input.color"
    v-bind="$attrs"
    hide-details
    :placeholder="input.placeholder"
    :prepend-icon-icon="input.prependIcon"
  />
</template>
