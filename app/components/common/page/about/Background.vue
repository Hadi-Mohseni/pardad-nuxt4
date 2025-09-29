<script setup >

import {useBackgroundAboutAnimation} from "~/composables/useBackgroundAboutAnimation.js";

const background = ref(null);
const {create:createAnimation , handle , kill ,restart , start } = useBackgroundAboutAnimation()





const create = ()=>{

  createAnimation(background.value)
}


defineExpose({
  create,
  start,
  kill,
  handle
})

onMounted(()=>{


})
onBeforeUnmount(()=>{
  handle("kill");
})
</script>

<template>
<!--  <div class="page__background-wrapper">
    <div class="page__background" ref="background"></div>
  </div>-->
  <div class="absolute top-[-38vw] left-0 w-full z-[-1] perspective-1000">
    <div class="before:content-[''] before:block before:w-full before:pb-[232%] md:before:pb-[161%]" ref="background">
      <div class="absolute inset-0 bg-[url('~/assets/img/about-portrait.webp')] md:bg-[url('~/assets/img/about.jpg')] bg-contain bg-no-repeat bg-left-top"></div>
    </div>
  </div>

</template>

<style scoped>


</style>