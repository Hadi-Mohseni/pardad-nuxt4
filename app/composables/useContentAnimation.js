
export const useContentAnimation = () => {
    const animationTimeline = ref(null)
    const content = ref(null)
    const delay = 0.07;
    let bodyChildren = []
    let actions = []

    // اضافه کردن تابع جدید برای انیمیشن آیتم‌های خاص
    const animateNewItems = (items) => {
        if (!items || items.length === 0) return;
        animationTimeline.value.set(items, { opacity: 0, y: 50 });

        items.forEach((item, index) => {
            animationTimeline.value.to(item, 0.3, {
                y: 0,
                opacity: 1,
                ease: Power3.easeOut,
                delay:  0.02 // تأخیر بین آیتم‌ها
            });
        });
        // انیمیشن ورود برای آیتم‌های جدید

    };

    const start = () => {
        if (!animationTimeline.value) return;
        handle('play')
    }

    const create = (reference, options) => {
        content.value = reference
        animationTimeline.value = new TimelineLite();

        if(options.body){
            bodyChildren = Array.from(options.body.children || []);
        }

        if(options.actions){
            actions = Array.from(options.actions.children || []);
        }

        bodyChildren.forEach((child) => {
            animationTimeline.value.set(child, {opacity: 0.2, y: 80});
        });
        if(bodyChildren.length > 0){
            animationTimeline.value.staggerFrom(
                bodyChildren,
                0.7,
                {y: 80, opacity: 0.2, ease: Power3.easeOut}
            );
        }

        if (options.title) {
            animationTimeline.value.from(
                options.title,
                1,
                {y: 80, opacity: 0, ease: Power3.easeOut},
                0.5
            );
        }

        if (options.subtitle) {
            animationTimeline.value.from(
                options.subtitle,
                1,
                {y: 120, opacity: 0, ease: Power3.easeOut},
                0.4
            );
        }



        if(actions.length > 0){
            animationTimeline.value.staggerFrom(
                actions,
                1,
                {y: 80, opacity: 0, ease: Power3.easeOut},
                delay
            );
        }

        return animationTimeline.value;
    }

    // بقیه توابع بدون تغییر
    const handle = (step) => { /* ... */ }
    const close = () => { /* ... */ }
    const restart = () => { /* ... */ }
    const kill = () => { /* ... */ }

    return {
        start,
        create,
        handle,
        close,
        restart,
        kill,
        animateNewItems // اضافه کردن تابع جدید به خروجی
    }
}