<script setup lang="ts">
import { useForm } from '../shared/ui/form';
import { TestForm } from '../shared/ui/form/BaseForm/config';
import { IListInput, TextInput } from '../shared/ui/inputs/models';
import { BaseInput, ListInput } from '../shared/ui/inputs';
import { BaseForm } from '../shared/ui/form/BaseForm';

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
      <BaseForm :config="formConfig">
        <template #default="{form}: { form: TestForm }">
          <BaseInput v-model="form.header.title" />
          <ListInput v-model="form.list" />
        </template>
      </BaseForm>
    </div>
  </main>
</template>
