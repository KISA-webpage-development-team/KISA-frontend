import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en.json';
import ko from './ko.json';
import {getLocales} from 'react-native-localize';

i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode, // language to use
  fallbackLng: 'en', // fallback language
  supportedLngs: ['en', 'ko'], // supported languages
  compatibilityJSON: 'v4',
  resources: {
    en: {
      translation: en,
    },
    ko: {
      translation: ko,
    },
  },
});

export default i18n;
