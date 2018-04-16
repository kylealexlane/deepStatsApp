import {
    PixelRatio,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');
export const windowSize = {
    width,
    height
};

export const isIphoneX = windowSize.height === 812;

export const colors = {
    successLightest: '#CDEFCB',
    successLighter: '#7CFF78',
    success: '#3ADF55',
    successDarker: '#1A8448',
    successDarkest: '#155C21',

    infoLightest: '#FEEFBD',
    infoLighter: '#FFDA81',
    info: '#FFB74B',
    infoDarker: '#E98931',
    infoDarkest: '#492A0C',

    dangerLightest: '#FFEBEB',
    dangerLighter: '#FF7C7C',
    danger: '#FF5353',
    dangerDarker: '#D73939',
    dangerDarkest: '#4C0D0D',

    black: '#000000',
    greyDarkest: '#1d1e20',
    greyDarker: '#313236',
    grey: '#797676',
    greyBase: '#797676',
    greyLight: '#CFCACA',
    greyLighter: '#F0EBEB',
    greyLightest: '#FBF8F8',

    baseText: '#FBF8F8',
    secondaryText: '#CFCACA',

    white: '#FFFFFF',

};

export const fontSize = {
    xxSmall: 10,
    xSmall: 12,
    small: 14,
    medium: 16,
    large: 18,
    xLarge: 24,
    xxLarge: 28,
    xxxLarge: 32,
    xxxxLarge: 44,
};

const fontFamilies = {
    regular: { fontWeight: 'normal', fontStyle: 'normal', fontFamily: 'System' }, // fontFamily: 'DIN OT',
    medium: { fontWeight: '500', fontStyle: 'normal', fontFamily: 'System' }, // fontFamily: 'DIN OT',
    bold: { fontWeight: 'bold', fontStyle: 'normal', fontFamily: 'System' } // fontFamily: 'DIN OT',
};

const fontDetails = {
    xxSmall: { fontSize: fontSize.xxSmall, fontFamily: 'System' },
    xSmall: { fontSize: fontSize.xSmall, fontFamily: 'System' },
    small: { fontSize: fontSize.small, fontFamily: 'System' },
    medium: { fontSize: fontSize.medium, fontFamily: 'System' },
    large: { fontSize: fontSize.large, fontFamily: 'System' },
    xLarge: { fontSize: fontSize.xLarge, fontFamily: 'System' },
    xxLarge: { fontSize: fontSize.xxLarge, fontFamily: 'System' },
    xxxLarge: { fontSize: fontSize.xxxLarge, fontFamily: 'System' },
    xxxxLarge: { fontSize: fontSize.xxxxLarge, fontFamily: 'System' },
}

export const appFonts = {
    xxsRegular: {...fontDetails.xxSmall, ...fontFamilies.regular },
    xsRegular: { ...fontDetails.xSmall, ...fontFamilies.regular },
    smRegular: { ...fontDetails.small, ...fontFamilies.regular },
    mdRegular: { ...fontDetails.medium, ...fontFamilies.regular },
    lgRegular: { ...fontDetails.large, ...fontFamilies.regular },
    xlRegular: { ...fontDetails.xLarge, ...fontFamilies.regular },
    xxlRegular: { ...fontDetails.xxLarge, ...fontFamilies.regular },
    xxxlRegular: { ...fontDetails.xxxLarge, ...fontFamilies.regular },
    xxxxlRegular: { ...fontDetails.xxxxLarge, ...fontFamilies.regular },

    xxsMedium: { ...fontDetails.xxSmall, ...fontFamilies.medium },
    xsMedium: { ...fontDetails.xSmall, ...fontFamilies.medium },
    smMedium: { ...fontDetails.small, ...fontFamilies.medium },
    mdMedium: { ...fontDetails.medium, ...fontFamilies.medium },
    lgMedium: { ...fontDetails.large, ...fontFamilies.medium },
    xlMedium: { ...fontDetails.xLarge, ...fontFamilies.medium },
    xxlMedium: { ...fontDetails.xxLarge, ...fontFamilies.medium },
    xxxlMedium: { ...fontDetails.xxxLarge, ...fontFamilies.medium },
    xxxxlMedium: { ...fontDetails.xxxLarge, ...fontFamilies.medium },

    xxsBold: { ...fontDetails.xxSmall, ...fontFamilies.bold },
    xsBold: { ...fontDetails.xSmall, ...fontFamilies.bold },
    smBold: { ...fontDetails.small, ...fontFamilies.bold },
    mdBold: { ...fontDetails.medium, ...fontFamilies.bold },
    lgBold: { ...fontDetails.large, ...fontFamilies.bold },
    xlBold: { ...fontDetails.xLarge, ...fontFamilies.bold },
    xxlBold: { ...fontDetails.xxLarge, ...fontFamilies.bold },
    xxxlBold: { ...fontDetails.xxxLarge, ...fontFamilies.bold },
    xxxxlBold: { ...fontDetails.xxxxLarge, ...fontFamilies.bold },

    programName: { fontSize: 52, ...fontFamilies.regular }

};

export const elements = {
    header1: { ...appFonts.xxxlBold },
    header2: { ...appFonts.xlBold },
    header3: { ...appFonts.lgBold },
    header4: { ...appFonts.smBold }
};

const baseSpacing = 4;
export const spacing = {
    s0: baseSpacing, // 4px
    s1: baseSpacing * 2, // 8px
    s2: baseSpacing * 3, // 12px
    s3: baseSpacing * 4, // 16px
    s4: baseSpacing * 5, // 20px
    s5: baseSpacing * 6, // 24px
    s6: baseSpacing * 7, // 28px

    s7: baseSpacing * 8, // 32px 6
    s8: baseSpacing * 9, // 36px 7
    s9: baseSpacing * 10, // 40px 8
    s10: baseSpacing * 11, // 44px 9
    s11: baseSpacing * 12, // 48px 10
    s12: baseSpacing * 13 // 52px
};

export const containerStyle = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        paddingHorizontal: spacing.s3,
        backgroundColor: colors.white
    },
    header: {
        height: windowSize.height * 0.13,
        marginBottom: spacing.s4
        // backgroundColor: 'gray',
    },
    subLogoContainer: {
        marginBottom: windowSize.height * 0.05,
        alignItems: 'center',
    },
    titleContainer: {
        marginHorizontal: spacing.s3,
        color: colors.greyDarkest,
    },
    subLogoText: {
        ...appFonts.programName,
        color: colors.greyLight
    },

    footer: {
        height: windowSize.height * 0.05,
        // backgroundColor: 'white',
        marginBottom: spacing.s10
    }, // , 100%
    footerButtonContainer: {
        flexDirection: 'column',
        flex: 1,
        alignSelf: 'stretch',
        marginTop: spacing.s0,
        marginBottom: spacing.s4
    },
    positionCenter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        width: windowSize.width * 0.90,
        marginHorizontal: spacing.s0
    },

    buttonText: {
        ...appFonts.lgMedium
    },

    main: {
        flex: 1 // backgroundColor: 'skyblue'
    },
    inputContainer: {
        borderBottomWidth: 0,
        marginHorizontal: 15
    },
    fixedMainTop: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        height: 50,
        alignItems: 'center'
    },
    fixedMainFooter: {
        //  backgroundColor: 'blue',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50
    },
    title: {
        ...appFonts.xlBold,
        textAlign: 'center'
    },
    iconContainer: {
        marginTop: windowSize.height,
        flexDirection: 'row'
    },
    h3: {
        textAlign: 'center',
        alignItems: 'center',
        ...appFonts.lgMedium,
        marginBottom: spacing.s2
    }
});
