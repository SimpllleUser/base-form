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
  <label v-if="input.label" class="v-label">{{ input.label }}</label>
  <component :is="input.component" v-model="input" />
  <div style="opacity: 1" class="v-messages mt-2" role="alert" aria-live="polite">
    <div v-if="input.hint" class="v-messages__message"> {{ input.hint }}</div>
    <div  v-if="!input.isValid()"  class="v-messages__message text-error"> {{ input.getErrors() }}</div>
  </div>
</template>
