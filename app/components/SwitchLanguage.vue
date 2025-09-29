<template>
  <div class="flex items-center">
    <button
        v-for="(item, index) in languages"
        :key="index"
        @click="setLocale(item.value)"
        class="transition-colors duration-200 text-black-60 hover:opacity-60 flex"
    >
      <span
          :class="[
          language === item.value ? 'font-bold text-black' : 'text-gray-500',
          'lg:text-sm text-xs'
        ]"
      >
        {{ item.short }}
      </span>
      <span
          v-if="index < languages.length - 1"
          class="text-gray-500 mx-1 lg:text-sm text-xs"
      >
        /
      </span>
    </button>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useGlobalStore} from '~/stores/global'
import {useI18n} from 'vue-i18n'
import {setAppLocale} from '~/services/preference'

const {locale} = useI18n()
const store = useGlobalStore()

// reactive state
const language = ref(locale.value)

// language options (short labels for UI)
const languages = ref([
  {value: 'ar', label: 'Arabic', short: 'AR'},
  {value: 'en', label: 'English', short: 'EN'},
  {value: 'fa', label: 'Farsi', short: 'FA'}
])

// set locale
const setLocale = (lang) => {
  language.value = lang
  locale.value = lang
  store.setLocale(lang)
  setAppLocale(lang)
}

onMounted(() => {
  language.value = locale.value
})
</script>
