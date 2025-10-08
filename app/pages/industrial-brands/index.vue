<template>
  <NuxtLayout name="page">
    <template #content>
      <div class="w-full h-full mt-10 lg:mt-0  md:pt-0 -pt-[100px] ">
        <section>
          <ul
              ref="bodyElement"
              class="grid w-full pb-[7vw] gap-y-6 grid-cols-2  lg:grid-cols-3"
          >
            <li
                v-for="(brand, index) in brands"
                :key="brand.id"
                :data-id="brand.id"
                :id="brand.slug"
                class="brand-item group w-full h-[300px] relative flex justify-center items-center flex-shrink-0"

            >


              <img
                  class="backface-hidden w-[80%] max-w-[150px] max-h-[150px]"
                  :src="brand.image"
                  :alt="brand.name"
              />
              <div class="brand-details w-full absolute left-0 bottom-0 block text-center dir-ltr tracking-[0.26em] opacity-0 group-hover:opacity-100
                          transition-opacity duration-300">

                <div
                    class="w-full flex flex-col gap-1 mx-3 text-left text-[10px] sm:text-[calc(0.3vw+5.2px)] uppercase text-[#000]">

                  <span class="font-bold">{{ brand.name }}</span>
                  <span @click="downloadFile(brand.action)"
                        class="text-body-80 cursor-pointer">DOWNLOAD CATALOUGE</span>
                </div>

                <div
                    class="w-[50px] after:content-[''] after:absolute after:-bottom-1 after:left-0
                    after:block after:w-full after:h-px after:bg-black
                    after:scale-x-0 after:transition-transform after:duration-300
                    group-hover:after:scale-x-100 z-[2] relative inline-block
                    "
                ></div>

              </div>
              <div
                  class="absolute inset-0 border border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:border-[#6391A9]"
                  :class="(index + 1) % 3 === 0 && 'border-l-0'"
              ></div>
            </li>
          </ul>

          <div ref="infiniteScrollTrigger" class="h-64 w-full "></div>

          <!-- اسکلتون یا لودینگ (اختیاری) -->
          <div v-if="isLoading" class="flex justify-center py-16">
            در حال بارگذاری...
          </div>
        </section>
      </div>
    </template>

    <template #title>
      <div class="px-4 md:px-0 fixed h-screen hidden text-[30px] lg:flex flex-col gap-y-8 pr-4 transition-all">
        <h1
            ref="titleElement"
            class="lg:pr-4 md:pr-20 pr-4 text-right lg:before:content-none lg:after:content-none before:content-[''] before:left-0 before:bg-black-100/20 before:absolute before:bottom-0 before:right-0 before:h-[1px] after:content-[''] after:w-[8vw] after:bg-black-900 after:absolute after:bottom-0 after:right-[80px] after:h-[1px] text-[40px] lg:ml-10 xl2:ml-[300px] mb-10 lg:mb-0 font-light"
        >
          {{ t('menuItems.industrialBrands') }}
          <BackButton/>
        </h1>
      </div>
      <div class="lg:hidden flex">
        <h1 class="lg:pr-4 md:pr-20 pr-4 text-right pb-5 tracking-tighter
        lg:tracking-normal lg:pb-10 lg:before:content-none lg:after:content-none before:content-['']
        before:left-0 before:bg-black-100/20 before:absolute before:bottom-0 before:right-0 before:h-[1px]
        after:content-[''] after:w-[8vw] after:bg-black-900 after:absolute after:bottom-0 after:right-[80px]
         after:h-[1px] text-[23px] lg:text-[40px] lg:ml-10 xl2:ml-[300px]  lg:mb-0 font-medium text-black"
            ref="mobileTitle"
        >
          {{ t('menuItems.industrialBrands') }}
        </h1>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup>
definePageMeta({
  dataPage: 'industrial-brands',
})

import {useGlobalStore} from '~/stores/global.js'
import {useContentAnimation} from '~/composables/useContentAnimation.js'
import {useInfiniteData} from '~/composables/useInfiniteData.js'
import {makeSlug} from '~/utils/index.js'

const {t} = useI18n()
const availableImages = [
  '/logo/0.png',
  '/logo/1.png',
  '/logo/2.png',
  '/logo/3.png',
  '/logo/4.png',
];

const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  return availableImages[randomIndex];
};

/*import img_0 from '@/assets/img/logo/0.png'
import img_1 from '@/assets/img/logo/1.png'
import img_2 from '@/assets/img/logo/2.png'
import img_3 from '@/assets/img/logo/3.png'*/

const {animateNewItems} = useContentAnimation()
const store = useGlobalStore()
const {endLoading} = store
const {getLoading, getIsLoadingPlayed} = storeToRefs(useGlobalStore())


/*watch(getLoading, (value) => {
  if (!value) {
    initPage()
  }
})*/

// refs
const bodyElement = ref(null)
const titleElement = ref(null)

// Provide layout refs for animation
provide('contentRefs', {
  body: bodyElement,
  actions: null,
  title: titleElement,
  subtitle: null,
  hasScroll: false,
})
const paginateInfo = ref({
  total: 1,
  per_page: 1,
  current_page: 1,
  last_page: 1
})
const page = ref(1)
const per_page = ref(12)
const isLoading = ref(false)
const observer = ref(null)
const infiniteScrollTrigger = ref(null)
const brands = ref([])
const route = useRoute()

// تغییر رنگ تم


// متای سئو
useSeoMeta({
  title: 'برندهای صنعتی',
  description: 'برندهای صنعتی',
  keywords: 'برندهای صنعتی',
})

// واکنش به تغییرات هش در URL
watch(() => route.hash, (newHash, oldHash) => {
  highlightBrandFromHash();
});

const animationTimeline = ref(null)


const anim = (items) => {
  animationTimeline.value = new TimelineLite();
  animationTimeline.value.set(items, {opacity: 0, y: 50});

  items.forEach((item, index) => {
    animationTimeline.value.to(item, 0.4, {
      y: 0,
      opacity: 1,
      ease: Power3.easeOut,
      delay: 0.01 // تأخیر بین آیتم‌ها
    });
  });
  // مخفی کردن آیتم‌های جدید قبل از انیمیشن

}

// تابع برای هایلایت برند بر اساس هش
const highlightBrandFromHash = async (scroll = true) => {
  const hash = window.location.hash?.replace('#', '');
  if (!hash) return;

  await nextTick();

  // remove any previous highlights
  document.querySelectorAll('.highlight-brand').forEach(el => {
    el.classList.remove('highlight-brand', 'force-hover');
  });

  const el = document.getElementById(hash);
  if (el) {
    // force the "hover" visual state permanently
    el.classList.add('highlight-brand', 'force-hover');

    // scroll into view (optional)
    if (scroll) {
      el.scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    setTimeout(() => {
      el.classList.remove('highlight-brand', 'force-hover');
    }, 5000);

  } else {
    console.warn(`⚠️ No brand found with id="${hash}"`);
  }
};

const config = useRuntimeConfig()


async function getData() {

  isLoading.value = true;
  try {
    const data = await $fetch(`${config.public.apiUrl}/brands`, {
      query: {
        page: page.value,
        per_page: per_page.value
      }
    })


    const ln = data.data.length

    // ✅ اینجا اسلاگ ساخته میشه
    const processedData = data.data.map((b) => ({
      ...b,
      slug: makeSlug(b.name),
    }));
    brands.value = [...brands.value, ...processedData];

    const currentLength = brands.value.length;
    paginateInfo.value.total = data.total
    paginateInfo.value.page = data.current_page
    paginateInfo.value.last_page = data.last_page
    paginateInfo.value.per_page = data.per_page
    page.value = data.current_page

    if (page.value > 1) {
      await nextTick();
      const allItems = bodyElement.value?.children || [];
      const newItems = Array.from(allItems).slice(currentLength - ln);
      anim(newItems);
    }


  } catch (error) {
    console.error("Error loading more items:", error);
  } finally {
    isLoading.value = false;

    // پس از لود داده‌ها، بررسی کنید آیا باید برندی را هایلایت کنید
    await nextTick();
    highlightBrandFromHash();
  }
}

// useHead({
//     titleTemplate: '%s - برندهای صنعتی',
//     meta: [{ name: 'robots', content: 'noindex, nofollow' }],
//   script: [
//     {
//       id: 'org-schema',
//       type: 'application/ld+json',
//
//       innerHTML: JSON.stringify({
//         "@context": "https://schema.org",
//         "@type": "ItemList",
//
//         itemListElement: brands.value.map((brand, index) => ({
//           "@type": "ListItem",
//           position: index + 1,
//           item: {
//             "@type": "Brand",
//             name: brand.name,
//             url: `https://pardad-group.com/industrial-brands#${brand.slug}`,
//             logo: brand.image,
//             description: `دانلود کاتالوگ برند ${brand.name}`,
//           },
//         })),
//
//
//       })
//     }
//   ],
//   __dangerouslyDisableSanitizersByTagID: {
//     'org-schema': ['innerHTML'],
//     'website-schema': ['innerHTML']
//   }
// })

watch(
    brands,
    (newBrands) => {
      useHead({
        titleTemplate: '%s - برندهای صنعتی',
        meta: [],
        script: [
          {
            id: 'org-schema',
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: newBrands.map((brand, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Brand",
                  name: brand.name,
                  url: `https://pardad-group.com/industrial-brands#${brand.slug}`,
                  logo: brand.image,
                  description: `دانلود کاتالوگ برند ${brand.name}`,
                },
              })),
            }),
          },
        ],
        __dangerouslyDisableSanitizersByTagID: {
          'org-schema': ['innerHTML'],
        },
      });
    },
    {immediate: true}
);


const setupInfiniteScroll = () => {
  observer.value = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting && !isLoading.value && paginateInfo.value.current_page <= paginateInfo.value.last_page) {
      loadNextPage();
    }
  });

  if (infiniteScrollTrigger.value) {
    observer.value.observe(infiniteScrollTrigger.value);
  }
}
const loadNextPage = async () => {
  if (isLoading.value || page >= paginateInfo.value.last_page) return;
  isLoading.value = true;
  page.value += 1;
  await getData();
}


// استفاده از composable برای infinite scroll
/*const {
  items: brands,
  isLoading,
  hasMore,
  loadInitial,

  startInfiniteScroll,
} = useInfiniteData({
  endpoint: '/api/brands',
  perPage: 9,
  displayCount: 3,
  target: bodyElement,
  animateCallback: animateNewItems,
})*/

const downloadFile = (url) => {
  try {
    // ✅ Validate that it's a proper URL
    new URL(url);

    // ✅ Check if it looks like a file (has an extension)
    const fileName = url.split('/').pop();
    if (!fileName.includes('.') || fileName.endsWith('.')) {
      console.error("Not a valid file URL");
      return;
    }

    // ✅ Create temporary link and download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // will use the filename from the URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (e) {
    console.error("Invalid URL", e);
  }
};

/*const initPage = async ()=>{
  if(import.meta.client){
    await nextTick();
    highlightBrandFromHash();
  }
}*/


onMounted(async () => {
  await getData();
  setupInfiniteScroll();

  await nextTick();

  // Run highlight after data and DOM are ready
  highlightBrandFromHash();

  setTimeout(() => endLoading(), 100);
});

</script>

<style>
.brand-item.force-hover .brand-details {
  opacity: 1 !important;
}

.brand-item.force-hover .absolute.inset-0 {
  opacity: 1 !important;
  border-color: #6391A9 !important;
}


.highlight-brand {
  transition: all 0.3s ease-in-out;
}

/* استایل برای اسکلتون یا لودینگ */
.skeleton-loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>