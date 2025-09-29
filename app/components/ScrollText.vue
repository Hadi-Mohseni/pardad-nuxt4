<template>
  <div dir="ltr" class="ease-out duration-300 flex items-center gap-x-10">
    <div ref="scroll" class="scroll-bar-wrapper left">
      <div class="scroll-main"></div>
      <div class="scroll-bottom opacity-10"></div>
    </div>
    <span ref="scrollText" class="text-animation opacity-0">{{ text }}</span>
  </div>
</template>

<script setup>
const scroll = ref()
const scrollText = ref()

const props = defineProps({
  text:{
    type:String,
    default:'SCROLL'
  }
})


onMounted(()=>{
  startScroll()

})
const startScroll = () =>{
  const items = Array.from(scroll.value.children)
  setTimeout(()=>{
    items[0].style.width = '100%'
    items[1].style.width = '100%'
    scrollText.value.style.opacity = '1'
    setTimeout(()=>{
      items[0].style.left = '96%'
      setTimeout(()=>{
        scrollText.value.classList.remove('remove-text-animation')
        scrollText.value.classList.add('add-text-animation')
      },350)

    },550)
  },1000)
}
const endScroll = () =>{
  const items = Array.from(scroll.value.children)
  scrollText.value.classList.remove('add-text-animation')
  scrollText.value.classList.add('remove-text-animation')

  setTimeout(()=>{
    scrollText.value.style.opacity = '0'
    items[0].style.left = '0'

    setTimeout(()=>{

      items[0].style.width = '0'
      items[1].style.width = '0'

    },500)
  },450)
}
</script>

<style scoped>

</style>