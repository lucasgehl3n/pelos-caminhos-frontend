<script setup>
import { Modal } from 'flowbite-vue'

const props = defineProps({
    showModal: false,
    title: '',
});
</script>

<template>
    <Modal :size="size" v-if="props.showModal">
        <template #header v-if="props.title">
            <div class="flex items-center text-lg">
                {{ props.title }}
            </div>
        </template>
        <template #body>
            <div class="text-center">
                <slot name="body"></slot>
            </div>
        </template>
        <template #footer v-if="$slots.footer">
            <div class="flex justify-between">
                <slot name="footer"></slot>
            </div>
        </template>
    </Modal>
</template>
