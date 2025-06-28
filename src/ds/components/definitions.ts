// Design System Component Definitions
// This file defines the structure and variants of all UI components used in the website

export interface ComponentDefinition {
  name: string;
  description: string;
  variants: ComponentVariant[];
  states: ComponentState[];
  usage: ComponentUsage;
  accessibility: AccessibilityFeatures;
}

export interface ComponentVariant {
  name: string;
  description: string;
  props?: Record<string, unknown>;
}

export interface ComponentState {
  name: 'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading' | 'error' | 'success' | 'warning';
  description: string;
}

export interface ComponentUsage {
  when: string;
  avoid: string;
  examples: string[];
}

export interface AccessibilityFeatures {
  keyboardNavigation: boolean;
  screenReaderSupport: boolean;
  ariaLabels: string[];
  focusManagement: boolean;
}

export const componentDefinitions: Record<string, ComponentDefinition> = {
  // BUTTONS
  Button: {
    name: 'Button',
    description: 'Primary action component with multiple variants and states',
    variants: [
      {
        name: 'primary',
        description: 'Main call-to-action button with gradient background',
        props: { variant: 'primary', size: 'md' }
      },
      {
        name: 'secondary',
        description: 'Secondary action button with border and transparent background',
        props: { variant: 'secondary', size: 'md' }
      },
      {
        name: 'ghost',
        description: 'Minimal button with no background or border',
        props: { variant: 'ghost', size: 'md' }
      },
      {
        name: 'cosmic',
        description: 'Animated gradient button for special actions',
        props: { variant: 'cosmic', size: 'md' }
      }
    ],
    states: [
      { name: 'default', description: 'Normal button state' },
      { name: 'hover', description: 'Elevated with subtle transform and enhanced shadow' },
      { name: 'focus', description: 'Focus ring with keyboard accessibility' },
      { name: 'active', description: 'Pressed state with scale down effect' },
      { name: 'disabled', description: 'Grayed out and non-interactive' },
      { name: 'loading', description: 'Shows spinner and prevents interaction' }
    ],
    usage: {
      when: 'For primary actions, form submissions, navigation, and calls-to-action',
      avoid: 'Don\'t use too many primary buttons on one page',
      examples: ['Submit forms', 'Navigate to important pages', 'Trigger modal dialogs', 'Confirm actions']
    },
    accessibility: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: ['aria-label', 'aria-describedby', 'aria-pressed'],
      focusManagement: true
    }
  },

  // CARDS
  Card: {
    name: 'Card',
    description: 'Container component with theme-aware styling and elevation',
    variants: [
      {
        name: 'primary',
        description: 'Default card with primary theme colors',
        props: { variant: 'primary' }
      },
      {
        name: 'secondary',
        description: 'Card with secondary theme colors',
        props: { variant: 'secondary' }
      },
      {
        name: 'tertiary',
        description: 'Card with tertiary theme colors',
        props: { variant: 'tertiary' }
      },
      {
        name: 'muted',
        description: 'Subdued card with muted colors',
        props: { variant: 'muted' }
      }
    ],
    states: [
      { name: 'default', description: 'Normal card appearance' },
      { name: 'hover', description: 'Elevated with enhanced border and shadow' },
      { name: 'focus', description: 'Focus outline for keyboard navigation' },
      { name: 'active', description: 'Slightly pressed appearance' }
    ],
    usage: {
      when: 'For grouping related content, displaying items in grids, containing interactive elements',
      avoid: 'Don\'t nest cards too deeply or use for single elements',
      examples: ['Portfolio items', 'Blog post previews', 'Feature highlights', 'User profiles']
    },
    accessibility: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: ['aria-label', 'role'],
      focusManagement: true
    }
  },

  // NAVIGATION
  Navigation: {
    name: 'Navigation',
    description: 'Main navigation component with responsive behavior and dropdown support',
    variants: [
      {
        name: 'desktop',
        description: 'Horizontal navigation for desktop screens',
        props: { mode: 'desktop' }
      },
      {
        name: 'mobile',
        description: 'Collapsible navigation for mobile screens',
        props: { mode: 'mobile' }
      },
      {
        name: 'dropdown',
        description: 'Dropdown menu for nested navigation items',
        props: { mode: 'dropdown' }
      }
    ],
    states: [
      { name: 'default', description: 'Normal navigation state' },
      { name: 'hover', description: 'Link hover effects with color changes' },
      { name: 'focus', description: 'Keyboard focus indicators' },
      { name: 'active', description: 'Currently active page indicator' }
    ],
    usage: {
      when: 'For main site navigation, page sections, and hierarchical content',
      avoid: 'Don\'t create too many nested levels or overcrowd with links',
      examples: ['Main site navigation', 'Portfolio categories', 'Page sections', 'Language switching']
    },
    accessibility: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: ['aria-expanded', 'aria-label', 'role="navigation"', 'aria-current'],
      focusManagement: true
    }
  },

  // INPUTS
  Input: {
    name: 'Input',
    description: 'Form input component with validation and theme support',
    variants: [
      {
        name: 'text',
        description: 'Standard text input field',
        props: { type: 'text', size: 'md' }
      },
      {
        name: 'email',
        description: 'Email input with built-in validation',
        props: { type: 'email', size: 'md' }
      },
      {
        name: 'search',
        description: 'Search input with icon support',
        props: { type: 'search', size: 'md' }
      },
      {
        name: 'textarea',
        description: 'Multi-line text input',
        props: { type: 'textarea', size: 'md' }
      }
    ],
    states: [
      { name: 'default', description: 'Normal input state' },
      { name: 'hover', description: 'Subtle border color change on hover' },
      { name: 'focus', description: 'Enhanced border and focus ring' },
      { name: 'disabled', description: 'Grayed out and non-interactive' },
      { name: 'error', description: 'Red border and error styling' },
      { name: 'success', description: 'Green border indicating valid input' }
    ],
    usage: {
      when: 'For collecting user input, search functionality, and form fields',
      avoid: 'Don\'t use without proper labels and validation feedback',
      examples: ['Contact forms', 'Search bars', 'Comment sections', 'User registration']
    },
    accessibility: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: ['aria-label', 'aria-describedby', 'aria-invalid', 'aria-required'],
      focusManagement: true
    }
  },

  // MODALS
  Modal: {
    name: 'Modal',
    description: 'Overlay component for focused interactions and important information',
    variants: [
      {
        name: 'dialog',
        description: 'Standard modal dialog for user interactions',
        props: { variant: 'dialog', size: 'md' }
      },
      {
        name: 'fullscreen',
        description: 'Full-screen modal for immersive content',
        props: { variant: 'fullscreen' }
      },
      {
        name: 'drawer',
        description: 'Side drawer modal for navigation or secondary content',
        props: { variant: 'drawer', position: 'right' }
      }
    ],
    states: [
      { name: 'default', description: 'Closed modal state' },
      { name: 'active', description: 'Open modal with backdrop and focus trap' }
    ],
    usage: {
      when: 'For confirmations, detailed views, forms, and important notifications',
      avoid: 'Don\'t use for non-essential content or stack multiple modals',
      examples: ['Confirmation dialogs', 'Image galleries', 'Settings panels', 'User profiles']
    },
    accessibility: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: ['aria-modal', 'aria-labelledby', 'aria-describedby', 'role="dialog"'],
      focusManagement: true
    }
  },

  // TABS
  Tabs: {
    name: 'Tabs',
    description: 'Tab navigation component for organizing content sections',
    variants: [
      {
        name: 'horizontal',
        description: 'Horizontal tab layout',
        props: { orientation: 'horizontal' }
      },
      {
        name: 'vertical',
        description: 'Vertical tab layout for sidebar navigation',
        props: { orientation: 'vertical' }
      },
      {
        name: 'pills',
        description: 'Pill-style tabs with rounded appearance',
        props: { variant: 'pills' }
      }
    ],
    states: [
      { name: 'default', description: 'Inactive tab state' },
      { name: 'hover', description: 'Tab hover effect' },
      { name: 'focus', description: 'Keyboard focus indicator' },
      { name: 'active', description: 'Currently selected tab' }
    ],
    usage: {
      when: 'For organizing related content into sections, settings pages, dashboard views',
      avoid: 'Don\'t use too many tabs or for unrelated content',
      examples: ['Portfolio sections', 'User settings', 'Dashboard views', 'Content categories']
    },
    accessibility: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: ['role="tablist"', 'role="tab"', 'aria-selected', 'aria-controls'],
      focusManagement: true
    }
  },

  // DROPDOWNS
  Dropdown: {
    name: 'Dropdown',
    description: 'Contextual menu component with smart positioning',
    variants: [
      {
        name: 'menu',
        description: 'Standard dropdown menu',
        props: { variant: 'menu' }
      },
      {
        name: 'select',
        description: 'Select dropdown for form inputs',
        props: { variant: 'select' }
      },
      {
        name: 'context',
        description: 'Context menu for right-click actions',
        props: { variant: 'context' }
      }
    ],
    states: [
      { name: 'default', description: 'Closed dropdown state' },
      { name: 'hover', description: 'Trigger button hover state' },
      { name: 'focus', description: 'Keyboard focus on trigger' },
      { name: 'active', description: 'Open dropdown with menu visible' }
    ],
    usage: {
      when: 'For secondary actions, option selection, and contextual menus',
      avoid: 'Don\'t use for primary actions or hide important functionality',
      examples: ['User menus', 'Language selection', 'Filter options', 'More actions']
    },
    accessibility: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: ['aria-haspopup', 'aria-expanded', 'role="menu"', 'role="menuitem"'],
      focusManagement: true
    }
  },

  // TOOLTIPS
  Tooltip: {
    name: 'Tooltip',
    description: 'Contextual help component with smart positioning',
    variants: [
      {
        name: 'info',
        description: 'Informational tooltip',
        props: { variant: 'info' }
      },
      {
        name: 'warning',
        description: 'Warning tooltip for caution',
        props: { variant: 'warning' }
      },
      {
        name: 'error',
        description: 'Error tooltip for validation',
        props: { variant: 'error' }
      }
    ],
    states: [
      { name: 'default', description: 'Hidden tooltip state' },
      { name: 'hover', description: 'Visible tooltip on hover' },
      { name: 'focus', description: 'Visible tooltip on keyboard focus' }
    ],
    usage: {
      when: 'For providing additional context, help text, and explanations',
      avoid: 'Don\'t use for essential information or on mobile devices',
      examples: ['Icon explanations', 'Form field help', 'Feature descriptions', 'Button clarifications']
    },
    accessibility: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: ['aria-describedby', 'role="tooltip"'],
      focusManagement: false
    }
  },

  // BADGES
  Badge: {
    name: 'Badge',
    description: 'Small status indicator component',
    variants: [
      {
        name: 'status',
        description: 'Status badge for indicating states',
        props: { variant: 'status' }
      },
      {
        name: 'count',
        description: 'Count badge for numbers',
        props: { variant: 'count' }
      },
      {
        name: 'tag',
        description: 'Tag badge for categorization',
        props: { variant: 'tag' }
      }
    ],
    states: [
      { name: 'default', description: 'Normal badge appearance' },
      { name: 'success', description: 'Green badge for positive states' },
      { name: 'warning', description: 'Yellow badge for caution' },
      { name: 'error', description: 'Red badge for errors' }
    ],
    usage: {
      when: 'For status indicators, counts, tags, and small labels',
      avoid: 'Don\'t use for primary content or large amounts of text',
      examples: ['Project status', 'Notification counts', 'Technology tags', 'User roles']
    },
    accessibility: {
      keyboardNavigation: false,
      screenReaderSupport: true,
      ariaLabels: ['aria-label'],
      focusManagement: false
    }
  },

  // BREADCRUMBS
  Breadcrumb: {
    name: 'Breadcrumb',
    description: 'Navigation aid showing page hierarchy',
    variants: [
      {
        name: 'default',
        description: 'Standard breadcrumb navigation',
        props: { separator: 'chevron' }
      },
      {
        name: 'slash',
        description: 'Breadcrumb with slash separators',
        props: { separator: 'slash' }
      }
    ],
    states: [
      { name: 'default', description: 'Normal breadcrumb state' },
      { name: 'hover', description: 'Link hover effects' },
      { name: 'focus', description: 'Keyboard focus indicators' },
      { name: 'active', description: 'Current page indicator' }
    ],
    usage: {
      when: 'For deep navigation structures and showing page location',
      avoid: 'Don\'t use for shallow sites or single-level navigation',
      examples: ['Portfolio categories', 'Blog categories', 'Multi-step processes']
    },
    accessibility: {
      keyboardNavigation: true,
      screenReaderSupport: true,
      ariaLabels: ['aria-label', 'aria-current'],
      focusManagement: true
    }
  },

  // PROGRESS INDICATORS
  Progress: {
    name: 'Progress',
    description: 'Progress indicator for loading states and completion',
    variants: [
      {
        name: 'linear',
        description: 'Linear progress bar',
        props: { variant: 'linear' }
      },
      {
        name: 'circular',
        description: 'Circular progress indicator',
        props: { variant: 'circular' }
      },
      {
        name: 'steps',
        description: 'Step-by-step progress indicator',
        props: { variant: 'steps' }
      }
    ],
    states: [
      { name: 'default', description: 'Normal progress state' },
      { name: 'loading', description: 'Indeterminate loading state' }
    ],
    usage: {
      when: 'For showing loading states, form completion, and multi-step processes',
      avoid: 'Don\'t use for instantaneous actions',
      examples: ['File uploads', 'Form completion', 'Page loading', 'Multi-step wizards']
    },
    accessibility: {
      keyboardNavigation: false,
      screenReaderSupport: true,
      ariaLabels: ['role="progressbar"', 'aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
      focusManagement: false
    }
  }
};

export type ComponentName = keyof typeof componentDefinitions;
