//SERVER/ROUTES/SITEMAP.XML.GET.TS
import { getRequestURL, setResponseHeader } from 'h3'

export default defineEventHandler(async (event) => {

    const host = getRequestURL(event).host

    // به‌صورت خودکار API مناسب هر محیط را انتخاب می‌کنیم
    let apiBase = process.env.NUXT_API_BASE_URL || 'https://api.pardad-group.com'
    if (host === 'dev.pardad-group.com') apiBase = 'https://api2.pardad-group.com'
    if (host.includes('localhost')) apiBase = 'https://api2.pardad-group.com'

    const url = `${apiBase}/sitemap.xml`
    const xml = await $fetch<string>(url, { responseType: 'text' })

    // هدر صحیح XML
    setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
    return xml
})
