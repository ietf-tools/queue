// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-05',
  devtools: { enabled: false },

  modules: [
    '@nuxt/eslint',
    'nuxt-vitalizer'
  ]
})