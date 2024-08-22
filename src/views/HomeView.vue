<script setup lang="ts">
import { onMounted } from 'vue';
import { BaseInput, ListInput } from '../shared/ui/inputs';
import {
  BaseForm, OnSubmitParams,
} from '../shared/ui/form/BaseForm';
import { TestForm } from './config';
import { apiServices } from '@/shared/lib/api/config';

const formConfig = new TestForm();

const onSubmit = (params: OnSubmitParams) => {
  console.log(params);
};

onMounted(async () => {
  const data = await apiServices.userService().fetchService.get('/');
  console.log(data);
});

</script>

<template>
  <main>
    <div>
      <BaseForm
        :config="formConfig"
        @on-submit="onSubmit"
      >
        <template #default="{ form }: { form: TestForm }">
          <BaseInput v-model="form.header.title" />
          <ListInput v-model="form.list" />
        </template>
      </BaseForm>
    </div>
  </main>
</template>
