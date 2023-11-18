<script setup>
import Breadcrumb from "../../components/breadcrumb.vue";
import BadgeFilter from "../../components/badge-filter.vue";
import SearchBar from "../../components/search-bar.vue";
import ListAnimals from "./components/ListAnimals.vue";
import AnimalFilter from "../../structures/Filters/AnimalFilter";
import AnimalGateway from "../../gateways/AnimalGateway";
import Constants from "../../constants";
import Loading from "vue3-loading-overlay";
import AnimalModel from "../../structures/Models/AnimalModel";
import AiBreedSearch from "./helpComponents/ai-breed-search.vue";
import { Button } from "flowbite-vue";
const { t } = useI18n();

const router = useRouter();

const filter = ref(new AnimalFilter());
const showLoading = ref(false);
const listAnimals = ref([]);
const counters = ref({
  volunteer: 0,
  admin: 0,
  bounded: 0,
});
let identifierReset = ref(false);
let pageDynamicRendering = ref(1);

const filterBounded = async () => {
  let invertedValue = !filter.value.bonded;

  resetAllFilters();
  filter.value.bonded = invertedValue;
};

const filterCat = async () => {
  let invertedValue = !filter.value.cat;

  resetAllFilters();
  filter.value.cat = invertedValue;
};

const filterDog = async () => {
  let invertedValue = !filter.value.dog;

  resetAllFilters();
  filter.value.dog = invertedValue;
};

const searchValues = (value) => {
  filter.value.search = value;
  identifierReset.value = true;
  listAnimals.value = [];
};

const searchImage = (value) => {
  filter.value.image = value;
  identifierReset.value = true;
  listAnimals.value = [];
};

const removeSearchImage = (value) => {
  filter.value.image = null;
  identifierReset.value = true;
  listAnimals.value = [];
};

const sortingValues = (value) => {
  filter.value.sorting = value;
  identifierReset.value = true;
  listAnimals.value = [];
};

const resetAllFilters = async () => {
  filter.value = new AnimalFilter();
  identifierReset.value = true;
  listAnimals.value = [];
};

const resetPage = () => {
  pageDynamicRendering.value = 1;
};

const increasePage = () => {
  pageDynamicRendering.value++;
};

const loadedPage = () => {
  identifierReset.value = false;
};

const mapRequestToForm = (data) => {
  const animalTemp = new AnimalModel();
  animalTemp.id = data.id;
  animalTemp.name = data.name;
  animalTemp.weight = data.weight;
  animalTemp.age = data.age;
  animalTemp.gender = data.gender;
  animalTemp.animalImages = data.animalImages;
  animalTemp.role = data.role;
  animalTemp.institution = data.institution;
  listAnimals.value.push(animalTemp);
};

const loadData = async (state) => {
  showLoading.value = true;
  if (identifierReset.value) {
    resetPage();
    loadedPage();
    showLoading.value = false;
    return;
  }

  const list = await AnimalGateway.List(pageDynamicRendering.value, filter.value);
  if (list && list.data) {
    if (list.data.list && list.data.list.length) {
      list.data.list.forEach((institution) => {
        mapRequestToForm(institution);
      });

      if (list.data.list.length < Constants.RESULTS_PER_PAGE) {
        state.complete();
      } else {
        increasePage();
        state.loaded();
      }
    } else if (filter.value.image && list.data && list.data.length > 0) {
      for (let i = 0; i < list.data.length; i++) {
        for (const animal of list.data[i].animalList) {
          mapRequestToForm(animal);
        }
      }
      state.complete();
    } else {
      state.complete();
    }
  } else {
    state.complete();
  }

  showLoading.value = false;
};

const breadcrumb = ref([
  {
    name: "Home",
    url: "/",
    icon: "home",
  },
  {
    name: "Animais",
    url: "/animals",
  },
]);

const showModalImageAi = ref(false);
const showModalAi = () => {
  showModalImageAi.value = true;
};

const closeModalAi = () => {
  showModalImageAi.value = false;
};
</script>
<template>
  <div class="pb-5">
    <Breadcrumb :list-items="breadcrumb"> </Breadcrumb>
  </div>
  <div class="w-full flex">
    <div class="w-4/5">
      <PageHeader :title="'Animais'"></PageHeader>
    </div>
    <div class="w-full flex-row sm:w-1/5 sm:items-end text-right sm:px-5 py-4">
      <a
        href="#"
        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        v-on:click="router.push({ path: '/animals/create' })"
        >Cadastrar Animal</a
      >
    </div>
  </div>

  <perfect-scrollbar class="scrollable w-full psBadges">
    <div class="flex w-full whitespace-nowrap">
      <div class="pr-2 sm:pr-0 w-auto" v-if="filter.image">
        <BadgeFilter
          :title="'Procurar com uma imagem'"
          :number="counters.bounded"
          @click="removeSearchImage"
          :clicked="true"
        >
        </BadgeFilter>
      </div>
      <div class="pr-2 sm:pr-0 w-auto">
        <BadgeFilter
          :title="$t('my_bounded')"
          :number="counters.bounded"
          @click="filterBounded"
          :clicked="filter.bonded"
        >
        </BadgeFilter>
      </div>
      <div class="pr-2 sm:pr-0 w-auto">
        <BadgeFilter :title="t('dog')" @click="filterDog" :clicked="filter.dog">
        </BadgeFilter>
      </div>

      <div class="w-auto">
        <BadgeFilter :title="t('cat')" @click="filterCat" :clicked="filter.cat">
        </BadgeFilter>
      </div>
    </div>
  </perfect-scrollbar>

  <div class="py-2 w-full sm:pr-10">
    <div class="block sm:flex w-full">
      <div class="w-full sm:w-10/12">
        <SearchBar v-on:change-search="searchValues" v-on:change-sorting="sortingValues">
        </SearchBar>
      </div>
      <div class="w-full sm:w-2/12">
        <Button
          color="default"
          v-on:click="showModalAi"
          class="mt-2 w-full sm:ml-10 sm:mt-0"
        >
          <font-awesome-icon :icon="['fas', 'image']" class="text-md" />
          &nbsp; {{ $t('search_with_image') }}
        </Button>
      </div>
    </div>
  </div>

  <AiBreedSearch
    :showModal="showModalImageAi"
    :filter="filter"
    v-on:searchImage="searchImage"
    v-on:removeSearchImage="removeSearchImage"
    v-on:closeModal="closeModalAi"
  ></AiBreedSearch>

  <Loading
    :active="showLoading"
    :opacity="0.8"
    :color="'#1943dd'"
    class="w-full flex flex-col items-center py-10"
  >
  </Loading>

  <ListAnimals
    v-show="!showLoading"
    :list="listAnimals"
    :identifier-reset="identifierReset"
    :page="pageDynamicRendering"
    :fnReload="loadData"
  >
  </ListAnimals>
</template>
