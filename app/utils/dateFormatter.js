import moment from 'moment-jalaali'


moment.loadPersian({usePersianDigits: true})
export const formatJalaliDate = (date, format = 'jYYYY/jMM/jDD') => {
    if(!date) return ''
    return moment(date).format('jD jMMMM jYYYY')
}