export const useLineHorizontalAnimation = () => {
    const animationTimeline = ref(null)
    const line = ref(null)
    let width = 0

    const start = (w) => {
        width = w
        handle('play')
    }

    const create = (reference, options) => {
        line.value = reference


        animationTimeline.value = new TimelineLite({paused: true})
            .from(options.background, 1, {
                scaleX: 0,
                transformOrigin: "right center", // تغییر مبدأ transform به چپ
                ease: Power2.easeInOut,
            }, 0)
            .fromTo(options.runner, 1, {
                scaleX: 2,
                xPercent: 200, // تغییر از -200 به 200 (شروع از راست)
                visibility: 'inherit',
                transformOrigin: "right center"
            }, {
                x: 0, // تغییر به 0 (پایان در چپ)
                scaleX: 1,
                xPercent: 0,
                transformOrigin: "right center", // تغییر مبدأ transform به چپ
                data: {clear: false},
                ease: Power2.easeInOut,
            }, 0.3);

        animationTimeline.value.pause();
    }

    const updateTimeLine = (options, val) => {
        if(animationTimeline.value){
            animationTimeline.value.to(options.runner, 0.7, {
                x: val, // حرکت از چپ به راست (مقدار val باید از ۰ به عرض عنصر هدف افزایش یابد)
                ease: Power2.easeInOut
            }, "+=0");
        }

    }

    const handle = (step) => {
        if (!animationTimeline.value) return;

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
                animationTimeline.value = null;
                break;
            default:
                console.warn(`Invalid step: ${step}`);
                break;
        }
    }

    const close = () =>{
        if (!animationTimeline.value) return;
        handle("reverse");
    }
    const restart = () =>{
        if (!animationTimeline.value) return;
        handle("restart");
    }
    const kill = () =>{
        if (!animationTimeline.value) return;
        handle("kill");
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