<script setup lang="ts">
  import { computed, defineEmits, defineProps } from 'vue';
  import { InputFormAbstract } from '../input-form/model';
  import { Colors, Sizes, Variants } from '../../../../../core/types/vuetify';
  import { InputForm } from '../../../../../shared/ui/inputs';
  import { InputList } from '../../../../../shared/ui/inputs/components/input-list/model';
  import { Icon } from '../../../../../core/types/icons';

  interface ListBtnConfig {
    label: string;
    color: Colors;
    variant: Variants;
    sizes: Sizes;
  }

  interface IListConfig {
    remove: ListBtnConfig;
    add: ListBtnConfig;
  }

  interface Props {
    modelValue: InputList<InputFormAbstract>;
    label?: string;
    config?: IListConfig;
    headerClass?: string;
    rowClass?: string;
  }

  interface Emits {
    (event: 'update:modelValue', payload: InputList<InputFormAbstract>): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const listData = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });

  const addBtnProps = computed(() => ({
    label: 'Add',
    color: Colors.Primary,
    size: Sizes.Small,
    class: 'text-white'
  }));

  const removeBtnProps = computed(() => ({
    label: 'Remove',
    color: Colors.Primary,
    size: Sizes.Small,
    variant: Variants.Shaped
  }));

  const getActualRowItems = (rowInput) => Object.keys(rowInput).filter((key) => rowInput[key].isCustomInput);
  const isEmptyList = computed(() => !listData.value?.items?.length);
</script>

<template>
  <div>
    <div class="d-flex justify-space-between" :class="headerClass">
      <div v-if="label">{{ label }}</div>
      <div>
        <slot :add-item="listData.add" name="btn-add">
          <VBtn v-bind="addBtnProps" l @click="listData.add()">{{ addBtnProps.label }}</VBtn>
        </slot>
      </div>
    </div>
    <VRow
      v-for="(inputsRow, rowIndex) in listData.items"
      :key="rowIndex"
      class="d-flex justify-space-between"
      :class="rowClass"
    >
      <VCol v-for="(key, index) in getActualRowItems(inputsRow)" :key="index" class="flex items-center">
        <InputForm v-if="inputsRow[key].isCustomInput" :key="`input-${rowIndex}`" v-model="inputsRow[key]" />
      </VCol>
      <VCol class="d-flex align-center" cols="2">
        <slot
          :remove-item="
            () => {
              listData.remove(inputsRow);
            }
          "
        >
          <VBtn v-bind="removeBtnProps" :icon="Icon.TrashCan" @click="listData.remove(inputsRow)" />
        </slot>
      </VCol>
    </VRow>
    <div v-if="isEmptyList">
      <slot name="empty"></slot>
    </div>
  </div>
</template>
