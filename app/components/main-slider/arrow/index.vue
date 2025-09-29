<template>
  <div
       class="my-auto z-40">
    <button class="prev"
            @click="clickHandler('prev')">
      <svg class="stroke-white-100" fill="none" height="11" viewBox="0 0 21 11" width="21"
           xmlns="http://www.w3.org/2000/svg">
        <path d="m.5 10.5 10-10 10 10" stroke-linecap="round" stroke-linejoin="round"
              stroke-miterlimit="10"/>
      </svg>
    </button>
    <button class="next  "
            @click="clickHandler('next')">
      <svg  class="stroke-white-100 rotate-180 " fill="none" height="11" viewBox="0 0 21 11" width="21"
           xmlns="http://www.w3.org/2000/svg">
        <path d="m.5 10.5 10-10 10 10" stroke-linecap="round" stroke-linejoin="round"
              stroke-miterlimit="10"/>
      </svg>
    </button>
  </div>

</template>

<script setup>


const props = defineProps({
})

const emit = defineEmits(['click-arrow'])

const clickHandler = (type) => {
  emit('click-arrow' ,  type)
}
</script>




