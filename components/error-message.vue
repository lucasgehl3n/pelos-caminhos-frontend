<script setup>
const { t } = useI18n();
const props = defineProps({
    error: false,
    titleMessage: '',
    bodyMessage: ''
});   

const titleMessageExibition = computed(() => {
    return props.titleMessage || t('field_required');
});

const bodyMessageExibition = computed(() => {
    return props.bodyMessage || t('value_must_be_entered');
});
</script>
<template>
    <p class="mt-2 text-xs text-red-600 dark:text-red-400" v-if="props.error">
        <span class="font-medium">{{ titleMessageExibition }}</span>
        {{ bodyMessageExibition }}
    </p>
</template>