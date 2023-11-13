<script setup>
import { Button, Input } from "flowbite-vue";
import Modal from "../../../components/modal";
import TreatmentModel from "../../../structures/Models/TreatmentModel.ts";
import ErrorMessage from "../../../components/error-message.vue";
import AnimalModel from "../../../structures/Models/AnimalModel";
import { defineEmits } from "vue";
import AddTreatment from "./add-treatment.vue";
const props = defineProps({
  form: AnimalModel,
  formFieldErrorValidator: {},
});

const emit = defineEmits(["updateEntity"]);

const setEntity = (entity) => {
  dispatchEmit(entity);
};

const showModal = ref(false);
const dispatchEmit = (entity) => {
  emit("updateEntity", entity);
};


const treatmentCurrent = ref(TreatmentModel);
const openModal = (treatment) => {
  if (treatment) {
    treatmentCurrent.value = treatment;
  } else {
    treatmentCurrent.value = new TreatmentModel();
  }
  showModal.value = true;

};

const closeModal = () => {
  showModal.value = false;
};

const addTreatment = () => {
  const index = props.form.treatment.findIndex(
    (treatment) => treatment === treatmentCurrent.value
  );
  if (index >= 0) {
    props.form.treatment[index] = treatmentCurrent.value;
  } else {
    const newListTreatment = [...props.form.treatment, treatmentCurrent.value];
    dispatchEmit(newListTreatment);
  }
  closeModal();
};
</script>

<template>
  <div>
    <Button color="default" v-on:click="openModal()">{{ $t('add_treatment') }}</Button>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">{{ $t('name') }}</th>
            <th scope="col" class="px-6 py-3">{{ $t('details') }}</th>
            <th scope="col" class="px-6 py-3">{{ $t('initial_date') }}</th>
            <th scope="col" class="px-6 py-3">{{ $t('final_date') }}</th>
            <th scope="col" class="px-6 py-3">{{ $t('status') }}</th>
            <th scope="col" class="px-6 py-3">
              <span class="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="treatment in props.form.treatment"
            v-on:click="openModal(treatment)"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ treatment.name }}
            </th>
            <td class="px-6 py-4" v-html="treatment.details"></td>
            <td class="px-6 py-4">{{ treatment.initialDate }}</td>
            <td class="px-6 py-4">{{ treatment.endForecastDate }}</td>
            <td class="px-6 py-4">{{ treatment.done ? "Concluído" : "Em Andamento" }}</td>
            <td class="px-6 py-4 text-right">
              <a
                href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                v-on:click="openModal(treatment)"
                >{{ $t('edit') }}</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <AddTreatment :form="props.form" 
    :treatmentCurrent="treatmentCurrent" 
    :formFieldErrorValidator="formFieldErrorValidator" 
    :showModal="showModal"
    v-on:closeModal="closeModal"
    v-on:addTreatment="addTreatment">
  </AddTreatment>

  <div class="pb-2"></div>
</template>

<style scoped>
.ql-editor {
  height: 300px;
}
</style>
