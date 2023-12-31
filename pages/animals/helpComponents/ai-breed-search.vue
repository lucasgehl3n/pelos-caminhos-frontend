<script setup>
import { Button, Input } from "flowbite-vue";
import Modal from "../../../components/modal";
import FilesFormat from "../../../helpers/format/FilesFormat";

const props = defineProps({
  showModal: false,
  filter: Object,
});

const emit = defineEmits(["closeModal", "searchImage", "removeSearchImage"]);

const selectedImage = ref(null);

const closeModal = () => {
  emit("closeModal");
};

const updateCurrentFile = async (event) => {
  const file = event.target.files[0];
  if (file) {
    FilesFormat.BinaryToBase64(file).then((result) => {
      selectedImage.value = result;
    });

    emit("searchImage", file);
    closeModal();
  }

  event.target.files = null;
  const input = document.getElementById("dropzone-file-ai-breed");
  input.value = null;
};

const removeCurrentImage = () => {
  selectedImage.value = null;
  emit("removeSearchImage");
};

watch(
  () => props.filter.image,
  (newValue) => {
    if (!newValue) {
      selectedImage.value = null;
    }
  }
);
</script>

<template>
  <Modal
    size="2xl"
    :title="'Procurar com uma imagem'"
    :show-modal="showModal"
  >
    <template v-slot:body>
      <div class="flex text-left h-full w-full">
        <div class="w-full h-full">
          <p class="text-gray-500 text-sm pb-5">
            {{ $t("you_can_search_image_message") }}
          </p>
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file-ai-breed"
              class="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <b>Selecionar um arquivo</b>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ $t("jpeg_and_png_message") }}
                </p>
              </div>
              <input
                id="dropzone-file-ai-breed"
                type="file"
                class="hidden"
                v-on:change="updateCurrentFile"
              />
            </label>
          </div>
          <div
            class="flex flex-col items-center justify-center w-full pt-5"
            v-if="selectedImage"
          >
            <img :src="selectedImage" class="max-h-60" />
            <Button color="red" v-on:click="removeCurrentImage" class="mt-2 w-full">
              <font-awesome-icon :icon="['fas', 'trash']" class="text-xs" />
              {{ $t("remove_image_search") }}
            </Button>
          </div>
        </div>
      </div>
    </template>

    <template v-slot:footer>
      <div class="text-right">
        <Button color="light" v-on:click="closeModal">{{ $t("cancel") }}</Button>
      </div>
    </template>
  </Modal>
</template>
