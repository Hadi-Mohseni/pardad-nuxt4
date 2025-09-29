

<template>
  <div class="w-full relative z-[60]   ">
    <button  class="relative z-[60]   w-[54px] h-[41px]" @click="menuClick" @mouseenter="onRollOver" @mouseleave="onRollOut" ref="navToggle" style="visibility: inherit">
            <span class="new-nav-toggle__label">
                <span ref="textOpenElement" class="new-nav-toggle__text new-nav-toggle__text--open text-[#191919] ">menu</span>
                <span ref="textCloseElement" class="new-nav-toggle__text text-[#191919]   new-nav-toggle__text--close">close</span>
            </span>
      <span class="new-nav-toggle__picto">
                <span ref="shapeElement" class="new-nav-toggle__shape">

                </span>
                <span ref="lineElement" class="new-nav-toggle__line">
                    <span></span>
                    <span></span>
                </span>
            </span>
    </button>
  </div>

</template>


<script setup>
import {storeToRefs} from "pinia";
import {useGlobalStore} from "~/stores/global";
import {useRouter} from "#app";

const {setMenuHandler} = useGlobalStore()
const router = useRouter()

const shapeElement = ref(null)
const {getLoading} = storeToRefs((useGlobalStore()))

const state = ref('CLOSE');
let toggleElements = {
  element: '',
  textOpenElement: '',
  textCloseElement: '',
  shapeElement: '',
  shapePaths: '',
  lineElement: '',
  lineElements: '',
};

let timeline = null
let lineScale = 1;

const emit = defineEmits(['change-state'])

const initializeNavigationToggle = () => {
  toggleElements = {
    element: document.querySelector(".new-nav-toggle"),
    textOpenElement: document.querySelector(".new-nav-toggle__text--open"),
    textCloseElement: document.querySelector(".new-nav-toggle__text--close"),
    shapeElement: document.querySelector(".new-nav-toggle__shape"),
    shapePaths: document.querySelectorAll(".new-nav-toggle__shape path"),
    lineElement: document.querySelector(".new-nav-toggle__line"),
    lineElements: document.querySelectorAll(".new-nav-toggle__line span"),
  };




    if (toggleElements.lineElements[1]) {

      /*const transformValue = window
          .getComputedStyle(toggleElements.lineElements[1])
          .getPropertyValue("transform")
          .split("(")[1]
          .split(")")[0]
          .split(",")[0];*/

      lineScale = parseFloat('1');
      TweenLite.to(toggleElements.shapePaths[1], 0.7, {drawSVG: "30%", ease: Power2.easeOut})

      TweenLite.to(toggleElements.lineElements[1], 0.3, {scaleX: 0.3, ease: Power2.easeOut});
      lineScale = 0.3

    }


}



const toggleState = () => {
  if (state.value === 'CLOSE') {
    state.value = 'OPEN'
    setMenuHandler('OPEN')




  } else {
    state.value = 'CLOSE'
    setMenuHandler('CLOSE')



  }
  setState();
  emit('change-state' , state.value)

}



const closeMenu = () =>{
  state.value = 'CLOSE'
  setState();
}


const setState = () => {





  if (timeline) timeline.kill();

  timeline = new TimelineLite({
    onComplete: onTimelineComplete,
  });


  if (state.value === 'OPEN') {
    toggleElements.element?.classList?.add("new-nav-toggle--open");
    animToOpenState();
  } else {
    toggleElements.element?.classList?.remove("new-nav-toggle--open");
    animToCloseState();
  }
}

const animToOpenState  = () => {
  timeline
      .set([toggleElements.shapeElement, toggleElements.textOpenElement], {visibility: "inherit"})
      .to(toggleElements.shapePaths[1], 0.7, {drawSVG: "50% 50%"}, 0)
      .to(toggleElements.shapePaths[0], 0.7, {drawSVG: "50% 50%"}, 0.3)
      .to(toggleElements.textOpenElement, 0.4, {opacity: 0, x: -14}, 0)
      .fromTo(
          toggleElements.textCloseElement,
          0.7,
          {opacity: 0, x: 14},
          {opacity: 1, x: 0},
          0.4
      )
      .fromTo(toggleElements.lineElement, 0.4, {scaleX: 0}, {scaleX: 1}, 0.4)
      .fromTo(
          toggleElements.lineElements[1],
          0.4,
          {scaleX: 1},
          {scaleX: lineScale},
          0.6
      );
}

const animToCloseState = () => {
  timeline
      .set([toggleElements.lineElement, toggleElements.textCloseElement], {visibility: "inherit"})
      .to(toggleElements.textCloseElement, 0.4, {opacity: 0, x: 14, ease: Power1.easeIn}, 0.3)
      .to(toggleElements.lineElements[1], 0.4, {scaleX: 1}, 0)
      .to(toggleElements.lineElement, 0.4, {scaleX: 0, ease: Power1.easeInOut}, 0.3)

      .to(toggleElements.shapePaths[0], 0.7, {drawSVG: "0 100%"}, 0)
      .to(toggleElements.shapePaths[1], 0.7, {drawSVG: "0 30%"}, 0.3)


      .to(toggleElements.textOpenElement, 0.3, {opacity: 1, x: 0, ease: Power1.easeOut}, 0.7)
      /*

      .to(toggleElements.shapePaths[0], 0.7, {drawSVG: "0% 100%"}, 0.3)

      ;*/

}

const menuClick = () => {

  toggleState();
}

const onRollOver = () => {

  if (state.value === 'CLOSE') {
    TweenLite.to(toggleElements.shapePaths[1], 0.7, {drawSVG: "100%", ease: Power2.easeOut})
    TweenLite.to(toggleElements.textOpenElement, 0.7, {x: -10, ease: Power2.easeOut});
  } else {
    TweenLite.to(toggleElements.lineElements[1], 0.7, {
      scaleX: .7,
      ease: Power2.easeOut,
      transformOrigin: "left center" // حتماً برای اطمینان اضافه کن
    });

  }

}

const onRollOut = () => {

  if (state.value === 'CLOSE') {
    TweenLite.to(toggleElements.textOpenElement, 0.7, {x: 0, ease: Power2.easeOut});
    TweenLite.to(toggleElements.shapePaths[1], 0.7, {drawSVG: "30%", ease: Power2.easeOut})
  } else {
    TweenLite.to(toggleElements.lineElements[1], 0.7, {scaleX: 0.3, ease: Power2.easeOut});
    lineScale = 0.3
  }

}

const onTimelineComplete = () => {
  timeline = null;
}

const init = ()=>{
  if(shapeElement.value){
    shapeElement.value.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg" viewbox="0 0 113.5 175">
                        <path ref="openSvg" fill="none" stroke="#000" stroke-miterlimit="10"
                              d="M.4 26.4L26 .7l86.8 86.8L26 174.3.4 148.6"/>
                    </svg>
                    <svg  xmlns="http://www.w3.org/2000/svg" viewbox="0 0 113.5 175">
                        <path ref="closeSvg" fill="none" stroke="#000" stroke-miterlimit="10"
                              d="M.4 26.4L26 .7l86.8 86.8L26 174.3.4 148.6"/>
                    </svg>`
    setTimeout(()=>{
      initializeNavigationToggle()
    },2000)
  }

}

watch(getLoading , (value)=>{
  if(value){
    setTimeout(()=>{
      init()
    },100)
  }

})


onMounted(() => {


 setTimeout(()=>{init()},100)
})

defineExpose({
  setState,
  initializeNavigationToggle,
  toggleState,
  closeMenu
})
</script>

<style scoped>

</style>