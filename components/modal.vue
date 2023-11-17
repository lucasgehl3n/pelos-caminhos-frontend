<script setup>
import { Modal } from 'flowbite-vue'
const emit = defineEmits(['closeModal'])

const props = defineProps({
    showModal: false,
    title: '',
    size: 'md'
});

const closeModal = () => {
    emit('closeModal');
};
</script>

<template>
    <Modal :size="size" v-show="props.showModal" @close="closeModal">
        <template #header v-if="props.title">
            <div class="flex items-center text-lg">
                {{ props.title }}
            </div>
        </template>
        <template #body>
            <div class="text-center h-full w-full">
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
