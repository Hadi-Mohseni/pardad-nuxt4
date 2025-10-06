<template>
  <div ref="section"
       v-show="showSection"
       class="w-full h-full">
    <div class="w-full grid grid-cols-12 relative h-full">
      <div class="col-span-12 relative flex flex-col items-end gap-x-4 gap-y-10 h-full lg:col-span-8"
           :class="(locale !== 'en') && 'lg:pr-36'">

        <div class="flex flex-col justify-center h-full gap-y-6"
             :class="(locale === 'en') && 'dir-ltr lg:w-[90%]'"
             ref="bodyElement">

          <!-- لیست آیتم‌ها -->
          <div class="flex flex-col justify-center h-full gap-y-5" >
            <div class="flex items-start lg:gap-5 gap-4">
              <img src="~/assets/icons/line.svg"
                   alt="power line"
                   class="lg:w-24 w-16 mt-[5px]"/>
              <p class="lg:text-base text-xs">{{ t('landing.second_page.description.0.p') }}</p>
            </div>

            <div class="flex items-start lg:gap-5 gap-4">
              <img src="~/assets/icons/nex.svg"
                   alt="flow line"
                   class="lg:w-24 w-16 mt-[5px]"/>
              <p class="lg:text-base text-xs">{{ t('landing.second_page.description.1.p') }}</p>
            </div>

            <div class="flex items-start lg:gap-5 gap-4">
              <img src="~/assets/icons/electro.svg"
                   alt="nex drive"
                   class="lg:w-24 w-16 mt-[5px]"/>
              <p class="lg:text-base text-xs">{{ t('landing.second_page.description.2.p') }}</p>
            </div>

            <div class="flex items-start lg:gap-5 gap-4">
              <img src="~/assets/icons/flow.svg"
                   alt="electro line"
                   class="lg:w-24 w-16 mt-[5px]"/>
              <p class="lg:text-base text-xs">{{ t('landing.second_page.description.3.p') }}</p>
            </div>
          </div>

          <!-- فوتر -->
          <div class="lg:hidden flex items-start lg:gap-5 gap-4 mt-6">
            <!-- ستون خالی هم‌عرض لوگو -->
            <div class="shrink-0 lg:w-24 w-16"></div>

            <!-- ستون متن فوتر -->
            <div class="flex-1">

              <h2 class="lg:text-[15px] 2xl:text-[17px] text-[16px] font-bold text-body-100"
                  ref="titleElement">
                {{ t('landing.second_page.footer') }}
              </h2>
            </div>
          </div>

          <div class="lg:block hidden w-1/5">
            <div class="relative h-[1px] w-full my-2"
                 ref="seperatedLine">
              <!-- First child: opacity 0.1 -->
              <div class="absolute top-0 right-0 w-full h-full bg-black opacity-10"></div>

              <!-- Second child: scale + origin -->
              <div ref="seperatedLineChild"
                   class="absolute top-0  w-full h-full bg-black"
                   :class="(locale === 'en') ? 'origin-top-left right-0' : 'origin-top-left left-0'"></div>
            </div>
            <h2 class="lg:text-[15px] 2xl:text-[17px] text-[16px] font-bold text-body-100"
                ref="subtitleElement">
              {{ t('landing.second_page.footer') }}
            </h2>
          </div>

        </div>


      </div>
      <div class="lg:col-span-5 col-span-12 h-full flex items-end justify-start px-2"></div>
    </div>
  </div>
</template>

<script setup>


const {t} = useI18n()
const {locale} = useI18n()
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

  const children = Array.from(section.value.querySelectorAll('p, h5,img') || []); //section


  children.forEach((child) => {
    contentTimeLine.value.set(child, {opacity: 0, y: 80});
  });


   if (subtitleElement.value) {
     contentTimeLine.value.from(
       subtitleElement.value,
       0.9,
       { y: 120, opacity: 0, ease: Power3.easeOut },
     );
   }

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
/*  seperatedTimeLine.value.timeScale(2);
  handleAnimation("reverse", seperatedTimeLine.value);*/


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
.home__screen.second_page .home__screen__inner {
  padding-top: 0 !important;
  flex-direction: column;
  padding-right: 0;
}

.home__screen.second_page .home__screen__body {
  padding-right: 0;
}

.home__screen.second_page .home__screen__title,
.home__screen.second_page .home__screen__body__text {
  color: black;
  opacity: 1;
}

.home__screen.second_page .home__screen__title {
  width: auto;
  font-size: 13px;
  font-weight: 300;
  margin-top: 10px;
  padding-right: 0;
}

.home__screen.second_page .home__screen__body__text {
  font-size: 15px !important;
  font-weight: 700;
}

@media only screen and (min-width: 600px) {
  /* .home__screen.second_page .home__screen__body__text {
    font-size: 16px !important;
  } */
  .home__screen.second_page .home__screen__inner {
    padding-right: 6vw;
  }
}


.home__screen.second_page .home__screen__body .with_mini_title {
  display: flex;
  align-items: center;
}

.home__screen.second_page .home__screen__body .with_mini_title p {
  font-size: 11px !important;
  font-weight: 300;
  margin-right: 5px;
}


@media only screen and (max-width: 600px) {
  .home__screen.second_page .home__screen__body {
    width: auto;
  }

  .home__screen.second_page .home__screen__body .with_mini_title h5 {
    font-size: 12px !important;
  }
}
</style>