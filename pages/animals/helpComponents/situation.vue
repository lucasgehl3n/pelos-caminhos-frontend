<script setup>
import BadgeFilter from "../../../components/badge-filter.vue";
import { AnimalSituation } from "../../../enums/AnimalSituation.ts";
import Multiselect from "@vueform/multiselect";
import AnimalModel from "../../../structures/Models/AnimalModel";
import "@vueform/multiselect/themes/default.css";
const emit = defineEmits(["updateSituation"]);

let situationsAnimal = ref([
  {
    id: AnimalSituation.AwaitingAdoption,
    name: "Aguardando adoção",
    class: "bg-orange-200",
    checked: false,
  },
  {
    id: AnimalSituation.InTreatment,
    name: "Em tratamento",
    checked: false,
    class: "bg-yellow-200",
  },
  {
    id: AnimalSituation.Death,
    name: "Óbito",
    checked: false,
  },
  {
    id: AnimalSituation.TemporaryHome,
    name: "Encaminhado para lar temporário",
    checked: false,
    class: "bg-purple-200",
  },
  {
    id: AnimalSituation.Adopted,
    name: "Adotado",
    checked: false,
    class: "bg-green-200",
  },
]);

const props = defineProps({
  form: AnimalModel,
});

const updateSituation = (v) => {
  let option = v;
  if (props.form.idSituation === v) {
    option = "";
  }
  emit("updateSituation", option);
};
</script>
<template>
  <label
    for="default-search"
    class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ $t('situation') }}</label
  >

  <perfect-scrollbar
    class="badges-filter pb-5 overflow-x-hidden"
    v-show="situationsAnimal"
  >
    <div class="flex flex-row whitespace-nowrap h-5">
      <template v-for="(option, i) in situationsAnimal">
        <BadgeFilter
          :title="option.name"
          :clicked="props.form.idSituation === option.id"
          v-on:click="updateSituation(option.id)"
          class="w-fit"
          :class="option.class"
          :showChecked="true"
        >
        </BadgeFilter>
      </template>
    </div>
  </perfect-scrollbar>
</template>

<style scoped>
.badges-filter {
    max-width: 100vw;
    overflow-x: auto;
    overflow-y: hidden;
}
</style>