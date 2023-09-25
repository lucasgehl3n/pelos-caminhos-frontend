<script setup>
import Stepper from '../../components/stepper.vue';
import PageHeader from '../../components/page-header.vue';
import StepperObject from '../../structures/StepperObject';
import OnChangeStep from '../../helpers/OnChangeStep';
import { reactive } from 'vue'
import Datepicker from 'flowbite-datepicker/Datepicker';
import UserModel from '../../structures/Models/UserModel';
import RandomImage from '../../helpers/RandomImage';
import GetImagesOfLogin from '../../helpers/files/GetImagesOfLogin';
import FieldValidatorForm, { FieldsToValidate, formFieldErrorValidator } from './helpClasses/fieldValidatorForm';

import tabStart from './helpComponents/tab-start.vue';
import TabAnotherInfos from './helpComponents/tab-another-infos.vue';
definePageMeta({
    layout: "custom",
});
const { t } = useI18n();
const form = ref(new UserModel())

let randomImageBg = ref('');
const citiesAdded = ref([]);


onMounted(() => {
    const datepickerEl = document.getElementById('borndate');
    new Datepicker(datepickerEl, {
        format: 'dd/mm/yyyy',
    });

    randomImageBg.value = getRandomImage();
});

const stepperControlValues = ref([
    new StepperObject(t('initial_info'), true),
    new StepperObject(t('another_infos'), false),
]);

const stepperControl = computed(() => stepperControlValues.value)
const onChangeStep = (step) => {
    OnChangeStep(step, stepperControlValues);
}

const isStepInitialSelected = computed(() => stepperControlValues.value[0].active);
const isStepFinishSelected = computed(() => stepperControlValues.value[1].active);

const fieldsToValidate = ref(new FieldsToValidate(form));
const fieldValidatorForm = new FieldValidatorForm(fieldsToValidate, form, stepperControlValues);
const getRandomImage = () => {
    const imageDirectory = '/images/';
    const imageGenerator = new RandomImage(GetImagesOfLogin());
    const randomImageName = imageGenerator.randomImage();

    return imageDirectory + randomImageName;
}
</script>


<template>
    <section :style="{ 'backgroundImage': `url('${randomImageBg}')` }"
        class="bg-no-repeat bg-cover bg-gray-900 bg-opacity-60 sm:overflow-y-hidden min-h-screen sm:h-screen">
        <perfect-scrollbar class="form-fields">
            <div class="flex flex-col items-start justify-center mx-auto pt:mt-0 h-full">
                <div class="w-full h-full bg-white shadow sm:max-w-screen-md sm:py-20 pt-10 px-10 dark:bg-gray-800">
                    <div class="w-full min-h-screen sm:h-full">
                        <PageHeader :title="$t('create_account')"></PageHeader>
                        <div class="py-5">
                            <Stepper :control="stepperControl" v-on:clickTab="onChangeStep"></Stepper>
                        </div>

                        <div v-show="isStepInitialSelected" class="h-full">
                            <tabStart :form="form" :formFieldErrorValidator="formFieldErrorValidator"
                                :fieldValidatorForm="fieldValidatorForm" :stepperControlValues="stepperControlValues">
                            </tabStart>
                        </div>

                        <div v-show="isStepFinishSelected" class="h-full">
                            <TabAnotherInfos :citiesAdded="citiesAdded" :form="form"
                                :fieldValidatorForm="fieldValidatorForm"></TabAnotherInfos>
                        </div>
                    </div>
                </div>
            </div>
        </perfect-scrollbar>
    </section>
</template>



<style scoped>
.po-password-strength-bar {
    margin-top: 5px;
}

.form-fields {
    max-height: 100vh;
}
</style>