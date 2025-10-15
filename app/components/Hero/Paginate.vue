<template>
    <div class="home__pagination" dir="ltr" ref="element" v-show="showPagination">
        <div class="home__pagination__bar" ref="barElement">
            <div class="home__pagination__bar__background"></div>
            <div class="home__pagination__bar__hover"></div>
            <div class="home__pagination__bar__progress" ref="progressElement"></div>
        </div>
        <div class="home__pagination__text" ref="textElement">
            <div class="home__pagination__text__inner">
                <span class="home__pagination__text__current font-bold font-['Archia'] " ref="textCurrentElement">0 {{ currentIndex }}</span>
                <span class="home__pagination__text__separator mx-2 "></span>
                <span class="home__pagination__text__total font-bold font-['Archia']">0 {{ total }}</span>
            </div>
        </div>
        <ol class="home__pagination__items">
            <template v-for="i in total + 1" :key="i">
                <li class="home__pagination__item" :style="{
                    visibility: (i - 1) !== currentIndex ? 'visible' : 'hidden',
                }"></li>
            </template>

        </ol>
    </div>
</template>

<script setup>
const element = ref(null)
const textElement = ref(null);
const textCurrentElement = ref(null);
const barElement = ref(null);
const progressElement = ref(null);

const currentIndex = ref(1);
const total = ref(4);
const showPagination = ref(false);
let isVisible = false;
let timeline = null;
const isFirstOnceAnimatePaginate = ref(true)

const animateIn = () => {

    const progress = currentIndex.value / total.value;
    disposeTimeline();
    timeline = new TimelineLite()
        .from(barElement.value, 0.9, { scaleY: 0, yPercent: 100, ease: Power3.easeInOut }, 0)
        .fromTo(progressElement.value, 0.9, { scaleY: 0, yPercent: 100 }, {
            scaleY: 1,
            yPercent: 0,
            ease: Power3.easeInOut
        }, "-=.4")
        .to(progressElement.value, 0.8, { scaleY: progress, ease: Power3.easeInOut })
        .addLabel("text", "-=.8")
        .fromTo(textElement.value, 1, { yPercent: 50 }, { yPercent: 100 * progress, ease: Power3.easeInOut }, "text")
        .fromTo(textElement.value, 1, { opacity: 0 }, { opacity: 1, ease: Power3.easeInOut }, "text");
};

const animateOut = () => {
    timeline = new TimelineLite()
        .to(textElement.value, 0.5, { opacity: 0, yPercent: 50, ease: Power3.easeInOut }, 0)
        .to(progressElement.value, 0.5, { scaleY: 0, yPercent: 100, ease: Power3.easeInOut }, 0)
        .to(barElement.value, 0.9, { scaleY: 0, yPercent: 100, ease: Power3.easeInOut }, "-=.3");
};

const setCurrentIndex = (index) => {
    if (currentIndex.value !== index) {

        currentIndex.value = index;


        const progress = currentIndex.value / total.value;
        if (!timeline) {

            timeline = new TimelineLite()
                .to(progressElement.value, 0.7, { scaleY: progress, ease: Power3.easeInOut })
                .to(textElement.value, 0.7, { yPercent: 100 * progress, ease: Power3.easeInOut }, "-=0.7");
        } else {
            timeline
                .to(progressElement.value, 0.7, { scaleY: progress, ease: Power3.easeInOut })
                .to(textElement.value, 0.7, { yPercent: 100 * progress, ease: Power3.easeInOut }, "-=0.7");
        }

        textCurrentElement.value.textContent = "0" + index;
    }
};

const goToStep = (step) => {

    if (step >= 1 && step <= total.value) {
        if (!showPagination.value) {
            showPagination.value = true
        }
        if (isFirstOnceAnimatePaginate.value) {

            animateIn()
            isFirstOnceAnimatePaginate.value = false
        } else {
            setCurrentIndex(step);
        }

    } else {
        showPagination.value = false
        isFirstOnceAnimatePaginate.value = true
    }
};

const disposeTimeline = () => {
    if (timeline) {
        timeline.kill();
        timeline = null;
    }
};

defineExpose({
    goToStep
})
</script>

<style scoped></style>