<template>
  <div class="flex items-center">

    <button
        v-for="(item, index) in locales"
        :key="index"
        @click="changeLocale(item)"
        class="transition-colors duration-200 text-black-60 hover:opacity-60 flex mt-[3px]"
    >
      <span
          :class="[
          locale === item.code ? 'text-black' : 'text-gray-500',
          'lg:text-xs text-xs'
        ]"
      >
        {{ item.code.toUpperCase() }}
      </span>
      <span
          v-if="index < locales.length - 1"
          class="text-gray-500 mx-1 lg:text-xs text-xs"
      >
        /
      </span>
    </button>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useGlobalStore} from '~/stores/global'
import {setAppLocale} from '~/services/preference'


const {locale,locales, setLocale} = useI18n()
const store = useGlobalStore()


const def = useCookie('lang')
// reactive state
const language = ref(def.value)



// set locale
const changeLocale = async (lang) => {

  language.value = lang.code
  locale.value = lang.code

  store.setLocale(lang.code)
  setAppLocale(lang.code)
  await setLocale(lang.code)
}

onMounted(() => {
  language.value = def.value
})
</script>
