<script setup lang="ts">
import { ref } from 'vue';
import { BaseInput, ListInput } from '../shared/ui/inputs';
import {
  ActionForm,
  BaseForm,
  OnSubmitPayload,
} from '../shared/ui/form/BaseForm';
import { ITestFormData, TestForm } from './config';

const onSubmit = (params: OnSubmitPayload<ITestFormData>) => {
  console.log(params.value);
};

const data = ref({ header: '', list: [] });

setTimeout(() => {
  data.value = { header: '123123123', list: [] };
}, 2000);

const useEntity = (data: any) => new TestForm(data);
</script>

<template>
  <main>
    <div>
      <BaseForm
        :config="useEntity(data)"
        :params="{
          action: ActionForm.Create
        }"
        @on-submit="onSubmit"
      >
        <template #default="{ form }: { form: TestForm }">
          <BaseInput v-model="form.header" />
          <ListInput v-model="form.list" />
        </template>
      </BaseForm>
    </div>
  </main>
</template>
