<template>
  <nav class="nav">
    <canvas class="nav__background" style="display: none!important;"></canvas>
    <div class="nav__items-wrapper">
      <ul class="nav__items">

        <li class="nav__item ">
          <nuxt-link class="nav__item__link transition-all"
                     to="category"
                     :class="(route.name=== 'category')  ? 'text-white-100' : 'text-white-100/50 hover:text-white-100'">وبلاگ پرداد
          </nuxt-link>
        </li>
        <li class="nav__item " data-page="about">
          <nuxt-link class="nav__item__link transition-all"
                     to="about"
                     :class="(route.name=== 'about')  ? 'text-white-100' : 'text-white-100/50 hover:text-white-100'">درباره گروه پرداد
          </nuxt-link>
        </li>
        <li class="nav__item " data-page="contact">
          <nuxt-link class="nav__item__link transition-all"
                     to="contact"
                     :class="(route.name=== 'contact')  ? 'text-white-100' : 'text-white-100/50 hover:text-white-100'">
            تماس با ما
          </nuxt-link>
        </li>
      </ul>
      <div class="nav__item-line">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="nav__footer justify-end">
      <div class="nav__footer__left text-left">

        <nuxt-link class="nav__home text-cta transition-all"
                   to="index">
               <span
                   :class="(route?.name ==='index') ? 'text-white-100 border-b border-white-100/70' : 'text-white-100/70 hover:text-white-100 hover:border-b hover:border-white-100/70'">
            خانه
          </span>
        </nuxt-link>
        <ul class="nav__footer__links mt-4" style="direction: ltr;">

          <li class="nav__footer__link">All Rights Reserved</li>
          <li class="nav__footer__link nav__credits">
            Presented By Hox!
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute()

</script>

<style></style>