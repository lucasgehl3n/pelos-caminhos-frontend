<script setup>
import { defineEmits } from 'vue'
const emit = defineEmits(['clickTab'])

const props = defineProps({
    control: Array,
});

const emitClickTab = (step) => {
    emit('clickTab', step)
};
</script>

<template>
    <ol
        class="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">

        <li v-for="(step, i) in control" v-on:click="emitClickTab(step)" class="flex items-center"
            :class="{ 'text-blue-600': step.active === true, 'dark:text-blue-500': step.active === true }">
            <span
                class="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                {{ i + 1 }}
            </span>
            {{ step.label }}
            <svg class="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 12 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m7 9 4-4-4-4M1 9l4-4-4-4" />
            </svg>
        </li>
    </ol>
</template>
