<script setup>
import {useLineHorizontalAnimation} from "~/composables/useLineHorizontalAnimation.js";

const line = ref(null);
const {create: createAnimation, handle, kill, restart, start, updateTimeLine} = useLineHorizontalAnimation()

const lineBackground = ref(null);
const lineRunner = ref(null)

const props = defineProps({
  element: {}
})

const create = () => {
  createAnimation(line.value, {
    background: lineBackground.value,
    runner: lineRunner.value,
    title: props.element,
  })
}

const update = (left) => {
  updateTimeLine(
      {
        runner: lineRunner.value,
      }, left)
}

defineExpose({
  create,
  start,
  kill,
  handle,
  update
})

onBeforeUnmount(() => {
  handle("kill");
})
</script>

<template>
  <div class="absolute left-0 right-0 bottom-0 h-[1px] w-[100vw] z-[2]"
       ref="line">
    <div class="absolute top-0 right-0 w-full h-full bg-[#0000001a] origin-[right_top]"
         ref="lineBackground"></div>
    <div class="absolute top-0 right-0 w-[28px] h-full bg-[#323232] invisible origin-[right_top]"
         ref="lineRunner"></div>
  </div>
</template>