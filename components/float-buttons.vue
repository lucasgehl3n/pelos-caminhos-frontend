<script setup>
const props = defineProps({
  primaryText: {
    type: String,
    default: "Salvar",
  },
  primaryAction: {
    type: Function,
    default: () => {},
  },
  primaryIcon: {
    type: String,
    default: "",
  },
  secondaryAction: {
    type: Function,
    default: () => {},
  },
  secondaryIcon: {
    type: String,
    default: "id-card",
  },
});

const executePrimaryAction = () => {
  props.primaryAction();
};

const executeSecondaryAction = () => {
  props.secondaryAction();
};
</script>

<template>
  <div
    class="fixed z-10 w-full h-16 max-w-xs -translate-x-1/2 bg-white border border-gray-200 md:rounded-full bottom-20 md:bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600"
  >
    <div class="grid h-full max-w-lg grid-cols-2 mx-auto">
      <button
        type="button"
        v-on:click="executeSecondaryAction"
        class="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
      >
        <font-awesome-icon :icon="['fas', props.secondaryIcon]" class="text-3xl" />
        <span class="sr-only">Home</span>
        Perfil público
      </button>

      <div class="flex items-center justify-center">
        <button
          data-tooltip-target="tooltip-new"
          type="button"
          v-on:click="executePrimaryAction"
          class="inline-flex items-center justify-center w-auto p-5 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            v-if="!props.primaryIcon"
            class="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>

          <font-awesome-icon
            v-else
            :icon="['fas', props.primaryIcon]"
            class="text-white"
          />
          &nbsp;
          <span class="text-white">{{ props.primaryText }}</span>
          <span class="sr-only">{{ props.primaryText }}</span>
        </button>
      </div>
      <div
        id="tooltip-new"
        role="tooltip"
        class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        {{ props.primaryText }}
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  </div>
</template>
