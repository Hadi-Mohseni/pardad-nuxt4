<script setup >

import {useBackgroundContactAnimation} from "~/composables/useBackgroundContactAnimation.js";

const background = ref(null);
const {create:createAnimation , handle , kill ,restart , start } = useBackgroundContactAnimation()





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
  <div
      class="absolute top-0 left-0 h-full w-full  z-[-1] before:content-[''] before:block before:w-full before:h-auto ">
    <div class="fixed bg-[url('~/assets/img/contact.webp')] bg-cover bg-no-repeat left-0 right-0 top-0 bottom-0"
         style="perspective: 1000px;"
         ref="background"></div>
  </div>
</template>

<style scoped>

</style>