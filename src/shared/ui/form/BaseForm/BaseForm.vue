<script setup lang="ts">

import { useForm } from '../../../../shared/ui/form/composables';
import input from '../../../../shared/ui/form/inputs/base';
import { TextInput } from '../../../../shared/ui/form/inputs/models/TextInput';
import { ValidationRule } from '../../../../shared/lib/input-validator/types';
import { type IListInput } from '../../../../shared/ui/form/inputs/models/ListInput';
import ListInput from '../../inputs/base/ListInput.vue';

interface FormConfig { list: IListInput<{ text: TextInput, description: TextInput }>}

const ITEMS_LIST: Array<{ text: TextInput, description: TextInput }> = [
  {
    text: input.text({
      value: 'Some text',
      label: 'Label',
      hint: 'Hint',
      rules: [`${ValidationRule.Length}: 5`],
    }),
    description: input.text({
      value: 'Some text description',
      label: 'Label description',
      hint: 'Hint description',
      rules: [`${ValidationRule.Length}: 5`],
    }),
  },
  {
    text: input.text({
      value: 'Some text',
      label: 'Label',
      hint: 'Hint',
      rules: [`${ValidationRule.Length}: 5`],
    }),
    description: input.text({
      value: 'Some text description',
      label: 'Label description',
      hint: 'Hint description',
      rules: [`${ValidationRule.Length}: 5`],
    }),
  },
];

const formConfig: { list: IListInput<{ text: TextInput, description: TextInput }> } = {
  list: input.list(ITEMS_LIST),
};

const { form, validate } = useForm<FormConfig>(formConfig);

</script>

<template>
  <div>
    BaseForm: {{ form.list.isValid() }}
    <hr>
    <pre>
      {{ form }}
    </pre>
  </div>
  <div>
    <ListInput v-model="form.list" />
  </div>
  <div>
    <button @click="validate">Validate</button>
  </div>
</template>

<style scoped lang="scss">

</style>
