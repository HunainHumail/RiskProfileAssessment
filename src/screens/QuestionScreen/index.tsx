import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuestionnaireStore } from '@stores/useQuestionnaireStore';
import { questions } from '@data/questions';
import Header from '@components/Header';
import { styles } from './styles';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '@components/PrimaryButton';

export default function QuestionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const {
    answers,
    addAnswer,
    currentIndex,
    setCurrentIndex,
  } = useQuestionnaireStore();

  const question = questions[currentIndex];
  const selectedAnswer =
    answers.find((a) => a.questionId === question.id)?.selectedOptionScore ?? null;

  const [localSelected, setLocalSelected] = useState<number | null>(selectedAnswer);

  useEffect(() => {
    setLocalSelected(selectedAnswer);
  }, [currentIndex]);

  const handleOption = (score: number) => {
    setLocalSelected(score);
  };

  const handleContinue = () => {
    if (localSelected !== null) {
      addAnswer(question.id, localSelected);
      if (currentIndex + 1 === questions.length) {
        navigation.navigate('Result');
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentIndex === 0) {
      if (navigation.canGoBack()) {
        navigation.goBack(); // ✅ natural transition if Welcome exists in stack
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }], // ✅ force route if no stack
        });
      }
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBack={handleBack} />

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View
          entering={FadeInUp.duration(400)}
          key={`question-${question.id}`}
        >
          <Text testID="question-text" style={styles.questionText}>{t(question.text)}</Text>
        </Animated.View>

        {question.options.map((opt, i) => (
          <Animated.View
            key={`option-${question.id}-${opt.score}`}
            entering={FadeInUp.delay((i + 1) * 100).duration(300)}
          >
            <TouchableOpacity
              testID={`option-${opt.score}`}
              onPress={() => handleOption(opt.score)}
              style={[
                styles.option,
                localSelected === opt.score && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  localSelected === opt.score && styles.selectedOptionText,
                ]}
              >
                {t(opt.label)}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      <PrimaryButton
        label={t('continue')}
        onPress={handleContinue}
        disabled={localSelected === null}
      />
    </SafeAreaView>
  );
}
