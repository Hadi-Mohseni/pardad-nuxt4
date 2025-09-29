<template>
  <div class="loading-class">
    <div class="main-loading">
      <div class="main-loading__inner">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352.6 89.4" class="main-loading__logo">
          <path
              d="M133.7 52.8c-.6-.1-3.5-.2-6.1-.2-2.3 0-5.4 0-6 .2-.2 0-.4-.3-.4-.4 0-.1 0-.1.1-.1 5.2-4.9 9.4-9.3 9.4-12.9 0-2.3-1.3-3.7-3.3-3.7-1.8 0-3.1 1.1-4 2.8-.1.2-.5.1-.7-.1-.2-.1-.4-.4-.3-.5 1-2.6 3.1-4.9 6.1-4.9 3.3 0 5.8 2.3 5.8 5.3 0 3.7-3.3 6.7-8.6 11.4h6.2c1.2 0 1.8-1 2.5-2.2.1-.1.4-.1.6 0 .2.1.4.3.4.4-.5 1-1.4 3.5-1.7 4.9zm21-.1c-1.2 0-3-.1-4.3-.1s-3 .1-4.2.1c-.1 0-.2-.3-.2-.5s.1-.5.2-.5c1.9-.2 2.4-.5 2.4-2.4v-11c0-1.4-.2-2.4-2-2.4h-.8c-.1 0-.2-.3-.2-.4s.1-.5.2-.5c1.8-.6 4.1-1.1 5.7-2 .3-.1.4-.2.6-.2.2 0 .3.2.3.3-.1 1.1-.2 3.3-.2 4.8v11.4c0 1.8.5 2.1 2.5 2.4.1 0 .2.3.2.5 0 .3-.1.5-.2.5zm40.7-.6c-1.7 0-4.3 1-7 1-7.5 0-11.2-4.9-11.2-10.1 0-5.5 4.4-10.3 11.4-10.3 2.8 0 4.7.7 6.4.7.1 1.6.3 3.9.5 5.4 0 .1-.3.2-.6.2-.2 0-.4-.1-.4-.2-.6-2.5-2.9-5-6-5-4.4 0-6.8 3.9-6.8 9.1 0 5 2.4 9 6.7 9 3.6 0 5.7-2.4 6.9-5.3.1-.2.3-.2.5-.2s.5.1.5.2c-.2 1.6-.6 4-.9 5.5zm30.2.6c-1.8 0-3.1-.1-4.6-.1-1.7 0-3.2.1-5 .1-.1 0-.2-.3-.2-.5s.1-.5.2-.5c1.8-.1 2.3-.5 2.3-1.2 0-.3-.1-.7-.3-1.2l-1.2-3.3H211l-1.1 3c-.2.5-.3 1-.3 1.3 0 .8.4 1.3 2.2 1.3.1 0 .2.3.2.5s-.1.5-.2.5c-1.7 0-2.1-.1-3.6-.1-1.2 0-1.9.1-3.2.1-.1 0-.2-.3-.2-.5s.2-.5.3-.5c1.8-.1 2.4-1 3.2-2.8l6.7-15.9c.1-.1.3-.2.6-.2s.6.1.6.2l6 15.9c.6 1.7 1.4 2.6 3.4 2.8.1 0 .3.3.3.5-.1.4-.2.6-.3.6zm-11.7-14.4l-2.5 6.7h5l-2.5-6.7zm29.9 6.7c-1.1 0-1.8-.1-2.6-.2v4.5c0 1.5.4 2.1 2.8 2.4.1 0 .2.3.2.5s-.1.5-.2.5c-1.8 0-3.1-.1-4.9-.1-1.7 0-3.1.1-4.9.1-.1 0-.2-.3-.2-.5s.1-.5.2-.5c2.4-.3 2.8-.9 2.8-2.4v-13c0-1.3-.4-1.8-2.8-2.1-.1 0-.2-.3-.2-.5s.1-.5.2-.5c1.8 0 3.3.1 5 .1s2.6-.1 4.4-.1c5.5 0 7.7 2.3 7.7 5.9 0 3.5-3 5.9-7.5 5.9zm-.4-10.6c-2 0-2.2.6-2.2 2v6.4c0 .9.8 1 1.7 1 2.8 0 4-1.9 4-4.9-.1-3.3-1.6-4.5-3.5-4.5zm27.2 18.3c-1.8 0-3.1-.1-4.9-.1s-3.1.1-4.9.1c-.1 0-.2-.3-.2-.5s.1-.5.2-.5c2.4-.3 2.8-.9 2.8-2.4V36.7c0-1.5-.4-2.1-2.8-2.4-.1 0-.2-.3-.2-.5s.1-.5.2-.5c1.9 0 3.2.1 4.9.1s3-.1 4.9-.1c.1 0 .2.3.2.5s-.1.5-.2.5c-2.4.3-2.8.9-2.8 2.4v12.7c0 1.5.4 2.1 2.8 2.4.1 0 .2.3.2.5s-.1.4-.2.4zm28.6-13.5c-.2 0-.4-.1-.4-.2-.7-2.5-2.6-4.5-4.8-4.5h-.9c-.9 0-1.2.3-1.2 1.1v13.7c0 1.5.4 2.1 2.8 2.4.1 0 .2.3.2.5s-.1.5-.2.5c-1.8 0-3.2-.1-4.9-.1-1.7 0-3.1.1-4.9.1-.1 0-.2-.3-.2-.5s.1-.5.2-.5c2.4-.3 2.8-.9 2.8-2.4V35.7c0-.8-.3-1.1-1.2-1.1h-.6c-2 0-4.6 2.1-5.4 4.5-.1.1-.3.2-.4.2-.3 0-.6-.2-.6-.3.5-1.9.9-4 1.3-5.8 1.1.2 4 .4 9.2.4 5.1 0 8.2-.2 9.3-.4.1 1.8.4 3.8.7 5.8-.1 0-.4.2-.8.2zm27.6 13.5c-1.8 0-3.1-.1-4.6-.1-1.7 0-3.2.1-5 .1-.1 0-.2-.3-.2-.5s.1-.5.2-.5c1.8-.1 2.3-.5 2.3-1.2 0-.3-.1-.7-.3-1.2L318 46h-5.8l-1.1 3c-.2.5-.3 1-.3 1.3 0 .8.4 1.3 2.2 1.3.1 0 .2.3.2.5s-.1.5-.2.5c-1.7 0-2.1-.1-3.6-.1-1.2 0-1.9.1-3.2.1-.1 0-.2-.3-.2-.5s.2-.5.3-.5c1.8-.1 2.4-1 3.2-2.8l6.7-15.9c.1-.1.3-.2.6-.2s.6.1.6.2l6 15.9c.6 1.7 1.4 2.6 3.4 2.8.1 0 .3.3.3.5-.1.4-.2.6-.3.6zm-11.7-14.4l-2.5 6.7h5l-2.5-6.7zm36.6 14.4c-1.8-.1-6.3-.1-8.1-.1-1.8 0-6.4.1-8.2.1-.1 0-.2-.3-.2-.5s.1-.5.2-.5c2.4-.3 2.8-.9 2.8-2.4V36.7c0-1.5-.4-2.1-2.8-2.4-.1 0-.2-.3-.2-.5s.1-.5.2-.5c1.8 0 3.2.1 4.9.1 1.7 0 3-.1 4.9-.1.1 0 .2.3.2.5s-.1.5-.2.5c-2.4.3-2.8.9-2.8 2.4v13.1c0 1.4.9 1.7 1.6 1.7h2.2c2.9 0 4.5-2.4 5.4-5.2 0-.1.1-.1.3-.1.4 0 .7.2.7.4-.5 1.8-.7 4.3-.9 6.1z"
              data-id="text" fill="#F4F4F4"/>
          <path data-id="shape" fill="none" stroke="#F4F4F4" stroke-width="5" stroke-miterlimit="10"
                d="M14.8 55.8L3.5 44.6l20.1-20.1 20 20.1-20 20 21.2 21.2 41-41L44.6 3.5 32.3 15.8"/>
        </svg>

        <div class="main-loading__bar-wrapper">
          <div class="main-loading__bar">
            <div class="main-loading__bar__total"></div>
            <div class="main-loading__bar__progress"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="ajax-loading" ref="loadingLineWrap">
      <div class="ajax-loading__line left-16" ref="loadingLine">
        <div class="ajax-loading__line__background" ref="loadingBackground"></div>
        <div class="ajax-loading__line__progress" ref="loadingProgress"></div>
      </div>
    </div>
    <div class="ajax-loading2" dir="ltr" ref="loadingLineWrap2">
      <div class="ajax-loading__line2 left-16" ref="loadingLine2">
        <div class="ajax-loading__line__background2" ref="loadingBackground2"></div>
        <div class="ajax-loading__line__progress2" ref="loadingProgress2"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useGlobalStore} from "~/stores/global.js";

const {setMainLoading} = useGlobalStore()

const progress = ref(0)
let progressTween = ''
let timeline = ''
let isComplete = false
const defaultStepOnline = ref(0.65);

const defaultSpeedOnline = ref(1);

const defaultSpeedSubLine = ref(0.8);


const loadingLineWrap = ref(null)
const loadingLineWrap2 = ref(null)
const loadingLine = ref(null)
const loadingLine2 = ref(null)
const loadingBackground = ref(null)
const loadingBackground2 = ref(null)
const loadingProgress = ref(null)
const loadingProgress2 = ref(null)


const animateSubLine = (speed = defaultSpeedSubLine.value) => {
  progress.value = 0;
  isComplete = false;
  loadingLineWrap.value.style.display = "flex";
  loadingLineWrap.value.style.visibility = "inherit";

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
const animateSubLine2 = (speed = defaultSpeedSubLine2.value) => {
  progress.value = 0;
  isComplete = false;
  loadingLineWrap2.value.style.display = "flex";
  loadingLineWrap2.value.style.visibility = "inherit";

  timeline = new TimelineLite()
      .set(loadingLine2.value, {scaleX: 1})
      .set(loadingProgress2.value, {scaleX: 0})
      .fromTo(
          loadingBackground2.value, speed,
          {scaleX: 0},
          {
            scaleX: 1,
            ease: Power3.easeOut,
            onComplete: animateOnLine2(defaultStepOnline2.value, defaultSpeedOnline2.value)
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
const animateFinish2 = (speed) => {

  const timeline = new TimelineLite()
      .to(loadingLine2.value, speed, {scaleX:0.1 , ease: Power3.easeInOut}, speed);

  timeline.to(loadingLine2.value, speed, {
    xPercent: 90,
    ease: Power3.easeInOut
  }, speed);
}


const animateOnLine = (step = 0.65, speed = 4) => {
  if (!progress.value) {
    progressTween = TweenLite.to(loadingProgress.value, speed, {
      scaleY: step,
      ease: Power2.easeInOut,
      onComplete: animateOnLineFull
    });
  }
}
const animateOnLine2 = (step = 9, speed = 4) => {
  if (!progress.value) {
    progressTween = TweenLite.to(loadingProgress2.value, speed, {
      scaleX: step,
      ease: Power2.easeInOut,
      /*onComplete: animateOnLineFull2*/
    });
  }
}

const animateOnLineFull = (duration = 1, speed = 0.1) => {
  if (!progress.value) {
    progressTween = TweenLite.to(loadingProgress.value, speed, {
      scaleY: duration,
      ease: Power2.easeInOut,
      onComplete: animateFinish(defaultSpeedSubLine.value)
    });
  }
}
const animateOnLineFull2 = (duration = 1, speed = 0.2) => {
  if (!progress.value) {
    progressTween = TweenLite.to(loadingProgress2.value, speed, {
      scaleX: duration,
      ease: Power2.easeInOut,
      onComplete: animateFinish2(defaultSpeedSubLine.value)
    });
  }
}


const onAnimateFinishComplete = () => {
  loadingLineWrap.value.style.display = "flex";
  loadingLineWrap.value.style.visibility = "hidden";
  TweenLite.set(loadingLine.value, {clearProps: "all"});
  /*  setMainLoading(false)*/

}
const onAnimateFinishComplete2 = () => {
  loadingLineWrap.value.style.display = "flex";
  loadingLineWrap.value.style.visibility = "hidden";
  TweenLite.set(loadingLine2.value, {clearProps: "all"});
  /*  setMainLoading(false)*/

}





</script>
<style scoped>

</style>