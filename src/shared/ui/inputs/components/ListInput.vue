<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import type { ListInput } from '../models/ListInput';
import type { ABaseInput } from '../models/BaseInput';
import { Colors, Sizes, Variants } from '@/core/types/vuetify';
// import InputTemplate from '@/shared/ui/inputs/components/input-template/InputTemplate.vue';
import { InputForm } from '../components/input-form';

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
  <div class="d-flex justify-space-between">
    <div>
      <label for="">Label</label>
    </div>
    <div>
      <VBtn @click="listData.add()" :size="Sizes.Small" :color="Colors.Primary">Add</VBtn>
    </div>
  </div>
  <VRow
    class=" d-flex justify-space-between" v-for="(inputsRow, rowIndex) in listData.items" :key="rowIndex">
    <VCol v-for="(key, index) in Object.keys(inputsRow)" :key="index" class="flex items-center">
      <InputForm v-model="inputsRow[key]" :key="`${rowIndex}-{key}`" />
    </VCol>
    <VCol cols="1" class="d-flex align-center">
      <VBtn
        @click="listData.remove(inputsRow)"
        :size="Sizes.Small"
        :color="Colors.Primary"
        :variant="Variants.Text">
            Remove
      </VBtn>
    </VCol>
  </VRow>
</template>

<style scoped lang="scss">

</style>
