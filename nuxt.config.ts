// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
  },
  plugins: [
    '~/plugins/axios',
    '~/plugins/fontAwesome',
    "~/plugins/mask",
    '~/plugins/scrollBar',
    '~/plugins/infiniteScroll',
  ],
  runtimeConfig: {
    public: {
      BACKEND_URL: process.env.BACKEND_URL,
      NODE_ENV: process.env.NODE_ENV,
    },
  },
  pages: true,
})
