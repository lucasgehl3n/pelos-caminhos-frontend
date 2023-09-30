<script setup>
import path from 'path';
import VerticalList from '../../../components/vertical-list.vue';
import { Roles } from '../../../enums/Roles'
const router = useRouter();

const props = defineProps({
    identifierReset: Boolean,
    page: Number,
    fnReload: Function,
    list: Array,
});

let target = ref(".scrollable");

const isAdministrator = (role) => {
    return role == Roles.Administrator;
}

const getRoutePath = (role) => {
    if (role === Roles.Administrator) {
        return '/institution/';
    }
    return '/public/institution/'
}

const redirectToDetail = (entity) => {
    router.push({ path: `${getRoutePath(entity.role)}${entity.id}` })
}
</script>

<template>
    <VerticalList :list="list" :infiniteLoading="{
        target: target,
        identifier: identifierReset,
        infiniteHandler: fnReload,
    }">
        <template v-slot="{ entity }">
            <div class="w-full h-full flex" v-on:click="redirectToDetail(entity)">
                <div class="sm:p-5 py-5 px-2">
                    <img class="object-cover h-full md:w-auto max-w-xs sm:w-1/4 w-full" v-if="entity.image"
                        :src="entity.image" alt="" style="max-height: 4rem;">
                </div>
                <div class="p-5 w-full">
                    <div class="flex w-full">
                        <div class="w-3/4">
                            <a href="#">
                                <h5 class="mb-2 text-1x1 font-bold tracking-tight text-gray-900 dark:text-white">
                                    {{ entity.name }}
                                </h5>
                            </a>
                        </div>
                        <div class="w-1/4 items-end flex flex-col">
                            <template v-if="isAdministrator(entity.role)">
                                <img src="~/assets/svg/admin.svg" :alt="$t('admin')" class="w-6 h-6" />
                            </template>

                            <template v-else-if="entity.role == Roles.Volunteer">
                                <img src="~/assets/svg/hand.svg" :alt="$t('volunteer')" class="w-6 h-6" />
                            </template>
                        </div>
                    </div>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ entity.description }}</p>
                </div>
            </div>
        </template>
    </VerticalList>
</template>