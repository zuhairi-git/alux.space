'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { HeroConfig } from '@/types/hero';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { i18n } from '@/i18n';
import { useAnalyticsTracking } from '../../../../seo/AnalyticsProvider';
import { durationSeconds, delaySeconds, transition as t, Button, Icon, MotionDiv, MotionH1, MotionH2, MotionSpan, palette } from '@/design-system';

// Published portfolio items to showcase in the hero stack
const SHOWCASE_ITEMS = [
  {
    title: 'Healthcare UX',
    type: 'Case Study',
    src: '/images/portfolio/healthcare/healthcare.jpg',
    slug: '/portfolio/healthcare-prioritization',
    accent: palette.blue[500],
    tag: 'Product Management',
    num: '01',
    words: ['RICE Framework', 'Prioritization', 'Healthcare'],
  },
  {
    title: 'Workflow Platform',
    type: 'Prototype',
    src: '/images/portfolio/workflow/cover.jpg',
    slug: '/portfolio/workflow',
    accent: palette.violet[500],
    tag: 'AI-Powered',
    num: '02',
    words: ['AI Copilot', 'SaaS', 'Collaboration'],
  },
  {
    title: 'Market Intelligence',
    type: 'Prototype',
    src: '/images/portfolio/market/market-intellegence.jpg',
    slug: '/portfolio/market-intelligence',
    accent: palette.cyan[500],
    tag: 'Mobile UX',
    num: '03',
    words: ['Mobile UX', 'Enterprise', 'Analytics'],
  },
  {
    title: 'Inclusive Design',
    type: 'Case Study',
    src: '/images/portfolio/accessibility/accessiblity-showcase.jpg',
    slug: '/portfolio/accessibility',
    accent: palette.emerald[500],
    tag: 'Design System',
    num: '04',
    words: ['WCAG 2.1', 'Design Tokens', 'Accessibility'],
  },
  {
    title: 'Game Strategy',
    type: 'Case Study',
    src: '/images/portfolio/game-dev/cover.jpg',
    slug: '/portfolio/game-strategy',
    accent: palette.rose[500],
    tag: 'Strategy',
    num: '05',
    words: ['GTM Strategy', 'Gaming', 'Personas'],
  },
];

// Word cloud — 15 labels in 4 zones, no overlaps.
// Container: 640×430. Card stack bounds: left≈40, right≈600, top≈36, bottom≈350.
// Label heights ~26px. Widths estimated per text (10px font + px-2.5 py-1 padding).
//
// TOP ROW  y=-65  (5 items spread 640px wide, min 45px gap between any two):
//   Personas(-90)  AI Copilot(30)  SaaS(190)  Collaboration(340)  GTM Strategy(510)
//   right edges:  -15            110          245                  445               605
//
// LEFT COLUMN  x=-95…-57  (3 items, vertical gap ~74px, clear of leftmost card edge 40px):
//   RICE Framework(-95,90)  Prioritization(-62,195)  Healthcare(-57,295)
//
// RIGHT COLUMN  x=612  (3 items at same x, vertical gap ~74px, clear of right card edge 600px):
//   Mobile UX(90)  Enterprise(195)  Analytics(295)
//
// BOTTOM ROW  y=385  (4 items, min 30px gap, 35px below front-card bottom 350px):
//   WCAG 2.1(30)  Design Tokens(200)  Accessibility(380)  Gaming(510)
//   right edges:  105              305                    480               580
const WORD_CLOUD = SHOWCASE_ITEMS.flatMap((item, cardIndex) =>
  item.words.map((word, wordIdx) => ({
    word,
    cardIndex,
    accent: item.accent,
    x: [
      [ -95,  -62,  -57],  // card 0 (Healthcare) — LEFT COLUMN
      [  30,  190,  340],  // card 1 (Workflow)   — TOP ROW
      [ 612,  612,  612],  // card 2 (Market)     — RIGHT COLUMN
      [  30,  200,  380],  // card 3 (Inclusive)  — BOTTOM ROW
      [ 510,  510,  -90],  // card 4 (Game)       — TOP ROW right + BOTTOM ROW right + TOP ROW left
    ][cardIndex][wordIdx],
    y: [
      [  90,  195,  295],  // card 0 — left column, vertically spread
      [ -65,  -65,  -65],  // card 1 — top row
      [  90,  195,  295],  // card 2 — right column, vertically spread
      [ 385,  385,  385],  // card 3 — bottom row
      [ -65,  385,  -65],  // card 4 — top-right, bottom-right, top-left
    ][cardIndex][wordIdx],
  }))
);

// Layered-stack config: cards sit in an overlapping pile, offset left↗ as index increases
const STACK_CONFIG = [
  { x:  90, y: -44, rotate:  7, scale: 0.88, zIndex: 1 },
  { x:  45, y: -22, rotate:  3.5, scale: 0.94, zIndex: 2 },
  { x:   0, y:   0, rotate:  0,   scale: 1.00, zIndex: 3 }, // front card
  { x: -45, y: -22, rotate: -3.5, scale: 0.94, zIndex: 2 },
  { x: -90, y: -44, rotate: -7, scale: 0.88, zIndex: 1 },
];

interface PortfolioFanProps { locale: string }

const PortfolioFan: React.FC<PortfolioFanProps> = ({ locale }) => {
  const [activeIndex, setActiveIndex] = useState(2); // start with centre card active
  const [showCloud, setShowCloud] = useState(true);
  const wasDragging = React.useRef(false);
  const activeItem = SHOWCASE_ITEMS[activeIndex];

  // Shared dot navigation — used in both mobile and desktop layouts
  const dotNav = (
    <div className="flex items-center gap-2">
      {SHOWCASE_ITEMS.map((item, index) => (
        <Button
          key={index}
          variant="tertiary"
          onClick={() => setActiveIndex(index)}
          aria-label={`View ${item.title}`}
          className="!p-0 !border-0 !rounded-full shrink-0 transition-all duration-300"
          style={{
            width:      activeIndex === index ? 24 : 6,
            height:     6,
            minHeight:  0,
            background: activeIndex === index ? item.accent : 'var(--muted-foreground)',
            opacity:    activeIndex === index ? 1 : 0.35,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none gap-5">

      {/* ── MOBILE: single swipeable card (< lg) ──────────────── */}
      <div className="lg:hidden w-full flex flex-col items-center gap-4 px-2">
        <div
          className="relative w-full rounded-2xl overflow-hidden"
          style={{ maxWidth: 380, aspectRatio: '380 / 270' }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <MotionDiv
              key={activeIndex}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragStart={() => { wasDragging.current = false; }}
              onDrag={(_, info) => { if (Math.abs(info.offset.x) > 5) wasDragging.current = true; }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) setActiveIndex(i => Math.min(i + 1, SHOWCASE_ITEMS.length - 1));
                if (info.offset.x > 50) setActiveIndex(i => Math.max(i - 1, 0));
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <Link
                href={`/${locale}${activeItem.slug}`}
                className="block w-full h-full"
                onClick={(e) => { if (wasDragging.current) e.preventDefault(); }}
              >
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden"
                  style={{ boxShadow: `0 20px 50px -10px rgba(0,0,0,0.55), 0 0 0 1px ${activeItem.accent}55` }}
                >
                  <Image src={activeItem.src} alt={activeItem.title} fill className="object-cover object-top" sizes="(max-width: 400px) 100vw, 380px" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)' }} />
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl" style={{ background: activeItem.accent }} />
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${activeItem.accent}33`, color: activeItem.accent, border: `1px solid ${activeItem.accent}55` }}>
                      {activeItem.num}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-white/80 backdrop-blur-sm border border-white/15">
                      {activeItem.type}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 px-4 pb-4 pt-8">
                    <p className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">{activeItem.tag}</p>
                    <p className="text-white font-bold text-base leading-tight">{activeItem.title}</p>
                    <div className="mt-2 h-0.5 rounded-full" style={{ width: '48px', background: activeItem.accent }} />
                  </div>
                </div>
              </Link>
            </MotionDiv>
          </AnimatePresence>
        </div>
        <p className="text-[11px] text-[var(--muted-foreground)] opacity-50 tracking-wide select-none">
          swipe or tap dots to explore
        </p>
        {dotNav}
      </div>

      {/* ── DESKTOP: fan stack (lg+) ──────────────────────────── */}
      <div className="hidden lg:flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center overflow-visible" style={{ width: 640, height: 430 }}>
          {SHOWCASE_ITEMS.map((item, index) => {
            const cfg = STACK_CONFIG[index];
            const isActive = activeIndex === index;
            const distance = Math.abs(index - activeIndex);

            return (
              <MotionDiv
                key={item.slug}
                initial={{ opacity: 0, y: 60, scale: 0.8 }}
                animate={{
                  opacity: distance > 2 ? 0.4 : 1,
                  x: cfg.x,
                  y: isActive ? cfg.y - 22 : cfg.y,
                  rotate: isActive ? 0 : cfg.rotate,
                  scale: isActive ? 1.06 : cfg.scale,
                  zIndex: isActive ? 10 : cfg.zIndex,
                }}
                transition={{
                  delay: 0.2 + index * 0.08,
                  duration: 0.55,
                  ease: [0.19, 1, 0.22, 1],
                }}
                style={{ position: 'absolute', width: 380, height: 270 }}
                onHoverStart={() => setActiveIndex(index)}
                className="cursor-pointer origin-bottom"
              >
                <Link href={`/${locale}${item.slug}`} className="block w-full h-full">
                  {/* Card shell */}
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden"
                    style={{
                      boxShadow: isActive
                        ? `0 30px 60px -10px rgba(0,0,0,0.55), 0 0 0 1px ${item.accent}55`
                        : `0 10px 30px -8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)`,
                    }}
                  >
                    {/* Full-bleed photo */}
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover object-top"
                      sizes="380px"
                    />

                    {/* Always-on dark scrim at bottom */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)' }}
                    />

                    {/* Accent colour glow at top edge (active only) */}
                    {isActive && (
                      <div
                        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl"
                        style={{ background: item.accent }}
                      />
                    )}

                    {/* Index number — top-right */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span
                        className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-full"
                        style={{ background: `${item.accent}33`, color: item.accent, border: `1px solid ${item.accent}55` }}
                      >
                        {item.num}
                      </span>
                    </div>

                    {/* Type pill — top-left */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-white/80 backdrop-blur-sm border border-white/15">
                        {item.type}
                      </span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 inset-x-0 px-4 pb-4 pt-8">
                      <p className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">{item.tag}</p>
                      <p className="text-white font-bold text-base leading-tight">{item.title}</p>
                      {/* Animated underline on active */}
                      <div
                        className="mt-2 h-0.5 rounded-full transition-all duration-500"
                        style={{
                          width: isActive ? '48px' : '0px',
                          background: item.accent,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              </MotionDiv>
            );
          })}

          {/* Word cloud — keywords float around the card stack, each selects the relevant card */}
          {WORD_CLOUD.map((w, wIdx) => {
            const isActive = activeIndex === w.cardIndex;
            return (
              <MotionDiv
                key={`w-${wIdx}`}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{
                  opacity: showCloud ? (isActive ? 0.95 : 0.28) : 0,
                  scale:   showCloud ? 1 : 0.75,
                }}
                transition={{ duration: 0.3, delay: showCloud ? wIdx * 0.025 : 0 }}
                style={{
                  position: 'absolute',
                  left: w.x,
                  top: w.y,
                  zIndex: 20,
                  pointerEvents: showCloud ? 'auto' : 'none',
                }}
                className="hidden lg:block"
              >
                <Button
                  variant="tertiary"
                  onClick={() => setActiveIndex(w.cardIndex)}
                  className="!h-auto !min-h-0 !rounded-full !text-[10px] !font-medium !px-2.5 !py-1 !border whitespace-nowrap"
                  style={{
                    color:       isActive ? w.accent : 'var(--foreground)',
                    borderColor: isActive ? `${w.accent}66` : 'var(--card-border)',
                    background:  isActive ? `${w.accent}1a` : 'var(--card-from-bg)',
                  }}
                >
                  {w.word}
                </Button>
              </MotionDiv>
            );
          })}
        </div>

        {/* Dot navigation */}
        {dotNav}

        {/* Word cloud toggle */}
        <Button
          variant="tertiary"
          onClick={() => setShowCloud(v => !v)}
          className="!h-auto !min-h-0 !rounded-full !text-[10px] uppercase tracking-widest !px-2.5 !py-1 !border gap-1.5"
          style={{
            color:       'var(--muted-foreground)',
            borderColor: 'var(--card-border)',
            background:  showCloud ? 'var(--card-from-bg)' : 'transparent',
          }}
        >
          <span className="material-symbols text-[13px]" aria-hidden="true">
            {showCloud ? 'label_off' : 'label'}
          </span>
          {showCloud ? 'Hide keywords' : 'Show keywords'}
        </Button>
      </div>
    </div>
  );
};

const UnifiedHero: React.FC<HeroConfig> = ({ title, subtitle, cta }) => {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { trackEvent } = useAnalyticsTracking();
  const isColorful = theme === 'colorful';
  
  // Helper function to add locale to paths
  const localizedHref = (path: string) => {
    if (path.startsWith('/') && i18n.locales.some(loc => path.startsWith(`/${loc}/`))) {
      return path;
    }
    if (path.startsWith('#') || path.startsWith('/#')) {
      return path.startsWith('/#') ? `/${locale}${path}` : `/${locale}/${path}`;
    }
    return `/${locale}${path}`;
  };

  // Split title into words for colorful theme staggered animation
  const words = title ? title.split(' ') : [];

  return (
    <MotionDiv
      layout
      className="container mx-auto px-4 relative z-10"
    >
      {/* Corner decorative accents */}
      <AnimatePresence mode="wait">
        <MotionDiv
          key="decorative-elements"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={t.snap}
        >
          <MotionDiv
            className="absolute top-4 left-4 md:top-10 md:left-10 w-16 h-16 md:w-24 md:h-24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...t.snap, delay: delaySeconds.xs }}
          >
            <div className={`w-full h-full border-t-2 border-l-2 ${isColorful ? 'border-ds-cyan-400/30' : 'border-[var(--primary)]/30'} rounded-tl-lg`} />
          </MotionDiv>
          <MotionDiv
            className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-16 h-16 md:w-24 md:h-24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...t.snap, delay: delaySeconds.xs }}
          >
            <div className={`w-full h-full border-b-2 border-r-2 ${isColorful ? 'border-[var(--primary)]/30' : 'border-primary-400/30'} rounded-br-lg`} />
          </MotionDiv>
        </MotionDiv>
      </AnimatePresence>

      {/* Main content: two-column split on desktop */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 min-h-[calc(100vh-8rem)] py-16 lg:py-0">

        {/* ── LEFT: Text content ─────────────────────────────── */}
        <div className="flex-1 lg:max-w-[48%] flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-6">

          {/* Role badge */}
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durationSeconds.dramatic, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--card-border)] text-[var(--accent-text)] text-sm font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
            {locale === 'fi' ? 'Tuoteomistaja & Suunnittelija' : 'Product Owner & Designer'}
          </MotionDiv>

          {/* Title */}
          <AnimatePresence mode="wait">
            {isColorful ? (
              <MotionH2
                key="colorful-title"
                layout
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: durationSeconds.slow }}
              >
                {words.map((word, i) => (
                  <MotionSpan
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * delaySeconds.md, duration: durationSeconds.dramatic, ease: [0.19, 1, 0.22, 1] }}
                    className="inline-block mr-3 bg-clip-text text-transparent bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]"
                  >
                    {word}
                  </MotionSpan>
                ))}
              </MotionH2>
            ) : (
              <MotionH1
                key="default-title"
                layout
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: durationSeconds.slow, delay: 0.15 }}
              >
                {title}
              </MotionH1>
            )}
          </AnimatePresence>

          {/* Subtitle */}
          {subtitle && (
            <MotionDiv
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: durationSeconds.dramatic, delay: 0.35 }}
              className="max-w-lg"
            >
              <p className="text-lg md:text-xl leading-relaxed text-[var(--muted-foreground)]">
                {subtitle.split('—')[0]?.trim()}
              </p>
              {subtitle.includes('—') && (
                <p className="mt-2 text-base opacity-60 text-[var(--muted-foreground)]">
                  — {subtitle.split('—')[1]?.trim()}
                </p>
              )}
            </MotionDiv>
          )}

          {/* CTA buttons */}
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durationSeconds.dramatic, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            {cta && (
              <Link
                href={localizedHref(cta.href)}
                onClick={() => trackEvent('hero_cta_click', 'hero', `portfolio_cta_${cta.text}`)}
              >
                <Button variant="primary" size="lg" rightIcon={<Icon name="arrow_forward" />}>
                  {cta.text}
                </Button>
              </Link>
            )}
            <Link href={localizedHref('/#work-experience')}>
              <Button variant="outline" size="lg">
                {locale === 'fi' ? 'Katso kokemus' : 'View Experience'}
              </Button>
            </Link>
          </MotionDiv>

          {/* Stats row */}
          <MotionDiv
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: durationSeconds.dramatic, delay: 0.65 }}
            className="flex gap-8 pt-2"
          >
            {[
              { value: '10+', label: locale === 'fi' ? 'vuotta' : 'yrs exp' },
              { value: '20+', label: locale === 'fi' ? 'projektia' : 'projects' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-2xl font-bold bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{stat.label}</div>
              </div>
            ))}
          </MotionDiv>
        </div>

        {/* ── RIGHT: Portfolio fan showcase ──────────────────── */}
        <MotionDiv
          className="flex-1 lg:max-w-[52%] flex items-center justify-center w-full overflow-visible"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durationSeconds.dramatic, delay: 0.2 }}
        >
          <PortfolioFan locale={locale} />
        </MotionDiv>
      </div>
    </MotionDiv>
  );
};

export default UnifiedHero;

