<!-- components/CollapseTransition.vue -->
<template>
  <div
      class="overflow-hidden transition-all duration-300 ease-in-out"
      :style="{
      'max-height': isOpen ? `${contentHeight}px` : '0px',
      'opacity': isOpen ? 1 : 0
    }"
      @transitionend="onTransitionEnd"
  >
    <div ref="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  isOpen: Boolean
});

const activeOpen = ref(false)


const content = ref(null);
const contentHeight = ref(0);

const updateHeight = () => {
  if (content.value) {
    contentHeight.value = content.value.scrollHeight;
  }
};



onMounted(() => {
  updateHeight();
  setTimeout(()=>{
    updateHeight();
  },1000)
  window.addEventListener('resize', updateHeight);
});
watch(
    () => props.isOpen,
    (val) => {
      updateHeight()
    },
    { immediate: true } // این گزینه باعث اجرای واچر در اولین بار هم می‌شود
)

const onTransitionEnd = () => {
  if (props.isOpen) {
    contentHeight.value = 'auto';
  }
};

onBeforeUnmount(()=>{
  window.removeEventListener('resize', updateHeight);
})
</script>