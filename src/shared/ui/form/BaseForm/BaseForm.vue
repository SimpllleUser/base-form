<script setup lang="ts">
import { ref } from 'vue';
/* import { type IListInput } from '../../../../shared/ui/inputs/models/ListInput';
import { useForm } from '../../../../shared/ui/form/composables';
import { TextInput } from '../../../../shared/ui/inputs/models/TextInput'; */
// import { ListInput } from '../../inputs/components/ListInput.vue';
// import BaseInput from '../../inputs/components/BaseInput.vue';

const isShownDataSource = ref(false);

</script>

<template>
  <div>
    <h1>Base form</h1>
   <div>
<!--     BaseForm: {{ form.list.isValid() }}-->
<!--     <div>-->
<!--       <button @click="clearForm">Clear form</button> |-->
<!--       <button @click="resetForm">Reset form</button> |-->
<!--       <button @click="isShownDataSource = !isShownDataSource">Show form source</button> |-->
<!--     </div>-->
   </div>
    <hr>
<!--    <pre v-if="isShownDataSource">-->
<!--      {{ form }}-->
<!--    </pre>-->
  </div>
  <div>
<!--    <BaseInput v-model="form.header.title" />-->
<!--    <ListInput v-model="form.list" />-->
  </div>
  <div>
<!--    <button @click="validate">Validate</button>-->
  </div>
</template>
