<script setup>
import { Input, Button } from 'flowbite-vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>
<template>
    <div class="w-full h-full flex flex-col items-center justify-center md:px-6 sm:px-2 md:py-8 sm:py-8">
        <div class="h-full w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div class="h-full p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                    class="text-xl font-sans font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Pelos Caminhos
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                    <div>
                        <Input v-model="email" :placeholder="$t('placeholder_mail')" label="E-mail" />
                    </div>
                    <div>
                        <Input v-model="password" type="password" :label="$t('password')" />
                    </div>
                    <Button size="lg" class="w-full">Entrar</Button>
                    <p class="text-sm font-light">
                        <a href="#" class="font-medium hover:underline dark:text-primary-500">{{ $t('sign_up') }}</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>
