<script setup>
import AnimalModel from "../../../structures/Models/AnimalModel.ts";
import AnimalGateway from "../../../gateways/AnimalGateway.ts";
import { reactive, ref } from "vue";
import moment from "moment";
import VueEasyLightbox from "vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js";
import "vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css";
import { Carousel, Slide } from "vue3-carousel";
import Breadcrumb from "../../../components/breadcrumb.vue";
import qrCode from "../../../components/qr-code.vue";
import "vue3-carousel/dist/carousel.css";
import BadgeFilter from "../../../components/badge-filter.vue";
import { AnimalSituation } from "../../../enums/AnimalSituation.ts";
import Skeleton from "../../../components/skeleton.vue";

const route = useRoute();
const form = reactive(new AnimalModel());
const showGallery = ref(false);
const { t } = useI18n();
const currentSlide = ref(0);
const showLoading = ref(0);
onMounted(() => {
  showLoading.value = true;
  AnimalGateway.GetPublicInfos(route.params.id).then((response) => {
    showLoading.value = false;
    if (response.data) {
      mapRequestToForm(response.data);
    }
  });
});

const mapRequestToForm = (data) => {
  form.id = data.id;
  form.name = data.name;
  form.animalImages = data.animalImages;
  form.color = data.color;
  form.breed = data.breed;
  form.instituion = data.institution;
  form.adoptionUser = data.adoptionUser;
  form.idSituation = data.idSituation;
  form.createdAt = data.createdAt;
  form.behavioralProfile = data.behavioralProfile;
  form.size = data.size;
  form.weight = data.weight;
  form.age = data.age;
  form.observation = data.observation;
  form.species = data.species;
  form.gender = data.gender;
};

const mapPublicImages = computed(() => {
  return form.animalImages.map((image) => ({ src: image.image }));
});

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
    name: t("details"),
    url: "#",
  },
]);

const showGalleryImage = (index) => {
  showGallery.value = true;
};

const closeGallery = () => {
  showGallery.value = false;
};

const slideTo = (index) => {
  currentSlide.value = index;
};

const situations = [
  {
    id: AnimalSituation.AwaitingAdoption,
    name: "Disponível para adoção",
    class: "bg-orange-200",
  },
  {
    id: AnimalSituation.InTreatment,
    name: "Realizando tratamento",
    class: "bg-yellow-200",
  },
  {
    id: AnimalSituation.Death,
    name: "Óbito",
  },
  {
    id: AnimalSituation.TemporaryHome,
    name: "Encaminhado para lar temporário",
    class: "bg-purple-200",
  },
  {
    id: AnimalSituation.Adopted,
    name: "Adotado",
    class: "bg-green-200",
  },
];

const getSize = () => {
  const size = [
    {
      id: 1,
      text: t("mini"),
    },
    {
      id: 2,
      text: t("small"),
    },
    {
      id: 3,
      text: t("medium"),
    },
    {
      id: 4,
      text: t("big"),
    },
  ];

  return size[form.size - 1]?.text || "";
};

const getWeight = computed(() => {
  const weight = form.weight;
  const prefixe = weight > 1 ? t("KGs") : t("KG");
  return weight + prefixe;
});

const getYears = computed(() => {
  const age = form.age;
  const prefixe = age > 1 ? t("years") : age === 1 ? t("year") : t("less_than_one");
  const ageText = age + " " + prefixe;
  return age > 0 ? ageText : prefixe;
});

const getSpecies = computed(() => {
  const species = [t("dog"), t("cat")];
  return species[form.species - 1];
});

const getGender = computed(() => {
  const gender = [t("male_animal"), t("female_animal")];
  return gender[form.gender - 1];
});
</script>

<template>
  <div>
    <Breadcrumb :list-items="breadcrumb"> </Breadcrumb>
  </div>
  <template v-if="showLoading">
    <div class="p-16">
      <Skeleton></Skeleton>
    </div>
  </template>
  <template v-else>
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-6xl lg:py-16">
        <div class="pb-2">
          <PageHeader :title="form.name"></PageHeader>
        </div>
        <vue-easy-lightbox
          :visible="showGallery"
          :imgs="mapPublicImages"
          :index="currentSlide"
          :loop="true"
          :moveDisabled="true"
          @hide="closeGallery"
          :rotateDisabled="true"
        >
        </vue-easy-lightbox>

        <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
          Cadastrado em {{ moment(form.createdAt).format("DD/MM/yyyy") }}
        </dd>

        <div class="w-fit pb-5 sm:pb-0">
          <BadgeFilter
            v-if="form.idSituation"
            :title="situations.find((x) => x.id == form.idSituation)?.name"
            :clicked="true"
            :class="situations.find((x) => x.id == form.idSituation)?.class"
            :showChecked="false"
            :hideTimes="true"
          >
          </BadgeFilter>
        </div>
        <div class="grid gap-4 mb-4 sm:grid-cols-3 sm:gap-6 md:gap-12 sm:mb-5">
          <div class="sm:col-span-2">
            <div class="w-full cursor-pointer">
              <Carousel id="gallery" :items-to-show="1" v-model="currentSlide">
                <Slide v-for="slide in mapPublicImages" :key="slide">
                  <div class="carousel__item">
                    <img
                      :src="slide.src"
                      class="h-full max-h-60 w-auto"
                      v-on:click="showGalleryImage"
                    />
                  </div>
                </Slide>
              </Carousel>
              <Carousel
                id="thumbnails"
                :items-to-show="6"
                :wrap-around="true"
                v-model="currentSlide"
                ref="carousel"
              >
                <Slide v-for="(slide, i) in mapPublicImages" :key="slide">
                  <div class="carousel__item" @click="slideTo(i)">
                    <img :src="slide.src" class="h-full max-h-20 w-full" />
                  </div>
                </Slide>
              </Carousel>
            </div>
            <div class="flex w-full flex-row pt-10">
              <BadgeFilter
                v-if="form.behavioralProfile"
                :title="form.behavioralProfile.name"
                :clicked="true"
                :hideTimes="true"
                v-on:click="() => {}"
              >
              </BadgeFilter>
              <BadgeFilter
                v-if="form.size"
                :title="getSize()"
                :clicked="true"
                :hideTimes="true"
                v-on:click="() => {}"
                :class="'bg-green-200'"
              >
              </BadgeFilter>
              <BadgeFilter
                :title="getWeight"
                :clicked="true"
                :hideTimes="true"
                v-on:click="() => {}"
                :class="'bg-yellow-200'"
              >
              </BadgeFilter>
              <BadgeFilter
                :title="getYears"
                :clicked="true"
                :hideTimes="true"
                v-on:click="() => {}"
                :class="'bg-purple-200'"
              >
              </BadgeFilter>
            </div>

            <div class="flex w-full flex-row pt-10" v-if="form.observation">
              <div class="w-full">
                <div class="font-semibold text-lg leading-tight tracking-tight">
                  Observações
                </div>
                <p class="text-md text-gray-500 pt-2" v-html="form.observation"></p>
              </div>
            </div>
          </div>

          <div>
            <dl>
              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                {{ $t("species") }} / {{ $t("gender") }}
              </dt>
              <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
                {{ getSpecies }} / {{ getGender }}
              </dd>

              <dt
                class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
                v-if="form.color"
              >
                Cor
              </dt>
              <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5" v-if="form.color">
                <p class="text-md text-gray-500 py-2">
                  {{ form.color.name }}
                </p>
                <div
                  class="w-10 h-10 rounded-full ring-2"
                  :class="form.color.class"
                ></div>
              </dd>

              <dt
                class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
                v-if="form.breed"
              >
                Raça
              </dt>
              <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5" v-if="form.breed">
                {{ form.breed.name }}
              </dd>

              <dt
                class="mb-2 font-semibold leading-none text-gray-900 dark:text-white h-40 w-40"
              >
                <qrCode></qrCode>
              </dt>
            </dl>
          </div>
        </div>
      </div>
    </section>
  </template>
</template>

<style scoped>
.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}

.ps {
  max-height: 60vh;
  width: 100%;
}
</style>
