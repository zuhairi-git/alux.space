/**
 * Component Registry — inventory of all design-system components.
 *
 * Each entry documents the component's props, token usage,
 * accessibility attributes, and available variants.
 * Used by the /design showcase page and serves as a living catalogue.
 */

export interface ComponentProp {
  name: string;
  type: string;
  default: string;
  description: string;
}

export interface ComponentEntry {
  name: string;
  path: string;
  category: 'primitive' | 'composite' | 'section' | 'a11y' | 'layout';
  props: ComponentProp[];
  tokens: string[];
  a11y: string[];
  variants: string[];
}

export const componentRegistry: ComponentEntry[] = [
  // ─── Primitives ─────────────────────────────────────────
  {
    name: 'Icon',
    path: 'src/components/ui/Icon.tsx',
    category: 'primitive',
    props: [
      { name: 'name', type: 'string', default: 'required', description: 'Material Symbols icon name' },
      { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
    ],
    tokens: ['--material-symbols'],
    a11y: [],
    variants: [],
  },
  {
    name: 'MaterialSymbol',
    path: 'src/components/ui/MaterialSymbol.tsx',
    category: 'primitive',
    props: [
      { name: 'name', type: 'string', default: 'required', description: 'Material Symbols icon name' },
      { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
    ],
    tokens: ['--material-symbols'],
    a11y: [],
    variants: [],
  },
  {
    name: 'Tooltip',
    path: 'src/components/ui/Tooltip.tsx',
    category: 'primitive',
    props: [
      { name: 'text', type: 'string', default: 'required', description: 'Tooltip text content' },
      { name: 'children', type: 'React.ReactNode', default: 'required', description: 'Trigger element' },
      { name: 'className', type: 'string', default: "''", description: 'Container CSS classes' },
      { name: 'id', type: 'string', default: 'undefined', description: 'Tooltip ID for aria-describedby' },
    ],
    tokens: [],
    a11y: ['role="tooltip"', 'aria-describedby', 'aria-expanded', 'aria-hidden', 'Escape key dismissal'],
    variants: ['top', 'bottom', 'left', 'right'],
  },

  // ─── Composite ──────────────────────────────────────────
  {
    name: 'Card',
    path: 'src/components/Card.tsx',
    category: 'composite',
    props: [
      { name: 'children', type: 'React.ReactNode', default: 'required', description: 'Content inside the card' },
      { name: 'variant', type: "'primary' | 'secondary' | 'tertiary' | 'muted'", default: "'primary'", description: 'Card style variant' },
      { name: 'hoverEffect', type: 'boolean', default: 'true', description: 'Enable hover scale animation' },
      { name: 'slideDirection', type: "'left' | 'right' | null", default: 'null', description: 'Slide direction on scroll' },
      { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
    ],
    tokens: ['--primary', '--primary-glow', '--card-shadow-color', '--card-from-bg', '--card-to-bg', '--card-border', '--card-border-hover'],
    a11y: [],
    variants: ['primary', 'secondary', 'tertiary', 'muted'],
  },
  {
    name: 'CardContent',
    path: 'src/components/CardContent.tsx',
    category: 'composite',
    props: [
      { name: 'icon', type: 'React.ReactNode', default: 'undefined', description: 'Icon element' },
      { name: 'title', type: 'string', default: 'required', description: 'Card title' },
      { name: 'subtitle', type: 'string', default: 'undefined', description: 'Subtitle text' },
      { name: 'location', type: 'string', default: 'undefined', description: 'Location text with icon' },
      { name: 'date', type: 'string', default: 'undefined', description: 'Date with schedule icon' },
      { name: 'children', type: 'React.ReactNode', default: 'undefined', description: 'Additional content' },
    ],
    tokens: ['--primary'],
    a11y: [],
    variants: [],
  },
  {
    name: 'QuoteBlock',
    path: 'src/components/ui/QuoteBlock.tsx',
    category: 'composite',
    props: [
      { name: 'quote', type: 'string', default: 'required', description: 'Quote text' },
      { name: 'author', type: 'string', default: 'undefined', description: 'Quote author' },
      { name: 'variant', type: "'default' | 'simple' | 'minimal'", default: 'auto-determined', description: 'Quote styling variant' },
      { name: 'cite', type: 'string', default: 'undefined', description: 'Citation URL' },
      { name: 'lang', type: 'string', default: 'undefined', description: 'Quote language' },
    ],
    tokens: ['--primary'],
    a11y: ['role="region"', 'aria-label="Quote"', 'blockquote element', 'cite element'],
    variants: ['default', 'simple', 'minimal'],
  },
  {
    name: 'ChapterDivider',
    path: 'src/components/ui/ChapterDivider.tsx',
    category: 'composite',
    props: [
      { name: 'title', type: 'string', default: 'required', description: 'Chapter title' },
      { name: 'number', type: 'number', default: 'required', description: 'Chapter number' },
      { name: 'id', type: 'string', default: 'auto-generated', description: 'Section ID for linking' },
    ],
    tokens: [],
    a11y: [],
    variants: [],
  },
  {
    name: 'CodeSnippet',
    path: 'src/components/CodeSnippet.tsx',
    category: 'composite',
    props: [
      { name: 'code', type: 'string', default: 'required', description: 'Code content' },
      { name: 'language', type: 'string', default: "'jsx'", description: 'Language label' },
    ],
    tokens: [],
    a11y: [],
    variants: [],
  },
  {
    name: 'ImageSection',
    path: 'src/components/ui/ImageSection.tsx',
    category: 'composite',
    props: [
      { name: 'src', type: 'string', default: 'required', description: 'Image source URL' },
      { name: 'alt', type: 'string', default: 'required', description: 'Alt text' },
      { name: 'caption', type: 'string', default: 'undefined', description: 'Image caption' },
      { name: 'aspectRatio', type: "'square' | 'wide' | 'tall'", default: "'wide'", description: 'Image aspect ratio' },
    ],
    tokens: [],
    a11y: [],
    variants: ['square', 'wide', 'tall'],
  },
  {
    name: 'MediaCard',
    path: 'src/components/ui/MediaCard.tsx',
    category: 'composite',
    props: [
      { name: 'variant', type: "'basic' | 'overlay' | 'horizontal'", default: "'basic'", description: 'Card layout variant' },
      { name: 'title', type: 'string', default: 'required', description: 'Card title' },
      { name: 'description', type: 'string', default: 'required', description: 'Card description' },
      { name: 'imagePath', type: 'string', default: 'required', description: 'Image path' },
      { name: 'tags', type: 'string[]', default: 'undefined', description: 'Tag labels' },
      { name: 'date', type: 'string', default: 'undefined', description: 'Display date' },
      { name: 'link', type: 'string', default: 'undefined', description: 'Card link URL' },
    ],
    tokens: [],
    a11y: [],
    variants: ['basic', 'overlay', 'horizontal'],
  },
  {
    name: 'TimelineCard',
    path: 'src/components/TimelineCard.tsx',
    category: 'composite',
    props: [
      { name: 'materialIcon', type: 'React.ElementType', default: 'undefined', description: 'MUI icon component' },
      { name: 'title', type: 'string', default: 'required', description: 'Card title' },
      { name: 'date', type: 'string', default: 'required', description: 'Date label' },
      { name: 'location', type: 'string', default: 'required', description: 'Location text' },
      { name: 'description', type: 'string', default: 'required', description: 'Card description' },
      { name: 'theme', type: "'light' | 'dark' | 'colorful'", default: 'required', description: 'Theme variant' },
    ],
    tokens: [],
    a11y: ['role="article"', 'aria-label', 'tabIndex=0', 'keyboard Enter/Space toggle'],
    variants: [],
  },
  {
    name: 'BlogCard',
    path: 'src/components/blog/BlogCard.tsx',
    category: 'composite',
    props: [
      { name: 'post', type: 'BlogPost', default: 'required', description: 'Blog post data' },
      { name: 'index', type: 'number', default: 'required', description: 'Card index for analytics' },
      { name: 'viewMode', type: "'standard' | 'overlay' | 'featured'", default: "'standard'", description: 'Card display mode' },
    ],
    tokens: ['--primary'],
    a11y: ['role="article"', 'aria-labelledby', 'aria-describedby', '<time> with dateTime'],
    variants: ['standard', 'overlay', 'featured'],
  },

  // ─── Section-level ──────────────────────────────────────
  {
    name: 'Hero',
    path: 'src/components/hero/Hero.tsx',
    category: 'section',
    props: [
      { name: 'config', type: 'HeroConfig', default: 'required', description: 'Hero configuration object' },
    ],
    tokens: ['--gradient-start', '--gradient-mid', '--gradient-end'],
    a11y: ['role="banner"', 'aria-label="Hero section"'],
    variants: ['default', 'minimal', 'creative', 'design', 'unified'],
  },
  {
    name: 'Navigation',
    path: 'src/components/Navigation.tsx',
    category: 'section',
    props: [],
    tokens: ['--nav-bg', '--nav-border', '--primary'],
    a11y: ['aria-label', 'aria-haspopup', 'aria-expanded', 'keyboard navigation'],
    variants: [],
  },
  {
    name: 'Footer',
    path: 'src/components/Footer.tsx',
    category: 'section',
    props: [],
    tokens: ['--primary', '--background'],
    a11y: ['role="contentinfo"', 'aria-label'],
    variants: [],
  },
  {
    name: 'AnimatedSection',
    path: 'src/components/AnimatedSection.tsx',
    category: 'section',
    props: [
      { name: 'animation', type: "'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'", default: "'fade-in'", description: 'Animation type' },
      { name: 'delay', type: 'number', default: '0', description: 'Delay (seconds)' },
      { name: 'duration', type: 'number', default: '0.45', description: 'Duration (seconds)' },
      { name: 'once', type: 'boolean', default: 'true', description: 'Animate only once' },
      { name: 'role', type: 'string', default: 'undefined', description: 'ARIA role' },
    ],
    tokens: [],
    a11y: ['role attribute', 'aria-label'],
    variants: ['fade-in', 'slide-up', 'slide-down', 'slide-left', 'slide-right'],
  },
  {
    name: 'PodcastPlayer',
    path: 'src/components/PodcastPlayer.tsx',
    category: 'section',
    props: [
      { name: 'initialEpisodeId', type: 'string', default: 'undefined', description: 'Episode ID to start with' },
    ],
    tokens: ['--primary', '--background'],
    a11y: ['ARIA labels on controls', 'Live region announcements', 'Keyboard support'],
    variants: [],
  },
  {
    name: 'AudioPlayer',
    path: 'src/components/ui/AudioPlayer.tsx',
    category: 'section',
    props: [
      { name: 'src', type: 'string', default: 'required', description: 'Audio file URL' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Audio title' },
      { name: 'category', type: 'string', default: 'undefined', description: 'Audio category' },
      { name: 'language', type: "'en' | 'fi' | 'ar'", default: "'en'", description: 'Audio language' },
    ],
    tokens: ['--primary', '--background', '--foreground'],
    a11y: ['ARIA labels on controls', 'Live region announcements', 'Keyboard support'],
    variants: [],
  },

  // ─── Accessibility ──────────────────────────────────────
  {
    name: 'SkipLinks',
    path: 'src/components/ui/SkipLinks.tsx',
    category: 'a11y',
    props: [
      { name: 'links', type: 'Array<{href, label}>', default: 'defaultLinks', description: 'Skip link definitions' },
    ],
    tokens: [],
    a11y: ['aria-label="Skip navigation links"', 'sr-only → visible on focus'],
    variants: [],
  },
  {
    name: 'FocusTrap',
    path: 'src/components/ui/FocusTrap.tsx',
    category: 'a11y',
    props: [
      { name: 'active', type: 'boolean', default: 'required', description: 'Trap activation' },
      { name: 'restoreFocus', type: 'boolean', default: 'true', description: 'Restore focus on deactivation' },
      { name: 'initialFocus', type: 'string | HTMLElement', default: 'undefined', description: 'Initial focus target' },
    ],
    tokens: [],
    a11y: ['Tab/Shift+Tab trapping', 'Focus restoration'],
    variants: [],
  },
  {
    name: 'LiveRegion',
    path: 'src/components/ui/LiveRegion.tsx',
    category: 'a11y',
    props: [
      { name: 'message', type: 'string', default: 'required', description: 'Announcement message' },
      { name: 'priority', type: "'polite' | 'assertive'", default: "'polite'", description: 'Politeness level' },
      { name: 'clearDelay', type: 'number', default: '5000', description: 'Clear after (ms)' },
    ],
    tokens: [],
    a11y: ['aria-live', 'aria-atomic="true"', 'role="status"'],
    variants: [],
  },
  {
    name: 'BackToTop',
    path: 'src/components/ui/BackToTop.tsx',
    category: 'a11y',
    props: [],
    tokens: [],
    a11y: ['aria-label', 'keyboard Enter/Space', 'LiveRegion announcements'],
    variants: [],
  },

  // ─── Layout / Providers ─────────────────────────────────
  {
    name: 'ThemeSwitch',
    path: 'src/components/ThemeSwitch.tsx',
    category: 'layout',
    props: [],
    tokens: [],
    a11y: ['aria-label', 'aria-pressed', 'role="status" via LiveRegion'],
    variants: ['light', 'dark', 'colorful'],
  },
  {
    name: 'SmoothMotionProvider',
    path: 'src/components/SmoothMotionProvider.tsx',
    category: 'layout',
    props: [
      { name: 'children', type: 'React.ReactNode', default: 'required', description: 'Wrapped content' },
    ],
    tokens: [],
    a11y: [],
    variants: [],
  },
  {
    name: 'MotionWrapper',
    path: 'src/components/ui/MotionWrapper.tsx',
    category: 'layout',
    props: [
      { name: '...props', type: 'HTMLMotionProps<T>', default: 'varies', description: 'Motion props forwarded' },
    ],
    tokens: [],
    a11y: [],
    variants: ['MotionDiv', 'MotionSection', 'MotionSpan', 'MotionP', 'MotionH1', 'MotionH2', 'MotionH3', 'MotionButton', 'MotionA', 'MotionImg'],
  },
];

/** Lookup a component by name */
export function getComponent(name: string): ComponentEntry | undefined {
  return componentRegistry.find(c => c.name === name);
}

/** Get all components in a category */
export function getByCategory(category: ComponentEntry['category']): ComponentEntry[] {
  return componentRegistry.filter(c => c.category === category);
}
