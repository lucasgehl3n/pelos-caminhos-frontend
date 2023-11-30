<script setup>
import institution from "../institution/index.vue";
import animals from "../animals/index.vue";
import { Tabs, Tab } from "flowbite-vue";
import userStore from "../../stores/user.store.ts";
const store = userStore();

const currentTab = ref("institution");
</script>

<template>
  <div class="w-full md:pl-10 sm:py-10">
    <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
      <h2
        class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
        v-if="store.getFirstName"
      >
        Olá, {{ store.getFirstName }}
      </h2>
      <p class="mb-4">
        Utilize este espaço para criar uma instituição, tornar-se voluntário de uma ONG
        existente ou adotar o seu pet!
      </p>
    </div>
    <tabs variant="underline" v-model="currentTab" class="p-5">
      <tab name="institution" title="Instituições" :disabled="false">
        <institution :showHeader="false"></institution>
      </tab>
      <tab name="animals" title="Animais" :disabled="false">
        <animals :showHeader="false"></animals>
      </tab>
    </tabs>
  </div>
</template>
