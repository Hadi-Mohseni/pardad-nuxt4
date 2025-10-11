<template>
  <NuxtLayout name="page">
    <template #content>
      <!-- main content -->
      <div
          v-if="isDataLoad"
          class="relative overflow-hidden min-h-screen flex flex-col md:grid md:grid-cols-2"
      >
        <!-- کارت‌ها -->
        <div
            v-for="(item, index) in performanceItems"
            :key="index"
            class="grid grid-cols-2 items-center md:block relative group overflow-hidden cursor-pointer
                   border-b border-gray-300 md:border-0 last:border-b-0 px-5 md:px-0"
        >
          <!-- متن (فقط موبایل) -->
          <div class="text-gray-700 text-sm leading-relaxed md:hidden">
            <h3 class="text-base font-semibold mb-2">{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>

          <!-- تصویر -->
          <div class="relative md:p-20">
            <img
                :src="item.image"
                alt="content"
                class=" object-cover mt-5 mb-10 md:mb-0 max-w-[395px] w-[75%] mx-auto"
            />

            <!-- اورلی فقط دسکتاپ -->
            <div
                class="hidden md:flex absolute inset-0 items-end justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style="background: linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0));"
            >
              <div class="text-white text-center px-4 pb-10">
                <h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
                <p class="text-sm leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #title>
      <h1 class=" pr-4 text-right
      lg:before:content-none lg:after:content-none before:content-['']
       before:left-0 before:bg-black-100/20 before:absolute before:bottom-0
       before:right-0 before:h-[1px] after:content-[''] after:w-[8vw]
       after:bg-black-900 after:absolute after:bottom-0 after:right-[80px] after:h-[1px]
       text-[40px] md:text-[45px] lg:ml-10 xl2:ml-[300px] mb-10 lg:mb-0 font-light"
          ref="titleElement"
      >
        {{ t("performance_guarantee.title") }}
        <BackButton class="mt-3"/>
      </h1>
    </template>

  </NuxtLayout>
</template>

<script setup>
import {useI18n} from "vue-i18n";

definePageMeta({
  dataPage: "performance-guarantee",
});

useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

import { useGlobalStore } from "~/stores/global.js";
;

const {t , locale} = useI18n()
const store = useGlobalStore();
const { endLoading } = store;

const isDataLoad = ref(false);

import LinedPaper from "~/assets/images/lined-paper.png";

const performanceItems = ref([
  {
    title: "میثاق کیفیت",
    desc: "توضیحات کوتاه درباره تعهد به کیفیت و اطمینان از نتیجه مطلوب.",
    image: LinedPaper,
  },
  {
    title: "گارانتی خدمات",
    desc: "شرح مختصر درباره ضمانت حسن انجام کار و پشتیبانی پروژه.",
    image: LinedPaper,
  },
]);

// Provide refs to layout
const bodyElement = ref(null);
const actionElements = ref(null);
const titleElement = ref(null);
const subtitleElement = ref(null);

provide("contentRefs", {
  body: bodyElement,
  actions: actionElements,
  title: titleElement,
  subtitle: subtitleElement,
  hasScroll: false
});

useSeoMeta({
  title: "حسن انجام کار",
  description: "حسن انجام کار",
  keywords: "حسن انجام کار",
});

onMounted(() => {
  setTimeout(() => {
    isDataLoad.value = true;
    endLoading();
  }, 100);
});
</script>
