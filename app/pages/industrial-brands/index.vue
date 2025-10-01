<template>
  <NuxtLayout name="page">
    <template #content>
      <div class="w-full h-full mt-10 lg:mt-0 px-4 md:pt-0 -pt-[100px] md:px-0">
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
                class="brand-item group w-full h-[300px] relative flex justify-center items-center flex-shrink-0 "

            >
              <div @click="downloadFile(brand.action)"
                   class="absolute left-2 top-2
                          after:scale-x-0 after:transition-transform after:duration-300
                          group-hover:after:scale-x-100 z-[2] inline-block opacity-0 group-hover:opacity-100
                          transition-opacity duration-300 cursor-pointer">
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="#1C274C" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 17H12H8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
                  <path
                      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                      stroke="#1C274C" stroke-width="1.5"/>
                </svg>
              </div>


              <img
                  class="backface-hidden w-[80%] max-w-[150px] max-h-[150px]"
                  :src="brand.image"
                  :alt="brand.name"
              />
              <div class="absolute left-0 bottom-0 block w-full text-center">
                <div
                    class="after:content-[''] after:absolute after:bottom-0 after:left-0
                    after:block after:w-full after:h-px after:bg-black
                    after:scale-x-0 after:transition-transform after:duration-300
                    group-hover:after:scale-x-100 z-[2] relative inline-block mt-4 tracking-[0.26em] opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 text-[10px]  sm:text-[calc(0.3vw+5.2px)] font-['ArchiaBold']  uppercase text-[#000] sm:py-[2vw] py-[5vw]"
                >
                  {{ brand.name }}
                  <span
                      class="absolute bottom-0 left-0 block w-full h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  ></span>
                </div>
              </div>
              <div
                  class="absolute inset-0 border border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:border-gray-200"
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
      <div class="fixed h-screen hidden text-[30px] lg:flex flex-col gap-y-8 pr-4 transition-all">
        <h1
            ref="titleElement"
            class="lg:pr-4 md:pr-20 pr-4 text-right lg:before:content-none lg:after:content-none before:content-[''] before:left-0 before:bg-black-100/20 before:absolute before:bottom-0 before:right-0 before:h-[1px] after:content-[''] after:w-[8vw] after:bg-black-900 after:absolute after:bottom-0 after:right-[80px] after:h-[1px] text-[40px] lg:ml-10 xl2:ml-[300px] mb-10 lg:mb-0 font-light"
        >
          <BackButton/>
          برندهای صنعتی
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
          برندهای صنعتی
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
const highlightBrandFromHash = () => {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    // Remove old highlights
    document.querySelectorAll('.highlight-brand').forEach(el => {
      el.classList.remove('highlight-brand', 'force-hover');
    });

    const el = document.getElementById(hash);
    if (el) {
      el.classList.add('highlight-brand', 'force-hover');
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Remove after 5s
      setTimeout(() => {
        el.classList.remove('highlight-brand', 'force-hover');
      }, 5000);
    }
  }
};



async function getData() {
  const config = useRuntimeConfig()
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
        meta: [{name: 'robots', content: 'noindex, nofollow'}],
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


onMounted(async () => {
  await getData();
  setupInfiniteScroll();
  setTimeout(() => endLoading(), 100);
})
</script>

<style>
/* Apply hover state when .force-hover is present */
.brand-item.force-hover .absolute.left-2.top-2,
.brand-item.force-hover .absolute.left-0.bottom-0 .relative,
.brand-item.force-hover .absolute.inset-0 {
  opacity: 1 !important;
}

.brand-item.force-hover .absolute.left-0.bottom-0 .relative:after,
.brand-item.force-hover .absolute.left-0.bottom-0 span {
  transform: scaleX(1) !important;
}

.highlight-brand {
  border: 3px solid #007bff !important;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.5);
  transition: all 0.3s ease-in-out;
  transform: scale(1.02);
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