import { StyleSheet } from "react-native";
import colors from "../../utils/theme/colors";
import fonts from "../../utils/theme/fonts";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    svgContainer: {
        width: '100%',
        height: "60%",
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    languageToggle: {
        position: 'absolute',
        top: 70,
        left: 20,
        zIndex: 100,
    },
    languageText: {
        fontSize: fonts.size.xl,
        color: colors.white
    },
    logoContent: {
        position: 'absolute',
        top: '35%',
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 80,
        marginBottom: 12,
    },
    heading: {
        fontFamily: fonts.type.ExtraBold,
        fontSize: fonts.size.xxl,
        color: colors.white,
        textAlign: 'center',
    },
    bodyContent: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
    },
    welcomeText: {
        fontFamily: fonts.type.ExtraBold,
        fontSize: fonts.size.heading,
        color: colors.black,
        textAlign: 'left',
    },
    description: {
        fontFamily: fonts.type.Regular,
        fontSize: fonts.size.md,
        color: colors.textGrey,
        marginTop: 10,
        lineHeight: 22,
        textAlign: 'left',
    },
    nextButton: {
        position: 'absolute',
        bottom: 40,
        right: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: fonts.type.Regular,
        fontSize: fonts.size.md,
        marginRight: 8,
        color: colors.black,
    },
});
