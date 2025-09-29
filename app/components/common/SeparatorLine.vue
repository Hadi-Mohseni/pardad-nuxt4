<template>
  <div class=" relative w-full lg:my-4 my-2 transition-all overflow-hidden"
       :style="customSeperatedStyle"
       ref="seperatedLine">
    <div ref="firstChild" class="opacity-10 absolute transition-all duration-700 h-full bg-[#000] inset-0 w-0"></div>
    <div :style="customChildStyle" class=" transition-all duration-700 absolute w-full h-full bg-[#000] inset-0 z-10 "
         ref='seperatedLineChild'></div>
  </div>
</template>

<script setup>

const firstChild = ref(null)
const seperatedLine = ref(null)
const seperatedLineChild = ref(null)

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal'
  },
  direction: {
    type: String,
    default: 'left'
  },
  size: {
    type: String,
    default: '1'
  }
})

const customChildStyle = computed(() => {
  const base = {
    transition: 'transform 0.7s ease',
  }

  if (props.orientation === 'vertical') {
    return {
      ...base,
      height: '100%',
      width: '100%',
      transform: props.direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
      transformOrigin: props.direction === 'left' ? 'left top' : 'right top',
    }
  }

  return {
    ...base,
    width: '100%',
    height: '100%',
    transform: props.direction === 'left' ? 'translateY(-100%)' : 'translateY(100%)',
    transformOrigin: props.direction === 'left' ? 'top' : 'bottom',
  }
})

const customSeperatedStyle = computed(() => {
  if (props.orientation === 'vertical') {
    return {

      transformOrigin: props.direction === 'left' ? 'left top' : 'right top',
    }
  }

  return {
    transformOrigin: props.direction === 'left' ? 'top' : 'bottom',
  }
})



const goToStep = (step) => {
  if (!seperatedLineChild.value) return

  if (props.orientation === 'vertical') {
    const dirMultiplier = props.direction === 'left' ? 1 : -1
    seperatedLineChild.value.style.transform = `translateX(${dirMultiplier * (100 - step)}%)`
  } else {
    const dirMultiplier = props.direction === 'left' ? 1 : -1
    seperatedLineChild.value.style.transform = `translateY(${dirMultiplier * (100 - step)}%)`
  }
}

const createPageLineAnimation = () => {
  if (!firstChild.value) return

  // ورود خط پس‌زمینه از جهت درست
  if (props.orientation === 'vertical') {
    firstChild.value.style.width = '100%' // عرض رو پر کن چون vertical هست
  } else {
    firstChild.value.style.height = '100%' // ارتفاع رو پر کن چون horizontal هست
  }
}



setTimeout(() => {
  createPageLineAnimation()
}, 1000)

setTimeout(() => {
  if (!seperatedLineChild.value) return

  // ورود از جهت اولیه
  seperatedLineChild.value.style.transform = props.orientation === 'vertical'
      ? (props.direction === 'left' ? 'translateX(0)' : 'translateX(0)')
      : (props.direction === 'left' ? 'translateY(0)' : 'translateY(0)')

  setTimeout(() => {
    // خروج از جهت مخالف
    seperatedLineChild.value.style.transform = props.orientation === 'vertical'
        ? (props.direction === 'left' ? 'translateX(100%)' : 'translateX(-100%)')
        : (props.direction === 'left' ? 'translateY(100%)' : 'translateY(-100%)')

    setTimeout(() => {
      // ورود مجدد با goToStep
      goToStep(10)

      setTimeout(() => goToStep(50), 1500)
      setTimeout(() => goToStep(95), 3000)

    }, 1500)
  }, 1500)
}, 2500)

</script>

<style scoped>

/*.vertical-separator {
  position: relative;
  height: 1px;
}*/
.horizontal-separator {
  position: relative;
  width: 1px;
  height: 100%;
}


/*.vertical-separator div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
}*/
/*.horizontal-separator div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
}*/


.vertical-separator div:nth-child(2) {
  -webkit-transform-origin: left top;
  transform-origin: left top;
  -webkit-transform: scaleX(0.1);
  transform: scaleX(0.1);
}

.horizontal-separator div:nth-child(2) {
  -webkit-transform-origin: bottom;
  transform-origin: bottom;
  -webkit-transform: scaleY(0.1);
  transform: scaleY(0.1);
}
</style>