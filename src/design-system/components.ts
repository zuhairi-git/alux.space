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
    path: 'src/components/ui/cards/SurfaceCard.tsx',
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
    path: 'src/components/ui/cards/CardContent.tsx',
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
      { name: 'number', type: 'number', default: 'undefined', description: 'Chapter number (optional if icon is provided)' },
      { name: 'icon', type: 'string', default: 'undefined', description: 'Material Symbols icon name (optional if number is provided)' },
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
    path: 'src/components/ui/cards/MediaCard.tsx',
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
    path: 'src/components/ui/cards/TimelineCard.tsx',
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
  {
    name: 'SurfaceCard',
    path: 'src/components/ui/cards/Card.tsx',
    category: 'composite',
    props: [
      { name: 'elevation', type: "'flat' | 'raised' | 'floating'", default: "'raised'", description: 'Visual elevation level. flat=borderless, raised=standard card, floating=raised + animated glow' },
      { name: 'glow', type: "'primary' | 'secondary' | 'tertiary' | 'muted'", default: "'primary'", description: 'Glow accent colour; only visible when elevation="floating"' },
      { name: 'className', type: 'string', default: 'undefined', description: 'Classes applied to the outermost element' },
      { name: 'contentClassName', type: 'string', default: 'undefined', description: 'Classes applied to the inner content element (raised/floating only)' },
      { name: 'children', type: 'React.ReactNode', default: 'required', description: 'Card content' },
    ],
    tokens: ['--surface-0', '--surface-1', '--surface-2', '--surface-border', '--surface-shadow-sm', '--surface-shadow-md', '--surface-shadow-lg', '--card-from-bg', '--card-to-bg', '--card-border'],
    a11y: [],
    variants: ['flat', 'raised', 'floating'],
  },
  {
    name: 'PortfolioCard',
    path: 'src/components/portfolio/PortfolioCard.tsx',
    category: 'composite',
    props: [
      { name: 'item', type: 'PortfolioItem', default: 'required', description: 'Portfolio item data (title, desc, link, gradient, status, tags, category, photo)' },
      { name: 'index', type: 'number', default: 'required', description: 'Card index for stagger animations' },
      { name: 'viewMode', type: "'standard' | 'overlay'", default: "'standard'", description: 'Card display mode; overlay renders a full-bleed image with text on top' },
    ],
    tokens: ['--primary', '--btn-primary-bg'],
    a11y: ['aria-label on interactive elements', 'role="article"'],
    variants: ['standard', 'overlay'],
  },
  {
    name: 'AudioCard',
    path: 'src/components/audio/AudioCard.tsx',
    category: 'composite',
    props: [
      { name: 'audio', type: 'AudioMetadata', default: 'required', description: 'Audio episode metadata' },
      { name: 'variant', type: "'grid' | 'list'", default: "'grid'", description: 'Layout orientation: grid = vertical card, list = horizontal row' },
      { name: 'showPlayButton', type: 'boolean', default: 'true', description: 'Show the play button overlay' },
      { name: 'className', type: 'string', default: "''", description: 'Additional CSS classes' },
    ],
    tokens: ['--primary', '--btn-primary-bg'],
    a11y: ['aria-label on play button', 'role="article"'],
    variants: ['grid', 'list'],
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
    tokens: ['--background', '--primary'],
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
    tokens: ['--gradient-start', '--gradient-mid', '--primary'],
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

  // ─── New Foundation Primitives ─────────────────────────
  {
    name: 'Text',
    path: 'src/components/ui/Text.tsx',
    category: 'primitive',
    props: [
      { name: 'variant', type: "'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-sm' | 'caption' | 'label' | 'overline'", default: "'body'", description: 'Typography scale variant; determines default HTML tag and styles' },
      { name: 'as', type: 'React.ElementType', default: 'variant default tag', description: 'Override the rendered HTML element' },
      { name: 'className', type: 'string', default: 'undefined', description: 'Additional CSS classes' },
      { name: 'id', type: 'string', default: 'undefined', description: 'HTML id attribute' },
      { name: 'children', type: 'React.ReactNode', default: 'required', description: 'Text content' },
    ],
    tokens: ['--text-hero', '--text-h1', '--text-h2', '--text-h3', '--text-h4', '--font-size-base', '--font-size-sm', '--font-size-xs', '--leading-tight', '--leading-snug', '--leading-normal', '--ls-tight', '--ls-wide', '--ls-wider', '--font-poppins'],
    a11y: ['Semantic HTML tag per variant', 'Respects heading hierarchy when variant is h1–h4'],
    variants: ['hero', 'h1', 'h2', 'h3', 'h4', 'body', 'body-sm', 'caption', 'label', 'overline'],
  },
  {
    name: 'Button',
    path: 'src/components/ui/Button.tsx',
    category: 'primitive',
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'tertiary' | 'icon' | 'ghost' | 'outline' | 'cosmic'", default: "'primary'", description: 'Button emphasis level. primary → filled; secondary → outlined; tertiary → text-only; icon → square icon button. ghost/outline are backward-compat aliases.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Button size (sm=h-8, md=h-9, lg=h-11). Icon variant applies equal square dimensions.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading spinner, replaces leftIcon' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
      { name: 'leftIcon', type: 'React.ReactNode', default: 'undefined', description: 'Icon before label' },
      { name: 'rightIcon', type: 'React.ReactNode', default: 'undefined', description: 'Icon after label' },
    ],
    tokens: ['--primary', '--primary-hover', '--foreground'],
    a11y: ['aria-disabled', 'aria-busy', 'focus-visible ring', 'select-none'],
    variants: ['primary', 'secondary', 'tertiary', 'icon', 'ghost', 'outline', 'cosmic'],
  },
  {
    name: 'Badge',
    path: 'src/components/ui/Badge.tsx',
    category: 'primitive',
    props: [
      { name: 'variant', type: "'default' | 'success' | 'warning' | 'error' | 'info' | 'outline'", default: "'default'", description: 'Badge color variant' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Badge size' },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Show status dot indicator' },
    ],
    tokens: ['--primary', '--radius-full', '--font-size-xs', '--color-success', '--color-success-bg', '--color-success-border', '--color-warning', '--color-warning-bg', '--color-warning-border', '--color-error', '--color-error-bg', '--color-error-border', '--color-info', '--color-info-bg', '--color-info-border'],
    a11y: ['role="status"'],
    variants: ['default', 'success', 'warning', 'error', 'info', 'outline'],
  },
  {
    name: 'Input',
    path: 'src/components/ui/Input.tsx',
    category: 'primitive',
    props: [
      { name: 'label', type: 'string', default: 'undefined', description: 'Input label text' },
      { name: 'helperText', type: 'string', default: 'undefined', description: 'Helper text below input' },
      { name: 'error', type: 'string', default: 'undefined', description: 'Error message (activates error state)' },
      { name: 'leftIcon', type: 'React.ReactNode', default: 'undefined', description: 'Icon inside left of input' },
      { name: 'rightIcon', type: 'React.ReactNode', default: 'undefined', description: 'Icon inside right of input' },
    ],
    tokens: ['--primary', '--radius-md', '--card-border', '--card-border-hover', '--foreground', '--background', '--color-error'],
    a11y: ['aria-invalid', 'aria-describedby', '<label> association', 'role="alert" for errors'],
    variants: [],
  },
  {
    name: 'Toggle',
    path: 'src/components/ui/Toggle.tsx',
    category: 'primitive',
    props: [
      { name: 'checked', type: 'boolean', default: 'required', description: 'Whether toggle is on' },
      { name: 'onChange', type: '(checked: boolean) => void', default: 'required', description: 'Change handler' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Toggle label' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the toggle' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Toggle size' },
    ],
    tokens: ['--primary', '--radius-full', '--card-border'],
    a11y: ['role="switch"', 'aria-checked', 'aria-label', 'keyboard Enter/Space'],
    variants: [],
  },
  {
    name: 'Avatar',
    path: 'src/components/ui/Avatar.tsx',
    category: 'primitive',
    props: [
      { name: 'src', type: 'string', default: 'undefined', description: 'Image source URL' },
      { name: 'alt', type: 'string', default: "''", description: 'Image alt text' },
      { name: 'initials', type: 'string', default: 'undefined', description: 'Initials fallback (max 2 chars)' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Avatar size' },
      { name: 'status', type: "'online' | 'offline' | 'away'", default: 'undefined', description: 'Status indicator' },
    ],
    tokens: ['--primary', '--radius-full', '--card-border', '--color-success', '--color-warning', '--color-gray-400'],
    a11y: ['alt text', 'role="img" for initials', 'aria-label for status'],
    variants: [],
  },
  {
    name: 'Divider',
    path: 'src/components/ui/Divider.tsx',
    category: 'primitive',
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Divider direction' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Centered label text' },
    ],
    tokens: ['--card-border', '--font-size-xs'],
    a11y: ['role="separator"', 'aria-orientation'],
    variants: [],
  },
  {
    name: 'Select',
    path: 'src/components/ui/Select.tsx',
    category: 'primitive',
    props: [
      { name: 'options', type: 'SelectOption[]', default: 'required', description: 'Array of {value, label, disabled?}' },
      { name: 'value', type: 'string', default: 'undefined', description: 'Currently selected value' },
      { name: 'onChange', type: '(value: string) => void', default: 'undefined', description: 'Selection change handler' },
      { name: 'placeholder', type: 'string', default: "'Select an option'", description: 'Placeholder text' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Field label' },
      { name: 'error', type: 'string', default: 'undefined', description: 'Error message' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the select' },
    ],
    tokens: ['--primary', '--card-border', '--card-border-hover', '--background', '--foreground', '--radius-md', '--radius-lg', '--z-dropdown', '--color-error'],
    a11y: ['role="combobox"', 'role="listbox"', 'aria-expanded', 'aria-selected', 'keyboard arrow/Enter/Escape'],
    variants: [],
  },
  {
    name: 'Modal',
    path: 'src/components/ui/Modal.tsx',
    category: 'composite',
    props: [
      { name: 'open', type: 'boolean', default: 'required', description: 'Whether modal is visible' },
      { name: 'onClose', type: '() => void', default: 'required', description: 'Close handler' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Modal header title' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Modal width' },
    ],
    tokens: ['--z-modal', '--background', '--card-border', '--foreground', '--radius-2xl', '--card-from-bg'],
    a11y: ['role="dialog"', 'aria-modal', 'aria-labelledby', 'focus trap', 'Escape key dismissal'],
    variants: ['sm', 'md', 'lg', 'full'],
  },
  {
    name: 'Tabs',
    path: 'src/components/ui/Tabs.tsx',
    category: 'composite',
    props: [
      { name: 'tabs', type: 'TabItem[]', default: 'required', description: 'Array of {key, label, icon?, content}' },
      { name: 'defaultTab', type: 'string', default: 'first tab key', description: 'Initially active tab' },
      { name: 'onChange', type: '(key: string) => void', default: 'undefined', description: 'Tab change handler' },
    ],
    tokens: ['--primary', '--card-border', '--foreground'],
    a11y: ['role="tablist"', 'role="tab"', 'role="tabpanel"', 'aria-selected', 'keyboard arrow/Home/End'],
    variants: [],
  },
  {
    name: 'Alert',
    path: 'src/components/ui/Alert.tsx',
    category: 'composite',
    props: [
      { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Alert style variant' },
      { name: 'title', type: 'string', default: 'undefined', description: 'Alert title' },
      { name: 'dismissible', type: 'boolean', default: 'false', description: 'Show dismiss button' },
      { name: 'onDismiss', type: '() => void', default: 'undefined', description: 'Dismiss callback' },
    ],
    tokens: ['--color-success', '--color-success-bg', '--color-success-border', '--color-warning', '--color-warning-bg', '--color-warning-border', '--color-error', '--color-error-bg', '--color-error-border', '--color-info', '--color-info-bg', '--color-info-border', '--radius-lg'],
    a11y: ['role="alert"', 'aria-live="assertive" (error)', 'aria-live="polite" (info)'],
    variants: ['info', 'success', 'warning', 'error'],
  },
  {
    name: 'Skeleton',
    path: 'src/components/ui/Skeleton.tsx',
    category: 'primitive',
    props: [
      { name: 'variant', type: "'text' | 'circular' | 'rectangular'", default: "'text'", description: 'Skeleton shape' },
      { name: 'width', type: 'string | number', default: 'undefined', description: 'Custom width' },
      { name: 'height', type: 'string | number', default: 'undefined', description: 'Custom height' },
      { name: 'lines', type: 'number', default: '1', description: 'Number of text lines (text variant)' },
    ],
    tokens: ['--card-from-bg', '--card-border', '--radius-sm', '--radius-lg'],
    a11y: ['role="status"', 'aria-busy="true"', 'aria-label="Loading"'],
    variants: ['text', 'circular', 'rectangular'],
  },
  {
    name: 'Progress',
    path: 'src/components/ui/Progress.tsx',
    category: 'primitive',
    props: [
      { name: 'value', type: 'number', default: 'required', description: 'Current progress value' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'variant', type: "'linear' | 'circular'", default: "'linear'", description: 'Progress style' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Bar/circle size' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Show percentage text' },
      { name: 'label', type: 'string', default: 'undefined', description: 'Accessible label' },
    ],
    tokens: ['--primary', '--card-border', '--foreground'],
    a11y: ['role="progressbar"', 'aria-valuenow', 'aria-valuemin', 'aria-valuemax', 'aria-label'],
    variants: ['linear', 'circular'],
  },
  {
    name: 'Breadcrumb',
    path: 'src/components/ui/Breadcrumb.tsx',
    category: 'primitive',
    props: [
      { name: 'items', type: 'BreadcrumbItem[]', default: 'required', description: 'Array of {label, href?}' },
      { name: 'separator', type: 'React.ReactNode', default: 'chevron icon', description: 'Custom separator element' },
    ],
    tokens: ['--primary', '--foreground'],
    a11y: ['nav with aria-label="Breadcrumb"', 'aria-current="page" on last item'],
    variants: [],
  },
  {
    name: 'MediaCardsShowcase',
    path: 'src/components/ui/cards/MediaCardsShowcase.tsx',
    category: 'composite',
    props: [],
    tokens: [],
    a11y: [],
    variants: [],
  },
  {
    name: 'TranslationBadge',
    path: 'src/components/ui/TranslationBadge.tsx',
    category: 'primitive',
    props: [],
    tokens: [],
    a11y: [],
    variants: [],
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
