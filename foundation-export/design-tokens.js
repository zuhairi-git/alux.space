/**
 * Design System Foundation - Exportable Design Tokens
 * Copy this file to your other Next.js projects to maintain design consistency
 */

export const designTokens = {
  // Color Palette
  colors: {
    primary: {
      '50': '#eefbfd',
      '100': '#d5f4f8',
      '200': '#b0e8f1',
      '300': '#79d6e7',
      '400': '#3fbcd5',
      '500': '#209fba',
      '600': '#16809d',
      '700': '#1e6880',
      '800': '#215669',
      '900': '#204859',
      '950': '#102e3c',
    },
    accent: {
      '50': '#fff4ed',
      '100': '#ffe5d4',
      '200': '#ffc8a8',
      '300': '#ffa171',
      '400': '#ff6429',
      '500': '#fe4911',
      '600': '#ef2107',
      '700': '#c61e08',
      '800': '#9d1a0f',
      '900': '#7e1910',
      '950': '#440806',
    },
    neutral: {
      '50': '#f9fafa',
      '100': '#f3f4f4',
      '200': '#e6e7e8',
      '300': '#d1d5d6',
      '400': '#b5bbbd',
      '500': '#9ba2a4',
      '600': '#787f81',
      '700': '#61686a',
      '800': '#515557',
      '900': '#45484a',
      '950': '#272a2b',
    },
    success: {
      '50': '#f5faf3',
      '100': '#e8f4e4',
      '200': '#cfe9c9',
      '300': '#a9d69f',
      '400': '#69b259',
      '500': '#579f48',
      '600': '#448237',
      '700': '#38672e',
      '800': '#305229',
      '900': '#284423',
      '950': '#11240f',
    },
    warning: {
      '50': '#fffae9',
      '100': '#fef2c7',
      '200': '#fde38a',
      '300': '#fcce4d',
      '400': '#fbb924',
      '500': '#f5980b',
      '600': '#d97106',
      '700': '#b44e09',
      '800': '#923c0e',
      '900': '#78320f',
      '950': '#451803',
    },
    error: {
      '50': '#ffebed',
      '100': '#ffe4e7',
      '200': '#fecdd4',
      '300': '#fda4b2',
      '400': '#fb7189',
      '500': '#f43f63',
      '600': '#e11d4e',
      '700': '#be1241',
      '800': '#9f123d',
      '900': '#88133a',
      '950': '#4c051b',
    },
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Spacing Scale
  spacing: {
    px: '1px',
    0: '0',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    DEFAULT: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    md: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.06)',
    none: '0 0 #0000',
  },

  // Animations
  animation: {
    'fade-in': 'fadeIn 0.5s ease-out',
    'slide-up': 'slideUp 0.5s ease-out',
    'slide-down': 'slideDown 0.3s ease-out',
    'scale-in': 'scaleIn 0.3s ease-out',
    'hover-lift': 'hoverLift 0.3s ease forwards',
  },

  // Keyframes
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      '0%': { transform: 'translateY(-10px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.95)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    hoverLift: {
      '0%': { transform: 'translateY(0) scale(1)' },
      '100%': { transform: 'translateY(-5px) scale(1.02)' },
    },
  },
};

export default designTokens;
