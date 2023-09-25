<script setup>
const router = useRouter();
const props = defineProps({
  listItems: {
    type: Array,
    required: true
  }
})

const isLastItem = (value) => {
  return props.listItems.length - 1 === value;
}
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3">
      <li v-for="(item, i) in props.listItems" class="inline-flex items-center"
        :aria-current="isLastItem(item) ? 'page' : ''" v-on:click="router.push({ path: item.url })">
        <a href="#"
          class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <font-awesome-icon v-if="item.icon" :icon="['fas', item.icon]" class="pr-2" />
          {{ item.name }}
        </a>
        <font-awesome-icon v-if="!isLastItem(item)" :icon="['fas', 'chevron-right']"
          class="flex-shrink-0 w-2 h-2 mx-2 text-gray-400" aria-hidden="true" />
      </li>
    </ol>
  </nav>
</template>