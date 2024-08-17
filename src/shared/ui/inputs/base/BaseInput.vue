<script lang="ts" setup>

import { computed, defineProps, defineEmits } from 'vue';
import { TextInput } from '../../../../shared/ui/form/inputs/models/TextInput';
import type { ABaseInput } from '../../../../shared/ui/form/inputs/models/BaseInput';

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
  <label style="font-size: 14px"> {{ input.label }} </label>
  <br>
  <component :is="input.component" :value="input.value" :type="input.type" @input="onInput" />
  <br>
  <small style="font-size: 12px">{{ input.hint }}</small>
  errors: {{ input.getErrors() }} |
  is valid: {{ input.isValid() }}
</template>

<style scoped lang="scss">

</style>
