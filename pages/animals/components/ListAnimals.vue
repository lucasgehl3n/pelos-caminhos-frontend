<script setup>
import path from "path";
import HorizontalList from "../../../components/horizontal-list.vue";
import { Roles } from "../../../enums/Roles";
import { TheCard } from "flowbite-vue";

const router = useRouter();

const props = defineProps({
  identifierReset: Boolean,
  page: Number,
  fnReload: Function,
  list: Array,
});

let target = ref(".scrollable");

const isAdministrator = (role) => {
  return role == Roles.Administrator;
};

const redirectToDetail = (entity) => {
  router.push({ path: `/animals/${entity.id}` });
};
</script>

<template>
  <HorizontalList
    :list="[...list]"
    :infiniteLoading="{
      target: target,
      identifier: identifierReset,
      infiniteHandler: fnReload,
    }"
  >
    <template v-slot="{ entity }">
      <div class="pt-5 w-full h-full" v-on:click="redirectToDetail(entity)">
        <div
          class="bg-white w-full border rounded-2xl border-gray-100 shadow dark:bg-gray-800 dark:border-gray-700 h-full"
        >
          <a href="#" class="w-full h-full"
            ><img
              class="rounded-t-lg w-full h-36 sm:h-auto"
              v-if="entity.animalImages.length"
              :src="entity.animalImages[0].image"
              alt=""
              style="max-height: 10rem"
            />
            <img
              v-else
              class="rounded-t-lg w-full p-5"
              src="/images/dog_illustration.png"
              alt=""
              style="max-height: 10rem"
            />

            <div class="p-6">
              <h5
                class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white w-full"
              >
                <font-awesome-icon
                  :icon="['fas', 'mars']"
                  class="text-blue-600"
                  v-if="entity.gender === 1"
                />
                <font-awesome-icon
                  :icon="['fas', 'venus']"
                  class="text-fuchsia-400"
                  v-if="entity.gender === 2"
                />
                {{ entity.name }}
              </h5>
              <div class="w-full">
                <p
                  class="text-sm text-gray-700 dark:text-gray-400 w-full"
                  v-if="entity.age"
                >
                  {{ entity.age }} {{ entity.age > 1 ? $t("years") : $t("year") }}
                </p>
                <p
                  class="font-normal text-gray-700 dark:text-gray-400 w-full"
                  v-if="entity.weight"
                >
                {{ entity.weight }} {{ entity.weight > 1 ? $t("KGs") : $t("KG") }}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </template>
  </HorizontalList>
</template>
