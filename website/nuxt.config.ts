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
  colorMode: {
    classSuffix: ''
  },
  vite: {
    plugins: [
      // TS error
      // Possibly related to https://github.com/tailwindlabs/tailwindcss/issues/18802
      // possibly related to waiting for Nuxt/tailwincss to use Vite 6?
      tailwindcss()
    ],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'preconnect', href: 'https://static.ietf.org' },
        { rel: 'stylesheet', href: 'https://static.ietf.org/fonts/inter/import.css' }
      ]
    }
  },
  // https://nuxt.com/docs/guide/going-further/runtime-config
  runtimeConfig: {
    cfServiceTokenId: '', // NUXT_CF_SERVICE_TOKEN_ID env var
    cfServiceTokenSecret: '', // NUXT_CF_SERVICE_TOKEN_SECRET env var
    public: {
      siteBase: 'https://queue.rfc-editor.org', // NUXT_PUBLIC_SITE_BASE env var
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
  $development: {
    routeRules: {
      /**
       * In development mode (`npm run dev`) the website fetches API data from either a local dev api or some
       * staging / prod environment.
       * Uncomment/comment out the lines to adjust the config.
       */
      '/api/v1/**': {
        proxy: 'http://localhost:3001/api/v1/**'
        // proxy: 'https://queue.staging.ietf.org/'
      },
    }
  },
})