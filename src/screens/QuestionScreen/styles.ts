import { I18nManager, StyleSheet } from 'react-native';
import colors from '@utils/theme/colors';
import fonts from '@utils/theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  questionText: {
    fontFamily: fonts.type.Bold,
    fontSize: fonts.size.xl,
    color: colors.black,
    marginBottom: 20,
    textAlign: 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  option: {
    backgroundColor: colors.lightGrey,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    fontFamily: fonts.type.Regular,
    fontSize: fonts.size.lg,
    color: colors.black,
    textAlign: 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
  selectedOptionText: {
    color: colors.white,
    fontFamily: fonts.type.SemiBold,
  },
  continueButton: {
    position: 'absolute',
    bottom: 50,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center'
  },
  continueText: {
    fontFamily: fonts.type.SemiBold,
    fontSize: fonts.size.lg,
    color: colors.white,
    textAlign: 'center'
  },
});
