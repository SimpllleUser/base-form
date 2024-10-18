<script setup lang="ts">
import { ref } from 'vue';
import {
  ActionForm,
  BaseForm,
  OnSubmitPayload,
} from '../shared/ui/form/BaseForm';
import { ITestFormData, TestForm } from './config';
import { InputForm } from '../shared/ui/inputs/components/input-form';
import InputList from "@/shared/ui/inputs/components/input-list/InputList.vue";

const onSubmit = (params: OnSubmitPayload<ITestFormData>) => {
  // console.log(params.value);
};

const data = ref({ header: '', list: [] });

// setTimeout(() => {
//   data.value = { header: '123123123', list: [] };
// }, 2000);

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
          {{ form.list.items[1].id }}
          <InputForm v-model="form.select" />
          <InputForm v-model="form.checker" />
          <InputForm v-model="form.switcher" />
          <InputForm v-model="form.header" />
          <hr>
          <InputList v-model="form.list" />
          <hr>
        </template>
      </BaseForm>
    </div>
  </main>
</template>
