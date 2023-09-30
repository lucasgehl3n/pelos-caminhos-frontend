<script setup>
import InstitutionModel from '../../../structures/Models/InstitutionModel';
import InstitutionGateway from '../../../gateways/InstitutionGateway';
import { reactive } from 'vue'
import moment from 'moment';
import VueEasyLightbox from 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.esm.min.js'
import 'vue-easy-lightbox/dist/external-css/vue-easy-lightbox.css'
import { Carousel } from 'flowbite-vue'
import Breadcrumb from '../../../components/breadcrumb.vue';
import qrCode from '../../../components/qr-code.vue';
import Constants from '../../../constants';
const route = useRoute();
const form = reactive(new InstitutionModel())
const showGallery = ref(false);
const { t } = useI18n();

onMounted(() => {
    InstitutionGateway.GetPublicInfos(route.params.id).then((response) => {
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
}

const pictures = [
    {
        'src': 'https://love.doghero.com.br/wp-content/uploads/2018/05/10-xixi-de-cachorro-1024x683.jpg',
        'alt': 'Picture 1',
    },
    {
        'src': 'data:image/jpeg;base64,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',
        'alt': 'Picture 2',
    },
    {
        'src': 'https://t1.ea.ltmcdn.com/pt/posts/0/0/7/remedio_caseiro_para_a_diarreia_de_cachorro_20700_orig.jpg',
        'alt': 'Picture 3',
    },
    {
        'src': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTusLkpr44szz_sySvaX4OWCHy006bW01AQLBFDMPruyDEiYphMfYBZN5kns3zLYsD_mqs&usqp=CAU',
        'alt': 'Picture 3',
    },
    {
        'src': 'https://adotar.com.br/painel/upload/2023-02/animais_imagem955172T.jpg',
        'alt': 'Picture 3',
    },
]

const mapPublicImages = computed(() => {
    return form.publicImages.map((image) => ({ 'src': image.image }))
})

const showGalleryImage = (index) => {
    showGallery.value = true;
}

const closeGallery = () => {
    showGallery.value = false;
}

const breadcrumb = ref([
    {
        name: 'Home',
        url: '/',
        icon: 'home',
    },
    {
        name: t('ngos'),
        url: '/institution',
    },
]);
</script>


<template>
    <div>
        <Breadcrumb :list-items="breadcrumb">
        </Breadcrumb>
    </div>
    <vue-easy-lightbox :visible="showGallery" :imgs="pictures" :index="image" :loop="true" :moveDisabled="true"
        @hide="closeGallery" :rotateDisabled="true">
    </vue-easy-lightbox>


    <section class="bg-white dark:bg-gray-900">
        <qrCode :text="Constants.API_URL + route.fullPath"></qrCode>
        <div class="py-8 px-4 mx-auto max-w-6xl lg:py-16">
            <div class="pb-2">
                <PageHeader :title="form.name"></PageHeader>
            </div>
            <div class="grid gap-4 mb-4 sm:grid-cols-3 sm:gap-6 md:gap-12 sm:mb-5">
                <!-- Column -->
                <div class="sm:col-span-2">
                    <div class="w-full">
                        <Carousel :pictures="pictures" v-on:click="showGalleryImage"></Carousel>
                    </div>

                    <div class="flex w-full flex-col pt-10">
                        <div class="font-semibold text-lg leading-tight tracking-tight">
                            Descrição
                        </div>
                        <p class="text-md text-gray-500 pt-2">
                            {{ form.description }}
                        </p>
                    </div>

                    <div class="flex w-full flex-col pt-10">
                        <div class="font-semibold text-lg leading-tight tracking-tight">
                            Como voluntários poderão ajudar?
                        </div>
                        <p class="text-md text-gray-500 pt-2">
                            {{ form.description }}
                        </p>
                    </div>
                </div>
                <!-- Column -->
                <div>
                    <dl>
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                            <div>
                                <img class="object-cover h-full md:w-auto max-w-xs sm:w-1/4 w-full rounded-md"
                                    v-if="form.logo" :src="form.logo" alt="" style="max-height: 6rem;">
                            </div>
                        </dt>
                        <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">
                            <span
                                class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                <svg aria-hidden="true" class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                    </path>
                                </svg>
                                New
                            </span>
                        </dd>
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Responsável</dt>
                        <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">Flowbite</dd>
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Telefone</dt>
                        <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">{{ form.phone }}</dd>
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">E-mail</dt>
                        <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">{{ form.email }}</dd>
                        <dt class="mb-2 font-semibold leading-none text-gray-900 dark:text-white">Membro desde</dt>
                        <dd class="mb-4 text-gray-500 dark:text-gray-400 sm:mb-5">{{ moment(form.createdAt).format('L') }}
                        </dd>
                    </dl>
                </div>
            </div>

        </div>
    </section>
</template>