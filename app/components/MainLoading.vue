<template>

    <div class="fixed  left-[5%] top-[55vh] h-[35vh]" ref="loadingLineWrap">
      <div class="w-px relative " ref="loadingLine">
        <div class="absolute left-0 right-0 h-full bottom-0 bg-[#fff1a]" ref="loadingBackground"></div>
        <div class="absolute left-0 right-0 h-full  bottom-0 bg-[#323232]"  ref="loadingProgress"></div>
      </div>
    </div>

</template>
<script setup>
import {useGlobalStore} from "~/stores/global.js";

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
watch(() => getLoadingEnd.value, (v) => {
  if (v) {
    animateOnLineFull()
  }
})



const animateSubLine = (speed = defaultSpeedSubLine.value) => {
  progress.value = 0;
  isComplete = false;
  if(loadingLineWrap.value && loadingLineWrap.value.style){
    loadingLineWrap.value.style.display = "flex";
    loadingLineWrap.value.style.visibility = "inherit";
  }





  timeline = new TimelineLite()
      .set(loadingLine.value, {scaleY: 1})
      .set(loadingProgress.value, {scaleY: 0})
      .fromTo(
          loadingBackground.value, speed,
          {scaleY: 0},
          {
            scaleY: 1,
            ease: Power3.easeOut,
            onComplete: animateOnLine(defaultStepOnline.value, defaultSpeedOnline.value)
          }
      );


}


const animateFinish = (speed) => {

  const timeline = new TimelineLite()
      .to(loadingLine.value, speed, {scaleY: 0, ease: Power3.easeInOut}, speed);

  timeline.to(loadingLine.value, speed, {
    yPercent: -100,
    ease: Power3.easeInOut,
    onComplete: onAnimateFinishComplete
  }, speed);
}


const animateOnLine = (step = 0.65, speed = 2) => {
  if (!progress.value) {
    progressTween = TweenLite.to(loadingProgress.value, speed, {
      scaleY: step,
      ease: Power2.easeInOut,
      /*   onComplete: animateOnLineFull*/
    });
  }
}

const animateOnLineFull = (duration = 1, speed = 0.5) => {
  if (!progress.value) {
    progressTween = TweenLite.to(loadingProgress.value, speed, {
      scaleY: duration,
      ease: Power2.easeInOut,
      onComplete: animateFinish(defaultSpeedSubLine.value)
    });
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