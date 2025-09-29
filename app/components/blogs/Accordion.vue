<template>
  <div class="space-y-2 select-none">
    <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full text-right cursor-pointer rounded-2xl p-4 overflow-hidden transition-all duration-500"
        :class="(openIndex === index) ? 'bg-[#F0F0F0] ' : 'bg-[#F5F5F7]'"
        @click="toggle(index)"
    >
      <div class="flex w-full justify-between items-center " >
        <span :class="(openIndex === index) ? 'text-[#565656] ' : 'text-[#7E7E7F]'" class="text-sm md:text-base font-['PeydaXDemi'] w-10/12">{{ item.question }}</span>
<!--        <span
            :class="(openIndex === index) ? 'bg-[#969696] -rotate-90' : 'bg-[#D9D9D9]'"
            class="text-white mdi mdi-arrow-left rounded-full w-7 h-7 flex items-center justify-center transform transition-all duration-300"
        ></span>-->
        <div class="w-1/12 text-left flex items-center justify-end">
           <span :class="(openIndex === index) ? 'bg-gray-400 rotate-90' : 'bg-gray-300 rotate-180'"
                 class="text-white  text-lg  rounded-full min-w-7 min-h-7 w-7 h-7 flex items-center justify-center transform transition-all">
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="white"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
        </span>
        </div>


      </div>

      <CollapseTransition :isOpen="openIndex === index">
        <div
            v-html="item.answer"
            class="w-full text-gray-500 text-xs md:text-sm mt-4 pb-5 font-['PeydaXDemi'] accordion-content text-justify"
        >
        </div>
      </CollapseTransition>


    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue'

const props = defineProps({
  items: Array,
})

const openIndex = ref(null)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}

const enter = (el)=> {
  el.style.height = 'auto';
  const height = getComputedStyle(el).height;
  el.style.height = '0';
  setTimeout(() => {
    el.style.height = height;
  });
}
const afterEnter = (el)=> {
  el.style.height = 'auto';
}
const leave = (el)=> {
  el.style.height = getComputedStyle(el).height;
  setTimeout(() => {
    el.style.height = '0';
  });
}

</script>

<style>
.expand-enter-active, .expand-leave-active {
  transition: height 0.3s ease-in;
  overflow: hidden;
}

.expand-enter, .expand-leave-to {
  height: 0 !important;
}
</style>
