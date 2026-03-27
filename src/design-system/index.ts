/**
 * Design System — public API
 *
 * Import from '@/design-system' to access typed tokens.
 * CSS custom properties are loaded via tokens.css (imported in globals.css).
 */

export {
  palette,
  semantic,
  fontFamily,
  fontSize,
  space,
  radius,
  shadow,
  duration,
  durationSeconds,
  delaySeconds,
  stagger,
  easing,
  transition,
  zIndex,
} from './tokens';

export {
  componentRegistry,
  getComponent,
  getByCategory,
} from './components';

export type { ComponentEntry, ComponentProp } from './components';

// ── UI Component barrel exports ───────────────────────────────────────────
export { default as Button }   from '@/components/ui/Button';
export { default as Icon }     from '@/components/ui/Icon';
export { default as Input }    from '@/components/ui/Input';
export { default as Select }   from '@/components/ui/Select';
export { default as Modal }    from '@/components/ui/Modal';
export { default as Badge }    from '@/components/ui/Badge';
export { default as Alert }    from '@/components/ui/Alert';
export { default as Tabs }     from '@/components/ui/Tabs';
export { default as Toggle }   from '@/components/ui/Toggle';
export { default as Avatar }   from '@/components/ui/Avatar';
export { default as Skeleton } from '@/components/ui/Skeleton';
export { default as Tooltip }  from '@/components/ui/Tooltip';
export type { TabItem }        from '@/components/ui/Tabs';
export type { SelectOption }   from '@/components/ui/Select';
