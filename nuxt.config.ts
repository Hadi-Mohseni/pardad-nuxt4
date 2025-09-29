// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'گروه پرداد',
      /* meta: [
           {name: 'google-site-verification', content: 'pq8Ud3rzIIL_Qnwi_M89CNGzVwchAC72U8zCiiy7vng'}
       ],*/

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
  modules:['@nuxtjs/i18n', '@pinia/nuxt', '@vueuse/nuxt'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'fa', iso: 'fa-IR', file: 'fa.json' },
      { code: 'ar', iso: 'ar-AR', file: 'ar.json' }
    ],
    defaultLocale: 'fa', // پوشه‌ای که فایل‌های ترجمه‌ات توشه
    strategy: 'no_prefix', // یا 'prefix_except_default' اگر بخوای URL چندزبانه داشته باشی
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      fallbackLocale: 'fa',
      redirectOn: 'root' // optional
    }
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
    /*  /!* {src: '~/plugins/gtm.js'},*!/ // فقط در سمت کلاینت اجرا شو
        // فقط در سمت کلاینت اجرا شو
       // فقط در سمت کلاینت اجرا شو
    /!*   {src: '~/plugins/hotjar.client.js'}*!/
       */

  ],
})