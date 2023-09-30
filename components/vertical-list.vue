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

<template :slot-scope="{entity}">
    {{ props.showLoading }}
    <perfect-scrollbar class="scrollable w-full">
        <div v-for="(entity, i) in props.list" v-show="hasItemsOnList"
            class="flex bg-white border border-gray-100 shadow dark:bg-gray-800 dark:border-gray-700 w-full"
            :class="{ 'rounded-t-md': i == 0, 'rounded-b-md': i == props.list.length - 1 }">
            <slot :entity="entity">
            </slot>
        </div>
        <InfiniteLoading ref="infiniteLoading" @infinite="props.infiniteLoading.infiniteHandler"
            :target="props.infiniteLoading.target" :identifier="props.infiniteLoading.identifier" :distance="20">
            <template #complete>
                <div v-if="!hasItemsOnList">
                    <NoResultsFound></NoResultsFound>
                </div>
                <template v-else>
                    &nbsp;
                </template>
            </template>
        </InfiniteLoading>
    </perfect-scrollbar>
</template>

<style scoped>
.ps {
    max-height: 70vh;
}
</style>