<template>
        <div>
          <div>
            <nuxt-link :to="`/new-category/biring1`">aaa</nuxt-link>
          </div>
          <div>
            <nuxt-link :to="`/new-category/biring2`">bbbb</nuxt-link>
          </div>

        </div>
</template>

<script setup>










definePageMeta({
  layout:'category',
  pageTransition: {
    name: 'page-transition',
    mode: 'fade-in'
  }
})









</script>

