import type { Directive } from 'vue'

const VLazyLoad: Directive = {
    mounted(el, binding) {
        if (process.client) {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.05,
                ...binding.value?.options
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        binding.value?.callback?.()
                        observer.unobserve(el)
                    }
                })
            }, options)

            observer.observe(el)
            el.__lazyObserver = observer
        }
    },
    unmounted(el) {
        if (el.__lazyObserver) {
            el.__lazyObserver.disconnect()
        }
    }
}

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.directive('lazy-load', VLazyLoad)
})