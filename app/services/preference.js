export function setAppLocale(lang) {
    const html = document.getElementsByTagName('html')
    if (lang == 'fa' || lang == 'ar') {
        html[0].classList.remove('ltr')
        html[0].classList.add('rtl')
        localStorage.setItem('direction', 'rtl')
        html[0].setAttribute('dir', 'rtl')
    } else {
        html[0].classList.remove('rtl')
        html[0].classList.add('ltr')
        localStorage.setItem('direction', 'ltr')
        html[0].setAttribute('dir', 'ltr')
    }
    // ذخیره توی localStorage
    localStorage.setItem('lang', lang)

    // ست کردن کوکی برای SSR
    document.cookie = `lang=${lang}; path=/; max-age=31536000` // یک سال اعتبار
}


