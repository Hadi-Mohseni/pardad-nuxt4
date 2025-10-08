<template>
  <div ref="section"
       v-show="showSection"
       class="w-full h-full grid grid-cols-12 relative">

    <div class="lg:col-span-7 col-span-12 relative lg:order-1 order-2 py-4 lg:py-0">
      <div class="lg:pr-21 lg:pt-9 flex flex-col lg:justify-between 2xl:justify-around h-full"
           ref="bodyElement">

        <!-- MAIN TITLE + SUBTITLE -->
        <div class="lg:mb-12 mb-3 flex flex-col items-center lg:items-start text-center lg:text-left"
             :class="(locale === 'en') && 'dir-ltr'">
          <div class="mb-4 lg:mb-8 flex flex-col lg:flex-row lg:gap-x-1 items-end lg:justify-start">
            <h1 class="lg:text-[46px] 2xl:text-[58px] text-[30px] font-bold leading-tight"
                :class="(locale !== 'en') && 'mb-1 md:mb-9'"
                ref="titleElement">
              {{ t('landing.home_page.main_title') }}
            </h1>
            <p class="lg:text-[17px] 2xl:text-[20px] text-[12px] text-gray-400"
               ref="secondTitleElement"
               :class="(locale !== 'en') && 'mb-0 md:mb-4'">
              {{ t('landing.home_page.sub_title') }}
            </p>
          </div>

          <!-- MAIN PARAGRAPHS -->
          <div class="lg:text-[20px] xl:text-[21px] 2xl:text-[30px] text-[18px] lg:pb-6 mb-5 lg:mb-0 space-y-2 text-right">
            <p>{{ t('landing.home_page.main_paraph.0.p') }}</p>
            <p v-if="locale === 'en'">{{ t('landing.home_page.main_paraph.1.p') }}</p>
            <p v-if="locale === 'en'">{{ t('landing.home_page.main_paraph.2.p') }}</p>
          </div>
        </div>

        <!-- FOOTER TEXT -->
        <div class="lg:mb-20 2xl:mb-0 opacity-75 font-normal lg:text-[14px] 2xl:text-[14px] text-[11px] leading-relaxed text-right"
             :class="(locale === 'en') && 'dir-ltr text-gray-400'">
          <p>{{ t('landing.home_page.footer.0.p') }}</p>
          <p>{{ t('landing.home_page.footer.1.p') }}</p>
          <p v-if="locale === 'en'">{{ t('landing.home_page.footer.2.p') }}</p>
          <p v-if="locale === 'en'">{{ t('landing.home_page.footer.3.p') }}</p>
        </div>

        <!-- VERTICAL LINE (HIDDEN ON MOBILE) -->
        <div class="absolute h-full hidden sm:block"
             :class="(locale === 'en') ? 'lg:-left-[70px]' : 'lg:-left-[150px]'">
          <div class="relative w-px h-2/5" ref="slideLine">
            <div class="absolute top-0 left-0 w-full h-full bg-[#0000001a]"></div>
            <div class="absolute top-0 left-0 w-full h-[28px] bg-[#323232] invisible"
                 ref="slideLineChild"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>