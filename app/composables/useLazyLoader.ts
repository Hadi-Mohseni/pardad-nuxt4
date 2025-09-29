export const useLazyLoad = () => {
    const visibilityMap = ref<Record<string, boolean>>({});

    const lazyLoadOptions = (id: string) => ({
        callback: () => { visibilityMap.value[id] = true },
        options: { threshold: 0.05 }
    });

    const isVisible = (id: string) => visibilityMap.value[id] || false;

    return { lazyLoadOptions, isVisible };
};