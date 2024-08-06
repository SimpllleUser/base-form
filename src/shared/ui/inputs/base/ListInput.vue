<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import type { ListInput } from '../../../../shared/ui/form/inputs/models/ListInput';
import { BaseInput } from '../../../../shared/ui/inputs';
import type { ABaseInput } from '../../../../shared/ui/form/inputs/models/BaseInput';

  interface Props {
    modelValue: ListInput<ABaseInput>
  }

  interface Emits {
    (event: 'update:modelValue', payload: ListInput<ABaseInput>): void
  }

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const inputs = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <div v-for="(inputsRow, rowIndex) in inputs" :key="rowIndex" style="display: flex; justify-content: space-between">
    <div v-for="(key, index) in Object.keys(inputsRow)" :key="index" class="flex items-center">
      <BaseInput v-model="inputsRow[key]" />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
