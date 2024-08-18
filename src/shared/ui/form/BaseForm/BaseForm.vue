<script setup lang="ts">
import { ref } from 'vue';
import { type IListInput } from '../../../../shared/ui/form/inputs/models/ListInput';
import { useForm } from '../../../../shared/ui/form/composables';
import { TextInput } from '../../../../shared/ui/form/inputs/models/TextInput';
import ListInput from '../../inputs/base/ListInput.vue';
import BaseInput from '../../inputs/base/BaseInput.vue';
import { TestForm } from '@/shared/ui/form/BaseForm/config';

interface IListItem {
  text: TextInput;
  description: TextInput;
}
interface FormConfig { header: { title: TextInput; }; list: IListInput<IListItem>}

const formConfig = new TestForm();

const {
  form, validate, resetForm, clearForm,
} = useForm<TestForm>(formConfig);

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
