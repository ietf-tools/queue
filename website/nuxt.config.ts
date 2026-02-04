import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-08-05',
  typescript: { strict: true },
  devtools: { enabled: false },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    'nuxt-vitalizer'
  ],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
})