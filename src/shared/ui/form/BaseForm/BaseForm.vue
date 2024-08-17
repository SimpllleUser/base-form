<script setup lang="ts">

import { ref } from 'vue';
import { useForm } from '../../../../shared/ui/form/composables';
import input from '../../../../shared/ui/form/inputs/base';
import { TextInput } from '../../../../shared/ui/form/inputs/models/TextInput';
import { ValidationRule } from '../../../../shared/lib/input-validator/types';
import { type IListInput } from '../../../../shared/ui/form/inputs/models/ListInput';
import ListInput from '../../inputs/base/ListInput.vue';
import BaseInput from '@/shared/ui/inputs/base/BaseInput.vue';

interface IListItem {
  text: TextInput, description: TextInput
}
interface FormConfig { header: { title: TextInput; }; list: IListInput<IListItem>}

const getInputRowDefault = (): IListItem => ({
  text: input.text({
    value: '',
    label: 'Label',
    hint: 'Hint',
    rules: [`${ValidationRule.Length}: 5`],
  }),
  description: input.text({
    value: '',
    label: 'Label description',
    hint: 'Hint description',
    rules: [`${ValidationRule.Length}: 5`],
  }),
});

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

const formConfig: { title: TextInput, list: IListInput<IListItem> } = {
  header: { title: input.text({ value: 'title 1', rules: [`${ValidationRule.Length}: 5`] }) },
  list: input.list(ITEMS_LIST, getInputRowDefault()),
};

const {
  form, validate, resetForm, clearForm,
} = useForm<FormConfig>(formConfig);

const isShownDataSource = ref(false);

</script>

<template>
  <div>
   <div>
     BaseForm: {{ form.list.isValid() }}
     <div>
       <button @click="clearForm">Clear form</button> |
       <button @click="resetForm">Reset form</button> |
       <button @click="isShownDataSource = !isShownDataSource">Show form source</button> |
     </div>
   </div>
    <hr>
    <pre v-if="isShownDataSource">
      {{ form }}
    </pre>
  </div>
  <div>
    <BaseInput v-model="form.header.title" />
    <ListInput v-model="form.list" />
  </div>
  <div>
    <button @click="validate">Validate</button>
  </div>
</template>
