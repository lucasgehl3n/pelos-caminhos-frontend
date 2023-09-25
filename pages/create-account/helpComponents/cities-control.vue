<script setup>
import citiesBadge from './cities-badges.vue';
import citiesListComponent from './cities-list.vue';
import citiesSearch from './cities-search.vue';
const props = defineProps(['citiesAdded', 'cityControlForm'])

let citiesList = ref([]);

const updateCitiesList = (newCitiesList) => {
    citiesList.value = newCitiesList;
}; ''
</script>

<template>
    <div>
        <label class="block mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {{ $t('interest_cities') }}
        </label>


        <citiesSearch :citiesList="citiesList" @updateCitiesList="updateCitiesList"></citiesSearch>

        <div class="mt-5">
            <citiesBadge :citiesAdded="props.citiesAdded" :cityControlForm="props.cityControlForm">
            </citiesBadge>
        </div>
        
        <div class="mt-5 text-left block" v-if="citiesList.length === 0 && citiesAdded.length === 0">
            <img src="~/assets/svg/city.svg" class="w-full max-h-40 mt-5 h-full">
            <p class="text-xs text-center pt-2">Digite o nome de uma cidade para exibir resultados.</p>
        </div>

        <citiesListComponent :citiesAdded="props.citiesAdded" v-show="citiesList.length > 0" :citiesList="citiesList"
            :cityControlForm="props.cityControlForm" @updateCitiesList="updateCitiesList">
        </citiesListComponent>
    </div>
</template>