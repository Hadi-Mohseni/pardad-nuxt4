<template>
  <div class="bg-[#F5F5F7] p-4 rounded-2xl font-['PeydaXDemi'] select-none">
    <div class="w-full text-right cursor-pointer"
         @click="submitFlag = !submitFlag"
    >
      <div class="flex w-full justify-between items-center">
        <span class="  font-bold text-[#A5A5A6] text-sm md:text-base w-10/12">ثبت دیدگاه</span>
        <div class="w-1/12 text-left flex items-center justify-end">
          <span :class="(submitFlag) ? 'bg-gray-400 rotate-90' : 'bg-gray-300 rotate-180'"
                class="text-white  text-lg  rounded-full w-7 h-7 min-w-7 min-h-7 flex items-center justify-center transform transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="white"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>

        </span>
        </div>

      </div>

    </div>
    <CollapseTransition :isOpen="submitFlag">
      <form
            @submit.prevent="submit"
            class="flex flex-col gap-5 mt-4 pl-4 font-['PeydaXDemi'] text-[14px]">
        <div class="gap-4 grid col-span-2">

          <BlogsInputForm  class="md:col-span-1 col-span-2 " v-model="form.first_name" type="text" title="نام"/>
          <BlogsInputForm class="md:col-span-1 col-span-2 " v-model="form.last_name" type="text" title="نام خانوادگی"/>
          <BlogsInputForm class="md:col-span-1 col-span-2 " v-model="form.mobile" type="tel" title="شماره موبایل"/>
          <BlogsInputForm class="md:col-span-1 col-span-2 " v-model="form.email" type="email" title="ایمیل"/>
          <BlogsInputForm class="col-span-2" v-model="form.content" type="text" title="کامنت شما..."/>



        </div>


        <button type="submit"
                @click="submit"
                class="transition-all md:text-[14px] text-xs hover:opacity-60 cursor-pointer mt-5 px-10 py-1 w-fit mr-auto bg-transparent text-gray-500 border border-gray-500 rounded">
          ارسال
        </button>
        <div class="text-xs text-[#fff]" :class="[messageStatus === 'success' ? 'text-green-600' : 'text-red-600']">
          {{message}}
        </div>

      </form>
    </CollapseTransition>


  </div>
</template>
<script setup>


const submitFlag = ref(false)
const route = useRoute()

const props = defineProps({
  id: {
    type: [String, Number],
    default: null
  }
})
const runtimeConf  = useRuntimeConfig()

const message = ref('')
const messageStatus = ref('success')

const form = ref({
  first_name:'',
  mobile:'',
  email:'',
  last_name:'',
  content:'',
})
const isValidForm = computed(()=>{

  return false

})
const submit = async (event) => {





  if(
      form.value.first_name.length > 0 &&
      form.value.last_name.length > 0 &&
      form.value.mobile.length === 11 &&
      form.value.email.length > 0 &&
      form.value.content.length > 0
  ){
    event.preventDefault()
    try {
      const res = await useApi(`/blog/${props.id}/comments`, {
        method: 'POST',
        body: form.value,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      form.value = {}
      messageStatus.value = 'success'
      message.value = 'نظر شما با موفقیت ثبت شد!'
      setTimeout(()=>{
        message.value = ''

      },5000)



    } catch (error) {
      message.value = 'خطایی رخ داده است لطفا مجدد امتحان کنید!'
      messageStatus.value = 'failed'
      setTimeout(()=>{
        message.value = ''
      },5000)
    }
    return
  }


  message.value = '* پر کردن همه فیلد ها الزامی است!'
  messageStatus.value = 'failed'
  setTimeout(()=>{
    message.value = ''
  },5000)



}
const enter = (el)=> {
  el.style.height = 'auto';
  const height = getComputedStyle(el).height;
  el.style.height = '0';
  setTimeout(() => {
    el.style.height = height;
  });
}
const afterEnter = (el)=> {
  el.style.height = 'auto';
}
const leave = (el)=> {
  el.style.height = getComputedStyle(el).height;
  setTimeout(() => {
    el.style.height = '0';
  });
}
</script>

<style>
.expand-enter-active, .expand-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.expand-enter, .expand-leave-to {
  height: 0 !important;
}
</style>