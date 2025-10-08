<template>
  <div class="text-black-100 h-dvh relative bg-transparent transition-all duration-500">
    <div ref="sliderSection" class="text-black-100 w-full h-full mx-auto flex items-center justify-start">
      <div class="md:mt-0 mt-16 w-full h-full py-10 text-right md:mb-0 mb-auto md:pt-[200px] pt-0 md:px-24 px-0">
        <div class="flex flex-col md:flex-row w-full ">
          <!-- Sidebar -->
          <div class="lg:sticky relative lg:w-1/4 w-full lg:flex md:items-start">
            <!-- Mobile Horizontal Scroll Tabs -->
            <div class="md:hidden pt-24">
              <div class="lg:hidden flex relative">
                <h1
                    class="lg:pr-4 md:pr-20 pr-4 text-right pb-5 tracking-tighter lg:tracking-normal lg:pb-10 font-bold text-black mt-8 w-full"
                    ref="titleElement"
                >
                  <slot name="title"/>

                </h1>
                                <CommonHorizontalLine
                                    v-show="showSection"
                                    class="lg:hidden flex"
                                    ref="pageHorizontalLine"
                                    :element="titleElement"
                                />
              </div>

              <div class="px-4 my-4 text-sm text-[#6D6D6D]">{{ title }}</div>

              <div class="overflow-x-auto whitespace-nowrap py-2" dir="rtl">

                <div class="inline-flex gap-x-2 space-x-reverse px-4 transition-all flex-row-reverse">
                  <div
                      v-for="(category, index) in categories"
                      :key="category.id"
                      @click="handleGetBlog(category, 'category')"
                      :style="{background : activeCat?.id === category.id ? primaryColor : '#e1e1e1'}"
                      :class="[
                      'cursor-pointer px-4 py-2 rounded-2xl text-sm inline-flex items-center min-w-max transition-all duration-300',
                      activeCat?.id === category.id ? ` text-white` : ' text-[#919191]',
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
                      @click="handleGetBlog(activeCat, 'category')"
                      :class="activeCat?.id && !subActiveTab ? 'text-[#FFFFFF] font-medium' : 'text-[#e2e2e2] font-normal'"
                      class="relative cursor-pointer px-4 text-xs border-b border-b-gray-500 h-6"
                  >
                    <div
                        v-show="activeCat?.id && !subActiveTab "
                        class="absolute bottom-[-7px] left-1/2 -translate-x-1/2 bg-[#454545] w-1/3 h-[3px]"
                    ></div>
                    <span>{{ activeCat?.title }}</span>
                  </div>
                  <div
                      v-for="(subcategory, subIndex) in subcategories"
                      :key="subIndex"
                      @click.stop="handleSelectSubcategory(subcategory)"
                      :class="[
                      'cursor-pointer px-4 text-xs border-b border-b-gray-500 h-6',
                      subActiveTab === subcategory.id ? 'text-[#FFFFFF] font-medium' : 'text-[#e2e2e2] font-normal',
                    ]"
                      class="relative"
                  >
                    <div
                        v-show="subActiveTab === subcategory.id"
                        class="absolute bottom-[-7px] left-1/2 -translate-x-1/2 bg-[#454545] w-1/3 h-[3px]"
                    ></div>
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
                {{title}}
              </div>

              <div class="relative" ref="containerRef">
                <div class="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-gray-300"></div>
                <div
                    class="hidden md:block absolute right-0 w-[1px] transition-all duration-200"

                    :style="{ top: `${greenBarTop}px`, height: `${greenBarHeight}px` , background:primaryColor }"
                ></div>

                <ul class="hidden md:flex md:flex-col md:space-y-2 h-auto" dir="rtl">
                  <li v-for="(category, index) in categories" :key="index">
                    <span
                        @click="handleGetBlog(category, 'category' , openSubCat)"
                        class="cursor-pointer px-3 py-3 rounded-md text-xl md:text-base flex items-center justify-between hover:font-bold transition-all duration-200"

                        :class="[(activeCat?.id === category.id && !subActiveTab) ? `hover:text-[${primaryColor}] text-[${primaryColor}] font-bold` : `hover:text-[${primaryColor}] text-[#1e1e1e] font-light`]"
                        :data-category-id="category.id"
                    >
                      <span>{{ category.title }}</span>

                      <svg
                          v-show="category.children?.length > 0"
                          class="w-4 h-4 ml-12 transition-transform duration-200"
                          :class="{ 'rotate-180': activeCat?.id === category.id }"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </span>

                    <div v-show="category.isLoading" class="text-xs text-gray-500 px-3 py-1">در حال بارگذاری...</div>
                    <CollapseTransition :isOpen="activeCat?.id === category.id ">
                      <ul
                          v-show="category.children?.length > 0"
                          class="space-y-2 pl-4"
                      >
                        <li
                            v-for="(subcategory, subIndex) in category.children"
                            :key="subIndex"
                            @click.stop="handleSelectSubcategory(subcategory)"
                            :data-sub-category-id="subcategory.id"
                            class="cursor-pointer px-4 py-2 rounded-3xl text-sm transition-all duration-300 ease-out"
                            :class="[subActiveTab === subcategory.id ? `hover:text-[${primaryColor}] text-[${primaryColor}] font-bold` : `hover:text-[${primaryColor}] text-[#1e1e1e] font-light`]"
                        >
                          {{ subcategory.title }}
                        </li>
                      </ul>
                    </CollapseTransition>

<!--                    <ul
                        v-show="category.children?.length > 0"
                        class="overflow-hidden transition-all duration-300 ease-in-out -mt-[10px]"
                        :class="{
                        'max-h-0': activeTab?.id !== category.id,
                        'max-h-screen': activeCategoryId === category.id,
                      }"
                    >
                      <li
                          v-for="(subcategory, subIndex) in category.children"
                          :key="subIndex"
                          @click.stop="handleSelectSubcategory(subcategory)"
                          :data-sub-category-id="subcategory.id"
                          class="mt-[20px] cursor-pointer px-4 py-2 rounded-3xl text-sm hover:font-bold transition-all duration-500"
                          :class="[subActiveTab === subcategory.id ? `hover:text-[${primaryColor}] text-[${primaryColor}] font-bold ` : `hover:text-[${primaryColor}] text-[#1e1e1e] font-light`]"
                      >
                        {{ subcategory.title }}
                      </li>
                    </ul>-->
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Content Cards -->
          <div class="md:pr-10 flex flex-col w-full lg:w-[68%] px-4">


            <transition name="fade">
              <slot name="content" />
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, watch, nextTick, onMounted} from 'vue'

// Props from page
const props = defineProps({
  title: {type: String},
  blogs: {type: Array, default: () => []},
  loading: {type: Boolean, default: true},
  categories: {type: Array, default: () => []},
  activeCategoryId: {type: [String, Number], default: null},
  activeTab: {type: Object, default: {}},
  subcategories: {type: Array, default: () => []},
  primaryColor:{
    type:String,
    default: '#121212'
  },

})



const titleElement = ref(null)

const emit = defineEmits(['updateCategory', 'updateSubcategory'])

const searchTerm = ref('')
const activeCategoryId = ref(props.activeCategoryId)

const activeCategoryObj = computed(() =>
    props.categories.find((c) => c.id === activeCategoryId.value) || null
)
const categoryMobile = computed(() =>
    props.categories
)
const selectTab = computed(() =>
   props.activeTab
)

const activeCat = ref(props.activeTab)

/*const activeCat = computed(()=>props.activeTab)*/

watch(
    () => props.activeTab, // getter function makes it reactive
    (val) => {
      activeCat.value = val
    }
)





const subActiveTab = ref(null)


// Refs for animation & UI
const pageHorizontalLine = ref(null)
const containerRef = ref(null)
const greenBarTop = ref(0)
const greenBarHeight = ref(0)
const showSection = ref(false)


const openSubCat = ref(false)

const updateGreenBarPosition = async (categoryId, subCategoryId = null) => {
  if(!categoryId) return
  await nextTick()

  if (!containerRef.value) return

  // Find the active element (either category or subcategory)
  let activeElement;
  if (subCategoryId) {
    // If subcategory is active, find the subcategory element
    activeElement = containerRef.value.querySelector(`[data-sub-category-id="${subCategoryId}"]`)
  }

  // If no subcategory or subcategory not found, use the category
  if (!activeElement) {
    activeElement = containerRef.value.querySelector(`[data-category-id="${categoryId}"]`)
    if (!activeElement) return
  }

  const containerRect = containerRef.value.getBoundingClientRect()
  const activeItemRect = activeElement.getBoundingClientRect()

  greenBarTop.value = activeItemRect.top - containerRect.top
  greenBarHeight.value = activeItemRect.height

  // If it's a category and it's expanded, add the children height
  if (!subCategoryId && activeCat.value && activeCat.value.id === categoryId) {
    const childrenList = activeElement.nextElementSibling?.querySelector('ul')
    if (childrenList) {
      const childrenRect = childrenList.getBoundingClientRect()
      // Only add the height if we're showing the category, not the subcategory
      if (!subActiveTab.value) {
        greenBarHeight.value += childrenRect.height
      }
    }
  }
}

const handleGetBlog = (category, type , value) => {
  if (activeCat.value && activeCat.value.id !== category.id) {

    subActiveTab.value = null
    activeCat.value  = null
  }else{
    subActiveTab.value = null
    activeCat.value  = category
    emit('updateCategory', category, type)
    updateGreenBarPosition(category.id)
  }



  console.log(activeCat.value)





}

const handleSelectSubcategory = (subcategory) => {
  subActiveTab.value = subcategory.id
  emit('updateSubcategory', subcategory)
  updateGreenBarPosition(activeCat.value?.id, subcategory.id)
}

const handleToggleCategory = (category) => {
  if (activeCat.value && activeCat.value.id === category.id) {
    activeCat.value = null
  } else {
    activeCat.value  = category
  }
  updateGreenBarPosition(category.id )
}

// Animation control methods (implement as needed)
const createAllAnimation = () => {
  if (pageHorizontalLine.value?.create) pageHorizontalLine.value.create()
}
const startAllAnimation = () => {
  if (pageHorizontalLine.value?.start) pageHorizontalLine.value.start()
}

// Search filter for blogs
const filteredBlogs = computed(() => {
  if (!searchTerm.value) return props.blogs
  return props.blogs.filter((item) => item.title.includes(searchTerm.value))
})

onMounted(()=>{
 setTimeout(()=>{
   if(activeCat.value && activeCat.value.id ){
     showSection.value = true
     setTimeout(()=>{
       createAllAnimation()
       setTimeout(()=>{
         startAllAnimation()
         pageHorizontalLine.value.update(-50)
       },15)
     },5)
     updateGreenBarPosition(activeCat.value.id)
   }

 },1000)
})
useServerSeoMeta({
  robots: 'noindex, nofollow'
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
