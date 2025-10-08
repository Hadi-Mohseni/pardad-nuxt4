<template>
  <div class="relative w-full" :class="[height]">
    <div class="blog-container z-10 w-full relative">
      <!--         TODO  @mousemove="onMouseMove"  add to first div-->
      <div v-show="selection"
           class="absolute left-0 top-0 bottom-0 h-full  flex flex-col justify-center items-center gap-y-5 z-10">
        <div :class="indx + 1 === activeIndex ? 'text-white-100' : ''"
             class="flex justify-end w-full"
             ref="leftBtn"
             dir="ltr"
             v-for="(sliderItemBtn,indx) in sliderItems"
             :key="indx"
             @click="changeSlideByBtns(sliderItemBtn , indx + 1)">
          <div class="flex flex-col justify-end w-full pr-4 cursor-pointer pb-2"
               :class="[indx + 1 === activeIndex ? 'dark:text-white-100 text-black-30' : 'text-black-30 dark:text-white-30']">

            - {{ sliderItemBtn.title }}


            <template v-show="indx + 1 === activeIndex">

              <div v-show="subListLoading" class="ml-4 mt-2">
                <svg class="fill-white-70 " width="24" height="24" viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="6" width="2.8" height="12">
                    <animate id="spinner_CcmT" begin="0;spinner_IzZB.end-0.1s" attributeName="y" calcMode="spline"
                             dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                    <animate begin="0;spinner_IzZB.end-0.1s" attributeName="height" calcMode="spline" dur="0.6s"
                             values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                  </rect>
                  <rect x="5.8" y="6" width="2.8" height="12">
                    <animate begin="spinner_CcmT.begin+0.1s" attributeName="y" calcMode="spline" dur="0.6s"
                             values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                    <animate begin="spinner_CcmT.begin+0.1s" attributeName="height" calcMode="spline" dur="0.6s"
                             values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                  </rect>
                  <rect x="10.6" y="6" width="2.8" height="12">
                    <animate begin="spinner_CcmT.begin+0.2s" attributeName="y" calcMode="spline" dur="0.6s"
                             values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                    <animate begin="spinner_CcmT.begin+0.2s" attributeName="height" calcMode="spline" dur="0.6s"
                             values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                  </rect>
                  <rect x="15.4" y="6" width="2.8" height="12">
                    <animate begin="spinner_CcmT.begin+0.3s" attributeName="y" calcMode="spline" dur="0.6s"
                             values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                    <animate begin="spinner_CcmT.begin+0.3s" attributeName="height" calcMode="spline" dur="0.6s"
                             values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                  </rect>
                  <rect x="20.2" y="6" width="2.8" height="12">
                    <animate id="spinner_IzZB" begin="spinner_CcmT.begin+0.4s" attributeName="y" calcMode="spline"
                             dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                    <animate begin="spinner_CcmT.begin+0.4s" attributeName="height" calcMode="spline" dur="0.6s"
                             values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                  </rect>
                </svg>
              </div>
              <div ref="subListRef" class="mt-4" v-else>
                <div class="flex flex-col text-sm pl-2 text-gray-100 cursor-pointer animate__animated fadeInDown"
                     v-for="(item,index) in subList" :key="index">

                  <nuxt-link class="py-2 pl-4" :to="`/${subRouteName}/${item.value}/${item.label.replaceAll(' ' ,'-')}`">
                    {{ item.label }}
                  </nuxt-link>
                </div>

              </div>
            </template>

          </div>
        </div>
      </div>


      <div class="relative mx-auto " :class="[height , width]">

        <ul class="card-list  mx-auto  " dir="rtl" ref="cards" :class="[height , width]">
          <li class=" "


              v-for="(sliderItem,index) in sliderItemsLi"
              :key="index"
          >
            <nuxt-link :to="`/${routeName}/${sliderItem.id}/${sliderItem.title.replaceAll(' ' ,'-')}`">
              <div :class="[height , index === sliderItems.length - 1 ? 'activeNow' : '' , index === 0 && '']" :style="{backgroundColor: sliderItem.bgColor,
               color: sliderItem.txtColor   }"
                   :data-id="sliderItem.id"
                   :data-index="sliderItemsLi.length - index" ref="sliders"
                   class="flex flex-col text-right justify-between  mx-auto gap-y-8 absolute rounded-sm inset-0 transition-all p-8 ">

                <!--          <nuxt-link :to="{name:'blog-id' , params:{id:sliderItem.id}}">-->
                <h2 class="text-3xl text-right h-12">
                  {{ sliderItem.title }}
                </h2>
                <div v-show="showDescription">

                  <h3 class="text-1xl text-right h-8">
                    {{ sliderItem.subtitle }}
                  </h3>
                  <h4 class="text-md text-right  line-clamp-4">
                    <!--                {{ sliderItem.description }}-->
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, at dicta omnis
                    recusandae
                    velit voluptatum. Cupiditate doloribus dolorum eaque excepturi, fuga nulla omnis quidem. Doloribus
                    illum
                    ipsum molestiae nesciunt.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, at dicta omnis
                    recusandae
                    velit voluptatum. Cupiditate doloribus dolorum eaque excepturi, fuga nulla omnis quidem. Doloribus
                    illum
                    ipsum molestiae nesciunt.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam, at dicta omnis
                    recusandae
                    velit voluptatum. Cupiditate doloribus dolorum eaque excepturi, fuga nulla omnis quidem. Doloribus
                    illum
                    ipsum molestiae nesciunt.
                  </h4>
                </div>

                <span v-show="showDescription" class="text-sm text-left">
                  بیشتر
              </span>
              </div>
            </nuxt-link>

          </li>

        </ul>
        <div v-show="arrow"
             class="absolute right-0 top-0 bottom-0 h-full  flex flex-col justify-center items-center gap-y-10 z-10">
          <button class="prev"
                  @click="prevSlideHandler">
            <svg class="stroke-white-100" fill="none" height="11" viewBox="0 0 21 11" width="21"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="m.5 10.5 10-10 10 10" stroke-linecap="round" stroke-linejoin="round"
                    stroke-miterlimit="10"/>
            </svg>
          </button>
          <button class="switch-buttons next"
                  @click="nextSlideHandler">
            <svg class="stroke-white-100" fill="none" height="11" viewBox="0 0 21 11" width="21"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="m.5 10.5 10-10 10 10" stroke-linecap="round" stroke-linejoin="round"
                    stroke-miterlimit="10"/>
            </svg>
          </button>
        </div>
      </div>


    </div>
  </div>

</template>

<script setup>
import {useGlobalStore} from "~/stores/global";


const props = defineProps({
  height: {
    type: String,
    default: 'h-[450px]'
  },
  width: {
    type: String,
    default: 'w-full'
  },
  arrow: {
    type: Boolean,
    default: true
  },
  selection: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,

  },
  items: {
    type: Array,
    default: []
  },
  subItems: {
    type: Array,
    default: []
  },
  subLoading: {
    type: Boolean,
    default: false
  },
  routeName: {
    type: String,
    default: 'category'
  },
  subRouteName: {
    type: String,
    default: 'main'
  },
  showDescription: {
    type: Boolean,
    default: true
  }

})

const subListRef = ref(null)
const subList = computed(() => {
  return props.subItems
})
const activeIndex = ref(1)

const targetX = ref(0)
const halfWidth = ref(0)
const targetY = ref(0)
const lastX = ref(0)
const lastY = ref(0)
const zDistance = ref('8vw')
const showList = ref(false)
const halfHeight = ref(0)
const animationRunning = ref(false)
const currentSlide = ref(0)
const activeSlideIndex = ref(0)
const colorCache = ref({})
const sliderItemsLi = ref([])
const subListLoading = computed(() => {

  return props.subLoading
})

const emit = defineEmits(['get-list'])


/* [
      {
        id: 1,
        title: 'Alice1',
        subtitle: 'Alice',
        bgColor: '#88d8f3',
        txtColor: '#000',
      },
      {
        id: 2,
        title: 'Alice2',
        subtitle: 'Alice2',
        bgColor: '#ecdb68',
        txtColor: '#000',
      },
      {
        id: 3,
        title: 'Alice3',
        subtitle: 'Alice2',
        bgColor: '#7cf372',
        txtColor: '#000',
      },
      {
        id: 4,
        title: 'Alice4',
        subtitle: 'Alice2',
        bgColor: '#e8a18b',
        txtColor: '#000',
      },
      {
        id: 5,
        title: 'Alice5',
        subtitle: 'Alice2',
        bgColor: '#fb5252',
        txtColor: '#000',
      },
    ]

 */
const sliderItems = computed(() =>props.items)
const animationStopped = ref(false)
const scriptEle = ref(null)
const cards = ref(null)
const sliders = ref(
    [
      {
        id: 1,
        title: 'Alice',
        subtitle: 'Alice',
        bgColor: '#edf6fa',
        txtColor: '#000',
      },
      {
        id: 2,
        title: 'Alice2',
        subtitle: 'Alice2',
        bgColor: '#f8a5a5',
        txtColor: '#000',
      },
    ]
)


const global = useGlobalStore()


useHead({
  title: 'بلاگ',
  meta: [
    {
      name: 'blog description',
      content: 'blog page content'
    }
  ]
})
const initialPageObj = {
  name: 'blog',
  removeClass: 'light',
  addClass: 'dark',
}


sliderItemsLi.value = props.items.slice().reverse()


const nextSlideHandler = () => {
  if (activeIndex.value < sliderItems.value.length) {
    activeIndex.value++
  } else {
    activeIndex.value = 1
  }
  nextSlide()
}

const prevSlideHandler = () => {
  if (activeIndex.value > 1) {
    activeIndex.value--
  } else {
    activeIndex.value = sliderItems.value.length
  }
  prevSlide()
}


const prependListFunc = () => {
  for (let i = 1; i < cards.value.children.length; i++) {


    if (i === cards.value.children.length - 1) {

      cards.value.children[i].classList.remove("transformThis", "activeNow")
      cards.value.prepend(cards.value.children[i])
    }
  }
}

const lastItemFunc = () => {
  for (let j = cards.value.children.length - 1; j >= 0; j--) {


    if (j === cards.value.children.length - 1) {

      cards.value.children[j].classList.remove('transformPrev')
      cards.value.children[j].classList.add('transformThis')
      cards.value.children[j].previousElementSibling.classList.add('activeNow')
    }
  }
}

const nextSlide = () => {


  lastItemFunc()


  setTimeout(() => {
    prependListFunc()
  }, 1000)
}
const prevSlide = () => {


  /*let cards = document.querySelectorAll('.card')
  let ulList = document.querySelector(".card-list")*/
  // let leftMenuBtns = document.querySelectorAll('.left-menu-btn')


  const appendToList = () => {

    // for (let i = 1; i < cards.length; i++) {
    // if (i === 0) {

    cards.value.children[0].classList.add("transformPrev")

    cards.value.append(cards.value.children[0])
    // }
    // }
  }
  for (let j = cards.value.children.length - 1; j >= 0; j--) {
    if (j === cards.value.children.length - 1) {
      cards.value.children[j].classList.remove('transformPrev')
      cards.value.children[j].classList.add('activeNow')

      cards.value.children[j].previousElementSibling.classList.remove('activeNow')
    }
  }

  setTimeout(function () {
    appendToList()
  }, 200)
}


const isActiveBtn = (index) => {

  /*setTimeout( ()=> {
    let cards = document.querySelectorAll('.card')
    let leftBtns = document.querySelectorAll('.left-menu-btn')

    if (cards[index].classList.contains('activeNow')) {
      return true
    } else {
      return false
    }
  }, 150)*/
}


const changeSlideByArrowKeys = (event) => {
  switch (event.keyCode) {
    case 38: // Up arrow
      prevSlideHandler()
      break
    case 40: // Down arrow
      nextSlideHandler()
      break
  }
}


const changeSlideByBtns = async (item, indx) => {


  if (activeIndex.value > indx) {
    const diff = activeIndex.value - indx
    activeIndex.value = indx
    let i = 0


    const myTimer = () => {
      if (i < diff) {
        i++
        prevSlide()
      } else {
        myStopFunction()
      }
    }
    const myInterval = setInterval(myTimer, 250);
    const myStopFunction = () => {
      clearInterval(myInterval);
    }


    if (i > diff) {
      myStopFunction()
    }

  } else if (activeIndex.value < indx) {

    const diff = indx - activeIndex.value

    activeIndex.value = indx
    let i = 0
    const myTimer = () => {
      if (i < diff) {
        i++
        nextSlide()
      } else {
        myStopFunction()
      }
    }
    const myInterval = setInterval(myTimer, 250);
    const myStopFunction = () => {
      clearInterval(myInterval);
    }


    if (i > diff) {
      myStopFunction()
    }


  }

  emit('get-list', item.id)


}


const getCustomFilter = (customFilter, allFilters) => {
  return customFilter.filter(item => allFilters.some(val => val === item.value))
}

const onMouseMove = ({pageX, pageY}) => {

  targetX.value = pageX;
  targetY.value = pageY;

  if (!animationRunning.value) {
    animationRunning.value = true;
    runAnimation();
  }
}

const lerp = ({x, y}, {x: targetX, y: targetY}) => {
  const fraction = 0.1;

  x += (targetX - x) * fraction;
  y += (targetY - y) * fraction;

  return {x, y};
}

const getMouseCoefficients = ({pageX, pageY} = {}) => {
  const halfWid = halfWidth.value;
  const halfHgt = halfHeight.value;
  const xCoeff = ((pageX || targetX.value) - halfWid) / halfWid;
  const yCoeff = (halfHgt - (pageY || targetY.value)) / halfHgt;

  return {xCoeff, yCoeff}
}


const requestAnimationFrame = () => {


  animationStopped.value = false;
  positionImage(getMouseCoefficients());

  // currentImg.classList.add(transitClass, inClass);
  // currentImg.addEventListener('transitionend', onImageTransitionEnd);
}

const reachedFinalPoint = () => {
  const lX = ~~lastX.value;
  const lY = ~~lastY.value;
  const tX = targetX.value;
  const tY = targetY.value;

  return (lX == tX || lX - 1 == tX || lX + 1 == tX)
      && (lY == tY || lY - 1 == tY || lY + 1 == tY);
}
const positionImage = ({xCoeff, yCoeff}) => {
  const maxImgOffset = 1;

  const currentImage = cards.value;

  currentImage.style.setProperty('transform', `
      translateX(${maxImgOffset * -xCoeff}deg)
      translateY(${maxImgOffset * yCoeff}deg)
    `);
}

const runAnimation = () => {
  if (animationStopped.value) {
    animationRunning.value = false;
    return;
  }

  const maxX = 10;
  const maxY = 10;

  const newPos = lerp({
    x: lastX.value,
    y: lastY.value
  }, {
    x: targetX.value,
    y: targetY.value
  });

  const {xCoeff, yCoeff} = getMouseCoefficients({
    pageX: newPos.x,
    pageY: newPos.y
  });

  lastX.value = newPos.x;
  lastY.value = newPos.y;

  positionImage({xCoeff, yCoeff});

  cards.value.style.setProperty('transform', `
      translateZ(${zDistance.value})
      rotateX(${maxY * yCoeff}deg)
      rotateY(${maxX * xCoeff}deg)
    `);

  if (reachedFinalPoint) {
    animationRunning.value = false;
  } else {
    requestAnimationFrame();
  }
}

const initialY = ref(0)
const currentY = ref(0)
const deltaY = ref(0)
const onMouseDown = (event) => {
  initialY.value = event.clientY;
}
const onTouchDownFunc = (event) => {
  initialY.value = event.changedTouches[0].clientY;
}
const onMouseDownMove = (event) => {
  currentY.value = event.clientY;
  deltaY.value = currentY.value - initialY.value;

  // جهت حرکت را بررسی کنید
  if (deltaY.value > 0) {
    console.log('به سمت پایین حرکت می کند');
  } else if (deltaY.value < 0) {
    console.log('به سمت بالا حرکت می کند');
  }

  // از حرکت پیش فرض جلوگیری کنید (انتخاب متن)
  event.preventDefault();

}
const onMouseDownMoveFunc = (event) => {
  currentY.value = event.changedTouches[0].clientY;

  deltaY.value = currentY.value - initialY.value;

  // جهت حرکت را بررسی کنید
  if (deltaY.value > 0) {
    console.log('به سمت پایین حرکت می کند');
  } else if (deltaY.value < 0) {
    console.log('به سمت بالا حرکت می کند');
  }

  // از حرکت پیش فرض جلوگیری کنید (انتخاب متن)
  event.preventDefault();

}
const onMouseUp = (event) => {

  initialY.value = 0;
  deltaY.value = 0;

}


onMounted(() => {

  if (process.client) {
    window.addEventListener('keydown', changeSlideByArrowKeys)
    halfWidth.value = innerWidth / 2
    halfHeight.value = innerHeight / 2


  }

})
onBeforeMount(() => {

})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', changeSlideByArrowKeys)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('touchend', onMouseUp);
  window.removeEventListener('touchcancel', onMouseUp);
  window.removeEventListener('mouseleave', onMouseUp);

  window.removeEventListener('mousemove', onMouseDownMove)
  window.removeEventListener('mousedown', onMouseDown)
  if (process.client) {
    window.removeEventListener('keydown', changeSlideByArrowKeys)
  }
})
</script>

<!--<script>
export default {
  name: "index",
  data: function () {
    return {
      targetX: 0,
      halfWidth: 0,
      targetY: 0,
      lastX: 0,
      lastY: 0,
      zDistance: '8vw',
      halfHeight: 0,
      animationRunning: false,
      sliderItems: [
        {
          id: 1,
          name: 'Alice',
          bgColor: '#edf6fa',
          txtColor: '#000',
        },
        {
          id: 2,
          name: 'Bob',
          bgColor: '#fef1ef',
          txtColor: '#000',
        },
        {
          id: 3,
          name: 'Carol',
          bgColor: '#6b5aed',
          txtColor: '#fff',

        },
        {
          id: 4,
          name: 'Dennis',
          bgColor: '#cce8ff',
          txtColor: '#000',
        },
        /*{
            id: 5,
            name: 'Jon',
            bgColor: '#5a20cd',
            txtColor: '#fff',
            top: '48px',/!* +12 from 24 *!/
            width: '75%' /!* +5 from 55 *!/
        },
        {
            id: 6,
            name: 'Francis',
            bgColor: '#BB3EDD',
            txtColor: '#fff',
            top: '60px',/!* +12 from 24 *!/
            width: '80%' /!* +5 from 55 *!/
        },
        {
            id: 7,
            name: 'Ted',
            bgColor: '#eff2f6',
            txtColor: '#000',
            top: '72px',/!* +12 from 24 *!/
            width: '85%' /!* +5 from 55 *!/
        },
        {
            id: 8,
            name: 'Rachel',
            bgColor: '#e4e4e4',
            txtColor: '#000',
            top: '96px',/!* +12 from 24 *!/
            width: '90%' /!* +5 from 55 *!/
        },
        {
            id: 9,
            name: 'Chandler',
            bgColor: '#02938f',
            txtColor: '#fff',
            top: '108px',/!* +12 from 24 *!/
            width: '95%' /!* +5 from 55 *!/
        },
        {
            id: 10,
            name: 'Monica',
            bgColor: '#55d1bd',
            txtColor: '#fff',
            top: '120px',/!* +12 from 24 *!/
            width: '100%' /!* +5 from 55 *!/
        }*/
      ],
      activeIndex: 1,
      currentSlide: 0,
      activeSlideIndex: 0,
      colorCache: {},
      sliderItemsLi: [],

      scriptEle: null
    }
  },
  beforeMount() {
    this.sliderItemsLi = this.sliderItems.slice().reverse()
    // this.sliderItemsLi = this.sliderItems
  },
  mounted() {
    window.addEventListener('keydown', this.changeSlideByArrowKeys)
    /* document.body.style.backgroundColor = '#0a0a0a'
     document.body.classList.add('dark-bg', 'active')
     document.documentElement.classList.add('dark')*/
    this.halfWidth = innerWidth / 2
    this.halfHeight = innerHeight / 2

    /*    document.querySelector('#__nuxt').removeAttribute('class')

        document.querySelector('#__nuxt').classList.add('page-id-blog')

        document.body.classList.remove('color-light')
        document.body.classList.add('color-dark')*/

    setTimeout(() => {
      /* let animationScript = document.createElement('script')
       animationScript.setAttribute('src', '/assets/js/scripts.js')
         animationScript.setAttribute('type', 'module')
       this.scriptEle = document.querySelector('#__nuxt').appendChild(animationScript)*/
    }, 1000)


  },

  unmounted() {

  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.changeSlideByArrowKeys)
    // window.removeEventListener('wheel', this.changeSlideByWheel)
  },
  created() {

    // window.addEventListener('wheel', this.changeSlideByWheel)
  },
  computed: {},
  methods: {
    nextSlideHandler() {
      if (this.activeIndex < this.sliderItems.length) {
        this.activeIndex++
      } else {
        this.activeIndex = 1
      }
      this.nextSlide()
    },
    calcTop(value) {
      const max = 100 - (this.sliderItemsLi.length * 2)
      console.log(max)
      return (max + (+value * 2))
    },

    prevSlideHandler() {
      if (this.activeIndex > 1) {
        this.activeIndex&#45;&#45;
      } else {
        this.activeIndex = this.sliderItems.length
      }
      this.prevSlide()
    },

    nextSlide() {


      let cards = document.querySelectorAll('.card')
      let ulList = document.querySelector(".card-list")
      // let leftMenuBtns = document.querySelectorAll('.left-menu-btn')
      const prependList = () => {

        for (let i = 1; i < cards.length; i++) {


          if (i === cards.length - 1) {
            cards[i].classList.remove("transformThis", "activeNow")

            ulList.prepend(cards[i])
          }
        }

      }

      for (let j = cards.length - 1; j >= 0; j&#45;&#45;) {

        if (j === cards.length - 1) {
          cards[j].classList.remove('transformPrev')
          cards[j].classList.add('transformThis')
          cards[j].previousElementSibling.classList.add('activeNow')
        }
      }

      setTimeout(() => {
        prependList()
      }, 200)
    },
    prevSlide() {


      let cards = document.querySelectorAll('.card')
      let ulList = document.querySelector(".card-list")
      // let leftMenuBtns = document.querySelectorAll('.left-menu-btn')

      const appendToList = () => {

        // for (let i = 1; i < cards.length; i++) {
        // if (i === 0) {
        cards[0].classList.add("transformPrev")
        ulList.append(cards[0])
        // }
        // }
      }
      for (let j = cards.length - 1; j >= 0; j&#45;&#45;) {
        if (j === cards.length - 1) {
          cards[j].classList.remove('transformPrev')
          cards[j].classList.add('activeNow')

          cards[j].previousElementSibling.classList.remove('activeNow')
        }
      }

      setTimeout(function () {
        appendToList()
      }, 200)
    },
    isActiveBtn(index) {
      setTimeout(function () {
        let cards = document.querySelectorAll('.card')
        let leftBtns = document.querySelectorAll('.left-menu-btn')

        if (cards[index].classList.contains('activeNow')) {
          return true
        } else {
          return false
        }
      }, 150)
    },
    changeSlideByArrowKeys(event) {
      switch (event.keyCode) {
        case 38: // Up arrow
          this.prevSlideHandler()
          break
        case 40: // Down arrow
          this.nextSlideHandler()
          break
      }
    },
    changeSlideByWheel(event) {
      if (event.deltaY < 0) {
        // scroll up
        this.prevSlide()
      } else if (event.deltaY > 0) {
        // scroll down
        this.nextSlide(1)
      }
    },
    changeSlideByBtns(indx) {
      if (this.activeIndex > indx) {
        const diff = this.activeIndex - indx
        this.activeIndex = indx
        let i = 0


        const myTimer = () => {
          if (i < diff) {
            i++
            this.prevSlide()
          } else {
            myStopFunction()
          }
        }
        const myInterval = setInterval(myTimer, 250);
        const myStopFunction = () => {
          clearInterval(myInterval);
        }


        if (i > diff) {
          myStopFunction()
        }

      } else if (this.activeIndex < indx) {

        const diff = indx - this.activeIndex

        this.activeIndex = indx
        let i = 0
        const myTimer = () => {
          if (i < diff) {
            i++
            this.nextSlide()
          } else {
            myStopFunction()
          }
        }
        const myInterval = setInterval(myTimer, 250);
        const myStopFunction = () => {
          clearInterval(myInterval);
        }


        if (i > diff) {
          myStopFunction()
        }

      }


      //
      // let cards = document.querySelectorAll('.card')
      // // // activeNow
      // let active_id
      //
      // let selected_indx
      // // let selected_indx = cards[active_id].getAttribute('data-index')
      // let iterate_number
      // cards.forEach(card => {
      //     // if (card.classList.contains('activeNow')) {
      //     if (parseInt(card.getAttribute('data-id')) === selectedId) {
      //         selected_indx = parseInt(card.getAttribute('data-index'))
      //         iterate_number = selected_indx - 1
      //         card.classList.add('activeNow')
      //
      //
      //     } else {
      //         card.classList.remove('activeNow')
      //     }
      //     // active_id = parseInt(card.getAttribute('data-id'))
      //     // }
      // })
      //
      // let diff_indx
      // cards.forEach(card => {
      //     diff_indx = card.getAttribute('data-index') - iterate_number
      //     if (diff_indx > 0) {
      //         card.setAttribute('data-index', diff_indx)
      //     } else if (diff_indx < 0) {
      //         card.setAttribute('data-index', cards.length + diff_indx)
      //     } else {
      //         card.setAttribute('data-index', 10)
      //     }
      //
      // })
      //
      // let ulList = document.querySelector("ul")
      //
      // const arr = (Array.from(cards)).sort((a, b) => {
      //     return a.getAttribute('data-index') - b.getAttribute('data-index')
      // }).map(item => {
      //     return item
      // })
      //
      // for (var i = 0, len = arr.length; i < len; i++) {
      //     // var parent = arr[i].parentNode
      //     var detatchedItem = ulList.removeChild(arr[i])
      //     ulList.prepend(detatchedItem)
      // }
      // // cards = arr
      //
      // // cards[active_id].setAttribute('data-index', 0)
      //
      // // if (this.activeIndex < this.sliderItems.length - 1) {
      // //     this.activeIndex++
      // // } else {
      // //     this.activeIndex = 0
      // // }
      //
      // // for (let i = 0; i < Math.abs(iterate_number); i++) {
      //
      // // this.activeIndex = selectedId - 1
      // //
      // // if (iterate_number > 0) {
      // //
      // //     let ulList = document.querySelector("ul")
      // //     let leftMenuBtns = document.querySelectorAll('.left-menu-btn')
      // //
      // //     let prependList = function () {
      // //         for (let i = 1; i < cards.length; i++) {
      // //
      // //             for (let k = 1; k < selectedId; k++) {
      // //
      // //                 if (i === selectedId) {
      // //                     cards[i].classList.remove("transformThis", "activeNow")
      // //                     ulList.prepend(cards[i])
      // //                 }
      // //
      // //             }
      // //
      // //         }
      // //
      // //     }
      // //
      // //     // for (let j = cards.length - 1; j >= 0; j&#45;&#45;) {
      // //     //
      // //     //     for (let h = 1; h < selectedId; h++) {
      // //     //         if (j === cards.length - 1) {
      // //     //         cards[h].classList.remove('transformPrev')
      // //     //         cards[h].classList.add('transformThis')
      // //     //         cards[h].previousElementSibling.classList.add('activeNow')
      // //     //         }
      // //     //     }
      // //     // }
      // //
      // //     setTimeout(function () {
      // //         prependList()
      // //     }, 200)
      // //
      // //
      // // } else if (iterate_number < 0) {
      // //
      // //     let cards = document.querySelectorAll('.card')
      // //     let ulList = document.querySelector("ul")
      // //     let leftMenuBtns = document.querySelectorAll('.left-menu-btn')
      // //
      // //     let appendToList = function () {
      // //         // for (let i = 1; i < cards.length; i++) {
      // //         // if (i === 0) {
      // //         cards[0].classList.add("transformPrev")
      // //         ulList.append(cards[0])
      // //         // }
      // //         // }
      // //     }
      // //     for (let j = cards.length - 1; j >= 0; j&#45;&#45;) {
      // //         if (parseInt(cards[j].getAttribute('data-id')) === selectedId) {
      // //             cards[j].classList.remove('transformPrev')
      // //             cards[j].classList.add('activeNow')
      // //
      // //             cards[j].previousElementSibling.classList.remove('activeNow')
      // //         }
      // //     }
      // //     setTimeout(function () {
      // //         appendToList()
      // //     }, 150)
      // //
      // // }
      // // }

    },

    mounted() {
      this.getCustomFilter(this.sliderItems, this.allFilters)
    },

    getCustomFilter(customFilter, allFilters) {
      return customFilter.filter(item => allFilters.some(val => val === item.value))
    },
    onMouseMove({pageX, pageY}) {

      this.targetX = pageX;
      this.targetY = pageY;

      if (!this.animationRunning) {
        this.animationRunning = true;
        this.runAnimation();
      }
    },
    lerp({x, y}, {x: targetX, y: targetY}) {
      const fraction = 0.1;

      x += (targetX - x) * fraction;
      y += (targetY - y) * fraction;

      return {x, y};
    },
    getMouseCoefficients({pageX, pageY} = {}) {
      const halfWidth = this.halfWidth;
      const halfHeight = this.halfHeight;
      const xCoeff = ((pageX || this.targetX) - halfWidth) / halfWidth;
      const yCoeff = (halfHeight - (pageY || this.targetY)) / halfHeight;

      return {xCoeff, yCoeff}
    },
    requestAnimationFrame() {


      this.animationStopped = false;
      this.positionImage(this.getMouseCoefficients());

      // currentImg.classList.add(transitClass, inClass);
      // currentImg.addEventListener('transitionend', onImageTransitionEnd);
    },
    reachedFinalPoint() {
      const lastX = ~~this.lastX;
      const lastY = ~~this.lastY;
      const targetX = this.targetX;
      const targetY = this.targetY;

      return (lastX == targetX || lastX - 1 == targetX || lastX + 1 == targetX)
          && (lastY == targetY || lastY - 1 == targetY || lastY + 1 == targetY);
    },
    positionImage({xCoeff, yCoeff}) {
      const maxImgOffset = 1;

      const currentImage = this.$refs.cards;

      currentImage.style.setProperty('transform', `
      translateX(${maxImgOffset * -xCoeff}deg)
      translateY(${maxImgOffset * yCoeff}deg)
    `);
    },
    runAnimation() {
      if (this.animationStopped) {
        this.animationRunning = false;
        return;
      }

      const maxX = 10;
      const maxY = 10;

      const newPos = this.lerp({
        x: this.lastX,
        y: this.lastY
      }, {
        x: this.targetX,
        y: this.targetY
      });

      const {xCoeff, yCoeff} = this.getMouseCoefficients({
        pageX: newPos.x,
        pageY: newPos.y
      });

      this.lastX = newPos.x;
      this.lastY = newPos.y;

      this.positionImage({xCoeff, yCoeff});

      this.$refs.cards.style.setProperty('transform', `
      translateZ(${this.zDistance})
      rotateX(${maxY * yCoeff}deg)
      rotateY(${maxX * xCoeff}deg)
    `);

      if (this.reachedFinalPoint) {
        this.animationRunning = false;
      } else {
        this.requestAnimationFrame();
      }
    },

    fetchBlogItems() {

    }

  }
}
</script>-->

<style scoped>


.blog-container {
  perspective: 1000px;
  transform-style: preserve-3d;


}


.blog-container .card-list li {

  position: absolute;

  transition: all 500ms;
  border-radius: 5px;
}


.blog-container .card-list .card-content {
  position: relative;
  width: 100%;
  margin-top: -92px;
}

.blog-container .card-list li:nth-child(1) {
  top: 0; /* +12 from 24 */
  width: 82%;
}

.blog-container .card-list li:nth-child(2) {
  top: 12px; /* +12 */
  width: 84%; /* +5 from 55 */
}

.blog-container .card-list li:nth-child(3) {
  top: 24px; /* +12 */
  width: 86%;
}

.blog-container .card-list li:nth-child(4) {
  top: 36px; /* +12 */
  width: 88%;
}

.blog-container .card-list li:nth-child(5) {
  top: 48px; /* +12 */
  width: 90%;
}

.blog-container .card-list li:nth-child(6) {
  top: 60px; /* +12 */
  width: 92%;
}

.blog-container .card-list li:nth-child(7) {
  top: 72px; /* +12 */
  width: 94%;
}

.blog-container .card-list li:nth-child(8) {
  top: 96px; /* +12 */
  width: 96%;
}

.blog-container .card-list li:nth-child(9) {
  top: 108px; /* +12 */
  width: 98%;
}

.blog-container .card-list li:nth-child(10) {
  top: 120px; /* +12 */
  width: 100%;
}


.left-menu button {
  all: unset;
  cursor: pointer;
  display: block;
  padding: 7px 0 7px 30px;
  position: relative;
  opacity: .2;
  transition: .2s;
}

.left-menu button.current-btn {
  opacity: 1;
  pointer-events: none;
}

.left-menu button::before {
  content: "";
  width: 20px;
  height: 1px;
  background: black;
  position: absolute;
  left: 0;
  top: 50%;
  transition: .3s;
}

.switch-slide-container {
  position: relative;
  /*width: 100%;*/
  /*margin-top: 6%;*/
}

.switch-buttons.next {
  transform: rotate(180deg);
}


.switch-slide-container button {
  all: unset;
  padding: 25px;
  display: block;
  cursor: pointer;
}

.switch-slide-container button svg {
  width: 20px;
  display: block;
}

.transformThis {
  animation: scaleDown 1s;

  /*animation: scaleDown 5s linear 2s infinite alternate;*/
}

.transformPrev {
  animation: scaleUp 500ms;

  /*display: none;*/
}

@keyframes scaleUp {
  0% {

    transform: scale(1) translateY(100%);

    /*opacity: 0;*/
  }

  100% {
    transform: scale(1) translateY(0);
    /*opacity: 1;*/
  }
}

@keyframes scaleDown {
  0% {
    transform: scale(1) translateY(0);
    /*opacity: 1;*/
  }

  100% {
    transform: scale(1) translateY(100%);
    /*opacity: 0;*/
  }
}

@keyframes scaleCard {
  0% {
    top: 5px;
  }
  100% {
    top: 24px;
  }
}

@keyframes bounceInLeft {
  0% {
    opacity: 0;
    transform: translateX(170px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes bounceInRight {
  0% {
    opacity: 0;
    transform: translateX(-170px);
  }
  100% {
    transform: translateX(0);
  }
}


</style>

