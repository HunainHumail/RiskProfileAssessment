import { I18nManager } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

const init = async () => {
  const savedLang = await AsyncStorage.getItem('appLang');
  const isRTL = savedLang === 'ar';

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
  }

  i18n
    .use(initReactI18next)
    .init({
      compatibilityJSON: 'v4',
      lng: savedLang || 'en',
      fallbackLng: 'en',
      resources: {
        en: { translation: en },
        ar: { translation: ar },
      },
      interpolation: {
        escapeValue: false,
      },
    });
};

init();

export default i18n;

export const changeLanguage = async (lng: 'en' | 'ar') => {
  const isRTL = lng === 'ar';

  await AsyncStorage.setItem('appLang', lng);
  await AsyncStorage.setItem('languageChanged', 'true');

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    RNRestart.Restart();
  } else {
    await i18n.changeLanguage(lng);
  }
};