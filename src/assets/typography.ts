// Typography system for My Local LLC
export const typography = {
    // Font families
    primary: 'Poppins-Regular',
    primaryMedium: 'Poppins-Medium',
    primarySemiBold: 'Poppins-SemiBold',
    primaryBold: 'Poppins-Bold',

    // Fallback fonts (in case custom fonts don't load)
    fallback: {
        ios: 'San Francisco',
        android: 'Roboto',
        default: 'System',
    },

    // Font sizes
    sizes: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 28,
        '4xl': 32,
        '5xl': 36,
        '6xl': 48,
    },

    // Font weights
    weights: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },

    // Line heights
    lineHeights: {
        tight: 1.2,
        normal: 1.4,
        relaxed: 1.6,
    },
};

// Helper function to get font family with fallback
export const getFontFamily = (weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'regular') => {
    const fontMap = {
        regular: typography.primary,
        medium: typography.primaryMedium,
        semibold: typography.primarySemiBold,
        bold: typography.primaryBold,
    };

    return fontMap[weight];
};

// Pre-defined text styles
export const textStyles = {
    // Headers
    h1: {
        fontFamily: getFontFamily('bold'),
        fontSize: typography.sizes['4xl'],
        lineHeight: typography.sizes['4xl'] * typography.lineHeights.tight,
    },
    h2: {
        fontFamily: getFontFamily('bold'),
        fontSize: typography.sizes['3xl'],
        lineHeight: typography.sizes['3xl'] * typography.lineHeights.tight,
    },
    h3: {
        fontFamily: getFontFamily('semibold'),
        fontSize: typography.sizes['2xl'],
        lineHeight: typography.sizes['2xl'] * typography.lineHeights.normal,
    },
    h4: {
        fontFamily: getFontFamily('semibold'),
        fontSize: typography.sizes.xl,
        lineHeight: typography.sizes.xl * typography.lineHeights.normal,
    },

    // Body text
    body: {
        fontFamily: getFontFamily('regular'),
        fontSize: typography.sizes.base,
        lineHeight: typography.sizes.base * typography.lineHeights.normal,
    },
    bodyMedium: {
        fontFamily: getFontFamily('medium'),
        fontSize: typography.sizes.base,
        lineHeight: typography.sizes.base * typography.lineHeights.normal,
    },

    // App title (special style for "My Local LLC")
    appTitle: {
        fontFamily: getFontFamily('bold'),
        fontSize: typography.sizes['3xl'],
        lineHeight: typography.sizes['3xl'] * typography.lineHeights.tight,
        letterSpacing: -0.5,
    },

    // Button text
    button: {
        fontFamily: getFontFamily('semibold'),
        fontSize: typography.sizes.base,
        lineHeight: typography.sizes.base * typography.lineHeights.normal,
    },

    // Small text
    caption: {
        fontFamily: getFontFamily('regular'),
        fontSize: typography.sizes.sm,
        lineHeight: typography.sizes.sm * typography.lineHeights.normal,
    },
};
