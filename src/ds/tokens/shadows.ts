export const shadowTokens = {
  // Box shadow scale
  boxShadow: {
    // Basic shadows
    none: 'none',
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',

    // Colored shadows
    'blue-sm': '0 0 10px rgba(59, 130, 246, 0.3)',
    'blue-md': '0 0 20px rgba(59, 130, 246, 0.4)',
    'blue-lg': '0 0 30px rgba(59, 130, 246, 0.5)',
    
    'purple-sm': '0 0 10px rgba(168, 85, 247, 0.3)',
    'purple-md': '0 0 20px rgba(168, 85, 247, 0.4)',
    'purple-lg': '0 0 30px rgba(168, 85, 247, 0.5)',
    
    'cyan-sm': '0 0 10px rgba(6, 182, 212, 0.3)',
    'cyan-md': '0 0 20px rgba(6, 182, 212, 0.4)',
    'cyan-lg': '0 0 30px rgba(6, 182, 212, 0.5)',
    
    'magenta-sm': '0 0 10px rgba(255, 0, 204, 0.3)',
    'magenta-md': '0 0 20px rgba(255, 0, 204, 0.4)',
    'magenta-lg': '0 0 30px rgba(255, 0, 204, 0.5)',

    // Theme-specific shadows
    'card-light': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    'card-light-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
    'card-dark': '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    'card-colorful': '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',

    // Interactive states
    'button-hover': '0 10px 20px -10px var(--primary-glow)',
    'focus-ring': '0 0 0 2px var(--primary), 0 0 0 4px rgba(59, 130, 246, 0.1)',
    
    // Dropdown shadows
    dropdown: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)'
  },

  // Text shadows
  textShadow: {
    none: 'none',
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
    
    // Glow effects
    'blue-glow': '0 0 10px rgba(59, 130, 246, 0.5)',
    'purple-glow': '0 0 10px rgba(168, 85, 247, 0.5)',
    'cyan-glow': '0 0 10px rgba(6, 182, 212, 0.5)',
    'magenta-glow': '0 0 10px rgba(255, 0, 204, 0.5)',
    
    // Subtle glow for gradients
    'gradient-glow': '0 2px 8px rgba(59, 130, 246, 0.15)'
  },

  // Drop shadows (for filters)
  dropShadow: {
    none: 'none',
    sm: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))',
    md: 'drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.06))',
    lg: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1))',
    xl: 'drop-shadow(0 20px 13px rgba(0, 0, 0, 0.03)) drop-shadow(0 8px 5px rgba(0, 0, 0, 0.08))',
    '2xl': 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))',
    
    // Colored drop shadows
    'blue': 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))',
    'purple': 'drop-shadow(0 4px 8px rgba(168, 85, 247, 0.3))',
    'cyan': 'drop-shadow(0 4px 8px rgba(6, 182, 212, 0.3))',
    'magenta': 'drop-shadow(0 4px 8px rgba(255, 0, 204, 0.3))'
  },

  // Inner shadows
  innerShadow: {
    none: 'none',
    sm: 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    lg: 'inset 0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    xl: 'inset 0 8px 15px -3px rgba(0, 0, 0, 0.1)'
  },

  // Elevation system (combining multiple shadow types)
  elevation: {
    0: {
      boxShadow: 'none',
      filter: 'none'
    },
    1: {
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      filter: 'none'
    },
    2: {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      filter: 'none'
    },
    3: {
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      filter: 'drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))'
    },
    4: {
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04))'
    },
    5: {
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      filter: 'drop-shadow(0 20px 13px rgba(0, 0, 0, 0.03))'
    }
  }
};

export type BoxShadow = keyof typeof shadowTokens.boxShadow;
export type TextShadow = keyof typeof shadowTokens.textShadow;
export type DropShadow = keyof typeof shadowTokens.dropShadow;
export type Elevation = keyof typeof shadowTokens.elevation;
