<template>

  <div>
    <div
        v-show="content"
        class="text-[15px] tracking-tight lg:text-[17px] description"
        id="main"
        v-html="content"
    >
    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue'

console.log('description')
const props = defineProps({
  content: String,
})

</script>

<style>

</style>
