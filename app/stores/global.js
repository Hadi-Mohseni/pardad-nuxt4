// use pinia technology as a state management
import {defineStore} from "pinia";

export const useGlobalStore = defineStore('global', {
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
            layout:{
                title:'دسته بندی محصولات',
                description:'توضیحات محصولات'
            }
        }
    },
    actions: {
        setLocale(value) {
            this.locale = value
        },
        setLayoutData(value) {
            this.layout.title = value.title
            this.layout.description = value.description
        },
        setThemeObj(value) {

            this.themeObj = value
        },
        showLoadingAction(bool) {
            this.showLoading = bool
        },
        setMainLoading(bool) {
            this.loading = bool
            if (!bool) {
                this.isLoadingPlayed = true
            }
        },
        setCurrentSlide(value) {
            this.currentSlide = value

        },
        setShowLogo(bool) {
            this.showLogo = bool

        },
        setContactNav(bool) {
            this.showContact = bool
        },
        setMenuHandler(type) {


            this.menuStatus = type
        },
        startLoading(type) {
            this.isStart = true
            this.isEnd = false
        },
        endLoading(type) {
            this.isStart = false
            this.isEnd = true
        },
        setContentLoad(value) {
            this.contentLoad = value
        }

    },
    getters: {
        getLocale() {
            if (process.client) {
                if (localStorage.getItem('lang')) {
                    this.appLocale = localStorage.getItem('lang');
                } else {
                    this.appLocale = 'en';
                }
            }

            return this.appLocale;
        },
        getThemeObj: (state) => state.themeObj,
        getLayoutData: (state) => state.layout,
        getLoadingStart: (state) => state.isStart,
        getLoadingEnd: (state) => state.isEnd,

        getLoading: (state) => state.loading,
        getIsLoadingPlayed: (state) => state.isLoadingPlayed,
        getShowLogo: (state) => state.showLogo,
        getShowContactNav: (state) => state.showContact,
        getCurrentSlide: (state) => state.currentSlide,
        getMenuStatus: (state) => state.menuStatus,
        getContentLoad: (state) => state.contentLoad,
    },
})
