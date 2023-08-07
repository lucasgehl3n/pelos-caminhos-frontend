// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/scss/main.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: true,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],
  i18n: {
    /* module options */
  },
  plugins: [
    '~/plugins/axios',
  ],
  pages: true,
})
