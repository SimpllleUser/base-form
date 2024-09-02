<script lang="ts" setup>

import { computed, defineProps, defineEmits } from 'vue';
import { TextInput } from '../../../../shared/ui/inputs/models/TextInput';
import type { ABaseInput } from '../../../../shared/ui/inputs/models/BaseInput';
import { Icon } from '@/core/types/icons';
import { TextareaInput } from '@/shared/ui/inputs/models/TextareaInput';

interface Props {
  modelValue: TextareaInput
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
  <VTextarea
    v-model="input.value"
    :value="input.value"
    :type="input.type"
    :append-inner-icon="input.appendInnerIcon"
    :clearable="input.clearable"
    :placeholder="input.placeholder"
    :suffix="input.suffix"
    :auto-grow="input.autoGrow"
    :rows="input.rows"
    :counter="input.counter"
    :max-rows="input.maxRows"
    :no-resize="input.noResize"
    @input="onInput"
  />
</template>
