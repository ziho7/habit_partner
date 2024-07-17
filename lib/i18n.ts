import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import zh from './locales/zh.json'

type LanguageResourceType = {
    en: {
        translation: typeof en
    },
    zh: {
        translation: typeof zh
    }
}


export const languageResource: LanguageResourceType = {
    en: {
        translation: en
    },
    zh: {
        translation: zh
    }
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: languageResource,
    // resources: {
    //     en: {
    //         translation: {
    //           hello_world: "Hello, World!",
    //         },
    //       },
    //       // Arabic
    //       asdf: {
    //         translation: {
    //           hello_world: "مرحباً بالعالم!",
    //         },
    //       },
    // },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
})

export default i18n