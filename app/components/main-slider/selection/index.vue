<template>
  <div
       class=" h-full flex  gap-y-5  text-white-100">
    <div :class="sliderItemBtn.id === selectedId ? 'text-white-100' : ''"
         class="flex lg:justify-end w-full justify-start"
         ref="leftBtn"
         dir="ltr"
         v-for="(sliderItemBtn , index) in items"
         :key="sliderItemBtn.id"

         @click="selectListItem(sliderItemBtn , (index + 1) , activeIndex)">
      <div class="flex flex-col justify-start lg:justify-end w-full pr-4 cursor-pointer pb-2"
           :class="[sliderItemBtn.id === selectedId? 'text-white-100' : 'text-white-30']">
        <div class="flex items-center gap-x-1">
          <span>
            {{ sliderItemBtn.title}}

        </span>
        </div>






        <template v-if="sliderItemBtn.id === requestedId">

          <div v-if="loading" class="ml-4 mt-2 text-right flex justify-end">
            <svg class="fill-white-70 " width="24" height="24" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="6" width="2.8" height="12">
                <animate id="spinner_CcmT" begin="0;spinner_IzZB.end-0.1s" attributeName="y" calcMode="spline"
                         dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                <animate begin="0;spinner_IzZB.end-0.1s" attributeName="height" calcMode="spline" dur="0.6s"
                         values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
              </rect>
              <rect x="5.8" y="6" width="2.8" height="12">
                <animate begin="spinner_CcmT.begin+0.1s" attributeName="y" calcMode="spline" dur="0.6s"
                         values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                <animate begin="spinner_CcmT.begin+0.1s" attributeName="height" calcMode="spline" dur="0.6s"
                         values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
              </rect>
              <rect x="10.6" y="6" width="2.8" height="12">
                <animate begin="spinner_CcmT.begin+0.2s" attributeName="y" calcMode="spline" dur="0.6s"
                         values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                <animate begin="spinner_CcmT.begin+0.2s" attributeName="height" calcMode="spline" dur="0.6s"
                         values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
              </rect>
              <rect x="15.4" y="6" width="2.8" height="12">
                <animate begin="spinner_CcmT.begin+0.3s" attributeName="y" calcMode="spline" dur="0.6s"
                         values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                <animate begin="spinner_CcmT.begin+0.3s" attributeName="height" calcMode="spline" dur="0.6s"
                         values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
              </rect>
              <rect x="20.2" y="6" width="2.8" height="12">
                <animate id="spinner_IzZB" begin="spinner_CcmT.begin+0.4s" attributeName="y" calcMode="spline"
                         dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
                <animate begin="spinner_CcmT.begin+0.4s" attributeName="height" calcMode="spline" dur="0.6s"
                         values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98"/>
              </rect>
            </svg>
          </div>
          <div v-else ref="subListRef" class="mt-4" >
            <div class="flex flex-col text-sm pl-2 text-gray-100 cursor-pointer animate__animated fadeInDown"
                 v-for="(item,index) in subItems" :key="index">

              <nuxt-link class="py-2 pl-4" :to="`/${routeName}/${item.id}/${item.url.length > 0 ? item.url.replaceAll(' ' ,'-') : item.title.replaceAll(' ' ,'-')}`">
                {{ item.title }}
              </nuxt-link>
            </div>

          </div>
        </template>

      </div>
    </div>
  </div>

</template>

<script setup>




const props = defineProps({
  items: {
    type: Array,
    default: []
  },
  subItems: {
    type: Array,
    default: []
  },
  loading: {
    type: Boolean,
    default: false
  },
  selected:{
    type: Number,
    default: 0
  },
  request:{
    type: Number,
    default: 0
  },
  routeName: {
    type: String,
    default: 'category'
  },
})


const selectedId = computed(()=>props.selected)
const activeIndex = computed(()=> props.items.findIndex(item=>item.id === props.selected ) + 1)
const requestedId = computed(()=>props.request)


const emit = defineEmits(['click-list'])



const selectListItem = (item ,index , lastActive) => {
  emit("click-list" , item.id , index , lastActive)
}


</script>


