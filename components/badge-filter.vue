<script setup>
const props = defineProps({
    title: '',
    number: '',
    clicked: Boolean,
    onClick: Function,
    class: '',
});   
</script>

<template>
    <span class="inline-flex items-center text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 w-full sm:w-auto rounded badge"
        :class="{ 'bg-blue-100': props.clicked, 'bg-gray-100': !props.clicked }" v-bind:class="props.class"
        v-on:click="onClick()">
        {{ props.title }}
        <div class="ml-2 w-1" v-if="props.clicked">
            <font-awesome-icon :icon="['fas', 'times']" />
        </div>
        <span
            class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
            v-if="props.number">
            {{ props.number }}
        </span>
    </span>
</template>

<style>
.badge:hover{
    cursor: pointer;
}
</style>