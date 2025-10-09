<template>

  <div v-show="isDataLoad" class="w-full lg:mt-0 px-4 md:pt-0 lg:pt-[170px] md:px-0 h-[calc(100vh)] overflow-hidden">
    <div class="overflow-hidden h-full transition-all duration-1000">

      <div
          :class="[showSubCategory ? '-translate-y-full' : '-translate-y-0']"
          class="flex w-full h-full transition-all duration-1000 flex-col lg:flex-row"
      >
        <div
            v-for="(category, index) in categories"
            :key="category.id"
            @mouseover="openHoverCategory(index)"
            @mouseleave="closeHoverCategory(index)"
            @click="openSubCategories(category)"
            class="transition-all duration-1000 border-[#C5C5C5] flex-shrink-0
           flex-row items-center justify-between px-2
           lg:h-full lg:flex-col lg:px-0 lg:py-8 py-2"
            :class="[
      index !== 3 && 'lg:border-l',
      hoverItemIndex === index
        ? 'lg:basis-[34%]'
        : hoverItemIndex !== null
        ? 'lg:basis-[22%]'
        : 'lg:basis-[25%]',
      'w-full border-b last:border-b-0 lg:border-b-0' // موبایل
    ]"
        >
          <!-- موبایل و دسکتاپ دو حالت -->
          <div class="flex flex-row items-center justify-between w-full lg:flex-col lg:h-full">

            <!-- Title -->
            <div
                class="flex items-center text-[#868686] text-[18px] font-medium
               lg:h-2/6 lg:justify-center lg:text-[24px] lg:px-4 lg:rotate-0"
            >
        <span
            class="transition-all duration-500"
            :class="[
            'lg:transform lg:w-full lg:text-center lg:translate-y-1/2 lg:-rotate-90',
            index === hoverItemIndex ? 'lg:translate-x-[-50%]' : 'lg:translate-x-0'
          ]"
        >
          {{ category.title }}
        </span>
            </div>

            <!-- Image + short desc -->
            <div class="flex items-center gap-4 lg:flex-col lg:justify-end lg:h-4/6 lg:gap-0">
              <!-- Image -->
              <div
                  class="relative w-[80px] lg:w-full transition-all duration-500"
                  :class="[index === hoverItemIndex ? 'lg:translate-x-[-40%]' : 'lg:translate-x-0']"
              >
                <img :src="category.image" class="max-w-[80px] w-[80px] h-[80px] lg:max-w-[190px]" alt="">
              </div>

              <!-- Short desc -->
              <div
                  class="text-[#515151] text-sm lg:text-justify transition-all duration-500
                 opacity-100 lg:opacity-0 lg:w-7/12 hidden lg:flex"
                  :class="[index === hoverItemIndex ? 'lg:opacity-100' : '']"
              >
                {{ category.short_desc }}
              </div>
            </div>
          </div>
        </div>
      </div>




      <div  :class="[showSubCategory ? '-translate-y-full' : '-translate-y-0']" class="lg:grid lg:grid-cols-12 flex flex-col    transition-all duration-1000 h-full ">


        <div :class="[subHoverItemIndex === 1 ? 'text-black' : 'text-white']" class="col-span-12 lg:row-span-6  transition-all duration-500  bg-blend-darken border-[#C5C5C5] border-y lg:text-[140px] text-[40px] relative lg:tracking-[40px] tracking-[20px]  flex items-center justify-center">
          <nuxt-link v-show="subCats.length >  0 " :to="`/product/${subCats[0].slug}`"  >
            {{ subCats[0].slug }}
            <div  v-show="subCats[0].image" class="absolute inset-0 flex items-center justify-center">
              <img  :src="subCats[0].image" alt=""  class="w-[80%] max-w-[220px] max-h-[220px]">
            </div>

            <div class="absolute left-2 top-2 text-base tracking-normal w-4 ">
              <img src="~/assets/img/Vector.png" alt="">
            </div>
          </nuxt-link>

        </div>
        <div :class="[subHoverItemIndex === 2 ? 'text-black' : 'text-white']" class="lg:col-span-5 h-[120px] lg:h-auto col-span-12 lg:row-span-6  transition-all duration-500  lg:border-l border-b lg:border-b-none border-[#C5C5C5] lg:text-[140px] text-[40px] lg:tracking-[40px] tracking-[20px] relative flex items-center justify-center">

          <nuxt-link v-show="subCats.length > 1 " :to="`/product/${subCats[1].slug}`"   >
            {{ subCats[1].slug }}
            <div  v-show="subCats[1].image" class="absolute inset-0 flex items-center justify-center">
              <img  :src="subCats[1].image" alt=""  class="w-[80%] max-w-[220px] max-h-[220px]">
            </div>
            <div class="absolute left-2 top-2 text-base tracking-normal w-4 ">
              <img src="~/assets/img/Vector.png" alt=""  >
            </div>
          </nuxt-link>
        </div>

        <div   :class="[subHoverItemIndex === 3 ? 'text-black' : 'text-white']" class="lg:col-span-7 col-span-12 lg:row-span-6 transition-all duration-500 px-2  lg:text-[140px] text-[40px] relative lg:tracking-[40px] tracking-[20px] flex items-center justify-center relative">
          <nuxt-link v-show="subCats.length > 2 " :to="`/product/${subCats[2].slug}`"  >
            {{ subCats[2].slug }}
            <div  v-show="subCats[2].image" class="absolute inset-0 flex items-center justify-center">
              <img  :src="subCats[2].image" alt=""  class="w-[80%] max-w-[220px] max-h-[220px]">
            </div>
            <div class="absolute left-2 top-2 text-base tracking-normal w-4 ">
              <img src="~/assets/img/Vector.png" alt=""  >
            </div>
          </nuxt-link>

        </div>


      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({

  layout:'route',
  pageTransition: {
    name: 'page-transition',
    mode: 'out-in'
  }
})




const store = useGlobalStore()

const {endLoading ,getLayoutData} = store


import {useGlobalStore} from '~/stores/global.js'
import img from 'assets/img/01.png'

const categories = ref([])
const subCategories = ref([])
const isDataLoad = ref(true)

const {data: response} = await useAsyncData(
    `categories-product`,
    () => useApi('/categories', {
      query: {
        locale: 'fa',
        type: 'normal',
        scope: 'all'
      }
    })
    , {
      transform: (data) => {
        return data.data
            // فقط آیتم‌های بدون parent_id (یعنی ریشه‌ها)
            .filter(category => category.parent_id === null)
            // انتقال children → subcategories
            .map(category => ({
              ...category,
              subcategories: category.children ?? []
            }))
      }
    })


if(response.value){

  categories.value = response.value

}





const subCats = computed(()=>{
  const find = categories.value.findIndex(item=>item.id === selectedItem.value.id)
  if(find > -1){
    return categories.value[find].children
  }
  return []
})


store.setLayoutData({title:'دسته بندی محصولات' ,  description:getLayoutData.description})



// refs
const bodyElement = ref(null)
const titleElement = ref(null)

const subHoverItemIndex = ref(null)
const showSubCategory = ref(false);
const selectedItem = ref({});

const hoverItemIndex = ref(null);
const openSubCategories = (value) => {
  showSubCategory.value = true;
  selectedItem.value = value
};
const openHoverCategory = (index) => {
  hoverItemIndex.value = index;
};
const closeHoverCategory = (index) => {
  hoverItemIndex.value = null;

};

const closeSubCategories = () => {
  showSubCategory.value = false;
  selectedItem.value = null
};

// Provide layout refs for animation
provide('contentRefs', {
  body: bodyElement,
  actions: null,
  title: titleElement,
  subtitle: null,
  hasScroll: false,
})





// متای سئو
useHead({
  meta: [
      {name: 'description', content: 'محصولات'},
      {name: 'keywords', content: 'محصولات'},
  ],
})
const animationTimeline = ref(null)


const anim = (items) =>{
  animationTimeline.value = new TimelineLite();
  animationTimeline.value.set(items, { opacity: 0, y: 50 });

  items.forEach((item, index) => {
    animationTimeline.value.to(item, 0.4, {
      y: 0,
      opacity: 1,
      ease: Power3.easeOut,
      delay:  0.01 // تأخیر بین آیتم‌ها
    });
  });
  // مخفی کردن آیتم‌های جدید قبل از انیمیشن

}





useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s',
})











onMounted(async () => {


  setTimeout(() => {

    endLoading()

  }, 100)
})
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

</style>


