import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '@screens/WelcomeScreen';
import QuestionScreen from '@screens/QuestionScreen';
import ResultScreen from '@screens/ResultScreen';
import { ActivityIndicator, View } from 'react-native';
import { useQuestionnaireStore } from '@stores/useQuestionnaireStore';
import { questions } from '@data/questions';
import { RootStackParamList } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const { answers, currentIndex, hasHydrated } = useQuestionnaireStore();

  useEffect(() => {
    const decideRoute = async () => {
      const langChanged = await AsyncStorage.getItem('languageChanged');

      if (langChanged === 'true') {
        await AsyncStorage.removeItem('languageChanged');
        setInitialRoute('Welcome');
        return;
      }

      if (!hasHydrated) return;

      const isCompleted = answers.length === questions.length;
      if (isCompleted) setInitialRoute('Result');
      else if (answers.length > 0 || currentIndex > 0) setInitialRoute('Question');
      else setInitialRoute('Welcome');
    };

    decideRoute();
  }, [hasHydrated, answers, currentIndex]);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator testID="loading-indicator" size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Question" component={QuestionScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
}
