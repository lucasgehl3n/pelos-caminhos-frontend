<script setup>
import { Input, Button } from 'flowbite-vue'
import { ref } from 'vue'
import LoginGateway from '../gateways/LoginGateway';
import DefaultFieldValidatorObject from '../helpers/objects/DefaultFieldValidatorObject';
import userStore from '@/stores/user.store'

const storeUserObject = userStore();
const email = ref('')
const password = ref('')
const passwordFieldError = ref(new DefaultFieldValidatorObject());
const emailFieldError = ref(new DefaultFieldValidatorObject());

function ResetValuesFieldError() {
    passwordFieldError.value = new DefaultFieldValidatorObject();
    emailFieldError.value = new DefaultFieldValidatorObject();
}

function ValidateLoginFields() {
    ResetValuesFieldError();

    if (!email.value) {
        emailFieldError.value.error = true;
        emailFieldError.value.bodyMessage = "Campo obrigatório.";
        emailFieldError.value.titleMessage = "Informe um e-mail!";
    }

    if (!password.value) {
        passwordFieldError.value.error = true;
        passwordFieldError.value.bodyMessage = "Campo obrigatório.";
        passwordFieldError.value.titleMessage = "Informe uma senha!";
    }

    return !passwordFieldError.value.error && !emailFieldError.value.error;
}

function SetInvalidPasswordError() {
    passwordFieldError.value.error = true;
    passwordFieldError.value.titleMessage = "Senha inválida!";
    passwordFieldError.value.bodyMessage = "Revise a senha informada e tente novamente";
}

async function OnSubmitLogin() {
    if (ValidateLoginFields()) {
        const response = await LoginGateway.SubmitLogin(email.value, password.value);
        if (response.request.status == 200) {
            window.location.href = "/";
        } else if (response.request.status == 401) {
            SetInvalidPasswordError();
        }
    }
}

function goToRegisterAccount() {
    window.location.href = "/create-account";
}
</script>

<template>
    <section
        class="bg-[url('/images/background-animals.jpg')] bg-no-repeat bg-cover bg-center bg-gray-700 bg-blend-multiply bg-opacity-60">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen pt:mt-0">
            <div class="w-full bg-white rounded-md shadow md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800">
                <div class="p-6 space-y-4 md:space-y-6 lg:space-y-8 sm:p-8">
                    <div class="w-full items-center justify-center inline-flex flex-col">
                        <img src="~/assets/svg/logo-horizontal.svg" class="h-20 w-auto">
                    </div>
                    <div class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <Input v-model="email" :placeholder="$t('placeholder_mail')" label="E-mail" name="email" />
                            <p id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"
                                v-if="emailFieldError.error">
                                <span class="font-medium">{{ emailFieldError.titleMessage }}</span>
                                {{ emailFieldError.bodyMessage }}
                            </p>
                        </div>
                        <div>
                            <Input v-model="password" type="password" :label="$t('password')" name="password" />
                            <p id="filled_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"
                                v-if="passwordFieldError.error">
                                <span class="font-medium">{{ passwordFieldError.titleMessage }}</span>
                                {{ passwordFieldError.bodyMessage }}
                            </p>
                        </div>
                        <Button size="lg" class="w-full" v-on:click="OnSubmitLogin">Entrar</Button>
                        <p class="text-sm font-light" v-on:click="goToRegisterAccount">
                            <a href="#" class="font-medium hover:underline dark:text-primary-500">{{ $t('sign_up') }}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
