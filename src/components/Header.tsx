import React from 'react';
import { View, TouchableOpacity, StyleSheet, I18nManager } from 'react-native';
import NextIcon from '@assets/icons/next-icon.svg';

interface Props {
  onBack: () => void;
}

export default function Header({ onBack }: Props) {
  return (
    <View style={styles.header}>
      <TouchableOpacity testID="header-back-button" onPress={onBack}>
        <NextIcon
          width={40} height={40}
          style={{
            transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});
