<script setup lang="ts">

const isFocused = ref(false);

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleBlur = () => {
  isFocused.value = false;
};

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    default: ''
  },
  type:{
    type:String,
    default:'text'
  }
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>

  <div class="relative overflow-hidden inline-block py-2 group">

    <div class="h-full relative">
      <input
          :type="type"
          class="outline-none w-full h-[40px]"
          :value="modelValue"
          @input="handleInput"
          @focus="isFocused = true"
          @blur="handleBlur"

      />
      <label
          class="absolute md:text-[14px] text-xs transition-all duration-300 pointer-events-none z-10"
          :class="{
        'top-[10px]  text-gray-400 right-1': !isFocused && !modelValue,
          '-top-[10px] text-xs right-0 text-black': isFocused || modelValue
      }"
      >
        {{ title }}
      </label>

    </div>
    <span class="absolute bottom-0 right-0 w-full h-px bg-black opacity-20"></span>
    <span class="absolute bottom-0  h-px w-full bg-black transition-all duration-700 group-hover:left-0 "
          :class="isFocused ? 'left-0' : 'left-full'"

    ></span>


  </div>

</template>

<style scoped>

</style>