<script setup>
import InstitutionModel from "../../../structures/Models/InstitutionModel";
import InstitutionGateway from "../../../gateways/InstitutionGateway";
import { reactive, ref } from "vue";
import moment from "moment";
import VueEasyLightbox from "vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js";
import "vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css";
import { Carousel, Slide } from "vue3-carousel";
import Breadcrumb from "../../../components/breadcrumb.vue";
import qrCode from "../../../components/qr-code.vue";
import Constants from "../../../constants";
import "vue3-carousel/dist/carousel.css";
import Skeleton from "../../../components/skeleton.vue";

const route = useRoute();
const form = reactive(new InstitutionModel());
const showGallery = ref(false);
const { t } = useI18n();
const currentSlide = ref(0);
const showLoading = ref(0);

onMounted(() => {
  showLoading.value = true;

  InstitutionGateway.GetPublicInfos(route.params.id).then((response) => {
    showLoading.value = false;
    if (response.data) {
      mapRequestToForm(response.data);
    }
  });
});

const mapRequestToForm = (data) => {
  form.id = data.id;
  form.name = data.name;
  form.description = data.description;
  form.email = data.email;
  form.phone = data.phone;
  form.site = data.site;
  form.address = data.address;
  form.logo = data.image;
  form.publicImages = data.publicImages;
  form.createdAt = data.createdAt;
  form.howVolunteersCanHelp = data.howVolunteersCanHelp;
  form.userCreator = data.userCreator;
};

const mapPublicImages = computed(() => {
  return form.publicImages.map((image) => ({ src: image.image }));
});

const showGalleryImage = (index) => {
  showGallery.value = true;
};

const closeGallery = () => {
  showGallery.value = false;
};

const breadcrumb = ref([
  {
    name: "Home",
    url: "/",
    icon: "home",
  },
  {
    name: t("ngos"),
    url: "/institution",
  },
  {
    name: t("details"),
    url: "#",
  },
]);

const slideTo = (index) => {
  currentSlide.value = index;
};
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
        <div class="grid gap-4 mb-4 sm:grid-cols-3 sm:gap-6 md:gap-12 sm:mb-5">
          <div class="sm:col-span-2">
            <div class="w-full">
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

            <div class="flex w-full flex-col pt-10">
              <div class="font-semibold text-lg leading-tight tracking-tight">
                {{ $t("description") }}
              </div>
              <p class="text-md text-gray-500 pt-2" v-html="form.description"></p>
            </div>

            <div class="flex w-full flex-col pt-10">
              <div class="font-semibold text-lg leading-tight tracking-tight">
                {{ $t("how_volunteers_can_help") }}
              </div>
              <p
                class="text-md text-gray-500 pt-2"
                v-html="form.howVolunteersCanHelp"
              ></p>
            </div>
          </div>
          <!-- Column -->
          <div>
            <dl>
              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                <div>
                  <img
                    class="object-cover h-full md:w-auto max-w-xs sm:w-1/4 w-full rounded-md"
                    v-if="form.logo"
                    :src="form.logo"
                    alt=""
                    style="max-height: 6rem"
                  />
                </div>
              </dt>
              <dt
                class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
                v-if="form.userCreator"
              >
                {{ $t("responsible") }}
              </dt>
              <dd
                class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5"
                v-if="form.userCreator"
              >
                {{ form.userCreator.name }}
              </dd>
              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                {{ $t("phone") }}
              </dt>
              <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
                {{ form.phone }}
              </dd>
              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                {{ $t("email") }}
              </dt>
              <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
                {{ form.email }}
              </dd>
              <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                {{ $t("created_at") }}
              </dt>
              <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
                {{ moment(form.createdAt).format("DD/MM/yyyy") }}
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
</style>
