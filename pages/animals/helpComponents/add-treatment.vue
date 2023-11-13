<script setup>
import { Button, Input } from "flowbite-vue";
import Modal from "../../../components/modal";
import TreatmentModel from "../../../structures/Models/TreatmentModel.ts";
import ErrorMessage from "../../../components/error-message.vue";
import AnimalModel from "../../../structures/Models/AnimalModel";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { defineEmits } from "vue";
import Datepicker from "flowbite-datepicker/Datepicker";
import ptBR from "flowbite-datepicker/locales/pt-BR";
import DefaultFieldValidatorObject from "../../../helpers/objects/DefaultFieldValidatorObject";

const props = defineProps({
  form: AnimalModel,
  formFieldErrorValidator: {},
  showModal: false,
  treatmentCurrent: TreatmentModel,
});

const emit = defineEmits(["addTreatment", "closeModal"]);
const dispatchEmit = (event) => {
  emit(event);
};

const addTreatment = () => {
  if (!validateTreatment()) return;
  dispatchEmit("addTreatment");
};

const closeModal = () => {
  dispatchEmit("closeModal");
};

onMounted(() => {
  Object.assign(Datepicker.locales, ptBR);
  const listDatepickerEl = document.querySelectorAll(".datepick-flw");
  listDatepickerEl.forEach((datepickerEl) => {
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
});

const treatmentErrorValidator = reactive({
  name: new DefaultFieldValidatorObject(),
  initialDate: new DefaultFieldValidatorObject(),
  done: new DefaultFieldValidatorObject(),
});

const treatmentFields = computed(() => ({
  name: {
    field: props.treatmentCurrent.name,
    fieldError: treatmentErrorValidator.name,
  },
  initialDate: {
    field: props.treatmentCurrent.initialDate,
    fieldError: treatmentErrorValidator.initialDate,
  },
  done: {
    field: props.treatmentCurrent.done,
    fieldError: treatmentErrorValidator.done,
  },
}));

const validateTreatment = () => {
  let isValid = true;
  Object.keys(treatmentFields.value).forEach((fieldKey) => {
    const { tab, field, fieldError } = treatmentFields.value[fieldKey];
    if (!field && field !== false) {
      isValid = false;
      fieldError.error = true;
    } else {
      fieldError.error = false;
    }
  });

  return isValid;
};

const removeFieldError = (e) => {
  if (treatmentFields.value.hasOwnProperty(e.target.name)) {
    treatmentFields.value[e.target.name].fieldError.error = false;
  }
};
</script>
<template>
  <Modal size="5xl" :title="'Tratamento'" :show-modal="showModal">
    <template v-slot:body>
      <div class="flex text-left h-full w-full">
        <div class="w-full h-full">
          <div>
            <Input
              :placeholder="$t('placeholder_name')"
              v-model="props.treatmentCurrent.name"
              :label="$t('name')"
              name="name"
              v-on:change="removeFieldError"
            />
            <ErrorMessage v-bind="treatmentErrorValidator.name" />
          </div>

          <div class="w-full flex pt-5">
            <div class="w-full">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {{ $t("init_date") }}
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
                  id="initialDate"
                  type="text"
                  v-model="props.treatmentCurrent.initialDate"
                  name="initialDate"
                  datepicker-autohide="true"
                  class="datepick-flw bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Selecionar data"
                  v-on:blur="removeFieldError"
                  v-on:changeDate="
                    (t) => (props.treatmentCurrent.initialDate = t.target.value)
                  "
                />
              </div>
              <ErrorMessage v-bind="treatmentErrorValidator.initialDate" />
            </div>
            <div class="pl-5 w-full">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {{ $t("forecast_end_date") }}
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
                  id="endForecastDate"
                  type="text"
                  v-model="props.treatmentCurrent.endForecastDate"
                  name="endForecastDate"
                  datepicker-autohide="true"
                  class="datepick-flw bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Selecionar data"
                  v-on:changeDate="
                    (t) => (props.treatmentCurrent.endForecastDate = t.target.value)
                  "
                />
              </div>
            </div>

            <div class="w-full pl-5">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {{ $t("end_date") }}
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
                  id="endDate"
                  type="text"
                  v-model="props.treatmentCurrent.endDate"
                  name="endDate"
                  datepicker-autohide="true"
                  class="datepick-flw bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Selecionar data"
                  v-on:changeDate="(t) => (treatmentCurrent.endDate = t.target.value)"
                />
              </div>
            </div>
          </div>

          <div class="py-5">
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {{ $t("details") }}
            </label>
            <quill-editor
              theme="snow"
              name="details"
              class="h-200"
              v-model:content="props.treatmentCurrent.details"
              contentType="html"
            ></quill-editor>
          </div>
        </div>
      </div>
      <div class="w-full flex"></div>
    </template>

    <template v-slot:footer>
      <div class="text-right">
        <Button color="light" v-on:click="closeModal">{{ $t("cancel") }}</Button>
        &nbsp;
        <Button color="default" v-on:click="addTreatment">{{ $t("save") }}</Button>
      </div>
    </template>
  </Modal>
</template>
