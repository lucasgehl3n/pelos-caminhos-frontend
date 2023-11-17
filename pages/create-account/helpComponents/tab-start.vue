<script setup>
import { Input, Button } from "flowbite-vue";
import ErrorMessage from "../../../components/error-message.vue";
import ImageUpload from "../../../components/image-upload.vue";
import passwordMeter from "vue-simple-password-meter";
const router = useRouter();

const props = defineProps([
  "form",
  "formFieldErrorValidator",
  "fieldValidatorForm",
  "stepperControlValues",
]);

const switchTabContact = () => {
  props.stepperControlValues[0].active = false;
  props.stepperControlValues[1].active = true;
};

const onChangeImageUploaded = (value) => {
  props.form.profileImage = value;
};

const redirectToLogin = () => {
  router.push({ path: "/login" });
};
</script>

<template>
  <div class="flex">
    <div class="w-10/12">
      <Input
        :placeholder="$t('placeholder_name')"
        v-model="props.form.name"
        :label="$t('name')"
        name="name"
        v-on:change="props.fieldValidatorForm.removeFieldError"
      />
      <ErrorMessage v-bind="props.formFieldErrorValidator.name" />
    </div>
    <div class="pl-10 max-w-2/12 flex mt-5 sm:mt-2">
      <ImageUpload
        v-on:change-image="onChangeImageUploaded"
        :show-gallery="true"
        :rounded="true"
        :showDeleteButton="false"
        :logo="props.form.profileImage"
        :id="'profile-image'"
      >
        <label for="profile-image">
          <img
            src="~/assets/svg/female_avatar.svg"
            class="w-full max-h-20 h-full items-center justify-center"
          />
        </label>
      </ImageUpload>
      <div
        class="ml-2 w-1"
        v-if="props.form.profileImage"
        v-on:click="onChangeImageUploaded(null)"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </div>
    </div>
  </div>

  <div>
    <Input
      :placeholder="$t('placeholder_mail')"
      label="Email"
      name="email"
      v-model="props.form.email"
      v-on:change="props.fieldValidatorForm.removeFieldError"
    />

    <ErrorMessage v-bind="props.formFieldErrorValidator.email" />
  </div>

  <div class="sm:flex w-full pt-5">
    <div class="w-full">
      <Input
        v-model="props.form.password"
        type="password"
        :label="$t('password')"
        name="password"
        v-on:change="props.fieldValidatorForm.removeFieldError"
      />
      <ErrorMessage v-bind="props.formFieldErrorValidator.password" />
      <passwordMeter :password="props.form.password" class="mb-5" />
    </div>

    <div class="w-full sm:pl-5">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{
        $t("date_of_birth")
      }}</label>
      <div class="relative w-full">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
            />
          </svg>
        </div>
        <input
          id="borndate"
          type="text"
          v-model="props.form.birthdayDate"
          name="birthdayDate"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Selecionar data"
          v-on:blur="props.fieldValidatorForm.removeFieldError"
          v-on:changeDate="(t) => (props.form.birthdayDate = t.target.value)"
        />
      </div>
      <ErrorMessage v-bind="props.formFieldErrorValidator.birthdayDate" />
    </div>
  </div>

  <div class="pt-5 sm:pt-0">
    <div class="sm:flex">
      <div class="w-full">
        <Input
          placeholder="CPF"
          :label="'CPF'"
          name="document"
          v-model="props.form.document"
          v-maska
          :data-maska="$t('mask_personal_document')"
          v-on:change="props.fieldValidatorForm.removeFieldError"
          v-on:blur="validateDocument"
        />
        <ErrorMessage v-bind="props.formFieldErrorValidator.document" />
        <p
          class="text-xs text-gray-500"
          v-if="!props.formFieldErrorValidator.document.error"
        >
          {{ $t("message_personal_document") }}
        </p>
      </div>

      <div class="w-full pt-5 sm:pt-0 sm:pl-5">
        <Input
          :placeholder="$t('placeholder_phone')"
          :label="$t('phone')"
          name="phone"
          v-model="props.form.phone"
          v-maska
          :data-maska="$t('mask_phone')"
          v-on:change="props.fieldValidatorForm.removeFieldError"
        />
        <ErrorMessage v-bind="props.formFieldErrorValidator.phone" />
      </div>
    </div>
  </div>

  <div class="pt-5">
    <Input
      :placeholder="$t('placeholder_adress')"
      :label="$t('adress')"
      name="street"
      v-model="props.form.address.street"
      v-on:change="props.fieldValidatorForm.removeFieldError"
    />

    <ErrorMessage v-bind="props.formFieldErrorValidator.street" />
  </div>

  <div class="sm:flex py-5">
    <div class="md:w-2/4 sm:mr-4 pb-5 sm:py-0">
      <Input
        :placeholder="$t('placeholder_number')"
        name="number"
        v-model="props.form.address.number"
        v-on:change="props.fieldValidatorForm.removeFieldError"
      />

      <ErrorMessage v-bind="props.formFieldErrorValidator.number" />
    </div>
    <div class="md:w-2/4">
      <Input
        :placeholder="$t('placeholder_complement')"
        name="complement"
        v-model="props.form.address.complement"
      />
    </div>
  </div>

  <div class="py-5 flex">
    <div class="w-full text-left">
      <p class="text-blue-600 cursor-pointer" v-on:click="redirectToLogin">
        {{ $t("already_have_an_account") }}
      </p>
    </div>
    <div class="w-full text-right">
      <Button color="default" v-on:click="switchTabContact">
        <svg
          class="w-4 h-4 text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Button>
    </div>
  </div>
</template>

<style>
.w-20 .h-20 .rounded {
  width: auto;
}
</style>
