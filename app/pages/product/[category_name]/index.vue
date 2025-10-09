<template>

    <div class="w-full h-full mt-10 lg:mt-0 px-4 md:pt-0 lg:pt-[150px] md:px-0">
      <section>
        <ul
            ref="bodyElement"
            dir="ltr"
            class="grid w-full pb-[7vw] gap-y-6 grid-cols-2  lg:grid-cols-3 "
        >


          <nuxt-link :to="`/product/${route.params.category_name}/${product.slug.toLowerCase()}`"   v-for="(product, index) in products"
                :key="product.id"
                :data-id="product.id"
                :class="(index ) % 3 === 0 && 'border-l-0'"
                class="px-4 transition-all duration-300 my-auto  text-left text-white flex  lg:block  border border-transparent group w-full h-[300px] relative  hover:border-[#B2B2B2]">

            <div class="inset-0 absolute lg:translate-y-1/2 lg:translate-x-1/2 bottom-1/2 ">
              <img
                  class="backface-hidden w-[80%] max-w-[150px] max-h-[150px]"
                  :src="img"
              />
            </div>
            <span class="flex h-full justify-center items-center text-[26px]">
                {{product.title}}

              </span>



          </nuxt-link>
          <!--            <li
                          v-for="(brand, index) in brands"
                          :key="brand.id"
                          :data-id="brand.id"
                          class="brand-item group w-full h-[300px] relative flex justify-center items-center flex-shrink-0 "

                      >
                        <img
                            class="backface-hidden w-[80%] max-w-[150px] max-h-[150px]"
                            :src="brand.image"
                            :alt="brand.name"
                        />
                        <div class="absolute left-0 bottom-0 block w-full text-center">
                          <div
                              class="after:content-[''] after:absolute after:bottom-0 after:left-0
                              after:block after:w-full after:h-px after:bg-black
                              after:scale-x-0 after:transition-transform after:duration-300
                              group-hover:after:scale-x-100 z-[2] relative inline-block mt-4 tracking-[0.26em] opacity-0 group-hover:opacity-100
                              transition-opacity duration-300 text-[10px]  sm:text-[calc(0.3vw+5.2px)] font-['ArchiaBold']  uppercase text-[#000] sm:py-[2vw] py-[5vw]"
                          >
                            {{ brand.name }}
                            <span
                                class="absolute bottom-0 left-0 block w-full h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                            ></span>
                          </div>
                        </div>
                        <div
                            class="absolute inset-0 border border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:border-gray-200"
                            :class="(index + 1) % 3 === 0 && 'border-l-0'"
                        ></div>
                      </li>-->
        </ul>

        <div ref="infiniteScrollTrigger" class="h-64 w-full "></div>

        <!-- اسکلتون یا لودینگ (اختیاری) -->
        <div v-show="isLoading" class="flex justify-center py-16">
          در حال بارگذاری...
        </div>
      </section>
    </div>

</template>

<script setup>
definePageMeta({
  dataPage: 'industrial-brands',
  layout:'route',
  pageTransition: {
    name: 'page-transition',
    mode: 'out-in'
  }

})
const route = useRoute()
const category = ref({})

const products = ref([])
import {useGlobalStore} from '~/stores/global.js'
const store = useGlobalStore()
const {getLayoutData , getLoading} = storeToRefs(store)



const {data: response} = await useAsyncData(
    `cat-prod`,
    () => useApi(`/categories/slug/${route.params.category_name}`, {
      query: {
        locale: 'fa',
      }
    })
    , {
    })






if(response.value){

  category.value = response.value.data
  store.setLayoutData({title:category.value.contents[0].title ,  description:category.value.contents[0].short_desc})


}

const {data: response2} = await useAsyncData(
    `product`,
    () => useApi('/product', {
      query: {
        locale: 'fa',
        category_id:category.value.code

      }
    })
    , {
    })


if(response2.value){
  products.value = response2.value.data
}





import {useContentAnimation} from '~/composables/useContentAnimation.js'
import {useInfiniteData} from '~/composables/useInfiniteData.js'

import  img from '~/assets/img/01.png'

const availableImages = [
  '/logo/0.png',
  '/logo/1.png',
  '/logo/2.png',
  '/logo/3.png',
  '/logo/4.png',
];

watch(getLoading, (value) => {
  if (!value) {
    setTimeout(() => {
      endLoading()
    }, 150)
  }
})








const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  return availableImages[randomIndex];
};

/*import img_0 from '@/assets/img/logo/0.png'
import img_1 from '@/assets/img/logo/1.png'
import img_2 from '@/assets/img/logo/2.png'
import img_3 from '@/assets/img/logo/3.png'*/

const {animateNewItems} = useContentAnimation()

const {endLoading} = store

// refs
const bodyElement = ref(null)
const titleElement = ref(null)

// Provide layout refs for animation
provide('contentRefs', {
  body: bodyElement,
  actions: null,
  title: titleElement,
  subtitle: null,
  hasScroll: false,
})
const paginateInfo = ref({
  total: 1,
  per_page: 1,
  current_page: 1,
  last_page: 1
})
const page = ref(1)
const per_page = ref(12)
const isLoading = ref(false)
const observer = ref(null)
const infiniteScrollTrigger = ref(null)
const brands = ref([])



// متای سئو
useSeoMeta({
  title: 'برندهای صنعتی',
  description: 'برندهای صنعتی',
  keywords: 'برندهای صنعتی',
})
useHead({
  meta: [{name: 'robots', content: 'noindex, nofollow'}],
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


async function getData() {

}


useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s',
})


const setupInfiniteScroll = () => {
  observer.value = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting && !isLoading.value && paginateInfo.value.current_page <= paginateInfo.value.last_page) {
      loadNextPage();
    }
  });

  if (infiniteScrollTrigger.value) {
    observer.value.observe(infiniteScrollTrigger.value);
  }
}
const loadNextPage = async () => {
  if (isLoading.value || page >= paginateInfo.value.last_page) return;
  isLoading.value = true;
  page.value += 1;
  await getData();
}








getData()





// استفاده از composable برای infinite scroll
/*const {
  items: brands,
  isLoading,
  hasMore,
  loadInitial,

  startInfiniteScroll,
} = useInfiniteData({
  endpoint: '/api/brands',
  perPage: 9,
  displayCount: 3,
  target: bodyElement,
  animateCallback: animateNewItems,
})*/

onMounted(async () => {


  /* await loadInitial()
   startInfiniteScroll()*/


  setTimeout(() => {

    endLoading()

  }, 100)
})
</script>
<style>

</style>
