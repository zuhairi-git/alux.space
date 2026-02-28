'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/app/mobile/shared';
import type { MobileTheme } from '@/app/mobile/themes';

export interface IntroAITip {
    icon: string;
    title: string;
    body: string;
}

export interface IntroFeature {
    icon: string;
    label: string;
    desc: string;
}

export interface MobileIntroConfig {
    appName: string;
    tagline: string;
    appIcon: string;
    accentGradient: string;    // e.g. 'from-blue-500 to-indigo-600'
    aiTips: IntroAITip[];
    features: IntroFeature[];
}

interface MobileIntroScreenProps {
    config: MobileIntroConfig;
    theme: MobileTheme;
    onComplete: (chosenTheme: string) => void;
}

const THEME_OPTIONS = [
    {
        v: 'dark',
        label: 'Dark',
        desc: 'Easy on the eyes',
        icon: 'dark_mode',
        swatchBg: 'bg-[#111114]',
        swatchText: 'text-white',
    },
    {
        v: 'light',
        label: 'Light',
        desc: 'Clean & minimal',
        icon: 'light_mode',
        swatchBg: 'bg-[#F7F7FA]',
        swatchText: 'text-gray-900',
    },
    {
        v: 'colorful',
        label: 'Colorful',
        desc: 'Vivid & expressive',
        icon: 'palette',
        swatchBg: 'bg-[#050023]',
        swatchText: 'text-white',
    },
] as const;

const pageVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 56 : -56, scale: 0.97, filter: 'blur(4px)' }),
    center: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 360, damping: 34, mass: 0.8 } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -56 : 56, scale: 0.97, filter: 'blur(4px)', transition: { type: 'spring', stiffness: 360, damping: 34, mass: 0.8 } }),
};

export function MobileIntroScreen({ config, theme, onComplete }: MobileIntroScreenProps) {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [selectedTheme, setSelectedTheme] = useState<string>('colorful');
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const TOTAL_STEPS = 4;
    const isIOS = theme.platform === 'ios';
    const isLast = step === TOTAL_STEPS - 1;

    const accentColor = isIOS ? '#007AFF' : '#6750A4';

    const bgClass =
        selectedTheme === 'light'
            ? isIOS
                ? 'bg-[#F2F2F7] text-gray-900'
                : 'bg-[#FAF8FC] text-[#1C1B1F]'
            : selectedTheme === 'colorful'
                ? 'bg-[#050023] text-white'
                : isIOS
                    ? 'bg-black text-white'
                    : 'bg-[#111114] text-[#E2E2E6]';

    const muted = selectedTheme === 'light' ? 'text-gray-500' : 'text-white/50';

    const cardClass =
        selectedTheme === 'light'
            ? isIOS
                ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
                : 'bg-[#FEF7FF]/95 border border-[#E7E0EC]/60 shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
            : selectedTheme === 'colorful'
                ? 'bg-white/[0.06] border border-fuchsia-500/12'
                : isIOS
                    ? 'bg-white/[0.06] backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.05]'
                    : 'bg-[#2D2B33]/80 border border-[#49454F]/30';

    const handleNext = () => {
        if (isLast) {
            onComplete(selectedTheme);
        } else {
            setDirection(1);
            setStep((s) => s + 1);
        }
    };

    const handleBack = () => {
        setDirection(-1);
        setStep((s) => s - 1);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length !== 1) {
            return;
        }

        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null || touchStartY.current === null || e.changedTouches.length === 0) {
            return;
        }

        const dx = e.changedTouches[0].clientX - touchStartX.current;
        const dy = e.changedTouches[0].clientY - touchStartY.current;
        touchStartX.current = null;
        touchStartY.current = null;

        // Treat only deliberate horizontal swipes as navigation to avoid fighting vertical scroll.
        const horizontalSwipeThreshold = 48;
        const isHorizontalIntent = Math.abs(dx) > Math.abs(dy) * 1.2;
        if (!isHorizontalIntent || Math.abs(dx) < horizontalSwipeThreshold) {
            return;
        }

        if (dx < 0 && !isLast) {
            handleNext();
            return;
        }

        if (dx > 0 && step > 0) {
            handleBack();
        }
    };

    return (
        <div className={`absolute inset-0 z-50 flex flex-col ${bgClass} transition-colors duration-500 overflow-hidden`}>

            {/* Colorful ambient mesh */}
            {selectedTheme === 'colorful' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-[340px] h-[340px] rounded-full bg-fuchsia-600/25 blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
                    <div className="absolute -bottom-24 -right-16 w-[300px] h-[300px] rounded-full bg-purple-600/20 blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '3s' }} />
                </div>
            )}

            {/* Status-bar spacer */}
            <div className="h-14" />

            {/* Step progress bar */}
            <div className="flex justify-center gap-2 px-6 mb-4">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ width: i === step ? '1.75rem' : '0.5rem', opacity: i <= step ? 1 : 0.4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                        className={`h-1.5 rounded-full ${i <= step
                            ? `bg-[${accentColor}]`
                            : selectedTheme === 'light' ? 'bg-black/10' : 'bg-white/15'
                        }`}
                        style={{ backgroundColor: i <= step ? accentColor : undefined }}
                    />
                ))}
            </div>

            {/* Page content */}
            <div
                className="flex-1 overflow-hidden relative"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <AnimatePresence custom={direction} mode="wait">

                    {/* ── Step 0: Welcome ── */}
                    {step === 0 && (
                        <motion.div
                            key="intro-step0"
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
                        >
                            {/* App icon */}
                            <motion.div
                                initial={{ scale: 0.3, opacity: 0, rotate: -8 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.06, type: 'spring', stiffness: 300, damping: 16, mass: 0.8 }}
                                className={`w-[88px] h-[88px] rounded-[28px] bg-gradient-to-br ${config.accentGradient} flex items-center justify-center shadow-2xl mb-8`}
                                style={{ boxShadow: `0 20px 60px ${accentColor}55` }}
                            >
                                <Icon name={config.appIcon} className="text-white text-[44px]" />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18 }}
                                className="text-[28px] font-extrabold tracking-tight mb-3 leading-tight"
                            >
                                {config.appName}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.28 }}
                                className={`text-[15px] leading-relaxed ${muted}`}
                            >
                                {config.tagline}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className={`mt-8 text-[12px] font-medium ${muted} flex items-center gap-1.5`}
                            >
                                <Icon name="swipe" className="text-[16px]" />
                                Swipe through to get started
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ── Step 1: AI Tips ── */}
                    {step === 1 && (
                        <motion.div
                            key="intro-step1"
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 overflow-y-auto no-scrollbar px-5 pt-2 pb-4"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2.5 mb-1"
                            >
                                <div
                                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${config.accentGradient} flex items-center justify-center`}
                                >
                                    <Icon name="auto_awesome" className="text-white text-[16px]" />
                                </div>
                                <h2 className="text-[21px] font-extrabold tracking-tight">AI Copilot</h2>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.08 }}
                                className={`text-[13px] mb-5 pl-1 ${muted}`}
                            >
                                Here&apos;s how to get the most from your AI assistant
                            </motion.p>

                            <div className="space-y-3">
                                {config.aiTips.map((tip, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 24 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 + 0.1, type: 'spring', stiffness: 380, damping: 26, mass: 0.8 }}
                                        className={`p-4 rounded-2xl flex gap-4 ${cardClass}`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${config.accentGradient}`}
                                        >
                                            <Icon name={tip.icon} className="text-white text-[18px]" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-[14px] mb-0.5">{tip.title}</h4>
                                            <p className={`text-[12px] leading-relaxed ${muted}`}>{tip.body}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Copilot tip teaser */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: config.aiTips.length * 0.1 + 0.25 }}
                                className={`mt-4 p-3.5 rounded-2xl flex items-center gap-3 ${selectedTheme === 'light' ? 'bg-amber-50 border border-amber-100' : 'bg-amber-500/10 border border-amber-500/20'}`}
                            >
                                <Icon name="lightbulb" className="text-[20px] text-amber-500 shrink-0" />
                                <p className={`text-[12px] leading-relaxed ${selectedTheme === 'light' ? 'text-amber-800' : 'text-amber-300'}`}>
                                    Tap the <span className="font-bold">✦ sparkle button</span> in the top-right corner anytime to open Copilot.
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* ── Step 2: What's Inside ── */}
                    {step === 2 && (
                        <motion.div
                            key="intro-step2"
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 overflow-y-auto no-scrollbar px-5 pt-2 pb-4"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2.5 mb-1"
                            >
                                <div
                                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${config.accentGradient} flex items-center justify-center`}
                                >
                                    <Icon name="apps" className="text-white text-[16px]" />
                                </div>
                                <h2 className="text-[21px] font-extrabold tracking-tight">What&apos;s Inside</h2>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.08 }}
                                className={`text-[13px] mb-5 pl-1 ${muted}`}
                            >
                                Everything you need, in one beautifully designed app
                            </motion.p>

                            <div className="space-y-2.5">
                                {config.features.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.06 + 0.08, type: 'spring', stiffness: 380, damping: 26, mass: 0.8 }}
                                        className={`flex items-center gap-4 p-4 rounded-2xl ${cardClass}`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${config.accentGradient}`}
                                            style={{ boxShadow: `0 4px 16px ${accentColor}35` }}
                                        >
                                            <Icon name={f.icon} className="text-white text-[18px]" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-[14px]">{f.label}</h4>
                                            <p className={`text-[12px] ${muted}`}>{f.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Step 3: Theme Picker ── */}
                    {step === 3 && (
                        <motion.div
                            key="intro-step3"
                            custom={direction}
                            variants={pageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 overflow-y-auto no-scrollbar px-5 pt-2 pb-4"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-2.5 mb-1"
                            >
                                <div
                                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${config.accentGradient} flex items-center justify-center`}
                                >
                                    <Icon name="palette" className="text-white text-[16px]" />
                                </div>
                                <h2 className="text-[21px] font-extrabold tracking-tight">Choose Your Look</h2>
                            </motion.div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.08 }}
                                className={`text-[13px] mb-6 pl-1 ${muted}`}
                            >
                                Pick a theme — you can always change it in your Profile
                            </motion.p>

                            <div className="space-y-3">
                                {THEME_OPTIONS.map((t, i) => {
                                    const selected = selectedTheme === t.v;
                                    return (
                                        <motion.button
                                            key={t.v}
                                            initial={{ opacity: 0, y: 14 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 + 0.1, type: 'spring', stiffness: 300, damping: 24 }}
                                            onClick={() => setSelectedTheme(t.v)}
                                            whileTap={{ scale: 0.975 }}
                                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${selected
                                                ? ''
                                                : selectedTheme === 'light'
                                                    ? 'border-gray-150 bg-white'
                                                    : 'border-white/8 bg-white/[0.05]'
                                            }`}
                                            style={selected ? { borderColor: accentColor, backgroundColor: `${accentColor}12` } : {}}
                                        >
                                            {/* Swatch preview */}
                                            <div className={`w-14 h-14 rounded-xl ${t.swatchBg} flex flex-col justify-between p-2 overflow-hidden shadow-md shrink-0 relative`}>
                                                {/* Tiny mockup header */}
                                                <div className="flex items-center gap-1">
                                                    <div className={`w-3 h-3 rounded-full ${t.v === 'light' ? 'bg-gray-400/60' : 'bg-white/20'}`} />
                                                    <div className={`flex-1 h-1.5 rounded-full ${t.v === 'light' ? 'bg-gray-300/80' : 'bg-white/15'}`} />
                                                </div>
                                                {/* Tiny mockup cards */}
                                                <div className="space-y-1">
                                                    <div className={`h-1.5 rounded-full w-full ${t.v === 'light' ? 'bg-gray-300/80' : 'bg-white/25'}`} />
                                                    <div className={`h-1.5 rounded-full w-3/4 ${t.v === 'light' ? 'bg-gray-200/80' : 'bg-white/15'}`} />
                                                </div>
                                                {t.v === 'colorful' && (
                                                    <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/30 to-purple-600/20 rounded-xl" />
                                                )}
                                            </div>

                                            <div className="flex-1 text-left min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span style={selected ? { color: accentColor } : undefined}>
                                                        <Icon
                                                            name={t.icon}
                                                            className={`text-[18px] ${selected
                                                                ? ''
                                                                : selectedTheme === 'light' ? 'text-gray-500' : 'text-white/50'
                                                            }`}
                                                        />
                                                    </span>
                                                    <span className="font-bold text-[15px]">{t.label}</span>
                                                </div>
                                                <p className={`text-[12px] ${muted}`}>{t.desc}</p>
                                            </div>

                                            <motion.div
                                                animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                                            >
                                                <span style={{ color: accentColor }}>
                                                    <Icon name="check_circle" className="text-[26px]" />
                                                </span>
                                            </motion.div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Ready hint */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.45 }}
                                className={`text-center text-[12px] mt-6 ${muted}`}
                            >
                                Your selection applies immediately when you tap &ldquo;Get Started&rdquo;
                            </motion.p>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Bottom navigation */}
            <div className={`px-5 pb-10 pt-3 flex gap-3 items-center`}>
                {step > 0 && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                        onClick={handleBack}
                        whileTap={{ scale: 0.88 }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedTheme === 'light' ? 'bg-gray-100 text-gray-700' : 'bg-white/10 text-white'}`}
                    >
                        <Icon name="arrow_back" className="text-[20px]" />
                    </motion.button>
                )}

                <motion.button
                    layout
                    transition={{ layout: { type: 'spring', stiffness: 400, damping: 28 } }}
                    onClick={handleNext}
                    className={`flex-1 h-12 rounded-full flex items-center justify-center gap-2 font-bold text-[15px] text-white shadow-lg bg-gradient-to-r ${config.accentGradient}`}
                    style={{ boxShadow: `0 8px 28px ${accentColor}45` }}
                    whileTap={{ scale: 0.95 }}
                >
                    {isLast ? (
                        <>
                            <Icon name="rocket_launch" className="text-[18px]" />
                            Get Started
                        </>
                    ) : (
                        <>
                            Continue
                            <Icon name="arrow_forward" className="text-[18px]" />
                        </>
                    )}
                </motion.button>
            </div>

        </div>
    );
}
