<template>
    <MainCategory name="category" :blogs="updateBlogList" :loading="blogLoadingList" :categories="categoryItems" :active-category-id="activeTab" :subcategories="currentSubcategories"
        :active-tab="activeCategory" @updateCategory="getBlog" @updateSubcategory="selectSubcategory" primary-color="#121212" ref="sect" v-show="showSection" class="invisible"
        title="همه دسته بندی ها">
        <template #title>
            وبلاگ گروه پرداد
        </template>
        <template #content>
            <div class="h-full" ref="el">
                <!--        <div class="border-t border-b mt-8 md:mt-0">
          <div class="w-full py-2">
            <input
                type="text"
                v-model="searchTerm"
                placeholder="جستجو کنید..."
                class="text-xs w-full focus:outline-none focus:border-gray-500 py-2 text-right placeholder-gray-400"
            />
          </div>
        </div>-->

                <div v-if="isLoading" class="flex w-full h-24  my-auto items-center justify-center text-center">
                    <div class="text-center flex items-center justify-center flex-col gap-y-2">
                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin  fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor" />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill" />
                            </svg>
                            <span class="sr-only"> در حال دریافت اطلاعات...</span>
                        </div>
                        <p class="text-sm text-gray-600 leading-relaxed">

                            در حال دریافت اطلاعات...
                        </p>
                    </div>

                </div>

                <div v-else>
                    <div v-if="updateBlogList && updateBlogList.length > 0" ref="bodyElement" class="h-full grid grid-cols-1 md:grid-cols-2 gap-x-6 w-full">

                        <div v-for="(item, index) in updateBlogList" :key="index">
                            <nuxt-link :title="item.title" class="relative overflow-hidden inline-block text-[#1e1e1e] group py-2 w-full"
                                :to="`/blog/${selectedSlug}/${item.id}/${encodeURIComponent(item.slug)}`">
                                <h3 class="font-medium text-medium lg:mb-0 mb-2 truncate" v-html="seperatedText(item.title)"></h3>
                                <div class="mb-2 text-sm text-gray-500 leading-relaxed lg:min-h-[80px] lg:max-h-[90px] overflow-hidden">
                                    <span class="line-clamp-3 pt-2" v-if="item.short_desc" v-html="seperatedText(item.short_desc.slice(0, 250))"></span>
                                </div>

                                <p class="text-xs text-gray-500 text-right">{{ formatJalaliDate(item.published_at) }}</p>
                                <span :class="index % 2 !== 0 ? 'right-0' : 'left-0'" class="absolute bottom-0 right-0 w-full h-px bg-black opacity-20"></span>
                                <span :class="index % 2 !== 0 ? 'right-[calc(100%-10px)] group-hover:right-0' : 'group-hover:left-0 left-[calc(100%-10px)]'"
                                    class="absolute bottom-0  h-px w-full bg-black transition-all duration-700 "></span>

                            </nuxt-link>
                        </div>

                    </div>
                    <div v-else class="flex w-full h-24 my-auto items-center justify-center text-center">
                        <p class="text-sm text-gray-600 leading-relaxed">
                            متاسفانه مطلبی یافت نشد.
                        </p>
                    </div>
                </div>
                <div ref="infiniteScrollTrigger" class="h-1 w-full"></div>
            </div>




        </template>
    </MainCategory>
</template>

<script setup>
import { useGlobalStore } from "~/stores/global.js";

import { formatJalaliDate } from '~/utils/dateFormatter'
import MainCategory from "~/pages/MainCategory.vue";
import { ref, useTemplateRef } from "vue";
const el = useTemplateRef('el')

import { useContentAnimation } from "~/composables/useContentAnimation.js";

const { animateNewItems } = useContentAnimation()
const { endLoading } = useGlobalStore()
const { getLoading } = storeToRefs(useGlobalStore())
const navLine = ref(null)
import { useInfiniteScroll } from '@vueuse/core';

const searchTerm = ref('')
const bodyElement = ref(null)

const seperatedText = (text) => {
    return text.replace(
        /([a-zA-Z][a-zA-Z0-9 ,.'"-]+[a-zA-Z0-9])/g,
        `<span class="font-['Archia'] text-sm font-semibold">$&</span>`
    );
}

const processedText = computed(() => {
    // تشخیص زبان هر بخش از متن
    return props.text.split(/([\u0600-\u06FF]+)/).map(part => {
        if (/[\u0600-\u06FF]/.test(part)) {
            // متن فارسی
            return `<span class="fa-font">${part}</span>`;
        } else if (/[a-zA-Z]/.test(part)) {
            // متن انگلیسی
            return `<span class="en-font">${part}</span>`;
        }
        return part;
    }).join('');
});

const categoryItems = ref([])
const blogList = ref([])
const activeSubItemTop = ref(0)
const activeSubItemHeight = ref(24)

const titleElement = ref(null)
const selectedSlug = ref(null)
const requestId = ref(0)
const subList = ref([])
const subListLoading = ref(false)

const items = ref()

const itemRefs = ref({})
const sliderSection = ref()
const slideList = ref()
const currentSection = ref('slider')
const pageHorizontalLine = ref(null)
const colors = useBlogColor()
const scrollPage = ref()
const showSection = ref(false)
const sect = ref()
const reversedSliderItems = ref([])


const activeTab = ref(null)
const subActiveTab = ref(null)
const selectedActiveTab = ref(false)
const activeTabTitle = ref(null)
const activeSubTabTitle = ref(null)
const activeCategory = ref(null)
const activeSubCategory = ref(null)
const isLoading = ref(false)
const paginateInfo = ref({
    total: 1,
    per_page: 1,
    current_page: 1,
    last_page: 1
})
const page = ref(1)
const per_page = ref(12)

const observer = ref(null)
const infiniteScrollTrigger = ref(null)
const animationTimeline = ref(null)

const currentSubcategories = computed(() => {

    const category = categoryItems.value.find(item => item.id === activeCategory.value.id);
    return category ? category.children : [];
})

watch(searchTerm, (v) => {
    const blogs = [...blogList.value]
    if (v.length > 0) {
        const filters = blogs.filter(item => item.title.includes(v))
        updateBlogList.value = filters
    } else {
        updateBlogList.value = blogs
    }


})

watch(getLoading, (value) => {
    if (!value) {
        initPage()
    }
})

useHead({
    title: 'وبلاگ گروه پرداد',
    meta: [

        { name: 'robots', content: 'index, follow' },
        {
            name: 'وبلاگ گروه پرداد',
            content: 'وبلاگ گروه پرداد'
        }
    ]
});


const { data: response } = await useAsyncData(
    `categories-normal`,
    () => useApi('/categories', {
        query: {
            locale: 'fa',
            type: 'normal',
            scope: 'main'
        }
    })
    , {})


const infiniteOptions = ref({
    endpoint: '/api/blog',
    query: { category_id: null, locale: 'fa' },
    perPage: 12,
    target: bodyElement,
    animateCallback: animateNewItems,
})

const updateBlogList = ref([])
const blogLoadingList = ref(false)



const getBlog = async (item, type) => {
    blogLoadingList.value = true
    subListLoading.value = true
    subActiveTab.value = null
    activeSubCategory.value = null
    activeSubTabTitle.value = null
    selectedSlug.value = null
    page.value = 1
    blogList.value = []
    updateBlogList.value = []
    if (type === 'category') {
        activeTab.value = item.id
        activeTabTitle.value = item.title
        activeCategory.value = item
        selectedActiveTab.value = true
        activeSubTabTitle.value = null
        selectedSlug.value = item.slug

    } else {
        subActiveTab.value = item.id
        activeSubCategory.value = item
        selectedActiveTab.value = false
        activeSubTabTitle.value = item.title
        selectedSlug.value = item.slug
    }

    if (type === 'category') {
        await getData(activeCategory.value.code)
    }
    if (type === 'subcategory') {
        await getData(activeSubCategory.value.code)
    }


    /*await fetchBlogs({
      categoryId: type === 'category' ? item.id : null,
      subcategoryId: type === 'subcategory' ? item.id : null
    })*/

    /* updateActiveLinePosition()*/

    /* slider.value.changeSlideFunc(id)*/

}

const updateActiveLinePosition = () => {
    nextTick(() => {
        if (subActiveTab.value) {

            const activeElement = document.querySelector(`[ref="subItem_${subActiveTab.value}"]`)

            if (activeElement) {
                activeSubItemTop.value = activeElement.offsetTop
                activeSubItemHeight.value = activeElement.offsetHeight
            }
        }
    })
}

// واکنش به تغییرات subActiveTab
const initPage = (val) => {


    showSection.value = true
    setTimeout(() => {
        if (sect.value && sect.value.$el) {
            sect.value.$el.classList.remove('invisible');
        }
    }, 500)


}

const initData = (val) => {
    categoryItems.value = val

    if (categoryItems.value.length > 0) {

        activeTab.value = categoryItems.value[0].id
        activeTabTitle.value = categoryItems.value[0].title
        selectedSlug.value = categoryItems.value[0].slug
        activeSubTabTitle.value = null
        activeCategory.value = categoryItems.value[0]
        getBlog(categoryItems.value[0], 'category')
    }


}


const dataFetched = (value) => {
    initData(value)
    setTimeout(() => {
        endLoading()

    }, 100)


}

if (response.value) {


    useSeoMeta({
        title: 'وبلاگ گروه پرداد',
        ogTitle: 'وبلاگ گروه پرداد',
        description: 'وبلاگ گروه پرداد',
        ogDescription: 'وبلاگ گروه پرداد',
    })


    setTimeout(() => {
        dataFetched(response.value.data)
    }, 100)
}
const startAllAnimation = () => {
    pageHorizontalLine.value.start()


}

const createAllAnimation = () => {
    pageHorizontalLine.value.create()

}

const greenBarTop = ref(0)
const greenBarHeight = ref(0)
const containerRef = ref(null)
const updateGreenBarPosition = async (categoryId) => {
    await nextTick()

    if (!containerRef.value) return

    const activeItem = containerRef.value.querySelector(`[data-category-id="${categoryId}"]`)
    if (!activeItem) return

    const containerRect = containerRef.value.getBoundingClientRect()
    const activeItemRect = activeItem.getBoundingClientRect()

    greenBarTop.value = activeItemRect.top - containerRect.top

    let height = activeItemRect.height

    if (activeTab.value === categoryId) {
        const childrenList = activeItem.nextElementSibling?.querySelector('ul')
        if (childrenList) {
            height += childrenList.getBoundingClientRect().height
        }
    }
    greenBarHeight.value = height
}
// const handleGetBlog = (category, type) => {
//   getBlog(category, type)
//   updateGreenBarPosition(category.id)
// }
//
// const handleSelectSubcategory = (subcategory) => {
//   selectSubcategory(subcategory)
//   updateGreenBarPosition(activeTab.value)
// }
//
// const handleToggleCategory = (categoryId) => {
//   toggleCategory(categoryId)
//   updateGreenBarPosition(categoryId)
// }
// تابع برای toggle کردن دسته‌ها
const toggleCategory = (categoryId) => {
    activeTab.value = activeTab.value === categoryId ? null : categoryId;
};

// تابع برای انتخاب زیردسته
const selectSubcategory = (subcategory) => {
    subActiveTab.value = subcategory.id;
    selectedSlug.value = subcategory.slug;
    getBlog(subcategory, 'subcategory')

    // منطق دیگر برای بارگیری محتوا
};

watch(() => activeTab, (newVal) => {
    if (newVal) {
        updateGreenBarPosition(newVal)
    }
})




const anim = (items) => {
    if (process.client) {
        animationTimeline.value = new TimelineLite();
        animationTimeline.value.set(items, { opacity: 0, y: 50 });

        items.forEach((item, index) => {
            animationTimeline.value.to(item, 0.4, {
                y: 0,
                opacity: 1,
                ease: Power3.easeOut,
                delay: 0.01 // تأخیر بین آیتم‌ها
            });
        });
    }

    // مخفی کردن آیتم‌های جدید قبل از انیمیشن

}

const selectedId = ref(null)

async function getData(id) {
    if (!id) return
    selectedId.value = id
    if (page.value === 1) {
        isLoading.value = true
    }


    try {
        const data = await $fetch(`/api/blog`, {
            query: {
                locale: 'fa',
                category_id: id,
                page: page.value,
                per_page: per_page.value,
            },
        })

        const ln = data.data.length
        blogList.value = [...blogList.value, ...data.data] // ✅ append
        updateBlogList.value = [...blogList.value]
        paginateInfo.value = data.pagination_info

        await nextTick()
        const allItems = bodyElement.value?.children || []
        const newItems = Array.from(allItems).slice(blogList.value.length - ln)
        anim(newItems)

    } catch (error) {
        console.error("Error loading more items:", error)
        selectedId.value = null
    } finally {
        isLoading.value = false
    }
}

const loadMore = async () => {
    if (isLoading.value) return
    if (page.value >= paginateInfo.value.last_page) return

    page.value += 1
    await getData(selectedId.value)
}

const { reset } = useInfiniteScroll(
    infiniteScrollTrigger, // ✅ همون ref به آخر لیست
    loadMore,
    {
        distance: 300, // وقتی 200px مونده به ته صفحه
        canLoadMore: () => page.value < paginateInfo.value.last_page,
    }
)



useHead({
    // as a string,
    // where `%s` is replaced with the title
    titleTemplate: '%s',
})









onMounted(async () => {

    setTimeout(() => {
        if (activeTab.value) {
            updateGreenBarPosition(activeTab.value)
        }
    }, 1000)


    //
    // await loadInitial()
    // startInfiniteScroll()
    if (process.client) {
        /* setupInfiniteScroll()*/
    }




});
onBeforeRouteLeave(() => {


    showSection.value = false
})











</script>


<style scoped>
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