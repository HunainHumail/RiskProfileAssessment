import React from 'react';
import { View, Text, TouchableOpacity, Image, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NextIcon, VectorSvg, Images } from '@utils/Images';
import { styles } from './styles'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@navigation/types';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n';

export default function WelcomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === 'ar';

    return (
        <View style={styles.container}>
            <View style={styles.svgContainer}>
                <VectorSvg width="100%" height={"100%"} preserveAspectRatio="none" />
                <TouchableOpacity
                    testID="language-toggle"
                    style={styles.languageToggle}
                    onPress={async () => {
                        const newLang = i18n.language === 'en' ? 'ar' : 'en';
                        await changeLanguage(newLang);
                    }}
                >
                    <Text style={styles.languageText}>{isArabic ? 'EN' : 'عربى'}</Text>
                </TouchableOpacity>
                <View style={styles.logoContent}>
                    <Image
                        source={Images.bankLogo}
                        style={styles.logo}
                        height={80}
                        width={400}
                        resizeMode="contain"
                    />
                    <Text style={styles.heading}>{t('heading')}</Text>
                </View>
            </View>
            <View style={styles.bodyContent}>
                <Text style={styles.welcomeText}>{t('welcome')}</Text>
                <Text style={styles.description}>{t('description')}</Text>
            </View>
            <TouchableOpacity
                testID="start-button"
                onPress={() => navigation.navigate('Question')}
                style={styles.nextButton}
            >
                <Text style={styles.buttonText}>{t('start')}</Text>
                <NextIcon
                    style={{
                        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                    }}
                />
            </TouchableOpacity>
        </View>
    );
}