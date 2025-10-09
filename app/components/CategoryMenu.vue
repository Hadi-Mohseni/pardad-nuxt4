<script setup lang="ts">
import { useCategoryMenu } from '~/composables/useCategoryMenu'
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  primaryColor?: string
  textColor?: string
  navigateFn?: (item: any) => void
}

const props = withDefaults(defineProps<Props>(), {
  primaryColor: '#00a86b',
  textColor: '#1e1e1e',
  navigateFn: undefined
})

const { data: categories } = useCategoryMenu()
const router = useRouter()

// state
const containerRef = ref<HTMLElement | null>(null)
const greenBarTop = ref(0)
const greenBarHeight = ref(0)
const getActiveCategory = ref<any>(null)
const getActiveSubCategory = ref<any>(null)

const updateGreenBarPosition = async (categoryId: string, subCategoryId: string | null = null) => {
  if (!categoryId) return
  await nextTick()
  if (!containerRef.value) return

  let activeElement: HTMLElement | null = null
  if (subCategoryId) {
    activeElement = containerRef.value.querySelector(`[data-sub-category-id="${subCategoryId}"]`)
  }
  if (!activeElement) {
    activeElement = containerRef.value.querySelector(`[data-category-id="${categoryId}"]`)
    if (!activeElement) return
  }

  const containerRect = containerRef.value.getBoundingClientRect()
  const activeItemRect = activeElement.getBoundingClientRect()
  greenBarTop.value = activeItemRect.top - containerRect.top
  greenBarHeight.value = activeItemRect.height

  if (!subCategoryId && getActiveCategory.value?.id === categoryId) {
    const childrenList = activeElement.nextElementSibling?.querySelector('ul')
    if (childrenList && !getActiveSubCategory.value) {
      const childrenRect = childrenList.getBoundingClientRect()
      greenBarHeight.value += childrenRect.height
    }
  }
}

const setActiveCatFunc = (code: string) => {
  let foundCategory: any = null
  let foundSubCategory: any = null

  for (const category of categories.value || []) {
    if (category.code === code) {
      foundCategory = category
      break
    }
    if (category.children?.length > 0) {
      const subCategory = category.children.find((child: any) => child.code === code)
      if (subCategory) {
        foundCategory = category
        foundSubCategory = subCategory
        break
      }
    }
  }

  if (foundCategory) {
    getActiveCategory.value = foundCategory
    if (process.client) updateGreenBarPosition(foundCategory.code)
  }

  if (foundSubCategory) {
    getActiveSubCategory.value = foundSubCategory
    updateGreenBarPosition(foundCategory.code, foundSubCategory.code)
  } else {
    getActiveSubCategory.value = null
  }
}



const goToPage = (item: any) => {
  if (props.navigateFn) {
    props.navigateFn(item) // تابع کاستوم
  } else {
    // پیش‌فرض → مثلا می‌فرستیم به صفحه blog/category/:code
    router.push(`/blog/category/${item.code}`)
  }
}
</script>

<template>
  <div class="lg:sticky relative lg:w-1/4 w-full lg:flex md:items-start">
    <!-- Mobile -->
    <div class="md:hidden pt-24">
      <div class="overflow-x-auto whitespace-nowrap py-2" dir="rtl">
        <div class="inline-flex gap-x-2 space-x-reverse px-4">
          <div
              v-for="category in categories"
              :key="category.id"
              @click="goToPage(category)"
              :style="{ background: getActiveCategory?.id === category.id ? primaryColor : '#e1e1e1' }"
              :class="[
              'cursor-pointer px-4 py-2 rounded-2xl text-sm inline-flex items-center min-w-max transition-all duration-300',
              getActiveCategory?.id === category.id ? 'text-white' : 'text-[#919191]'
            ]"
          >
            {{ category.title }}
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden md:flex flex-col w-full">
      <div class="relative" ref="containerRef">
        <div class="hidden md:block absolute top-0 right-0 w-[1px] h-full bg-gray-300"></div>
        <div
            class="hidden md:block absolute right-0 w-[1px] transition-all duration-200"
            :style="{ top: `${greenBarTop}px`, height: `${greenBarHeight}px`, background: primaryColor }"
        ></div>

        <ul class="hidden md:flex md:flex-col md:space-y-2 h-auto" dir="rtl">
          <li v-for="category in categories" :key="category.id">
            <span
                @click="goToPage(category)"
                class="cursor-pointer px-3 py-3 rounded-md text-base flex items-center justify-between hover:font-bold transition-all"
                :class="getActiveCategory?.id === category.id ? `text-[${primaryColor}] font-bold` : `text-[${textColor}] font-light`"
                :data-category-id="category.id"
            >
              {{ category.title }}
              <svg
                  v-show="category.children?.length > 0"
                  class="w-4 h-4 ml-12 transition-transform duration-200"
                  :class="{ 'rotate-180': getActiveCategory?.id === category.id }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>

            <CollapseTransition :isOpen="getActiveCategory?.id === category.id">
              <ul v-show="category.children?.length > 0" class="space-y-2 pl-4">
                <li
                    v-for="subcategory in category.children"
                    :key="subcategory.id"
                    @click.stop="goToPage(subcategory)"
                    :data-sub-category-id="subcategory.id"
                    class="cursor-pointer px-4 py-2 rounded-3xl text-sm transition-all"
                    :class="getActiveSubCategory?.id === subcategory.id ? `text-[${primaryColor}] font-bold` : `text-[${textColor}] font-light`"
                >
                  {{ subcategory.title }}
                </li>
              </ul>
            </CollapseTransition>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
