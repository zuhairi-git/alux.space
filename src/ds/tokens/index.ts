import { colorTokens } from './colors';
import { typographyTokens } from './typography';
import { spacingTokens } from './spacing';
import { shadowTokens } from './shadows';

// Interactive state tokens for all actionable components
export const interactionTokens = {
  // Button states
  button: {
    // Default state
    default: {
      background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))',
      color: 'white',
      border: 'none',
      shadow: shadowTokens.boxShadow.md,
      transform: 'translateY(0)',
      opacity: '1',
      cursor: 'pointer'
    },
    
    // Hover state
    hover: {
      background: 'linear-gradient(135deg, var(--primary-hover), var(--gradient-mid))',
      color: 'white',
      border: 'none',
      shadow: shadowTokens.boxShadow['button-hover'],
      transform: 'translateY(-2px)',
      opacity: '1',
      cursor: 'pointer'
    },
    
    // Focus state
    focus: {
      background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))',
      color: 'white',
      border: 'none',
      shadow: shadowTokens.boxShadow['focus-ring'],
      transform: 'translateY(0)',
      opacity: '1',
      cursor: 'pointer',
      outline: 'none'
    },
    
    // Active state
    active: {
      background: 'linear-gradient(135deg, var(--primary-hover), var(--gradient-end))',
      color: 'white',
      border: 'none',
      shadow: shadowTokens.boxShadow.sm,
      transform: 'translateY(1px)',
      opacity: '1',
      cursor: 'pointer'
    },
    
    // Disabled state
    disabled: {
      background: 'var(--gray-300)',
      color: 'var(--gray-500)',
      border: 'none',
      shadow: 'none',
      transform: 'translateY(0)',
      opacity: '0.6',
      cursor: 'not-allowed'
    }
  },

  // Secondary button variant
  buttonSecondary: {
    default: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '1px solid var(--primary)',
      shadow: 'none',
      transform: 'translateY(0)',
      opacity: '1',
      cursor: 'pointer'
    },
    hover: {
      background: 'var(--primary)',
      color: 'white',
      border: '1px solid var(--primary)',
      shadow: shadowTokens.boxShadow.md,
      transform: 'translateY(-1px)',
      opacity: '1',
      cursor: 'pointer'
    },
    focus: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '1px solid var(--primary)',
      shadow: shadowTokens.boxShadow['focus-ring'],
      transform: 'translateY(0)',
      opacity: '1',
      cursor: 'pointer',
      outline: 'none'
    },
    active: {
      background: 'var(--primary-hover)',
      color: 'white',
      border: '1px solid var(--primary-hover)',
      shadow: shadowTokens.boxShadow.sm,
      transform: 'translateY(1px)',
      opacity: '1',
      cursor: 'pointer'
    },
    disabled: {
      background: 'transparent',
      color: 'var(--gray-400)',
      border: '1px solid var(--gray-300)',
      shadow: 'none',
      transform: 'translateY(0)',
      opacity: '0.6',
      cursor: 'not-allowed'
    }
  },

  // Card states
  card: {
    default: {
      background: 'linear-gradient(to bottom right, var(--card-from-bg), var(--card-to-bg))',
      border: '1px solid var(--card-border)',
      shadow: shadowTokens.boxShadow.md,
      transform: 'translateY(0) scale(1)',
      opacity: '1',
      cursor: 'default'
    },
    hover: {
      background: 'linear-gradient(to bottom right, var(--card-from-bg), var(--card-to-bg))',
      border: '1px solid var(--card-border-hover)',
      shadow: shadowTokens.boxShadow.lg,
      transform: 'translateY(-2px) scale(1.02)',
      opacity: '1',
      cursor: 'pointer'
    },
    focus: {
      background: 'linear-gradient(to bottom right, var(--card-from-bg), var(--card-to-bg))',
      border: '1px solid var(--primary)',
      shadow: shadowTokens.boxShadow['focus-ring'],
      transform: 'translateY(0) scale(1)',
      opacity: '1',
      cursor: 'pointer',
      outline: 'none'
    },
    active: {
      background: 'linear-gradient(to bottom right, var(--card-from-bg), var(--card-to-bg))',
      border: '1px solid var(--card-border-hover)',
      shadow: shadowTokens.boxShadow.md,
      transform: 'translateY(1px) scale(0.98)',
      opacity: '1',
      cursor: 'pointer'
    }
  },

  // Input field states
  input: {
    default: {
      background: 'var(--background)',
      color: 'var(--foreground)',
      border: '1px solid var(--card-border)',
      shadow: shadowTokens.innerShadow.sm,
      transform: 'scale(1)',
      opacity: '1',
      cursor: 'text'
    },
    hover: {
      background: 'var(--background)',
      color: 'var(--foreground)',
      border: '1px solid var(--card-border-hover)',
      shadow: shadowTokens.innerShadow.sm,
      transform: 'scale(1)',
      opacity: '1',
      cursor: 'text'
    },
    focus: {
      background: 'var(--background)',
      color: 'var(--foreground)',
      border: '1px solid var(--primary)',
      shadow: shadowTokens.boxShadow['focus-ring'],
      transform: 'scale(1)',
      opacity: '1',
      cursor: 'text',
      outline: 'none'
    },
    disabled: {
      background: 'var(--gray-100)',
      color: 'var(--gray-400)',
      border: '1px solid var(--gray-300)',
      shadow: 'none',
      transform: 'scale(1)',
      opacity: '0.6',
      cursor: 'not-allowed'
    },
    error: {
      background: 'var(--background)',
      color: 'var(--foreground)',
      border: '1px solid var(--red-500)',
      shadow: '0 0 0 2px rgba(239, 68, 68, 0.1)',
      transform: 'scale(1)',
      opacity: '1',
      cursor: 'text'
    }
  },

  // Navigation link states
  navLink: {
    default: {
      color: 'var(--foreground)',
      background: 'transparent',
      textDecoration: 'none',
      opacity: '0.8',
      transform: 'translateX(0)',
      cursor: 'pointer'
    },
    hover: {
      color: 'var(--primary)',
      background: 'transparent',
      textDecoration: 'none',
      opacity: '1',
      transform: 'translateX(2px)',
      cursor: 'pointer'
    },
    focus: {
      color: 'var(--primary)',
      background: 'transparent',
      textDecoration: 'none',
      opacity: '1',
      transform: 'translateX(0)',
      cursor: 'pointer',
      outline: '2px solid var(--primary)',
      outlineOffset: '2px'
    },
    active: {
      color: 'var(--primary)',
      background: 'transparent',
      textDecoration: 'none',
      opacity: '1',
      transform: 'translateX(0)',
      cursor: 'pointer'
    }
  },

  // Tab states
  tab: {
    default: {
      background: 'transparent',
      color: 'var(--foreground)',
      border: 'none',
      borderBottom: '2px solid transparent',
      opacity: '0.7',
      transform: 'scale(1)',
      cursor: 'pointer'
    },
    hover: {
      background: 'var(--card-from-bg)',
      color: 'var(--foreground)',
      border: 'none',
      borderBottom: '2px solid var(--primary)',
      opacity: '0.9',
      transform: 'scale(1.02)',
      cursor: 'pointer'
    },
    focus: {
      background: 'transparent',
      color: 'var(--foreground)',
      border: 'none',
      borderBottom: '2px solid var(--primary)',
      opacity: '1',
      transform: 'scale(1)',
      cursor: 'pointer',
      outline: '2px solid var(--primary)',
      outlineOffset: '2px'
    },
    active: {
      background: 'var(--primary)',
      color: 'white',
      border: 'none',
      borderBottom: '2px solid var(--primary)',
      opacity: '1',
      transform: 'scale(1)',
      cursor: 'pointer'
    }
  },

  // Toggle/Switch states
  toggle: {
    off: {
      background: 'var(--gray-300)',
      transform: 'translateX(0)',
      opacity: '1',
      cursor: 'pointer'
    },
    on: {
      background: 'var(--primary)',
      transform: 'translateX(100%)',
      opacity: '1',
      cursor: 'pointer'
    },
    disabled: {
      background: 'var(--gray-200)',
      transform: 'translateX(0)',
      opacity: '0.5',
      cursor: 'not-allowed'
    }
  },

  // Dropdown states
  dropdown: {
    default: {
      background: 'var(--background)',
      border: '1px solid var(--card-border)',
      shadow: shadowTokens.boxShadow.dropdown,
      opacity: '0',
      visibility: 'hidden',
      transform: 'translateY(-10px) scale(0.95)',
      cursor: 'default'
    },
    open: {
      background: 'var(--background)',
      border: '1px solid var(--card-border)',
      shadow: shadowTokens.boxShadow.dropdown,
      opacity: '1',
      visibility: 'visible',
      transform: 'translateY(0) scale(1)',
      cursor: 'default'
    }
  },

  // Modal states
  modal: {
    backdrop: {
      background: 'rgba(0, 0, 0, 0.5)',
      opacity: '1',
      cursor: 'pointer'
    },
    content: {
      background: 'var(--background)',
      border: '1px solid var(--card-border)',
      shadow: shadowTokens.boxShadow['2xl'],
      transform: 'scale(1)',
      opacity: '1',
      cursor: 'default'
    }
  }
};

// Animation tokens
export const animationTokens = {
  // Duration
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms'
  },

  // Easing functions
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
    easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },

  // Common transitions
  transition: {
    default: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    shadow: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// Consolidated design tokens
export const designTokens = {
  colors: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  shadows: shadowTokens,
  interactions: interactionTokens,
  animations: animationTokens
};

export type InteractionState = 'default' | 'hover' | 'focus' | 'active' | 'disabled';
export type ComponentType = keyof typeof interactionTokens;
