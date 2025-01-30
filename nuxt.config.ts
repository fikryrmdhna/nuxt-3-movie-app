// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/custom-vuetify.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE,
      apiKey: process.env.API_KEY,
      accountId: process.env.ACCOUNT_ID,
      sessionId: process.env.SESSION_ID
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    analyze: true,
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    '@pinia/nuxt',
    '@nuxt/image'
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  }
})
