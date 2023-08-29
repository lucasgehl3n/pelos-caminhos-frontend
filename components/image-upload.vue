<script setup>
import { Input, Button } from 'flowbite-vue'
import { defineEmits, watch } from 'vue'
import FilesFormat from '../helpers/format/FilesFormat';

const props = defineProps({
    logo: File | Array | String,
    rounded: false,
    showGallery: true,
    id: 'dropzone-file',
    imageProp: '',
});

const emit = defineEmits(['changeImage'])
const logoPreview = ref('')

const emitChangeImage = (value) => {
    emit('changeImage', value)
};

const isMultiple = computed(() => props.logo instanceof Array);
let previousFiles = [];

const getImage = async (event) => {
    const currentFiles = Array.from(event.target.files);

    const newFiles = currentFiles.filter(file => !previousFiles.includes(file));

    for (const file of newFiles) {
        FilesFormat.BinaryToBase64(file).then((result) => {
            emitChangeImage(result);
        });
    }
};

const clearLogo = () => {
    emitChangeImage('');
    logoPreview.value = '';
}

const getDefaultImageHover = () => ({
    index: null,
    isHovered: false,
    isDeleted: false,
});

const imageHover = ref(getDefaultImageHover())

const onHoverImage = (index) => {
    imageHover.value.index = index;
}

const onLeaveImage = () => {
    imageHover.value = getDefaultImageHover();
}

const removeImage = (index) => {
    imageHover.value = getDefaultImageHover();
    emit('removeImage', index)
}
</script>

<template>
    <div class="w-full" v-if="!props.logo || isMultiple">
        <div class="flex">
            <slot></slot>
            <input :id="props.id" type="file" class="hidden" v-on:change="getImage" :multiple="isMultiple" />
            <div v-if="isMultiple && props.showGallery" class="ml-2 flex">
                <div class="overflow-x-auto flex w-full max-w-vw">
                    <div v-for="(img, i) in props.logo" class="mr-2 img-gallery-md w-full" @mouseover="onHoverImage(i)"
                        @mouseleave="onLeaveImage(i)">

                        <div class="inline-block w-full">
                            <img class="w-full rounded max-h-24 h-56" :class="{ 'rounded-full': props.rounded }" 
                                :src="imageProp ? img[imageProp] : img"
                                v-if="imageHover.index === null || (imageHover.index !== null && imageHover.index !== i)" />

                            <div class="flex flex-col justify-center items-center w-full rounded max-h-24 h-56" v-else
                                v-on:click="removeImage(i)">
                                <div class="flex items-center justify-center h-full w-full bg-red-800">
                                    <span class="text-white font-bold text-2xl">
                                        <font-awesome-icon :icon="['far', 'trash-can']" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Button color="red" class="mt-2" v-on:click="clearLogo" v-if="!isMultiple && props.logo">
            <font-awesome-icon :icon="['far', 'trash-can']" />
        </Button>&nbsp;
    </div>

    <div v-else-if="props.showGallery">
        <img class="w-20 h-20 rounded" :class="{ 'rounded-full': props.rounded }" :src="props.logo" />
        <Button color="red" class="mt-2" v-on:click="clearLogo">
            <font-awesome-icon :icon="['far', 'trash-can']" />
        </Button>&nbsp;
    </div>
</template>