<template>


  <div dir="rtl" class="relative">


    <div v-show="showSection"
         ref="section"
         class="relative grid grid-cols-9 w-full h-full "
         :data-page="pageMeta?.dataPage"
         data-color="light"
    >
      <div class="lg:col-span-6 col-span-9 lg:pt-[200px] pt-0 order-2 lg:order-1">
        <slot name="content"/>
      </div>
      <div class="lg:col-span-3 col-span-9 pt-[300px] order-1 lg:order-2 relative">
        <slot name="title"></slot>
        {{getLoading}}

        <CommonHorizontalLine v-if="store.getContentLoad"
                              class="lg:hidden flex"
                              ref="pageHorizontalLine"
                              :element="contentRefs.mobileTitle?.value"/>
      </div>
      <slot name="backgroundAnimation"></slot>
      <CommonLine v-if="store.getContentLoad"
                  class="hidden lg:flex"
                  ref="pageLine"
                  :element="contentRefs.title?.value"/>
      <CommonScroll v-if="store.getContentLoad && hasScroll"
                    ref="pageScroll"
                    :changeScroll="true"/>
    </div>
  </div>

</template>

<script setup>
import {useGlobalStore} from "~/stores/global.js";
import {useContentAnimation} from "~/composables/useContentAnimation.js";
import {useRoute} from 'vue-router'

const store = useGlobalStore()

const pageMeta = useRoute().meta;
useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s',
})

const {getLoading, getIsLoadingPlayed} = storeToRefs(useGlobalStore())


const {
  create: createContentAnimation,
  handle: handleAnimation,
  start: startContentAnimation
} = useContentAnimation()

const {endLoading} = useGlobalStore()
const colorMode = useColorMode()
colorMode.value = 'light'


watch(getLoading, (value) => {
  if (!value) {
    initPage()
  }
})

const section = ref(null)
const showSection = ref(false)
// const pageBackground = ref(null)
const pageLine = ref(null)
const pageHorizontalLine = ref(null)
const pageScroll = ref(null)
// const contentLoad = ref(false)

const bodyElement = ref(null);
const actionElements = ref(null);
// const titleElement = ref(null)
const subtitleElement = ref(null)

const contentRefs = inject('contentRefs')
const hasScroll = contentRefs.hasScroll ?? true


const initContentAnimation = () => {

  if (section.value && contentRefs?.body?.value) {
    createContentAnimation(section.value, {
      body: contentRefs.body.value,
      actions: contentRefs.actions?.value,
      title: contentRefs.title?.value,
      subtitle: contentRefs.subtitle?.value,
      mobileTitle: contentRefs.mobileTitle?.value,
    })
  }

}


const startAllAnimation = () => {

  handleAnimation('play')
  // pageBackground.value.start()
  pageLine.value.start()
  pageHorizontalLine.value.start()
  if(hasScroll){
    pageScroll.value.start()
  }



}
const createAllAnimation = () => {
  initContentAnimation()
  if(pageLine.value){
    pageLine.value.create()
  }
  if(pageHorizontalLine.value){
    pageHorizontalLine.value.create()
  }



  // pageBackground.value.create()


  if(hasScroll){
    pageScroll.value.create()
  }

}

const initPage = () => {
  // contentLoad.value = true
  store.setContentLoad(true)
  setTimeout(() => {
    setTimeout(() => {
      showSection.value = true
      setTimeout(() => {

        pageLine.value.update(contentRefs.title?.value.offsetTop)
        pageHorizontalLine.value.update(-50)

      }, 5)
    }, 5)

    setTimeout(() => {
      createAllAnimation()
      startAllAnimation()
    }, 5)

  }, 10)
}

let scrollTimeout = null
const handleScroll = (e) => {
  if (contentRefs.title?.value) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (contentRefs.title?.value?.getBoundingClientRect().top < 0) {
        pageLine.value.update(0)

      } else {
        if( pageLine.value){
          pageLine.value.update(contentRefs.title?.value?.getBoundingClientRect().top)
        }

      }
    }, 100);

  }
}
onMounted(() => {



  window.addEventListener('scroll', handleScroll)
 /* setTimeout(() => {
    endLoading()
  }, 100)*/


})


onBeforeUnmount(() => {
  handleAnimation("kill");
  window.removeEventListener('scroll', handleScroll)
})
onBeforeRouteLeave(() => {


  showSection.value = false
})
onUnmounted(() => {
});

</script>


<style scoped>


</style>
