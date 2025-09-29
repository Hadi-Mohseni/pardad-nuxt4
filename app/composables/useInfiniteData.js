import { useInfiniteScroll } from '@vueuse/core'

export function useInfiniteData({
                                    endpoint,
                                    query = {},
                                    perPage = 9, // دریافت 9 آیتم در هر درخواست
                                    displayCount = 3, // نمایش 3 آیتم در هر مرحله
                                    target = null,
                                    animateCallback = null,
                                }) {
    const items = ref([])
    const allItems = ref([]) // ذخیره تمام آیتم‌های دریافت شده
    const page = ref(1)
    const isLoading = ref(false)
    const hasMore = ref(true)
    const initialized = ref(false)
    const displayedCount = ref(0) // تعداد آیتم‌های نمایش داده شده

    let scrollListenerAdded = false

    const loadInitial = async () => {
        isLoading.value = true
        try {
            const res = await $fetch(endpoint, {
                query: { ...query, page: page.value, per_page: perPage },
            })
            const data = res?.data || []

            if (data.length > 0) {
                allItems.value = data
                // فقط displayCount آیتم اول را نمایش دهید
                items.value = data.slice(0, displayCount)
                displayedCount.value = displayCount
                page.value += 1
                initialized.value = true

                if (data.length < perPage) {
                    hasMore.value = false
                }
            } else {
                hasMore.value = false
            }
        } catch (err) {
            console.error('Initial Load Error:', err)
        } finally {
            isLoading.value = false
        }
    }

    const loadMore = async () => {
        if (isLoading.value || !hasMore.value || !initialized.value) return

        isLoading.value = true
        try {
            // اگر هنوز آیتم‌های دریافت شده‌ای داریم که نمایش داده نشده‌اند
            if (displayedCount.value < allItems.value.length) {
                const newItems = allItems.value.slice(
                    displayedCount.value,
                    displayedCount.value + displayCount
                )
                items.value.push(...newItems)
                displayedCount.value += newItems.length

                if (animateCallback && target?.value) {
                    nextTick(() => {
                        const allElements = target.value.children
                        const newElements = Array.from(allElements).slice(-newItems.length)
                        animateCallback(newElements)
                    })
                }
            }
            // اگر تمام آیتم‌های دریافت شده نمایش داده شده‌اند، درخواست جدید بزنید
            else {

                const res = await $fetch(endpoint, {
                    query: { ...query, page: page.value, per_page: perPage },
                })
                const newItems = res?.data || []

                if (newItems.length > 0) {
                    allItems.value = [...allItems.value, ...newItems]
                    page.value += 1

                    // فقط displayCount آیتم جدید نمایش دهید
                    const itemsToShow = newItems.slice(0, displayCount)
                    items.value.push(...itemsToShow)
                    displayedCount.value += itemsToShow.length

                    if (animateCallback && target?.value) {
                        nextTick(() => {
                            const allElements = target.value.children
                            const newElements = Array.from(allElements).slice(-itemsToShow.length)
                            animateCallback(newElements)
                        })
                    }

                    if (newItems.length < perPage) {
                        hasMore.value = false
                    }
                } else {
                    hasMore.value = false
                }
            }
        } catch (err) {
            console.error('Load More Error:', err)
        } finally {
            isLoading.value = false
        }
    }

    const startInfiniteScroll = () => {
        if (scrollListenerAdded) return
        scrollListenerAdded = true

        useInfiniteScroll(
            window,
            () => {
                if (initialized.value) loadMore()
            },
            { distance: 80 }
        )
    }

    function reset() {
        page.value = 1
        items.value = []
        allItems.value = []
        displayedCount.value = 0
        hasMore.value = true
        initialized.value = false
    }

    return {
        items,
        isLoading,
        hasMore,
        loadInitial,
        loadMore,
        startInfiniteScroll,
        reset
    }
}