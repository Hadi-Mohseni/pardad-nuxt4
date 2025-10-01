<template>

    <div class="fixed  left-[4vw] top-[55vh] h-[34vh]" ref="loadingLineWrap">
      <div class="w-px relative " ref="loadingLine">
        <div class="absolute left-0 right-0 h-full  bottom-0 bg-[#e1e1e1]" ref="loadingBackground"></div>
        <div class="absolute left-0 right-0 h-full  bottom-0 bg-[#363d46]"  ref="loadingProgress"></div>
      </div>
    </div>

</template>
<script setup>
import {useGlobalStore} from "~/stores/global.js";
import {nextTick} from "vue";

const {setMainLoading, setShowLogo, startLoading, endLoading} = useGlobalStore()

const {getLoading, getLoadingStart, getLoadingEnd} = storeToRefs(useGlobalStore())


const progress = ref(0)
const mainLogo = ref(null)
let progressTween = ''
let timeline = ''
let isComplete = false
const defaultStepOnline = ref(0.7);

const defaultSpeedOnline = ref(1);

const defaultSpeedSubLine = ref(0.4);


const loadingLineWrap = ref(null)

const loadingLine = ref(null)

const loadingBackground = ref(null)

const loadingProgress = ref(null)


watch(() => getLoadingStart.value, (v) => {
  if (v) {
    animateSubLine()

  }
})
watch(() => getLoadingEnd.value, async (v) => {
  if (v) {
    animateOnLineFull()
  }
})



const animateSubLine = (speed = defaultSpeedSubLine.value) => {
  progress.value = 0
  isComplete = false

  if (loadingLineWrap.value && loadingLineWrap.value.style) {
    loadingLineWrap.value.style.display = "flex"
    loadingLineWrap.value.style.visibility = "inherit"
  }

  timeline = new TimelineLite()

  // همیشه از پایین شروع کنن
  timeline.set([loadingBackground.value, loadingProgress.value], {
    transformOrigin: "bottom center",
    scaleY: 0
  })

  // ۱) اول بک‌گراند از پایین تا 100% پر بشه
  timeline.to(loadingBackground.value, speed, {
    scaleY: 1,
    ease: Power3.easeOut
  })

  // ۲) بعد با کمی فاصله پروگرس شروع کنه درصدی پر بشه
  timeline.to(loadingProgress.value, defaultSpeedOnline.value, {
    scaleY: defaultStepOnline.value, // مثلاً 0.7 = 70٪
    ease: Power2.easeInOut
  }, "-=0.3") // کمی overlap برای حس روان
}


const animateFinish = (speed) => {
  const tl = new TimelineLite()

  // مبدا همه scale ها از پایین باشه
  tl.set([loadingProgress.value, loadingBackground.value], { transformOrigin: "top center" })

  // مرحله ۱: جمع شدن از پایین
  tl.to([loadingProgress.value, loadingBackground.value], speed, {
    scaleY: 0,
    ease: Power3.easeInOut
  }, 0)

  // مرحله ۲: بعد کل خط (قاب) بره بالا
  tl.to(loadingLine.value, speed, {
    yPercent: -100,
    ease: Power3.easeInOut,
    onComplete: onAnimateFinishComplete
  }, `-=${speed / 2}`)
}



const animateOnLine = (step = 0.65, speed = 2) => {

  TweenLite.to(loadingProgress.value, speed, {
    scaleY: step,
    ease: Power2.easeInOut
  })
}

const animateOnLineFull = (duration = 1, speed = 0.5) => {

  if(loadingProgress.value){
    TweenLite.to(loadingProgress.value, speed, {
      scaleY: 1,
      ease: Power2.easeInOut,
      onComplete: () => animateFinish(defaultSpeedSubLine.value)
    })
  }


}


const onAnimateFinishComplete = () => {




  if(loadingLineWrap.value && loadingLineWrap.value.style){
    loadingLineWrap.value.style.display = "flex";
    loadingLineWrap.value.style.visibility = "hidden";

    TweenLite.set(loadingLine.value, {clearProps: "all"});
    setMainLoading(false)
  }


}


onMounted(() => {

  animateSubLine()
})

defineExpose({})


</script>
<style scoped>

</style>