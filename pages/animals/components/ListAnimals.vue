<script setup>
import HorizontalList from "../../../components/horizontal-list.vue";
import { Roles } from "../../../enums/Roles";

const router = useRouter();

const props = defineProps({
  identifierReset: Boolean,
  page: Number,
  fnReload: Function,
  list: Array,
});

let target = ref(".scrollable");

const isAdministrator = (entity) => {
  return entity.role == Roles.Administrator;
}

const isVolunteer = (entity) => {
  return entity.role == Roles.Volunteer;
}

const getRoutePath = (role) => {
  if (role === Roles.Administrator) {
    return '/animals/';
  }
  return '/public/animal/'
}

const redirectToDetail = (entity) => {
  router.push({ path: `${getRoutePath(entity.role)}${entity.id}` })
};
</script>

<template>
  <HorizontalList :list="[...list]" :infiniteLoading="{
    target: target,
    identifier: identifierReset,
    infiniteHandler: fnReload,
  }">
    <template v-slot="{ entity }">
      <div class="pt-5 w-full h-full" v-on:click="redirectToDetail(entity)">
        <div
          class="bg-white w-full border rounded-2xl border-gray-100 shadow dark:bg-gray-800 dark:border-gray-700 h-full">
          <a href="#" class="w-full h-full"><img class="rounded-t-lg w-full h-36 sm:h-auto"
              v-if="entity.animalImages.length" :src="entity.animalImages[0].image" alt="" style="max-height: 10rem" />
            <img v-else class="rounded-t-lg w-full p-5" src="/images/dog_illustration.png" alt=""
              style="max-height: 10rem" />
            <div class="p-6">
              <div class="w-full sm:flex">
                <template v-if="isAdministrator(entity)">
                  <img src="~/assets/svg/admin.svg" :alt="$t('admin')" class="w-5 h-5" />
                </template>

                <template v-else-if="isVolunteer(entity)">
                  <img src="~/assets/svg/hand.svg" :alt="$t('volunteer')" class="w-6 h-5" />
                </template>

                <h5 class="sm:ml-3 mb-2 font-bold tracking-tight text-gray-900 dark:text-white w-full">
                  <font-awesome-icon :icon="['fas', 'mars']" class="text-blue-600" v-if="entity.gender === 1" />
                  <font-awesome-icon :icon="['fas', 'venus']" class="text-fuchsia-400" v-if="entity.gender === 2" />
                  {{ entity.name }}
                </h5>
              </div>

              <p class="text-sm text-gray-700 dark:text-gray-400 w-full" v-if="entity.institution">

              <div class="flex">
                <p> {{ entity.institution.name }}</p>
              </div>

              </p>
              <div class="w-full">
                <p class="text-sm text-gray-700 dark:text-gray-400 w-full" v-if="entity.age">
                  {{ entity.age }} {{ entity.age > 1 ? $t("years") : $t("year") }}
                </p>
                <p class="font-normal text-gray-700 dark:text-gray-400 w-full" v-if="entity.weight">
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
