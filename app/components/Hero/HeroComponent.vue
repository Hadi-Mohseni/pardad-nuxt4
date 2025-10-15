<template>
    <HeroHomePage ref="home" v-show="currentSlide === 0" />
    <HeroFirstPage ref="first" v-show="currentSlide === 1" />
    <HeroSecondPage ref="second" v-show="currentSlide === 2" />
    <HeroThirdPage ref="third" v-show="currentSlide === 3" />
    <HeroFourthPage ref="fourth" v-show="currentSlide === 4" />
    <HeroPaginate class="hidden lg:block" ref="paginate" />
</template>

<script setup>
const currentSlide = ref(null)
const paginate = ref(null)
const home = ref(null)
const first = ref(null)
const second = ref(null)
const third = ref(null)
const fourth = ref(null)
const slides = [home, first, second, third, fourth]
const { setCurrentSlide } = useGlobalStore()

const paginateHandler = (value) => {
    setTimeout(() => {
        if (paginate.value) { paginate.value.goToStep(currentSlide.value) }
    }, 5)
}

const nextSlide = () => {
    if (currentSlide.value == 4) return
    slides[currentSlide.value].value.closeAnimation()
    setTimeout(() => {
        slides[currentSlide.value + 1].value.startAnimation()
        currentSlide.value += 1
        paginateHandler(currentSlide.value)
        setCurrentSlide(currentSlide.value)
    }, 1200);
}

const prevSlide = () => {
    if (currentSlide.value == 0) return
    slides[currentSlide.value].value.closeAnimation()
    setTimeout(() => {
        slides[currentSlide.value - 1].value.startAnimation()
        currentSlide.value -= 1
        setCurrentSlide(currentSlide.value)
        paginateHandler(currentSlide.value)
    }, 1200);
}

onMounted(() => {
    setTimeout(() => {
        currentSlide.value = 0
        home.value.startAnimation()
    }, 1200);
})
defineExpose({ nextSlide, prevSlide })
</script>