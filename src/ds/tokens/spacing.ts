export const spacingTokens = {
  // Base spacing scale (following 4px grid system)
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem',   // 2px
    1: '0.25rem',      // 4px
    1.5: '0.375rem',   // 6px
    2: '0.5rem',       // 8px
    2.5: '0.625rem',   // 10px
    3: '0.75rem',      // 12px
    3.5: '0.875rem',   // 14px
    4: '1rem',         // 16px
    5: '1.25rem',      // 20px
    6: '1.5rem',       // 24px
    7: '1.75rem',      // 28px
    8: '2rem',         // 32px
    9: '2.25rem',      // 36px
    10: '2.5rem',      // 40px
    11: '2.75rem',     // 44px
    12: '3rem',        // 48px
    14: '3.5rem',      // 56px
    16: '4rem',        // 64px
    18: '4.5rem',      // 72px
    20: '5rem',        // 80px
    24: '6rem',        // 96px
    28: '7rem',        // 112px
    32: '8rem',        // 128px
    36: '9rem',        // 144px
    40: '10rem',       // 160px
    44: '11rem',       // 176px
    48: '12rem',       // 192px
    52: '13rem',       // 208px
    56: '14rem',       // 224px
    60: '15rem',       // 240px
    64: '16rem',       // 256px
    72: '18rem',       // 288px
    80: '20rem',       // 320px
    96: '24rem'        // 384px
  },

  // Semantic spacing
  semantic: {
    // Component spacing
    component: {
      xs: '0.25rem',     // 4px - minimal spacing
      sm: '0.5rem',      // 8px - small spacing
      md: '1rem',        // 16px - medium spacing
      lg: '1.5rem',      // 24px - large spacing
      xl: '2rem',        // 32px - extra large spacing
      '2xl': '3rem',     // 48px - double extra large
      '3xl': '4rem',     // 64px - triple extra large
      '4xl': '6rem'      // 96px - quadruple extra large
    },

    // Layout spacing
    layout: {
      xs: '1rem',        // 16px - minimal layout spacing
      sm: '1.5rem',      // 24px - small layout spacing
      md: '2rem',        // 32px - medium layout spacing
      lg: '3rem',        // 48px - large layout spacing
      xl: '4rem',        // 64px - extra large layout spacing
      '2xl': '6rem',     // 96px - double extra large
      '3xl': '8rem',     // 128px - triple extra large
      '4xl': '12rem'     // 192px - quadruple extra large
    },

    // Section spacing
    section: {
      xs: '2rem',        // 32px - minimal section spacing
      sm: '3rem',        // 48px - small section spacing
      md: '4rem',        // 64px - medium section spacing
      lg: '6rem',        // 96px - large section spacing
      xl: '8rem',        // 128px - extra large section spacing
      '2xl': '12rem',    // 192px - double extra large
      '3xl': '16rem',    // 256px - triple extra large
      '4xl': '20rem'     // 320px - quadruple extra large
    }
  },

  // Border radius scale
  borderRadius: {
    none: '0',
    sm: '0.125rem',      // 2px
    md: '0.375rem',      // 6px
    lg: '0.5rem',        // 8px
    xl: '0.75rem',       // 12px
    '2xl': '1rem',       // 16px
    '3xl': '1.5rem',     // 24px
    '4xl': '2rem',       // 32px
    full: '9999px',      // full rounded
    
    // Theme-specific radius
    theme: '1rem',       // 16px - theme cards
    'theme-lg': '2rem',  // 32px - colorful theme cards
    card: '1rem',        // 16px - card components
    button: '0.5rem',    // 8px - button components
    input: '0.375rem',   // 6px - input components
    modal: '1rem',       // 16px - modal components
    dropdown: '0.75rem'  // 12px - dropdown components
  },

  // Size scale for components
  size: {
    // Icon sizes
    icon: {
      xs: '1rem',        // 16px
      sm: '1.25rem',     // 20px
      md: '1.5rem',      // 24px
      lg: '2rem',        // 32px
      xl: '2.5rem',      // 40px
      '2xl': '3rem',     // 48px
      '3xl': '4rem'      // 64px
    },

    // Button sizes
    button: {
      xs: {
        height: '2rem',    // 32px
        padding: '0.25rem 0.75rem'
      },
      sm: {
        height: '2.25rem', // 36px
        padding: '0.375rem 1rem'
      },
      md: {
        height: '2.5rem',  // 40px
        padding: '0.5rem 1.25rem'
      },
      lg: {
        height: '3rem',    // 48px
        padding: '0.75rem 1.5rem'
      },
      xl: {
        height: '3.5rem',  // 56px
        padding: '1rem 2rem'
      }
    },

    // Input sizes
    input: {
      xs: {
        height: '2rem',    // 32px
        padding: '0.25rem 0.75rem'
      },
      sm: {
        height: '2.25rem', // 36px
        padding: '0.375rem 1rem'
      },
      md: {
        height: '2.5rem',  // 40px
        padding: '0.5rem 1rem'
      },
      lg: {
        height: '3rem',    // 48px
        padding: '0.75rem 1.25rem'
      }
    },

    // Avatar sizes
    avatar: {
      xs: '1.5rem',      // 24px
      sm: '2rem',        // 32px
      md: '2.5rem',      // 40px
      lg: '3rem',        // 48px
      xl: '4rem',        // 64px
      '2xl': '5rem',     // 80px
      '3xl': '6rem'      // 96px
    }
  },

  // Z-index scale
  zIndex: {
    behind: '-1',
    base: '0',
    content: '1',
    elevated: '10',
    overlay: '20',
    dropdown: '30',
    modal: '40',
    tooltip: '50',
    navigation: '60',
    'navigation-dropdown': '70',
    'page-dropdown': '80',
    toast: '90',
    max: '9999'
  }
};

export type SpacingScale = keyof typeof spacingTokens.spacing;
export type ComponentSpacing = keyof typeof spacingTokens.semantic.component;
export type LayoutSpacing = keyof typeof spacingTokens.semantic.layout;
export type SectionSpacing = keyof typeof spacingTokens.semantic.section;
