import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import zh_CN from './locales/zh_CN.json'

type LanguageResourceType = {
    en: {
        translation: typeof en
    },
    zh_CN: {
        translation: typeof zh_CN
    }
}


export const languageResource: LanguageResourceType = {
    en: {
        translation: en
    },
    zh_CN: {
        translation: zh_CN
    }
};

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: languageResource,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
})

export default i18n