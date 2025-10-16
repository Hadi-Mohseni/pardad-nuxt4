<template>

    <div class="hidden lg:flex min-w-max  gap-x-8 lg:leading-[41px] lg:uppercase lg:text-[14px]   lg:z-3 " :class="[locale === 'en' ? '-mt-[0px]' : '-mt-[8px]']">
        <nuxt-link v-show="getShowContactNav" :to="{ name: 'contact' }" class=" cubic-animation relative group origin-top-left"
            :class="[locale === 'en' ? 'text-xs 2xl:text-sm' : 'text-base 2xl:text-base']">
            <span class="relative z-10 h-full flex items-center">{{ t('contact_us.title') }}</span>
            <span class="absolute left-0 bottom-0 h-[1px] w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </nuxt-link>
        <nuxt-link :to="{ name: 'blog' }" class=" cubic-animation relative group origin-top-left " :class="[locale === 'en' ? 'text-xs 2xl:text-sm' : 'text-base 2xl:text-base']">
            <span class="relative z-10 h-full flex items-center">{{ t('blog') }}</span>
            <span class="absolute left-0 bottom-0 h-[1px] w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </nuxt-link>
        <nuxt-link :to="{ name: 'product' }" class=" cubic-animation relative group origin-top-left " :class="[locale === 'en' ? 'text-xs 2xl:text-sm' : 'text-base 2xl:text-base']">
            <span class="relative z-10 h-full flex items-center">{{ t('menuItems.product') }}</span>
            <span class="absolute left-0 bottom-0 h-[1px] w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
        </nuxt-link>
        <SwitchLanguage />
    </div>

</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGlobalStore } from "~/stores/global";
import SwitchLanguage from "~/components/SwitchLanguage.vue";


const { t, locale } = useI18n()
const { getShowContactNav, getLoading } = storeToRefs((useGlobalStore()))

</script>