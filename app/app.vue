<template>
  <div class="relative dir-rtl">

    <MenuLogo ref="menuLogo"/>
    <Menu ref="menu"/>
    <MainLoading ref="mainLoading"  />

    <CommonLoadingLine
                v-show="false"
                class="hidden lg:flex"
                ref="pageLine"
                />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>



  </div>
</template>
<script setup>

import { useHead, onMounted } from '#imports';
import {setAppLocale} from "~/services/preference";
const route = useRoute()
const store = useGlobalStore();

// تابع برای تشخیص تم مرورگر و تغییر favicon
const updateFavicon = () => {
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const favicon = !isDarkMode ? '/dark-favicon.ico' : '/light-favicon.ico';


  useHead({
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: favicon,
      },
    ],
  });
};
const pageLine = ref(null)

// هنگام mount شدن کامپوننت، favicon را بررسی و تنظیم کنید
onMounted(() => {

  if (process.client) {
    setInterval(()=>{
      console.log('heloooooooooo test page')
    },1001)
    let lang_value = localStorage.getItem('lang') || 'fa';
    store.setLocale(lang_value);
    setAppLocale(lang_value);
   /* pageLine.value.create()*/

/* setTimeout(()=>{
   pageLine.value.timeScale(1);
   setTimeout(()=>{
     pageLine.value.start()
   },100)

 },100)*/
  }

  const preventDoubleClickZoom = (e) => {
    e.preventDefault();
  };

  document.addEventListener('dblclick', preventDoubleClickZoom, { passive: false });
/*  document.documentElement.style.touchAction = 'manipulation';*/
 /* document.documentElement.style.userSelect = 'none';*/
  updateFavicon();

  // گوش دادن به تغییرات تم مرورگر
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
});
</script>
<style>
html, body {
 /* touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;*/
}
</style>