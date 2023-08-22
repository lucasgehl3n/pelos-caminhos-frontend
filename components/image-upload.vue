<script setup>
import { Input, Button } from 'flowbite-vue'
import { defineEmits, watch } from 'vue'
import FilesFormat from '../helpers/format/FilesFormat';
const props = defineProps({
    logo: File | String,
});

const emit = defineEmits(['changeImage'])
const logoPreview = ref('')

const emitChangeImage = (value) => {
    emit('changeImage', value)
};

const getImageNGO = async (event) => {
    FilesFormat.BinaryToBase64(event.target.files[0]).then((result) => {
        emitChangeImage(result);
    });
};

const clearLogo = () => {
    emitChangeImage('');
    logoPreview.value = '';
}
</script>

<template>
    <div class="flex items-center justify-center w-full" v-if="!props.logo">
        <label for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-10 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">
                        {{ $t('drag_and_drop') }}
                    </span>
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" v-on:change="getImageNGO" />
        </label>
    </div>
    <div v-else>
        <img class="w-20 h-20 rounded" :src="props.logo" />

        <Button color="red" class="mt-2" v-on:click="clearLogo">
            <font-awesome-icon :icon="['far', 'trash-can']" />
        </Button>&nbsp;
    </div>
</template>