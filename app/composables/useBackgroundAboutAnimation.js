



export const useBackgroundAboutAnimation = () => {

    const animationTimeline = ref(null)
    const background = ref(null)//






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
    const create = (reference ) => {

        background.value = reference

        animationTimeline.value = new TimelineLite({paused: true})
            .set(background.value, {
                visibility: "inherit",
                x: 1000
            }, 0).from(background.value, 2, {opacity: 0}, 0)
            .to(background.value, 1.5, {
                x: 0,
                ease: Power2.easeOut,
            }, 0)


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

    /*onBeforeUnmount(() => {
        kill()
    })
    onBeforeRouteLeave(() => {
        close()
    })*/


    return {
        start,
        create,
        handle,
        close,
        restart,
        kill
    }

}