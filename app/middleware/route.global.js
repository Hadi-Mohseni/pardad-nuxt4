import {useGlobalStore} from "~/stores/global.js";

export default defineNuxtRouteMiddleware((to, from) => {
    const {setContactNav , setMenuHandler , setThemeObj , startLoading , setMainLoading} = useGlobalStore()
    if(import.meta.client){
        if(document.body.classList){
            document.body.classList.remove('new-nav-visible')
        }
    }
    if(to.name === 'contact'){
        setContactNav(false)
    }else{
        setContactNav(true)
    }

    setMenuHandler('CLOSE')

    startLoading()
    setMainLoading(true)

    /*if(import.meta.client){
        if(to.meta.layout !== 'route' && to.meta.layout !== 'category'){

        }


    }*/

})