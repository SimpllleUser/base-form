<script lang="ts" setup>
  import { computed, defineEmits, defineProps } from 'vue';
  import { TextInput } from '../text/model';
  import { InputFormAbstract } from '../input-form';

  interface Props {
    modelValue: TextInput;
  }

  interface Emits {
    (event: 'update:modelValue', payload: InputFormAbstract): void;
  }

  const props = defineProps<Props>();
  const emit = defineEmits<Emits>();

  const input = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  });
</script>

<template>
  <label v-if="input.label" class="v-label">{{ input.label }} </label>
  <component :is="input.component" v-model="input" />
  <div aria-live="polite" class="v-messages mt-2" role="alert" style="opacity: 1">
    <Transition>
      <div v-if="!input.isValid()" class="v-messages__message text-error">{{ input.getErrors() }}</div>
    </Transition>
    <Transition>
      <div v-if="input.hint" class="v-messages__message mt-2">{{ input.hint }}</div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
