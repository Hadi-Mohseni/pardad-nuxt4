<template>
  <NuxtLayout name="page">
    <template #content>
      <!-- main content -->
      <div
          v-show="isDataLoad"
          class="relative overflow-hidden min-h-screen px-4 lg:px-32 md:px-16 flex flex-col lg:flex-row"
      >
        <!-- team cards -->
        <div
            v-for="(item, index) in teamMembers"
            :key="index"
            class="relative group overflow-hidden cursor-pointer
                 border-b border-gray-300 last:border-b-0"
        >
          <!-- image + overlay -->
          <div class="relative overflow-hidden">
            <img
                :src="item.image"
                alt="content"
                class="w-full h-[350px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-x-[-1]"
            />

            <!-- overlay -->
            <div
                class="flex absolute inset-0 items-end justify-center
                     md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style="background: linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0));"
            >
              <div class="text-white text-center px-4 pb-10">
                <h3 class="text-lg font-semibold mb-2">{{ item.name }}</h3>
                <p class="text-sm leading-relaxed">{{ item.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #title>
      <h1
          class="lg:pr-20 pr-4 text-right
        text-[28px] md:text-[30px] lg:ml-10 xl2:ml-[300px] mb-6 md:mb-0 font-light relative"
          ref="titleElement"
      >
        {{ t("performance_guarantee.title") }}
        <BackButton class="mt-3"/>
      </h1>
    </template>

    <template #backgroundAnimation>
      <CommonPageAboutBackground
          v-show="store.getContentLoad"
          ref="pageBackground"
      />
    </template>
  </NuxtLayout>
</template>

<script setup>
import {useI18n} from "vue-i18n";

definePageMeta({
  dataPage: "our-team",
});

useHead({
  meta: [{name: "robots", content: "noindex, nofollow"}],
});

import {useGlobalStore} from "~/stores/global.js";


const {t, locale} = useI18n()
const store = useGlobalStore();
const {endLoading} = store;

const isDataLoad = ref(false);
const hoverItemIndex = ref(null);

// import Milad from '~/assets/images/lined-paper.png'
import Milad from '~/assets/images/our-team/milad.png'
// دیتا برای اعضای تیم
const teamMembers = ref([
  {
    id: 1,
    name: "Milad Falahati",
    role: "CMO",
    image: Milad,
  },
  {
    id: 2,
    name: "Sara G.",
    role: "CEO",
    image: Milad,
  },
  {
    id: 3,
    name: "Ali Rezayi",
    role: "CTO",
    image: Milad,
  },
  {
    id: 4,
    name: "Niloofar A.",
    role: "Designer",
    image: Milad,
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
  title: "اعضای تیم ما",
  description: "اعضای تیم ما",
  keywords: "اعضای تیم ما",
});

onMounted(() => {
  setTimeout(() => {
    isDataLoad.value = true;
    endLoading();
  }, 100);
});
</script>
