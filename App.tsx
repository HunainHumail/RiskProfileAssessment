import React, { useEffect, useState } from 'react';
import { I18nManager, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './src/i18n';
import { I18nextProvider } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const setupLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('appLang');
        const lng = savedLang || 'en';
        const shouldBeRTL = lng === 'ar';

        if (I18nManager.isRTL !== shouldBeRTL) {
          I18nManager.forceRTL(shouldBeRTL);
        }

        await i18n.changeLanguage(lng);
      } finally {
        if (isMounted) setIsReady(true);
      }
    };

    setupLanguage();

    return () => {
      isMounted = false;
    };
  }, []);


  if (!isReady) return <ActivityIndicator testID="loading-indicator" size="large" style={{ flex: 1 }} />;

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}