<script setup>
import BadgeFilter from "../../../components/badge-filter.vue";
import { ref, watch, defineEmits } from "vue";
import BreedModel from "../../../structures/Models/BreedModel";
import { Button } from "flowbite-vue";
import AnimalModel from "../../../structures/Models/AnimalModel";
import TemporaryHomeGateway from "../../../gateways/TemporaryHomeGateway";
import Datepicker from "flowbite-datepicker/Datepicker";
import CreateTemporaryHome from "./create-temporary-home.vue";
const emit = defineEmits(["updateEntity", "updateForwardingDate"]);
const props = defineProps({
  form: AnimalModel,
  formFieldErrorValidator: {},
});
const entityList = ref([]);

const setEntity = (entity) => {
  searchEntityField.value = "";
  dispatchEmit(entity);
};

const dispatchEmit = (entity) => {
  emit("updateEntity", entity);
};

const remove = () => {
  dispatchEmit({ name: "", id: null });
};

const reset = () => {
  searchEntityField.value = "";
};

const searchEntityField = ref("");
const searchEntity = () => {
  if (props.form.idInstitution) {
    TemporaryHomeGateway.List(searchEntityField.value, props.form.idInstitution).then(
      (res) => {
        entityList.value = res.data;
      }
    );
  }
};

watch(searchEntityField, () => {
  searchEntity();
});

watch(
  () => props.form.idTemporaryHome,
  () => {
    searchEntity();
  }
);

watch(
  () => props.form.idInstitution,
  () => {
    searchEntity();
  }
);

const showModalCreateTemporaryHome = ref(false);

const showModalCreation = () => {
  showModalCreateTemporaryHome.value = true;
};

const closeModalCreation = () => {
  showModalCreateTemporaryHome.value = false;
};

onMounted(() => {
  searchEntity();
  const datepickerEl = document.getElementById("forwardingDate");
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

const emitUpdateForwardingDate = (event) => {
  emit("updateForwardingDate", event.target.value);
};
</script>

<template>
  <div class="pt-2">
    <div class="pt-2">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Data de encaminhamento
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
          id="forwardingDate"
          type="text"
          v-model="props.form.forwardingDate"
          name="forwardingDate"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Selecionar data"
          v-on:blur="removeFieldError"
          v-on:changeDate="emitUpdateForwardingDate"
        />
      </div>
      <ErrorMessage v-bind="props.formFieldErrorValidator.forwardingDate" />
    </div>

    <div class="pt-5">
      <div class="flex w-full">
        <div class="">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >{{ $t('temporary_home') }}</label
          >
        </div>
        <div class="pl-5">
          <a
            href="#"
            class="text-sm text-blue-500 hover:underline"
            v-on:click="showModalCreation"
            >{{ $t('sign_up') }}</a
          >
        </div>
      </div>
      <ErrorMessage v-bind="props.formFieldErrorValidator.idTemporaryHome" />
    </div>

    <div
      v-if="
        (props.form.idTemporaryHome || props.form.idTemporaryHome === 0) &&
        props.form.temporaryHome
      "
      class="pt-2"
    >
      {{ $t('selected_home') }}:
      <div class="min-w-min md:w-auto">
        <BadgeFilter
          :title="props.form.temporaryHome.name"
          :clicked="true"
          v-on:click="remove"
        >
        </BadgeFilter>
      </div>
    </div>
    <div v-else>
      <div class="relative pt-2">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          v-model="searchEntityField"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Pesquise o nome do lar temporário para filtrar"
          required
        />
      </div>

      <div
        class="my-2 block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <div class="flex">
          <div class="py-2 w-11/12">{{ $t('home_temporaries') }}</div>
          <div class="ml-2 w-1/12 flex-end" v-on:click="reset">
            <font-awesome-icon :icon="['fas', 'times']" />
          </div>
        </div>
        <perfect-scrollbar class="entities">
          <template v-for="entity in entityList">
            <div
              href="#"
              class="inline-flex justify-center items-center p-5 my-1 text-base font-medium text-gray-800 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white w-full"
            >
              <a href="#" class="w-full" v-on:click="setEntity(entity)"
                >{{ entity.name }}
              </a>
            </div>
          </template>
        </perfect-scrollbar>
      </div>
    </div>
  </div>

  <CreateTemporaryHome
    :form="form"
    :formFieldErrorValidator="formFieldErrorValidator"
    :showModal="showModalCreateTemporaryHome"
    @close-modal="closeModalCreation"
    @updateEntity="setEntity"
  >
  </CreateTemporaryHome>
</template>

<style scoped>
.entities {
  max-height: 250px;

  @media (max-width: 768px) {
    max-height: 100px;
  }
}
</style>
