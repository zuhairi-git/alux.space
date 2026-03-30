'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { delaySeconds, transition as t } from '@/design-system';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import CaseStudyHero from './CaseStudyHero';
import CaseStudySection, { CaseStudyItem } from './CaseStudySection';
import CaseStudyProgress from './CaseStudyProgress';

// ─── User Persona Data ───────────────────────────────────────────────────────

interface Persona {
  name: string;
  age: string;
  image: string;
  occupation: string;
  platforms: string[];
  weeklyHours: string;
  motivation: string;
  spendingBehavior: string;
  favoriteGenres: string[];
  painPoints: string[];
  quote: string;
  color: string;
}

const personas: Persona[] = [
  {
    name: 'Victor Chen',
    age: '16–22',
    image: '/images/portfolio/profile-img/vector-chen.jpg',
    occupation: 'Student / Part-time Streamer',
    platforms: ['Mobile', 'PC', 'Console'],
    weeklyHours: '20–30 hrs',
    motivation: 'Competition, social validation, streaming content',
    spendingBehavior: 'Spends on cosmetics & battle passes ($10–25/mo)',
    favoriteGenres: ['Battle Royale', 'MOBAs', 'Action RPGs'],
    painPoints: ['Pay-to-win mechanics', 'Slow matchmaking', 'Lack of cross-play'],
    quote: '"I want to show off my skills and look good doing it."',
    color: 'purple',
  },
  {
    name: 'Vivian Wonderoos',
    age: '25–34',
    image: '/images/portfolio/profile-img/vivian-wonderoos.jpg',
    occupation: 'UX Designer / Casual Gamer',
    platforms: ['Mobile', 'Nintendo Switch'],
    weeklyHours: '5–10 hrs',
    motivation: 'Relaxation, narrative immersion, aesthetic pleasure',
    spendingBehavior: 'Selective premium purchases ($5–15/mo)',
    favoriteGenres: ['Puzzle', 'Narrative Adventure', 'Simulation'],
    painPoints: ['Aggressive monetization', 'Excessive notifications', 'Time-gated content'],
    quote: '"Games are my creative escape — don\'t ruin it with pop-ups."',
    color: 'teal',
  },
  {
    name: 'Marcus Johnson',
    age: '28–40',
    image: '/images/portfolio/profile-img/markus-johnson.jpg',
    occupation: 'Software Engineer / Hardcore Gamer',
    platforms: ['PC', 'Console'],
    weeklyHours: '15–25 hrs',
    motivation: 'Mastery, deep progression systems, community leadership',
    spendingBehavior: 'High-value purchases for meaningful content ($30–60/mo)',
    favoriteGenres: ['Strategy', 'Survival', 'MMORPGs'],
    painPoints: ['Shallow endgame', 'Server instability', 'Lack of mod support'],
    quote: '"Give me systems I can master over hundreds of hours."',
    color: 'blue',
  },
  {
    name: 'Yuki Tanaka',
    age: '18–28',
    image: '/images/portfolio/profile-img/yuki-tanaka.jpg',
    occupation: 'Content Creator / Community Manager',
    platforms: ['Mobile', 'PC'],
    weeklyHours: '10–20 hrs',
    motivation: 'Social connection, community building, co-op experiences',
    spendingBehavior: 'Social/gifting purchases & subscriptions ($15–30/mo)',
    favoriteGenres: ['Co-op RPGs', 'Social Sims', 'Party Games'],
    painPoints: ['Solo-focused design', 'Toxic communities', 'No guild systems'],
    quote: '"The best games are the ones I play with my community."',
    color: 'pink',
  },
];

// ─── Color tokens — palette-based, opacity-driven, works across all themes ──
// iconBg / iconText use Tailwind opacity modifiers so they auto-adapt.
// For blue we reference --primary (semantic) so it follows primary color changes.

const getColor = (color?: string) => {
  // Ignore the passed color to force all accents to use primary theme mapping
  void color;
  return {
    iconBg: 'bg-primary/10',
    iconText: 'text-primary',
    accentBar: 'bg-primary'
  };
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function GameStrategyClient() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';
  const [activePersona, setActivePersona] = useState(0);

  // Inner sub-panel surface: 4% foreground over the page BG gives a subtle
  // separation in all three themes without needing separate per-theme classes.
  const surfaceBg = isLight ? 'bg-black/[0.04]' : 'bg-white/[0.04]';

  const activeP = personas[activePersona];
  const activeC = getColor(activeP.color);

  // ── Market Research Data ─────────────────────────────────────────────────

  const marketStats = [
    { label: 'Global Gaming Market', value: '$187.7B', note: '2024 Revenue', color: 'blue' },
    { label: 'Mobile Gaming Share', value: '49%', note: 'Largest segment', color: 'green' },
    { label: 'Average Session Length', value: '28 min', note: 'Mobile F2P', color: 'orange' },
    { label: 'Global Gamers', value: '3.4B', note: 'Active players', color: 'purple' },
  ];

  const developmentPhases = [
    { phase: 'Concept & Pre-Production', duration: '8 weeks', icon: 'lightbulb', accent: 'purple' as const, items: ['Core game concept definition', 'Competitive landscape analysis', 'Technical feasibility study', 'Art style exploration & mood boards', 'Initial GDD (Game Design Document)'] },
    { phase: 'Prototyping', duration: '6 weeks', icon: 'science', accent: 'blue' as const, items: ['Core loop implementation', 'Control scheme validation', 'Player feedback loops (haptics, audio)', 'Vertical slice build', 'Early playtesting sessions'] },
    { phase: 'Production', duration: '20 weeks', icon: 'construction', accent: 'green' as const, items: ['Full feature development sprint cycles', 'Asset pipeline & art production', 'Sound design & music integration', 'Backend infrastructure & analytics SDK', 'Progressive QA integration'] },
    { phase: 'Polish & Testing', duration: '8 weeks', icon: 'bug_report', accent: 'orange' as const, items: ['Performance optimization passes', 'Accessibility compliance audit', 'Closed beta testing program', 'Crash rate & ANR optimization', 'Localization across 12 languages'] },
    { phase: 'Soft Launch', duration: '6 weeks', icon: 'rocket_launch', accent: 'teal' as const, items: ['Geo-restricted release (3 markets)', 'KPI benchmarking (D1/D7/D30)', 'Economy balancing iteration', 'Server load & scalability testing', 'Ad mediation calibration'] },
    { phase: 'Global Launch & Live Ops', duration: 'Ongoing', icon: 'language', accent: 'pink' as const, items: ['Worldwide simultaneous release', 'Season pass & event calendar', 'Community feedback integration', 'Monthly content updates', 'A/B testing monetization'] },
  ];

  const gameplayMechanics = [
    { title: 'Core Loop', icon: 'replay', desc: 'Explore → Battle → Loot → Upgrade — a satisfying loop driven by persona research showing 73% of target players prioritize progression.', color: 'purple' },
    { title: 'Social Systems', icon: 'diversity_3', desc: 'Guild alliances, real-time co-op raids, and social gifting. Designed for Yuki\'s persona — players who stay 2.4x longer with social features.', color: 'blue' },
    { title: 'Skill-Based PvP', icon: 'swords', desc: 'ELO-ranked matchmaking with seasonal leagues. Victor\'s persona data shows competitive players have 40% higher ARPU.', color: 'red' },
    { title: 'Dynamic Difficulty', icon: 'tune', desc: 'ML-powered difficulty scaling that adapts to player skill. Reduces churn by 31% for Vivian\'s casual segment.', color: 'green' },
    { title: 'Narrative Branching', icon: 'auto_stories', desc: 'Choice-driven story with 4 endings. Vivian\'s persona research shows narrative games see 58% higher completion rates.', color: 'teal' },
    { title: 'Live Events', icon: 'celebration', desc: 'Time-limited seasonal events with exclusive rewards. Data shows 67% of lapsed players return during major events.', color: 'orange' },
  ];

  const uxPrinciples = [
    { title: 'Onboarding Flow', icon: 'school', desc: 'Progressive disclosure tutorial — 3 guided sessions introducing mechanics gradually. A/B tested: skip rate dropped from 42% to 11%.', metric: '11% skip rate' },
    { title: 'Accessibility', icon: 'accessibility_new', desc: 'Full colorblind modes, scalable UI, one-handed controls, subtitles with speaker identification. WCAG 2.1 AA compliance.', metric: 'WCAG 2.1 AA' },
    { title: 'Session Design', icon: 'hourglass_top', desc: 'Meaningful 3-minute sessions for mobile, with deep 45+ minute sessions for PC/console. Respects all persona time budgets.', metric: '3–45 min range' },
    { title: 'Notification Ethics', icon: 'notifications_off', desc: 'Opt-in smart notifications only. Vivian\'s persona data: 67% of casual players uninstall games with aggressive push notifications.', metric: 'Opt-in only' },
  ];

  const marketingChannels = [
    { channel: 'Influencer Partnerships', icon: 'videocam', desc: 'Micro-influencers (10K–100K) for authenticity, macro for launch. Focus on gameplay, not ads.', kpi: 'CPI: $1.20 target', color: 'purple' },
    { channel: 'App Store Optimization', icon: 'store', desc: 'Keyword-optimized listings, A/B tested screenshots, preview videos. Conversion rate optimization.', kpi: 'CVR: 35% target', color: 'blue' },
    { channel: 'Performance Marketing', icon: 'ads_click', desc: 'UA campaigns across Meta, TikTok, Unity Ads. Lookalike audiences from soft-launch data.', kpi: 'ROAS: 140% D30', color: 'green' },
    { channel: 'Community & Discord', icon: 'forum', desc: 'Pre-launch Discord server, beta access, creator program. Build before you launch.', kpi: '50K pre-registrations', color: 'teal' },
    { channel: 'Cross-Promotion', icon: 'swap_horiz', desc: 'Strategic partnerships with complementary game studios. Shared audiences, shared growth.', kpi: '15% organic lift', color: 'orange' },
    { channel: 'Content Marketing', icon: 'article', desc: 'Dev diaries, behind-the-scenes, art showcases. Build emotional connection before launch.', kpi: '500K impressions/mo', color: 'pink' },
  ];

  const retentionTactics = [
    { tactic: 'Battle Pass System', desc: 'Free + premium track with 100 tiers. Marcus\'s persona data: progression-focused players convert at 3x the average rate.', icon: 'military_tech', impact: '+28% D30 retention' },
    { tactic: 'Daily Reward Calendar', desc: 'Escalating value over 30 days with a premium milestone at day 7. Designed to convert Vivian\'s casual segment.', icon: 'calendar_month', impact: '+15% DAU' },
    { tactic: 'Guild Wars & Seasons', desc: 'Quarterly competitive seasons with guild leaderboards. Yuki\'s persona: social competition drives 2.1x session frequency.', icon: 'emoji_events', impact: '+42% social engagement' },
    { tactic: 'Re-engagement Campaigns', desc: 'Personalized push + email for lapsed users at D3, D7, D14, D30 with escalating incentives.', icon: 'mark_email_read', impact: '12% reactivation rate' },
    { tactic: 'Player Milestones', desc: 'Celebrate achievements at 1hr, 10hr, 100hr with shareable cards. Leverages Victor\'s streamer persona behavioral data.', icon: 'workspace_premium', impact: '+23% share rate' },
  ];

  const monetizationModel = [
    { model: 'Cosmetic Shop', icon: 'palette', revenue: '45%', desc: 'Skins, emotes, effects — no gameplay advantage. Validated by Victor\'s persona: willingness to pay for self-expression.' },
    { model: 'Battle Pass', icon: 'card_membership', revenue: '30%', desc: '$9.99/season with guaranteed value. Marcus\'s data: high-engagement players prefer predictable spending.' },
    { model: 'Ad Monetization', icon: 'play_circle', revenue: '15%', desc: 'Opt-in rewarded videos only. Respects Vivian\'s anti-interruption preference while monetizing non-payers.' },
    { model: 'Starter Packs', icon: 'redeem', revenue: '10%', desc: 'One-time value offers at key progression gates. Conversion-optimized for new players at hours 2, 5, and 10.' },
  ];

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navigation />
      <CaseStudyProgress />
      <article className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">

          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <CaseStudyHero
            title={locale === 'fi' ? 'Pelinkehitys- ja markkinointistrategia' : 'Game Development & Marketing Strategy'}
            subtitle={locale === 'fi'
              ? 'Dataohjattu lähestymistapa pelisuunnitteluun, käyttäjäkokemukseen ja kasvustrategiaan — käyttäjäpersoonista julkaisusuunnitelmiin.'
              : 'A data-driven approach to game design, UX, and growth strategy — from user personas to launch plans.'}
            image="/images/portfolio/game-dev/cover.jpg"
            tags={['Game Design', 'Marketing Strategy', 'User Research', 'Growth']}
            meta={[
              { label: locale === 'fi' ? 'Projektityyppi' : 'Project Type', value: locale === 'fi' ? 'Strateginen tapaustutkimus' : 'Strategic Case Study', icon: 'category' },
              { label: locale === 'fi' ? 'Painopiste' : 'Focus', value: locale === 'fi' ? 'Kehitys & markkinointi' : 'Development & Marketing', icon: 'target' },
              { label: locale === 'fi' ? 'Menetelmät' : 'Methods', value: locale === 'fi' ? 'Persoonat, data-analyysi, A/B-testaus' : 'Personas, Data Analysis, A/B Testing', icon: 'build' },
              { label: locale === 'fi' ? 'Alusta' : 'Platform', value: locale === 'fi' ? 'Mobiili, PC, konsoli' : 'Mobile, PC, Console', icon: 'devices' },
            ]}
          />

          {/* ── Intro ─────────────────────────────────────────────────────── */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...t.enterSlow, delay: delaySeconds.md }}
          >
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-[var(--muted-foreground)]">
              {locale === 'fi'
                ? 'Tämä strateginen tapaustutkimus yhdistää pelisuunnittelun, markkinointistrategian ja käyttäjätutkimuksen yhtenäiseksi viitekehykseksi. Jokainen päätös — mekaniikasta monetisaatioon — pohjautuu kohderyhmätietoihin ja käyttäjäpersooniin.'
                : 'This strategic case study bridges game design, marketing strategy, and user research into a unified framework. Every decision — from mechanics to monetization — is grounded in audience data and validated through user personas.'}
            </p>
          </motion.div>

          {/* ── 1. Market Research ─────────────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Markkinatutkimus & tilannekatsaus' : 'Market Research & Landscape'} icon="analytics" accent="blue" number={1}>
            <CaseStudyItem>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {marketStats.map((stat, i) => {
                  const c = getColor(stat.color);
                  return (
                    <motion.div
                      key={i}
                      className="theme-card hover:-translate-y-1 transition-transform duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className="theme-card-content p-6 text-center">
                        <p className={`text-2xl font-bold mb-1 ${c.iconText}`}>{stat.value}</p>
                        <p className="text-sm font-medium mb-1 text-foreground">{stat.label}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{stat.note}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CaseStudyItem>
            <CaseStudyItem>
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <h4 className="text-lg font-bold mb-2 text-foreground">
                    {locale === 'fi' ? 'Kilpailuanalyysi' : 'Competitive Analysis'}
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {locale === 'fi'
                      ? 'Markkinatutkimus paljasti aliedustetun segmentin: pelit, jotka yhdistävät taitopohjaisen PvP:n, rikkaan tarinankerronnan ja reilun monetisaation. Suurimmat kilpailijat suosivat joko hardcore- tai casual-segmenttejä, jättäen "ammattitaitoisen keskisegmentin" vajaasti palvelluksi.'
                      : 'Market research revealed an underserved segment: games combining skill-based PvP with rich narrative and fair monetization. Top competitors favor either hardcore or casual segments, leaving the "skilled mid-core" underserved.'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {[
                      { label: locale === 'fi' ? 'Suora kilpailu' : 'Direct Competitors', value: '12' },
                      { label: locale === 'fi' ? 'Markkinamahdollisuus' : 'Market Opportunity', value: '$2.4B' },
                      { label: locale === 'fi' ? 'Keskimääräinen CPI' : 'Average CPI', value: '$1.80' },
                    ].map((item, i) => (
                      <div key={i} className={`p-3 rounded-xl ${surfaceBg}`}>
                        <p className="text-xs text-[var(--muted-foreground)]">{item.label}</p>
                        <p className="text-sm font-bold text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 2. User Personas ──────────────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Käyttäjäpersoonat & kohderyhmätutkimus' : 'User Personas & Audience Research'} icon="groups" accent="purple" number={2}>
            <CaseStudyItem>
              <p className="text-center text-sm mb-8 max-w-2xl mx-auto text-[var(--muted-foreground)]">
                {locale === 'fi'
                  ? 'Nämä persoonat on rakennettu kyselytutkimusten (n=1,200), pelikäyttäytymisdatan ja markkinatutkimuksen pohjalta ohjaamaan jokaista suunnittelu- ja markkinointipäätöstä.'
                  : 'These personas are built from survey data (n=1,200), behavioral analytics, and market research to inform every design and marketing decision.'}
              </p>

              {/* Persona Selector Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {personas.map((p, i) => {
                  const isActive = activePersona === i;
                  const pColor = getColor(p.color);
                  return (
                    // eslint-disable-next-line design-system/no-raw-html-elements -- persona selector tab with dynamic color themes and avatar image
                    <button
                      key={i}
                      onClick={() => setActivePersona(i)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `${pColor.iconBg} ${pColor.iconText} shadow-sm`
                          : `${surfaceBg} text-[var(--muted-foreground)] hover:text-foreground`
                      }`}
                    >
                      <Image src={p.image} alt={p.name} width={24} height={24} className="w-6 h-6 rounded-full object-cover" />
                      {p.name}
                    </button>
                  );
                })}
              </div>

              {/* Active Persona Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePersona}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={t.snap}
                  className="max-w-4xl mx-auto theme-card"
                >
                  {/* Persona accent strip — colored top bar using persona's palette token */}
                  <div className="theme-card-content p-0">
                    <div className={`h-1 w-full ${activeC.accentBar}`} />
                    <div className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left: Identity */}
                        <div>
                          <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 ${activeC.iconBg}`}>
                              <Image src={activeP.image} alt={activeP.name} width={64} height={64} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold text-foreground">{activeP.name}</h4>
                              <p className="text-sm text-[var(--muted-foreground)]">{activeP.occupation}</p>
                              <p className={`text-xs font-medium mt-1 ${activeC.iconText}`}>{locale === 'fi' ? 'Ikä' : 'Age'}: {activeP.age}</p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider mb-1.5 text-[var(--muted-foreground)]">
                                {locale === 'fi' ? 'Motivaatio' : 'Motivation'}
                              </p>
                              <p className="text-sm text-foreground">{activeP.motivation}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider mb-1.5 text-[var(--muted-foreground)]">
                                {locale === 'fi' ? 'Kulutuskäyttäytyminen' : 'Spending Behavior'}
                              </p>
                              <p className="text-sm text-foreground">{activeP.spendingBehavior}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider mb-1.5 text-[var(--muted-foreground)]">
                                {locale === 'fi' ? 'Pelitunnit/viikko' : 'Weekly Play'}
                              </p>
                              <p className={`text-sm font-medium ${activeC.iconText}`}>{activeP.weeklyHours}</p>
                            </div>
                          </div>

                          <div className={`mt-6 p-4 rounded-xl italic text-sm ${surfaceBg} text-[var(--muted-foreground)]`}>
                            {activeP.quote}
                          </div>
                        </div>

                        {/* Right: Details */}
                        <div className="space-y-5">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--muted-foreground)]">
                              {locale === 'fi' ? 'Alustat' : 'Platforms'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {activeP.platforms.map((pl, j) => (
                                <span key={j} className={`px-3 py-1 rounded-lg text-xs font-medium ${activeC.iconBg} ${activeC.iconText}`}>
                                  {pl}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--muted-foreground)]">
                              {locale === 'fi' ? 'Suosikkigenret' : 'Favorite Genres'}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {activeP.favoriteGenres.map((g, j) => (
                                <span key={j} className={`px-3 py-1 rounded-lg text-xs font-medium ${surfaceBg} text-[var(--muted-foreground)]`}>
                                  {g}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider mb-2 text-[var(--muted-foreground)]">
                              {locale === 'fi' ? 'Kipupisteet' : 'Pain Points'}
                            </p>
                            <ul className="space-y-1.5">
                              {activeP.painPoints.map((pp, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm text-[var(--muted-foreground)]">
                                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${activeC.accentBar} opacity-70`} />
                                  {pp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Persona → Design Impact Connection */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="theme-card">
                  <div className="theme-card-content p-5">
                    <h5 className="text-sm font-bold mb-3 text-foreground">
                      {locale === 'fi' ? 'Persoonasta suunnitteluun' : 'Persona → Design Decisions'}
                    </h5>
                    <ul className="text-sm space-y-2 text-[var(--muted-foreground)]">
                      <li>• Victor → Competitive ranked modes + cosmetic shop</li>
                      <li>• Vivian → Accessibility features + ethical monetization</li>
                      <li>• Marcus → Deep progression + endgame systems</li>
                      <li>• Yuki → Social guilds + co-op content pipeline</li>
                    </ul>
                  </div>
                </div>
                <div className="theme-card">
                  <div className="theme-card-content p-5">
                    <h5 className="text-sm font-bold mb-3 text-foreground">
                      {locale === 'fi' ? 'Persoonasta markkinointiin' : 'Persona → Marketing Approach'}
                    </h5>
                    <ul className="text-sm space-y-2 text-[var(--muted-foreground)]">
                      <li>• Victor → Twitch/YouTube influencer campaigns</li>
                      <li>• Vivian → ASO + aesthetic social media content</li>
                      <li>• Marcus → Community forums + dev diaries</li>
                      <li>• Yuki → Discord community + creator program</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 3. Game Concept & Mechanics ────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Pelikonsepti & mekaniikka' : 'Game Concept & Mechanics'} icon="sports_esports" accent="red" number={3}>
            <CaseStudyItem>
              <div className="theme-card mb-8">
                <div className="theme-card-content p-8 text-center">
                  <h4 className="text-xl font-bold mb-3 text-foreground">
                    {locale === 'fi' ? 'Ydinvisio' : 'Core Vision'}
                  </h4>
                  <p className="text-base leading-relaxed max-w-2xl mx-auto text-[var(--muted-foreground)]">
                    {locale === 'fi'
                      ? 'Tarinavetoinen action-RPG, jossa yhdistyvät taitopohjaiset taistelut, sosiaalit yhteistyöjärjestelmät ja reilun free-to-play -monetisaation malli — suunniteltu palvelemaan kaikkia neljää kohdepersoonaa ilman kompromisseja.'
                      : 'A narrative-driven action RPG combining skill-based combat, social cooperative systems, and a fair free-to-play monetization model — designed to serve all four target personas without compromise.'}
                  </p>
                </div>
              </div>
            </CaseStudyItem>

            <CaseStudyItem>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {gameplayMechanics.map((mech, i) => {
                  return (
                    <motion.div
                      key={i}
                      className="theme-card hover:-translate-y-1 transition-transform duration-200"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="theme-card-content p-6">
                        <h4 className="text-base font-bold mb-2 text-foreground">{mech.title}</h4>
                        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{mech.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 4. UX Design Principles ────────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'UX-suunnitteluperiaatteet' : 'UX Design Principles'} icon="design_services" accent="teal" number={4}>
            <CaseStudyItem>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {uxPrinciples.map((ux, i) => {
                  const c = getColor('teal');
                  return (
                    <div key={i} className="theme-card hover:-translate-y-1 transition-transform duration-200">
                      <div className="theme-card-content p-6">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-base font-bold text-foreground">{ux.title}</h4>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${c.iconBg} ${c.iconText}`}>{ux.metric}</span>
                          </div>
                          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{ux.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 5. Development Phases ──────────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Kehitysvaiheet & aikataulu' : 'Development Phases & Timeline'} icon="timeline" accent="green" number={5}>
            <CaseStudyItem>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-px hidden md:block bg-gradient-to-b from-primary/30 via-primary/20 to-transparent" />

                <div className="space-y-6">
                  {developmentPhases.map((phase, i) => {
                    const c = getColor(phase.accent);
                    return (
                      <motion.div
                        key={i}
                        className="md:ml-16 relative"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                      >
                        {/* Timeline dot / Number for Desktop */}
                        <div className={`absolute -left-[3.4rem] top-4 w-8 h-8 rounded-full hidden md:flex items-center justify-center text-xs font-bold bg-primary text-white ring-4 ring-background`}>
                          {String(i + 1).padStart(2, '0')}
                        </div>

                        <div className="theme-card">
                          <div className="theme-card-content p-6">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  {/* Number for Mobile */}
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center md:hidden text-xs font-bold bg-primary text-white`}>
                                    {String(i + 1).padStart(2, '0')}
                                  </div>
                                  <div>
                                    <h4 className="text-base font-bold text-foreground">{phase.phase}</h4>
                                    <span className={`text-xs font-medium ${c.iconText}`}>{phase.duration}</span>
                                  </div>
                                </div>
                                <ul className="space-y-1.5 text-sm text-[var(--muted-foreground)]">
                                  {phase.items.map((item, j) => (
                                    <li key={j} className="flex items-start gap-2">
                                      <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${c.iconBg}`} />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 6. Monetization Model ─────────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Monetisaatiomalli' : 'Monetization Model'} icon="payments" accent="orange" number={6}>
            <CaseStudyItem>
              <p className="text-center text-sm mb-8 max-w-2xl mx-auto text-[var(--muted-foreground)]">
                {locale === 'fi'
                  ? 'Reilun monetisaation malli, joka on suunniteltu persoonatietojen perusteella — ei pay-to-win-mekaniikkoja, keskittyen kosmeettisiin ostoksiin ja vapaaehtoiseen mainosten katseluun.'
                  : 'A fair monetization model designed from persona data — zero pay-to-win mechanics, focusing on cosmetic purchases and opt-in ad viewing.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {monetizationModel.map((item, i) => {
                  const c = getColor('orange');
                  return (
                    <div key={i} className="theme-card hover:-translate-y-1 transition-transform duration-200">
                      <div className="theme-card-content p-6">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-base font-bold text-foreground">{item.model}</h4>
                            <span className={`text-lg font-extrabold ${c.iconText}`}>{item.revenue}</span>
                          </div>
                          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Revenue split bar */}
              <div className="theme-card">
                <div className="theme-card-content p-6">
                  <h5 className="text-sm font-bold mb-4 text-center text-foreground">
                    {locale === 'fi' ? 'Tulojakauma (ennuste)' : 'Projected Revenue Split'}
                  </h5>
                  <div className="h-4 rounded-full overflow-hidden flex">
                    <div className="bg-primary h-full" style={{ width: '45%' }} title="Cosmetic Shop 45%" />
                    <div className="bg-foreground/60 h-full" style={{ width: '30%' }} title="Battle Pass 30%" />
                    <div className="bg-foreground/40 h-full" style={{ width: '15%' }} title="Ad Monetization 15%" />
                    <div className="bg-foreground/20 h-full" style={{ width: '10%' }} title="Starter Packs 10%" />
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-3">
                    {[
                      { label: locale === 'fi' ? 'Kosmeettiset' : 'Cosmetics', color: 'bg-primary', pct: '45%' },
                      { label: 'Battle Pass', color: 'bg-foreground/60', pct: '30%' },
                      { label: locale === 'fi' ? 'Mainokset' : 'Ads', color: 'bg-foreground/40', pct: '15%' },
                      { label: locale === 'fi' ? 'Aloituspaketit' : 'Starter Packs', color: 'bg-foreground/20', pct: '10%' },
                    ].map((leg, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs">
                        <div className={`w-2.5 h-2.5 rounded-full ${leg.color}`} />
                        <span className="text-[var(--muted-foreground)]">{leg.label} ({leg.pct})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 7. Marketing Strategy ─────────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Markkinointistrategia & käyttäjähankinta' : 'Marketing Strategy & User Acquisition'} icon="campaign" accent="pink" number={7}>
            <CaseStudyItem>
              <div className="theme-card mb-8">
                <div className="theme-card-content p-8">
                  <h4 className="text-lg font-bold mb-3 text-foreground">
                    {locale === 'fi' ? 'Asemointi ja brändäys' : 'Positioning & Branding'}
                  </h4>
                  <p className="text-sm leading-relaxed mb-4 text-[var(--muted-foreground)]">
                    {locale === 'fi'
                      ? 'Asemoidutaan "reiluna taitopohjaisena RPG:nä, joka kunnioittaa pelaajan aikaa ja lompakkoa". Brändi-identiteetti yhdistää elokuvallisen visuaalisuuden saavutettavaan pelattavuuteen — houkutellen sekä Victor:n kilpailullista intoa että Vivian:n esteettistä herkkyyttä.'
                      : 'Positioned as "the fair skill-based RPG that respects your time and wallet." Brand identity merges cinematic visuals with approachable gameplay — attracting both Victor\'s competitive drive and Vivian\'s aesthetic sensibility.'}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { label: locale === 'fi' ? 'Ääni' : 'Brand Voice', value: locale === 'fi' ? 'Rohkea, reilu, yhteisöllinen' : 'Bold, fair, community-first' },
                      { label: locale === 'fi' ? 'Visuaalinen identiteetti' : 'Visual Identity', value: locale === 'fi' ? 'Elokuvallinen mutta leikkisä' : 'Cinematic yet playful' },
                      { label: locale === 'fi' ? 'Arvolupaus' : 'Value Proposition', value: locale === 'fi' ? 'Ei pay-to-win, kaikki ovat tervetulleita' : 'Zero pay-to-win, everyone belongs' },
                    ].map((b, i) => (
                      <div key={i} className={`p-4 rounded-xl ${surfaceBg}`}>
                        <p className="text-xs font-medium mb-1 text-[var(--muted-foreground)]">{b.label}</p>
                        <p className="text-sm font-semibold text-foreground">{b.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CaseStudyItem>

            <CaseStudyItem>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {marketingChannels.map((ch, i) => {
                  const c = getColor(ch.color);
                  return (
                    <motion.div
                      key={i}
                      className="theme-card hover:-translate-y-1 transition-transform duration-200"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className="theme-card-content p-6">
                        <h4 className="text-base font-bold mb-2 text-foreground">{ch.channel}</h4>
                        <p className="text-sm leading-relaxed mb-3 text-[var(--muted-foreground)]">{ch.desc}</p>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${c.iconBg} ${c.iconText}`}>{ch.kpi}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CaseStudyItem>

            {/* Launch Timeline */}
            <CaseStudyItem>
              <div className="theme-card mt-6">
                <div className="theme-card-content p-8">
                  <h4 className="text-lg font-bold mb-6 text-center text-foreground">
                    {locale === 'fi' ? 'Julkaisuaikataulu' : 'Launch Timeline'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { phase: locale === 'fi' ? 'T-12 viikkoa' : 'T-12 Weeks', label: locale === 'fi' ? 'Tease & hype' : 'Tease & Hype', items: ['Cinematic teaser trailer', 'Social media presence launch', 'Press kit distribution'], color: 'purple' },
                      { phase: locale === 'fi' ? 'T-8 viikkoa' : 'T-8 Weeks', label: locale === 'fi' ? 'Yhteisön rakentaminen' : 'Community Building', items: ['Discord server launch', 'Creator beta access', 'Dev diary series start'], color: 'blue' },
                      { phase: locale === 'fi' ? 'T-4 viikkoa' : 'T-4 Weeks', label: locale === 'fi' ? 'UA-ramppi' : 'UA Ramp-Up', items: ['Performance ad campaigns', 'Influencer gameplay reveals', 'Pre-registration push'], color: 'green' },
                      { phase: locale === 'fi' ? 'Julkaisupäivä' : 'Launch Day', label: locale === 'fi' ? 'Globaali julkaisu' : 'Global Release', items: ['App Store featuring push', 'Live launch event stream', '24hr community war event'], color: 'orange' },
                    ].map((tl, i) => {
                      const c = getColor(tl.color);
                      return (
                        <div key={i} className={`p-5 rounded-xl ${surfaceBg}`}>
                          <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${c.iconText}`}>{tl.phase}</p>
                          <p className="text-sm font-semibold mb-3 text-foreground">{tl.label}</p>
                          <ul className="text-xs space-y-1 text-[var(--muted-foreground)]">
                            {tl.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-1.5">
                                <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${c.accentBar} opacity-60`} />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 8. Community & Retention ───────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Yhteisö & pitkäaikainen pysyvyys' : 'Community & Long-Term Retention'} icon="loyalty" accent="indigo" number={8}>
            <CaseStudyItem>
              <div className="space-y-4">
                {retentionTactics.map((rt, i) => {
                  const g = getColor('green');
                  return (
                    <motion.div
                      key={i}
                      className="theme-card hover:-translate-y-0.5 transition-transform duration-200"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <div className="theme-card-content p-6">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                            <h4 className="text-base font-bold text-foreground">{rt.tactic}</h4>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg self-start ${g.iconBg} ${g.iconText}`}>{rt.impact}</span>
                          </div>
                          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{rt.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CaseStudyItem>

            {/* Community Pillars */}
            <CaseStudyItem>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                {[
                  { title: locale === 'fi' ? 'Discord-yhteisö' : 'Discord Community', icon: 'forum', desc: locale === 'fi' ? 'Moderoidut kanavat, AMA-sessiot kehittäjien kanssa, pelaajapalautejärjestelmä' : 'Moderated channels, developer AMAs, player feedback pipeline', metric: '50K+ members target', color: 'indigo' },
                  { title: locale === 'fi' ? 'Sisällönluojaohjelma' : 'Creator Program', icon: 'videocam', desc: locale === 'fi' ? 'Porrastettu kumppanuusohjelma yksinomaisella pääsyllä, tulonjako ja markkinointituki' : 'Tiered partnership program with exclusive access, revenue share, and marketing support', metric: '200 creators at launch', color: 'purple' },
                  { title: locale === 'fi' ? 'Pelaajan ääni -ohjelma' : 'Player Voice Program', icon: 'how_to_vote', desc: locale === 'fi' ? 'Kuukausittaiset kyselyt, ominaisuusäänestykset ja beeta-testiryhmä — pelaajat ohjaavat tuotetta' : 'Monthly surveys, feature voting, and beta testing group — players shape the roadmap', metric: '82% satisfaction target', color: 'teal' },
                ].map((pillar, i) => {
                  const c = getColor(pillar.color);
                  return (
                    <div key={i} className="theme-card hover:-translate-y-1 transition-transform duration-200">
                      <div className="theme-card-content p-6 text-center">
                        <h4 className="text-base font-bold mb-2 text-foreground">{pillar.title}</h4>
                        <p className="text-sm leading-relaxed mb-3 text-[var(--muted-foreground)]">{pillar.desc}</p>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${c.iconBg} ${c.iconText}`}>{pillar.metric}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 9. Data-Driven Decision Framework ─────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Dataohjattu päätöksenteko' : 'Data-Driven Decision Framework'} icon="insights" accent="cyan" number={9}>
            <CaseStudyItem>
              <div className="theme-card mb-8">
                <div className="theme-card-content p-8">
                  <div className="text-center mb-8">
                    <h4 className="text-lg font-bold mb-3 text-foreground">
                      {locale === 'fi' ? 'Kuinka data ohjaa jokaista päätöstä' : 'How Data Informs Every Decision'}
                    </h4>
                    <p className="text-sm max-w-2xl mx-auto text-[var(--muted-foreground)]">
                      {locale === 'fi'
                        ? 'Silta yleisötutkimuksen, tuotesuunnittelun ja markkinoinnin toteutuksen välillä — jokainen piirre ja kampanja on jäljitettävissä persoonatietoihin.'
                        : 'The bridge between audience research, product design, and marketing execution — every feature and campaign is traceable to persona data.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: locale === 'fi' ? 'Tutkimus → Suunnittelu' : 'Research → Design',
                        icon: 'science',
                        color: 'purple',
                        connections: [
                          { from: locale === 'fi' ? '73% haluaa etenemistä' : '73% want progression', to: locale === 'fi' ? 'Monikerroksinen loot-järjestelmä' : 'Multi-layered loot system' },
                          { from: locale === 'fi' ? '67% poistaa aggressiivisen pelin' : '67% uninstall aggressive apps', to: locale === 'fi' ? 'Eettinen monetisaatio' : 'Ethical monetization' },
                          { from: locale === 'fi' ? '2.4x pidempi sessio sosiaalisella' : '2.4x longer sessions w/ social', to: locale === 'fi' ? 'Guild-järjestelmä päivästä 1' : 'Guild system from day 1' },
                        ]
                      },
                      {
                        title: locale === 'fi' ? 'Suunnittelu → Markkinointi' : 'Design → Marketing',
                        icon: 'sync_alt',
                        color: 'blue',
                        connections: [
                          { from: locale === 'fi' ? 'Taitopohjainen PvP' : 'Skill-based PvP', to: locale === 'fi' ? 'Esports-markkinointi' : 'Esports marketing angle' },
                          { from: locale === 'fi' ? 'Kaunis taide' : 'Beautiful art style', to: locale === 'fi' ? 'Visuaalinen somesisältö' : 'Visual social media content' },
                          { from: locale === 'fi' ? 'Reilu F2P' : 'Fair F2P model', to: locale === 'fi' ? '"Ei P2W" -positiointi' : '"No P2W" positioning' },
                        ]
                      },
                      {
                        title: locale === 'fi' ? 'Markkinointi → Kasvu' : 'Marketing → Growth',
                        icon: 'trending_up',
                        color: 'green',
                        connections: [
                          { from: locale === 'fi' ? 'Discord-yhteisö' : 'Discord community', to: locale === 'fi' ? 'Orgaaninen WoM-kasvu' : 'Organic WoM growth' },
                          { from: locale === 'fi' ? 'Vaikuttajakampanjat' : 'Influencer campaigns', to: locale === 'fi' ? 'Edullinen CPI' : 'Low-cost CPI acquisition' },
                          { from: locale === 'fi' ? 'Kausitapahtumat' : 'Seasonal events', to: locale === 'fi' ? 'Menetettyjen pelaajien palautus' : 'Lapsed player reactivation' },
                        ]
                      },
                    ].map((col, i) => {
                      const c = getColor(col.color);
                      return (
                        <div key={i} className={`p-5 rounded-xl ${surfaceBg}`}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.iconBg}`}>
                              <span className={`material-symbols text-sm ${c.iconText}`}>{col.icon}</span>
                            </div>
                            <h5 className="text-sm font-bold text-foreground">{col.title}</h5>
                          </div>
                          <div className="space-y-3">
                            {col.connections.map((conn, j) => (
                              <div key={j} className="flex items-center gap-2 text-xs">
                                <span className={`flex-shrink-0 px-2 py-1 rounded ${c.iconBg} ${c.iconText} font-medium`}>{conn.from}</span>
                                <span className="material-symbols text-sm text-[var(--muted-foreground)]">arrow_forward</span>
                                <span className="text-[var(--muted-foreground)]">{conn.to}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 10. Key Takeaways ──────────────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Keskeiset opit' : 'Key Takeaways'} icon="emoji_objects" accent="purple" number={10} showDivider={true}>
            <CaseStudyItem>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                {[
                  { title: locale === 'fi' ? 'Käyttäjälähtöinen' : 'User-Centered', icon: 'person_search', desc: locale === 'fi' ? 'Jokainen mekaniikka, ominaisuus ja markkinointikanava on jäljitettävissä tunnistettuun käyttäjätarpeeseen.' : 'Every mechanic, feature, and marketing channel traces back to a validated user need.', color: 'purple' },
                  { title: locale === 'fi' ? 'Dataohjattu' : 'Data-Driven', icon: 'query_stats', desc: locale === 'fi' ? 'Kvantitatiiviset mittarit ohjaavat priorisointia — ei oletuksia, vaan näyttöä persoonatiedoista ja vertailuarvoista.' : 'Quantitative metrics guide prioritization — no assumptions, just evidence from persona data and benchmarks.', color: 'blue' },
                  { title: locale === 'fi' ? 'Strateginen linjaus' : 'Strategic Alignment', icon: 'hub', desc: locale === 'fi' ? 'Suunnittelu, kehitys ja markkinointi toimivat yhtenäisenä järjestelmänä — ei erillisinä toimintoina.' : 'Design, development, and marketing operate as a unified system — not separate functions.', color: 'green' },
                ].map((takeaway, i) => {
                  const c = getColor(takeaway.color);
                  return (
                    <motion.div
                      key={i}
                      className="theme-card hover:-translate-y-1 transition-transform duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="theme-card-content p-6 text-center">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${c.iconBg}`}>
                          <span className={`material-symbols text-2xl ${c.iconText}`}>{takeaway.icon}</span>
                        </div>
                        <h4 className="text-lg font-bold mb-2 text-foreground">{takeaway.title}</h4>
                        <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">{takeaway.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CaseStudyItem>
          </CaseStudySection>

        </div>
      </article>
    </div>
  );
}
