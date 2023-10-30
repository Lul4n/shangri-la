import {initReactI18next} from "react-i18next";
import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";

i18next
    .use(I18NextHttpBackend)
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: 'en',
        ns: ['application'],
        defaultNS: 'application',
        interpolation: {
            escapeValue: false
        },
        backend:{
            loadPath: '/frontend/locales/{{lng}}/{{ns}}.json'
        },
        detection:{
            order: ['querystring','localStorage', 'navigator'],
            lookupQuerystring: 'lng'
        }
    });