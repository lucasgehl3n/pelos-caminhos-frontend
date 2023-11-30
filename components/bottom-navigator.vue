<script setup>
const router = useRouter();
const route = useRoute();
</script>

<template>
  <div>
    <div
      class="fixed bottom-0 left-0 z-20 w-full h-16 bg-white border-t border-gray-200 pr-5 dark:bg-gray-700 dark:border-gray-600"
    >
      <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <a
            href="#"
            v-on:click="router.push({ name: 'dashboard' })"
            class="flex items-center px-2"
          >
            <img src="~/assets/svg/presentation-chart-line-dark.svg" class="w-6 h-6" />
          </a>
          <NuxtLink to="/" class="text-gray-800">
            {{ $t("home") }}
          </NuxtLink>
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <a
            href="#"
            v-on:click="router.push({ name: 'institution' })"
            class="flex items-center px-2"
          >
            <img src="~/assets/svg/identification-dark.svg" class="w-6 h-6" />
          </a>
          <NuxtLink to="/institution" class="text-gray-800">
            {{ $t("ngos") }}
          </NuxtLink>
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <img src="~/assets/svg/dog-dark.svg" class="w-6 h-6" />
          <NuxtLink to="/animals" class="text-gray-800">
            {{ $t("animals") }}
          </NuxtLink>
        </button>
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <a
            href="#"
            v-on:click="router.push({ name: 'institution' })"
            class="flex items-center px-2"
          >
            <img src="~/assets/svg/bell-dark.svg" class="w-6 h-6 " />
          </a>
          <NuxtLink to="/" class="text-gray-800"> Notificações </NuxtLink>
        </button>
      </div>
    </div>
  </div>
</template>
