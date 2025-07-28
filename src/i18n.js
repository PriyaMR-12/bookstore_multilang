import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import hi from './locales/hi.json';
import kn from './locales/kn.json';
import de from './locales/de.json';
import fr from './locales/fr.json';
import te from './locales/te.json';
import ta from './locales/ta.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      hi: { translation: hi },
      kn: { translation: kn },
      de: { translation: de },
      fr: { translation: fr },
      te: { translation: te },
      ta: { translation: ta }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
