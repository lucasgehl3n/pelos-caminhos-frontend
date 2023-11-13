<script setup>
import { defineEmits } from "vue";
import AnimalModel from "../../../structures/Models/AnimalModel";
import ColorGateway from "../../../gateways/ColorGateway";
const emit = defineEmits(["updateColor"]);
const arrayColors = ref([]);

const selectColor = (idColor) => {
  const color = arrayColors.value.find((color) => color.id === idColor);
  if (color) {
    emit("updateColor", idColor);
  }
};

const props = defineProps({
  form: AnimalModel,
});

onMounted(() => {
  ColorGateway.List().then((res) => {
    arrayColors.value = res.data;
    const color = arrayColors.value.find((color) => color.id === props.idColor);
    if (color) {
      color.selected = true;
    }
  });
});

const classList = (color) => {
  const ringClass = color.id === props.form.idColor ? "ring-blue-600 border-2" : "ring-gray-300";
  const classes = [ringClass, color.class];
  console.log(classes);
  return classes;
};
</script>

<template>
  <div class="flex items-center space-x-2">
    <template v-for="color in arrayColors">
      <div
        class="w-10 h-10 rounded-full ring-2"
        :class="classList(color)"
        v-on:click="selectColor(color.id)"
      >
      </div>
    </template>
  </div>
</template>
