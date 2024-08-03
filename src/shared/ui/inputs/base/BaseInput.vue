<script lang="ts" setup>

import { InputConfig } from '../../form/composables/useForm';
import {computed} from "vue";

interface Props {
  modelValue: InputConfig
}

interface Emits {
  (event: 'update:modelValue', payload: InputConfig): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const input = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const onInput = (event) => {
  input.value.value = event.target.value
}

</script>

<template>
  <labe> {{ input.label }} </labe>
  <br>
  <component :is="input.component" :value="input.value" :type="input.type" @input="onInput" />
  <br>
  <smal>{{ input.hint }}</smal>
</template>


<style scoped lang="scss">

</style>
