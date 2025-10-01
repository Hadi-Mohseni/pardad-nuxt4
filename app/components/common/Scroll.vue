<script setup>

import {useScrollAnimation} from "~/composables/useScrollAnimation.js";

const scroll = ref(null);
const {create: createAnimation, handle, kill, restart, start} = useScrollAnimation()

const scroll_lines = ref(null);
const scroll_lines_child2 = ref(null)
const scroll_background = ref(null)
const scroll_label_mask = ref(null)
const scroll_label_mask_inner = ref(null)

const props = defineProps({
  changeScroll: {
    type: Boolean,
    default:true
  }
})


const create = () => {

  createAnimation(scroll.value, {
    lines: scroll_lines.value,
    child: scroll_lines_child2.value,
    background: scroll_background.value,
    label: scroll_label_mask.value,
    inner: scroll_label_mask_inner.value,
  },props.changeScroll)

}


defineExpose({
  create,
  start,
  kill,
  handle
})


onMounted(() => {


})
onBeforeUnmount(() => {
  handle("kill");
})
</script>

<template>
  <div class="absolute top-[calc(100vh-170px)] origin-[left_top] right-[5vw] hidden md:block"
       ref="scroll">

    <div
        class="absolute top-[-40px] opacity-20 -right-[5px] text-[9px] font-['Archia'] font-bold uppercase tracking-[0.4em] origin-[left_bottom] rotate-[-90deg] translate-x-full -translate-y-full"
        aria-hidden="true"
        ref="scroll_background">
      Scroll
    </div>


    <div
        class="absolute top-[-40px] -right-[5px] text-[9px] font-['Archia'] font-bold uppercase tracking-[0.4em] origin-[left_bottom] rotate-[-90deg] translate-x-full -translate-y-full">
      <div class="overflow-hidden"
           ref="scroll_label_mask">
        <div ref="scroll_label_mask_inner">
          Scroll
        </div>
      </div>
    </div>

    <div class="relative w-[1px] h-[90px] origin-[left_top] border-0 border-gray-200"
         ref="scroll_lines">
      <div class="absolute top-0 left-0 w-full h-full bg-[#000]  dark:bg-[#fff] opacity-20"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-[#000] dark:bg-[#fff] origin-[left_top] "
           ref="scroll_lines_child2"></div>
    </div>
  </div>
</template>

<style scoped>

</style>