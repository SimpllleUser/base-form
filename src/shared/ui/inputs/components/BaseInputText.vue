<script lang="ts" setup>

import { computed, defineProps, defineEmits } from 'vue';
import { TextInput } from '../../../../shared/ui/inputs/models/TextInput';
import type { ABaseInput } from '../../../../shared/ui/inputs/models/BaseInput';

interface Props {
  modelValue: TextInput
}

interface Emits {
  (event: 'update:modelValue', payload: ABaseInput): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  input.value.value = target.value;
};
</script>

<template>
  <input v-model="input.value"  :value="input.value" :type="input.type" @input="onInput"  />
</template>
