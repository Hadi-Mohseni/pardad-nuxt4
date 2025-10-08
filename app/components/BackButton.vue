<template>
  <button @click="goBack"
          class="flex items-center">
<!--    <svg class="w-4 h-4"-->
<!--         viewBox="0 0 24 24"-->
<!--         xmlns="http://www.w3.org/2000/svg"-->
<!--         fill="none">-->
<!--      <path stroke="#950000"-->
<!--            stroke-linecap="round"-->
<!--            stroke-linejoin="round"-->
<!--            stroke-width="2"-->
<!--            d="m5 12 6-6m-6 6 6 6m-6-6h14"/>-->
<!--    </svg>-->
    <span class="text-sm text-gray-500">{{t('back')}}</span>
  </button>
</template>

<script setup>
import {useRouter} from 'vue-router'
const {t} = useI18n()
const router = useRouter()

const goBack = () => {
  // If the user has a previous page in history
  if (window.history.state.back) {
    router.back()
  } else {
    // No previous page, redirect to home
    router.push('/')
  }
}
</script>
