'use client';

import React from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'display';
export type IconVariant = 'outline' | 'filled';
/** decorative: aria-hidden="true" | standalone: renders aria-label, requires label prop */
export type IconPurpose = 'decorative' | 'standalone';
export type IconSurfaceSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconTone = 'current' | 'default' | 'muted' | 'primary' | 'accent' | 'inverse';
export type IconSurfaceTone = 'neutral' | 'primary' | 'accent' | 'inverse';
type IconSurfaceShape = 'square' | 'circle';

export interface IconProps {
  /** Semantic icon name (legacy Material Symbols naming, translated to Font Awesome glyphs) */
  name: string;
  /** Semantic size token */
  size?: IconSize;
  /** Duotone layer balance: 'outline' (default contrast) or 'filled' (swapped/heavier layers) */
  variant?: IconVariant;
  /** Accessibility behaviour. Default: 'decorative' (aria-hidden="true") */
  purpose?: IconPurpose;
  /** Theme-resolved semantic icon color */
  tone?: IconTone;
  /** Required when purpose="standalone" */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Maps the site's existing semantic icon names (carried over from Material Symbols)
 * to their closest Font Awesome 7 "Duotone" glyph names. Lets every call site
 * keep using the same `name` values while the rendered glyph set is Font Awesome.
 */
const materialToFontAwesome: Record<string, string> = {
  account_tree: 'sitemap',
  add: 'plus',
  android: 'mobile-android',
  apps: 'grid-2',
  arrow_back: 'arrow-left',
  arrow_forward: 'arrow-right',
  arrow_upward: 'arrow-up',
  attach_file: 'paperclip',
  auto_awesome: 'sparkles',
  autorenew: 'arrows-rotate',
  bar_chart: 'chart-column',
  blur_on: 'circle-nodes',
  bolt: 'bolt',
  bookmark: 'bookmark',
  calendar_today: 'calendar-day',
  category: 'tags',
  celebration: 'party-horn',
  check: 'check',
  check_circle: 'circle-check',
  chevron_left: 'chevron-left',
  chevron_right: 'chevron-right',
  close: 'xmark',
  colors: 'swatchbook',
  content_copy: 'copy',
  contrast: 'circle-half-stroke',
  crop_square: 'square',
  dark_mode: 'moon',
  deployed_code: 'box-open',
  description: 'file-lines',
  download: 'download',
  edit: 'pen',
  edit_document: 'file-pen',
  event: 'calendar-days',
  event_available: 'calendar-check',
  expand_more: 'chevron-down',
  explore: 'compass',
  format_quote: 'quote-left',
  grid_view: 'table-cells',
  groups: 'users',
  history: 'clock-rotate-left',
  home: 'house',
  info: 'circle-info',
  insights: 'chart-line',
  ios: 'mobile-iphone',
  ios_share: 'arrow-up-from-bracket',
  keyboard_arrow_down: 'chevron-down',
  laptop_windows: 'laptop',
  light_mode: 'sun',
  lightbulb: 'lightbulb',
  location_on: 'location-dot',
  mail: 'envelope',
  menu: 'bars',
  mic_off: 'microphone-slash',
  more_vert: 'ellipsis-vertical',
  notes: 'note',
  notifications: 'bell',
  open_in_new: 'arrow-up-right-from-square',
  palette: 'palette',
  payments: 'money-bill-wave',
  person_add: 'user-plus',
  photo_size_select_large: 'expand',
  play_arrow: 'play',
  podcasts: 'podcast',
  psychology: 'brain',
  queue_music: 'list-music',
  refresh: 'arrows-rotate',
  rocket_launch: 'rocket',
  route: 'route',
  routine: 'calendar-clock',
  schedule: 'clock',
  search: 'magnifying-glass',
  search_insights: 'magnifying-glass-chart',
  search_off: 'magnifying-glass-minus',
  send: 'paper-plane',
  settings: 'gear',
  share: 'share-nodes',
  shopping_bag: 'bag-shopping',
  skip_next: 'forward-step',
  skip_previous: 'backward-step',
  smart_toy: 'robot',
  stack_star: 'stars',
  star: 'star',
  stop: 'stop',
  swipe: 'hand-pointer',
  task_alt: 'square-check',
  thumb_down: 'thumbs-down',
  thumb_up: 'thumbs-up',
  tips_and_updates: 'lightbulb-on',
  token: 'coins',
  travel_explore: 'earth-americas',
  trending_up: 'arrow-trend-up',
  verified: 'badge-check',
  warning: 'triangle-exclamation',
  waving_hand: 'hand-wave',
  work: 'briefcase',
  work_history: 'briefcase-clock',

  // Additional names used by raw `material-symbols` spans and design-system catalogs
  accessibility: 'universal-access',
  accessibility_new: 'universal-access',
  account_circle: 'circle-user',
  add_circle: 'circle-plus',
  add_comment: 'comment-plus',
  ads_click: 'hand-pointer',
  analytics: 'chart-mixed',
  animation: 'film',
  architecture: 'drafting-compass',
  archive: 'box-archive',
  arrow_drop_down_circle: 'circle-chevron-down',
  article: 'newspaper',
  audio_file: 'file-audio',
  auto_stories: 'book-open',
  badge: 'id-badge',
  blur_circular: 'circle-half-stroke',
  branding_watermark: 'stamp',
  bug_report: 'bug',
  build: 'screwdriver-wrench',
  business: 'building',
  calendar_month: 'calendar-days',
  campaign: 'bullhorn',
  candlestick_chart: 'chart-candlestick',
  card_membership: 'id-card',
  chat: 'comments',
  chat_bubble: 'comment',
  check_box_outline_blank: 'square',
  checklist: 'list-check',
  clear: 'xmark',
  clock: 'stopwatch',
  code: 'code',
  collections_bookmark: 'book-bookmark',
  color_lens: 'palette',
  compare: 'code-compare',
  construction: 'person-digging',
  dashboard: 'gauge',
  delete_sweep: 'broom',
  design_services: 'pen-ruler',
  devices: 'display',
  diamond: 'gem',
  donut_large: 'chart-pie',
  emoji_events: 'trophy',
  emoji_symbols: 'face-smile',
  error: 'circle-exclamation',
  expand_less: 'chevron-up',
  fact_check: 'file-circle-check',
  filter_center_focus: 'crosshairs',
  filter_list: 'filter',
  folder: 'folder',
  folder_open: 'folder-open',
  format_color_text: 'font',
  format_list_numbered: 'list-ol',
  forum: 'comments',
  gavel: 'gavel',
  gradient: 'droplet',
  group: 'user-group',
  handshake: 'handshake',
  headphones: 'headphones',
  health_and_safety: 'shield-heart',
  horizontal_rule: 'minus',
  hourglass_empty: 'hourglass',
  hourglass_top: 'hourglass-start',
  how_to_reg: 'user-check',
  how_to_vote: 'square-poll-vertical',
  hub: 'circle-nodes',
  image: 'image',
  insert_chart: 'chart-simple',
  label: 'tag',
  language: 'language',
  layers: 'layer-group',
  list: 'list',
  local_cafe: 'mug-saucer',
  manage_search: 'magnifying-glass-arrow-right',
  map: 'map',
  mark_email_read: 'envelope-circle-check',
  memory: 'memory',
  menu_book: 'book-open-cover',
  military_tech: 'medal',
  more_horiz: 'ellipsis',
  motion_photos_auto: 'film',
  notification_important: 'bell-exclamation',
  notifications_active: 'bell-on',
  notifications_off: 'bell-slash',
  perm_media: 'photo-film',
  person: 'user',
  person_search: 'user-magnifying-glass',
  phone: 'phone',
  play_circle: 'circle-play',
  priority_high: 'exclamation',
  public: 'globe',
  query_stats: 'chart-line',
  rate_review: 'star-half-stroke',
  record_voice_over: 'microphone-lines',
  redeem: 'gift',
  replay: 'rotate-left',
  reviews: 'comment-dots',
  rounded_corner: 'square',
  rule: 'ruler',
  school: 'graduation-cap',
  science: 'flask',
  security: 'shield-halved',
  sell: 'tag',
  shield: 'shield',
  show_chart: 'chart-line',
  smart_button: 'wand-magic-sparkles',
  smart_display: 'display',
  smartphone: 'mobile-screen-button',
  source: 'code-branch',
  space_bar: 'ellipsis',
  space_dashboard: 'table-cells-large',
  speed: 'gauge-high',
  sports_esports: 'gamepad',
  store: 'store',
  swap_horiz: 'end-left',
  swords: 'swords',
  sync_alt: 'arrows-rotate',
  tab: 'window-restore',
  target: 'bullseye',
  text_fields: 'font',
  timer: 'stopwatch',
  title: 'heading',
  toggle_on: 'toggle-on',
  topic: 'hashtag',
  track_changes: 'bullseye',
  transform: 'shapes',
  translate: 'language',
  trending_down: 'arrow-trend-down',
  tune: 'sliders',
  videocam: 'video',
  view_agenda: 'table-list',
  view_kanban: 'table-columns',
  view_module: 'grid-2',
  view_quilt: 'table-cells-large',
  view_stream: 'bars-staggered',
  view_timeline: 'timeline',
  visibility: 'eye',
  visibility_off: 'eye-slash',
  wallpaper: 'image',
  web: 'globe',
  widgets: 'grip',
  workspace_premium: 'award',
  workspaces: 'diagram-project',
};

/** Resolves a semantic icon name to a Font Awesome glyph name, falling back to the raw name. */
export function resolveFontAwesomeName(name: string): string {
  return materialToFontAwesome[name] ?? name;
}

const sizeMap: Record<IconSize, string> = {
  xs: 'var(--icon-size-xs)',
  sm: 'var(--icon-size-sm)',
  md: 'var(--icon-size-md)',
  lg: 'var(--icon-size-lg)',
  xl: 'var(--icon-size-xl)',
  '2xl': 'var(--icon-size-2xl)',
  display: 'var(--icon-size-display)',
};

const surfaceMap: Record<IconSurfaceSize, { boxSize: string; radius: string; iconSize: IconSize }> = {
  xs: { boxSize: 'var(--icon-surface-size-xs)', radius: 'var(--icon-surface-radius-xs)', iconSize: 'xs' },
  sm: { boxSize: 'var(--icon-surface-size-sm)', radius: 'var(--icon-surface-radius-sm)', iconSize: 'sm' },
  md: { boxSize: 'var(--icon-surface-size-md)', radius: 'var(--icon-surface-radius-md)', iconSize: 'md' },
  lg: { boxSize: 'var(--icon-surface-size-lg)', radius: 'var(--icon-surface-radius-lg)', iconSize: 'lg' },
  xl: { boxSize: 'var(--icon-surface-size-xl)', radius: 'var(--icon-surface-radius-xl)', iconSize: 'xl' },
};

const toneMap: Record<IconTone, string> = {
  current: 'currentColor',
  default: 'var(--foreground)',
  muted: 'var(--muted-foreground)',
  primary: 'var(--primary)',
  accent: 'var(--accent-text)',
  inverse: 'var(--text-on-primary)',
};

const surfaceToneMap: Record<IconSurfaceTone, { background: string; border: string; iconTone: IconTone }> = {
  neutral: {
    background: 'color-mix(in srgb, var(--foreground) 8%, transparent)',
    border: 'color-mix(in srgb, var(--foreground) 10%, transparent)',
    iconTone: 'default',
  },
  primary: {
    background: 'color-mix(in srgb, var(--primary) 14%, transparent)',
    border: 'color-mix(in srgb, var(--primary) 22%, transparent)',
    iconTone: 'primary',
  },
  accent: {
    background: 'color-mix(in srgb, var(--accent-text) 14%, transparent)',
    border: 'color-mix(in srgb, var(--accent-text) 22%, transparent)',
    iconTone: 'accent',
  },
  inverse: {
    background: 'var(--primary)',
    border: 'transparent',
    iconTone: 'inverse',
  },
};

export interface IconSurfaceProps extends Omit<IconProps, 'className' | 'style'> {
  surfaceSize?: IconSurfaceSize;
  surfaceTone?: IconSurfaceTone;
  shape?: IconSurfaceShape;
  className?: string;
  surfaceStyle?: React.CSSProperties;
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
}

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export default function Icon({
  name,
  size,
  variant = 'outline',
  purpose = 'decorative',
  tone,
  label,
  className = '',
  style,
}: IconProps) {
  const faName = resolveFontAwesomeName(name);
  const toneColor = tone ? toneMap[tone] : undefined;
  const inlineStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1em',
    height: '1em',
    lineHeight: 1,
    flexShrink: 0,
    ...(toneColor ? { color: toneColor } : null),
    ...(size ? { fontSize: sizeMap[size] } : null),
    ...style,
  };

  return (
    <span
      className={joinClassNames(
        'icon-glyph',
        'fa-duotone',
        'fa-thin',
        `fa-${faName}`,
        variant === 'filled' ? 'fa-swap-opacity' : undefined,
        className
      )}
      style={inlineStyle}
      aria-hidden={purpose === 'decorative' ? 'true' : undefined}
      aria-label={purpose === 'standalone' ? label : undefined}
      role={purpose === 'standalone' ? 'img' : undefined}
    />
  );
}

export function IconSurface({
  surfaceSize = 'md',
  surfaceTone,
  shape = 'square',
  className,
  surfaceStyle,
  iconClassName,
  iconStyle,
  size,
  tone,
  ...iconProps
}: IconSurfaceProps) {
  const surfaceEntry = surfaceMap[surfaceSize];
  const surfaceToneEntry = surfaceTone ? surfaceToneMap[surfaceTone] : undefined;

  return (
    <span
      className={className}
      data-icon-surface={surfaceSize}
      data-icon-surface-tone={surfaceTone}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: surfaceEntry.boxSize,
        height: surfaceEntry.boxSize,
        minWidth: surfaceEntry.boxSize,
        minHeight: surfaceEntry.boxSize,
        borderRadius: shape === 'circle' ? '9999px' : surfaceEntry.radius,
        flexShrink: 0,
        ...(surfaceToneEntry
          ? {
              backgroundColor: surfaceToneEntry.background,
              border: `1px solid ${surfaceToneEntry.border}`,
            }
          : null),
        ...surfaceStyle,
      }}
    >
      <Icon
        {...iconProps}
        size={size ?? surfaceEntry.iconSize}
        tone={tone ?? surfaceToneEntry?.iconTone}
        className={iconClassName}
        style={iconStyle}
      />
    </span>
  );
}
