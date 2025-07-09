import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useQuestionnaireStore } from '@stores/useQuestionnaireStore';
import { useNavigation } from '@react-navigation/native';
import { ShieldCheck, ShieldX } from 'lucide-react-native';
import colors from '@utils/theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import Speedometer from '@components/Speedometer';
import PrimaryButton from '@components/PrimaryButton';

export default function ResultScreen() {
  const { t } = useTranslation();
  const answers = useQuestionnaireStore(state => state.answers) ?? [];
  const reset = useQuestionnaireStore(state => state.reset);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const total = answers.reduce((sum, a) => sum + a.selectedOptionScore, 0);

  let category = t('risk.low');
  let riskColor = colors.riskLow;
  let RiskIcon = ShieldCheck;

  if (total > 12) {
    category = t('risk.high');
    riskColor = colors.riskHigh;
    RiskIcon = ShieldX;
  } else if (total > 8) {
    category = t('risk.medium');
    riskColor = colors.riskMedium;
  }

  return (
    <SafeAreaView testID="result-screen" style={styles.container}>
      <Speedometer
        testID="speedometer"
        value={total * 5}
        category={total > 12 ? 'high' : total > 8 ? 'medium' : 'low'}
      />
      <View style={styles.resultCard}>
        <RiskIcon size={48} color={riskColor} style={{ marginBottom: 12 }} testID="risk-icon" />
        <Text testID="result-title" style={styles.title}>{t('result.title')}</Text>
        <Text testID="result-category" style={[styles.category, { color: riskColor }]}>{category}</Text>
        <Text testID="result-score" style={styles.score}>{t('result.score', { total })}</Text>
      </View>
      <PrimaryButton
        label={t('result.retake')}
        onPress={() => {
          reset();
          navigation.navigate('Welcome');
        }}
      />
    </SafeAreaView>
  );
}
