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

</script>

<template>
  <label v-if="input.label" class="label">{{ input.label }}</label>
  <br>
  <component :is="input.component" v-model="input" />
  <br>
  <span class="hint" v-if="input.hint">{{ input.hint }}</span>
  <span v-if="!input.isValid()" class="invalid-field">
    {{ input.getErrors() }}
  </span>
</template>

<style scoped lang="scss">
.label {
  font-size: 14px;
  color: #464646;
  font-weight: bold;
}
.hint {
  font-size: 10px;
  color: #8c8c8c;
  font-weight: bolder;
}
.invalid-field {
  color: red;
  font-size: 12px;
}
</style>
