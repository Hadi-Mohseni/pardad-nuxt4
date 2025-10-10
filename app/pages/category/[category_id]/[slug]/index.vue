<template>
  <div v-show="showSection"
       ref="section"
       class="relative"
       data-page="contact"
       data-color="light"
  >
    <div class="relative grid grid-cols-9 w-full h-full lg:pt-[300px] pt-[150px]">
      <div class="lg:col-span-6 col-span-9  pt-0 order-2 lg:order-1 ">
        <div class="px-4 lg:px-32 md:px-16">
          <section>
            <h2 class="text-base lg:text-[30px] mb-3 text-center w-full font-light"
                ref="subtitleElement">
              {{ response.subtitle }}
            </h2>

            <div class="w-full lg:w-full  mb-[1.5em] "
                 ref="bodyElement">
              <div v-if="response.description"
                   class="sm:text-sm lg:text-[16px] description"
                   v-html="response.description"
              >
              </div>
            </div>
          </section>

        </div>

      </div>
      <div class="lg:col-span-3 col-span-9 pt-[300px] order-1 lg:order-2 relative ">
        <h1 class="lg:pr-4 md:pr-20 pr-4 text-right
      lg:before:content-none lg:after:content-none before:content-['']
       before:left-0 before:bg-black-100/20 before:absolute before:bottom-0
       before:right-0 before:h-[1px] after:content-[''] after:w-[8vw]
       after:bg-black-900 after:absolute after:bottom-0 after:right-[80px] after:h-[1px]
       text-[40px] lg:ml-10 xl2:ml-[300px] mb-10 lg:mb-0 font-light"
            ref="titleElement">{{response.subtitle}}
        </h1>

        <CommonHorizontalLine class="lg:hidden flex " ref="pageHorizontalLine" :element="titleElement" v-if="contentLoad"/>
      </div>
    </div>
    <div  class="container mx-auto px-4 mt-24 overflow-hidden  justify-center items-center w-full relative hidden lg:flex ">
      <div ref="sliders" class="w-[85%] lg:w-10/12 relative -mb-[110px]  h-auto m-auto ">

        <MainSlider v-if="!mobileView" @selected-slider="selectItemFunc"   height="h-[360px] lg:h-[400px]" ref="slider_lg" :items="sliderItems"  route-name="main"></MainSlider>


      </div>
      <MainSliderArrow v-if="sliderItems.length > 0" class="absolute  right-24 top-0 bottom-0 justify-center items-center gap-y-10 flex-col hidden lg:flex -mb-[60px]" @click-arrow="selectArrow"/>
    </div>
    <div  v-if="mobileView" class="h-screen overflow-hidden ">
      <div ref="sliderSection" class="w-full mx-auto mt-[75px] px-4 h-screen flex items-center justify-center lg:hidden relative ">
        <div  ref="sliders" class="w-[85%] lg:w-10/12 relative h-auto m-auto">
          <MainSlider v-if="mobileView" @selected-slider="selectItemFunc"   height="h-[360px] lg:h-[400px]" ref="slider_mb" :items="sliderItems"  route-name="blog" :show-description="false" ></MainSlider>
        </div>
      </div>
    </div>
    <!-- main content  -->

    <CommonLine class="hidden lg:flex" ref="pageLine" :element="titleElement" v-if="contentLoad"/>
    <CommonScroll ref="pageScroll" :changeScroll="true" v-if="contentLoad"/>
  </div>

</template>


<script setup>

import {useGlobalStore} from "~/stores/global";
import {storeToRefs} from 'pinia'
import {useRoute, useError, useRouter, useFetch} from "#app";
import {useContentAnimation} from "~/composables/useContentAnimation.js";

const {
  create: createContentAnimation,
  handle: handleAnimation,
  start: startAnimation
} = useContentAnimation()

const {endLoading} = useGlobalStore()

useHead({
  titleTemplate: '%s',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});


const {getLoading, getIsLoadingPlayed, themeObj} = storeToRefs(useGlobalStore())


const response = ref({})


const selectedItemID = ref(0)

const sliderItems = ref([])

const sections = ref()
const section = ref()

const slider_lg = ref()
const slider_mb = ref()
const sliders = ref()
const sliderSection = ref()
const bodyElement = ref(null);
const isStartAnimation = ref(false);
const pageLine = ref(null)
const pageHorizontalLine = ref(null)
const pageScroll = ref(null)

const route = useRoute()
const router = useRouter()


const colors = useBlogColor()

const showArrow = ref(false)

const mobileView = ref(false)

const showPage = ref(false)
const showSection = ref(false)

const titleElement = ref(null)
const subtitleElement = ref(null)
const contentLoad = ref(false)


const config = useRuntimeConfig()


const initContentAnimation = () => {
  createContentAnimation(section.value, {
    body: bodyElement.value,
    title: titleElement.value,
    subtitle: subtitleElement.value,
  })


}


const startAllAnimation = () => {
  handleAnimation('play')
  pageLine.value.start()
  pageHorizontalLine.value.start()
  pageScroll.value.start()

}
const createAllAnimation = () => {
  initContentAnimation()

  pageLine.value.create()
  pageHorizontalLine.value.create()

  pageScroll.value.create()
}


const initData = (data) => {
  response.value = data

}

const initSubData = (value) => {


  sliderItems.value = value.data
  if (sliderItems.value && sliderItems.value.length > 0) {
    sliderItems.value = value.data.map((item, index) => {
      item.bgColor = colors[index]?.bg
      item.txtColor = colors[index]?.color
      item.themeColor = colors[index]?.theme
      return item
    })
  }


}


const initPage = () => {
  contentLoad.value = true
  setTimeout(() => {
    setTimeout(()=>{
      showSection.value = true
      setTimeout(()=>{
        pageLine.value.update(titleElement.value.offsetTop)
        pageHorizontalLine.value.update(-50)
      },5)
    },5)

    setTimeout(()=>{
      createAllAnimation()
      startAllAnimation()
    },1)

  }, 10)
}

let scrollTimeout =  null
const handleScroll = (e)=>{
  if(titleElement.value){
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if(titleElement.value.getBoundingClientRect().top < 0){
        pageLine.value.update(0)

      }else{
        pageLine.value.update(titleElement.value.getBoundingClientRect().top)
      }
    }, 100);

  }
}
const dataFetched = (value) => {
  initData(value)
  setTimeout(() => {
    endLoading()
  }, 10)


}


const selectItemFunc = (id) => {
  selectedItemID.value = id
}
const selectArrow = (value) => {
  if (value === 'next') {
    slider_lg.value.nextSlideFunc()
    return
  }
  slider_lg.value.prevSlideFunc()

}

const {data} = await useAsyncData(
    'category-id',
    () => useApi(`/api/category/${route.params.category_id}`,{

    })
)
const {data: subCat} = await useAsyncData(
    'sub-cat-list',
    () => useApi(`/api/sub-category/list/${route.params.category_id}`,{

    })
)


if (data.value) {

  useSeoMeta({
    title: data.value.title,
    ogTitle: data.value.title,
    description: data.value.description,
    ogDescription: data.value.description,
  })
  dataFetched(data.value)
}
if (subCat.value) {
  initSubData(subCat.value)

}


const checkResize = ($event) => {
  if ($event.target.innerWidth && $event.target.innerWidth < 1024) {
    mobileView.value = true
  } else {
    mobileView.value = false
  }

}


watch(getLoading, (value) => {

  if (!value) {
    initPage()
  }
})

onMounted(() => {

  window.addEventListener("resize", checkResize)
  window.addEventListener("scroll", handleScroll)
  if (window.innerWidth < 1024) {
    mobileView.value = true
  }
  showPage.value = true
})

onBeforeUnmount(()=>{
  window.removeEventListener("scroll", handleScroll)
  window.removeEventListener("resize", checkResize)
})


</script>


<style scoped>


</style>