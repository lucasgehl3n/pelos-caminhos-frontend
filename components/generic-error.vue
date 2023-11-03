<script setup>
import Modal from "./modal.vue";
import { defineEmits } from 'vue'
const emit = defineEmits(['closeModal'])

const props = defineProps({
  showModal: false,
});

const closeModal = () => {
  emit("closeModal");
};
</script>

<template>
  <Modal :show-modal="showModal" :size="'lg'" v-on:closeModal="closeModal">
    <template v-slot:body>
      <div
        class="w-full p-20 flex items-center justify-center"
      >
        <img src="/images/bug.svg" alt="check" class="max-h-34 w-full"/>
      </div>
      <p class="mb-4 text-md font-semibold text-gray-900 dark:text-white">
        {{ $t('error_on_save') }}
      </p>
      <p class="mb-4 text-xs">
        {{ $t('our_team_was_notificated') }}
      </p>
    </template>
  </Modal>
</template>
