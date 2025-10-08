<template>
  <NuxtLayout name="page">

    <template #content>
      <!-- main content  -->
      <div class="relative overflow-hidden min-h-screen px-4 lg:px-32 md:px-16">

      </div>
    </template>

    <template #title>
      <h1 class="lg:pr-20 pr-4 text-right
      lg:before:content-none lg:after:content-none before:content-['']
       before:left-0 before:bg-black-100/20 before:absolute before:bottom-0
       before:right-0 before:h-[1px] after:content-[''] after:w-[8vw]
       after:bg-black-900 after:absolute after:bottom-0 after:right-[80px] after:h-[1px]
       text-[40px] md:text-[45px] lg:ml-10 xl2:ml-[300px] mb-10 lg:mb-0 font-light"
          ref="titleElement">
        {{ t('about_us.title') }}
        <BackButton/>
      </h1>

    </template>

    <template #backgroundAnimation>
      <CommonPageAboutBackground v-if="store.getContentLoad"
                                 ref="pageBackground"/>
    </template>

  </NuxtLayout>

</template>

<script setup>
import {useI18n} from "vue-i18n";

definePageMeta({
  dataPage: 'about'
})

useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});

import {useGlobalStore} from "~/stores/global.js";
import {useContentAnimation} from "~/composables/useContentAnimation.js";

const {t , locale} = useI18n()

const {getLoading, getIsLoadingPlayed} = storeToRefs(useGlobalStore())

const store = useGlobalStore()

const {
  create: createContentAnimation,
  handle: handleAnimation,
  start: startContentAnimation
} = useContentAnimation()

const {endLoading} = useGlobalStore()



watch(getLoading, (value) => {
  if (!value) {
    initPage()
  }
})

// const section = ref(null)
// const showSection = ref(false)
const pageBackground = ref(null)
// const pageLine = ref(null)
// const pageHorizontalLine = ref(null)
// const pageScroll = ref(null)
// const contentLoad = ref(false)


useSeoMeta({
  title: 'درباره ما',
  description: 'درباره ما',
  keywords: 'درباره ما'
})

useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s',
})
const bodyElement = ref(null);
const actionElements = ref(null);
const titleElement = ref(null)
const subtitleElement = ref(null)


// Provide refs to layout
provide('contentRefs', {
  body: bodyElement,
  actions: actionElements,
  title: titleElement,
  subtitle: subtitleElement,
})

// const initContentAnimation = () => {
//   createContentAnimation(section.value, {
//     body: bodyElement.value,
//     actions: actionElements.value,
//     title: titleElement.value,
//     subtitle: subtitleElement.value,
//   })
//
//
// }


const startAllAnimation = () => {
  handleAnimation('play')
  pageBackground.value.start()
  // pageLine.value.start()
  // pageHorizontalLine.value.start()
  // pageScroll.value.start()


}
const createAllAnimation = () => {
  // initContentAnimation()
  pageBackground.value.create()

  // pageLine.value.create()
  // pageHorizontalLine.value.create()

  // pageScroll.value.create()
}

const initPage = () => {
  // contentLoad.value = true
  store.setContentLoad(true)
  setTimeout(() => {
    setTimeout(() => {
      // showSection.value = true
      setTimeout(() => {

        // pageLine.value.update(titleElement.value.offsetTop)
        // pageHorizontalLine.value.update(-50)

      }, 5)
    }, 5)

    setTimeout(() => {
      createAllAnimation()
      startAllAnimation()
    }, 1)

  }, 10)
}

let scrollTimeout = null
const handleScroll = (e) => {
  if (titleElement.value) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (titleElement.value.getBoundingClientRect().top < 0) {
        // pageLine.value.update(0)

      } else {
        // pageLine.value.update(titleElement.value.getBoundingClientRect().top)
      }
    }, 100);

  }
}
onMounted(() => {


  window.addEventListener('scroll', handleScroll)
  setTimeout(() => {
    endLoading()
  }, 100)


})


onBeforeUnmount(() => {
  handleAnimation("kill");
  window.removeEventListener('scroll', handleScroll)
})

// onBeforeRouteLeave(() => {


// showSection.value = false
// })

</script>