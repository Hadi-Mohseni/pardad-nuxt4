<template>
  <component :is="component"
             :error="props.error"/>
</template>

<script setup>
const props = defineProps({
  error: Object
})

import Error404 from '~/components/errors/Error404.vue'
import Error500 from '~/components/errors/Error500.vue'

const component = computed(() => {
  const code = props.error?.statusCode || 500
  return code === 404 ? Error404 : Error500
})
</script>
