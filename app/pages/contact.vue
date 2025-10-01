<template>
  <NuxtLayout name="page">

    <template #content>
      <!-- main content  -->
      <div class="px-4 lg:px-32 md:px-16">
        <section>
          <h2 class="text-[30px] mb-3 text-center w-full font-light mt-10 lg:mt-0"
              ref="subtitleElement">
            {{ t('contact_us.subtitle') }}
          </h2>

          <div class="w-full lg:w-full  mb-[1.5em] text-[30px]"
               :class="(locale === 'en') && 'dir-ltr'"
               ref="bodyElement">
            <div class="text-[30px] dir-ltr text-center mb-20 font-thin">021 828 0000 1</div>
            <div class="flex flex-col gap-y-10">
              <div class="flex lg:flex-row flex-col">
                    <span :class="locale === 'en' ? 'mr-2' : 'ml-2'"
                        class="block text-[22px] font-light whitespace-nowrap lg:w-auto w-full"> {{
                        t('contact_us.addresses.0.title')
                      }}</span>
                <span class=" text-[20px] font-extralight w-full block"
                      :class="locale === 'fa' && '2xl:whitespace-nowrap'">
                {{  t('contact_us.addresses.0.description') }}
              </span>
              </div>
              <div class="flex lg:flex-row flex-col">
              <span  :class="locale === 'en' ? 'mr-2' : 'ml-2'"
                  class="text-[22px] font-light whitespace-nowrap text-right lg:w-auto w-full"> {{
                  t('contact_us.addresses.1.title')
                }}</span>
                <span class="iyXfanum text-[20px] font-extralight w-full block"
                      :class="locale === 'fa' && '2xl:whitespace-nowrap'">
                {{   t('contact_us.addresses.1.description') }}
              </span>
              </div>
              <div class="flex lg:flex-row flex-col">
                <span  :class="locale === 'en' ? 'mr-2' : 'ml-2'"
                       class="text-[22px] font-light whitespace-nowrap lg:w-auto w-full">{{
                    t('contact_us.addresses.2.title')
                  }}</span>
                <span class="iyXfanum text-[20px] font-extralight w-full block"
                      :class="locale === 'fa' && '2xl:whitespace-nowrap'">
                  {{ t('contact_us.addresses.2.description') }}
                </span>
              </div>
            </div>
          </div>
        </section>

      </div>

      <section
          class="px-4 font-['Atlas'] md:px-28 2xl:px-44 xl:px-32 lg:px-16 relative grid grid-cols-3 lg:flex-row flex-col gap-y-3 mb-6 lg:justify-end dir-ltr text-[12px] lg:mt-44 mt-10"
          ref="actionElements">
        <!--        <a class="w-full lg:col-span-1 col-span-3 font-light before:font-light after:font-light align-middle text-[12px] before:w-[5vw] lg:before:w-[2vw] before:mr-[1vw] after:ml-[3vw] after:origin-left-top after:scale-x-0 origin-[left_top] uppercase transition-transform  before:content-[''] before:inline-block before:h-[1px] before:bg-current before:transition-transform
                                after:content-[''] after:inline-block  after:w-[5vw] after:h-[1px] after:bg-current after:transition-transform "
                   href="#">whatsapp</a>-->
        <span class="w-full lg:col-span-1  col-span-3 font-light uppercase text-[12px]  "
        >
          <div class="relative inline-block group">

            <span
                class="before:content-[''] before:inline-block before:w-[2vw] before:h-[0.5px] before:mb-0.5 before:align-middle before:bg-current before:transition-transform before:duration-300 before:mr-2 before:origin-left group-hover:before:scale-x-0 group-hover:before:-translate-x-[50%]"></span>

            <!-- متن شما -->
            <span
                class="inline-block transition-transform duration-300 group-hover:-translate-x-[50%]">whatsapp</span>

            <!-- خط سمت راست -->
            <span
                class="after:content-[''] after:inline-block after:w-[2vw] after:h-[0.5px] after:mb-0.5 after:align-middle after:bg-current after:transition-transform after:duration-300 after:ml-1 after:origin-left-top after:scale-x-0 group-hover:after:scale-x-100 group-hover:after:-translate-x-[50%]"></span>
          </div>


        </span>
        <a class="w-full lg:col-span-1  col-span-3 font-light uppercase text-[12px]  "
           href="https://www.instagram.com/pardadgroup?igsh=MTc3Y3RrbmVtcHR5aA==" target="_blank">
          <div class="relative inline-block group">

            <span
                class="before:content-[''] before:inline-block before:w-[2vw] before:h-[0.5px]  before:mb-0.5 before:align-middle before:bg-current before:transition-transform before:duration-300 before:mr-2 before:origin-left group-hover:before:scale-x-0 group-hover:before:-translate-x-[50%]"></span>

            <!-- متن شما -->
            <span
                class="inline-block transition-transform duration-300 group-hover:-translate-x-[50%]">instagram</span>

            <!-- خط سمت راست -->
            <span
                class="after:content-[''] after:inline-block after:w-[2vw] after:h-[0.5px]  after:mb-0.5  after:align-middle after:bg-current after:transition-transform after:duration-300 after:ml-1 after:origin-left-top after:scale-x-0 group-hover:after:scale-x-100 group-hover:after:-translate-x-[50%]"></span>
          </div>


        </a>
        <a class="w-full lg:col-span-1  col-span-4 font-light uppercase text-[12px]  "
           href="mailto:sales@pardad.team">
          <div class="relative inline-block group">

            <span
                class="before:content-[''] before:inline-block before:w-[2vw] before:h-[0.5px] before:mb-0.5 before:align-middle before:bg-current before:transition-transform before:duration-300 before:mr-2 before:origin-left group-hover:before:scale-x-0 group-hover:before:-translate-x-[50%]"></span>

            <!-- متن شما -->
            <span class="inline-block transition-transform duration-300 group-hover:-translate-x-[30%]">Sales@pardad.team</span>

            <!-- خط سمت راست -->
            <span
                class="after:content-[''] after:inline-block after:w-[2vw] after:h-[0.5px] after:mb-0.5 after:align-middle after:bg-current after:transition-transform after:duration-300 after:ml-0 after:origin-left-top after:scale-x-0 group-hover:after:scale-x-100 group-hover:after:-translate-x-[50%]"></span>
          </div>


        </a>
        <span class="w-full lg:col-span-1  col-span-3 font-light uppercase text-[12px]  "
        >
          <div class="relative inline-block group">

            <span
                class="before:content-[''] before:inline-block before:w-[2vw] before:h-[0.5px] before:mb-0.5 before:align-middle before:bg-current before:transition-transform before:duration-300 before:mr-2 before:origin-left group-hover:before:scale-x-0 group-hover:before:-translate-x-[50%]"></span>

            <!-- متن شما -->
            <span
                class="inline-block transition-transform duration-300 group-hover:-translate-x-[50%]">facebook</span>

            <!-- خط سمت راست -->
            <span
                class="after:content-[''] after:inline-block after:w-[2vw] after:h-[0.5px] after:mb-0.5 after:align-middle after:bg-current after:transition-transform after:duration-300 after:ml-1 after:origin-left-top after:scale-x-0 group-hover:after:scale-x-100 group-hover:after:-translate-x-[50%]"></span>
          </div>


        </span>
        <a class="w-full lg:col-span-1  col-span-3 font-light uppercase text-[12px]  "
           href="https://www.linkedin.com/company/pardad-group/" target="_blank">
          <div class="relative inline-block group">

            <span
                class="before:content-[''] before:inline-block before:w-[2vw] before:h-[0.5px] before:mb-0.5 before:align-middle before:bg-current before:transition-transform before:duration-300 before:mr-2 before:origin-left group-hover:before:scale-x-0 group-hover:before:-translate-x-[50%]"></span>

            <!-- متن شما -->
            <span
                class="inline-block transition-transform duration-300 group-hover:-translate-x-[50%]">linkedin</span>

            <!-- خط سمت راست -->
            <span
                class="after:content-[''] after:inline-block after:w-[2vw] after:h-[0.5px] after:mb-0.5 after:align-middle after:bg-current after:transition-transform after:duration-300 after:ml-1 after:origin-left-top after:scale-x-0 group-hover:after:scale-x-100 group-hover:after:-translate-x-[50%]"></span>
          </div>


        </a>

      </section>


      <section class="py-[10%] md:px-40 px-4">
        <div class="flex justify-center lg:justify-end w-full ml-24">

          <a referrerpolicy='origin'
             target='_blank'
             href='https://trustseal.enamad.ir/?id=545726&Code=xkKYdC3wAEnhMzC2pLc6I06OpDdOG9J7'>
            <img
                referrerpolicy='origin'
                src='https://trustseal.enamad.ir/logo.aspx?id=545726&Code=xkKYdC3wAEnhMzC2pLc6I06OpDdOG9J7'
                alt=''
                class="cursor-pointer"
                code='xkKYdC3wAEnhMzC2pLc6I06OpDdOG9J7'>
          </a>
        </div>
      </section>
    </template>

    <template #title>
      <h1 class="lg:pr-20 pr-4 text-right
      lg:before:content-none lg:after:content-none before:content-['']
       before:left-0 before:bg-black-100/20 before:absolute before:bottom-0
       before:right-0 before:h-[1px] after:content-[''] after:w-[8vw]
       after:bg-black-900 after:absolute after:bottom-0 after:right-[80px] after:h-[1px]
       text-[40px] md:text-[45px] lg:ml-10 xl2:ml-[300px] mb-10 lg:mb-0 font-light"
          ref="titleElement">
        <BackButton/>
        {{
          t('contact_us.title')
        }}
      </h1>

    </template>

    <template #backgroundAnimation>
      <CommonPageContactBackground ref="pageBackground" v-if="store.getContentLoad"/>
    </template>

  </NuxtLayout>

</template>

<script setup>
import {useI18n} from "vue-i18n";

definePageMeta({
  dataPage: 'contact'
})


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
  title: 'تماس با ما',
  description: 'تماس با ما',
  keywords: 'تماس با ما'
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


<style scoped>


</style>
