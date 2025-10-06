<template>

    <div class="fixed  sm:left-[4vw] left-[25px] top-[55vh] h-[34vh]" ref="loadingLineWrap">
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

function toPx(val, axis /* 'x' | 'y' */) {
  if (val == null) return 0
  if (typeof val === 'number') return val
  const s = (val + '').trim()
  const W = window.innerWidth
  const H = window.innerHeight

  const unitVal = v => {
    v = v.trim()
    if (v.endsWith('px')) return parseFloat(v)
    if (v.endsWith('vw')) return (parseFloat(v) / 100) * W
    if (v.endsWith('vh')) return (parseFloat(v) / 100) * H
    if (v.endsWith('%')) return (parseFloat(v) / 100) * (axis === 'y' ? H : W) // برای position: fixed
    // خالی یا فقط عدد
    const n = parseFloat(v)
    return isNaN(n) ? 0 : n
  }

  if (s.startsWith('calc(') && s.endsWith(')')) {
    const expr = s.slice(5, -1).replace(/\s+/g, '') // داخل calc(...)
    // فقط حالت‌های ساده + و - که نیاز داری
    // مثال‌ها: 50vh-14vw  ، 4vw+3px
    let out = 0
    // split به علامت‌های + و - با نگه‌داشتن sign
    const parts = expr.split(/([+\-])/).filter(Boolean)
    let sign = +1
    for (const p of parts) {
      if (p === '+') { sign = +1; continue }
      if (p === '-') { sign = -1; continue }
      out += sign * unitVal(p)
    }
    return out
  }

  return unitVal(s)
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