<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { BaseInput } from '../../../../shared/ui/inputs/components';
import type { ListInput } from '../../../../shared/ui/inputs/models/ListInput';
import type { ABaseInput } from '../../../../shared/ui/inputs/models/BaseInput';

  interface Props {
    modelValue: ListInput<ABaseInput>
  }

  interface Emits {
    (event: 'update:modelValue', payload: ListInput<ABaseInput>): void
  }

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const listData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <div>
    <button @click="listData.add()">Add</button>
  </div>
  <div v-for="(inputsRow, rowIndex) in listData.items" :key="rowIndex" style="display: flex; justify-content: space-between">
    <div v-for="(key, index) in Object.keys(inputsRow)" :key="index" class="flex items-center">
      <BaseInput v-model="inputsRow[key]" :key="`${rowIndex}-{key}`" />
    </div>
    <button @click="listData.remove(inputsRow)">Remove</button>
  </div>
</template>

<style scoped lang="scss">

</style>
