// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/scss/main.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
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
    '~/plugins/fontAwesome',
    "~/plugins/mask"
  ],
  pages: true,
})
