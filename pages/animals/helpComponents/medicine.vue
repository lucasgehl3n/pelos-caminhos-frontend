<script setup>
import MedicineModel from "../../../structures/Models/MedicineAnimal.ts";
import { Button, Input } from "flowbite-vue";
import AnimalModel from "../../../structures/Models/AnimalModel";
import Multiselect from "@vueform/multiselect";
import Datepicker from "flowbite-datepicker/Datepicker";
import ptBR from "flowbite-datepicker/locales/pt-BR";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import DefaultFieldValidatorObject from "../../../helpers/objects/DefaultFieldValidatorObject";
import moment from "moment";

const currentMedicine = ref(new MedicineModel());
const showModal = ref(false);
const medicineCurrent = ref(MedicineModel);

const openModal = (medicine) => {
  showModal.value = true;
  if (medicine) {
    medicineCurrent.value = medicine;
  } else {
    medicineCurrent.value = new MedicineModel();
    medicineCurrent.value.application_hour = moment().format("HH:mm");
    medicineCurrent.value.initialDate = moment().format("DD/MM/YYYY");
  }
};

const optionsStatusMedicine = ref([
  {
    name: "Pendente",
    value: false,
    selected: true,
  },
  {
    name: "Aplicado",
    value: true,
  },
]);

const emit = defineEmits(["updateEntity"]);

const props = defineProps({
  form: AnimalModel,
});

const closeModal = () => {
  showModal.value = false;
};

const dispatchEmit = (entity) => {
  emit("updateEntity", entity);
};

const addMedicine = () => {
  if (!validateMedicine()) {
    return;
  }
  const index = props.form.medicineAnimal.findIndex(
    (medicine) => medicine === medicineCurrent.value
  );
  if (index >= 0) {
    props.form.medicineAnimal[index] = medicineCurrent.value;
  } else {
    const newList = [...props.form.medicineAnimal, medicineCurrent.value];
    dispatchEmit(newList);
  }
  closeModal();
};

onMounted(() => {
  Object.assign(Datepicker.locales, ptBR);
  const listDatepickerEl = document.querySelectorAll(".datepick-medicine");
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

const medicineErrorValidator = reactive({
  name: new DefaultFieldValidatorObject(),
  quantity_ml: new DefaultFieldValidatorObject(),
  application_hour: new DefaultFieldValidatorObject(),
  recurrence_per_days: new DefaultFieldValidatorObject(),
  recurrence_days: new DefaultFieldValidatorObject(),
  initialDate: new DefaultFieldValidatorObject(),
  done: new DefaultFieldValidatorObject(),
});

const medicineFields = computed(() => ({
  name: {
    field: medicineCurrent.value.name,
    fieldError: medicineErrorValidator.name,
  },
  quantity_ml: {
    field: medicineCurrent.value.quantity_ml,
    fieldError: medicineErrorValidator.quantity_ml,
  },
  application_hour: {
    field: medicineCurrent.value.application_hour,
    fieldError: medicineErrorValidator.application_hour,
  },
  recurrence_per_days: {
    field: medicineCurrent.value.recurrence_per_days,
    fieldError: medicineErrorValidator.recurrence_per_days,
  },
  recurrence_days: {
    field: medicineCurrent.value.recurrence_days,
    fieldError: medicineErrorValidator.recurrence_days,
  },
  initialDate: {
    field: medicineCurrent.value.initialDate,
    fieldError: medicineErrorValidator.initialDate,
  },
  done: {
    field: medicineCurrent.value.done,
    fieldError: medicineErrorValidator.done,
  },
}));

const validateMedicine = () => {
  let isValid = true;
  Object.keys(medicineFields.value).forEach((fieldKey) => {
    const { tab, field, fieldError } = medicineFields.value[fieldKey];
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
  if (medicineFields.value.hasOwnProperty(e.target.name)) {
    medicineFields.value[e.target.name].fieldError.error = false;
  }
};
</script>
<template>
  <Button color="default" v-on:click="openModal()">Adicionar medicação/vacina</Button>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">{{ $t("name") }}</th>
          <th scope="col" class="px-6 py-3">{{ $t("quantity") }}</th>
          <th scope="col" class="px-6 py-3">{{ $t("times_a_day") }}</th>
          <th scope="col" class="px-6 py-3">
            <span class="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          v-for="medicine in props.form.medicineAnimal"
          v-on:click="openModal(medicine)"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ medicine.name }}
          </th>
          <td class="px-6 py-4" v-html="medicine.quantity_ml"></td>
          <td class="px-6 py-4">{{ medicine.recurrence_per_days }}</td>
          <td class="px-6 py-4 text-right">
            <a
              href="#"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              v-on:click="openModal(medicine)"
              >{{ $t("edit") }}</a
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Modal size="5xl" :title="'Vacina / Medicação'" :show-modal="showModal">
    <template v-slot:body>
      <div class="flex text-left h-full w-full">
        <div class="w-full h-full">
          <div>
            <Input
              :placeholder="'Remédio XYZ'"
              v-model="medicineCurrent.name"
              :label="'Vacina / Medicação'"
              name="name"
              v-on:change="removeFieldError"
            />
            <ErrorMessage v-bind="medicineErrorValidator.name" />
          </div>

          <div class="w-full flex">
            <div class="pt-2 w-full">
              <Input
                :placeholder="'0,00'"
                v-model="medicineCurrent.quantity_ml"
                type="number"
                :label="'Quantidade (ML/MG)'"
                min="1"
                name="quantity_ml"
                v-on:change="removeFieldError"
              />
              <ErrorMessage v-bind="medicineErrorValidator.quantity_ml" />
            </div>
            <div class="pl-2 pt-2 w-full">
              <Input
                v-model="medicineCurrent.application_hour"
                type="time"
                :label="'Horário de aplicação'"
                name="application_hour"
                v-on:change="removeFieldError"
              />
              <ErrorMessage v-bind="medicineErrorValidator.application_hour" />
            </div>

            <div class="pl-2 pt-2 w-full">
              <Input
                :placeholder="'0,00'"
                v-model="medicineCurrent.recurrence_per_days"
                type="number"
                min="1"
                max="10"
                :label="'Aplicações ao dia'"
                name="recurrence_per_days"
                v-on:change="removeFieldError"
              />
              <ErrorMessage v-bind="medicineErrorValidator.recurrence_per_days" />
            </div>
            <div class="pl-2 pt-2 w-full">
              <Input
                :placeholder="'10'"
                v-model="medicineCurrent.recurrence_days"
                :label="'Duração em dias'"
                min="1"
                name="recurrence_days"
                v-on:change="removeFieldError"
              />
              <ErrorMessage v-bind="medicineErrorValidator.recurrence_days" />
            </div>
          </div>

          <div class="pt-2 w-full flex">
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
                  v-model="medicineCurrent.initialDate"
                  name="initialDate"
                  class="datepick-medicine bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Selecionar data"
                  v-on:blur="removeFieldError"
                  v-on:changeDate="(t) => (medicineCurrent.initialDate = t.target.value)"
                />
              </div>
              <ErrorMessage v-bind="medicineErrorValidator.initialDate" />
            </div>
            <div class="w-full pl-2">
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
                  v-model="medicineCurrent.endDate"
                  name="endDate"
                  class="datepick-medicine bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Selecionar data"
                  v-on:blur="removeFieldError"
                  v-on:changeDate="(t) => (medicineCurrent.endDate = t.target.value)"
                />
              </div>
            </div>
          </div>

          <div class="pt-2">
            <div class="pt-2">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {{ $t("details") }}
              </label>
              <quill-editor
                theme="snow"
                name="observation"
                class="h-200"
                v-model:content="medicineCurrent.observation"
                contentType="html"
              ></quill-editor>
            </div>
            <div class="pt-2">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {{ $t("status") }}
              </label>
              <Multiselect
                v-model="medicineCurrent.done"
                :options="optionsStatusMedicine"
                valueProp="value"
                :multiple="false"
                :preselectFirst="true"
                label="name"
              />
              <ErrorMessage v-bind="medicineErrorValidator.done" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <div class="text-right">
        <Button color="light" v-on:click="closeModal">{{ $t('cancel') }}</Button>
        &nbsp;
        <Button color="default" v-on:click="addMedicine">{{ $t('save') }}</Button>
      </div>
    </template>
  </Modal>
</template>
