export const colorTokens = {
  // Base color palette - 8 modern, versatile colors
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554'
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764'
  },
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344'
  },
  magenta: {
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
    950: '#500724'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712'
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22'
  },
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03'
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  },

  // Semantic color mapping
  semantic: {
    primary: {
      light: '#3b82f6',
      dark: '#3b82f6',
      colorful: '#ff00cc'
    },
    background: {
      light: '#ffffff',
      dark: '#0a0a0a',
      colorful: '#050023'
    },
    foreground: {
      light: '#1f2937',
      dark: '#ededed',
      colorful: '#f0f8ff'
    },
    success: {
      light: '#059669',
      dark: '#10b981',
      colorful: '#34d399'
    },
    warning: {
      light: '#d97706',
      dark: '#f59e0b',
      colorful: '#fbbf24'
    },
    error: {
      light: '#dc2626',
      dark: '#ef4444',
      colorful: '#f87171'
    },
    info: {
      light: '#2563eb',
      dark: '#60a5fa',
      colorful: '#22d3ee'
    }
  },

  // Gradient combinations
  gradients: {
    // Same base color gradients
    blueShade: {
      light: 'linear-gradient(135deg, #dbeafe 0%, #1e40af 100%)',
      dark: 'linear-gradient(135deg, #1e40af 0%, #172554 100%)'
    },
    purpleShade: {
      light: 'linear-gradient(135deg, #e9d5ff 0%, #7c3aed 100%)',
      dark: 'linear-gradient(135deg, #7c3aed 0%, #3b0764 100%)'
    },
    
    // Different base color gradients
    blueToPurple: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
    cyanToMagenta: 'linear-gradient(135deg, #06b6d4 0%, #ec4899 100%)',
    
    // Theme-specific gradients
    hero: {
      light: 'radial-gradient(circle at 50% 50%, rgba(219, 234, 254, 1), rgba(255, 255, 255, 0.9))',
      dark: 'radial-gradient(circle at 50% 50%, rgba(30, 58, 138, 0.3), rgba(10, 10, 10, 0.95))',
      colorful: 'radial-gradient(circle at 50% 50%, rgba(128, 0, 255, 0.2), rgba(5, 0, 35, 0.95))'
    },
    
    primary: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
    cosmic: 'linear-gradient(135deg, #00ffff, #ff00cc, #3b82f6)'
  }
};

export type ColorScale = typeof colorTokens.blue;
export type ColorName = keyof typeof colorTokens;
export type ColorShade = keyof ColorScale;
