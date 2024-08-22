<script setup lang="ts">
import { BaseInput, ListInput } from '../shared/ui/inputs';
import {
  TestForm, BaseForm, ActionForm, OnSubmitParams,
} from '../shared/ui/form/BaseForm';

const formConfig = new TestForm();

const onSubmit = (params: OnSubmitParams) => {
  console.log(params);
};

</script>

<template>
  <main>
    <div>
      <BaseForm
        :config="formConfig"
        @on-submit="onSubmit"
      >
        <template #default="{form}: { form: TestForm }">
          <BaseInput v-model="form.header.title" />
          <ListInput v-model="form.list" />
        </template>
      </BaseForm>
    </div>
  </main>
</template>
