'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Icon from '@/components/ui/Icon';
import ExperienceStats from './ExperienceStats';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { localizePath } from '@/i18n';
import { useAnalyticsTracking } from '../../../seo/AnalyticsProvider';

const LINKEDIN_URL = 'https://www.linkedin.com/in/ali-zuhairi/';

/**
 * Modern profile-first homepage.
 *
 * Design intent: energetic and playful through color, hue-tinted cards
 * and data-viz details — not through motion. Icons stay neutral
 * (accent-on-tint) and untilted. The only animations are two status-dot
 * pulses (disabled under prefers-reduced-motion); everything else is
 * plain CSS hover transitions, so the page stays calm on mobile and
 * desktop alike.
 *
 * Section ids mirror the classic design (work-experience, digital-dreams,
 * strengths-skills, podcast, testimonials) so the navigation hash links
 * keep working on both designs.
 */

/** Per-item hue tints cycled across chips and card washes (not icons). */
const CHIP_HUES = [
  'bg-[var(--color-violet-500)]/12 border-[var(--color-violet-400)]/30',
  'bg-[var(--color-pink-500)]/12 border-[var(--color-pink-400)]/30',
  'bg-[var(--color-cyan-500)]/12 border-[var(--color-cyan-400)]/30',
  'bg-[var(--color-ember-500)]/12 border-[var(--color-ember-400)]/30',
];

interface Copy {
  availability: string;
  heroLead: string;
  heroStatementPre: string;
  heroStatementHighlight: string;
  thatsMe: string;
  portraitYearsLabel: string;
  role: string;
  basedIn: string;
  viewPortfolio: string;
  glanceLabel: string;
  glanceTitle: string;
  aboutTitle: string;
  nowLabel: string;
  nowRole: string;
  nowCompany: string;
  nowSince: string;
  nowPoints: string[];
  careerTitle: string;
  career: { role: string; company: string; period: string }[];
  skillsTitle: string;
  skills: { label: string; icon: string }[];
  focusTitle: string;
  focus: { label: string; icon: string }[];
  toolboxTitle: string;
  tools: string[];
  languagesTitle: string;
  languages: { code: string; name: string }[];
  podcastTitle: string;
  podcastText: string;
  podcastCta: string;
  workLabel: string;
  workTitle: string;
  workSubtitle: string;
  viewAll: string;
  caseStudy: string;
  prototype: string;
  testimonialsLabel: string;
  ctaTitle: string;
  ctaText: string;
}

const COPY: Record<'en' | 'fi', Copy> = {
  en: {
    availability: 'Open to new ideas & collaborations',
    heroLead: "Hi, I'm Ali —",
    heroStatementPre: 'I turn complexity into',
    heroStatementHighlight: 'clarity.',
    thatsMe: "that's me!",
    portraitYearsLabel: 'years in design',
    role: 'Product Owner & Design Leader',
    basedIn: 'Helsinki, Finland',
    viewPortfolio: 'View Portfolio',
    glanceLabel: 'AT A GLANCE',
    glanceTitle: 'The essentials, in one view',
    aboutTitle: 'A little about me',
    nowLabel: 'Right now',
    nowRole: 'Product Owner & Designer',
    nowCompany: 'Webropol · Helsinki',
    nowSince: 'Since 2023',
    nowPoints: ['International multi-team coordination', 'End-to-end platform design'],
    careerTitle: 'Career path',
    career: [
      { role: 'Product Owner & Designer', company: 'Webropol, Helsinki', period: '2023 – Present' },
      { role: 'Product Designer', company: 'Reslink Solutions, Espoo', period: '2016 – 2023' },
      { role: 'UI/UX Designer', company: 'Reslink Solutions, Helsinki', period: '2014 – 2016' },
    ],
    skillsTitle: 'Strengths & skills',
    skills: [
      { label: 'Team Leadership', icon: 'groups' },
      { label: 'Product Strategy', icon: 'lightbulb' },
      { label: 'Design & Prototyping', icon: 'palette' },
      { label: 'User Research', icon: 'science' },
      { label: 'Development', icon: 'code' },
      { label: 'Agile Management', icon: 'checklist' },
    ],
    focusTitle: 'Focus areas',
    focus: [
      { label: 'AI Integration', icon: 'smart_toy' },
      { label: 'Design Systems', icon: 'design_services' },
      { label: 'Product Strategy', icon: 'trending_up' },
      { label: 'UX Research & Testing', icon: 'science' },
      { label: 'Team Building', icon: 'handshake' },
      { label: 'Workshops & Facilitation', icon: 'school' },
    ],
    toolboxTitle: 'Toolbox',
    tools: ['Figma', 'Adobe CC', 'React', 'WordPress', 'HubSpot', 'Scrum', 'Jira', 'Confluence', 'GitHub Copilot', 'GCP', 'Prompt Engineering'],
    languagesTitle: 'Languages',
    languages: [
      { code: 'EN', name: 'English' },
      { code: 'AR', name: 'Arabic' },
      { code: 'FI', name: 'Finnish' },
    ],
    podcastTitle: 'The podcast',
    podcastText: 'Thoughts on design, AI and product — in audio form.',
    podcastCta: 'Listen now',
    workLabel: 'SELECTED WORK',
    workTitle: 'Case studies & prototypes',
    workSubtitle: 'A snapshot of the problems I love solving.',
    viewAll: 'View all projects',
    caseStudy: 'Case Study',
    prototype: 'Prototype',
    testimonialsLabel: 'TESTIMONIALS',
    ctaTitle: "Let's build something people love",
    ctaText: 'Always happy to talk design, product and AI.',
  },
  fi: {
    availability: 'Avoin uusille ideoille ja yhteistyölle',
    heroLead: 'Hei, olen Ali —',
    heroStatementPre: 'muunnan monimutkaisuuden',
    heroStatementHighlight: 'selkeydeksi.',
    thatsMe: 'tässä minä!',
    portraitYearsLabel: 'vuotta designia',
    role: 'Tuoteomistaja & designjohtaja',
    basedIn: 'Helsinki, Suomi',
    viewPortfolio: 'Katso portfolio',
    glanceLabel: 'YHDELLÄ SILMÄYKSELLÄ',
    glanceTitle: 'Olennaisin yhdessä näkymässä',
    aboutTitle: 'Hieman minusta',
    nowLabel: 'Juuri nyt',
    nowRole: 'Tuoteomistaja & suunnittelija',
    nowCompany: 'Webropol · Helsinki',
    nowSince: 'Vuodesta 2023',
    nowPoints: ['Kansainvälinen monitiimikoordinaatio', 'Alustan päästä päähän -suunnittelu'],
    careerTitle: 'Urapolku',
    career: [
      { role: 'Tuoteomistaja & suunnittelija', company: 'Webropol, Helsinki', period: '2023 – nykyhetki' },
      { role: 'Tuotesuunnittelija', company: 'Reslink Solutions, Espoo', period: '2016 – 2023' },
      { role: 'UI/UX-suunnittelija', company: 'Reslink Solutions, Helsinki', period: '2014 – 2016' },
    ],
    skillsTitle: 'Vahvuudet & taidot',
    skills: [
      { label: 'Tiimin johtaminen', icon: 'groups' },
      { label: 'Tuotestrategia', icon: 'lightbulb' },
      { label: 'Suunnittelu & prototyypit', icon: 'palette' },
      { label: 'Käyttäjätutkimus', icon: 'science' },
      { label: 'Kehitys', icon: 'code' },
      { label: 'Ketterä hallinta', icon: 'checklist' },
    ],
    focusTitle: 'Painopistealueet',
    focus: [
      { label: 'Tekoälyn integrointi', icon: 'smart_toy' },
      { label: 'Designjärjestelmät', icon: 'design_services' },
      { label: 'Tuotestrategia', icon: 'trending_up' },
      { label: 'UX-tutkimus & testaus', icon: 'science' },
      { label: 'Tiimin rakentaminen', icon: 'handshake' },
      { label: 'Työpajat & fasilitointi', icon: 'school' },
    ],
    toolboxTitle: 'Työkalupakki',
    tools: ['Figma', 'Adobe CC', 'React', 'WordPress', 'HubSpot', 'Scrum', 'Jira', 'Confluence', 'GitHub Copilot', 'GCP', 'Prompt Engineering'],
    languagesTitle: 'Kielet',
    languages: [
      { code: 'EN', name: 'englanti' },
      { code: 'AR', name: 'arabia' },
      { code: 'FI', name: 'suomi' },
    ],
    podcastTitle: 'Podcast',
    podcastText: 'Ajatuksia designista, tekoälystä ja tuotteista — äänimuodossa.',
    podcastCta: 'Kuuntele nyt',
    workLabel: 'VALITUT TYÖT',
    workTitle: 'Case-tutkimukset & prototyypit',
    workSubtitle: 'Läpileikkaus ongelmista, joita rakastan ratkaista.',
    viewAll: 'Katso kaikki projektit',
    caseStudy: 'Case study',
    prototype: 'Prototyyppi',
    testimonialsLabel: 'SUOSITTELUT',
    ctaTitle: 'Rakennetaan jotain, jota ihmiset rakastavat',
    ctaText: 'Keskustelen aina mielelläni designista, tuotteista ja tekoälystä.',
  },
};

const TESTIMONIALS = {
  en: [
    {
      text: 'Ali is a creative product designer. You will find a lot of artists with too busy layouts and art forms. But Ali takes a lead in impressive yet simple and relevant product designs. He has this cunning ability to solve complex problem with simple solutions using his design skills.',
      highlights: ['creative product designer', 'impressive yet simple', 'solve complex problem with simple solutions'],
      name: 'Fahad M',
      position: 'IT Contractor | Travelodge Hotels Limited',
      initials: 'FM',
    },
    {
      text: 'Ali is an exceptional and experienced UI/UX designer with more than ten years of professional experience specialising in product design for technology companies. Ali believes that design is not about deliverables and beautiful pixels but about solving problems and achieving business and user goals. He always delivers on time and on budget.',
      highlights: ['exceptional and experienced', 'solving problems', 'delivers on time and on budget'],
      name: 'Constantin Buda',
      position: 'CMO at Vidalico Digital | Hubspot Agency Partner | SicTic Member',
      initials: 'CB',
    },
  ],
  fi: [
    {
      text: 'Ali on luova tuotesuunnittelija. Löydät paljon taiteilijoita, joilla on liian kiireisiä taiteen muotoja. Mutta Ali on edelläkävijä vaikuttavissa mutta yksinkertaisissa ja merkityksellisissä tuotesuunnitteluissa. Hänellä on tämä ovela kyky ratkaista monimutkaisia ongelmia yksinkertaisilla ratkaisuilla.',
      highlights: ['luova tuotesuunnittelija', 'vaikuttavissa mutta yksinkertaisissa', 'ratkaista monimutkaisia ongelmia yksinkertaisilla ratkaisuilla'],
      name: 'Fahad M',
      position: 'IT-urakoitsija | Travelodge Hotels Limited',
      initials: 'FM',
    },
    {
      text: 'Ali on poikkeuksellinen ja kokenut UI/UX-suunnittelija, jolla on yli kymmenen vuoden ammattikokemus erikoistuen tuotesuunnitteluun teknologiayrityksissä. Ali uskoo, että suunnittelu ei ole kyse toimitettavista ja kauniista pikseleistä, vaan ongelmien ratkaisemisesta. Hän toimittaa aina ajallaan ja budjetissa.',
      highlights: ['poikkeuksellinen ja kokenut', 'ongelmien ratkaisemisesta', 'toimittaa aina ajallaan ja budjetissa'],
      name: 'Constantin Buda',
      position: 'CMO Vidalico Digitalissa | Hubspot Agency Partner | SicTic-jäsen',
      initials: 'CB',
    },
  ],
};

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Renders text with the given phrases wrapped in a highlighter tint. */
const HighlightedText = ({ text, phrases }: { text: string; phrases: string[] }) => {
  const present = phrases.filter((phrase) => text.includes(phrase));
  if (present.length === 0) return <>{text}</>;
  const pattern = new RegExp(`(${present.map(escapeRegExp).join('|')})`, 'g');
  return (
    <>
      {text.split(pattern).map((part, index) =>
        present.includes(part) ? (
          <span key={index} className="rounded px-1 py-0.5 bg-[var(--primary)]/15 text-[var(--accent-text)] font-medium">
            {part}
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

/** Section header: label chip, heading, gradient underline bar. */
const SectionHeading = ({ icon, label, title }: { icon: string; label: string; title: string }) => (
  <div className="text-center mb-10 md:mb-12">
    <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--card-border)]">
      <Icon name={icon} size="xs" className="text-[var(--primary)]" />
      <span className="text-xs font-semibold tracking-widest text-[var(--accent-text)]">{label}</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
    <div
      className="h-1 w-16 mx-auto mt-4 rounded-full bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]"
      aria-hidden="true"
    />
  </div>
);

/** Bento tile shell — flat card surface with a hover accent border. */
const Tile = ({
  id,
  className = '',
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    id={id}
    className={`relative overflow-hidden rounded-3xl border bg-[var(--card-from-bg)] border-[var(--card-border)] p-6 md:p-7 transition-all duration-300 hover:border-[var(--primary)]/40 hover:shadow-lg hover:shadow-[var(--card-hover-shadow-color)] ${className}`}
  >
    {children}
  </div>
);

const TileTitle = ({ icon, text }: { icon: string; text: string }) => (
  <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--primary)]/10">
      <Icon name={icon} size="sm" className="text-[var(--accent-text)]" />
    </span>
    {text}
  </h3>
);

export default function HomeModern() {
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const { trackEvent } = useAnalyticsTracking();

  const c = COPY[locale as 'en' | 'fi'] ?? COPY.en;
  const testimonials = TESTIMONIALS[locale as 'en' | 'fi'] ?? TESTIMONIALS.en;
  const href = (path: string) => localizePath(path, locale);

  const projects = [
    {
      title: t('portfolio.cases.healthcare'),
      href: '/portfolio/healthcare-prioritization',
      image: '/images/portfolio/healthcare/healthcare.jpg',
      tag: c.caseStudy,
      tagClass: 'text-ds-violet-300',
    },
    {
      title: t('portfolio.cases.accessibility'),
      href: '/portfolio/accessibility',
      image: '/images/portfolio/accessibility/accessiblity-showcase.jpg',
      tag: c.caseStudy,
      tagClass: 'text-ds-violet-300',
    },
    {
      title: t('portfolio.cases.collaboration'),
      href: '/portfolio/workflow',
      image: '/images/portfolio/collaboration/cover.jpg',
      tag: c.prototype,
      tagClass: 'text-ds-cyan-400',
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-theme">
      <Navigation />

      {/* ── Profile hero — everything important above the fold ── */}
      <header className="relative overflow-hidden pt-28 md:pt-40 pb-12 md:pb-16" role="banner">
        {/* Static aurora mesh — pure CSS, no motion */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(600px 420px at 12% 18%, rgb(var(--glow-primary-rgb) / 0.16), transparent 65%),' +
              'radial-gradient(520px 380px at 88% 26%, rgb(var(--glow-secondary-rgb) / 0.13), transparent 65%),' +
              'radial-gradient(720px 520px at 45% 108%, rgb(var(--glow-tertiary-rgb) / 0.12), transparent 65%)',
          }}
        />
        {/* Dotted grid texture — subtle designer's-desk feel */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(rgb(var(--glow-primary-rgb) / 0.12) 1px, transparent 1.5px)',
            backgroundSize: '26px 26px',
          }}
        />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-[1fr_minmax(0,18rem)] lg:grid-cols-[1fr_minmax(0,21rem)] gap-10 lg:gap-14 items-center">
            {/* Intro */}
            <div className="text-center md:text-start">
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border bg-[var(--card-from-bg)] border-[var(--card-border)]">
                <span className="relative flex w-2 h-2" aria-hidden="true">
                  <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-60" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-[var(--color-success)]" />
                </span>
                <span className="text-xs font-semibold text-[var(--foreground)]/80">{c.availability}</span>
              </div>

              {/* Statement headline with a marker-highlighted word */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.12] tracking-tight mb-5">
                <span className="block">{c.heroLead}</span>
                <span className="block mt-2">
                  {c.heroStatementPre}{' '}
                  <span className="inline-block px-3 py-0.5 rounded-2xl text-[var(--text-on-primary)] [background:var(--btn-primary-gradient)] shadow-lg shadow-[var(--card-shadow-color)]">
                    {c.heroStatementHighlight}
                  </span>
                </span>
              </h1>

              <p className="text-lg md:text-xl font-semibold mb-8">
                <span className="bg-gradient-to-r from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] bg-clip-text text-transparent">
                  Ali Al-Zuhairi
                </span>
                <span className="text-[var(--muted-foreground)]"> · {c.role} @ Webropol</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                <Link
                  href={href('/portfolio')}
                  onClick={() => trackEvent('hero_cta_click', 'homepage_modern', 'portfolio')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-[var(--text-on-primary)] [background:var(--btn-primary-gradient)] hover:[background:var(--btn-primary-gradient-hover)] shadow-lg shadow-[var(--card-shadow-color)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  {c.viewPortfolio}
                  <Icon name="arrow_forward" size="sm" />
                </Link>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('hero_cta_click', 'homepage_modern', 'linkedin')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold border bg-[var(--card-from-bg)] border-[var(--card-border)] text-[var(--accent-text)] hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Breakout portrait — cutout rising over a gradient arch */}
            <div className="relative mx-auto w-64 sm:w-72 md:w-full max-w-sm mt-6 md:mt-0">
              {/* Hand-drawn "that's me!" arrow */}
              <div className="hidden lg:block rtl:hidden absolute -start-36 top-4 w-32 text-center" aria-hidden="true">
                <p className="text-sm italic font-semibold text-[var(--muted-foreground)] mb-1">{c.thatsMe}</p>
                <svg viewBox="0 0 100 44" fill="none" className="w-24 h-11 mx-auto">
                  <defs>
                    <linearGradient id="hero-arrow" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" style={{ stopColor: 'var(--gradient-start)' }} />
                      <stop offset="100%" style={{ stopColor: 'var(--gradient-mid)' }} />
                    </linearGradient>
                  </defs>
                  <path d="M6 6 C 22 32, 58 40, 90 26" stroke="url(#hero-arrow)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M79 21 L 91 25.5 L 83 34" stroke="url(#hero-arrow)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2.5rem]">
                {/* Gradient arch behind the cutout */}
                <div
                  className="absolute bottom-0 inset-x-0 h-[68%] rounded-t-full rounded-b-[2.5rem] bg-gradient-to-b from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] shadow-2xl shadow-[var(--card-shadow-color)]"
                  aria-hidden="true"
                />
                <Image
                  src="/images/hero/violet-full-t-half.png"
                  alt="Ali Al-Zuhairi"
                  width={1560}
                  height={1443}
                  priority
                  className="absolute bottom-0 -start-[6%] -end-[6%] w-[112%] max-w-none object-contain object-bottom"
                />
              </div>

              {/* Floating glass tiles */}
              <div className="absolute bottom-24 -start-3 md:-start-6 z-20 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border shadow-lg backdrop-blur-xl bg-[var(--nav-bg)] border-[var(--nav-border)]">
                <Icon name="location_on" size="sm" className="text-[var(--accent-text)]" />
                <span className="text-xs font-bold">{c.basedIn}</span>
              </div>
              <div className="absolute top-[30%] -end-3 md:-end-6 z-20 px-3.5 py-2.5 rounded-2xl border shadow-lg backdrop-blur-xl bg-[var(--nav-bg)] border-[var(--nav-border)] text-center">
                <p className="text-lg font-extrabold leading-none bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)] bg-clip-text text-transparent">
                  10+
                </p>
                <p className="text-[10px] font-semibold text-[var(--muted-foreground)] mt-0.5">{c.portraitYearsLabel}</p>
              </div>
              <div className="absolute bottom-3 start-4 end-4 z-20 flex items-center justify-center gap-2 px-3 py-2 rounded-2xl backdrop-blur-md bg-[var(--badge-overlay-bg)] border border-[var(--badge-overlay-border)] text-[var(--text-on-dark)]">
                <Icon name="verified" size="sm" />
                <span className="text-xs font-semibold">{t('footer.profession')}</span>
              </div>
            </div>
          </div>

          {/* Years of experience at a glance */}
          <div className="mt-12 md:mt-16">
            <ExperienceStats />
          </div>
        </div>
      </header>

      {/* ── At a glance — bento grid ── */}
      <section id="digital-dreams" className="py-14 md:py-20 bg-ds-section-alt relative">
        <div id="about" />
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading icon="auto_awesome" label={c.glanceLabel} title={c.glanceTitle} />

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
            {/* About */}
            <Tile className="md:col-span-4">
              <span className="absolute -end-5 -bottom-6 opacity-[0.06] text-[var(--primary)] pointer-events-none" aria-hidden="true">
                <Icon name="waving_hand" style={{ fontSize: '9rem' }} />
              </span>
              <TileTitle icon="waving_hand" text={c.aboutTitle} />
              <p className="leading-relaxed text-[var(--foreground)]/85 mb-4">{t('home.about.intro')}</p>
              <blockquote className="border-s-2 border-[var(--gradient-mid)] ps-4 text-sm italic text-[var(--muted-foreground)]">
                {t('home.about.quote')}
              </blockquote>
            </Tile>

            {/* Current role */}
            <Tile className="md:col-span-2">
              <div
                className="absolute inset-0 bg-gradient-to-br from-[var(--color-violet-500)]/8 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <h3 className="relative flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
                <span className="relative flex w-2 h-2 ms-1" aria-hidden="true">
                  <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-50" />
                  <span className="relative inline-flex rounded-full w-2 h-2 bg-[var(--primary)]" />
                </span>
                {c.nowLabel}
              </h3>
              <p className="text-lg font-semibold leading-snug">{c.nowRole}</p>
              <p className="text-sm text-[var(--muted-foreground)] mb-1">{c.nowCompany}</p>
              <p className="inline-block text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--primary)]/15 text-[var(--accent-text)] mb-4">
                {c.nowSince}
              </p>
              <ul className="space-y-2">
                {c.nowPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-[var(--foreground)]/80">
                    <Icon name="check_circle" size="sm" className="text-[var(--primary)] mt-0.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </Tile>

            {/* Career path — gradient timeline */}
            <Tile id="work-experience" className="md:col-span-3">
              <TileTitle icon="work_history" text={c.careerTitle} />
              <ol className="relative ms-2 space-y-6">
                <div
                  className="absolute start-[5px] top-2 bottom-2 w-0.5 rounded-full bg-gradient-to-b from-[var(--gradient-start)] via-[var(--gradient-mid)] to-transparent"
                  aria-hidden="true"
                />
                {c.career.map((entry, index) => (
                  <li key={entry.period} className="ps-6 relative">
                    <span
                      className={`absolute start-0 top-1 w-3 h-3 rounded-full ${index === 0 ? 'bg-[var(--primary)]' : 'bg-[var(--primary)]/40'}`}
                      aria-hidden="true"
                    />
                    <p className="font-semibold leading-snug">{entry.role}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{entry.company}</p>
                    <p className="text-xs font-bold text-[var(--accent-text)] mt-0.5">{entry.period}</p>
                  </li>
                ))}
              </ol>
            </Tile>

            {/* Skills */}
            <Tile id="strengths-skills" className="md:col-span-3">
              <TileTitle icon="psychology" text={c.skillsTitle} />
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {c.skills.map((skill, index) => (
                  <li
                    key={skill.label}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 border text-sm font-medium text-[var(--foreground)]/85 ${CHIP_HUES[index % CHIP_HUES.length]}`}
                  >
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg shrink-0 bg-[var(--primary)]/10">
                      <Icon name={skill.icon} size="xs" className="text-[var(--accent-text)]" />
                    </span>
                    {skill.label}
                  </li>
                ))}
              </ul>
            </Tile>

            {/* Focus areas */}
            <Tile className="md:col-span-2">
              <TileTitle icon="rocket_launch" text={c.focusTitle} />
              <ul className="space-y-2.5">
                {c.focus.map((item) => (
                  <li key={item.label} className="flex items-center gap-2.5 text-sm font-medium">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg shrink-0 bg-[var(--primary)]/10">
                      <Icon name={item.icon} size="xs" className="text-[var(--accent-text)]" />
                    </span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </Tile>

            {/* Toolbox */}
            <Tile className="md:col-span-2">
              <TileTitle icon="build" text={c.toolboxTitle} />
              <div className="flex flex-wrap gap-1.5">
                {c.tools.map((tool, index) => (
                  <span
                    key={tool}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold border text-[var(--foreground)]/85 ${CHIP_HUES[index % CHIP_HUES.length]}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </Tile>

            {/* Languages + podcast teaser */}
            <div className="md:col-span-2 flex flex-col gap-4 md:gap-5">
              <Tile className="flex-1">
                <TileTitle icon="language" text={c.languagesTitle} />
                <ul className="space-y-2">
                  {c.languages.map((lang) => (
                    <li key={lang.code} className="flex items-center gap-2.5 text-sm font-medium">
                      <span className="inline-flex items-center justify-center w-8 h-6 rounded-md text-[10px] font-bold bg-[var(--primary)]/10 text-[var(--accent-text)]">
                        {lang.code}
                      </span>
                      {lang.name}
                    </li>
                  ))}
                </ul>
              </Tile>
              <Tile id="podcast" className="flex-1">
                <TileTitle icon="podcasts" text={c.podcastTitle} />
                {/* Static equalizer bars — "on air" energy without animation */}
                <div className="flex items-end gap-1 h-6 mb-3" aria-hidden="true">
                  {[10, 22, 14, 24, 8, 18, 12, 20, 9].map((barHeight, index) => (
                    <span
                      key={index}
                      style={{ height: barHeight }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-[var(--gradient-start)] to-[var(--gradient-mid)]"
                    />
                  ))}
                </div>
                <p className="text-sm text-[var(--muted-foreground)] mb-3">{c.podcastText}</p>
                <Link
                  href={href('/audio')}
                  onClick={() => trackEvent('podcast_teaser_click', 'homepage_modern', 'audio')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-text)] hover:text-[var(--primary)] transition-colors"
                >
                  {c.podcastCta}
                  <Icon name="arrow_forward" size="xs" />
                </Link>
              </Tile>
            </div>
          </div>
        </div>
      </section>

      {/* ── Selected work ── */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 border border-[var(--card-border)]">
                <Icon name="work" size="xs" className="text-[var(--primary)]" />
                <span className="text-xs font-semibold tracking-widest text-[var(--accent-text)]">{c.workLabel}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{c.workTitle}</h2>
              <p className="text-[var(--muted-foreground)]">{c.workSubtitle}</p>
            </div>
            <Link
              href={href('/portfolio')}
              className="inline-flex items-center gap-1.5 shrink-0 text-sm font-semibold text-[var(--accent-text)] hover:text-[var(--primary)] transition-colors"
            >
              {c.viewAll}
              <Icon name="arrow_forward" size="xs" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, index) => (
              <Link
                key={project.href}
                href={href(project.href)}
                onClick={() => trackEvent('project_card_click', 'homepage_modern', project.href)}
                className="group rounded-3xl overflow-hidden border bg-[var(--card-from-bg)] border-[var(--card-border)] transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-xl hover:shadow-[var(--card-hover-shadow-color)] hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 start-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-[var(--badge-overlay-bg)] border border-[var(--badge-overlay-border)] ${project.tagClass}`}
                  >
                    {project.tag}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-5">
                  <span
                    className="text-2xl font-black leading-none bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-mid)] bg-clip-text text-transparent opacity-60"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="flex-1 font-semibold leading-snug group-hover:text-[var(--primary)] transition-colors">
                    {project.title}
                  </h3>
                  <Icon
                    name="arrow_forward"
                    size="sm"
                    className="text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-all duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-14 md:py-20 bg-ds-section-alt-2">
        <div className="container mx-auto px-4 max-w-6xl">
          <SectionHeading icon="format_quote" label={c.testimonialsLabel} title={t('home.testimonials.title')} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="relative overflow-hidden rounded-3xl border bg-[var(--card-from-bg)] border-[var(--card-border)] p-7 flex flex-col transition-all duration-300 hover:border-[var(--primary)]/40 hover:shadow-lg hover:shadow-[var(--card-hover-shadow-color)]"
              >
                <span className="absolute -end-4 -top-4 opacity-[0.06] text-[var(--primary)] pointer-events-none" aria-hidden="true">
                  <Icon name="format_quote" style={{ fontSize: '8rem' }} />
                </span>
                <Icon name="format_quote" size="lg" className="text-[var(--primary)] mb-4" />
                <blockquote className="text-sm md:text-base leading-relaxed text-[var(--foreground)]/85 flex-1">
                  <HighlightedText text={testimonial.text} phrases={testimonial.highlights} />
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-6 pt-5 border-t border-[var(--card-border)]">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm text-[var(--text-on-primary)] bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] shrink-0">
                    {testimonial.initials}
                  </span>
                  <span>
                    <span className="block font-semibold text-sm">{testimonial.name}</span>
                    <span className="block text-xs text-[var(--muted-foreground)]">{testimonial.position}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ── */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl p-8 md:p-14 text-center [background:var(--gradient-cosmic)]">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute -top-16 -start-16 w-64 h-64 rounded-full blur-3xl bg-[var(--text-on-cosmic)]/10" />
              <div className="absolute -bottom-16 -end-16 w-64 h-64 rounded-full blur-3xl bg-[var(--text-on-cosmic)]/10" />
              <span className="absolute top-8 start-[12%] text-[var(--text-on-cosmic)]/25" aria-hidden="true">
                <Icon name="auto_awesome" style={{ fontSize: '2rem' }} />
              </span>
              <span className="absolute bottom-10 end-[14%] text-[var(--text-on-cosmic)]/20" aria-hidden="true">
                <Icon name="auto_awesome" style={{ fontSize: '2.75rem' }} />
              </span>
              <span className="absolute top-1/2 end-[6%] text-[var(--text-on-cosmic)]/15" aria-hidden="true">
                <Icon name="auto_awesome" style={{ fontSize: '1.5rem' }} />
              </span>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-on-cosmic)] mb-3">{c.ctaTitle}</h2>
              <p className="text-[var(--text-on-cosmic)]/80 mb-8 max-w-xl mx-auto">{c.ctaText}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href={href('/portfolio')}
                  onClick={() => trackEvent('footer_cta_click', 'homepage_modern', 'portfolio')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold bg-[var(--color-white)] text-[var(--color-gray-900)] hover:opacity-90 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {c.viewPortfolio}
                  <Icon name="arrow_forward" size="sm" />
                </Link>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('footer_cta_click', 'homepage_modern', 'linkedin')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold border border-[var(--text-on-cosmic)]/40 text-[var(--text-on-cosmic)] hover:bg-[var(--text-on-cosmic)]/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon name="open_in_new" size="sm" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
