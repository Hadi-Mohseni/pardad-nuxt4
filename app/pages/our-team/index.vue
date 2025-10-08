<template>
  <NuxtLayout name="page">
    <template #content>
      <!-- main content -->
      <div
          v-if="isDataLoad"
          class="relative overflow-hidden min-h-screen px-4 lg:px-32 md:px-16 flex flex-col lg:flex-row"
      >
        <!-- اعضای تیم -->
        <div
            v-for="(member, index) in teamMembers"
            :key="member.id"
            @mouseover="hoverItemIndex = index"
            @mouseleave="hoverItemIndex = null"
            class="transition-all duration-700 flex-shrink-0 flex items-center justify-center relative cursor-pointer
          border-[#E5E5E5]"
            :class="[
            index !== teamMembers.length - 1 && 'lg:border-l',
            hoverItemIndex === index
              ? 'lg:basis-[34%]'
              : hoverItemIndex !== null
              ? 'lg:basis-[22%]'
              : 'lg:basis-[25%]',
            'w-full h-[400px] lg:h-[calc(100vh-120px)]'
          ]"
        >
          <!-- تصویر -->
          <img
              :src="member.image"
              alt="member"
              class="object-cover h-full transition-transform duration-700"
              :class="hoverItemIndex === index ? 'scale-110' : 'scale-100'"
          />

          <!-- متن معرفی -->
          <div
              class="absolute bottom-6 left-6 text-white opacity-0 transition-opacity duration-700"
              :class="hoverItemIndex === index ? 'opacity-100' : 'opacity-0'"
          >
            <h3 class="text-xl font-semibold">{{ member.name }}</h3>
            <p class="text-sm">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </template>

    <template #title>
      <h1
          class="lg:pr-20 pr-4 text-right
        text-[40px] md:text-[45px] lg:ml-10 xl2:ml-[300px] mb-10 lg:mb-0 font-light relative"
          ref="titleElement"
      >
        {{ t("our_team.title") }}
        <BackButton />
      </h1>
    </template>

    <template #backgroundAnimation>
      <CommonPageAboutBackground
          v-if="store.getContentLoad"
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
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

import { useGlobalStore } from "~/stores/global.js";


const {t , locale} = useI18n()
const store = useGlobalStore();
const { endLoading } = store;

const isDataLoad = ref(false);
const hoverItemIndex = ref(null);

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
