
/*const variants = ["blue", "red", "yellow"];

const customVariants = plugin(({ addVariant, e }) => {
    variants.map((variant) =>
        addVariant(variant, ({ modifySelectors, separator }) => {
            modifySelectors(({ className }) => {
                const element = e(`${variant}${separator}${className}`);
                return `.${variant} .${element}`;
            });
        }),
    );
});*/

module.exports = {

    content: [
        "./pages/**/*.vue",
        "./layouts/*.vue" ,
        "./app.vue" ,
        "./App.vue",
        "./components/**/*.vue",
        "./components/**/**/*.vue",
        "./components/*.vue",
        './nuxt.config.js',
        './nuxt.config.ts'
    ],
    safelist: [
        'pt-[56px]',
        'pt-[60px]',
        'pt-[63px]',
        'pt-[116px]',
        'md:pt-[44px]',
        'md:pt-[60px]',
        'md:pt-[67px]',
        'md:pt-[116px]',
        'text-[140px]',
        'text-[120px]',
        'text-[180px]',
        'text-[240px]',
        'h-[26px]',
        'h-[30px]',
        'h-[26px]',
        'h-[360px]',
        'lg:h-[360px]',
        'h-[450px]',
        'lg:h-[450px]',
        'w-[82%]',
        'w-[84%]',
        'w-[86%]',
        'w-[88%]',
        'w-[90%]',
        'w-[92%]',
        'w-[94%]',
        'w-[96%]',
        'w-[98%]',
        'w-[99%]',
        'w-[97%]',
        'w-[95%]',
        'w-[93%]',
        'w-[91%]',
        'w-[89%]',
        'w-[87%]',
        'w-[85%]',
        'w-[83%]',
        'w-[81%]',
        'sm:w-[82%]',
        'sm:w-[84%]',
        'sm:w-[86%]',
        'sm:w-[88%]',
        'sm:w-[90%]',
        'sm:w-[92%]',
        'sm:w-[94%]',
        'sm:w-[96%]',
        'sm:w-[98%]',

    ],
    theme: {


        screens: {

            '4xs': '260px',
            '3xs': '320px',
            '2xs': '340px',
            'xs': '390px', // very usable device in irantic
            // => @media (min-width: 500px) { ... }

            'sm': '640px', // => @media (min-width: 640px) { ... }

            'md': '768px', // => @media (min-width: 768px) { ... }

            'lg': '1024px',

            // => @media (min-width: 1024px) { ... }

            'lg2': '1023px', 'lg3': '1150px',


            'xl': '1280px',

            'xl2': '1440px', // desktop
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px', // large desktop
            // => @media (min-width: 1536px) { ... }

            'hd': '1921px', // HD
            // => @media (min-width: 1920px) { ... }

            '2k': '2560px', // 2K
            // => @media (min-width: 2560px) { ... }

            '4k': '3840px', // 4k
            // => @med    ia (min-width: 3840px) { ... }
        },



        extend: {
            backfaceVisibility: {
                hidden: 'hidden',
            },
            zIndex: {
                '100': '100',
                '200': '200',
                '300': '300',
                '400': '400',
                '500': '500',
            },
            fontSize: {
                'body1': '16px',
                'body2': '14px',
                'button1': '16px',
                'button2': '14px',
                'caption': '12px',
                'overline': '10px',
                'headline1': '36px',
                'headline2': '32px',
                'headline3': '24px',
                'subtitle1': '20px',
                'subtitle2': '16px',
                'subtitle4': '15px',
                'subtitle3': '12px',
                // 'xs2': '.5rem',
                // 'xs2.5': '.65rem',
                // 'xs': '.75rem',
                // 'sm': '.875rem',
                // 'base': '1rem',
                // 'lg': '1.125rem',
                // 'xl': '1.25rem',
                // '2xl': '1.5rem',
                // '3xl': '1.875rem',
                // '4xl': '2.25rem',
                // '5xl': '3rem',
                // '6xl': '4rem',
                // '7xl': '5rem',
                // 'hd': '1.3rem',
                // '2k': '2rem',
                // '4k': '3rem',
            },
            boxShadow: {
                'primary': '-0px 15px 5px -2px rgba(0, 0, 0, 0.47)',
                'footer-primary': '0 10px 20px rgb(0 0 0 / 35%)',
                'primary2': '-0px 7px 5px -2px rgba(0, 0, 0, 0.47)',
                'primary-full': '0px 0px 5px -2px rgba(0, 0, 0, 0.47)',
                'province': '0 3px 6px rgb(0 0 0 / 16%)'
            },
            height: {
                '250': '250px', '300': '300px', '42': '10.5rem', '50': '12.5rem', '90': '22.6em',

            },
            margin: {
                '26': '6.5rem', '30': '7.5rem', '31': '7.7rem', '42': '10.5rem', '58': '14.5rem',
            },
            padding: {
                '26': '6.5rem', '30': '7.5rem', '31': '7.7rem', '42': '10.5rem', '58': '14.5rem',
            },
            borderRadius: {
                'xxs': '2px',
                'xs': '2px',
                'sm': '5px',
                'md': '0.375rem',
                'lg': '10px',
                'full': '9999px',
                'large': '12px',
            },
            colors: {
                'body':{
                    0:'#FFFFFF',
                    80:'#515151',
                    100:'#000000'
                    //  100:'#030303'
                },
                'primary': {
                    100: '#D0EDFB',
                    200: '#70C4EF',
                    300: '#42B4EC',
                    400: '#13A4E9',
                    500: '#0A8EDC',
                    600: '#0077CE',
                    700: '#005B9D',
                },
                'secondary': {
                    50: '#FFF4DC',
                    100: '#FFDC94',
                    200: '#FCC553',
                    300: '#FBB932',
                    400: '#F9AD11',
                    500: '#EB9C0D',
                    600: '#DC8A09',
                    700: '#BF6700',
                    800: '#523e15',
                },
                'black': {
                    900: '#121212',
                    100: '#222222',
                    60:  '#22222299',
                    '60-icon': '#7A7A7A',
                    30: '#2222224d',
                    10: '#2222221a',
                    50: '#BDBDBD',
                    70: '#E9E9E9',
                    300: '#222222',
                    600: '#F6F6F6',
                },
                'white': {
                    100: '#FFFFFF',
                    70: '#ffffffb3',
                    30: '#ffffff4d',
                },
                'success': {
                    100: '#BFF0BE',
                    200: '#78D876',
                    300: '#54CC52',
                    400: '#30C02D',
                    500: '#30C02D',
                    600: '#037C00',
                    700: '#035101',
                },
                'error': {
                    100: '#FFC6C6',
                    200: '#F89595',
                    300: '#F16363',
                    400: '#DC2E2E',
                    500: '#BC0000',
                    600: '#950000',
                    700: '#680000',
                },
                'warning': {
                    100: '#EDD599',
                    200: '#D7B04D',
                    300: '#CC9D27',
                    400: '#C08A00',
                    500: '#AE7D00',
                    600: '#9C7000',
                    700: '#644800',
                },
                'information': {
                    100: '#D7E7FF',
                    200: '#77ADFF',
                    300: '#4790FF',
                    400: '#1673FF',
                    500: '#0B59CF',
                    600: '#003F9E',
                    700: '#002B6B',
                },
                'graphics': {
                    'heart': '#FF0000'
                },
                'helper': {
                    'text': '#7a7a7a'
                },
                'gray':{
                    100:'#F2F4F7',
                    500:'#667085'
                },
                'amber':{
                    500:'#EB9C0D'
                }

            },


        }, backgroundColor: ({theme}) => ({
            ...theme('colors')
        }),


    },
    variants: {
        extend: {
            opacity: ['group-hover'],
            scale: ['group-hover'],
        },
    },

// To enable dark mode for only single utility class:

    plugins: [
        /* customVariants,*/
        function ({ addComponents }) {
            addComponents({
                '.container': {
                    maxWidth: '100%',
                    '@screen sm': {
                        maxWidth: '100%',
                    },
                    '@screen md': {
                        maxWidth: '100%',
                    },
                    '@screen lg': {
                        maxWidth: '90%',
                    },
                    '@screen xl': {
                        maxWidth: '80%',
                    },
                    '@screen 2xl': {
                        maxWidth: '75%',
                    },
                }
            })
        }
    ],

    darkMode: 'class',
}
