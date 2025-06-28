export const typographyTokens = {
  // Font families
  fontFamily: {
    primary: ['var(--font-roboto)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    secondary: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    heading: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    rtl: ['var(--font-tajawal)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
    icons: ['var(--material-symbols)', 'Material Symbols Rounded', 'sans-serif']
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },

  // Font sizes with corresponding line heights
  fontSize: {
    xs: {
      size: '0.75rem',    // 12px
      lineHeight: '1rem'  // 16px
    },
    sm: {
      size: '0.875rem',   // 14px
      lineHeight: '1.25rem' // 20px
    },
    base: {
      size: '1rem',       // 16px
      lineHeight: '1.5rem' // 24px
    },
    lg: {
      size: '1.125rem',   // 18px
      lineHeight: '1.75rem' // 28px
    },
    xl: {
      size: '1.25rem',    // 20px
      lineHeight: '1.75rem' // 28px
    },
    '2xl': {
      size: '1.5rem',     // 24px
      lineHeight: '2rem'  // 32px
    },
    '3xl': {
      size: '1.875rem',   // 30px
      lineHeight: '2.25rem' // 36px
    },
    '4xl': {
      size: '2.25rem',    // 36px
      lineHeight: '2.5rem' // 40px
    },
    '5xl': {
      size: '3rem',       // 48px
      lineHeight: '1'     // 48px
    },
    '6xl': {
      size: '3.75rem',    // 60px
      lineHeight: '1'     // 60px
    },
    '7xl': {
      size: '4.5rem',     // 72px
      lineHeight: '1'     // 72px
    },
    '8xl': {
      size: '6rem',       // 96px
      lineHeight: '1'     // 96px
    },
    '9xl': {
      size: '8rem',       // 128px
      lineHeight: '1'     // 128px
    }
  },

  // Typography scale definitions
  scale: {
    // Headings
    h1: {
      fontSize: '3.5rem',      // 56px
      lineHeight: '1.2',
      fontWeight: '800',
      letterSpacing: '-0.02em',
      fontFamily: 'var(--font-poppins)'
    },
    h2: {
      fontSize: '3rem',        // 48px
      lineHeight: '1.3',
      fontWeight: '700',
      letterSpacing: '-0.01em',
      fontFamily: 'var(--font-poppins)'
    },
    h3: {
      fontSize: '2.25rem',     // 36px
      lineHeight: '1.4',
      fontWeight: '700',
      letterSpacing: '0',
      fontFamily: 'var(--font-poppins)'
    },
    h4: {
      fontSize: '1.875rem',    // 30px
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '0',
      fontFamily: 'var(--font-poppins)'
    },
    h5: {
      fontSize: '1.5rem',      // 24px
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0',
      fontFamily: 'var(--font-poppins)'
    },
    h6: {
      fontSize: '1.25rem',     // 20px
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0',
      fontFamily: 'var(--font-poppins)'
    },

    // Body text
    bodyLarge: {
      fontSize: '1.125rem',    // 18px
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '0',
      fontFamily: 'var(--font-roboto)'
    },
    body: {
      fontSize: '1rem',        // 16px
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '0',
      fontFamily: 'var(--font-roboto)'
    },
    bodySmall: {
      fontSize: '0.875rem',    // 14px
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0',
      fontFamily: 'var(--font-roboto)'
    },

    // Captions and labels
    caption: {
      fontSize: '0.75rem',     // 12px
      lineHeight: '1.4',
      fontWeight: '400',
      letterSpacing: '0.02em',
      fontFamily: 'var(--font-roboto)'
    },
    label: {
      fontSize: '0.875rem',    // 14px
      lineHeight: '1.4',
      fontWeight: '500',
      letterSpacing: '0.01em',
      fontFamily: 'var(--font-roboto)'
    },

    // Interactive elements
    button: {
      fontSize: '0.875rem',    // 14px
      lineHeight: '1.25',
      fontWeight: '600',
      letterSpacing: '0.01em',
      fontFamily: 'var(--font-roboto)'
    },
    buttonLarge: {
      fontSize: '1rem',        // 16px
      lineHeight: '1.25',
      fontWeight: '600',
      letterSpacing: '0',
      fontFamily: 'var(--font-roboto)'
    },

    // Code and monospace
    code: {
      fontSize: '0.875rem',    // 14px
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0',
      fontFamily: 'ui-monospace'
    },

    // RTL Support (Arabic)
    rtlHeading: {
      fontSize: '3rem',        // 48px
      lineHeight: '1.4',
      fontWeight: '700',
      letterSpacing: '0',
      fontFamily: 'var(--font-tajawal)'
    },
    rtlBody: {
      fontSize: '1rem',        // 16px
      lineHeight: '1.7',
      fontWeight: '400',
      letterSpacing: '0',
      fontFamily: 'var(--font-tajawal)'
    }
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em'
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2'
  }
};

export type TypographyScale = keyof typeof typographyTokens.scale;
export type FontSize = keyof typeof typographyTokens.fontSize;
export type FontWeight = keyof typeof typographyTokens.fontWeight;
