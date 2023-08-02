<script setup>
import bottomNavigator from '/pages/bottom-navigator.vue';
const route = useRoute()
</script>
<template>
  <div class="p-8 dark:text-white w-full bg-gray-50 h-screen">
    <NuxtPage/>
    <template v-if="!route.path.includes('login')">
      <bottom-navigator></bottom-navigator>
    </template>
  </div>
</template>
