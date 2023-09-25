<script setup>
import { defineEmits } from 'vue';
const props = defineProps(['citiesAdded', 'citiesList', 'cityControlForm'])
const emit = defineEmits(['updateCitiesList'])
const clearCitiesList = () => {
    emit('updateCitiesList', [])
}
</script>

<template>
    <div class="my-2 block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        v-show="props.citiesList && props.citiesList.length">
        <div class="flex">

            <div class="py-2 w-11/12">
                {{ $t('found_cities') }}
            </div>
            <div class="ml-2 w-1/12 flex-end" v-on:click="clearCitiesList">
                <font-awesome-icon :icon="['fas', 'times']" />
            </div>
        </div>
        <perfect-scrollbar class="cities">
            <template v-for="city in props.citiesList">
                <div href="#"
                    class="inline-flex justify-center items-center p-5 my-1 text-base font-medium text-gray-800 bg-gray-50 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white w-full">
                    <a href="#" class="w-full" v-on:click="cityControlForm.addCity(city)">{{ city.name }} - {{
                        city.state.short_name }}</a>
                </div>
            </template>
        </perfect-scrollbar>
    </div>
</template>

<style scoped>
.cities {
    max-height: 250px;

    @media (max-width: 768px) {
        max-height: 100px;
    }
}
</style>