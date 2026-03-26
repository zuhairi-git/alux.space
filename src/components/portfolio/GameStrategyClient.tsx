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
  avatar: string;
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
    avatar: 'sports_esports',
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
    avatar: 'person',
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
    avatar: 'military_tech',
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
    avatar: 'group',
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

// ─── Component ───────────────────────────────────────────────────────────────

export default function GameStrategyClient() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const isLight = theme === 'light';
  const isColorful = theme === 'colorful';
  const [activePersona, setActivePersona] = useState(0);

  // ── Theme-aware color helpers ────────────────────────────────────────────

  const getColorStyles = (color: string) => {
    const styles: Record<string, { cardBg: string; iconText: string; iconBg: string; borderColor: string }> = {
      purple: {
        cardBg: isColorful ? 'bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-400/30' : isLight ? 'bg-purple-50 border border-purple-200' : 'bg-purple-900/20 border border-purple-500/20',
        iconText: isColorful ? 'text-purple-400' : isLight ? 'text-purple-600' : 'text-purple-400',
        iconBg: isColorful ? 'bg-purple-500/20' : isLight ? 'bg-purple-100' : 'bg-purple-900/40',
        borderColor: isColorful ? 'border-purple-500/30' : isLight ? 'border-purple-200' : 'border-purple-500/20',
      },
      blue: {
        cardBg: isColorful ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/30' : isLight ? 'bg-blue-50 border border-blue-200' : 'bg-blue-900/20 border border-blue-500/20',
        iconText: isColorful ? 'text-blue-400' : isLight ? 'text-blue-600' : 'text-blue-400',
        iconBg: isColorful ? 'bg-blue-500/20' : isLight ? 'bg-blue-100' : 'bg-blue-900/40',
        borderColor: isColorful ? 'border-blue-500/30' : isLight ? 'border-blue-200' : 'border-blue-500/20',
      },
      green: {
        cardBg: isColorful ? 'bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-400/30' : isLight ? 'bg-green-50 border border-green-200' : 'bg-green-900/20 border border-green-500/20',
        iconText: isColorful ? 'text-green-400' : isLight ? 'text-green-600' : 'text-green-400',
        iconBg: isColorful ? 'bg-green-500/20' : isLight ? 'bg-green-100' : 'bg-green-900/40',
        borderColor: isColorful ? 'border-green-500/30' : isLight ? 'border-green-200' : 'border-green-500/20',
      },
      orange: {
        cardBg: isColorful ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-400/30' : isLight ? 'bg-orange-50 border border-orange-200' : 'bg-orange-900/20 border border-orange-500/20',
        iconText: isColorful ? 'text-orange-400' : isLight ? 'text-orange-600' : 'text-orange-400',
        iconBg: isColorful ? 'bg-orange-500/20' : isLight ? 'bg-orange-100' : 'bg-orange-900/40',
        borderColor: isColorful ? 'border-orange-500/30' : isLight ? 'border-orange-200' : 'border-orange-500/20',
      },
      teal: {
        cardBg: isColorful ? 'bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-400/30' : isLight ? 'bg-teal-50 border border-teal-200' : 'bg-teal-900/20 border border-teal-500/20',
        iconText: isColorful ? 'text-teal-400' : isLight ? 'text-teal-600' : 'text-teal-400',
        iconBg: isColorful ? 'bg-teal-500/20' : isLight ? 'bg-teal-100' : 'bg-teal-900/40',
        borderColor: isColorful ? 'border-teal-500/30' : isLight ? 'border-teal-200' : 'border-teal-500/20',
      },
      pink: {
        cardBg: isColorful ? 'bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-400/30' : isLight ? 'bg-pink-50 border border-pink-200' : 'bg-pink-900/20 border border-pink-500/20',
        iconText: isColorful ? 'text-pink-400' : isLight ? 'text-pink-600' : 'text-pink-400',
        iconBg: isColorful ? 'bg-pink-500/20' : isLight ? 'bg-pink-100' : 'bg-pink-900/40',
        borderColor: isColorful ? 'border-pink-500/30' : isLight ? 'border-pink-200' : 'border-pink-500/20',
      },
      red: {
        cardBg: isColorful ? 'bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-400/30' : isLight ? 'bg-red-50 border border-red-200' : 'bg-red-900/20 border border-red-500/20',
        iconText: isColorful ? 'text-red-400' : isLight ? 'text-red-600' : 'text-red-400',
        iconBg: isColorful ? 'bg-red-500/20' : isLight ? 'bg-red-100' : 'bg-red-900/40',
        borderColor: isColorful ? 'border-red-500/30' : isLight ? 'border-red-200' : 'border-red-500/20',
      },
      indigo: {
        cardBg: isColorful ? 'bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border border-indigo-400/30' : isLight ? 'bg-indigo-50 border border-indigo-200' : 'bg-indigo-900/20 border border-indigo-500/20',
        iconText: isColorful ? 'text-indigo-400' : isLight ? 'text-indigo-600' : 'text-indigo-400',
        iconBg: isColorful ? 'bg-indigo-500/20' : isLight ? 'bg-indigo-100' : 'bg-indigo-900/40',
        borderColor: isColorful ? 'border-indigo-500/30' : isLight ? 'border-indigo-200' : 'border-indigo-500/20',
      },
      cyan: {
        cardBg: isColorful ? 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-400/30' : isLight ? 'bg-cyan-50 border border-cyan-200' : 'bg-cyan-900/20 border border-cyan-500/20',
        iconText: isColorful ? 'text-cyan-400' : isLight ? 'text-cyan-600' : 'text-cyan-400',
        iconBg: isColorful ? 'bg-cyan-500/20' : isLight ? 'bg-cyan-100' : 'bg-cyan-900/40',
        borderColor: isColorful ? 'border-cyan-500/30' : isLight ? 'border-cyan-200' : 'border-cyan-500/20',
      },
    };
    return styles[color] || styles.blue;
  };

  const cardClass = `rounded-2xl p-6 transition-all duration-300 ${
    isColorful
      ? 'bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm'
      : isLight
        ? 'bg-white border border-gray-200 shadow-sm'
        : 'bg-white/[0.03] border border-white/[0.06]'
  }`;

  const activeP = personas[activePersona];
  const activeColor = getColorStyles(activeP.color);

  // ── Market Research Data ─────────────────────────────────────────────────

  const marketStats = [
    { label: 'Global Gaming Market', value: '$187.7B', icon: 'public', note: '2024 Revenue', color: 'blue' },
    { label: 'Mobile Gaming Share', value: '49%', icon: 'smartphone', note: 'Largest segment', color: 'green' },
    { label: 'Average Session Length', value: '28 min', icon: 'timer', note: 'Mobile F2P', color: 'orange' },
    { label: 'Global Gamers', value: '3.4B', icon: 'groups', note: 'Active players', color: 'purple' },
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
    <div className={`min-h-screen transition-colors duration-300 ${
      isColorful
        ? 'bg-[var(--color-colorful-bg)]'
        : isLight
          ? 'bg-gradient-to-br from-slate-50 to-gray-100'
          : 'bg-gradient-to-br from-gray-900 to-black'
    }`}>
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
            <p className={`text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${
              isColorful ? 'text-gray-200' : isLight ? 'text-gray-600' : 'text-gray-300'
            }`}>
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
                  const c = getColorStyles(stat.color);
                  return (
                    <motion.div
                      key={i}
                      className={`${cardClass} text-center hover:-translate-y-1`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${c.iconBg}`}>
                        <span className={`material-symbols text-xl ${c.iconText}`}>{stat.icon}</span>
                      </div>
                      <p className={`text-2xl font-bold mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>{stat.value}</p>
                      <p className={`text-sm font-medium mb-1 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{stat.label}</p>
                      <p className={`text-xs ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{stat.note}</p>
                    </motion.div>
                  );
                })}
              </div>
            </CaseStudyItem>
            <CaseStudyItem>
              <div className={`${cardClass} p-8`}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getColorStyles('blue').iconBg}`}>
                    <span className={`material-symbols text-lg ${getColorStyles('blue').iconText}`}>moving</span>
                  </div>
                  <div>
                    <h4 className={`text-lg font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                      {locale === 'fi' ? 'Kilpailuanalyysi' : 'Competitive Analysis'}
                    </h4>
                    <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                      {locale === 'fi'
                        ? 'Markkinatutkimus paljasti aliedustetun segmentin: pelit, jotka yhdistävät taitopohjaisen PvP:n, rikkaan tarinankerronnan ja reilun monetisaation. Suurimmat kilpailijat suosivat joko hardcore- tai casual-segmenttejä, jättäen "ammattitaitoisen keskisegmentin" vajaasti palvelluksi.'
                        : 'Market research revealed an underserved segment: games combining skill-based PvP with rich narrative and fair monetization. Top competitors favor either hardcore or casual segments, leaving the "skilled mid-core" underserved.'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {[
                    { label: locale === 'fi' ? 'Suora kilpailu' : 'Direct Competitors', value: '12', icon: 'swords' },
                    { label: locale === 'fi' ? 'Markkinamahdollisuus' : 'Market Opportunity', value: '$2.4B', icon: 'trending_up' },
                    { label: locale === 'fi' ? 'Keskimääräinen CPI' : 'Average CPI', value: '$1.80', icon: 'payments' },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${isColorful ? 'bg-white/[0.04]' : isLight ? 'bg-gray-50' : 'bg-white/[0.03]'}`}>
                      <span className={`material-symbols text-lg ${getColorStyles('blue').iconText}`}>{item.icon}</span>
                      <div>
                        <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>{item.label}</p>
                        <p className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 2. User Personas ──────────────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Käyttäjäpersoonat & kohderyhmätutkimus' : 'User Personas & Audience Research'} icon="groups" accent="purple" number={2}>
            <CaseStudyItem>
              <p className={`text-center text-sm mb-8 max-w-2xl mx-auto ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                {locale === 'fi'
                  ? 'Nämä persoonat on rakennettu kyselytutkimusten (n=1,200), pelikäyttäytymisdatan ja markkinatutkimuksen pohjalta ohjaamaan jokaista suunnittelu- ja markkinointipäätöstä.'
                  : 'These personas are built from survey data (n=1,200), behavioral analytics, and market research to inform every design and marketing decision.'}
              </p>

              {/* Persona Selector Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {personas.map((p, i) => {
                  const isActive = activePersona === i;
                  const pColor = getColorStyles(p.color);
                  return (
                    <button
                      key={i}
                      onClick={() => setActivePersona(i)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? `${pColor.cardBg} ${pColor.iconText} shadow-lg`
                          : isColorful
                            ? 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]'
                            : isLight
                              ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                              : 'bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]'
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
                  className={`${activeColor.cardBg} rounded-2xl p-8 max-w-4xl mx-auto`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Identity */}
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 ${activeColor.iconBg}`}>
                          <Image src={activeP.image} alt={activeP.name} width={64} height={64} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className={`text-xl font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{activeP.name}</h4>
                          <p className={`text-sm ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>{activeP.occupation}</p>
                          <p className={`text-xs font-medium mt-1 ${activeColor.iconText}`}>{locale === 'fi' ? 'Ikä' : 'Age'}: {activeP.age}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                            {locale === 'fi' ? 'Motivaatio' : 'Motivation'}
                          </p>
                          <p className={`text-sm ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{activeP.motivation}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                            {locale === 'fi' ? 'Kulutuskäyttäytyminen' : 'Spending Behavior'}
                          </p>
                          <p className={`text-sm ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{activeP.spendingBehavior}</p>
                        </div>
                        <div>
                          <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                            {locale === 'fi' ? 'Pelitunnit/viikko' : 'Weekly Play'}
                          </p>
                          <p className={`text-sm font-medium ${activeColor.iconText}`}>{activeP.weeklyHours}</p>
                        </div>
                      </div>

                      <div className={`mt-6 p-4 rounded-xl italic text-sm ${
                        isColorful ? 'bg-white/[0.04]' : isLight ? 'bg-gray-50' : 'bg-white/[0.04]'
                      } ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                        {activeP.quote}
                      </div>
                    </div>

                    {/* Right: Details */}
                    <div className="space-y-5">
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                          {locale === 'fi' ? 'Alustat' : 'Platforms'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeP.platforms.map((pl, j) => (
                            <span key={j} className={`px-3 py-1 rounded-lg text-xs font-medium ${activeColor.iconBg} ${activeColor.iconText}`}>
                              {pl}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                          {locale === 'fi' ? 'Suosikkigenret' : 'Favorite Genres'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {activeP.favoriteGenres.map((g, j) => (
                            <span key={j} className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              isColorful ? 'bg-white/[0.06] text-gray-300' : isLight ? 'bg-gray-100 text-gray-600' : 'bg-white/[0.06] text-gray-300'
                            }`}>
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                          {locale === 'fi' ? 'Kipupisteet' : 'Pain Points'}
                        </p>
                        <ul className="space-y-2">
                          {activeP.painPoints.map((pp, j) => (
                            <li key={j}>
                              <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{pp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Persona → Design Impact Connection */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className={`${cardClass} p-5`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`material-symbols text-lg ${getColorStyles('green').iconText}`}>link</span>
                    <h5 className={`text-sm font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>
                      {locale === 'fi' ? 'Persoonasta suunnitteluun' : 'Persona → Design Decisions'}
                    </h5>
                  </div>
                  <ul className={`text-sm space-y-2 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                    <li>• Victor → Competitive ranked modes + cosmetic shop</li>
                    <li>• Vivian → Accessibility features + ethical monetization</li>
                    <li>• Marcus → Deep progression + endgame systems</li>
                    <li>• Yuki → Social guilds + co-op content pipeline</li>
                  </ul>
                </div>
                <div className={`${cardClass} p-5`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`material-symbols text-lg ${getColorStyles('orange').iconText}`}>campaign</span>
                    <h5 className={`text-sm font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>
                      {locale === 'fi' ? 'Persoonasta markkinointiin' : 'Persona → Marketing Approach'}
                    </h5>
                  </div>
                  <ul className={`text-sm space-y-2 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                    <li>• Victor → Twitch/YouTube influencer campaigns</li>
                    <li>• Vivian → ASO + aesthetic social media content</li>
                    <li>• Marcus → Community forums + dev diaries</li>
                    <li>• Yuki → Discord community + creator program</li>
                  </ul>
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 3. Game Concept & Mechanics ────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Pelikonsepti & mekaniikka' : 'Game Concept & Mechanics'} icon="sports_esports" accent="red" number={3}>
            <CaseStudyItem>
              <div className={`${cardClass} p-8 mb-8 text-center`}>
                <h4 className={`text-xl font-bold mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {locale === 'fi' ? 'Ydinvisio' : 'Core Vision'}
                </h4>
                <p className={`text-base leading-relaxed max-w-2xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                  {locale === 'fi'
                    ? 'Tarinavetoinen action-RPG, jossa yhdistyvät taitopohjaiset taistelut, sosiaalit yhteistyöjärjestelmät ja reilun free-to-play -monetisaation malli — suunniteltu palvelemaan kaikkia neljää kohdepersoonaa ilman kompromisseja.'
                    : 'A narrative-driven action RPG combining skill-based combat, social cooperative systems, and a fair free-to-play monetization model — designed to serve all four target personas without compromise.'}
                </p>
              </div>
            </CaseStudyItem>

            <CaseStudyItem>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {gameplayMechanics.map((mech, i) => {
                  const c = getColorStyles(mech.color);
                  return (
                    <motion.div
                      key={i}
                      className={`${cardClass} hover:-translate-y-1`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c.iconBg}`}>
                        <span className={`material-symbols text-lg ${c.iconText}`}>{mech.icon}</span>
                      </div>
                      <h4 className={`text-base font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>{mech.title}</h4>
                      <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{mech.desc}</p>
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
                  const c = getColorStyles('teal');
                  return (
                    <div key={i} className={`${cardClass} hover:-translate-y-1`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${c.iconBg}`}>
                          <span className={`material-symbols text-lg ${c.iconText}`}>{ux.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`text-base font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{ux.title}</h4>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${c.iconBg} ${c.iconText}`}>{ux.metric}</span>
                          </div>
                          <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{ux.desc}</p>
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
                <div className={`absolute left-6 top-0 bottom-0 w-px hidden md:block ${isColorful ? 'bg-gradient-to-b from-purple-500/40 via-blue-500/40 to-green-500/40' : isLight ? 'bg-gray-200' : 'bg-white/10'}`} />

                <div className="space-y-6">
                  {developmentPhases.map((phase, i) => {
                    const c = getColorStyles(phase.accent);
                    return (
                      <motion.div
                        key={i}
                        className={`${cardClass} md:ml-16 relative`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                      >
                        {/* Timeline dot */}
                        <div className={`absolute -left-[3.25rem] top-6 w-5 h-5 rounded-full hidden md:flex items-center justify-center ${c.iconBg} ring-4 ${isColorful ? 'ring-[var(--color-colorful-bg)]' : isLight ? 'ring-gray-50' : 'ring-gray-900'}`}>
                          <span className={`material-symbols text-xs ${c.iconText}`}>{phase.icon}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center md:hidden ${c.iconBg}`}>
                                <span className={`material-symbols text-sm ${c.iconText}`}>{phase.icon}</span>
                              </div>
                              <div>
                                <h4 className={`text-base font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{phase.phase}</h4>
                                <span className={`text-xs font-medium ${c.iconText}`}>{phase.duration}</span>
                              </div>
                            </div>
                            <ul className={`space-y-1.5 text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                              {phase.items.map((item, j) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${c.iconText.replace('text-', 'bg-')}`} />
                                  {item}
                                </li>
                              ))}
                            </ul>
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
              <p className={`text-center text-sm mb-8 max-w-2xl mx-auto ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                {locale === 'fi'
                  ? 'Reilun monetisaation malli, joka on suunniteltu persoonatietojen perusteella — ei pay-to-win-mekaniikkoja, keskittyen kosmeettisiin ostoksiin ja vapaaehtoiseen mainosten katseluun.'
                  : 'A fair monetization model designed from persona data — zero pay-to-win mechanics, focusing on cosmetic purchases and opt-in ad viewing.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {monetizationModel.map((item, i) => {
                  const c = getColorStyles('orange');
                  return (
                    <div key={i} className={`${cardClass} hover:-translate-y-1`}>
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.iconBg}`}>
                          <span className={`material-symbols text-xl ${c.iconText}`}>{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-base font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{item.model}</h4>
                            <span className={`text-lg font-extrabold ${c.iconText}`}>{item.revenue}</span>
                          </div>
                          <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Revenue split bar */}
              <div className={`${cardClass} p-6`}>
                <h5 className={`text-sm font-bold mb-4 text-center ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                  {locale === 'fi' ? 'Tulojakauma (ennuste)' : 'Projected Revenue Split'}
                </h5>
                <div className="h-4 rounded-full overflow-hidden flex">
                  <div className="bg-purple-500 h-full" style={{ width: '45%' }} title="Cosmetic Shop 45%" />
                  <div className="bg-blue-500 h-full" style={{ width: '30%' }} title="Battle Pass 30%" />
                  <div className="bg-green-500 h-full" style={{ width: '15%' }} title="Ad Monetization 15%" />
                  <div className="bg-orange-500 h-full" style={{ width: '10%' }} title="Starter Packs 10%" />
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-3">
                  {[
                    { label: locale === 'fi' ? 'Kosmeettiset' : 'Cosmetics', color: 'bg-purple-500', pct: '45%' },
                    { label: 'Battle Pass', color: 'bg-blue-500', pct: '30%' },
                    { label: locale === 'fi' ? 'Mainokset' : 'Ads', color: 'bg-green-500', pct: '15%' },
                    { label: locale === 'fi' ? 'Aloituspaketit' : 'Starter Packs', color: 'bg-orange-500', pct: '10%' },
                  ].map((leg, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <div className={`w-2.5 h-2.5 rounded-full ${leg.color}`} />
                      <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>{leg.label} ({leg.pct})</span>
                    </div>
                  ))}
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 7. Marketing Strategy ─────────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Markkinointistrategia & käyttäjähankinta' : 'Marketing Strategy & User Acquisition'} icon="campaign" accent="pink" number={7}>
            <CaseStudyItem>
              <div className={`${cardClass} p-8 mb-8`}>
                <h4 className={`text-lg font-bold mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {locale === 'fi' ? 'Asemointi ja brändäys' : 'Positioning & Branding'}
                </h4>
                <p className={`text-sm leading-relaxed mb-4 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                  {locale === 'fi'
                    ? 'Asemoidutaan "reiluna taitopohjaisena RPG:nä, joka kunnioittaa pelaajan aikaa ja lompakkoa". Brändi-identiteetti yhdistää elokuvallisen visuaalisuuden saavutettavaan pelattavuuteen — houkutellen sekä Victor:n kilpailullista intoa että Vivian:n esteettistä herkkyyttä.'
                    : 'Positioned as "the fair skill-based RPG that respects your time and wallet." Brand identity merges cinematic visuals with approachable gameplay — attracting both Victor\'s competitive drive and Vivian\'s aesthetic sensibility.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: locale === 'fi' ? 'Ääni' : 'Brand Voice', value: locale === 'fi' ? 'Rohkea, reilu, yhteisöllinen' : 'Bold, fair, community-first', icon: 'record_voice_over' },
                    { label: locale === 'fi' ? 'Visuaalinen identiteetti' : 'Visual Identity', value: locale === 'fi' ? 'Elokuvallinen mutta leikkisä' : 'Cinematic yet playful', icon: 'palette' },
                    { label: locale === 'fi' ? 'Arvolupaus' : 'Value Proposition', value: locale === 'fi' ? 'Ei pay-to-win, kaikki ovat tervetulleita' : 'Zero pay-to-win, everyone belongs', icon: 'verified' },
                  ].map((b, i) => (
                    <div key={i} className={`p-4 rounded-xl ${isColorful ? 'bg-white/[0.04]' : isLight ? 'bg-gray-50' : 'bg-white/[0.03]'}`}>
                      <span className={`material-symbols text-lg mb-2 ${getColorStyles('pink').iconText}`}>{b.icon}</span>
                      <p className={`text-xs font-medium mb-1 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{b.label}</p>
                      <p className={`text-sm font-semibold ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>{b.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CaseStudyItem>

            <CaseStudyItem>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {marketingChannels.map((ch, i) => {
                  const c = getColorStyles(ch.color);
                  return (
                    <motion.div
                      key={i}
                      className={`${cardClass} hover:-translate-y-1`}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${c.iconBg}`}>
                        <span className={`material-symbols text-lg ${c.iconText}`}>{ch.icon}</span>
                      </div>
                      <h4 className={`text-base font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>{ch.channel}</h4>
                      <p className={`text-sm leading-relaxed mb-3 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{ch.desc}</p>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${c.iconBg} ${c.iconText}`}>{ch.kpi}</span>
                    </motion.div>
                  );
                })}
              </div>
            </CaseStudyItem>

            {/* Launch Timeline */}
            <CaseStudyItem>
              <div className={`${cardClass} p-8 mt-6`}>
                <h4 className={`text-lg font-bold mb-6 text-center ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {locale === 'fi' ? 'Julkaisuaikataulu' : 'Launch Timeline'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { phase: locale === 'fi' ? 'T-12 viikkoa' : 'T-12 Weeks', label: locale === 'fi' ? 'Tease & hype' : 'Tease & Hype', items: ['Cinematic teaser trailer', 'Social media presence launch', 'Press kit distribution'], icon: 'movie', color: 'purple' },
                    { phase: locale === 'fi' ? 'T-8 viikkoa' : 'T-8 Weeks', label: locale === 'fi' ? 'Yhteisön rakentaminen' : 'Community Building', items: ['Discord server launch', 'Creator beta access', 'Dev diary series start'], icon: 'groups', color: 'blue' },
                    { phase: locale === 'fi' ? 'T-4 viikkoa' : 'T-4 Weeks', label: locale === 'fi' ? 'UA-ramppi' : 'UA Ramp-Up', items: ['Performance ad campaigns', 'Influencer gameplay reveals', 'Pre-registration push'], icon: 'rocket_launch', color: 'green' },
                    { phase: locale === 'fi' ? 'Julkaisupäivä' : 'Launch Day', label: locale === 'fi' ? 'Globaali julkaisu' : 'Global Release', items: ['App Store featuring push', 'Live launch event stream', '24hr community war event'], icon: 'celebration', color: 'orange' },
                  ].map((t, i) => {
                    const c = getColorStyles(t.color);
                    return (
                      <div key={i} className={`p-5 rounded-xl ${isColorful ? 'bg-white/[0.04]' : isLight ? 'bg-gray-50' : 'bg-white/[0.03]'}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${c.iconBg}`}>
                          <span className={`material-symbols text-sm ${c.iconText}`}>{t.icon}</span>
                        </div>
                        <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${c.iconText}`}>{t.phase}</p>
                        <p className={`text-sm font-semibold mb-3 ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>{t.label}</p>
                        <ul className={`text-xs space-y-1 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                          {t.items.map((item, j) => (
                            <li key={j} className="flex items-start gap-1.5">
                              <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${c.iconText.replace('text-', 'bg-')}`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 8. Community & Retention ───────────────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Yhteisö & pitkäaikainen pysyvyys' : 'Community & Long-Term Retention'} icon="loyalty" accent="indigo" number={8}>
            <CaseStudyItem>
              <div className="space-y-4">
                {retentionTactics.map((rt, i) => {
                  const c = getColorStyles('indigo');
                  return (
                    <motion.div
                      key={i}
                      className={`${cardClass} hover:-translate-y-0.5`}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.iconBg}`}>
                          <span className={`material-symbols text-xl ${c.iconText}`}>{rt.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                            <h4 className={`text-base font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{rt.tactic}</h4>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg self-start ${getColorStyles('green').iconBg} ${getColorStyles('green').iconText}`}>{rt.impact}</span>
                          </div>
                          <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{rt.desc}</p>
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
                  const c = getColorStyles(pillar.color);
                  return (
                    <div key={i} className={`${cardClass} text-center hover:-translate-y-1`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${c.iconBg}`}>
                        <span className={`material-symbols text-xl ${c.iconText}`}>{pillar.icon}</span>
                      </div>
                      <h4 className={`text-base font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>{pillar.title}</h4>
                      <p className={`text-sm leading-relaxed mb-3 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{pillar.desc}</p>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${c.iconBg} ${c.iconText}`}>{pillar.metric}</span>
                    </div>
                  );
                })}
              </div>
            </CaseStudyItem>
          </CaseStudySection>

          {/* ── 9. Data-Driven Decision Framework ─────────────────────────── */}
          <CaseStudySection title={locale === 'fi' ? 'Dataohjattu päätöksenteko' : 'Data-Driven Decision Framework'} icon="insights" accent="cyan" number={9}>
            <CaseStudyItem>
              <div className={`${cardClass} p-8 mb-8`}>
                <div className="text-center mb-8">
                  <h4 className={`text-lg font-bold mb-3 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {locale === 'fi' ? 'Kuinka data ohjaa jokaista päätöstä' : 'How Data Informs Every Decision'}
                  </h4>
                  <p className={`text-sm max-w-2xl mx-auto ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
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
                    const c = getColorStyles(col.color);
                    return (
                      <div key={i} className={`p-5 rounded-xl ${isColorful ? 'bg-white/[0.04]' : isLight ? 'bg-gray-50' : 'bg-white/[0.03]'}`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.iconBg}`}>
                            <span className={`material-symbols text-sm ${c.iconText}`}>{col.icon}</span>
                          </div>
                          <h5 className={`text-sm font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>{col.title}</h5>
                        </div>
                        <div className="space-y-3">
                          {col.connections.map((conn, j) => (
                            <div key={j} className="flex items-center gap-2 text-xs">
                              <span className={`flex-shrink-0 px-2 py-1 rounded ${c.iconBg} ${c.iconText} font-medium`}>{conn.from}</span>
                              <span className={`material-symbols text-sm ${isLight ? 'text-gray-300' : 'text-gray-600'}`}>arrow_forward</span>
                              <span className={isLight ? 'text-gray-600' : 'text-gray-400'}>{conn.to}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
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
                  const c = getColorStyles(takeaway.color);
                  return (
                    <motion.div
                      key={i}
                      className={`${cardClass} text-center hover:-translate-y-1`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${c.iconBg}`}>
                        <span className={`material-symbols text-2xl ${c.iconText}`}>{takeaway.icon}</span>
                      </div>
                      <h4 className={`text-lg font-bold mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>{takeaway.title}</h4>
                      <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{takeaway.desc}</p>
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
