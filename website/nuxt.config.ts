import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-05',
  typescript: { strict: true },
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    'reka-ui/nuxt',
    'nuxt-vitalizer'
  ],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      // TS error
      // Possibly related to https://github.com/tailwindlabs/tailwindcss/issues/18802
      // possibly related to waiting for Nuxt/tailwincss to use Vite 6?
    
      tailwindcss()
    ],
  }
})