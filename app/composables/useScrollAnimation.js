



export const useScrollAnimation = () => {

    const animationTimeline = ref(null)
    let isReversed = false; // برای بررسی وضعیت ریورس
    let isRestarted = false;
    let isFirstScroll = true//
    const scroll = ref(null)//






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

    const start = () => {
        if (!animationTimeline.value) {
            return;
        }
        handle('play')
    }
    const create = (reference ,options ) => {
        scroll.value = reference
        animationTimeline.value = new TimelineLite()
            .from(options.lines, 0.9, {
                scaleY: 0,
                transformOrigin: "left bottom", // مبدا تغییر به پایین برای رشد از بالا
                ease: Power4.easeOut,
            }, 0)
            .to(options.child, 0.9, {
                scaleY: 0.1, // کاهش به 10% ارتفاع
                transformOrigin: "left top", // مبدا تغییر به بالا برای جمع شدن از بالا
                ease: Power4.easeOut,
            }, 0.9)
            .from(options.background, 0.4, {opacity: 0}, 0.4)
            .from(options.label, 0.9, {
                xPercent: -100,
                ease: Power4.easeOut,
            }, 1)
            .from(options.inner, 0.9, {
                xPercent: 100,
                ease: Power4.easeOut,
            }, 1);


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


    const onBelowViewport = () => {
        if (!animationTimeline.value) {
            return;
        }

        if (!isReversed) {
            animationTimeline.value.timeScale(2);
            handle("reverse");

            isReversed = true;
            isRestarted = false;
            if (isFirstScroll) {
                isFirstScroll = false;
            }// برای اجازه به ریستارت مجدد
        }
    };

    const onAboveViewport = () => {
        if (!animationTimeline.value) {
            return;
        }
        if (isFirstScroll) {


            return;
        }
        if (!isRestarted) {
            animationTimeline.value.timeScale(1.5);
            handle("restart");

            isRestarted = true;
            isReversed = false; // برای اجازه به ریورس مجدد
        }

    };


    const checkElementPosition = () => {
        if (!animationTimeline.value) {
            return;
        }

        if (scroll.value) {
            const viewportHeight = window.innerHeight;
            const rect = scroll.value.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;

            if (elementCenter > viewportHeight / 2) {
                onAboveViewport();
            } else {
                onBelowViewport();
            }

        }
        /*updatePageLineRunner()*/

    };






    return {
        start,
        create,
        handle,
        close,
        restart,
        kill
    }

}