<script lang="ts" setup>
  import { computed, defineEmits, defineProps } from 'vue';
  import { SelectInput } from './model';

  interface Props {
    modelValue: SelectInput;
  }

  interface Emits {
    (event: 'update:modelValue', payload: SelectInput): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const input = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });
</script>

<template>
  <VSelect
    v-model="input.value"
    :chips="input.chips"
    :clearable="input.clearable"
    hide-details
    :item-title="input.itemTitle"
    :item-value="input.itemValue"
    :items="input.options"
    :multiple="input.multiple"
    :placeholder="input.placeholder"
  />
</template>
