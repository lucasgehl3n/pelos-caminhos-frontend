<script setup>
import { Input, Textarea, Button } from 'flowbite-vue'
import Stepper from '../../components/stepper.vue';
import PageHeader from '../../components/page-header.vue';
import ErrorMessage from '../../components/error-message.vue';
import ImageUpload from '../../components/image-upload.vue';
import StepperObject from '../../structures/StepperObject';
import OnChangeStep from '../../helpers/OnChangeStep';
import DefaultFieldValidatorObject from '../../helpers/objects/DefaultFieldValidatorObject';
import { reactive } from 'vue'

const { t } = useI18n();
const form = reactive({
    name: '',
    document: '',
    description: '',
    email: '',
    phone: '',
    street: '',
    number: '',
    complement: '',
    site: '',
    logo: ''
})

const formFieldErrorValidator = reactive({
    name: new DefaultFieldValidatorObject(),
    description: new DefaultFieldValidatorObject(),
    email: new DefaultFieldValidatorObject(),
    number: new DefaultFieldValidatorObject(),
    street: new DefaultFieldValidatorObject(),
})

const stepperControlValues = ref([
    new StepperObject(t('initial_info'), true),
    new StepperObject(t('contacts'), false),
]);

const stepperControl = computed(() => stepperControlValues.value)
const onChangeStep = (step) => {
    OnChangeStep(step, stepperControlValues);
}

const onChangeImageUploaded = (value) => {
    form.logo = value;
}

const isStepInitialSelected = computed(() => stepperControlValues.value[0].active);
const isStepContactSelected = computed(() => stepperControlValues.value[1].active);

const fieldsToValidate = computed(() => ({
    name: {
        field: form.name,
        fieldError: formFieldErrorValidator.name,
        tab: 0,
    },
    description: {
        field: form.description,
        fieldError: formFieldErrorValidator.description,
        tab: 0,
    },
    email: {
        field: form.email,
        fieldError: formFieldErrorValidator.email,
        tab: 0,
    },
    street: {
        field: form.street,
        fieldError: formFieldErrorValidator.street,
        tab: 1,
    },
    number: {
        field: form.number,
        fieldError: formFieldErrorValidator.number,
        tab: 1,
    }
}));

const removeFieldError = (e) => {
    if (fieldsToValidate.value.hasOwnProperty(e.target.name)) {
        fieldsToValidate.value[e.target.name].fieldError.error = false;
    }
};

const validateRequiredFields = () => {
    let hasErrorOnInitTab = false;
    let hasErrorOnContactTab = false;

    Object.keys(fieldsToValidate.value).forEach((fieldKey) => {
        const { tab, field, fieldError } = fieldsToValidate.value[fieldKey];
        if (!field) {
            if (tab === 0) {
                hasErrorOnInitTab = true;
            }
            else {
                hasErrorOnContactTab = true;
            }
            fieldError.error = true;
        }
        else {
            fieldError.error = false;
        }
    });

    if (hasErrorOnInitTab) {
        switchTabInit();
        return false;
    }

    if (hasErrorOnContactTab) {
        switchTabContact();
        return false;
    }

    return true;
}

const switchTabInit = () => {
    stepperControlValues.value[1].active = false;
    stepperControlValues.value[0].active = true;
}

const switchTabContact = () => {
    stepperControlValues.value[0].active = false;
    stepperControlValues.value[1].active = true;
}

const
    saveForm = () => {
        console.log(form)

        if (validateRequiredFields()) {
            console.log('Válido');
        }
    };
</script>

<template>
    <PageHeader :title="$t('ngo_registration')" :subtitle="$t('enter_details_to_get_started')"></PageHeader>
    <div class="py-5">
        <Stepper :control="stepperControl" v-on:clickTab="onChangeStep"></Stepper>
    </div>

    <div v-if="isStepInitialSelected">
        <div>
            <Input :placeholder="$t('placeholder_name')" v-model="form.name" :label="$t('name')" name="name"
                v-on:change="removeFieldError" />
            <ErrorMessage v-bind="formFieldErrorValidator.name" />
        </div>
        <div class="py-5">
            <Input :placeholder="$t('placeholder_document')" :label="$t('document')" name="document" v-model="document"
                v-maska :data-maska="$t('mask_document')" />
        </div>
        <div>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {{ $t('description') }}
            </label>
            <textarea name="description" rows="4" v-model="form.description" v-on:change="removeFieldError"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                :placeholder="$t('placeholder_description_ngos')" />

            <ErrorMessage v-bind="formFieldErrorValidator.description" />
        </div>
        <div class="py-5">
            <Input :placeholder="$t('placeholder_mail')" label="Email" name="email" v-model="form.email"
                v-on:change="removeFieldError" />

            <ErrorMessage v-bind="formFieldErrorValidator.email" />
        </div>
        <div>
            <Input label="Site" name="site" v-model="form.site" />
        </div>

        <div class="py-5">
            <Button color="default" v-on:click="switchTabContact">
                <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </Button>
        </div>
    </div>
    <div v-else-if="isStepContactSelected">
        <div class="py-5">
            <Input :placeholder="$t('placeholder_phone')" :label="$t('phone')" name="phone" v-model="form.phone" v-maska
                :data-maska="$t('mask_phone')" />
        </div>

        <div class="py-5">
            <Input :placeholder="$t('placeholder_adress')" :label="$t('adress')" name="street" v-model="form.street"
                v-on:change="removeFieldError" />

            <ErrorMessage v-bind="formFieldErrorValidator.street" />
        </div>

        <div class="flex">
            <div class="md:w-2/4 md:mr-4 sm:w-full">
                <Input :placeholder="$t('placeholder_number')" name="number" v-model="form.number"
                    v-on:change="removeFieldError" />

                <ErrorMessage v-bind="formFieldErrorValidator.number" />
            </div>
            <div class="md:w-2/4 sm:w-full">
                <Input :placeholder="$t('placeholder_complement')" name="complement" v-model="form.complement" />
            </div>
        </div>

        <div class="py-5">
            <ImageUpload  v-on:change-image="onChangeImageUploaded" :logo="form.logo"></ImageUpload>
        </div>
        <div class="py-5">
            <Button color="light" v-on:click="switchTabInit">Voltar</Button>&nbsp;
            <Button color="default" v-on:click="saveForm">Cadastrar</Button>
        </div>
    </div>
</template>