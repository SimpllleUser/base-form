<script lang="ts" setup>
  import { computed, defineEmits, defineProps } from 'vue';
  import { TextInput } from './model';
  import type { ABaseInput } from '../../models/BaseInput';

  interface Props {
    modelValue: TextInput;
  }

  interface Emits {
    (event: 'update:modelValue', payload: ABaseInput): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const input = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });

  const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    input.value.value = target.value;
  };
</script>

<template>
  <VTextField
    v-model="input.value"
    :append-inner-icon="input.appendInnerIcon"
    :clearable="input.clearable"
    v-bind="$attrs"
    hide-details
    :placeholder="input.placeholder"
    :suffix="input.suffix"
    :type="input.type"
    :value="input.value"
    @input="onInput"
  />
</template>
