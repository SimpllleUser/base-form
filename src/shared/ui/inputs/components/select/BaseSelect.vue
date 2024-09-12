<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue';
import { SelectInput } from './model';

interface Props {
  modelValue: SelectInput
}

interface Emits {
  (event: 'update:modelValue', payload: SelectInput): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

</script>

<template>
  <VSelect
    v-model="input.value"
    :items="input.options"
    :chips="input.chips"
    :clearable="input.clearable"
    :placeholder="input.placeholder"
    :multiple="input.multiple"
    :item-title="input.itemTitle"
    :item-value="input.itemValue"
    hide-details
  />
</template>
