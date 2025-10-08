// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
    nitro: {
        compressPublicAssets: true,
        minify: true
    },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'گروه پرداد',
      script: [
        {src: '/TweenMax.min.js', defer: true},
        {src: '/TimelineMax.min.js', defer: true},
        {src: '/DrawSVGPlugin.js', defer: true},
      ]
    }
  },
  runtimeConfig: {

    public: {
      gtmId: process.env.GTM_ID || '',
      appUrl: process.env.NUXT_PUBLIC_SITE_URL, 
      apiUrl: process.env.NUXT_API_URL,   
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules:['@nuxtjs/i18n', '@pinia/nuxt', '@vueuse/nuxt'],
  i18n: {

    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'fa', iso: 'fa-IR', file: 'fa.json' },
      { code: 'ar', iso: 'ar-AR', file: 'ar.json' }
    ],
    defaultLocale: 'fa', 
    strategy: 'no_prefix',

  },
  css: [
    '~/assets/css/main-3.css',
    /*'animate.css/animate.min.css',*/
  ],
  vite:{
    plugins: [
      tailwindcss(),
    ],
  },
  plugins: [
    {src: '~/plugins/lozad.client.ts'},
    {src: '~/plugins/v-lazy-load.ts'},
  ],
})