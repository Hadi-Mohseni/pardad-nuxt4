<template>

<div v-if="getShowContent">
  <section ref="section" v-show="showSection" class="" data-page="home" style="">

    <!--      <canvas class="home__background"></canvas>-->


    <div class="home__inner lg:px-7 px-14 h-dvh overflow-hidden relative flex flex-col select-none" id="home-inner">
      <div
          class="h-12 lg:hidden lg:mt-0 lg:h-0"
          :class="(currentSlide > 0) ? 'mt-[130px]' : 'mt-[70px]'">
        <template v-if="!getLoading">
          <div v-show="currentSlide > 0"
               class="flex justify-between items-center font-['Archia'] lg:hidden px-2 text-xs ">
            <span class="font-bold font-['Archia']" dir="ltr">0 4</span>
            <div class="relative w-10/12 mx-auto h-px overflow-hidden  ">
              <div class="absolute left-0 w-0 h-px bg-[#000] opacity-10 transition-all duration-1000 " ref="bgLine">

              </div>
              <div class="absolute left-0 w-0 h-px bg-[#000] z-10 transition-all duration-500 " ref="hoverLine">

              </div>

            </div>
            <span class="font-bold font-['Archia']" dir="ltr">0 {{ currentSlide }}</span>
          </div>

        </template>


      </div>
      <div
          class="lg:h-[calc(100dvh-155px)] h-full lg:overflow-hidden overflow-y-scroll overscroll-none lg:mt-32 mt-4">

        <HomePage @next="nextSlide" v-if="showHome" ref="Home" :class="{'will-change-transform': moving}"/>
        <!-- <FirstPage @next="nextSlide" @prev="prevSlide" v-if="showFirst" ref="First"/>
          <SecondPage @next="nextSlide" @prev="prevSlide" v-if="showSecond" ref="Second"/>
          <ThirdPage @next="nextSlide" @prev="prevSlide" v-if="showThird" ref="Third"/>
          <FourthPage @prev="prevSlide"   v-if="showFourth" ref="Fourth"/> -->

        <Transition name="fade">
          <FirstPage @next="nextSlide" @prev="prevSlide" v-if="showFirst" ref="First"
                     :class="{'will-change-transform': moving}"/>
        </Transition>

        <Transition name="fade">
          <SecondPage @next="nextSlide" @prev="prevSlide" v-if="showSecond" ref="Second"
                      :class="{'will-change-transform': moving}"/>
        </Transition>

        <Transition name="fade">
          <ThirdPage @next="nextSlide" @prev="prevSlide" v-if="showThird" ref="Third"
                     :class="{'will-change-transform': moving}"/>
        </Transition>

        <Transition name="fade">
          <FourthPage @prev="prevSlide" @next="nextSlide" v-if="showFourth" ref="Fourth"
                      :class="{'will-change-transform': moving}"/>
        </Transition>

        <Paginate class="hidden lg:block" v-if="showPaginate" ref="paginate"/>
      </div>
      <!--      <div v-if="!getLoading"
                 class="flex justify-between items-center h-16 lg:hidden text-[14px] font-['Archia'] uppercase px-3">
              <span @click="nextSlide" class="flex h-16 items-center gap-x-2 cursor-pointer"
                    :class="[currentSlide === 4 && 'opacity-0']">

                <svg class="rotate-180" width="12" height="12" viewBox="0 0 12 12" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M9.23692 6.78951L3.74881 6.78951L5.88039 8.92109L5.2106 9.59088L1.93555 6.31583L5.2106 3.04078L5.88039 3.71057L3.74881 5.84214L9.23692 5.84215L9.23692 6.78951Z"
                      fill="black"/>
                </svg>
                <span>

                  NEXT
                </span>



              </span>
              <span @click="prevSlide" class="flex h-16  items-center gap-x-2 cursor-pointer"
                    :class="[currentSlide === 0 && 'opacity-0']">


                <span>
                  PREVIOUS
                </span>

                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M9.23692 6.78951L3.74881 6.78951L5.88039 8.92109L5.2106 9.59088L1.93555 6.31583L5.2106 3.04078L5.88039 3.71057L3.74881 5.84214L9.23692 5.84215L9.23692 6.78951Z"
                      fill="black"/>
                </svg>
              </span>
            </div>-->

    </div>


  </section>
</div>



</template>

<script setup>
import {useGlobalStore} from "~/stores/global.js";
const store = useGlobalStore()

const {getLoading, getIsLoadingPlayed , getShowContent} = storeToRefs(useGlobalStore())
const {setShowLogo, setCurrentSlide, endLoading , setShowContent} = useGlobalStore()
const manualProgress = ref(50);

const bgLine = ref(null)
const showSection = ref(true)
const hoverLine = ref(null)


watch(getLoading, (value) => {
  if (!value) {
    initPage()
  }
})


useHead({
  title: 'گروه پرداد',
  description: 'گروه پرداد',
  keywords: 'گروه پرداد',
  script: [
    {
      id: 'org-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "گروه پرداد",
        "alternateName": "Pardad Industrial Group",
        "url": "https://pardad-group.com",
        "logo": "https://pardad-group.com/_nuxt/pardad.DGx5aZAf.png",
        "description": "گروه پرداد یکی از پیشروترین واردکنندگان و تأمین‌کنندگان قطعات صنعتی در ایران است که با سه شرکت زیرمجموعه، چهار فروشگاه صنعتی و یک واحد اختصاصی حمل‌ونقل فعالیت می‌کند.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IR",
          "addressRegion": "تهران",
          "addressLocality": "تهران",
          "streetAddress": "خیابان سهروردی شمالی، بن‌بست بیشه، پلاک ۵، طبقه ۵، واحد ۵۰۱"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+98-21-82800001",
          "contactType": "customer support",
          "areaServed": "IR",
          "availableLanguage": ["fa", "en"]
        },
        "sameAs": [
          "https://www.instagram.com/pardadgroup",
          "https://www.linkedin.com/company/pardad-group"
        ]
      })
    },
    {
      id: 'website-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://pardad-group.com",
        "name": "گروه پرداد",
        "alternateName": "Pardad Industrial Group",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://pardad-group.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      })
    }
  ],
  __dangerouslyDisableSanitizersByTagID: {
    'org-schema': ['innerHTML'],
    'website-schema': ['innerHTML']
  }
})


const paginate = ref(null)
const Home = ref(null)
const First = ref(null)
const Second = ref(null)
const Fourth = ref(null)
const Third = ref(null)
const showHome = ref(false)
const showFirst = ref(false)
const showSecond = ref(false)
const showFourth = ref(false)
const showThird = ref(false)

const section = ref(null)

const showPaginate = ref(false)

const moving = ref(false)

useSeoMeta({})

useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s',
})

const currentSlide = ref(0);
const sliderRef = ref(null);
let debounceTimeout = null;
let debounceTimeoutKey = null;


const paginateHandler = (value) => {
  if (value > 0) {
    showPaginate.value = true
    setTimeout(() => {
      if(paginate.value){
        paginate.value.goToStep(currentSlide.value)
      }

    }, 5)
  } else {
    showPaginate.value = false
  }

}

const nextSlide = () => {
  if (currentSlide.value < 4) {
    const oldStep = currentSlide.value
    moving.value = true
    backAnimationHandler(oldStep)
    currentSlide.value++;
    setCurrentSlide(currentSlide.value)
    if (oldStep > 0) {
      paginateHandler(currentSlide.value)

    }
    setTimeout(() => {
      hideSlide(oldStep)
      showSlide(currentSlide.value)
      if (oldStep === 0) {
        paginateHandler(currentSlide.value)
      }
      setTimeout(() => {
        startAnimationHandler(currentSlide.value)
      }, 5)
    }, 1200)

  }
  mobileLine(currentSlide.value)
};


const prevSlide = () => {

  if (currentSlide.value > 0) {
    const oldStep = currentSlide.value
    moving.value = true
    backAnimationHandler(oldStep)
    currentSlide.value--;
    setCurrentSlide(currentSlide.value)
    paginateHandler(currentSlide.value)
    setTimeout(() => {
      hideSlide(oldStep)
      showSlide(currentSlide.value)

      setTimeout(() => {
        startAnimationHandler(currentSlide.value)
      }, 5)
    }, 1000)
  }
  mobileLine(currentSlide.value)
};


const backAnimationHandler = (value) => {
  switch (value) {
    case 0:
      if(Home.value){
        Home.value.closeAnimation()
      }

      break;
    case 1:
      if(First.value){
        First.value.closeAnimation()
      }
      break;
    case 2:
      if(Second.value){
        Second.value.closeAnimation()
      }
      break;
    case 3:
      if(Third.value){
        Third.value.closeAnimation()
      }


      break;
    case 4:
      if(Fourth.value){
        Fourth.value.closeAnimation()
      }
      break;
    default:

      break;
  }
}

const startAnimationHandler = (value) => {
  switch (value) {
    case 0:
      if(Home.value){
        Home.value.startAnimation()
      }

      break;
    case 1:
      if( First.value){
        First.value.startAnimation()
      }

      break;
    case 2:
      if(Second.value){
        Second.value.startAnimation()
      }

      break;
    case 3:
      if(Third.value){

        Third.value.startAnimation()

      }


      break;
    case 4:
      if(Fourth.value){
        Fourth.value.startAnimation()
      }

      break;
    default:

      break;
  }
}
const restartAnimationHandler = (value) => {

  switch (value) {
    case 0:

      Home.value.restartAnimation()
      break;
    case 1:

      First.value.restartAnimation()
      break;
    case 2:

      Second.value.restartAnimation()
      break;
    case 3:

      Third.value.restartAnimation()

      break;
    case 4:
      Fourth.value.restartAnimation()
      break;
    default:

      break;

  }

  /*setTimeout(()=>{

    slideHandler()
  },2000)*/
}

const showSlide = (value) => {
  switch (value) {
    case 0:
      showHome.value = true
      setTimeout(() => {
        if(Home.value){
          Home.value.showSectionHandler(true);
        }


        setShowLogo(true)


      }, 5)
      break;
    case 1:
      showFirst.value = true
      setTimeout(() => {
        if(First.value){
          First.value.showSectionHandler(true);
        }

      }, 5)

      break;
    case 2:
      showSecond.value = true
      setTimeout(() => {
        if(Second.value){
          Second.value.showSectionHandler(true);
        }


      }, 5)

      break;
    case 3:
      showThird.value = true
      setTimeout(() => {
        if(Third.value){
          Third.value.showSectionHandler(true);
        }
      }, 5)


      break;
    case 4:
      showFourth.value = true
      setTimeout(() => {
        if(Fourth.value){
          Fourth.value.showSectionHandler(true);
        }
      }, 5)

      break;
    default:

      break;
  }
}
const hideSlide = (value) => {

  switch (value) {
    case 0:
      if(Home.value){
        Home.value.showSectionHandler(false);
      }
      setTimeout(() => {
        showHome.value = false
      }, 5)
      break;
    case 1:
      if(First.value){
        First.value.showSectionHandler(false);
      }
      setTimeout(() => {
        showFirst.value = false
      }, 5)
      break;
    case 2:
      if(Second.value){
        Second.value.showSectionHandler(false);
      }
      setTimeout(() => {
        showSecond.value = false
      }, 5)
      break;
    case 3:
      if(Third.value){
        Third.value.showSectionHandler(false);
      }
      setTimeout(() => {
        showThird.value = false
      }, 5)
      break;
    case 4:
      if(Fourth.value){
        Fourth.value.showSectionHandler(false);
      }
      setTimeout(() => {
        showFourth.value = false
      }, 5)
      break;
    default:

      break;
  }
}


/*
const handleWheel = (event) => {
  if (debounceTimeout) return;

  debounceTimeout = setTimeout(() => {
    debounceTimeout = null;
    moving.value = false
  }, 1000);

  const isMobile = window.innerWidth <= 1024;

  if (isMobile) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    // پایین‌ترین نقطه
    const atBottom = scrollTop + clientHeight >= scrollHeight;
    // بالاترین نقطه
    const atTop = scrollTop === 0;

    if (event.deltaY > 0 && atBottom) {
      // اسکرول به پایین و دیگه جایی برای اسکرول نیست → اسلاید بعد
      nextSlide();
    } else if (event.deltaY < 0 && atTop) {
      // اسکرول به بالا و دیگه جایی برای اسکرول نیست → اسلاید قبل
      prevSlide();
    }
    // ⚠️ در غیر این صورت بذار اسکرول عادی خودش کار کنه
  } else {
    // دسکتاپ مثل قبل
    if (event.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
};

const handleKey = (event) => {

  // جلوگیری از چندبار فراخوانی
  if (debounceTimeoutKey) return;

  debounceTimeoutKey = setTimeout(() => {
    debounceTimeoutKey = null;
  }, 3000); // مدت‌زمان وقفه بین دو اسکرول

  if (event.keyCode === 40) {
    nextSlide();
  }
  if (event.keyCode === 38) {
    prevSlide();
  }
};
*/

const mobileLine = (ind) => {
  if(hoverLine.value){
    hoverLine.value.style.width = `${((ind) / 4) * 100}%`
  }

}
const mobileLineAnimation = (ind) => {
  bgLine.value.style.width = `100%`
}

const initPage = () => {
  setShowContent(true)
  showSection.value = true
  moving.value = true

  showSlide(currentSlide.value)
  setCurrentSlide(currentSlide.value)

  setTimeout(() => {
    startAnimationHandler(currentSlide.value)
    mobileLineAnimation()
    setTimeout(() => {
      mobileLine(0)
    }, 1000)
  }, 5)

}




const SLIDE_LOCK_MS = 900;   // مدت لاک بعد از جابه‌جایی اسلاید (با انیمیشن‌ت هماهنگ باشه)
const SCROLL_END_MS = 140;   // سکوت بین رویدادهای scroll برای تشخیص پایان اسکرول

// ====== state ======
let isTransitioning = false;
let scrollEndTimer = null;
let touchStartY = 0;
let lastIntent = null; // 'down' | 'up' | null

const isMobile = () => window.innerWidth <= 1024;

const triggerOnce = (fn) => {
  if (isTransitioning) return;
  isTransitioning = true;
  try { fn(); } finally {
    setTimeout(() => { isTransitioning = false; }, SLIDE_LOCK_MS);
  }
};

const atEdges = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;
  const atBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight - 1);
  const atTop = scrollTop <= 0;
  return { atTop, atBottom };
};

// ====== MOBILE: touch + scroll-end detection ======
const onTouchStart = (e) => {
  if (!isMobile()) return;
  touchStartY = e.touches[0].clientY;
  lastIntent = null;
};

const onTouchMove = (e) => {
  if (!isMobile()) return;
  const y = e.touches[0].clientY;
  const dy = y - touchStartY;
  if (Math.abs(dy) > 4) lastIntent = dy < 0 ? 'down' : 'up'; // down = کشیدن به بالا
};

const onTouchEnd = () => {
  if (!isMobile()) return;
  // بعد از رها کردن تاچ، صبر کن تا مومنتوم اسکرول تموم بشه
  scheduleScrollEndCheck();
};

const onScroll = () => {
  if (!isMobile()) return;
  scheduleScrollEndCheck();
};

const scheduleScrollEndCheck = () => {
  clearTimeout(scrollEndTimer);
  scrollEndTimer = setTimeout(onScrollEnd, SCROLL_END_MS);
};

const onScrollEnd = () => {
  if (!isMobile()) return;
  if (isTransitioning) return;
  if (!lastIntent) return; // جهت نامشخص؛ کاربر شاید فقط تپ کرده
  const { atTop, atBottom } = atEdges();

  if (lastIntent === 'down' && atBottom) {
    // کاربر خواسته پایین‌تر بره ولی دیگه اسکرول نمی‌خوره → اسلاید بعد
    triggerOnce(nextSlide);
    lastIntent = null;
    return;
  }
  if (lastIntent === 'up' && atTop) {
    // کاربر خواسته بالاتر بره ولی دیگه اسکرول نمی‌خوره → اسلاید قبل
    triggerOnce(prevSlide);
    lastIntent = null;
    return;
  }

  // هنوز وسط صفحه‌ایم یا به مرز نرسیدیم → کاری نکن
};

// ====== DESKTOP: wheel ======
const handleWheel = (event) => {
  if (isMobile()) return; // روی موبایل با touch/scroll کنترل می‌کنیم
  if (isTransitioning) return;

  if (event.deltaY > 0) {
    triggerOnce(nextSlide);
  } else if (event.deltaY < 0) {
    triggerOnce(prevSlide);
  }
};

// ====== KEYBOARD (هر بار یک اسلاید) ======
const handleKey = (event) => {
  if (isTransitioning) return;
  if (event.keyCode === 40) triggerOnce(nextSlide); // ArrowDown
  if (event.keyCode === 38) triggerOnce(prevSlide); // ArrowUp
};
onMounted(() => {

  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchmove', onTouchMove, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('wheel', handleWheel, { passive: true });
  window.addEventListener('keydown', handleKey);

  setTimeout(() => {
    endLoading()
    store.setShowContent(true)
  }, 100)
});
onUnmounted(() => {
  document.removeEventListener("wheel", handleWheel);
  document.removeEventListener("keyup", handleKey);
});
onBeforeRouteLeave(() => {


  showSection.value = false
})
</script>

<style scoped>
.home__pagination__text__inner {
  direction: ltr;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>