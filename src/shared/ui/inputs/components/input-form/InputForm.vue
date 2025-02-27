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

  const canShowdetail = computed(() => !input.value.isValid() || input.value.hint);
</script>

<template>
  <label v-if="input.label" class="v-label">{{ input.label }} </label>
  <component :is="input.component" v-model="input" v-bind="$attrs" />
  <slot :errors="input.getErrors()" :hint="input.hint" :is-valid="input.isValid()" name="info">
    <div v-show="canShowdetail" aria-live="polite" class="v-messages mt-1" role="alert">
      <Transition>
        <slot :hint="input.hint" name="hint">
          <div v-if="input.hint" class="v-messages__message mt-2">{{ input.hint }}</div>
        </slot>
      </Transition>
      <Transition>
        <slot :errors="input.getErrors()" :is-valid="input.isValid()" name="errors">
          <div v-if="!input.isValid()" class="v-messages__message text-error mt-2">{{ input.getErrors() }}</div>
        </slot>
      </Transition>
    </div>
  </slot>
</template>

<style lang="scss" scoped>
  .v-messages {
    opacity: 1;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>
