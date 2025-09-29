<template>
  <div class="space-y-2">
    <template v-for="(item,index) in items"
              :key="index">
      <nuxt-link :to="`/blog/${category.slug}/${item.id}/${encodeURIComponent(item.slug)}`"

                 class="bg-gray-50 rounded-2xl p-5 block">
        <div class="w-full text-right cursor-pointer font-['PeydaXDemi']"
        >

          <div class="flex flex-col w-full">

        <span class="md:text-[18px] text-sm text-[#7A7A7A] ">
          {{ item.title }}
        </span>

            <div v-if="item.hashtags" class="flex gap-1 text-right mt-1">
                <span v-for="(hashtag,i) in item.hashtags"
                      :key="i"
                      class="md:text-[14px] text-xs  text-gray-400">
                  {{ hashtag }}
                </span>
            </div>

            <span class="text-[#45ACEF] text-xs mt-4">بیشتر بخوانید...</span>

          </div>

        </div>

      </nuxt-link>
    </template>

  </div>
</template>
<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  category:{
    type:Object
  }
})
</script>