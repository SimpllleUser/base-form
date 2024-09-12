<script lang="ts" setup>
import {
  defineOptions, computed, defineProps, defineEmits,
} from 'vue';

defineOptions({
  name: 'BaseSwitchInput',
});

import { ToggleCheckInput } from '../model';

interface Props {
  modelValue: ToggleCheckInput
}

interface Emits {
  (event: 'update:modelValue', payload: ToggleCheckInput): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <v-switch
    v-model="input.value"
    :color="input.color"
    :append-icon="input.appendIcon"
    :prepend-icon-icon="input.prependIcon"
    :placeholder="input.placeholder"
    hide-details
  />
</template>
