<template>
  <div class="space-y-4 mt-7 font-['PeydaXDemi'] select-none">
    <div
        v-for="(comment, index) in comments"
        :key="index"
    >
      <div class="flex items-center text-gray-400 text-[14px]">
        <span
            class="mdi mdi-account rounded-full w-7 h-7 flex items-center justify-center transform transition-all"></span>
        <span class=" text-[#7A7A7A] ">{{ comment.first_name }}</span>
        <span class="mr-2 text-[#BBBBBB]">{{formatJalaliDate(comment.created_at)}}</span>
      </div>
      <p class="md:text-[18px] text-sm text-[#565656]  my-2 leading-7">
        {{ comment.content }}
      </p>
      <div v-if="comment.replies && comment.replies.length > 0" class="bg-[#F5F5F7] p-4 rounded-2xl ">
        <div class="flex items-center md:text-[14px] text-xs text-[#767676]">
          <span class="mdi mdi-headset"></span>
          <span class="text-md mr-3 leading-7">
            {{comment.replies[0].content}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {formatJalaliDate} from "~/utils/dateFormatter.js";

defineProps({
  comments: Array
})

</script>
