<script setup>

const props = defineProps({
    title: '',
    subtitle: '',
});

</script>

<template>
    <h1 class="font-semibold leading-tight tracking-tight text-gray-900 text-4xl dark:text-white">
        {{ title }}
    </h1>
    <h4 class="leading-tight tracking-tight text-gray-500 text-2xl dark:text-white">
        {{ subtitle }}
    </h4>
</template>