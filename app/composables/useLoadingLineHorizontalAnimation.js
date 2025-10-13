export const useLoadingLineHorizontalAnimation = () => {

    const animationTimeline = ref(null)
    const line = ref(null)//
    let height = 0


    const start = (h) => {
        if(animationTimeline.value){
            height = h
            handle('play')
        }

    }
    const create = (reference, options) => {
        line.value = reference
        const tl = new TimelineLite({ paused: true })


        // نسبت سرعت کل انیمیشن (مثلاً 1 = معمولی، 2 = دو برابر سریع‌تر)
        const speed = 1  // این متغیر رو بعداً می‌تونی تغییر بدی

        // حالت اولیه
        tl.set([options.background, options.runner], {
            transformOrigin: 'right center',
            scaleX: 0
        })

        // مرحله ۱: پر شدن بک‌گراند
        tl.to(options.background, 0.7 / speed, {
            scaleX: 1,
            ease: Power3.easeOut
        })

        // مرحله ۲: بالا رفتن runner
        tl.to(options.runner, 0.7 / speed, {
            scaleX: 1,
            ease: Power2.easeInOut
        })

        // مرحله ۳: پایین رفتن runner
        tl.to(options.runner, 0.7 / speed, {
            transformOrigin: 'left center',
            scaleX: 0,
            ease: Power2.easeInOut
        })

        // مرحله ۴: خالی شدن بک‌گراند
        tl.to(options.background, 0.7 / speed, {
            scaleX: 0,
            transformOrigin: 'left center',
            ease: Power3.easeOut
        })

        animationTimeline.value = tl
        tl.pause()
    }

    const updateTimeLine = (options , val) => {

if(animationTimeline.value){
    animationTimeline.value.to(options.runner, 0.7, {
        y: val,
        ease: Power2.easeInOut
    }, "+=0");
}



    }

    const handle = (step) => {
        if (!animationTimeline.value) {
            return;
        }

        switch (step) {
            case "play":
            case "resume":
                animationTimeline.value.play();
                break;
            case "pause":
                animationTimeline.value.pause();
                break;
            case "stop":
                animationTimeline.value.pause(0);
                break;
            case "restart":
                animationTimeline.value.restart();
                break;
            case "reverse":
                animationTimeline.value.reverse();
                break;
            case "kill":
                animationTimeline.value.kill();
                animationTimeline.value = null
                break;
            default:
                console.warn(`Invalid step: ${step}`);
                break;
        }
    }
    const close = () => {
        if (!animationTimeline.value) {
            return;
        }
        handle("reverse");
    }
    const restart = () => {
        if (!animationTimeline.value) {
            return;
        }
        handle("restart");
    }
    const kill = () => {
        if (!animationTimeline.value) {
            return;
        }
        handle("kill");
    }





    let maxScroll = 0
    const updatePageLineRunner = () => {
        /*if (!titleElement.value || !pageLineRunner.value) return;

        const titleRect = titleElement.value.getBoundingClientRect();
        const runner = pageLineRunner.value;

        if (!lineTimeline.value) {
            lineTimeline.value = new TimelineLite({paused: true});
        }

        lineTimeline.value.clear(); // حذف انیمیشن‌های قبلی

        if (titleRect.top > 0 && titleRect.bottom <= window.innerHeight) {
            // هم‌تراز با مرکز تایتل
            lineTimeline.value.to(runner, {
                y: titleRect.top + titleRect.height / 2,
                ease: "none",
                duration: 0.1,
            });
        } else if (titleRect.top <= 0) {
            // ثابت در بالای صفحه
            lineTimeline.value.to(runner, {
                y: 0,
                ease: "none",
                duration: 0.1,
            });
        } else if (titleRect.bottom > window.innerHeight) {
            // هم‌تراز با پایین صفحه
            lineTimeline.value.to(runner, {
                y: window.innerHeight - titleRect.height / 2,
                ease: "none",
                duration: 0.1,
            });
        }*/


    }

    return {
        start,
        create,
        handle,
        close,
        restart,
        kill,
        updateTimeLine
    }

}