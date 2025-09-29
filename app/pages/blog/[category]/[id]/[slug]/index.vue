<template>
  <NuxtLayout name="page">

    <template #content>
      <!-- main content  -->
      <div class="px-4 lg:px-32 md:px-16 lg:pl-8 ">
        <div class="w-full lg:w-full  mb-[1.5em] text-[25px]"
             ref="bodyElement">
          <!-- Main Content -->
          <main class="w-full py-8 space-y-8 overflow-x-hidden">

            <!-- Text Content -->


            <div
                v-if="desc"
                class="text-[16px] tracking-tight lg:text-[17px] description"
                id="main"
                v-html="desc"
            ></div>


            <div class="w-full h-[1px] bg-gray-200"></div>


            <!-- FAQ Accordion -->
            <section id="faq" class="animate__animated animate__fadeInUp">
              <div class="mb-4 font-['PeydaXDemi']">
                <h3 class="lg:text-[20px] text-[16px] text-[#565656] ">سوالات متداول</h3>
                <!--                <h4 class="lg:text-[14px] text-xs text-[#878787] mt-1">بهترین برند   {{ response.contents[0].title }} در ایران؟</h4>-->
              </div>


              <LazyWrapper
                  class="animate__animated animate__fadeInUp"
                  :loader="() => import('@/components/blogs/Accordion.vue')"
                  :componentProps="{ items: response.faq }"
              />


            </section>

            <div class="w-full h-[1px] bg-gray-200"></div>

            <!-- Comments -->
            <section id="comment" class="animate__animated animate__fadeInUp">
              <div class="mb-4 font-['PeydaXDemi']">
                <h3 class="lg:text-[20px] text-[16px] text-[#565656] ">نظرات کاربران</h3>
                <h4 v-if="response && response.contents" class="lg:text-[14px] text-xs text-[#878787] mt-1">نظرات
                  کاربران درباره {{ response.contents[0].title }}</h4>
              </div>

              <LazyWrapper
                  :loader="() => import('@/components/blogs/CommentForm.vue')"
                  :componentProps="{ id:route.params.id }"
              />

              <LazyWrapper

                  :loader="() => import('@/components/blogs/CommentList.vue')"
                  :componentProps="{ comments:commentsItem}"
              />


            </section>

            <div class="w-full h-[1px] bg-gray-200"></div>

            <section class="animate__animated animate__fadeInUp">
              <div class="mb-4 font-['PeydaXDemi']">
                <h3 class="lg:text-[20px] text-[16px] text-[#565656]">مطالب مرتبط</h3>
              </div>

              <LazyWrapper
                  :loader="() => import('@/components/blogs/MoreBlog.vue')"
                  :componentProps="{ items:response.related_blogs, category:response.category}"
              />

            </section>

          </main>

        </div>
      </div>
    </template>

    <template #title>
      <div v-if="response && response.contents"
           class="fixed h-screen hidden text-[25px]  lg:flex flex-col gap-y-8 pr-4 transition-all">

        <h1 @click="goToSection('main')"
            class="transition-colors duration-300 cursor-pointer text-right tracking-tighter
        lg:tracking-normal lg:before:content-none lg:after:content-none before:content-['']
        before:left-0 before:bg-black-100/20 before:absolute before:bottom-0 before:right-0 before:h-[1px]
        after:content-[''] after:w-[8vw] after:bg-black-900 after:absolute after:bottom-0 after:right-[80px]
         after:h-[1px] lg:ml-10 xl2:ml-[300px] text-[#2F55E8]"
            ref="titleElement"
            :class="[activeSection === 'main' ? 'text-[#2F55E8]' : 'text-[#7E7E7E]']">
          <BackButton/>
          {{ response.contents[0].title }}
        </h1>

        <client-only>
          <div v-if="headings.length"
               class="flex flex-col gap-2">
          <span v-for="item in headings"
                :key="item.id"
                class="transition-all cursor-pointer text-black-50 text-lg hover:text-blue-800"
                @click="goToSection(item.id)">{{ item.text }}</span>
          </div>
        </client-only>

        <span
            class="transition-colors duration-300 cursor-pointer animate__animated animate__fadeInUp animate__delay-1s "
            :class="[activeSection === 'faq' ? 'text-[#2F55E8]' : 'text-[#7E7E7E]']"
            @click="goToSection('faq')">
            سوالات متداول
          </span>
        <span
            class="transition-colors duration-300 cursor-pointer animate__animated animate__fadeInUp animate__delay-2s"
            :class="[activeSection === 'comment' ? 'text-[#2F55E8]' : 'text-[#7E7E7E]']"
            @click="goToSection('comment')">
            بخش نظرات
          </span>
      </div>
      <div v-if="response && response.contents" class="lg:hidden flex">
        <h1 class="lg:pr-4 md:pr-20 pr-4 text-right pb-5 tracking-tighter
        lg:tracking-normal lg:pb-10 lg:before:content-none lg:after:content-none before:content-['']
        before:left-0 before:bg-black-100/20 before:absolute before:bottom-0 before:right-0 before:h-[1px]
        after:content-[''] after:w-[8vw] after:bg-black-900 after:absolute after:bottom-0 after:right-[80px]
         after:h-[1px] text-[23px] lg:text-[40px] lg:ml-10 xl2:ml-[300px]  lg:mb-0 font-medium text-black"
            ref="mobileTitle"
        >

          {{ response.contents[0].title }}
        </h1>
      </div>


    </template>

  </NuxtLayout>

</template>

<script setup>
import {useAsyncData, navigateTo} from '#app'
import LazyWrapper from '~/components/Wrapper.vue'

definePageMeta({
  dataPage: 'blog-details'
})

import {useGlobalStore} from "~/stores/global.js";
import {useContentAnimation} from "~/composables/useContentAnimation.js";
import {useRoute} from "#app";
import {parse} from 'node-html-parser'

const responseValue = ref(false)

const {getLoading, getIsLoadingPlayed} = storeToRefs(useGlobalStore())

const store = useGlobalStore()

const {
  create: createContentAnimation,
  handle: handleAnimation,
  start: startContentAnimation
} = useContentAnimation()


const headings = ref([])  // آرایه برای نگهداری h2 ها

const desc = ref('')

const {endLoading} = useGlobalStore()


const activeSection = ref('main')
const observer = ref(null)

const response = ref({})


const commentsItem = ref([])

const route = useRoute()
const section = ref()


const mobileView = ref(false)


watch(getLoading, (value) => {
  if (!value) {
    initPage()
  }
})


const bodyElement = ref(null);
const actionElements = ref(null);
const titleElement = ref(null)
const mobileTitle = ref(null)
const subtitleElement = ref(null)

const {data, error} = await useAsyncData(`blog-id-${route.params.id}`, () =>
    useApi(`/blog/${route.params.id}`, {
      params: {
        locale: 'fa',
        categorySlug: route.params.category,
        blogSlug: route.params.slug
      }
    }).catch(err => {
      // اینجا هندل کن که 404 به 500 تبدیل نشه
      if (err?.response?.status === 404) {
        return showError({statusCode: 404, statusMessage: 'صفحه یافت نشد'})
      }
      throw err
    })
)

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'صفحه مورد نظر یافت نشد.'
  })
}

// Provide refs to layout
provide('contentRefs', {
  body: bodyElement,
  actions: actionElements,
  title: titleElement,
  subtitle: subtitleElement,
  mobileTitle: mobileTitle,
})


const initPage = () => {
  // contentLoad.value = true
  store.setContentLoad(true)
  setTimeout(() => {
    setTimeout(() => {
      // showSection.value = true
      setTimeout(() => {

        // pageLine.value.update(titleElement.value.offsetTop)
        // pageHorizontalLine.value.update(-50)

      }, 5)
    }, 5)

    setTimeout(() => {
      /*createAllAnimation()
      startAllAnimation()*/
    }, 1)

  }, 10)
}

let scrollTimeout = null
const handleScroll = (e) => {
  if (titleElement.value) {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (titleElement.value.getBoundingClientRect().top < 0) {
        // pageLine.value.update(0)

      } else {
        // pageLine.value.update(titleElement.value.getBoundingClientRect().top)
      }
    }, 100);

  }
}

const initData = (data) => {
  response.value = data

  if (
      response.value &&
      response.value.contents &&
      response.value.contents.length > 0 &&
      response.value.contents[0].content
  ) {
    let htmlContent = replaceImgWithNuxtImg(response.value.contents[0].content)

    // ✅ در سرور و کلاینت یکسان
    const root = parse(htmlContent)

    const h2Elements = root.querySelectorAll('h2')
    headings.value = h2Elements.map((el, index) => {
      const id = `h2-${index}`
      el.setAttribute('id', id)
      return {text: el.text.trim(), id}
    })

    // ✅ Wrap each table inside a div.table-wrapper
    root.querySelectorAll('table').forEach((table) => {
      // create wrapper markup with the table inside
      const wrapper = parse(`<div class="table-wrapper">${table.toString()}</div>`)
      // replace table with wrapper (which now contains the table)
      table.replaceWith(wrapper)
    })

    htmlContent = root.toString()

    desc.value = htmlContent
  }
}


const replaceImgWithNuxtImg = (html) => {

  return html.replace(/<img([^>]*?)\/?>/gi, (match, attrs) => {
    // تبدیل `src` به `data-src`
    const processedAttrs = attrs.replace(
        /\bsrc\s*=\s*(['"])(.*?)\1/gi,
        (srcMatch, quote, srcValue) => `data-src=${quote}${srcValue}${quote}`
    );

    // افزودن کلاس جدید (مثلاً `lazy-image`) به کلاس‌های موجود
    const withClass = processedAttrs.replace(
        /\bclass\s*=\s*(['"])(.*?)\1/gi,
        (classMatch, quote, classValue) => `class=${quote}${classValue} lozad${quote}`
    );

    // اگر کلاس وجود نداشت، آن را اضافه کن
    const finalAttrs = withClass.includes('class=')
        ? withClass
        : `${withClass} class="lozad"`;

    return `<img ${finalAttrs.trim()} >`;
  });

}


/*const goToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = window.innerWidth < 1024 ? 60 : 20
    const top = element.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: top - offset,
      behavior: 'smooth'
    })

  }
}*/


const goToSection = (sectionId, {
  offsetDesktop = 20,
  offsetMobile = 60,
  updateHash = true,
  replace = false,   // اگر true باشد، history را replace می‌کند (برای جلو‌گیری از زیاد شدن بک)
} = {}) => {
  if (typeof window === 'undefined') return
  const el = document.getElementById(sectionId)
  if (!el) return

  const offset = window.innerWidth < 1024 ? offsetMobile : offsetDesktop
  const top = Math.max(el.getBoundingClientRect().top + window.scrollY - offset, 0)

  // احترام به reduce-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' })

  if (updateHash) {
    const currentHash = (window.location.hash || '').replace(/^#/, '')
    if (currentHash !== sectionId) {
      const url = new URL(window.location.href)
      url.hash = sectionId // خودش # را اضافه می‌کند
      if (replace) {
        history.replaceState(null, '', url)
      } else {
        history.pushState(null, '', url)
      }
    }
  }
}

const dataFetched = (value) => {
  initData(value)
  setTimeout(() => {
    endLoading()
  }, 10)


}


const {data: comments} = await useAsyncData(
    `comment-id-${route.params.id}`,
    () => useApi(`/blog/${route.params.id}/comments`, {
      query: {
        locale: 'fa'
      }
    })
)


if (data.value && data.value.success) {
  const url = route.path


  if (data.value.data.valid_url && url !== data.value.data.valid_url) {
    await navigateTo(data.value.data.valid_url, {statusCode: 301})

  }

  const res = data.value.data
  dataFetched(res)


  const content = res.contents[0]


  const faqs = res.faq.map(item => {
    return {
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }
  })
  const links = [{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}];

  if (content.props?.canonical) {
    links.unshift({
      rel: 'canonical',
      href: `https://pardad-group.com/blog/${content.props.canonical}`
    });
  }

  useHead({
    titleTemplate: '%s',
    title: ` گروه  پرداد | ${content.props.meta_title || content.title}`,

    htmlAttrs: {
      lang: content.locale || 'fa',
      dir: content.locale === 'fa' ? 'rtl' : 'ltr',
    },
    meta: [
      {
        name: 'robots',
        content: content.props?.no_index ? 'noindex, nofollow' : 'index, follow'
      },
      {name: 'description', content: content.props.meta_description || ''},
      {
        property: 'og:title',
        content: `${content.props.meta_title || content.title}`
      },
      {
        property: 'og:site_name',
        content: 'گروه پرداد'
      },
      /*{
        property: 'og:image',
        content: 'https://pardad-group.com/images/instagram-share.jpg' // تصویر مخصوص اشتراک‌گذاری
      },*/
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:url',
        content: `https://pardad-group.com${useRoute().path}` // آدرس همان صفحه در سایت شما
      },
      {
        property: 'og:locale',
        content: content.locale || 'fa_IR'
      },
      {
        name: 'author',
        content: 'گروه  پرداد' // نام نویسنده
      },

      // برای Open Graph
      {
        property: 'article:author',
        content: 'گروه پرداد'
      },
      // برای اشاره به پیج اینستاگرام از اسکیما یا لینک مستقیم استفاده کنید:
      {
        name: 'instagram:creator',
        content: '@pardadgroup' // یوزرنیم اینستاگرام
      }
    ],
    link: links,
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": content.props.meta_title || content.title,
          "description": content.props.meta_description,
          "image": res.image || '',
          "author": {
            "@type": "Person",
            "name": "گروه پرداد"
          },
          "publisher": {
            "@type": "Organization",
            "name": "گروه پرداد",
            "logo": {
              "@type": "ImageObject",
              "url": "https://pardad-group.com/_nuxt/pardad.DGx5aZAf.png"
            }
          },
          "datePublished": res.published_at,
          "dateModified": res.updated_at,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://pardad-group.com${useRoute().path}`
          }
        })
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs
        })

      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://pardad-group.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": res.category?.title, // یا دسته بندی مربوطه
              "item": `https://pardad-group.com/${res.category?.category_id}/${res.category?.title}`
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": content.props.meta_title || content.title, // عنوان مقاله/صفحه فعلی
              "item": `https://pardad-group.com${useRoute().path}` // لینک صفحه فعلی
            }
          ]
        })
      }

    ]
  })

}


if (comments.value) {


  commentsItem.value = comments.value.data
}


const checkResize = ($event) => {
  if ($event.target.innerWidth && $event.target.innerWidth < 1024) {
    mobileView.value = true
  } else {
    mobileView.value = false
  }

}

useHead({
  // as a string,
  // where `%s` is replaced with the title
  titleTemplate: '%s',
})

const scrollSpy = () => {
  const sections = ['main', 'faq', 'comment']
  const options = {
    root: null,
    rootMargin: '0px 0px -70% 0px',
    threshold: 0
  }

  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  sections.forEach(id => {
    const el = document.getElementById(id)
    if (el) observer.value.observe(el)
  })
}

onMounted(() => {
  document.querySelectorAll('a[title] > img').forEach(img => {
    const parent = img.parentElement;
    if (parent && parent.hasAttribute('title')) {
      const title = parent.getAttribute('title');
      parent.setAttribute('data-title', title);
      parent.removeAttribute('title'); // تول‌تیپ پیش‌فرض رو حذف کن
    }
  });


  scrollSpy()

  window.addEventListener('scroll', handleScroll)

  if (window.innerWidth < 1024) {
    mobileView.value = true
  }

  setTimeout(() => {
    endLoading()

  }, 100)
  setTimeout(() => {
    document.querySelectorAll('.custom-tooltip').forEach(el => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('active');
      });
    });

    // برای عناصری که بعداً اضافه می‌شوند (مهم!)
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('custom-tooltip')) {
        e.target.classList.toggle('active');
      } else {
        // بستن تولتیپ‌های باز وقتی جای دیگر کلیک می‌شود
        document.querySelectorAll('.custom-tooltip.active').forEach(el => {
          el.classList.remove('active');
        });
      }
    });
  }, 1000)


})


onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect();
  }

  /* handleAnimation("kill");*/
  window.removeEventListener('scroll', handleScroll)
})
// onBeforeRouteLeave(() => {


// showSection.value = false
// })

</script>


<style>


.description a:has(> img) {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
}

.description a:has(> img)::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 75px;
  background: rgba(0, 0, 0, 0.6);
  transition: height 0.4s ease;
  z-index: 1;
}

.description a:has(> img)::after {
  content: attr(data-title);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  padding: 10px;
  font-size: 14px;
  z-index: 2;
  box-sizing: border-box;

  /* چند خطی با ellipsis */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-height: 75px;
}

.description a:has(> img):hover::before {
  height: 100%;
}

/* ✅ اگر IMG بدون parent تگ خاصی هست (مستقیماً داخل body یا div معمولی) */
.description img:not(:where(a > img)) {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  border-radius: 10px;
}

/* ✅ اگر IMG داخل a هست → margin به تگ a داده بشه */
.description a:has(> img) {
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  border-radius: 10px;
}


/* استایل کلی متن‌ها */
.description {
  direction: rtl;
  text-align: right;
  line-height: 1.8;
  font-size: 16px;
}

.description p {
  margin: 1em 0;
}

/* تیترها */
.description h2,
.description h3 {
  margin: 1.5em 0 0.7em;
  font-weight: bold;
}

/* جدول */
.table-wrapper {
  width: 100%;
  overflow-x: auto;  /* horizontal scroll */
  -webkit-overflow-scrolling: touch; /* smooth scroll on iOS */
}

.table-wrapper table {
  min-width: 600px; /* force scroll if table is wide */
}


.description table {
  width: 100% !important; /* جدول کل عرض صفحه */
  border-collapse: collapse;
  margin: 1.5em 0;
}

.description th,
.description td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.description th {
  background-color: #f5f5f5;
  font-weight: bold;
}

/* برای اینکه div های اطراف جدول مشکل‌ساز نشن */
.description ._tableContainer_sk2ct_1,
.description ._tableWrapper_sk2ct_13 {
  width: 100% !important;
  display: block !important;
}


</style>
