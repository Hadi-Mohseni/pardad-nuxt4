<template>

  <div class="hidden lg:flex min-w-max  gap-x-8 lg:leading-[41px] lg:uppercase lg:text-[14px]  lg:z-3 ">
    <nuxt-link v-show="getShowContactNav && !getLoading"
               :to="{name:'contact'}"
               class=" cubic-animation relative group origin-top-left text-[14px] 2xl:text-[16px]">
      <span class="relative z-10">{{ t('contact_us.title') }}</span>
      <span class="absolute left-0 bottom-0 h-[1px] w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
    </nuxt-link>
    <nuxt-link v-show="!getLoading"
               :to="{name:'category'}"
               class=" cubic-animation relative group origin-top-left text-[14px] 2xl:text-[16px]">
      <span class="relative z-10">{{t('blog')}}</span>
      <span class="absolute left-0 bottom-0 h-[1px] w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
    </nuxt-link>
    <SwitchLanguage/>
  </div>

</template>

<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useGlobalStore} from "~/stores/global";
import SwitchLanguage from "~/components/SwitchLanguage.vue";
import {useI18n} from 'vue-i18n'

const {t} = useI18n()
const {getShowContactNav, getLoading} = storeToRefs((useGlobalStore()))

</script>