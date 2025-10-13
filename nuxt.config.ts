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
       meta: [
           {name: 'google-site-verification', content: 'pq8Ud3rzIIL_Qnwi_M89CNGzVwchAC72U8zCiiy7vng'}
       ],
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
      appUrl: process.env.NUXT_PUBLIC_SITE_URL, // e.g. https://pardad-group.com
      apiUrl: process.env.NUXT_API_URL,   // e.g. https://pardad-group.com
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules:['@nuxtjs/i18n', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/color-mode'],
  i18n: {

    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'fa', iso: 'fa-IR', file: 'fa.json' },
      { code: 'ar', iso: 'ar-AR', file: 'ar.json' }
    ],
    defaultLocale: 'fa', // پوشه‌ای که فایل‌های ترجمه‌ات توشه
    strategy: 'no_prefix', // یا 'prefix_except_default' اگر بخوای URL چندزبانه داشته باشی

    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: false,
    preload: ['fa', 'en', 'ar']
  },
  css: [
    '~/assets/css/main-3.css',
    'animate.css/animate.min.css',
  ],
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  vite:{
    plugins: [
      tailwindcss(),
    ],
  },
  site: {
    url: 'http://localhost:3001',
    name: 'گروه پرداد',
    description: '',
    defaultLocale: 'fa',
  },
  plugins: [
    {src: '~/plugins/lozad.client.ts'},
    {src: '~/plugins/v-lazy-load.ts'},
    /*  /!* {src: '~/plugins/gtm.js'},*!/ // فقط در سمت کلاینت اجرا شو
        // فقط در سمت کلاینت اجرا شو
       // فقط در سمت کلاینت اجرا شو
    /!*   {src: '~/plugins/hotjar.client.js'}*!/
       */

  ],
})