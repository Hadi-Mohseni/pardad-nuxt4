<template>
  <div class="relative dir-rtl">
    <Menu ref="menu"/>
    <MenuLogo ref="menuLogo"  />
    <NuxtLayout >
      <NuxtPage />
    </NuxtLayout>
    <MainLoading ref="mainLoading"  />
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


// هنگام mount شدن کامپوننت، favicon را بررسی و تنظیم کنید
onMounted(() => {

  if (process.client) {
    let lang_value = localStorage.getItem('lang') || 'fa';
    store.setLocale(lang_value);
    setAppLocale(lang_value);
  }

  const preventDoubleClickZoom = (e) => {
    e.preventDefault();
  };

  document.addEventListener('dblclick', preventDoubleClickZoom, { passive: false });
  document.documentElement.style.touchAction = 'manipulation';
  document.documentElement.style.userSelect = 'none';
  updateFavicon();

  // گوش دادن به تغییرات تم مرورگر
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
});
</script>
<style>
html, body {
  touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>