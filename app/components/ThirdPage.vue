<template>


  <div ref="section" v-show="showSection"
       class="w-full h-full flex justify-center items-center">
    <div class="w-full grid grid-cols-12 relative h-max lg:pr-20">
      <div class="lg:col-span-7 col-span-12 relative lg:w-[75%] mx-auto h-full">
        <div class="lg:text-[20px] text-base font-light lg:leading-8 leading-7"
             ref="titleElement">
          <p class="text-justify"
             :class="(locale === 'en') && 'dir-ltr'">
            {{ t('landing.third_page.description') }}
          </p>
        </div>
        <div class="mt-6"
             :class="(locale === 'en') && 'dir-ltr'">
          <div class="w-max">
            <div class="relative h-[1px] w-full my-2"
                 ref="seperatedLine">
              <!-- First child: opacity 0.1 -->
              <div class="absolute top-0 right-0 w-full h-full bg-black opacity-10"></div>

              <!-- Second child: scale + origin -->
              <div ref="seperatedLineChild"
                   class="absolute top-0  w-full h-full bg-black"
                   :class="(locale === 'en') ? 'origin-top-left right-0' : 'origin-top-left left-0'"></div>
            </div>

            <p class="font-bold w-full"
               ref="subtitleElement"
               :class="(locale !== 'en') && 'lg:pl-24 pl-6'">
              {{ t('landing.third_page.footer') }}
            </p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>


const {t , locale} = useI18n()
const contentTimeLine = ref(null)
const backgroundTimeLine = ref(null)
const lineTimeline = ref(null)
const scrollCTA_timeline = ref(null)
const section = ref(null)
const showSection = ref(false)

const seperatedLine = ref(null)
const seperatedLineChild = ref(null);

const titleElement = ref(null)
const subtitleElement = ref(null)

const bodyElement = ref(null);
const seperatedTimeLine = ref(null)


const emit = defineEmits(['next', 'prev'])


const slideHandler = (value) => {
  emit(value)
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

const createAnimInContent = () => {

  if (!section.value) return;

  contentTimeLine.value = new TimelineLite();


  const children = Array.from(titleElement.value.querySelectorAll('p') || []);

  children.forEach((child) => {
    contentTimeLine.value.set(child, {opacity: 0, y: 80});
  });

  const delay = 0.2;

  contentTimeLine.value.staggerFrom(
      children,
      0.6,
      {y: 80, opacity: 0, ease: Power3.easeOut},
      delay, 0,
  );

  // if (titleElement.value) {
  //   contentTimeLine.value.from(
  //     titleElement.value,
  //     0.5,
  //     { y: 80, opacity: 0, ease: Power3.easeOut },
  //   );
  // }

  if (subtitleElement.value) {
    contentTimeLine.value.from(
        subtitleElement.value,
        0.5,
        {y: 120, opacity: 0, ease: Power3.easeOut},
    );
  }

};


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

const createPageLineAnimation = () => {


seperatedLineAnimationFunc()

}


const startAnimation = () => {

  createAnimInContent();
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
  handleAnimation("restart", contentTimeLine.value);


}
const killAnimation = () => {

  handleAnimation("kill", contentTimeLine.value);


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
.home__screen.third_page {
  direction: ltr;
}

.home__screen.third_page .home__screen__title {
  width: auto;
  font-weight: 300;
  font-size: 20px !important;
  direction: rtl;
}

.home__screen.third_page .home__screen__body {
  align-self: flex-end;
}

.home__screen.third_page .separator {
  margin-right: 0;
  width: 18vw;
  align-self: flex-end;
  margin-top: 3vw;
  direction: rtl;
}

@media screen and (min-width: 600px) {
  .home__screen.third_page .separator {
    margin-right: 6vw;
    width: 12vw;
  }

  .home__screen.third_page .home__screen__title {
    width: 34vw;
    color: #000000
  }

  .home__screen.third_page .home__screen__title :first-child {
    color: #000
    /* font-size: 25px !important */
  }
}

.home__screen.third_page .separator .home__screen__separator {
  width: 100%;
  margin-bottom: 10px;
}

.home__screen.third_page .separator .home__screen__body__text {
  font-size: 15px;
  text-align: right;
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .home__screen.third_page .home__screen__title {
    font-size: 14px !important
  }

  .home__screen.third_page .separator {
    width: 26vw;
  }
}
</style>
