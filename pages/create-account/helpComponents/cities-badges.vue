<script setup>
const props = defineProps(['citiesAdded', 'cityControlForm'])
</script>

<template>
    <perfect-scrollbar class="badges-cities pb-5 overflow-x-hidden" v-show="props.citiesAdded && props.citiesAdded.length">
        <div class="flex flex-row whitespace-nowrap h-5">
            <template v-for="(city, i) in props.citiesAdded">
                <BadgeFilter :title="city.name" :clicked="true" v-on:click="props.cityControlForm.removeCity(city)"
                    class="sm:w-auto w-auto" :class="{ 'mr-2': i > 0 }">
                </BadgeFilter>
            </template>
        </div>
    </perfect-scrollbar>
</template>

<style scoped>
.badges-cities {
    max-width: 100vw;
    overflow-x: auto;
    overflow-y: hidden;
}
</style>