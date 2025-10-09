<!-- components/LazyWrapper.vue -->
<script setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  loader: {
    type: Function,
    required: true
  },
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

const show = ref(false)
const LazyComp = defineAsyncComponent(props.loader)
</script>

<template>
  <div v-lazy-load="{ callback: () => show = true }">
    <component :is="LazyComp" v-show="show" v-bind="componentProps" />
  </div>
</template>
