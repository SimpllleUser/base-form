<script lang="ts" setup>
  import { computed, defineEmits, defineProps } from 'vue';
  import { ABaseInput } from '../../../inputs/models';
  import { TextareaInput } from './model';

  interface Props {
    modelValue: TextareaInput;
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
  <VTextarea
    v-model="input.value"
    :append-inner-icon="input.appendInnerIcon"
    :auto-grow="input.autoGrow"
    :clearable="input.clearable"
    :placeholder="input.placeholder"
    :rows="input.rows"
    :counter="input.counter"
    :suffix="input.suffix"
    :max-rows="input.maxRows"
    :type="input.type"
    :no-resize="input.noResize"
    :value="input.value"
    v-bind="$attrs"
    hide-details
    @input="onInput"
  />
</template>
