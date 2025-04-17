export type HeroVariant = 'default' | 'design' | 'minimal' | 'creative';

export interface HeroConfig {
  variant: HeroVariant;
  title: string;
  subtitle?: string;
  quote?: {
    text: string;
    author: string;
  };
  backgroundEffect?: 'particles' | 'design-code' | 'gradient' | 'none';
  cta?: {
    text: string;
    href: string;
  };
}