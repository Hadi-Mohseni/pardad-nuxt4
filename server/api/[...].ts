//SERVER/API/[...]

import { joinURL } from "ufo";



export default defineEventHandler(async (event) => {
    const proxyUrl = useRuntimeConfig().public.apiUrl;
    const path = event.path.replace(/^\/api\//, '');
    const target = joinURL(proxyUrl, path);

    try {
        const response = await $fetch(target, {
            method: event.method,
            headers: { ...event.headers }, // انتقال هدرهای اصلی
        });
        return response;
    } catch (error) {
        throw createError({
            statusCode: 500,
            message: "Proxy request failed",
        });
    }
});