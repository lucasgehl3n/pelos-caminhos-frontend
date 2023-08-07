<script setup>
import { Input, Textarea } from 'flowbite-vue'
import Stepper from '../../components/stepper.vue';
import PageHeader from '../../components/page-header.vue';
import StepperObject from '../../structures/StepperObject';
import OnChangeStep from '../../helpers/OnChangeStep';
const name = ref('')
const document = ref('')
const description = ref('')
const email = ref('')
const site = ref('')
const { t } = useI18n(); 
const stepperControlValues = ref([
    new StepperObject(t('initial_info'), true),
    new StepperObject(t('contacts'), false),
]);

const stepperControl = computed(() => stepperControlValues.value)
const onChangeStep = (step) => {
    OnChangeStep(step, stepperControlValues);
}

const isStepInitialSelected = computed(() => stepperControlValues.value[0].active);
const isStepContactSelected = computed(() => stepperControlValues.value[1].active);

</script>

<template>
    <PageHeader :title="$t('ngo_registration')" :subtitle="$t('enter_details_to_get_started')"></PageHeader>
    <div class="py-5">
        <Stepper :control="stepperControl" v-on:clickTab="onChangeStep"></Stepper>
    </div>

    <div v-if="isStepInitialSelected">
        <div>
            <Input :placeholder="$t('placeholder_mail')" :v-model="name" :label="$t('name')" name="name" />
        </div>
        <div class="py-5">
            <Input :placeholder="$t('placeholder_document')" :label="$t('document')" name="document" :v-model="document" />
        </div>
        <div>
            <Textarea rows="4" :placeholder="$t('placeholder_description_ngos')" v-model="description" :label="$t('description')" />
        </div>
        <div class="py-5">
            <Input :placeholder="$t('placeholder_mail')" label="Email" name="email" :v-model="email" />
        </div>
        <div>
            <Input :placeholder="$t('placeholder_document')" label="Site" name="site" :v-model="site" />
        </div>
    </div>
    <div v-else-if="isStepContactSelected">
        To do
    </div>
</template>