// plugins/lozad.client.ts
import { defineNuxtPlugin } from '#app'
import lozad from 'lozad'

export default defineNuxtPlugin((nuxtApp) => {
    const initLozad = () => {
        const observer = lozad('.lozad', {
            loaded: (el) => {
                el.classList.add('loaded')
            }
        })
        observer.observe()
    }

    // Initialize on first load and route changes
    nuxtApp.hooks.hook('app:mounted', () => {
        initLozad()
        new MutationObserver(initLozad).observe(document.body, {
            childList: true,
            subtree: true
        })
    })
})