<script setup lang="ts">
import { useForm } from '../shared/ui/form';
import { TestForm } from '../shared/ui/form/BaseForm/config';
import { IListInput, TextInput } from '../shared/ui/inputs/models';
import { BaseInput, ListInput } from '../shared/ui/inputs';

interface IListItem {
  text: TextInput;
  description: TextInput;
}
interface FormConfig { header: { title: TextInput; }; list: IListInput<IListItem>}

const formConfig = new TestForm();

const {
  form, validate, resetForm, clearForm,
} = useForm<TestForm>(formConfig);

</script>

<template>
  <main>
    <div>
      <BaseInput v-model="form.header.title" />
      <ListInput v-model="form.list" />
    </div>
  </main>
</template>
