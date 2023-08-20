<script setup>
import { TheCard } from 'flowbite-vue';
import LoginUsecase from '../usecases/LoginUsecase';
LoginUsecase.SubmitFoo();
</script>

<template>
    <the-card href="#" variant="horizontal" img-src="/images/dog-welcome.jpeg" img-alt="Desk">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Diga olá para o pelos caminhos
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">
            Início do projeto :)
        </p>
    </the-card>
</template>
