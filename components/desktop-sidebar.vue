<script setup>
const router = useRouter();
const route = useRoute();
import UserGateway from "../gateways/UserGateway.ts";
import userStore from "../stores/user.store.ts";

const store = userStore();

onMounted(() => {
  UserGateway.DetailMenu().then((response) => {
    store.setUser(response.data);
  });
});
</script>

<template>
  <div class="flex z-40 top-0 left-0 h-full transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
    <div class="overflow-y-auto z-30 py-5 px-3 w-16 h-full border-r bg-gray-800 border-gray-700">
      <ul class="space-y-2">
        <!-- <li v-if="store.getImageProfile">
          <button id="dropdownUserNameButton" class="flex justify-between items-center w-full rounded-lg" type="button">
            <div class="flex items-center">
              <img :src="store.getImageProfile" class="w-full max-h-16 rounded-full" />
            </div>
          </button>
        </li> -->
        <li>
          <a href="#" v-on:click="router.push({ name: 'institution' })"
            class="flex items-center p-2 text-gray-400 rounded-lg transition duration-75 dark:text-gray-400 hover:bg-gray-400"
            :class="{ 'bg-gray-700': route.path.includes('dashboard') }">
            <img src="~/assets/svg/presentation-chart-line.svg" class="w-6 h-6" />
          </a>
        </li>
        <li>
          <a href="#" v-on:click="router.push({ name: 'institution' })"
            class="flex items-center p-2 text-gray-400 rounded-lg transition duration-75 dark:text-gray-400 hover:bg-gray-700"
            :class="{ 'bg-gray-700': route.path.includes('institution') }">
            <img src="~/assets/svg/id.svg" class="w-6 h-6" />
          </a>
        </li>
        <li>
          <a href="#" v-on:click="router.push({ name: 'animals' })"
            class="flex items-center p-2 text-gray-400 rounded-lg transition duration-75 dark:text-gray-400 hover:bg-gray-700"
            :class="{ 'bg-gray-700': route.path.includes('animals') }">
            <img src="~/assets/svg/dog.svg" class="w-6 h-6 text-white" />
          </a>
        </li>
        <li>
          <a href="#" v-on:click="router.push({ name: 'notifications' })"
            class="flex items-center p-2 text-gray-400 rounded-lg transition duration-75 dark:text-gray-400 hover:bg-gray-700"
            :class="{ 'bg-gray-700': route.path.includes('notifications') }">
            <img src="~/assets/svg/bell.svg" class="w-6 h-6" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
