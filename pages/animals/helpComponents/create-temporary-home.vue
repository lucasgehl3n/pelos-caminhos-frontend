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
import EntityTemporaryHome from "../../../structures/Models/EntityTemporaryHome";
import UserGateway from "../../../gateways/UserGateway";
import deepcopy from "deepcopy";
import TemporaryHomeGateway from "../../../gateways/TemporaryHomeGateway";

const props = defineProps({
  form: AnimalModel,
  showModal: false,
});

const typeEntity = ref(1);
const currentUserEntity = ref(null);
const emit = defineEmits(["addTreatment", "closeModal"]);
const dispatchEmit = (event, model) => {
  emit(event, model);
};

const model = ref(new EntityTemporaryHome());
const addTreatment = () => {
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

const entityList = ref([]);
const reset = () => {
  searchEntityField.value = "";
  currentUserEntity.value = null;
};

const setEntity = (entity) => {
  searchEntityField.value = "";
  currentUserEntity.value = entity;
};

const searchEntityField = ref("");
const searchEntity = () => {
  UserGateway.List(searchEntityField.value).then((res) => {
    entityList.value = res.data;
  });
};

watch(searchEntityField, () => {
  searchEntity();
});

onMounted(() => {
  searchEntity();
});

const temporaryHomeErrorValidator = reactive({
  name: new DefaultFieldValidatorObject(),
  details: new DefaultFieldValidatorObject(),
});

const temporaryHomeVolunteerErrorValidator = reactive({
  idUser: new DefaultFieldValidatorObject(),
});

const temporaryHomeFields = computed(() => ({
  name: {
    field: model.value.name,
    fieldError: temporaryHomeErrorValidator.name,
  },
  details: {
    field: model.value.details,
    fieldError: temporaryHomeErrorValidator.details,
  },
}));

const validateModel = (fields) => {
  let isValid = true;
  Object.keys(fields).forEach((fieldKey) => {
    const { tab, field, fieldError } = fields[fieldKey];
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
  if (temporaryHomeFields.value.hasOwnProperty(e.target.name)) {
    temporaryHomeFields.value[e.target.name].fieldError.error = false;
  }
};

const errorUser = ref(new DefaultFieldValidatorObject());

const save = async () => {
  let copyModel = deepcopy(model.value);
  if (typeEntity.value == 1) {
    if (!currentUserEntity.value) {
      errorUser.value.error = true;
      return;
    } else {
      errorUser.value.error = false;
    }
    copyModel.name = currentUserEntity.value.name;
    copyModel.idUser = currentUserEntity.value.id;
  } else if (!validateModel(temporaryHomeFields.value)) {
    return;
  }
  copyModel.idInstitution = props.form.idInstitution;
  const res = await TemporaryHomeGateway.Save(copyModel);
  if (res.data.id) {
    dispatchEmit("updateEntity", res.data);
    closeModal();
  } else {
    //Erro
  }
};
</script>
<template>
  <Modal size="2xl" :title="'Lar temporário'" :show-modal="showModal">
    <template v-slot:body>
      <div class="flex text-left h-full w-full">
        <div class="w-full h-full">
          <div>
            <div class="pt-2">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tipo
              </label>
              <ul class="grid w-full gap-6 md:grid-cols-2">
                <li>
                  <input
                    type="radio"
                    id="userEntityTemporaryHome"
                    name="typeEntityTemporary"
                    value="1"
                    class="hidden peer"
                    v-model="typeEntity"
                    required
                  />
                  <label
                    for="userEntityTemporaryHome"
                    class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div class="w-full block">
                      <div class="flex">
                        <img
                          src="~/assets/svg/hand.svg"
                          :alt="$t('volunteer')"
                          class="w-6 h-6"
                        />
                        <span class="pl-2">{{ $t("volunteer") }}</span>
                      </div>

                      <div class="w-full text-xs">
                        {{ $t("volunter_entity_temporary_home_description") }}
                      </div>
                    </div>
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="entityTemporaryHome"
                    name="typeEntityTemporary"
                    value="2"
                    v-model="typeEntity"
                    class="hidden peer"
                  />
                  <label
                    for="entityTemporaryHome"
                    class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <div class="w-full block">
                      <div class="flex">
                        <font-awesome-icon :icon="['fas', 'cash-register']" />
                        <span class="pl-2">{{ $t("remunerated_entity") }}</span>
                      </div>

                      <div class="w-full text-xs">
                        {{ $t("remunerated_entity_temporary_home_description") }}}
                      </div>
                    </div>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <div v-if="typeEntity == 1" class="w-full">
            <div v-if="currentUserEntity" class="pt-10">
              {{ $t("selected_volunteers") }}
              <div
                class="my-2 block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div class="flex items-center space-x-4 w-full">
                  <img
                    class="w-10 h-10 rounded-full"
                    :src="currentUserEntity.profileImage"
                    alt=""
                    v-if="currentUserEntity.profileImage"
                  />
                  <div class="font-medium dark:text-white w-11/12">
                    <div>{{ currentUserEntity.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ currentUserEntity.email }}
                    </div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      {{ currentUserEntity.phone }}
                    </div>
                  </div>
                  <div class="ml-2 w-1/12 flex-end" v-on:click="reset">
                    <font-awesome-icon :icon="['fas', 'times']" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="relative pt-2">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
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
                  placeholder="Pesquise o nome do voluntário para filtrar"
                  required
                />
              </div>
              <ErrorMessage v-bind="errorUser" />
              <div
                class="my-2 block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div class="flex">
                  <div class="py-2 w-11/12">Voluntários</div>
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
            {{}}
          </div>

          <div class="py-5" v-else>
            <div>
              <Input
                :placeholder="''"
                v-model="model.name"
                :label="$t('name')"
                name="name"
                v-on:change="removeFieldError"
              />
              <ErrorMessage v-bind="temporaryHomeErrorValidator.name" />
            </div>

            <div class="pt-2">
              <label
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {{ $t("details") }}
              </label>
              <quill-editor
                theme="snow"
                name="temporaryHomeDetail"
                v-model:content="model.details"
                contentType="html"
              ></quill-editor>
              <ErrorMessage v-bind="temporaryHomeErrorValidator.details" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex"></div>
    </template>

    <template v-slot:footer>
      <div class="text-right">
        <Button color="light" v-on:click="closeModal">{{ $t("cancel") }}</Button>
        &nbsp;
        <Button color="default" v-on:click="save">{{ $t("save") }}</Button>
      </div>
    </template>
  </Modal>
</template>

<style scoped>
.entities {
  max-height: 250px;

  @media (max-width: 768px) {
    max-height: 100px;
  }
}
</style>