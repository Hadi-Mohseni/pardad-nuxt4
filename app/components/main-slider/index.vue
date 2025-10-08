<template>

  <!--              @mousedown="listHandleMouseDown" @mousemove="listHandleMouseMove" @mouseup="listHandleMouseUp"
                @touchstart="listHandelTouchstart" @touchmove="listHandelTouchmove" @touchend="listHandelTouchend"
                @mouseleave="listHandleMouseLeave"-->

  <div class="relative w-full" :class="[height]">
    <div class="blog-container z-10 w-full relative">
      <div class="relative mx-auto " :class="[height]" @mousemove="onMouseMove">

        <ul class=" relative mx-auto card-list  " dir="rtl" ref="cards" :class="[height]">


          <li class=" absolute rounded-sm inset-0  p-8 mx-auto card "

              ref="sliders"
              v-for="(item,index) in slides"
              :key="index"
              :style="{backgroundColor: item.bgColor,color: item.txtColor}"
              :data-id="item.id"
              :data-index="slides.length - index"
          >

            <nuxt-link class="flex h-full flex-col text-right  mx-auto gap-y-8 "
               :class="[showDescription ? 'justify-between' : 'justify-center']"
               :to="`/${routeName}/${item.id}/${item.url.length > 0 ? item.url.replaceAll(' ' ,'-') : item.title.replaceAll(' ' ,'-')}`">

              <h2 class="text-3xl text-right h-12">
                {{ item.title }}
              </h2>
              <div v-show="showDescription" class="flex flex-col gap-y-4 ">

                <h3 class="text-1xl text-right h-8 mb-6 md:mb-1">
                  {{ item.subtitle }}
                </h3>
                <h4 class="text-md text-right  line-clamp-4 p-black description"  v-html="item.description">
                </h4>
              </div>

              <span v-show="showDescription" class="text-sm text-left">
                  بیشتر
              </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useGlobalStore} from "~/stores/global";


const emit = defineEmits(['get-list', 'selected-item', 'selected-slider'])
const props = defineProps({
  height: {
    type: String,
    default: 'h-[360px] lg:h-[400px]'
  },
  items: {
    type: Array,
    default: []
  },
  routeName: {
    type: String,
    default: 'category'
  },
  showDescription: {
    type: Boolean,
    default: true
  },
  mouseMoveAnimation: {
    type: Boolean,
    default: false
  }

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
const sliderItems = computed(() => props.items)
const animationStopped = ref(false)
const cards = ref(null)
const current_index = ref(0);
const pointer_is_down = ref(false);
const end_y = ref(0);
const start_y = ref(0);
const move_distance = ref(0);
const isDragging = ref(false)
const startY = ref(0)
const direction = ref('')
const endedSliding = ref(true)

const slides = computed(() => props.items)

const setSelectedSliderId = () => {
  const ulList = document.querySelector(".card-list")
  const arr = Array.from(ulList.children)
  activeIndex.value = parseInt(arr[arr.length - 1].getAttribute('data-id'))

  emit('selected-slider', activeIndex.value)
}

const sliderSelectedFunc = (id) => {
  emit('selected-slider', id)
}


// Arrow Key Func


const goToSlideFunc = (value , selectedIndex , lastActiveIndex) => {






  let ulList = document.querySelector(".card-list");
  const items = Array.from(ulList.children)

  const all = items.length
 /* let afterHalf = false

  if(lastActiveIndex > all / 2){
    afterHalf = false
  }else{
    afterHalf = true
  }*/

  const diff = selectedIndex - lastActiveIndex
  const setTimer = (diff , type) =>{
    let count = 1
    let end = count === (diff - 1)
    type === 'prev' ? prevSlideFunc(end) : nextSlideFunc(end)
    const interval = setInterval(() => {
      if(count === diff - 1){
        end = true
      }

      if (count < diff) {
        type === 'prev' ? prevSlideFunc(end) : nextSlideFunc(end)
        count++;
      } else {
        clearInterval(interval); // متوقف کردن زمانی که به 4 بار رسید
      }
    }, 800)
  }
  if(diff < 0){
    setTimer(Math.abs(diff) , 'prev')
  }else if(diff > 0){
    setTimer(diff , 'next')
  }






  /*const lastIndex = items.findIndex(item=>+item.getAttribute('data-id') === lastId)*/
 /* const setTimer = (diff , type) =>{
    let count = 0
    const interval = setInterval(() => {
      if (count < diff) {
        type === 'prev' ? prevSlideFunc() : nextSlideFunc()
        count++;
      } else {
        clearInterval(interval); // متوقف کردن زمانی که به 4 بار رسید
      }
    }, 850)
  }

  items.forEach((item, index) => {
    if (+item.getAttribute('data-id') === value) {

      const selectedIndex = (index)
      console.log({selectedIndex})
      console.log({lastIndex})
      /!*const diff = Math.abs(selectedIndex - lastIndex)*!/
     /!* const diff = selectedIndex - lastIndex
      console.log({diff})*!/
     /!* console.log('vvv' , (items.length - 1) - selectedIndex)
      console.log('length',selectedIndex - items.length)*!/
      /!*if((selectedIndex - lastIndex) > 0){
        setTimer(diff , 'next')
      }else{
        setTimer(diff , 'prev')
      }*!/
      /!*const lastIndex = Array.from(ulList.children).length - 1


      let count = 0;
      if ((lastIndex - index) <= Math.round(lastIndex / 2)) {

        console.log('next')
        /!*count = 0
        ;*!/

      } else {
        console.log('prev')
       /!* count = 0
        const interval = setInterval(() => {
          if (count < Math.abs((ind - index) - Math.round(ind / 2))) {
            nextSlideFunc()
            count++;
          } else {
            clearInterval(interval); // متوقف کردن زمانی که به 4 بار رسید
          }
        }, 850);*!/
      }*!/
    }
  })*/
  /*for (let i = 0 ; i <= 2 ; i++){
    setTimeout(()=>{
      console.log('aaaabb' ,i)
      nextSlideFunc()
    },2000)
  }*/


}

const arrowKeyFunc = (event) => {
  if (window.innerWidth < 1024) {
    switch (event.keyCode) {
      case 38: // Up arrow
        prevSlideFunc()
        break
      case 40: // Down arrow
        nextSlideFunc()
        break
    }
  }


}


/*const nextSlideFunc = () =>{

  let ulList = document.querySelector(".card-list")
  let list = Array.from(ulList.children)
  if(list.length > 1){


    /!*console.log(ulList.children[0])
    const item = ulList.children[0]
    console.log(list)*!/
    const lastChild = ulList.lastElementChild;

    // ایجاد یک کپی از آخرین فرزند
    const clonedChild = lastChild.cloneNode(true);
    clonedChild.classList.add('hidden')
    ulList.prepend(clonedChild);
    /!*const prependList = () => {
      list[list.length - 1].classList.remove("transformDown", "activeNow")
      ulList.prepend(list[list.length - 1])
    }*!/

   /!* list[list.length - 1].classList.remove('transformPrev')
    list[list.length - 1].classList.add('transformDown')
    list[list.length - 2].classList.add('activeNow')



    setTimeout(() => {
      prependList()
      setSelectedSliderId()
    }, 850)*!/
  }

}
const prevSlideFunc = () =>{
  let ulList = document.querySelector(".card-list")
  let list = Array.from(ulList.children)
  if(list.length > 1){
    const appendToList = () => {
      list[0].classList.add("transformDown")
      list[0].classList.add("transformPrev")
      ulList.append(list[0])
      list[0].classList.remove("transformDown")
    }

    list[list.length - 1].classList.remove('transformPrev')
    list[list.length - 1].classList.add('activeNow')
    list[list.length - 2].classList.remove('activeNow')

    setTimeout(function () {
      appendToList()
      setSelectedSliderId()
    }, 150)
  }



}*/


/*const nextSlideFunc = (hasEnd = true) => {
  if(endedSliding.value) {
    endedSliding.value = false
    let ulList = document.querySelector(".card-list");

    Array.from(ulList.children).forEach(child => {
      child.classList.remove("hidden");
      child.classList.remove("transformDown");
      child.classList.remove("transformDown2");
      child.classList.remove("transformPrev");
      child.classList.remove("transformPrev2");
    });

    if (Array.from(ulList.children).length > 1) {
      const lastChild = ulList.lastElementChild;
      const clonedChild = lastChild.cloneNode(true);
      clonedChild.classList.add("hidden");
      clonedChild.classList.remove("transformPrev2");
      clonedChild.classList.remove("transformDown");
      ulList.prepend(clonedChild)


      const first = ulList.firstElementChild
      first.classList.remove('hidden')
      first.classList.add('transformPrev2')

      setTimeout(() => {
        lastChild.classList.add("transformDown");
        setTimeout(() => {
          ulList.lastElementChild.remove()
          endedSliding.value = true
          if (hasEnd) {
            setSelectedSliderId()
          }
        }, 450)
      }, 290)


    }
  }
};*/

/*const prevSlideFunc = () => {
  let ulList = document.querySelector(".card-list");
  let list = Array.from(ulList.children);

  if (list.length > 1) {
    const lastChild = list[list.length - 1];
    const firstChild = list[0];

    // افزودن کلاس انیمیشن به آیتم آخر
    lastChild.classList.add("transformPrev");

    // بعد از پایان انیمیشن
    lastChild.addEventListener(
        "animationend",
        () => {
          // حذف آیتم آخر و اضافه کردن آن به ابتدای لیست
          ulList.prepend(lastChild);
          lastChild.classList.remove("transformPrev");
        },
        { once: true }
    );

    // کپی آیتم اول به انتهای لیست (بدون انیمیشن)
    const clonedChild = firstChild.cloneNode(true);
    clonedChild.classList.add("hidden"); // نمایش غیرفعال
    ulList.appendChild(clonedChild);
  }
};*/
const prevSlideFunc = (hasEnd = true) => {
  if(endedSliding.value){
    endedSliding.value = false
    let ulList = document.querySelector(".card-list");

    // حذف کلاس‌های انیمیشن قبلی
    Array.from(ulList.children).forEach((child) => {
      child.classList.remove("hidden");
      child.classList.remove("transformDown");
      child.classList.remove("transformDown2");
      child.classList.remove("transformPrev");
      child.classList.remove("transformPrev2");
    });

    if (ulList.children.length > 1) {
      const firstChild = ulList.firstElementChild;
      const clonedChild = firstChild.cloneNode(true);

      // اضافه کردن کلاس اولیه برای انیمیشن
      clonedChild.classList.add("hidden");
      clonedChild.classList.remove("transformNext2");
      clonedChild.classList.remove("transformDown2");
      clonedChild.classList.remove("transformUp");
      clonedChild.classList.remove("transformPrev");
      ulList.append(clonedChild); // کپی آیتم به انتهای لیست اضافه می‌شود
      const first = ulList.lastElementChild
      first.classList.remove('hidden')
      first.classList.add('transformPrev')

      setTimeout(() => {
        firstChild.classList.add("transformDown2");
        setTimeout(() => {
          ulList.firstElementChild.remove()
          endedSliding.value = true
          /*if(hasEnd){

          }*/
          setSelectedSliderId()
        }, 450)
      }, 290)
    }
  }

};




const nextSlideFunc = (hasEnd = true , steps = 1) => {

  if (endedSliding.value) {
    endedSliding.value = false;
    let ulList = document.querySelector(".card-list");

    Array.from(ulList.children).forEach((child) => {
      child.classList.remove("hidden");
      child.classList.remove("transformDown");
      child.classList.remove("transformDown2");
      child.classList.remove("transformPrev");
      child.classList.remove("transformPrev2");
    });

    if (Array.from(ulList.children).length > steps) {
      const lastChildren = Array.from(ulList.children).slice(-steps);
      const clonedChildren = lastChildren.map((child) => {
        const clonedChild = child.cloneNode(true);
        clonedChild.classList.add("hidden");
        return clonedChild;
      });

      clonedChildren.reverse().forEach((clonedChild) => {
        ulList.prepend(clonedChild);
      });

      const first = ulList.firstElementChild;
      first.classList.remove("hidden");
      first.classList.add("transformPrev2");

      // محاسبه زمان انیمیشن
      const animationSpeed = Math.min(150, 500 / steps); // تنظیم سرعت (هرچه steps بیشتر، سرعت کمتر)
      const transformSpeed = Math.max(450, steps * 100); // زمان لازم برای انتقال عناصر

      // اعمال انیمیشن برای آخرین آیتم‌ها
      lastChildren.forEach((child, index) => {
        setTimeout(() => {
          child.classList.add("transformDown");
        }, animationSpeed * index);
      });

      setTimeout(() => {
        lastChildren.forEach((child) => child.remove());
        endedSliding.value = true;
        setSelectedSliderId();
       if(hasEnd){

       }
      }, transformSpeed);
    }
  }
};



const calculateFinalMoveDistance = () => {
  const scrolled_distance = Math.abs(start_y.value - end_y.value);
  const minimum_distance = 80;


  if (scrolled_distance < minimum_distance) {
    return false;
  }

  if (start_y.value > end_y.value) { // scroll next
    nextSlideFunc()
  } else if (start_y.value < end_y.value) { // scroll prev
    prevSlideFunc()
  }


}
const createDraggingEffects = () => {
  const max_distance = 2;
  const scrolled_distance = (start_y.value - end_y.value) / max_distance;

  /* switchImages(-scrolled_distance);*/
}

const listHandleMouseDown = (e) => {
  e.preventDefault();
  pointer_is_down.value = true;
  start_y.value = e.pageY;
}
const listHandleMouseMove = (e) => {
  e.preventDefault();
  if (!pointer_is_down.value) return false;
  end_y.value = e.pageY;
  createDraggingEffects();
}
const listHandleMouseUp = (e) => {
  e.preventDefault();
  pointer_is_down.value = false;
  calculateFinalMoveDistance();
}
const listHandleMouseLeave = (e) => {
  if (!pointer_is_down) return false;

  pointer_is_down.value = false;
  start_y.value = 0;
  end_y.value = 0;
  /*switchImages();*/
}

const listHandelTouchstart = (e) => {
  pointer_is_down.value = true;
  start_y.value = e.touches[0].pageY;
}

const listHandelTouchmove = (e) => {
  if (!pointer_is_down.value) return false;
  end_y.value = e.touches[0].pageY;
  createDraggingEffects();
}

const listHandelTouchend = (e) => {
  pointer_is_down.value = false;
  calculateFinalMoveDistance();
}


const changeSlideFunc = async (indx) => {


  if (activeIndex.value > indx) {
    const diff = activeIndex.value - indx

    let i = 0


    const myTimer = () => {
      if (i < diff) {
        i++
        prevSlideFunc()
      } else {
        myStopFunction()
      }
    }
    const myInterval = setInterval(myTimer, 1000);
    const myStopFunction = () => {
      clearInterval(myInterval);
    }


    if (i > diff) {
      myStopFunction()
    }

  } else if (activeIndex.value < indx) {

    const diff = indx - activeIndex.value

    console.log(diff)

    let i = 0
    const myTimer = () => {
      if (i < diff) {
        i++
        nextSlideFunc()
      } else {
        myStopFunction()
      }
    }
    const myInterval = setInterval(myTimer, 1100);
    const myStopFunction = () => {
      clearInterval(myInterval);
    }


    if (i > diff) {
      myStopFunction()
    }


  }


}


onMounted(() => {

  if (import.meta.client) {
    window.addEventListener('keydown', arrowKeyFunc)
    halfWidth.value = innerWidth / 2
    halfHeight.value = innerHeight / 2
  }
})
onBeforeMount(() => {

})
onBeforeUnmount(() => {
})


defineExpose({
  nextSlideFunc,
  prevSlideFunc,
  changeSlideFunc,
  goToSlideFunc
})


const onMouseMove = ({pageX, pageY}) => {
  if (props.mouseMoveAnimation) {
    targetX.value = pageX;
    targetY.value = pageY;

    if (!animationRunning.value) {
      animationRunning.value = true;
      runAnimation();
    }
  }


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

const getMouseCoefficients = ({pageX, pageY} = {}) => {
  const halfWid = halfWidth.value;
  const halfHgt = halfHeight.value;
  const xCoeff = ((pageX || targetX.value) - halfWid) / halfWid;
  const yCoeff = (halfHgt - (pageY || targetY.value)) / halfHgt;

  return {xCoeff, yCoeff}
}

const positionImage = ({xCoeff, yCoeff}) => {
  const maxImgOffset = 1;

  const currentImage = cards.value;

  currentImage.style.setProperty('transform', `
      translateX(${maxImgOffset * -xCoeff}deg)
      translateY(${maxImgOffset * yCoeff}deg)
    `);
}

const reachedFinalPoint = () => {
  const lX = ~~lastX.value;
  const lY = ~~lastY.value;
  const tX = targetX.value;
  const tY = targetY.value;

  return (lX == tX || lX - 1 == tX || lX + 1 == tX)
      && (lY == tY || lY - 1 == tY || lY + 1 == tY);
}

const lerp = ({x, y}, {x: targetX, y: targetY}) => {
  const fraction = 0.1;

  x += (targetX - x) * fraction;
  y += (targetY - y) * fraction;

  return {x, y};
}


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


<!--
<script setup>



const calculateFinalMoveDistance = ()=> {
  const scrolled_distance = Math.abs(start_y.value - end_y.value);
  const minimum_distance = 80;


  if (scrolled_distance < minimum_distance) {
    return false;
  }

  if (start_y.value > end_y.value) { // scroll next
    prevSlide()
  } else if (start_y.value < end_y.value) { // scroll prev
    nextSlide()
  }


}
const  createDraggingEffects = ()=> {
  const max_distance = 2;
  const scrolled_distance =  (start_y.value - end_y.value) / max_distance;

  /* switchImages(-scrolled_distance);*/
}

const listHandleMouseDown = (e) => {
  e.preventDefault();
  pointer_is_down.value = true;
  start_y.value = e.pageY;
}
const listHandleMouseMove = (e)=> {
  e.preventDefault();
  if (!pointer_is_down.value) return false;
  end_y.value = e.pageY;
  createDraggingEffects();
}
const listHandleMouseUp =(e)=> {
  e.preventDefault();
  pointer_is_down.value = false;
  calculateFinalMoveDistance();
}
const listHandleMouseLeave = (e)=>{
  if (!pointer_is_down) return false;

  pointer_is_down.value = false;
  start_y.value = 0;
  end_y.value = 0;
  /*switchImages();*/
}

const listHandelTouchstart = (e)=>{
  pointer_is_down.value = true;
  start_y.value = e.touches[0].pageY;
}

const listHandelTouchmove = (e) => {
  if (!pointer_is_down.value) return false;
  end_y.value = e.touches[0].pageY;
  createDraggingEffects();
}

const listHandelTouchend =  (e) => {
  pointer_is_down.value = false;
  calculateFinalMoveDistance();
}



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
    activeIndex.value&#45;&#45;
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
  emit('selected-item' , sliderItemsLi.value[sliderItemsLi.value.length -1].id)
}

const lastItemFunc = () => {
  for (let j = cards.value.children.length - 1; j >= 0; j&#45;&#45;) {


    if (j === cards.value.children.length - 1) {

      cards.value.children[j].classList.remove('transformPrev')
      cards.value.children[j].classList.add('transformThis')
      cards.value.children[j].previousElementSibling.classList.add('activeNow')
    }
  }
}

const nextSlide = () => {

  let cardList = document.querySelectorAll('.card')
  let ulList = document.querySelector(".card-list")
  console.log(cardList)
  console.log(ulList)



}
const prevSlide = () => {


  const appendToList = () => {


    /*cards.value.children[0].classList.add("transformPrev")

    cards.value.append(cards.value.children[0])*/

    let lastItem = sliderItemsLi.value.pop();



// عنصر حذف شده را در ابتدای آرایه اضافه می‌کنیم
    sliderItemsLi.value.push(lastItem);
    sliderItemsLi.value.unshift(lastItem);
    setTimeout(()=>{
      sliderItemsLi.value.pop();
      emit('selected-item' , sliderItemsLi.value[sliderItemsLi.value.length -1].id)
    },500)


  }
  /*for (let j = cards.value.children.length - 1; j >= 0; j&#45;&#45;) {
    if (j === cards.value.children.length - 1) {
      cards.value.children[j].classList.remove('transformPrev')
      cards.value.children[j].classList.add('activeNow')

      cards.value.children[j].previousElementSibling.classList.remove('activeNow')
    }
  }*/

  setTimeout(function () {
    appendToList()
  }, 200)

  /*console.log('prev')


  /!*let cards = document.querySelectorAll('.card')
  let ulList = document.querySelector(".card-list")*!/
  // let leftMenuBtns = document.querySelectorAll('.left-menu-btn')
  const lastIndex = sliderItemsLi.value.length - 1

  const appendToList = () => {


    // for (let i = 1; i < cards.length; i++) {
    // if (i === 0) {



    /!*cards.value.children[lastIndex].classList.add("transformTo")*!/
    /!*cards.value.children[lastIndex].classList.add("hidden")*!/


   let lastItem = sliderItemsLi.value[lastIndex -1];
    sliderItemsLi.value.unshift(lastItem);
    cards.value.children[0].classList.add("saeed")
    console.log(cards.value.children[0].classList)
    /!*cards.value.children[0].classList.add("opacity-0")*!/
  /!*  let lastItem = sliderItemsLi.value.pop();


// عنصر حذف شده را در ابتدای آرایه اضافه می‌کنیم
    sliderItemsLi.value.unshift(lastItem);*!/

    /!*cards.value.append(cards.value.children[0])*!/

    // }
    // }
  }


  /!*cards.value.children[lastIndex].classList.remove('activeNow')
  cards.value.children[lastIndex].classList.add('transformPrev')*!/



  setTimeout(function () {
    appendToList()
  }, 200)*/
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
  if(props.keyWork){
    switch (event.keyCode) {
      case 38: // Up arrow
        prevSlideHandler()
        break
      case 40: // Down arrow
        nextSlideHandler()
        break
    }
  }else{
    console.log('no workkkkk')
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

const listMouseEnter = (e)=>{
  console.log(e)
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
</script>
-->

<style scoped>


.blog-container {
  perspective: 1000px;
  transform-style: preserve-3d;


}


.blog-container .card-list li {

  position: absolute;

  transition: all 300ms;
  border-radius: 5px;
  height: 400px;
  max-height: 400px;
}

.blog-container .card-list li:nth-child(1) {
  top: 0; /* +12 from 24 */
  width: 82%;
}

.blog-container .card-list li:nth-child(2) {
  top: 12px; /* +12 */
  /* +5 from 55 */
  width: 84%;
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

@keyframes scaleDown {
  0% {
    transform: scale(1) translateY(0);

  }
  100% {
    transform: scale(1) translateY(300%);
  }
}

@keyframes scaleDown2 {
  0% {
    transform: scale(1) translateY(0);

  }
  100% {
    transform: scale(1) translateY(10%);
  }
}

@keyframes scaleUp {
  0% {
    transform: scale(1) translateY(100%);

  }
  100% {
    transform: scale(1) translateY(0);

  }
}

@keyframes scaleUp2 {
  0% {
    transform: scale(1) translateY(10%);

  }
  100% {
    transform: scale(1) translateY(0);
  }
}

.transformDown {
  animation: scaleDown 1500ms forwards;
}

.transformPrev {
  animation: scaleUp 500ms forwards;
}

.transformPrev2 {
  animation: scaleUp2 400ms forwards;
}

.transformDown2 {
  animation: scaleDown2 550ms forwards;
}


.p-black * {
  color: black!important;
  font-family: PeydaWebVF!important;
}


</style>

