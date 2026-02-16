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
    'nuxt-vitalizer'
  ],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://static.ietf.org' },
        { rel: 'stylesheet', href: 'https://static.ietf.org/fonts/inter/import.css' }
      ]
    }
  },
  routeRules: {
    "/queue": {
      redirect: "/",
    },
    "/cluster": {
      redirect: "/clusters/",
    },
  },
})