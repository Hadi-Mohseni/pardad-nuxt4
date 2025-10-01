<template>


  <div ref="section"
       v-show="showSection"
       class=" w-full h-full mt-12 md:mt-0 2xl:mt-12">
    <div class="w-full grid grid-cols-12 relative">
      <div
          class="lg:col-span-7 col-span-12 relative flex flex-col gap-x-4  gap-y-10 h-max lg:pt-16 lg:pl-24 2xl:pl-12 lg:pr-36">
        <div class="flex flex-col gap-x-4 gap-y-2" ref="bodyElement">

          <p class="lg:text-[20px] xl:text-[21px] 2xl:text-[24px] text-base pb-6 font-['PeydaLight']">
           Empty
          </p>

          <div class="w-max">
            <div class="vertical-separator w-full lg:my-4 my-2 lg:mt-16 mt-4" ref="seperatedLine">
              <div></div>
              <div ref='seperatedLineChild'></div>
            </div>
            <div class="lg:text-[13px] 2xl:text-[16px] text-[11px] font-normal"
                 ref="titleElement">

            </div>
          </div>
        </div>


      </div>
      <div class="lg:col-span-5 col-span-12 h-full flex items-end justify-start px-2">

      </div>
      <div>

      </div>

    </div>


  </div>
</template>

<script setup>


const {t , locale} = useI18n()

const contentTimeLine = ref(null)
const backgroundTimeLine = ref(null)
const lineTimeline = ref(null)
const seperatedTimeLine = ref(null)

const section = ref(null)
const showSection = ref(false)


const titleElement = ref(null)
const subtitleElement = ref(null)
const backgroundElement = ref(null)
const bodyElement = ref(null);
const actionElements = ref(null);
const actionElements2 = ref(null);

const slideLine = ref(null)
const slideLineChild = ref(null);


const seperatedLine = ref(null)
const seperatedLineChild = ref(null);


const emit = defineEmits(['next', 'prev'])


const slideHandler = (value) => {
  emit(value)
}


const seperatedLineAnimationFunc = (val)=>{



  seperatedTimeLine.value = new TimelineLite({})


  // همیشه از پایین شروع کنن
  seperatedTimeLine.value.set([seperatedLine.value, seperatedLineChild.value], {
    transformOrigin: locale.value === 'en' ? 'left center'  :  "right center",
    scaleX: 0
  })

  // ۱) اول بک‌گراند از پایین تا 100% پر بشه
  seperatedTimeLine.value.to(seperatedLine.value, 0.7, {
    scaleX: 1,
    ease: Power3.easeOut,
    delay:0.5
  })
  seperatedTimeLine.value.to(seperatedLineChild.value, 0.6, {
    scaleX: 1, // مثلاً 0.7 = 70٪
    ease: Power2.easeInOut
  }, )
  seperatedTimeLine.value.to(seperatedLineChild.value, 0.5, {
    transformOrigin: locale.value === 'en' ? 'right center'  :  "left center",
    scaleX: 0.1, // مثلاً 0.7 = 70٪
    ease: Power2.easeInOut
  },)
}
const seperatedLineAnimationFuncReverse = ()=>{
  seperatedTimeLine.value = new TimelineLite({})


  seperatedTimeLine.value.to(seperatedLineChild.value, 0.3, {
    transformOrigin: locale.value === 'en' ? 'right center'  :  "left center",
    scaleX: 1,
    ease: Power3.easeOut
  })

  seperatedTimeLine.value.to(seperatedLineChild.value, 0.2, {
    transformOrigin: locale.value === 'en' ? 'left center'  :  "right center",
    scaleX: 0,
    ease: Power3.easeOut
  })
  seperatedTimeLine.value.to(seperatedLine.value, 0.1, {
    transformOrigin: locale.value === 'en' ? 'left center'  :  "right center",
    scaleX: 0,
    ease: Power3.easeOut
  })


}

const handleAnimation = (step, timeline) => {
  if (!timeline) {
    console.log("Timeline is not defined!");
    return;
  }

  switch (step) {
    case "play":
    case "resume":
      timeline.play();
      break;
    case "pause":
      timeline.pause();
      break;
    case "stop":
      timeline.pause(0);
      break;
    case "restart":
      timeline.restart();
      break;
    case "reverse":
      timeline.reverse();
      break;
    case "kill":
      timeline.kill();
      timeline = null
      break;
    default:
      console.warn(`Invalid step: ${step}`);
      break;
  }
}
const createBackgroundAnimation = () => {

  if (!backgroundElement.value) return;

  backgroundTimeLine.value = new TimelineLite({paused: true})
      .set(backgroundElement.value, {
        visibility: "inherit",
        x: 1000
      }, 0).from(backgroundElement.value, 2, {opacity: 0}, 0)
      .to(backgroundElement.value, 2, {
        x: 0,
        ease: Power2.easeOut,
      }, 0)
}
const createAnimInContent = () => {

  if (!section.value) return;

  contentTimeLine.value = new TimelineLite();
  const delay = 0.07;

  const children = Array.from(section.value.querySelectorAll('p, h5') || []); //section


  children.forEach((child) => {
    contentTimeLine.value.set(child, {opacity: 0, y: 80});
  });


  // if (subtitleElement.value) {
  //   contentTimeLine.value.from(
  //     subtitleElement.value,
  //     0.6,
  //     { y: 120, opacity: 0, ease: Power3.easeOut },
  //   );
  // }

  contentTimeLine.value.staggerFrom(
      children,
      1.1,
      {y: 80, opacity: 0, ease: Power4.easeOut},
      delay, 0
  );

  if (titleElement.value) {
    contentTimeLine.value.from(
        titleElement.value,
        1,
        {y: 140, opacity: 0, ease: Power3.easeOut},
        0
    );
  }

};

const createScrollTextAnimation = () => {
  /*scrollCTA_timeline.value = new TimelineLite()
      .from(scroll_CTA_lines.value, 0.9, {
        scaleY: 0,
        yPercent: 100,
        ease: Power4.easeOut,
      }, 0)
      .from(scroll_CTA_lines_child2.value, 0.9, {
        scaleY: 1,
        ease: Power4.easeOut,
      }, 0.7)
      .from(scroll_CTA_background.value, 0.4, { opacity: 0 }, 0.4)
      .from(scroll_CTA_label_mask.value, 0.9, {
        xPercent: -100,
        ease: Power4.easeOut,
      }, 1)
      .from(scroll_CTA_label_mask_inner.value, 0.9, {
        xPercent: 100,
        ease: Power4.easeOut,
      }, 1);*/
}


const createPageLineAnimation = () => {


  seperatedLineAnimationFunc()

}

const startAnimation = () => {
  createAnimInContent();
  contentTimeLine.value.timeScale(1);
  handleAnimation("play", contentTimeLine.value);
  createPageLineAnimation()
  seperatedTimeLine.value.timeScale(1);
  handleAnimation("play", seperatedTimeLine.value);


}
const closeAnimation = () => {
  contentTimeLine.value.timeScale(2);
  handleAnimation("reverse", contentTimeLine.value);
  seperatedLineAnimationFuncReverse()


}
const restartAnimation = () => {
  contentTimeLine.value.timeScale(1);
  handleAnimation("restart", contentTimeLine.value);
  seperatedTimeLine.value.timeScale(1);
  handleAnimation("restart", seperatedTimeLine.value);

}
const killAnimation = () => {

  handleAnimation("kill", contentTimeLine.value);
  handleAnimation("kill", seperatedTimeLine.value);

}

onMounted(() => {


})

const setTheme = () => {

  document.body.classList.add('color-dark')
  document.body.classList.remove('color-light')
}
const showSectionHandler = (value) => {
  showSection.value = value
}

defineExpose({
  showSectionHandler,
  startAnimation,
  closeAnimation,
  restartAnimation,
  setTheme,
  killAnimation
})


onBeforeUnmount(() => {
  killAnimation()
})
onBeforeRouteLeave(() => {
  closeAnimation()
})
onUnmounted(() => {

});
</script>

<style scoped>
.home__screen.fourth_page .home__screen__inner {
  padding-top: 0 !important;
  flex-direction: column;
  padding-right: 0;
}

.home__screen.fourth_page .home__screen__body {
  padding-right: 0;
}

.home__screen.fourth_page .home__screen__title,
.home__screen.fourth_page .home__screen__body__text {
  color: black;
  opacity: 1;
}

.home__screen.fourth_page .home__screen__title {
  width: auto;
  font-size: 13px;
  font-weight: 300;
  margin-top: 10px;
  padding-right: 0;
}

.home__screen.fourth_page .home__screen__body__text {
  font-size: 15px !important;
  font-weight: 700;
}

@media only screen and (min-width: 600px) {
  /* .home__screen.fourth_page .home__screen__body__text {
    font-size: 16px !important;
  } */
  .home__screen.fourth_page .home__screen__inner {
    padding-right: 6vw;
  }
}


.home__screen.fourth_page .home__screen__body .with_mini_title {
  display: flex;
  align-items: center;
}

.home__screen.fourth_page .home__screen__body .with_mini_title p {
  font-size: 11px !important;
  font-weight: 300;
  margin-right: 5px;
}


@media only screen and (max-width: 600px) {
  .home__screen.fourth_page .home__screen__body {
    width: auto;
  }

  .home__screen.fourth_page .home__screen__body .with_mini_title h5 {
    font-size: 12px !important;
  }
}
</style>