<template>
  <div class="fixed top-[4vw] left-0 right-[4vw] z-10">
    <div class="flex items-center justify-between bg-transparent w-full   gap-x-16 " >


      <div class="flex items-center gap-x-16 ">
        <Menu-navToggleBtn  @change-state="changeState" ref="menuNav"/>
        <MenuLink  ref="menuLink"/>
      </div>
      <MenuItems @hide-menu="hideMenu"  ref="menuItems"  v-if="showMenu"/>

    </div>

  </div>


</template>

<script setup>

import {storeToRefs} from "pinia";


import {useGlobalStore} from "~/stores/global.js";
const {getMenuStatus , getLoading} = storeToRefs(useGlobalStore())
const state = ref('CLOSE')
const menuLogo = ref(null)
const menuItems = ref(null)
const menuNav = ref(null)
const menuLink = ref(null)
const showMenu = ref(false)

const changeState = (value)=>{
  state.value = value
  showMenu.value = true
  setTimeout(()=>{
    menuItems.value?.showItems(value)
  },5)
}

const hideMenu = ()=>{

  menuNav.value?.closeMenu()

  setTimeout(()=>{
    menuNav.value?.initializeNavigationToggle()
    showMenu.value = false
    document.body.classList.remove('new-nav-visible')
  },100)
}


const closeState= () =>{

    setTimeout(()=>{
      changeState('CLOSE')
      menuNav.value?.initializeNavigationToggle()
    },100)
}
defineExpose({
  closeState
})


watch(getMenuStatus , (val)=>{
  if(val === 'CLOSE'){
    closeState()
  }

})

</script>
<style scoped>

</style>