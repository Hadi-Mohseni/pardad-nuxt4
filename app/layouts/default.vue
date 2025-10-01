<template>
  <div dir="rtl" class="relative">





    <div class="relative"  >

      <slot />
    </div>









  </div>

</template>

<script setup>
const mainLoading = ref(null)
import {useGlobalStore} from "~/stores/global.js";
const store = useGlobalStore()
const {getLoading,getShowContent} = storeToRefs(useGlobalStore())
const {setMainLoading , setShowLogo , startLoading } = useGlobalStore()

useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s',
})


const showContent = ref(false)
onMounted(()=>{
  startLoading()
  setTimeout(()=>{
    setShowLogo(true)
    setMainLoading(true)


  },100)
})




onBeforeUnmount(()=>{
  store.setShowContent(false)
})




</script>



<style>

</style>
