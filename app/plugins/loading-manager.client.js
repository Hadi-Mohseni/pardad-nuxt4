export default defineNuxtPlugin((nuxtApp) => {
    const store = useGlobalStore()
    const router = useRouter()

    // فقط بار اول که اپ لود میشه (رفرش یا ورود مستقیم)
    const navType = performance.getEntriesByType('navigation')[0]?.type
    if (navType === 'reload' || navType === 'navigate') {
        store.setLoadingType('main')
    }

    // بعد از این، هر تغییری بین routeها بررسی میشه
    router.beforeEach((to, from, next) => {
        // اگه مسیر اول لود هست (هنوز from خالیه)
        if (!from.name) {
            store.setLoadingType('main')
            return next()
        }

        // بررسی نوع layout صفحه مقصد
        // مسیر صفحه مقصد رو از meta بگیریم
        const matchedLayout = to.meta.layout || 'default'

        // layoutهایی که باید از CommonLineWrapper استفاده کنن
        const lineLayouts = [ 'route', 'page']

        if (lineLayouts.includes(matchedLayout)) {
            store.setLoadingType('line')
        } else {
            store.setLoadingType('main')
        }

        next()
    })
})
