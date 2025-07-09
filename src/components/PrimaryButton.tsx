import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import colors from '@utils/theme/colors';
import fonts from '@utils/theme/fonts';

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PrimaryButton = ({ label, onPress, disabled, style, textStyle }: Props) => {
  return (
    <TouchableOpacity
      testID="continue-button"
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? '#ccc' : colors.primary },
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: "90%",
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50
  },
  text: {
    color: colors.white,
    fontFamily: fonts.type.Bold,
    fontSize: fonts.size.lg
  },
});

export default PrimaryButton;
