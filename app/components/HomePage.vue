<template>


  <div ref="section" v-if="showSection"
       class="w-full h-full grid grid-cols-12 relative">

    <div class="lg:col-span-7 col-span-12 relative lg:order-1 order-2">
      <div class="lg:pr-21 lg:pt-9 flex flex-col justify-center 2xl:justify-around h-full"
           ref="bodyElement">

        <div class="lg:mb-12 mb-0 flex flex-col gap-x-1 items-start w-full"
             :class="(locale === 'en') && 'dir-ltr'">
          <div class="mb-4 lg:mb-8 flex flex-col lg:flex-row lg:gap-x-1 items-end lg:justify-start">
            <h1 class="lg:text-[46px] 2xl:text-[58px]   font-bold leading-tight"
                :class="(locale !== 'en') ? `mb-1 md:mb-9 text-[30px] ` : `text-[22px] `"
                ref="titleElement">
              {{ t('landing.home_page.main_title') }}
            </h1>
            <p class="lg:text-[17px] 2xl:text-[20px] text-[12px] text-gray-400"
               ref="secondTitleElement"
               :class="(locale !== 'en') && 'mb-0 md:mb-4'">
              {{ t('landing.home_page.sub_title') }}
            </p>
          </div>

          <div v-if="(locale !== 'en')"
               class="lg:text-[20px] xl:text-[21px] 2xl:text-[30px] text-[18px] lg:pb-6 space-y-2 text-right mb-4 lg:mb-0">
            <p>{{ t('landing.home_page.main_paraph.0.p') }}</p>
            <p v-if="locale === 'en'">{{ t('landing.home_page.main_paraph.1.p') }}</p>
            <p v-if="locale === 'en'">{{ t('landing.home_page.main_paraph.2.p') }}</p>
          </div>
          <div v-else
               class="lg:text-[20px] xl:text-[21px] 2xl:text-[30px] text-[18px] lg:pb-6 text-left mb-4 lg:mb-0">
            <p>{{ t('landing.home_page.total_main_paraph') }}</p>
          </div>
        </div>

        <div class="w-max">
          <div class="relative h-[1px] w-m my-2"
               ref="seperatedLine">
            <!-- First child: opacity 0.1 -->
            <div class="absolute top-0 right-0 w-full h-full bg-black opacity-10"></div>

            <!-- Second child: scale + origin -->
            <div ref="seperatedLineChild"
                 class="absolute top-0  w-full h-full bg-black"
                 :class="(locale === 'en') ? 'origin-top-left right-0' : 'origin-top-left left-0'"></div>
          </div>
          <div :class="(locale === 'en') && 'dir-ltr text-gray-400'"
               class="mt-5 lg:mt-0 lg:mb-20 2xl:mb-0 opacity-75  font-normal lg:text-[14px] 2xl:text-[14px] text-xs lg:leading-[22px]">
            <p class=""> {{ t('landing.home_page.footer.0.p') }}</p>
            <p class="">
              {{ t('landing.home_page.footer.1.p') }}
            </p>
            <p v-if="locale === 'en'" class="">
              {{ t('landing.home_page.footer.2.p') }}
            </p>
            <p v-if="locale === 'en'" class="">
              {{ t('landing.home_page.footer.3.p') }}
            </p>
          </div>
        </div>
        <div class="absolute h-full hidden sm:block xl:top-20 top-0"
             :class="(locale === 'en') ? 'lg:-left-[70px]' : 'lg:-left-[130px]'">
          <div class="relative w-px h-2/5" ref="slideLine">

            <div class="absolute top-0 left-0 w-full h-full bg-[#0000001a] origin-[left_top]"></div>

            <div class="absolute top-0 left-0 w-full h-full bg-[#323232]  origin-[left_top]"
                 ref="slideLineChild"></div>
          </div>
        </div>

        <!--        <div class="home__screen__separator" ref="slideLine" >

                </div>-->


      </div>
      <div class="absolute bottom-14 origin-[left_top] lg:right-11 hidden lg:block"
           ref="scroll_CTA">

        <div
            class="absolute top-[-20px] -right-1.5 text-[8.1px] 2xl:text-[9px] font-['Archia']  uppercase tracking-[0.4em] origin-[left_bottom] rotate-[-90deg] translate-x-full -translate-y-full"
            aria-hidden="true"
            ref="scroll_CTA_background">
          Scroll
        </div>


        <div
            class="absolute top-[-20px] -right-1.5 text-[8.1px] 2xl:text-[9px] font-['Archia'] uppercase tracking-[0.4em] origin-[left_bottom] rotate-[-90deg] translate-x-full -translate-y-full">
          <div class="overflow-hidden"
               ref="scroll_CTA_label_mask">
            <div ref="scroll_CTA_label_mask_inner">
              Scroll
            </div>
          </div>
        </div>

        <div class="relative w-[1px] h-[90px] origin-[left_top] border-0 border-gray-200"
             ref="scroll_CTA_lines">
          <div class="absolute top-0 left-0 w-full h-full bg-[#000] opacity-20"></div>
          <div
              class="absolute top-0 left-0 w-full h-full bg-[#000] origin-[left_top] "
              ref="scroll_CTA_lines_child2"></div>
        </div>

      </div>
    </div>
    <!--    <div class="lg:col-span-5 col-span-12 h-full flex lg:items-end lg:justify-start lg:px-2 order-1 lg:order-2">-->
    <!--      <div v-if="locale === 'fa'"-->
    <!--           class="lg:mb-12 mb-8 flex gap-x-1 items-end justify-start">-->
    <!--        <h1 class="lg:text-[46px] 2xl:text-[58px] text-2xl mb-0 md:mb-9 font-bold"-->
    <!--            ref="titleElement">{{ t('landing.home_page.main_title') }}</h1>-->
    <!--        <p class="lg:text-[17px] 2xl:text-[20px] text-sm mb-0 md:mb-4 " ref="secondTitleElement">{{-->
    <!--            t('landing.home_page.sub_title')-->
    <!--          }}</p>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>


</template>

<script setup>

const {t} = useI18n()
const {locale} = useI18n()


const seperatedLine = ref(null)
const seperatedLineChild = ref(null);
const seperatedTimeLine = ref(null)

const contentTimeLine = ref(null)
const backgroundTimeLine = ref(null)
const lineTimeline = ref(null)
const scrollCTA_timeline = ref(null)
const section = ref(null)
const showSection = ref(false)


const titleElement = ref(null)
const secondTitleElement = ref(null)
const subtitleElement = ref(null)
const backgroundElement = ref(null)
const bodyElement = ref(null);
const actionElements = ref(null);
const actionElements2 = ref(null);

const slideLine = ref(null)
const slideLineChild = ref(null);


const scroll_CTA = ref(null);
const scroll_CTA_lines = ref(null);
const scroll_CTA_lines_child2 = ref(null)
const scroll_CTA_background = ref(null)
const scroll_CTA_label_mask = ref(null)
const scroll_CTA_label_mask_inner = ref(null)

let height = 0

const emit = defineEmits(['next', 'prev', 'end-animation'])


const nextSlide = () => {
  emit("next")
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

  contentTimeLine.value = new TimelineLite({
    onComplete: () => {
      emit('end-animation')
    }
  });
  const delay = 0.2;

  const children = Array.from(bodyElement.value.querySelectorAll('p') || []);


  children.forEach((child) => {
    contentTimeLine.value.set(child, {opacity: 0, y: 80});
  });


  if (titleElement.value) {
    contentTimeLine.value.from(
        titleElement.value,
        0.6,
        {y: 120, opacity: 0, ease: Power3.inOut}, 0
    );
  }
  contentTimeLine.value.staggerFrom(
      children, 0.5,
      {y: 80, opacity: 0, ease: Power3.easeOut},
      0.1,
  );

  if (secondTitleElement.value) {
    contentTimeLine.value.from(
        secondTitleElement.value,
        0.6,
        {y: 120, opacity: 0, ease: Power3.inOut}, 0.3
    );
  }


  if (subtitleElement.value) {
    contentTimeLine.value.from(
        subtitleElement.value,
        1,
        {y: 120, opacity: 0, ease: Power3.easeOut},
    );
  }


};

const createScrollTextAnimation = () => {
  scrollCTA_timeline.value = new TimelineLite()
      .from(scroll_CTA_lines.value, 0.9, {
        scaleY: 0,
        yPercent: 100,
        ease: Power4.easeOut,
      }, 0)
      .from(scroll_CTA_lines_child2.value, 0.9, {
        scaleY: 1,
        ease: Power4.easeOut,
      }, 0.7)
      .to(scroll_CTA_lines_child2.value, 0.9, {
        scaleY: 0.1,
        ease: Power4.easeOut,
      }, 0.7)
      .from(scroll_CTA_background.value, 0.4, {opacity: 0}, 0.4)
      .from(scroll_CTA_label_mask.value, 0.9, {
        xPercent: -100,
        ease: Power4.easeOut,
      }, 1)
      .from(scroll_CTA_label_mask_inner.value, 0.9, {
        xPercent: 100,
        ease: Power4.easeOut,
      }, 1);
}


const seperatedLineAnimationFunc = (val)=>{



  seperatedTimeLine.value = new TimelineLite({})


  // همیشه از پایین شروع کنن
  seperatedTimeLine.value.set([seperatedLine.value, seperatedLineChild.value], {
    transformOrigin: locale.value === 'en' ? 'left center'  :  "right center",
    scaleX: 0
  })

  // ۱) اول بک‌گراند از پایین تا 100% پر بشه
  seperatedTimeLine.value.to(seperatedLine.value, 0.8, {
    scaleX: 1,
    ease: Power3.easeOut,
    delay:0.4
  })
  seperatedTimeLine.value.to(seperatedLineChild.value, 0.7, {
    scaleX: 1, // مثلاً 0.7 = 70٪
    ease: Power2.easeInOut
  }, )
  seperatedTimeLine.value.to(seperatedLineChild.value, 0.7, {
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

  lineTimeline.value = new TimelineLite({paused: true})
      .from(slideLine.value, 0.9, {
        scaleY: 1,
        yPercent: 100,
        ease: Power4.easeOut,
      }, 0)
      .from(slideLineChild.value, 0.9, {
        scaleY: 1,
        ease: Power4.easeOut,
      }, 0.7)
      .to(slideLineChild.value, 0.9, {
        scaleY: 0.1,
        ease: Power4.easeOut,
      }, 0.7)

}

const startAnimation = () => {
  createAnimInContent();
  contentTimeLine.value.timeScale(1);
  handleAnimation("play", contentTimeLine.value);
  createScrollTextAnimation()
  scrollCTA_timeline.value.timeScale(1);
  handleAnimation("play", scrollCTA_timeline.value);
  createPageLineAnimation()
  lineTimeline.value.timeScale(1);
  handleAnimation("play", lineTimeline.value);


}
const closeAnimation = () => {
  contentTimeLine.value.timeScale(2);
  handleAnimation("reverse", contentTimeLine.value);
  scrollCTA_timeline.value.timeScale(2);
  handleAnimation("reverse", scrollCTA_timeline.value);
  seperatedLineAnimationFuncReverse()
  lineTimeline.value.timeScale(2);
  handleAnimation("reverse", lineTimeline.value);


}
const restartAnimation = () => {
  contentTimeLine.value.timeScale(1);
  scrollCTA_timeline.value.timeScale(1);
  lineTimeline.value.timeScale(1);
  handleAnimation("restart", contentTimeLine.value);
  handleAnimation("restart", scrollCTA_timeline.value);
  handleAnimation("restart", lineTimeline.value);

}
const killAnimation = () => {
  handleAnimation("kill", contentTimeLine.value);
  handleAnimation("kill", scrollCTA_timeline.value);
  handleAnimation("kill", lineTimeline.value);

}


onMounted(() => {


  /* startAnimation()
   setTimeout(()=>{
     closeAnimation()
   },7000)*/

})
const setTheme = () => {

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
  requestAnimationFrame(() => {
    showSection.value = true
  })

});
</script>

<style scoped>
.home_screen_title_parent {
  align-self: center;
  margin-bottom: 0;
  display: flex;
}

.home__screen.home_page .home__screen__title {
  width: auto;
  font-size: calc(4.34375vw + 10px);
  margin-right: 10vw;
}

.home__screen__body.special_stock {
  width: auto;
  display: flex;
  justify-content: center;
  align-self: flex-end;
  font-size: 17px;
  margin-top: 25px;
}

.home__screen__body.special_stock .home__screen__body__text {
  opacity: 1 !important;
}

.home__screen__body.right_side {
  padding-top: 20px;
}

.home__screen__body.right_side .home__screen__body__text {
  opacity: 1;
}

.home__screen__body.right_side .home__screen__body__text:first-child {
  font-size: 20px;
  font-weight: 800 !important;
  margin-bottom: 25px;
}

.home__screen__body.right_side .home__screen__body__text:nth-child(n + 2) {
  font-size: 15px;
  font-weight: 400;
}

.home__screen__body.right_side .home__screen__body__text:nth-child(7) {
  margin-top: 50px;
}

@media only screen and (min-width: 600px) {
  .home_screen_title_parent {
    align-self: flex-end;
    margin-bottom: -35px;
  }

  .home__screen__body.right_side .home__screen__body__text:nth-child(5) {
    white-space: nowrap;
  }

  .home__screen__body.right_side .home__screen__body__text:first-child {
    white-space: nowrap;
  }

  .home__screen__body.special_stock {
    justify-content: flex-end;
  }

  .home__screen__body.right_side .home__screen__body__text:nth-child(7) {
    margin-top: 150px;
  }

  .home__screen__body.right_side .home__screen__body__text:nth-child(7),
  .home__screen__body.right_side .home__screen__body__text:nth-child(8) {
    font-weight: 300;
    opacity: 0.6;
    font-size: 14px;
  }

  .home__screen__body.right_side {
    padding-top: 50px;
  }

  .home__screen.home_page .home__screen__title {
    font-size: calc(2.34375vw + 10px);
    margin-right: 0;
  }
}

@media only screen and (max-width: 600px) {
  .home__screen.home_page .home__screen__title {
    margin-right: 0;
    font-size: 20px;
  }

  .home_page .home__screen__body.special_stock {
    font-size: 12px
  }

  .home_page .home__screen__body.right_side .home__screen__body__text:first-child {
    font-size: 15px;
  }

  .home_page .home__screen__body {
    width: auto;
  }

  .home_page .home__screen__body.right_side .home__screen__body__text:nth-child(n + 2) {
    font-size: 13px;
  }

  .home_page .home__screen__body.right_side .home__screen__body__text:nth-child(7),
  .home_page .home__screen__body.right_side .home__screen__body__text:nth-child(8) {
    opacity: 0.6;
    font-size: 12px;
  }
}

@media screen and (min-width: 600px) {
  .home__screen__separator {
    width: 1px;
    height: auto;
    margin-top: 50px;
    margin-bottom: 200px;
  }
}
</style>