// composables/useCategoryMenu.ts
import { sharedPrerenderData } from '#app'

export const useCategoryMenu = () => {
    return sharedPrerenderData('category-menu', async () => {
        const { data } = await useAsyncData('category-menu', () =>
            $fetch('/api/categories', {
                query: {
                    locale: 'fa',
                    type: 'normal',
                    scope: 'all'
                }
            })
        )

        // داده‌ها رو به همون شکل ساختار منوت آماده می‌کنیم
        return data.value?.data?.map((category: any) => ({
            ...category,
            children: category.children ?? []
        })) || []
    })
}
