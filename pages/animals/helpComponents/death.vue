<script setup>
import BadgeFilter from "../../../components/badge-filter.vue";
import { ref, watch, defineEmits } from "vue";
import BreedModel from "../../../structures/Models/BreedModel";
import { Button } from "flowbite-vue";
import AnimalModel from "../../../structures/Models/AnimalModel";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import Datepicker from "flowbite-datepicker/Datepicker";
import ptBR from "flowbite-datepicker/locales/pt-BR";

const emit = defineEmits(["updateEntity", "updateDeathDate"]);

const props = defineProps({
  form: AnimalModel,
  formFieldErrorValidator: {},
});

const setEntity = (entity) => {
  dispatchEmit(entity);
};

const dispatchEmit = (entity) => {
  emit("updateEntity", entity);
};

const emitUpdateDeathDate = (event) => {
  emit("updateDeathDate", event.target.value);
};

onMounted(() => {
  const datepickerEl = document.getElementById("deathDate");

  new Datepicker(datepickerEl, {
      format: "dd/mm/yyyy",
      orientation: "bottom",
      todayBtn: true,
      clearBtn: true,
      todayHighlight: true,
      todayBtnMode: 1,
      language: "pt-BR",
    });
});

</script>

<template>
  <div class="pt-5">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ $t('death') }}</label
    >
    <div class="pt-2">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {{ $t('date') }}
      </label>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
            />
          </svg>
        </div>
        <input
          id="deathDate"
          type="text"
          v-model="props.form.deathDate"
          name="deathDate"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Selecionar data"
          v-on:blur="removeFieldError"
          v-on:changeDate="emitUpdateDeathDate"
        />
      </div>
      <ErrorMessage v-bind="props.formFieldErrorValidator.deathDate" />
    </div>

    <div class="py-2">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {{ $t('description') }}
      </label>
      <quill-editor
        theme="snow"
        name="deathDetail"
        v-model:content="props.form.deathDetail"
        contentType="html"
      ></quill-editor>
    </div>
  </div>
</template>

<style scoped>
.entities {
  max-height: 250px;

  @media (max-width: 768px) {
    max-height: 100px;
  }
}
</style>
