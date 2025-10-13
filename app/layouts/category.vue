<template>
  <div dir="rtl" class="relative">

    <div class="text-black-100 h-dvh relative bg-transparent transition-all duration-500"  >
      <div ref="sliderSection" class="text-black-100 w-full h-full mx-auto flex items-center justify-start">
        <div class="md:mt-0 mt-16 w-full h-full py-10 text-right md:mb-0 mb-auto md:pt-[200px] pt-0 md:px-24 px-0">
          <div class="flex flex-col md:flex-row w-full ">

            <!-- Sidebar -->
            <div class="lg:sticky relative lg:w-1/4 w-full lg:flex md:items-start">
              <!-- Mobile Horizontal Scroll Tabs -->
              <div class="md:hidden pt-24">
                <div class="lg:hidden flex relative">

                    <h1 class="lg:pr-20 pr-4 text-right
      lg:before:content-none lg:after:content-none before:content-['']
       before:left-0 before:bg-black-100/20 before:absolute before:bottom-0
       before:right-0 before:h-[1px] after:content-[''] after:w-[8vw]
       after:bg-black-900 after:absolute after:bottom-0 after:right-[80px] after:h-[1px]
       text-[40px] md:text-[45px] lg:ml-10 xl2:ml-[300px] mb-10 lg:mb-0 font-light"
                        ref="titleElement">
                      {{ activeCategory?.parent_name }}
                    </h1>

                  <CommonHorizontalLine
                      v-if="showSection"
                      class="lg:hidden flex"
                      ref="pageHorizontalLine"
                      :element="titleElement"
                  />
                </div>

                <div class="px-4 my-4 text-sm text-[#6D6D6D]">
                  لیست بلاگ های
                  {{activeProduct?.title }}
                </div>




                <div class="overflow-x-auto whitespace-nowrap py-2" dir="rtl">


                  <div class="inline-flex gap-x-2 space-x-reverse px-4 transition-all flex-row-reverse">
                    <div
                        v-for="(category, index) in categories"
                        :key="category.id"
                        @click="toggleCategory(category)"
                        :style="{background : activeCategory?.slug === category.slug ? primaryColor : '#e1e1e1'}"
                        :class="[
                      'cursor-pointer px-4 py-2 rounded-2xl text-sm inline-flex items-center min-w-max transition-all duration-300',
                      activeCategory?.slug === category.slug ? ` text-white` : ' text-[#919191]',
                    ]"
                    >
                      {{ category.title }}
                    </div>
                  </div>
                </div>

                <div class="overflow-x-auto whitespace-nowrap py-2 mt-1" dir="rtl">
                  <div
                      class="inline-flex gap-x-4 px-4 py-2 h-8 space-x-reverse  w-full transition-all duration-300"
                      :style="{background:primaryColor }"
                  >

                    <div
                        v-for="(subcategory, subIndex) in activeCategory?.products"
                        :key="subIndex"
                        @click.stop="goToProductPage(subcategory)"
                        :class="[
                      'cursor-pointer px-4 text-xs border-b border-b-gray-500 h-6',
                      activeProduct?.slug === subcategory.slug ? 'text-[#FFFFFF] font-medium' : 'text-[#e2e2e2] font-normal',
                    ]"
                        class="relative"
                    >
                      <div
                          v-if="activeProduct?.slug === subcategory.slug"
                          class="absolute bottom-[-7px] left-1/2 -translate-x-1/2 bg-[#454545] w-1/3 h-[3px]"
                      >

                      </div>
                      <span>{{ subcategory.title }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Desktop Sidebar -->
              <div class="hidden md:flex flex-col w-full">
                <div
                    class="hidden md:block pb-4 text-white-100 bg-black-60-icon cursor-pointer whitespace-nowrap px-3 py-1 text-sm md:text-base"
                >
                  {{getActiveCategory?.parent_name }}
                </div>

<!--                <div class="relative" ref="containerRef">
                  <div class="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-gray-300"></div>
                  <div
                      class="hidden md:block absolute right-0 w-[1px] transition-all duration-200"

                      :style="{ top: `${greenBarTop}px`, height: `${greenBarHeight}px` , background:primaryColor }"
                  ></div>

                  <ul class="hidden md:flex md:flex-col md:space-y-2 h-auto" dir="rtl">
                    <li v-for="(category, index) in categories" :key="index">
                    <span
                        @click="goToBlogPage(category)"
                        class="cursor-pointer px-3 py-3 rounded-md text-xl md:text-base flex items-center justify-between hover:font-bold transition-all duration-200"

                        :class="[(getActiveCategory?.slug === category.slug && !getActiveSubCategory?.slug) ? `hover:text-[${primaryColor}] text-[${primaryColor}] font-bold` : `hover:text-[${primaryColor}] text-[#1e1e1e] font-light`]"
                        :data-category-slug="category.slug"
                    >
                      <span>{{ category.title }}</span>

                      <svg
                          v-if="category.children?.length > 0"
                          class="w-4 h-4 ml-12 transition-transform duration-200"
                          :class="{ 'rotate-180': getActiveCategory?.slug === category.slug }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </span>

                      <div v-if="category.isLoading" class="text-xs text-gray-500 px-3 py-1">در حال بارگذاری...</div>
                      <CollapseTransition :isOpen="getActiveCategory?.id === category.id ">
                        <ul
                            v-if="category.children?.length > 0"
                            class="space-y-2 pl-4"
                        >
                          <li
                              v-for="(subcategory, subIndex) in category.children"
                              :key="subIndex"
                              @click.stop="goToBlogPage(subcategory)"
                              :data-sub-category-id="subcategory.id"
                              class="cursor-pointer px-4 py-2 rounded-3xl text-sm transition-all duration-300 ease-out"
                              :class="[getActiveSubCategory?.slug === subcategory.slug ? `hover:text-[${primaryColor}] text-[${primaryColor}] font-bold` : `hover:text-[${primaryColor}] text-[#1e1e1e] font-light`]"
                          >
                            {{ subcategory.title }}
                          </li>
                        </ul>
                      </CollapseTransition>

                    </li>
                  </ul>
                </div>-->



                <div class="relative" ref="containerRef">
                  <!-- خط ثابت خاکستری سمت راست -->
                  <div class="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-gray-300"></div>

                  <!-- خط داینامیک رنگی -->
                  <div
                      class="hidden md:block absolute right-0 w-[1px] transition-all duration-200"
                      :style="{ top: `${greenBarTop}px`, height: `${greenBarHeight}px`, background: primaryColor }"
                  ></div>

                  <ul class="hidden md:flex md:flex-col md:space-y-2 h-auto" dir="rtl">
                    <li v-for="(category, index) in categories" :key="index">
                      <!-- آیتم دسته اصلی -->
                      <span
                          @click="toggleCategory(category)"
                          class="cursor-pointer px-3 py-3 rounded-md text-xl md:text-base flex items-center justify-between hover:font-bold transition-all duration-200"
                          :class="[

          activeCategory?.slug === category.slug
            ? `hover:text-[${primaryColor}] text-[${primaryColor}] font-bold`
            : `hover:text-[${primaryColor}] text-[#1e1e1e] font-light`
        ]"
                          :data-category-slug="category.slug"
                      >
        <span>{{ category.title }}</span>

        <svg
            v-if="category.products?.length > 0"
            class="w-4 h-4 ml-12 transition-transform duration-200"
            :class="{ 'rotate-180': activeCategory?.slug === category.slug && openActiveCat }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </span>

                      <!-- وقتی category انتخاب شد و products داشت -->
                      <CollapseTransition :isOpen="activeCategory?.slug === category.slug && openActiveCat">
                        <ul v-if="category.products?.length > 0" class="space-y-2 pl-4">
                          <li
                              v-for="(product, pIndex) in category.products"
                              :key="pIndex"
                              @click.stop="goToProductPage(product)"
                              :data-product-slug="product.slug"
                              class="cursor-pointer px-4 py-2 rounded-3xl text-sm transition-all duration-300 ease-out"
                              :class="[
              activeProduct?.slug === product.slug
                ? `hover:text-[${primaryColor}] text-[${primaryColor}] font-bold`
                : `hover:text-[${primaryColor}] text-[#1e1e1e] font-light`
            ]"
                          >
                            {{ product.title }}
                          </li>
                        </ul>
                      </CollapseTransition>
                    </li>
                  </ul>
                </div>



              </div>
            </div>


            <!-- Content Cards -->
            <div class="md:pr-10 flex flex-col w-full lg:w-[68%] px-4">

                <slot :items="items" />

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup>
import {ref, computed, watch, nextTick, onMounted , provide} from 'vue'
import {useCategoryStore} from "~/stores/category.js";
import {useGlobalStore} from "~/stores/global.js";

const items = ref([])

const store = useGlobalStore()

const {getLoading , getShowContent} = storeToRefs(useGlobalStore())


const categoryStore = useCategoryStore()


const {setActiveCategory,setActiveSubCategory} = categoryStore

const categories = ref([])
const {getActiveCategory , getActiveSubCategory} = storeToRefs(categoryStore)

const title = ref('همه دسته بندی ها')

const primaryColor= ref('#121212')
const greenBarTop = ref('')
const greenBarHeight = ref(0)
const openSubCat = ref(false)
const showSection = ref(false)
const showContent = ref(false)
const {endLoading} = useGlobalStore()
const titleElement = ref(null)
const containerRef = ref(null)
const blogs = ref({
  list:[],
  page:1,
  limit:1,
  loading:false
})

const route = useRoute()
const router = useRouter()
const activeCategory = ref(null)
const activeProduct = ref(null)

const openActiveCat = ref(true)

const config = useRuntimeConfig()
provide('blogs', blogs)
watch(getLoading, (value) => {
  if (!value) {
  setTimeout(()=>{
    initPage()
  },50)

  }
})
function getBlogFn(params) {
  console.log('پدر گفت:', params)
}
provide('getBlogFn', getBlogFn)

const {data: response} = await useAsyncData(
    `new-categories-normal`,
    () => useApi('/categories', {
      query: {
        locale: 'fa',
        type: 'normal',
        scope: 'children'
      }
    })
    , {
      transform: (data) => {
        return data.data.map(item => ({
          ...item,         // کپی شیء اصلی
          products: []     // اضافه کردن products خالی
        }))
      }
    })


const goToProductPage = async (product) => {
  activeProduct.value = product
  updateGreenBarPosition(activeCategory.value.slug, product.slug)
  await navigateTo(`/product/${product.category_slug}/${product.slug}`)

  // ریدایرکت
}



const getProducts = async (category , select=false)=>{

  try {
    const data = await $fetch(`${config.public.apiUrl}/product`, {
      query: {
        locale: 'fa',
        category_id:category.code
      },
    })
    const findEl = categories.value.findIndex(item=>item.code === category.code)

    categories.value[findEl].products = data.data


    if(data.data.length > 0 && select){
      openActiveCat.value = true
      setTimeout(()=>{
        const findPr = categories.value[findEl].products.find(item=>item.slug === route.params.product_name)
        activeProduct.value = findPr
        if(activeProduct.value){
          setActiveCatFunc(activeProduct.value.slug)
          getBlogListFunc(activeProduct.value.slug)
        }
      } , 10)

    }









  } catch (error) {

  } finally {

  }
}
const updateGreenBarPosition = async (categorySlug, subCategorySlug = null) => {




  if(!categorySlug) return
  await nextTick()

  if (!containerRef.value) return



  // Find the active element (either category or subcategory)
  let activeElement;
  if (subCategorySlug) {

    // If subcategory is active, find the subcategory element
    activeElement = containerRef.value.querySelector(`[data-product-slug="${subCategorySlug}"]`)
  }



  // If no subcategory or subcategory not found, use the category
  if (!activeElement) {

    activeElement = containerRef.value.querySelector(`[data-category-slug="${categorySlug}"]`)
    if (!activeElement) return
  }

  const containerRect = containerRef.value.getBoundingClientRect()
  const activeItemRect = activeElement.getBoundingClientRect()

  greenBarTop.value = activeItemRect.top - containerRect.top
  greenBarHeight.value = activeItemRect.height




  // If it's a category and it's expanded, add the children height
  if (!subCategorySlug && getActiveCategory.value && getActiveCategory.value.slug === categorySlug) {
    const childrenList = activeElement.nextElementSibling?.querySelector('ul')
    if (childrenList) {
      const childrenRect = childrenList.getBoundingClientRect()
      // Only add the height if we're showing the category, not the subcategory
      if (!getActiveSubCategory.value) {
        greenBarHeight.value += childrenRect.height
      }
    }
  }
}
if(response.value){



  categories.value = response.value
  activeCategory.value  = categories.value.find(item=>item.slug === route.params.category_name)


  setActiveCategory(activeCategory.value)



  getProducts(activeCategory.value , true)



}




const toggleCategory = async (category) => {


  if (activeCategory.value?.slug === category.slug) {

    openActiveCat.value = !openActiveCat.value
    activeProduct.value = null
    updateGreenBarPosition(activeCategory.value?.slug , null)
    blogs.value.list = []
    router.push(`/product/${category.slug}/list`)
    getBlogListFunc('list')


  } else {
    openActiveCat.value = true
    activeProduct.value = null
    activeCategory.value = category
    router.push(`/product/${category.slug}/list`)
    getProducts(activeCategory.value , false)
    getBlogListFunc('list')
    setTimeout(()=>{
      updateGreenBarPosition(category.slug , null)
    },100)


  }
}





const initPage=()=>{
  // contentLoad.value = true
  store.setContentLoad(true)
  setTimeout(() => {
    setTimeout(() => {
      store.setShowContent(true)
      setTimeout(()=>{
        updateGreenBarPosition(activeCategory.value?.slug , activeProduct.value?.slug)
      },2000)
    }, 5)
  }, 10)
}







// Props from page
const goToBlogPage = async (category)=>{


  await navigateTo(`/product/${category.slug}`)


}



const setActiveCatFunc = (name) => {



  let foundCategory = null;
  let foundSubCategory = null;

  // جستجو در بین دسته‌های اصلی و زیردسته‌ها
  for (const category of categories.value) {


    // بررسی آیا این دسته اصلی با آیدی مطابقت دارد
    if (category.slug === name) {
      foundCategory = category;
      break;
    }

    // جستجو در بین زیردسته‌ها
    if (category.products && category.products.length > 0) {
      const subCategory = category.products.find(child => child.slug === name);
      if (subCategory) {
        foundCategory = category; // دسته اصلی والد
        foundSubCategory = subCategory; // زیردسته
        break;
      }
    }
  }

  // ست کردن دسته‌های فعال
  if (foundCategory) {
    if(process.client){
      updateGreenBarPosition(foundCategory.slug)
    }

    activeCategory.value = foundCategory
  }

  if (foundSubCategory) {

    updateGreenBarPosition(foundCategory.slug , foundSubCategory.slug)


    activeProduct.value = foundSubCategory

  } else {
    // اگر زیردسته پیدا نشد، مقدار آن را null کنید
    setActiveSubCategory(null);
    activeProduct.value = null
  }
}

async function getBlogProduct(code) {


  if(!code){
    return
  }
  blogs.value.loading = true
  const config = useRuntimeConfig()
  try {
    const data = await $fetch(`${config.public.apiUrl}/product/${code}/blogs`, {
      query: {
        locale: 'fa',
        page: 1,
        per_page: 15,
      },
    })

    blogs.value.list = data.data

  } catch (error) {
    console.error("Error loading more items:", error)
  } finally {
    blogs.value.loading = false
  }
}




const getBlogListFunc = async (val)=>{
  blogs.value.list = []

  if(val === 'list'){
    blogs.value.loading = true
    try {
      const data = await $fetch(`/api/blog`, {
        query: {
          locale: 'fa',
          category_id: activeCategory.value.code,
          page: 1,
          per_page: 1,
        },
      })

      blogs.value.list = data.data

    } catch (error) {
      console.error("Error loading more items:", error)

    } finally {
      blogs.value.loading = false
    }
      //request for category blogs
  }else{
    const {data: response} = await useAsyncData(
        `product_id_${val}`,
        () => useApi(`/product/slug/${val}`, {
          query: {
            locale: 'fa',
          }
        })
        , {})
    if (response.value) {
      getBlogProduct(response.value.data.code)
    }
  }
}




/*setActiveCatFunc(route.params.category_name)*/

// واچ کردن تغییرات روی object مسیر
watch(
    () => route.params.product_name, // یا route.path اگر پارامترها براتون مهم نیست
    (newId) => {
      if (newId) {
        getBlogListFunc(newId)
      }
    }
);


useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s',
})


onMounted(()=>{

   setTimeout(() => {
    endLoading()
  }, 100)
})

onBeforeUnmount(()=>{
  store.setShowContent(false)
})


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-section-enter-active,
.fade-section-leave-active {
  transition: all 0.4s;
}

.fade-section-enter-from,
.fade-section-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Transition for accordion effect */
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 300px;
}


</style>
