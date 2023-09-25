<script setup>
import { Dropdown, ListGroup, ListGroupItem } from 'flowbite-vue'
import { Input } from 'flowbite-vue'
import { ref, watch } from 'vue';
import debounce from 'lodash.debounce';
const emit = defineEmits(['changeSearch', 'changeSorting'])

let searchField = ref('');

const search = debounce(() => {
    emit('changeSearch', searchField.value)
}, 500);

watch(searchField, () => {
    search();
});

const sort = (value) => {
    emit('changeSorting', value)
}
</script>
<template>
    <div class="flex sm:flex w-full">
        <Input size="lg" placeholder="Pesquisar" class="w-full" v-model="searchField">
        <template #prefix>
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
        </template>
        <template #suffix>
            <dropdown :text="'Ordenar por'" class="block sm:pl-5 sm:w-auto pl-2 pr-2">
                <list-group>
                    <list-group-item @click="sort('name-az')">
                        <template #prefix>
                            <font-awesome-icon :icon="['fas', 'id-card']"  class="w-4 h-4 fill-current"/>
                        </template>
                        {{ $t('name_ascending') }}
                    </list-group-item>
                    <list-group-item @click="sort('name-za')">
                        <template #prefix>
                            <font-awesome-icon :icon="['fas', 'id-card']"  class="w-4 h-4 fill-current"/>
                        </template>
                        {{ $t('name_descending') }}
                    </list-group-item>
                    <list-group-item @click="sort('latest')">
                        <template #prefix>
                            <font-awesome-icon :icon="['fas', 'calendar-days']"  class="w-4 h-4 fill-current"/>
                        </template>
                        {{ $t('date_descending') }}
                    </list-group-item>
                    <list-group-item @click="sort('old')">
                        <template #prefix>
                            <font-awesome-icon :icon="['fas', 'calendar-days']"  class="w-4 h-4 fill-current"/>
                        </template>
                        {{ $t('date_ascending') }}
                    </list-group-item>
                </list-group>
            </dropdown>
        </template>
        </Input>
    </div>
</template>