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

  interface OnItemClassParams {
    input: InputFormAbstract;
    key: string;
    index: number;
  }

  interface Props {
    modelValue: InputList<InputFormAbstract>;
    label?: string;
    config?: IListConfig;
    headerClass?: string;
    rowClass?: string;
    labelWrapperClass?: string;
    btnAddWrapperClass?: string;
    colsRemove?: number;
    onItemClass?: (params: OnItemClassParams) => string;
    withHedeDivider?: boolean;
    withAnimation?: boolean;
  }

  interface Emits {
    (event: 'update:modelValue', payload: InputList<InputFormAbstract>): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    colsRemove: 1,
    onItemClass: () => '',
    withHedeDivider: true
  });
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
    color: Colors.Error,
    size: Sizes.Small,
    variant: Variants.Shaped
  }));

  const getActualRowItems = (rowInput) => Object.keys(rowInput).filter((key) => rowInput[key].isCustomInput);
  const isEmptyList = computed(() => !listData.value?.items?.length);

  const addItem = () => {
    listData.value.add();
  };

  const onClass = (params: OnItemClassParams) => props?.onItemClass(params);

  const transitionGroupName = computed(() => (props.withAnimation ? 'list' : ''));
</script>

<template>
  <div>
    <div class="d-flex justify-space-between" :class="headerClass">
      <div class="label-wrapper" :class="labelWrapperClass">
        <slot :label="label" name="label">{{ label }}</slot>
      </div>
      <div class="btn-add-wrapper" :class="btnAddWrapperClass">
        <slot :add-item="addItem" name="btn-add">
          <VBtn v-bind="addBtnProps" @click="addItem()">{{ addBtnProps.label }}</VBtn>
        </slot>
      </div>
    </div>
    <div v-if="withHedeDivider">
      <VDivider />
    </div>
    <div :class="{ 'test py-4': listData.items.length }">
      <TransitionGroup :name="transitionGroupName" tag="div">
        <VRow
          v-for="(inputsRow, rowIndex) in listData.items"
          :key="rowIndex"
          class="d-flex justify-space-between"
          :class="rowClass"
        >
          <VCol
            v-for="(key, index) in getActualRowItems(inputsRow)"
            :key="index"
            class="flex items-center"
            :class="onClass({ input: inputsRow[key], key, index })"
          >
            <InputForm v-if="inputsRow[key].isCustomInput" :key="`input-${rowIndex}`" v-model="inputsRow[key]" />
          </VCol>
          <VCol class="d-flex align-center" :cols="colsRemove">
            <slot
              name="remove-btn"
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
      </TransitionGroup>
    </div>
    <div v-if="isEmptyList">
      <slot name="empty"></slot>
    </div>
  </div>
</template>

<style scoped>
  /* Animate on render element */
  .list-enter-active {
    transition: all 0.3s ease;
  }

  /* Animate on remove element */
  .list-leave-active {
    transition: all 0.3s ease;
    position: absolute;
    width: 100%;
  }

  /* Innitial state of rendering */
  .list-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }

  /* Final  state of removing */
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
    max-height: 0;
    margin-bottom: 0;
    padding-top: 0;
  }

  /* Animate the movement of the remaining elements */
  .list-move {
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  }

  /* Container for correct positioning */
  :deep(.v-row) {
    position: relative;
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  }
</style>
