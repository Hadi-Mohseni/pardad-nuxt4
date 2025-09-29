<template>
  <div class="overflow-hidden min-h-screen ">
      blog page
  </div>
</template>

<script setup>

const router = useRouter()

router.push({name:'index'})


useHead({
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
});


</script>


<style scoped>


</style>

