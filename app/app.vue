<template>
  <div class="relative dir-rtl">

    <MenuLogo />
    <Menu />

    <!-- ✅ نوع لودینگ با استور کنترل می‌شود -->
    <template v-if="getLoadingType === 'main'">
      <MainLoading ref="mainLoading" />
    </template>

    <template v-else>
      <CommonLineWrapper ref="pageLine" />
    </template>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>
<script setup>

import { useHead, onMounted } from '#imports';
import {setAppLocale} from "~/services/preference";
const route = useRoute()
const store = useGlobalStore()
const { getLoadingType } = storeToRefs(store)

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

watch(
    () => [route.fullPath, getLoadingType.value],
    async ([path, type]) => {
      if (type === 'line') {
        // چون <CommonLineWrapper> ممکنه هنوز mount نشده باشه:
        await nextTick()

        if (pageLine.value && typeof pageLine.value.init === 'function') {
          try {
            pageLine.value.init()
            console.log(`✅ CommonLineWrapper init برای مسیر ${path} اجرا شد`)
          } catch (err) {
            console.warn('⚠️ خطا هنگام اجرای init در CommonLineWrapper', err)
          }
        } else {
          console.warn('⚠️ CommonLineWrapper هنوز mount نشده')
        }
      }
    },
    { immediate: true }
)

onMounted(() => {
  // فقط وقتی کامپوننت line نمایش داده میشه، init بزن
  if (getLoadingType.value === 'line') {
    nextTick(() => {
      if (pageLine.value?.init) pageLine.value.init()
    })
  }
})

// هنگام mount شدن کامپوننت، favicon را بررسی و تنظیم کنید
onMounted(() => {

  if (process.client) {

    let lang_value = localStorage.getItem('lang') || 'fa';
    store.setLocale(lang_value);
    setAppLocale(lang_value);



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