<script setup>
const props = defineProps({
    title: '',
    number: '',
    clicked: Boolean,
    onClick: Function,
});   
</script>

<template>
    <span
        class="text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 w-full sm:w-auto rounded"
        :class="{'bg-blue-100': props.clicked, 'bg-gray-100': !props.clicked}"
        v-on:click="onClick()">
        {{ props.title }}
        <span
            class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
            v-if="props.number">
            {{ props.number }}
        </span>
    </span>
</template>