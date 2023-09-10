import InfiniteScroll from 'v3-infinite-loading';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('infinite-scroll', InfiniteScroll)
});
