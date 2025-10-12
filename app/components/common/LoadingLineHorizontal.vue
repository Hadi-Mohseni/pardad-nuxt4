<script setup >


import {useLoadingLineHorizontalAnimation} from "~/composables/useLoadingLineHorizontalAnimation.js";


const {
  create: createAnimationHorizontal,
  start: startHorizontal,
  updateTimeLine: updateTimeLineHorizontal
} = useLoadingLineHorizontalAnimation()


const horizontalLineBackground = ref(null);
const lineRunner = ref(null)
const horizontalLineRunner = ref(null)

const horizontalLine = ref(null);

const props = defineProps({
  element: {}
})

const create = () => {

  createAnimationHorizontal(horizontalLine.value, {
    background: horizontalLineBackground.value,
    runner: horizontalLineRunner.value,

  })

}
const update = (top) => {

  updateTimeLineHorizontal(
      {
        runner: lineRunner.value,
      }, top)


}
const init = (top) => {

  create()
  setTimeout(() => {
    startHorizontal()
  }, 2)


}


defineExpose({
  update,
  init
})


onBeforeUnmount(() => {
  handle("kill");
})
</script>

<template>



    <div class=" lg:hidden w-full relative ">
      <div class="absolute left-0 right-0 bottom-0 h-[1px] w-[100vw]  z-[2]"
           ref="horizontalLine">
        <div class="absolute top-0 right-0 w-full h-full bg-[#000] opacity-20 "
             ref="horizontalLineBackground"></div>
        <div class="absolute top-0 right-0  h-full w-full bg-[#323232]  "
             ref="horizontalLineRunner"></div>
      </div>

    </div>




</template>

<style scoped>

</style>