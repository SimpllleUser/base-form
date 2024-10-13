<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';
import { TextInput } from './model';

interface Props {
  modelValue: TextInput
}

interface Emits {
  (event: 'update:modelValue', payload: TextInput): void
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
  <VTextField
    v-model="input.value"
    :value="input.value"
    :type="input.type"
    :append-inner-icon="input.appendInnerIcon"
    :clearable="input.clearable"
    :placeholder="input.placeholder"
    :suffix="input.suffix"
    @input="onInput"
    hide-details
  />
</template>
