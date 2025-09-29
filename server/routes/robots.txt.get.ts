//SERVER/ROUTES/ROBOTS.TXT.GET.TS

import { getRequestURL, setResponseHeader } from 'h3'


export default defineEventHandler((event) => {
    const { host, protocol } = getRequestURL(event)

    // Production اجازه‌ی کامل؛ Staging/Local بلاک کامل
    const isProd = host === 'pardad-group.com' || host === 'www.pardad-group.com'

    const prodRobots = [
        'User-agent: *',
        'Disallow: /admin/',
        'Disallow: /login/',
        'Disallow: /dashboard/',
        'Disallow: /user/',
        'Disallow: /search',
        'Disallow: /tamp/',
        'Disallow: /test/',
        'Disallow: /assets/',
        'Disallow: /api/',
        'Allow: /',
        '',
        `Sitemap: ${protocol}//${isProd ? 'pardad-group.com' : host}/sitemap.xml`
    ].join('\n')

    const blockAll = [
        'User-agent: *',
        'Disallow: /admin/',
        'Disallow: /login/',
        'Disallow: /dashboard/',
        'Disallow: /user/',
        'Disallow: /search',
        'Disallow: /tamp/',
        'Disallow: /test/',
        'Disallow: /assets/',
        'Disallow: /api/',
        'Allow: /',
        '',
        `Sitemap: ${protocol}//${host}/sitemap.xml`
    ].join('\n')

    setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    return isProd ? prodRobots : blockAll
})
