<script setup lang="ts">
  import { ref } from 'vue';
  import { ActionForm, BaseForm, OnSubmitPayload } from '../shared/ui/form/BaseForm';
  import { ITestFormData, TestForm } from './config';
  import { InputForm } from '../shared/ui/inputs/components/input-form';
  import InputList from '../shared/ui/inputs/components/input-list/InputList.vue';
  import { Colors, Variants } from '@/core/types/vuetify';

  const onSubmit = (params: OnSubmitPayload<ITestFormData>) => {
    params.isValid && console.log(params.value);
  };

  const data = ref({ header: '', list: [] });

  const useEntity = (data: any) => new TestForm(data);

  const addItemListByData = (list: InputList) => {
    list.addByData({ text: '1111', description: '222' });
  };
</script>

<template>
  <main>
    <div class="pa-4">
      <VRow justify="center">
        <VCol cols="6">
          <BaseForm
            :config="useEntity(data)"
            :params="{
              action: ActionForm.Save
            }"
            @on-submit="onSubmit"
          >
            <template #default="{ form }: { form: TestForm }">
              <div class="pa-4">
                <div class="mb-2">
                  <InputForm v-model="form.select" />
                </div>
                <div class="mb-2">
                  <InputForm v-model="form.checker" />
                </div>
                <div class="mb-2">
                  <InputForm v-model="form.switcher" />
                </div>
                <div class="mb-2">
                  <InputForm v-model="form.header" />
                </div>
                <InputList v-model="form.list" header-class="py-4" label="Dictionary">
                  <template #label="{ label }">
                    <div class="text-h6">
                      {{ label }}
                    </div>
                  </template>
                  <template #btn-add="props">
                    <div>
                      <VBtn
                        class="mr-4"
                        :color="Colors.Primary"
                        :variant="Variants.Flat"
                        @click="addItemListByData(form.list)"
                        >Add by data</VBtn
                      >
                      <VBtn :color="Colors.Primary" :variant="Variants.Outlined" @click="props.addItem()"
                        >Add by default</VBtn
                      >
                    </div>
                  </template>
                  <template #empty>
                    <div>Empty</div>
                  </template>
                </InputList>
                <!-- <VBtn :color="Colors.Primary" :variant="Variants.Outlined" @click="addItemListByData(form.list)"
                  >Add item to list by data</VBtn
                > -->
              </div>
            </template>
          </BaseForm>
        </VCol>
      </VRow>
    </div>
  </main>
</template>
