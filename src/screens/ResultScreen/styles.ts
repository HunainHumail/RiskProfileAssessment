import { StyleSheet } from "react-native";
import colors from "@utils/theme/colors";
import fonts from "@utils/theme/fonts";

export const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 24,
        },
        title: {
            fontSize: fonts.size.xl,
            fontFamily: fonts.type.Bold,
            color: colors.black,
            marginTop: 24,
        },
        resultCard: {
            backgroundColor: colors.lightGrey,
            borderRadius: 16,
            padding: 24,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
        },
        category: {
            fontSize: fonts.size.heading,
            fontFamily: fonts.type.ExtraBold,
            marginTop: 12,
        },
        score: {
            fontSize: fonts.size.lg,
            fontFamily: fonts.type.Medium,
            color: colors.textGrey,
            marginTop: 6,
        },
    })
