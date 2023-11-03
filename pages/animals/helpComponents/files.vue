<script setup>
import AnimalModel from "../../../structures/Models/AnimalModel";
import AnimalAttachmentModel from "../../../structures/Models/AnimalAttachmentModel";
import { Input } from "flowbite-vue";
import { Buffer } from "buffer";
import FilesFormat from "../../../helpers/format/FilesFormat";

const emit = defineEmits(["updateEntity", "removeFile"]);

const updateCurrentFile = async (event) => {
  const files = event.target.files;
  let listOfFiles = [...props.form.animalAttachments];
  if (files) {
    if (files instanceof FileList) {
      for (let i = 0; i < files.length; i++) {
        const newFile = new AnimalAttachmentModel();
        const base64File = await FilesFormat.BinaryToBase64(files[i]);
        newFile.file = base64File;
        newFile.type = files[i].type;
        newFile.description = files[i].name;
        listOfFiles.push(newFile);
      }
    } else {
      const newFile = new AnimalAttachmentModel();
      newFile.file = files;
      const base64File = await FilesFormat.BinaryToBase64(files[i]);
      newFile.file = base64File;
      newFile.type = files.type;
      newFile.description = files.name;
      listOfFiles.push(newFile);
    }
  }

  dispatchEmit(listOfFiles);
  event.target.files = null;
};

const dispatchEmit = (entity) => {
  emit("updateEntity", entity);
};

const fileDownloadUrl = ref("");
const fileDownloadName = ref("");

const downloadFile = async (file) => {
  fileDownloadUrl.value = file.file;
  fileDownloadName.value = file.description;
  const downloadLink = document.getElementById("downloadLink");
  downloadLink.click();
};

const props = defineProps({
  form: AnimalModel,
});

const groupedAttachments = computed(() => {
  const groupSize = 3; //
  let grouped = [];
  for (let i = 0; i < props.form.animalAttachments.length; i += groupSize) {
    grouped = [...grouped, props.form.animalAttachments.slice(i, i + groupSize)];
  }
  return grouped;
});

const getDefaultFileHover = () => ({
  index: null,
  group: null,
  isHovered: false,
  isDeleted: false,
});

const fileHover = ref(getDefaultFileHover());

const onHoverFile = (index, groupIndex) => {
  fileHover.value.index = index;
  fileHover.value.group = groupIndex;
};

const onLeaveFile = () => {
  fileHover.value = getDefaultFileHover();
};

const removeFile = (index) => {
  emit("removeFile", index);
};
</script>

<template>
  <a
    id="downloadLink"
    v-show="false"
    :download="fileDownloadName"
    :href="fileDownloadUrl"
  ></a>

  <div class="w-full">
    <div class="flex items-center justify-center w-full">
      <label
        for="dropzone-files"
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
            <b>{{ $t("drag_and_drop") }}</b>
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ $t("pdf_message") }}
          </p>
        </div>
        <input
          id="dropzone-files"
          type="file"
          class="hidden"
          multiple="true"
          v-on:change="updateCurrentFile"
        />
      </label>
    </div>

    <div class="flex pt-5 w-full">
      <perfect-scrollbar class="w-full">
        <div class="flex w-full max-w-vw">
          <div v-if="groupedAttachments && groupedAttachments.length > 0" class="w-full">
            <div
              v-for="(group, index) in groupedAttachments"
              class="w-full"
              :class="{ 'pt-5': index > 0 }"
            >
              <div class="w-full flex">
                <div
                  v-for="(file, i) in group"
                  :key="i"
                  class="flex flex-col justify-center items-center w-full h-32"
                  :class="{ 'pl-2': i > 0 }"
                >
                  <div class="flex flex-col justify-center items-center w-full h-32">
                    <div
                      class="w-full"
                      @mouseover="onHoverFile(i, index)"
                      @mouseleave="onLeaveFile(i)"
                      @touchstart="onHoverFile(i, index)"
                      @touchend="onLeaveFile(i)"
                    >
                      <div
                        class="bg-slate-100 flex flex-col items-center justify-center h-full w-full"
                        v-if="
                          file.type.includes('image') &&
                          (fileHover.index === null ||
                            fileHover.index !== i ||
                            fileHover.group !== index)
                        "
                      >
                        <img :src="file.file" alt="" class="max-h-24 min-h-16 w-auto" />
                      </div>
                      <div
                        class="flex flex-col items-center justify-center h-full w-full bg-slate-100 rounded p-5"
                        v-else-if="
                          fileHover.index === null ||
                          fileHover.index !== i ||
                          fileHover.group !== index
                        "
                      >
                        <span
                          class="text-white text-3xl"
                          v-if="file.type.includes('pdf')"
                        >
                          <font-awesome-icon
                            :icon="['fas', 'file-pdf']"
                            class="text-blue-700"
                          />
                        </span>

                        <span class="text-blue-700 text-xs pt-2">
                          {{ file.description }}
                        </span>
                      </div>
                      <div
                        class="flex flex-col justify-center items-center w-full max-h-24 h-56"
                        v-else
                        v-on:click="removeFile(i)"
                      >
                        <div
                          class="flex items-center justify-center h-full w-full bg-red-800 rounded"
                        >
                          <span class="text-white font-bold text-2xl">
                            <font-awesome-icon :icon="['far', 'trash-can']" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="pb-2 flex flex-row items-center justify-center h-full w-full bg-slate-100 cursor-pointer"
                      v-on:click="downloadFile(file)"
                    >
                      <div
                        class="mt-2 flex flex-row items-center justify-center h-full w-full"
                      >
                        <font-awesome-icon :icon="['fas', 'download']" class="text-xs" />
                        &nbsp;
                        <p class="text-xs">{{ $t("download") }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.ps {
  width: 100%;
  max-width: 100%;
  max-height: 30vh;
}

.break-line {
  flex-basis: 100%;
}
</style>
