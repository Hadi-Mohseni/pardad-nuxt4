<template>
        <div>
          {{ route.params.category_name }}
        </div>
</template>

<script setup>




const route = useRoute()





definePageMeta({
  layout:'category',
  pageTransition: {
    name: 'page-transition',
    mode: 'fade-in'
  }
})









</script>

