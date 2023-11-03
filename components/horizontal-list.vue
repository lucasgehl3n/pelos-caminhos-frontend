<script setup>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import NoResultsFound from "../components/no-results-found.vue";

const props = defineProps({
  list: [],
  infiniteLoading: Object,
});

const hasItemsOnList = computed(() => props.list && props.list.length > 0);
</script>

<template :slot-scope="{ entity }">
  <perfect-scrollbar class="scrollable w-full">
    <div class="w-full">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
        <div
          v-for="(entity, i) in props.list"
          v-show="hasItemsOnList"
          class="flex w-full"
        > 
          <slot :entity="entity"> </slot>
        </div>
      </div>
    </div>

    <InfiniteLoading
      ref="infiniteLoading"
      @infinite="props.infiniteLoading.infiniteHandler"
      :target="props.infiniteLoading.target"
      :identifier="props.infiniteLoading.identifier"
      :distance="20"
    >
      <template #complete>
        <div v-if="!hasItemsOnList">
          <NoResultsFound></NoResultsFound>
        </div>
        <template v-else> &nbsp; </template>
      </template>
    </InfiniteLoading>
  </perfect-scrollbar>
</template>

<style scoped>
.ps {
  max-height: 70vh;
}
</style>
