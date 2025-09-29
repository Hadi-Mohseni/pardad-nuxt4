// use pinia technology as a state management
import {defineStore} from "pinia";

export const useCategoryStore = defineStore('category', {
    state: () => {
        return {

            themeObj: 'black',
            showLoading: true,
            loading: true,
            isLoadingPlayed: false,
            showLogo: false,
            showContact: true,
            showHeader: false,
            currentSlide: 0,
            menuStatus: 'CLOSE',
            isStart: false,
            isEnd: false,
            contentLoad: false,
            locale: 'fa',
            category: {},
            subCategory: {},
            layout:{
                title:'دسته بندی محصولات',
                description:'توضیحات محصولات'
            }
        }
    },
    actions: {
        setActiveCategory(value) {
            this.category = value
        },
        setActiveSubCategory(value) {
            this.subCategory = value
        },



    },
    getters: {

        getActiveCategory: (state) => state.category,
        getActiveSubCategory: (state) => state.subCategory,

    },
})
