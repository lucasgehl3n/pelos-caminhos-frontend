<script setup>
import BadgeFilter from '../../components/badge-filter.vue';
import SearchBar from '../../components/search-bar.vue';
import ListInstitutions from './components/ListInstitution.vue';
import InstitutionFilter from '../../structures/Filters/InstitutionFilter';
import InstitutionGateway from '../../gateways/InstitutionGateway';
import InstitutionModel from '../../structures/Models/InstitutionModel';
import Constants from '../../constants';
import Loading from 'vue3-loading-overlay';

const filter = ref(new InstitutionFilter());
const showLoading = ref(false)
const listInstitutions = ref([]);
let identifierReset = ref(false);
let pageDynamicRendering = ref(1);

const filterBounded = async () => {
    resetAllFilters();
    filter.value.bonded = !filter.value.bonded;
}

const filterVolunteer = async () => {
    resetAllFilters();
    console.log(filter.value.volunteer)
    filter.value.volunteer = !filter.value.volunteer;
}

const filterAdmin = async () => {
    resetAllFilters();
    filter.value.admin = !filter.value.admin;
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
    if (list && list.data && list.data.length) {
        list.data.forEach((institution) => {
            mapRequestToForm(institution);
        });

        if (list.data.length < Constants.RESULTS_PER_PAGE) {
            state.complete();
        }
        else {
            increasePage();
            state.loaded();
        }
    }
    showLoading.value = false;
}
</script>
<template>
    <PageHeader :title="'ONGs'"></PageHeader>

    <perfect-scrollbar class="scrollable w-full psBadges">
        <div class="pt-5 w-full whitespace-nowrap">
            <BadgeFilter :title="'Ongs que possuo vínculo'" :number="'2'" @click="filterBounded" :clicked="filter.bonded">
            </BadgeFilter>
            <BadgeFilter :title="'Voluntário'" :number="'1'" @click="filterVolunteer" :clicked="filter.volunteer">
            </BadgeFilter>
            <BadgeFilter :title="'Administrador'" @click="filterAdmin" :clicked="filter.admin"></BadgeFilter>
        </div>
    </perfect-scrollbar>

    <div class="py-2 w-full">
        <div class="flex w-full">
            <SearchBar></SearchBar>
        </div>
    </div>


    <Loading :active="showLoading" :opacity="0.8" :color="'#1943dd'" class="w-full flex flex-col items-center py-10">
    </Loading>

    <ListInstitutions v-show="!showLoading" :list="listInstitutions"
        :identifier-reset="identifierReset" :page="pageDynamicRendering" :fnReload="loadData">
    </ListInstitutions>
</template>
