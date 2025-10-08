<template>
  <div dir="rtl" class="relative">

    <div
        v-show="getContentLoad"
        dir="rtl"
        ref="section"
        class="relative grid grid-cols-9 w-full min-h-screen h-full bg-gradient-to-b from-[#D3D3D3]  to-[#F4F4F4]"
        :data-page="pageMeta?.dataPage"
        data-color="light"
    >
      <div class="lg:col-span-6 col-span-9  pt-0 order-2 lg:order-1">
        <Transition
            :name="transitionName"
            :mode="transitionMode"

        >
          <div  class="w-full h-full">
            <slot />
          </div>
        </Transition>
      </div>
      <div class="lg:col-span-3 col-span-9 pt-[300px] order-1 lg:order-2 relative">

        <div  class="fixed hidden h-screen  text-[25px]  lg:flex flex-col gap-y-8 pr-4 transition-all">

          <h1
              class="transition-colors duration-300 cursor-pointer text-right tracking-tighter
        lg:tracking-normal lg:before:content-none lg:after:content-none before:content-['']
        before:left-0 before:bg-black-100/20 before:absolute before:bottom-0 before:right-0 before:h-[1px]
        after:content-[''] after:w-[8vw] after:bg-black-900 after:absolute after:bottom-0 after:right-[80px]
         after:h-[1px] lg:ml-10 xl2:ml-[300px] "
              ref="titleElement"
          >

            {{ getLayoutData.title }}
            <BackButton/>
          </h1>

        </div>
        <div  class="lg:hidden flex">
          <h1 class="lg:pr-4 md:pr-20 pr-4 text-right pb-5 tracking-tighter
        lg:tracking-normal lg:pb-10 lg:before:content-none lg:after:content-none before:content-['']
        before:left-0 before:bg-black-100/20 before:absolute before:bottom-0 before:right-0 before:h-[1px]
        after:content-[''] after:w-[8vw] after:bg-black-900 after:absolute after:bottom-0 after:right-[80px]
         after:h-[1px] text-[23px] lg:text-[40px] lg:ml-10 xl2:ml-[300px]  lg:mb-0 font-medium text-black"
              ref="mobileTitle"
          >

           {{getLayoutData.title}}
          </h1>
        </div>



        <CommonHorizontalLine
            class="lg:hidden flex"
            ref="pageHorizontalLine"
            v-if="getContentLoad"
            :element="mobileTitle"/>
        <CommonLine
            v-if="getContentLoad"
            class="hidden lg:flex"
            ref="pageLine"
            :element="titleElement"/>



      </div>


    </div>
  </div>

</template>

<script setup>
import {useGlobalStore} from "~/stores/global.js";
import {useContentAnimation} from "~/composables/useContentAnimation.js";
import {useRoute} from 'vue-router'

const store = useGlobalStore()

useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s',
})

const pageMeta = useRoute().meta;

const route = useRoute()
const {getLoading,getContentLoad, getIsLoadingPlayed , getLayoutData} = storeToRefs(useGlobalStore())
const {setMainLoading , setShowLogo , startLoading } = useGlobalStore()
const router = useRouter()
const transitionName = ref('page-transition')
const transitionMode = ref('out-in')
const titleElement = ref()
const mobileTitle = ref()

const {
  create: createContentAnimation,
  handle: handleAnimation,
  start: startContentAnimation
} = useContentAnimation()
// تشخیص مسیر حرکت (به جلو یا عقب)


// برای ذخیره‌ی عمق مسیر قبلی





/*watch(getLoading, (value) => {
  if (!value) {
    initPage()
  }
})*/

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
const {endLoading} = useGlobalStore()


const hasScroll = false


const initContentAnimation = () => {

  if (section.value)
  {

    createContentAnimation(section.value, {

      title: titleElement?.value,
      mobileTitle: mobileTitle?.value,
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
        pageLine.value.update(titleElement?.value.getBoundingClientRect().top - 77)
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
  if (titleElement?.value) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (titleElement?.value?.getBoundingClientRect().top < 0) {
        pageLine.value.update(0)

      } else {
        pageLine.value.update(titleElement?.value?.getBoundingClientRect().top)
      }
    }, 100);

  }
}


onMounted(() => {


  let prevPosition =  0

  router.beforeEach((to, from, next) => {
    const currentPosition = window.history.state?.position || 0


    if (currentPosition < prevPosition) {
      transitionName.value = 'page-transition-back'
    } else {
      transitionName.value = 'page-transition'
    }

    prevPosition = currentPosition
    next()
  })

  window.addEventListener('scroll', handleScroll)

  startLoading()
  setTimeout(()=>{
    setShowLogo(true)
    setMainLoading(false)
    setTimeout(()=>{
      initPage()
    },50)
  },100)

})


onBeforeUnmount(() => {
  handleAnimation("kill");
  window.removeEventListener('scroll', handleScroll)
})
onBeforeRouteLeave(() => {



})
onUnmounted(() => {
});

</script>


<style scoped>
/* انیمیشن برای رفتن به صفحه بعد */
.page-transition-enter-active {
  transition: all 0.7s ease-in-out;

}

.page-transition-leave-active {
  transition: all 0.7s ease-in-out;

}

/* وقتی صفحه جدید وارد می‌شود (از پایین به بالا) */
.page-transition-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.page-transition-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* وقتی صفحه فعلی خارج می‌شود (به بالا می‌رود) */
.page-transition-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}






/* انیمیشن برای برگشت به صفحه قبلی (وقتی Back می‌زنیم) */
.page-transition-back-enter-active,
.page-transition-back-leave-active {
  transition: all 0.7s ease-in-out;
}

/* وقتی صفحه قبلی وارد می‌شود — از پایین بیاید بالا */
.page-transition-back-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
.page-transition-back-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* وقتی صفحه فعلی خارج می‌شود — به بالا می‌رود */
.page-transition-back-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.page-transition-back-leave-to {
  opacity: 0;
  transform: translateY(100%);
}


</style>
