<script setup>
import bottomNavigator from '../components/bottom-navigator.vue';
import desktopSidebar from '../components/desktop-sidebar.vue';
import axios from 'axios';
axios.defaults.withCrendentails = true;
const route = useRoute();
</script>

<template>
    <perfect-scrollbar class="scrollable w-full .app-scroll">
        <Title>Pelos Caminhos</Title>

        <div class="dark:text-white w-full h-screen">

            <template v-if="!route.path.includes('login')">
                <template v-if="$device.isMobile">
                    <div class="block p-8 w-full">
                        <NuxtPage />
                    </div>
                    <div class="p-5">
                        <bottom-navigator></bottom-navigator>
                    </div>
                </template>
                <template v-else-if="$device.isDesktop">
                    <div class="flex h-screen">

                        <desktopSidebar></desktopSidebar>

                        <div class="block p-8 w-full">
                            <NuxtPage />
                        </div>
                    </div>
                </template>
            </template>
            <template v-else>
                <NuxtPage class="h-screen" />
            </template>
        </div>
    </perfect-scrollbar>
</template>

<style>
.app-scroll {
  overflow-x: hidden;
}
</style>