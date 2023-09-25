<script setup>
import Breadcrumb from '../../components/breadcrumb.vue';
import BadgeFilter from '../../components/badge-filter.vue';
import SearchBar from '../../components/search-bar.vue';
import ListInstitutions from './components/ListInstitution.vue';
import InstitutionFilter from '../../structures/Filters/InstitutionFilter';
import InstitutionGateway from '../../gateways/InstitutionGateway';
import InstitutionModel from '../../structures/Models/InstitutionModel';
import Constants from '../../constants';
import Loading from 'vue3-loading-overlay';
const { t } = useI18n();

const router = useRouter();

const filter = ref(new InstitutionFilter());
const showLoading = ref(false)
const listInstitutions = ref([]);
const counters = ref({
    volunteer: 0,
    admin: 0,
    bounded: 0,
});
let identifierReset = ref(false);
let pageDynamicRendering = ref(1);

const filterBounded = async () => {
    let invertedValue = !filter.value.bonded;

    resetAllFilters();
    filter.value.bonded = invertedValue;
}

const filterVolunteer = async () => {
    let invertedValue = !filter.value.volunteer;

    resetAllFilters();
    filter.value.volunteer = invertedValue;
}

const filterAdmin = async () => {
    let invertedValue = !filter.value.admin;

    resetAllFilters();
    filter.value.admin = invertedValue;
}

const searchValues = (value) => {
    filter.value.search = value;
    identifierReset.value = true;
    listInstitutions.value = [];
}

const sortingValues = (value) => {
    filter.value.sorting = value;
    identifierReset.value = true;
    listInstitutions.value = [];
}


const resetAllFilters = async () => {
    filter.value = new InstitutionFilter();
    identifierReset.value = true;
    listInstitutions.value = [];
}

const resetPage = () => {
    pageDynamicRendering.value = 1;
}

const increasePage = () => {
    pageDynamicRendering.value++;
}

const loadedPage = () => {
    identifierReset.value = false;
}

const mapRequestToForm = (data) => {
    const institutionTemp = new InstitutionModel();
    institutionTemp.id = data.id;
    institutionTemp.name = data.name;
    institutionTemp.description = data.description;
    institutionTemp.email = data.email;
    institutionTemp.phone = data.phone;
    institutionTemp.site = data.site;
    institutionTemp.address = data.address;
    institutionTemp.document = data.document;
    institutionTemp.image = data.image;
    institutionTemp.role = data.role;
    listInstitutions.value.push(institutionTemp);
}

const loadData = async (state) => {
    showLoading.value = true;
    if (identifierReset.value) {
        resetPage();
        loadedPage();
        showLoading.value = false;
        return;
    }

    const list = await InstitutionGateway.List(pageDynamicRendering.value, filter.value);
    if (list && list.data && list.data.list && list.data.list.length) {
        list.data.list.forEach((institution) => {
            mapRequestToForm(institution);
        });

        const { volunteer, admin, bounded } = list.data.counters;
        counters.value = {
            admin,
            volunteer,
            bounded,
        };

        if (list.data.list.length < Constants.RESULTS_PER_PAGE) {
            state.complete();
        }
        else {
            increasePage();
            state.loaded();
        }
    }
    showLoading.value = false;
}

const breadcrumb = ref([
    {
        name: 'Home',
        url: '/',
        icon: 'home',
    },
    {
        name: t('ngos'),
        url: '/institution',
    },
]);
</script>
<template>
    <div class="pb-5">
        <Breadcrumb :list-items="breadcrumb">
        </Breadcrumb>
    </div>
    <div class="w-full flex">
        <div class="w-4/5">
            <PageHeader :title="$t('ngos')"></PageHeader>
        </div>
        <div class="w-full flex-row sm:w-1/5 sm:items-end text-right sm:px-5 py-4">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                v-on:click="router.push({ path: '/institution/create' })">Cadastrar ONG</a>
        </div>
    </div>

    <perfect-scrollbar class="scrollable w-full psBadges">
        <div class="w-full whitespace-nowrap">
            <BadgeFilter :title="$t('my_bounded')" :number="counters.bounded" @click="filterBounded"
                :clicked="filter.bonded">
            </BadgeFilter>
            <BadgeFilter :title="$t('volunteer')" :number="counters.volunteer" @click="filterVolunteer"
                :clicked="filter.volunteer">
            </BadgeFilter>
            <BadgeFilter :title="$t('admin')" :number="counters.admin" @click="filterAdmin" :clicked="filter.admin">
            </BadgeFilter>
        </div>
    </perfect-scrollbar>

    <div class="py-2 w-full">
        <div class="flex w-full">
            <SearchBar v-on:change-search="searchValues" v-on:change-sorting="sortingValues">
            </SearchBar>
        </div>
    </div>


    <Loading :active="showLoading" :opacity="0.8" :color="'#1943dd'" class="w-full flex flex-col items-center py-10">
    </Loading>

    <ListInstitutions v-show="!showLoading" :list="listInstitutions" :identifier-reset="identifierReset"
        :page="pageDynamicRendering" :fnReload="loadData">
    </ListInstitutions>
</template>
