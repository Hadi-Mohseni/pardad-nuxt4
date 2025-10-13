<script setup >

import {useLoadingLineVerticalAnimation} from "~/composables/useLoadingLineVerticalAnimation.js";
import {useLoadingLineHorizontalAnimation} from "~/composables/useLoadingLineHorizontalAnimation.js";


const {create:createAnimation , handle , kill ,restart , start , updateTimeLine } = useLoadingLineVerticalAnimation()
const {create:createAnimationHorizontal , handle:handleHorizontal , kill:killHorizontal ,restart:restartHorizontal , start:startHorizontal , updateTimeLine:updateTimeLineHorizontal } = useLoadingLineHorizontalAnimation()

const lineBackground = ref(null);
const horizontalLineBackground = ref(null);
const lineRunner = ref(null)
const horizontalLineRunner = ref(null)
const line = ref(null);
const horizontalLine = ref(null);

const props = defineProps({
  element:{}
})

const create = () => {

  /*createAnimation(line.value,{
    background:lineBackground.value,
    runner:lineRunner.value,


  })*/
  createAnimationHorizontal(horizontalLine.value,{
    background:horizontalLineBackground.value,
    runner:horizontalLineRunner.value,


  })

}
const update = (top) => {

  updateTimeLine(
  {
    runner:lineRunner.value,
  },top)


}
const init = (top) => {
  console.log()

 create()
  setTimeout(()=>{
    startHorizontal()
  },2)


}




defineExpose({
  create,
  start,
  kill,
  handle,
  update,
  init
})



onBeforeUnmount(()=>{
  handle("kill");
})
</script>

<template>
  <div>
    <div class=" hidden lg:flex fixed top-0 bottom-0 left-[33.3%] w-[1px] min-h-[100vh] z-[2] "
         ref="line">

      <div class="absolute top-0 left-0 w-full h-full bg-[#0000001a]  origin-[left_top]"
           ref="lineBackground"></div>

      <div class="absolute top-0 left-0 w-full  bg-[#323232] h-full origin-[left_top]"
           ref="lineRunner"></div>
    </div>

    <div class="  w-full relative ">
      <div class="absolute left-0 right-0 bottom-0 h-[1px] w-[100vw]  z-[2]"
           ref="horizontalLine">
        <div class="absolute top-0 right-0 w-full h-full bg-[#000] opacity-20 "
             ref="horizontalLineBackground"></div>
        <div class="absolute top-0 right-0  h-full w-full bg-[#323232]  "
             ref="horizontalLineRunner"></div>
      </div>

    </div>





  </div>


</template>

<style scoped>

</style>