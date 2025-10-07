<script setup >

import {useLoadingLineVerticalAnimation} from "~/composables/useLoadingLineVerticalAnimation.js";

const line = ref(null);
const {create:createAnimation , handle , kill ,restart , start , updateTimeLine } = useLoadingLineVerticalAnimation()

const lineBackground = ref(null);
const lineRunner = ref(null)

const props = defineProps({
  element:{}
})

const create = () => {

  createAnimation(line.value,{
    background:lineBackground.value,
    runner:lineRunner.value,


  })

}
const update = (top) => {

  updateTimeLine(
  {
    runner:lineRunner.value,
  },top)


}




defineExpose({
  create,
  start,
  kill,
  handle,
  update
})



onBeforeUnmount(()=>{
  handle("kill");
})
</script>

<template>
  <div class="fixed top-0 bottom-0 left-[33.3%] w-[1px] min-h-[100vh] z-[2] "
       ref="line">

    <div class="absolute top-0 left-0 w-full h-full bg-[#0000001a]  origin-[left_top]"
         ref="lineBackground"></div>

    <div class="absolute top-0 left-0 w-full  bg-[#323232] h-full origin-[left_top]"
         ref="lineRunner"></div>
  </div>
</template>

<style scoped>

</style>