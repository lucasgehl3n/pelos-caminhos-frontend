<script setup>
import { Button, Input } from "flowbite-vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Stepper from "../../components/stepper.vue";
import PageHeader from "../../components/page-header.vue";
import Breadcrumb from "../../components/breadcrumb.vue";
import StepperObject from "../../structures/StepperObject";
import AnimalModel from "../../structures/Models/AnimalModel";
import DefaultFieldValidatorObject from "../../helpers/objects/DefaultFieldValidatorObject";
import OnChangeStep from "../../helpers/OnChangeStep";
import Multiselect from "@vueform/multiselect";
import situation from "./helpComponents/situation.vue";
import temporaryHome from "./helpComponents/temporary-home.vue";
import { AnimalSituation } from "../../enums/AnimalSituation.ts";
import Adopted from "./helpComponents/adopted.vue";
import Death from "./helpComponents/death.vue";
import Treatment from "./helpComponents/treatment.vue";
import BehavioralProfileModel from "../../structures/Models/BehavioralProfileModel";
import Datepicker from "flowbite-datepicker/Datepicker";
import { Tabs, Tab } from "flowbite-vue";
import "@vueform/multiselect/themes/default.css";
import Medicine from "./helpComponents/medicine.vue";
import Files from "./helpComponents/files.vue";
import ColorSelector from "./helpComponents/color-selector.vue";
import InstitutionGateway from "../../gateways/InstitutionGateway";
import BehavioralProfileGateway from "../../gateways/BehavioralProfileGateway";
import BreedGateway from "../../gateways/BreedGateway";
import ImageUpload from "../../components/image-upload.vue";
import { watch } from "vue";
import AnimalGateway from "../../gateways/AnimalGateway";
import moment from "moment";
import Skeleton from "../../components/skeleton.vue";
import FloatButtons from "../../components/float-buttons.vue";
import { QuillEditor } from "@vueup/vue-quill";
import ProgressBarControl from "../../helpers/ProgressBarControl.ts";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import GenericError from "../../components/generic-error.vue";
import { initFlowbite } from "flowbite";

const { t } = useI18n();
const route = useRoute();
const form = reactive(new AnimalModel());
const createEdit = computed(() => (route.params.id ? t("edit") : t("create")));
const breadcrumb = ref([
  {
    name: "Home",
    url: "/",
    icon: "home",
  },
  {
    name: t("animals"),
    url: "/animals",
  },
  {
    name: createEdit,
    url: "#",
  },
]);

const router = useRouter();
const stepperControlValues = ref([
  new StepperObject("Identificação", true),
  new StepperObject("Perfil", false),
  new StepperObject("Informações veterinárias", false),
]);

const switchFirstTab = () => {
  stepperControlValues.value[0].active = true;
  stepperControlValues.value[1].active = false;
  stepperControlValues.value[2].active = false;
};

const switchSecondTab = () => {
  stepperControlValues.value[0].active = false;
  stepperControlValues.value[1].active = true;
  stepperControlValues.value[2].active = false;
};

const switchThirdTab = () => {
  stepperControlValues.value[0].active = false;
  stepperControlValues.value[1].active = false;
  stepperControlValues.value[2].active = true;
};

const onChangeStep = (step) => {
  OnChangeStep(step, stepperControlValues);
};

const updateBreed = (breed) => {
  form.breed = breed;
  form.idBreed = breed.id;
};

const updateTemporaryHome = (temporaryHome) => {
  form.temporaryHome = temporaryHome;
  if (temporaryHome) {
    form.idTemporaryHome = temporaryHome.id;
  } else form.idTemporaryHome = undefined;
};

const updateForwardingDate = (forwardingDate) => {
  form.forwardingDate = forwardingDate;
};

const updateAdoptionDate = (adoptionDate) => {
  form.adoptionDate = adoptionDate;
};

const updateDeathDate = (deathDate) => {
  form.deathDate = deathDate;
};

const updateAdoption = (adoptionUser) => {
  form.adoptionUser = adoptionUser;
  if (adoptionUser) {
    form.idUserAdoption = adoptionUser.id;
  } else form.idUserAdoption = undefined;
};

const updateTreatment = (treatment) => {
  form.treatment = treatment;
};

const updateMedicine = (medicine) => {
  form.medicineAnimal = medicine;
};

const updateFiles = (files) => {
  form.animalAttachments = files;
};

const showModalSuccess = ref(false);
const showModalError = ref(false);
const dynamicWidth = ref("0%");
const stepperControl = computed(() => stepperControlValues.value);

const isStepInitialSelected = computed(() => stepperControlValues.value[0].active);
const isStepSituationSelected = computed(() => stepperControlValues.value[1].active);
const isStepComplementSelected = computed(() => stepperControlValues.value[2].active);
const formFieldErrorValidator = reactive({
  name: new DefaultFieldValidatorObject(),
  species: new DefaultFieldValidatorObject(),
  size: new DefaultFieldValidatorObject(),
  collectionPlace: new DefaultFieldValidatorObject(),
  gender: new DefaultFieldValidatorObject(),
  idColor: new DefaultFieldValidatorObject(),
  idBreed: new DefaultFieldValidatorObject(),
});

const temporaryHomeErrorValidator = reactive({
  forwardingDate: new DefaultFieldValidatorObject(),
  idTemporaryHome: new DefaultFieldValidatorObject(),
});

const deathErrorValidator = reactive({
  deathDate: new DefaultFieldValidatorObject(),
  deathDetail: new DefaultFieldValidatorObject(),
});

const adoptionErrorValidate = reactive({
  adoptionDate: new DefaultFieldValidatorObject(),
  idAdoptionUser: new DefaultFieldValidatorObject(),
});

const temporaryHomeFields = computed(() => ({
  forwardingDate: {
    field: form.forwardingDate,
    fieldError: temporaryHomeErrorValidator.forwardingDate,
    tab: 2,
  },
  idTemporaryHome: {
    field: form.idTemporaryHome,
    fieldError: temporaryHomeErrorValidator.idTemporaryHome,
    tab: 2,
  },
}));

const adoptionFields = computed(() => ({
  adoptionDate: {
    field: form.adoptionDate,
    fieldError: adoptionErrorValidate.adoptionDate,
    tab: 2,
  },
  idAdoptionUser: {
    field: form.idAdoptionUser,
    fieldError: adoptionErrorValidate.idAdoptionUser,
    tab: 2,
  },
}));

const adoptedFields = computed(() => ({
  deathDate: {
    field: form.deathDate,
    fieldError: deathErrorValidator.deathDate,
    tab: 2,
  },
  deathDetail: {
    field: form.deathDetail,
    fieldError: deathErrorValidator.deathDetail,
    tab: 2,
  },
}));

const fieldsToValidate = computed(() => ({
  name: {
    field: form.name,
    fieldError: formFieldErrorValidator.name,
    tab: 0,
  },
  species: {
    field: form.species,
    fieldError: formFieldErrorValidator.species,
    tab: 0,
  },
  size: {
    field: form.size,
    fieldError: formFieldErrorValidator.size,
    tab: 0,
  },
  collectionPlace: {
    field: form.collectionPlace,
    fieldError: formFieldErrorValidator.collectionPlace,
    tab: 0,
  },
  gender: {
    field: form.gender,
    fieldError: formFieldErrorValidator.gender,
    tab: 0,
  },
  idColor: {
    field: form.idColor,
    fieldError: formFieldErrorValidator.idColor,
    tab: 0,
  },
  idBreed: {
    field: form.idBreed,
    fieldError: formFieldErrorValidator.idBreed,
    tab: 1,
  },
}));
const listInstitutions = ref([]);

const behavioralProfileList = ref([]);

const updateSituation = (situation) => {
  form.idSituation = situation;
};

const updateColor = (color) => {
  form.idColor = color;
};

const breedsList = ref([]);
watch(
  () => form.species,
  (newValue, oldValue) => {
    if (newValue) {
      form.idBreed = null;
      searchBreed(newValue);
    }
  }
);

const changeSize = () => {
  const newValue = form.weight;
  if (newValue) {
    if (newValue <= 5) {
      form.size = 1;
    } else if (newValue > 5 && newValue <= 10) {
      form.size = 2;
    } else if (newValue > 10 && newValue <= 20) {
      form.size = 3;
    } else {
      form.size = 4;
    }

    selectSize(form.size);
  }
};

const searchBreed = async (species) => {
  if (species) {
    const res = await BreedGateway.List(species);
    breedsList.value = res.data;
  }
};

const GetInstitutionRoles = () => {
  InstitutionGateway.ListInstitutionsWithRoles().then((res) => {
    if (res.data) {
      listInstitutions.value = res.data;

      if (res.data.length === 1) {
        form.idInstitution = res.data[0].id;
      }
    }
  });
};

const currentVeterinaryTab = ref("vaccine");
const selectSize = (size) => {
  form.size = size;
};

const showFieldInstitution = computed(() => {
  return !route.params.id && listInstitutions.value.length > 0;
});

const onChangeListPublicImagesUploaded = (value) => {
  const newImage = { id: null, image: value };
  form.animalImages.push(newImage);
};

const removeImage = (index) => {
  const image = form.animalImages.find((img, i) => i === index);
  form.animalImages = form.animalImages.filter((img, i) => i !== index);
  if (image.id || image.id === 0) {
    form.deletedImages.push(image.id);
  }
};

const isLoaded = ref(false);

onMounted(() => {
  findData();
  initFlowbite();
});

const goToPublicProfile = () => {
  router.push({ path: `/public/animal/${form.id}` });
};

const removeFile = (index) => {
  const file = form.animalAttachments.find((f, i) => i === index);
  form.animalAttachments = form.animalAttachments.filter((f, i) => i !== index);
  if (file.id || file.id === 0) {
    form.deletedAnimalAttachments.push(file.id);
  }
};

const findData = async () => {
  if (route.params.id || route.params.id === 0) {
    AnimalGateway.Get(route.params.id).then(async (res) => {
      if (res.data) {
        mapRequestToForm(res.data);
        initDatePicker();
        await Promise.all([
          searchBreed(form.species),
          GetInstitutionRoles(),
          searchBehavioralProfile(),
        ]);
        form.idBreed = res.data.idBreed;
        isLoaded.value = true;
      }
    });
  } else {
    Promise.all([GetInstitutionRoles(), searchBehavioralProfile()]).then(async () => {
      initDatePicker();
      isLoaded.value = true;
    });
  }
};

const searchBehavioralProfile = () => {
  BehavioralProfileGateway.List().then((res) => {
    if (res.data) {
      res.data.forEach((element) => {
        behavioralProfileList.value.push(element);
      });
    }
  });
};

const initDatePicker = () => {
  const datepickerEl = document.getElementById("collectiondate");
  new Datepicker(datepickerEl, {
    format: "dd/mm/yyyy",
    orientation: "bottom",
    todayBtn: true,
    clearBtn: true,
    todayHighlight: true,
    todayBtnMode: 1,
    language: "pt-BR",
  });
};

const mapRequestToForm = (data) => {
  form.id = data.id;
  form.name = data.name;
  form.species = data.species;
  form.breed = data.breed;
  form.idBreed = data.idBreed;
  form.age = data.age;
  form.collectionPlace = data.collectionPlace;
  form.size = data.size;
  form.gender = data.gender;
  form.weight = data.weight;
  form.idColor = data.idColor;
  form.idSituation = data.idSituation;
  form.deathDetail = data.deathDetail;
  form.adoptionSolicitationDate = data.adoptionSolicitationDate;
  form.idBehavioralProfile = data.idBehavioralProfile;
  form.observation = data.observation;
  form.idTreatment = data.idTreatment;
  form.treatment = data.treatment || [];
  form.idTemporaryHome = data.idTemporaryHome;
  form.temporaryHome = data.temporaryHome;
  form.medicineAnimal = data.medicineAnimal;
  form.castrated = data.castrated;
  form.animalImages = data.images || [];
  form.idInstitution = data.idInstitution;
  form.adoptionUser = data.adoptionUser;
  form.idUserAdoption = data.idUserAdoption;
  form.animalImages = data.animalImages || [];
  form.animalAttachments = data.animalAttachments || [];
  form.deletedAnimalAttachments = [];
  form.deletedImages = [];

  if (data.adoptionApprovalDate)
    form.adoptionApprovalDate = moment(data.adoptionApprovalDate).format("DD/MM/yyyy");

  if (data.adoptionDate)
    form.adoptionDate = moment(data.adoptionDate).format("DD/MM/yyyy");

  if (data.deathDate) form.deathDate = moment(data.deathDate).format("DD/MM/yyyy");

  if (data.collectionDate)
    form.collectionDate = moment(data.collectionDate).format("DD/MM/yyyy");

  if (data.forwardingDate)
    form.forwardingDate = moment(data.forwardingDate).format("DD/MM/yyyy");

  if (data.medicineAnimal && data.medicineAnimal.length > 0) {
    for (let i = 0; i < data.medicineAnimal.length; i++) {
      if (data.medicineAnimal[i].initialDate)
        data.medicineAnimal[i].initialDate = moment(
          data.medicineAnimal[i].initialDate
        ).format("DD/MM/yyyy");

      if (data.medicineAnimal[i].endDate)
        data.medicineAnimal[i].endDate = moment(data.medicineAnimal[i].endDate).format(
          "DD/MM/yyyy"
        );
    }
  }

  if (data.treatment && data.treatment.length > 0) {
    for (let i = 0; i < data.treatment.length; i++) {
      if (data.treatment[i].initialDate)
        data.treatment[i].initialDate = moment(data.treatment[i].initialDate).format(
          "DD/MM/yyyy"
        );

      if (data.treatment[i].endDate)
        data.treatment[i].endDate = moment(data.treatment[i].endDate).format(
          "DD/MM/yyyy"
        );

      if (data.treatment[i].endForecastDate)
        data.treatment[i].endForecastDate = moment(
          data.treatment[i].endForecastDate
        ).format("DD/MM/yyyy");
    }
  }
};

const validateRequiredFields = () => {
  let hasErrorOnFirstTab = false;
  let hasErrorOnSecondTab = false;
  let hasErrorOnThirdTab = false;

  Object.keys(fieldsToValidate.value).forEach((fieldKey) => {
    const { tab, field, fieldError } = fieldsToValidate.value[fieldKey];
    if (!field) {
      if (tab === 0) {
        hasErrorOnFirstTab = true;
      } else if (tab === 1) {
        hasErrorOnSecondTab = true;
      } else {
        hasErrorOnThirdTab = true;
      }
      fieldError.error = true;
    } else {
      fieldError.error = false;
    }
  });

  if (form.idSituation === AnimalSituation.TemporaryHome) {
    if (!validateTemporaryHome()) {
      return false;
    }
  } else if (form.idSituation === AnimalSituation.Death) {
    if (!validateDate()) {
      return false;
    }
  } else if (form.idSituation === AnimalSituation.Adopted) {
    if (!validateAdoption()) {
      return false;
    }
  }

  if (hasErrorOnFirstTab) {
    switchFirstTab();
    return false;
  }

  if (hasErrorOnSecondTab) {
    switchSecondTab();
    return false;
  }

  if (hasErrorOnThirdTab) {
    switchThirdTab();
    return false;
  }

  return true;
};

const validateTemporaryHome = () => {
  let isValid = true;
  Object.keys(temporaryHomeFields.value).forEach((fieldKey) => {
    const { tab, field, fieldError } = temporaryHomeFields.value[fieldKey];
    if (!field) {
      isValid = false;
      fieldError.error = true;
    } else {
      fieldError.error = false;
    }
  });

  return isValid;
};

const validateDate = () => {
  let isValid = true;
  Object.keys(deathFields.value).forEach((fieldKey) => {
    const { tab, field, fieldError } = deathFields.value[fieldKey];
    if (!field) {
      isValid = false;
      fieldError.error = true;
    } else {
      fieldError.error = false;
    }
  });

  return isValid;
};
const validateAdoption = () => {
  let isValid = true;
  Object.keys(adoptionFields.value).forEach((fieldKey) => {
    const { tab, field, fieldError } = adoptionFields.value[fieldKey];
    if (!field) {
      isValid = false;
      fieldError.error = true;
    } else {
      fieldError.error = false;
    }
  });

  return isValid;
};

const removeFieldError = (e) => {
  if (fieldsToValidate.value.hasOwnProperty(e.target.name)) {
    fieldsToValidate.value[e.target.name].fieldError.error = false;
  } else if (temporaryHomeFields.value.hasOwnProperty(e.target.name)) {
    temporaryHomeFields.value[e.target.name].fieldError.error = false;
  } else if (deathFields.value.hasOwnProperty(e.target.name)) {
    deathFields.value[e.target.name].fieldError.error = false;
  } else if (adoptionFields.value.hasOwnProperty(e.target.name)) {
    adoptionFields.value[e.target.name].fieldError.error = false;
  }
};

const save = () => {
  if (validateRequiredFields()) {
    isLoaded.value = false;
    AnimalGateway.Save(form).then((res) => {
      if (res.data && (res.data.id || res.data.id === 0)) {
        AnimalGateway.SaveFiles(res.data.id, form).then((r) => {
          isLoaded.value = true;
          if (r.data && (r.data.id || r.data.id === 0)) {
            showSuccessModal();
            return;
          } else {
            isLoaded.value = true;
            showModalError.value = true;
          }
        });
      } else {
        isLoaded.value = true;
        showModalError.value = true;
      }
    });
  }
};

watch(
  () => form.size,
  (newValue) => {
    if (newValue) {
      formFieldErrorValidator.size.error = false;
    }
  }
);

watch(
  () => form.gender,
  (newValue) => {
    if (newValue) {
      formFieldErrorValidator.gender.error = false;
    }
  }
);

watch(
  () => form.idColor,
  (newValue) => {
    if (newValue) {
      formFieldErrorValidator.idColor.error = false;
    }
  }
);

watch(
  () => form.idBreed,
  (newValue) => {
    if (newValue) {
      formFieldErrorValidator.idBreed.error = false;
    }
  }
);

const showSuccessModal = () => {
  showModalSuccess.value = true;
  const callbackFn = () => {
    showModalSuccess.value = false;
    router.push({ name: "animals" });
  };
  ProgressBarControl(dynamicWidth, 50, 2000, callbackFn);
};

const closeModalGenericError = () => {
  showModalError.value = false;
};
</script>

<template>
  <GenericError :show-modal="showModalError" v-on:closeModal="closeModalGenericError"></GenericError>

  <Modal :show-modal="showModalSuccess">
    <template v-slot:body>
      <div
        class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
        <svg aria-hidden="true" class="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"></path>
        </svg>
      </div>
      <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t("record_saved_successfully") }}
      </p>
      <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" :style="{ width: dynamicWidth }"></div>
    </template>
  </Modal>

  <div class="pb-5">
    <Breadcrumb :list-items="breadcrumb"> </Breadcrumb>
  </div>

  <div class="w-full">
    <div class="block sm:flex w-full">
      <div class="w-full sm:w-10/12">
        <PageHeader :title="$t('animals_registration')" :subtitle="$t('enter_details_to_get_started')"></PageHeader>
        <div class="py-5 w-full">
          <Stepper :control="stepperControl" v-on:clickTab="onChangeStep"></Stepper>
        </div>
      </div>
    </div>
  </div>

  <div v-show="!isLoaded">
    <Skeleton></Skeleton>
  </div>
  <div v-show="isLoaded">
    <div v-show="isStepInitialSelected" class="sm:flex">
      <div class="w-full sm:w-4/12">
        <div>
          <div class="pt-2 pb-5">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {{ $t("institution") }}
            </label>
            <Multiselect v-model="form.idInstitution" :options="listInstitutions" :disabled="!showFieldInstitution"
              valueProp="id" :multiple="false" label="name">
              <template v-slot:singleLabel="{ option }">
                <div>
                  <img class="option__image max-h-16" :src="option.image" />
                  <div class="option__desc pl-2">
                    <span class="option__title">{{ option.name }}</span>
                  </div>
                </div>
              </template>

              <template v-slot:option="{ option }">
                <img class="option__image max-h-16" :src="option.image" />
                <div class="option__desc pl-2">
                  <span class="option__title">{{ option.name }}</span>
                </div>
              </template>
            </Multiselect>
          </div>
        </div>
        <div>
          <Input :placeholder="$t('leave_it_blank_if_dont_have')" v-model="form.name" :label="$t('name')" name="name"
            v-on:change="removeFieldError" />
          <ErrorMessage v-bind="formFieldErrorValidator.name" />
        </div>

        <div class="pt-2 w-full sm:w-6/12">
          <div class="pt-2 w-full">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 w-full">
              {{ $t("species") }}
            </label>
            <div class="flex w-full">
              <div class="w-6/12">
                <input type="radio" id="dog" name="species" value="1" v-model="form.species"
                  v-on:change="removeFieldError" class="hidden peer" required />
                <label for="dog"
                  class="inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div class="block w-full">
                    <div class="w-full text-center">
                      <img src="/images/dog_illustration.png" class="h-20" />
                      {{ $t("dog") }}
                    </div>
                  </div>
                </label>
              </div>
              <div class="w-6/12">
                <input type="radio" id="cat" name="species" value="2" v-model="form.species"
                  v-on:change="removeFieldError" class="hidden peer" />
                <label for="cat"
                  class="inline-flex items-center justify-between p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div class="block">
                    <div class="w-full text-center">
                      <img src="/images/cat_illustration.png" class="h-20" />
                      {{ $t("cat") }}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <ErrorMessage v-bind="formFieldErrorValidator.species" />
        </div>

        <div class="w-full flex mt-2">
          <div class="w-full">
            <Input :placeholder="'Idade aproximada'" v-model="form.age" :label="'Idade aproximada'"
              v-on:change="removeFieldError" type="number" min="0" max="25" name="age" />
          </div>

          <div class="pl-2 w-full">
            <Input :placeholder="'Peso'" v-model="form.weight" @change="changeSize" :label="'Peso'" type="number" min="0"
              name="weight" />
          </div>
        </div>
      </div>
      <div class="w-full sm:w-4/12 sm:pl-10">
        <div class="pt-2">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {{ $t("size") }}
          </label>
          <div class="block sm:flex w-full">
            <div class="flex w-full">
              <BadgeFilter :title="$t('mini')" :clicked="form.size === 1" v-on:click="selectSize(1)" class="sm:w-full">
              </BadgeFilter>

              <BadgeFilter :title="$t('small')" :clicked="form.size === 2" v-on:click="selectSize(2)" class="sm:w-full">
              </BadgeFilter>
              <BadgeFilter :title="$t('medium')" :clicked="form.size === 3" v-on:click="selectSize(3)" class="sm:w-full">
              </BadgeFilter>
              <BadgeFilter :title="$t('big')" :clicked="form.size === 4" v-on:click="selectSize(4)" class="sm:w-full">
              </BadgeFilter>

              <a href="#" data-tooltip-target="tooltip-default">
                <font-awesome-icon icon="question-circle" class="text-gray-500 dark:text-gray-400" />
              </a>
              <div id="tooltip-default" role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                {{ $t("size_tooltip") }}
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
          <ErrorMessage v-bind="formFieldErrorValidator.size" />
        </div>
        <div class="pt-2">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t("collection_date")
          }}</label>
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input id="collectiondate" datepicker-autohide="true" type="text" v-model="form.collectionDate"
              name="collectionDate"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Deixe em branco caso não souber"
              v-on:changeDate="(t) => (form.collectionDate = t.target.value)" />
          </div>
        </div>

        <div class="pt-2">
          <Input :placeholder="$t('collection_place')" v-model="form.collectionPlace" :label="$t('collection_place')"
            name="collectionPlace" v-on:change="removeFieldError" />
          <ErrorMessage v-bind="formFieldErrorValidator.collectionPlace" />
        </div>

        <div class="pt-2">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {{ $t("gender") }}
          </label>
          <ul class="grid w-full gap-6 md:grid-cols-2">
            <li>
              <input type="radio" id="male" name="hosting" value="1" class="hidden peer" v-model="form.gender" required />
              <label for="male"
                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="block">
                  <div class="w-full">{{ $t("male_animal") }}</div>
                </div>
              </label>
            </li>
            <li>
              <input type="radio" id="female" name="hosting" value="2" v-model="form.gender" class="hidden peer" />
              <label for="female"
                class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div class="block">
                  <div class="w-full">{{ $t("female_animal") }}</div>
                </div>
              </label>
            </li>
          </ul>
          <ErrorMessage v-bind="formFieldErrorValidator.gender" />
        </div>

        <div class="pt-5">
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {{ $t("predominant_color") }}
            </label>
            <ColorSelector v-on:updateColor="updateColor" :form="form"></ColorSelector>
          </div>
          <ErrorMessage v-bind="formFieldErrorValidator.idColor" />
        </div>

        <div class="pt-5">
          <div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" v-model="form.castrated">
              <div
                class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
              </div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ $t('castrated') }} </span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div v-show="isStepSituationSelected">
      <div class="flex w-full">
        <div class="w-full sm:w-6/12">
          <div class="py-2">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t("breed") }}
            </label>
            <Multiselect v-model="form.idBreed" :options="breedsList" valueProp="id" :multiple="false" label="name" />

            <ErrorMessage v-bind="formFieldErrorValidator.idBreed" />
          </div>

          <div class="py-2">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t("behavior_profile") }}
            </label>
            <Multiselect v-if="behavioralProfileList && behavioralProfileList.length > 0"
              v-model="form.idBehavioralProfile" :options="behavioralProfileList" valueProp="id" :multiple="false"
              label="name" />
          </div>
          <div class="py-2">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {{ $t("photos") }}
            </label>
            <ImageUpload v-on:change-image="onChangeListPublicImagesUploaded" :logo="form.animalImages"
              :show-gallery="true" v-on:remove-image="removeImage" :id="'gallery-images'" :image-prop="'image'">
              <label for="gallery-images">
                <div class="flex py-2 items-center justify-center h-20 w-20 bg-stone-800">
                  <span class="text-white font-bold text-2xl">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                  </span>
                </div>
              </label>
            </ImageUpload>
          </div>
        </div>
      </div>
    </div>

    <div v-show="isStepComplementSelected">
      <div class="block sm:flex w-full">
        <div class="w-full sm:w-6/12">
          <div class="py-2 w-full">
            <situation :form="form" v-on:updateSituation="updateSituation"></situation>
          </div>
          <div v-if="form.idSituation === AnimalSituation.TemporaryHome">
            <temporaryHome :form="form" :formFieldErrorValidator="temporaryHomeErrorValidator"
              v-on:update-entity="updateTemporaryHome" v-on:updateForwardingDate="updateForwardingDate">
            </temporaryHome>
          </div>

          <div v-else-if="form.idSituation === AnimalSituation.Adopted">
            <Adopted :form="form" :formFieldErrorValidator="adoptionErrorValidate" v-on:update-entity="updateAdoption"
              v-on:updateAdoptionDate="updateAdoptionDate">
            </Adopted>
          </div>

          <div v-else-if="form.idSituation === AnimalSituation.Death">
            <Death :form="form" :formFieldErrorValidator="deathErrorValidator" v-on:update-entity="updateTemporaryHome"
              v-on:updateDeathDate="updateDeathDate">
            </Death>
          </div>

          <div v-else-if="form.idSituation === AnimalSituation.InTreatment">
            <Treatment :form="form" :formFieldErrorValidator="formFieldErrorValidator"
              v-on:update-entity="updateTreatment">
            </Treatment>
          </div>

          <div v-else-if="form.idSituation === AnimalSituation.AwaitingAdoption">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {{ $t("observation") }}
            </label>
            <quill-editor theme="snow" name="details" class="h-200" v-model:content="form.observation"
              contentType="html"></quill-editor>
          </div>
        </div>

        <div class="w-full md:pl-10 sm:w-6/12">
          <tabs variant="underline" v-model="currentVeterinaryTab" class="p-5">
            <tab name="vaccine" title="Vacinas" :disabled="false">
              <Medicine :form="form" v-on:update-entity="updateMedicine"></Medicine>
            </tab>
            <tab name="second" title="Anexos" :disabled="false">
              <Files :form="form" v-on:update-entity="updateFiles" v-on:remove-file="removeFile"></Files>
            </tab>
          </tabs>
        </div>
      </div>
    </div>

    <div class="pt-32 sm:pt-0">
      <FloatButtons :primary-action="save" :secondary-action="goToPublicProfile"></FloatButtons>
    </div>
  </div>
</template>
