<script setup>
import citiesControl from '../helpComponents/cities-control.vue';
import CityControlForm from '../helpClasses/cityControlForm';
import InterestsControlForm from '../helpClasses/interestsControlForm';
import { Interests } from '../../../enums/Interests';
import BadgeFilter from '../../../components/badge-filter.vue';
import { Button } from 'flowbite-vue';
import UserGateway from '../../../gateways/UserGateway';
import deepcopy from 'deepcopy';
import ProgressBarControl from '../../../helpers/ProgressBarControl.ts'

const props = defineProps(['form', 'citiesAdded', 'fieldValidatorForm'])
const interestsControlForm = new InterestsControlForm(props.form);
const cityControlForm = new CityControlForm(props.citiesAdded);
const showModalSuccess = ref(false);
const dynamicWidth = ref('0%');
const router = useRouter();

const showSuccessModal = () => {
    showModalSuccess.value = true;
    const callbackFn = () => {
        showModalSuccess.value = false;
        router.push({ path: '/login' });
    };
    ProgressBarControl(dynamicWidth, 50, 2000, callbackFn);
}

const saveForm = async () => {
    if (props.fieldValidatorForm.validateRequiredFields()) {
        props.form.cities = [...props.citiesAdded];
        await UserGateway.Save(deepcopy(props.form));
        showSuccessModal();
    }
}
</script>

<template>
    <Modal :show-modal="showModalSuccess">
        <template v-slot:body>
            <div
                class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                <svg aria-hidden="true" class="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor"
                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"></path>
                </svg>
            </div>
            <p class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{{ $t('record_saved_successfully') }}</p>
            <div class="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" :style="{ width: dynamicWidth }">
            </div>
        </template>
    </Modal>
    <div class="py-5">
        <label class="block mb-2 tet-sm font-medium text-gray-900 dark:text-gray-300">{{
            $t('my_objectives') }}</label>
        <div class="block sm:flex w-full">
            <div class="flex w-full">
                <BadgeFilter :title="$t('help_institutions')"
                    :clicked="interestsControlForm.checkInterestClicked(Interests.Volunteer)"
                    v-on:click="interestsControlForm.addInterest(Interests.Volunteer)" class="sm:w-full">
                </BadgeFilter>
                <BadgeFilter :title="$t('want_adopt')"
                    :clicked="interestsControlForm.checkInterestClicked(Interests.Adoption)"
                    v-on:click="interestsControlForm.addInterest(Interests.Adoption)" class="sm:w-full">
                </BadgeFilter>
            </div>
            <div class="w-full flex py-2 sm:py-0">
                <BadgeFilter :title="$t('register_own_ngo')"
                    :clicked="interestsControlForm.checkInterestClicked(Interests.MyOwnOng)"
                    v-on:click="interestsControlForm.addInterest(Interests.MyOwnOng)" class="sm:w-full">
                </BadgeFilter>
                <BadgeFilter :title="$t('i_dont_know_at_the_moment')"
                    :clicked="interestsControlForm.checkInterestClicked(Interests.DontKnow)"
                    v-on:click="interestsControlForm.addInterest(Interests.DontKnow)" class="sm:w-full">
                </BadgeFilter>
            </div>
        </div>
        <p class="text-xs text-gray-500">
            {{ $t('message_my_objectives') }}
        </p>

        <citiesControl :citiesAdded="citiesAdded" :cityControlForm="cityControlForm">
        </citiesControl>

        <div class="py-20 flex w-full">
            <div class="w-full text-left pr-2 items-center justify-center">
                <p class="text-blue-600 cursor-pointer" v-on:click="redirectToLogin">
                    Já tenho uma conta
                </p>
            </div>
            <div class="w-full text-right">
                <div>
                    <Button color="default" v-on:click="saveForm">Cadastrar</Button>
                </div>
            </div>
        </div>
    </div>
</template>