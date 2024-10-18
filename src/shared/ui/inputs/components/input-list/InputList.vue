<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { InputFormAbstract } from '../input-form/model';
import { Colors, Sizes, Variants } from '../../../../../core/types/vuetify';
import { InputForm } from '../../../../../shared/ui/inputs';
import { InputList } from "@/shared/ui/inputs/components/input-list/model";

interface Props {
    modelValue: InputList<InputFormAbstract>
  }

interface Emits {
  (event: 'update:modelValue', payload: InputList<InputFormAbstract>): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const listData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const getActualRowItems = (rowInput) => Object.keys(rowInput).filter((key) => rowInput[key].isCustomInput)
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
    v-for="(inputsRow, rowIndex) in listData.items" :key="rowIndex"
    class="d-flex justify-space-between">
    <VCol v-for="(key, index) in getActualRowItems(inputsRow)" :key="index" class="flex items-center">
     <InputForm v-if="inputsRow[key].isCustomInput" v-model="inputsRow[key]" :key="`${rowIndex}-{key}`" class="mr-8" style="width: 200px" />
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
