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
    onComplete: (chosenTheme: 'dark' | 'light' | 'colorful') => void;
}

const THEME_OPTIONS = [
    {
        v: 'dark',
        label: 'Dark',
        desc: 'Easy on the eyes',
        icon: 'dark_mode',
        swatchBg: 'bg-ds-dark-1',
        swatchText: 'text-white',
    },
    {
        v: 'light',
        label: 'Light',
        desc: 'Clean & minimal',
        icon: 'light_mode',
        swatchBg: 'bg-ds-gray-100',
        swatchText: 'text-gray-900',
    },
    {
        v: 'colorful',
        label: 'Colorful',
        desc: 'Vivid & expressive',
        icon: 'palette',
        swatchBg: 'bg-ds-colorful-bg',
        swatchText: 'text-white',
    },
] as const;

const pageVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 120 : -120, scale: 0.82, rotateY: dir > 0 ? 12 : -12 }),
    center: { opacity: 1, x: 0, scale: 1, rotateY: 0, transition: { type: 'spring', stiffness: 260, damping: 28, mass: 0.8 } },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.85, rotateY: dir > 0 ? -8 : 8, transition: { type: 'spring', stiffness: 260, damping: 28, mass: 0.8 } }),
};

// Floating orb component for ambient background animation
function FloatingOrb({ size, color, startX, startY, delay }: { size: number, color: string, startX: string, startY: string, delay: number }) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size,
                height: size,
                left: startX,
                top: startY,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                willChange: 'transform, opacity',
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
                opacity: [0, 0.6, 0.4, 0.7, 0.5],
                scale: [0.3, 1.1, 0.9, 1.2, 1],
                x: [0, 30, -20, 15, 0],
                y: [0, -25, 15, -10, 0],
            }}
            transition={{
                duration: 8 + delay * 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: delay,
            }}
        />
    );
}

export function MobileIntroScreen({ config, theme, onComplete }: MobileIntroScreenProps) {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | 'colorful'>('colorful');
    const touchStartX = useRef<number | null>(null);
    const touchStartY = useRef<number | null>(null);
    const TOTAL_STEPS = 4;
    const isIOS = theme.platform === 'ios';
    const isLast = step === TOTAL_STEPS - 1;

    const accentColor = selectedTheme === 'colorful' ? 'var(--primary)' : '#3b82f6';
    const accentGradient = selectedTheme === 'colorful' ? 'from-primary to-primary-dark' : config.accentGradient;

    const bgClass =
        selectedTheme === 'light'
            ? isIOS
                ? 'bg-ds-gray-100 text-gray-900'
                : 'bg-ds-gray-50 text-ds-gray-900'
            : selectedTheme === 'colorful'
                ? 'bg-ds-colorful-bg text-white'
                : isIOS
                    ? 'bg-black text-white'
                    : 'bg-ds-dark-1 text-ds-gray-200';

    const muted = selectedTheme === 'light' ? 'text-gray-500' : 'text-white/50';

    const cardClass =
        selectedTheme === 'light'
            ? isIOS
                ? 'bg-white/50 backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/60 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
                : 'bg-ds-gray-50/95 border border-ds-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
            : selectedTheme === 'colorful'
                ? 'bg-white/[0.06] border border-primary/12'
                : isIOS
                    ? 'bg-white/[0.06] backdrop-blur-[24px] backdrop-saturate-[200%] border border-white/[0.05]'
                    : 'bg-ds-dark-3/80 border border-ds-gray-600/30';

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

            {/* Floating ambient orbs - visible on all themes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <FloatingOrb size={200} color={selectedTheme === 'colorful' ? 'rgba(167,139,250,0.2)' : selectedTheme === 'light' ? 'rgba(99,102,241,0.08)' : 'rgba(168,85,247,0.12)'} startX="-10%" startY="10%" delay={0} />
                <FloatingOrb size={160} color={selectedTheme === 'colorful' ? 'rgba(236,72,153,0.18)' : selectedTheme === 'light' ? 'rgba(168,85,247,0.06)' : 'rgba(59,130,246,0.1)'} startX="60%" startY="50%" delay={1.5} />
                <FloatingOrb size={120} color={selectedTheme === 'colorful' ? 'rgba(37,99,235,0.15)' : selectedTheme === 'light' ? 'rgba(236,72,153,0.05)' : 'rgba(236,72,153,0.08)'} startX="30%" startY="70%" delay={3} />
                <FloatingOrb size={100} color={selectedTheme === 'colorful' ? 'rgba(196,181,253,0.1)' : selectedTheme === 'light' ? 'rgba(59,130,246,0.05)' : 'rgba(99,102,241,0.08)'} startX="80%" startY="20%" delay={2} />
            </div>

            {/* Colorful ambient mesh - enhanced */}
            {selectedTheme === 'colorful' && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-24 -left-24 w-[340px] h-[340px] rounded-full bg-fuchsia-600/25 blur-3xl animate-pulse" style={{ animationDuration: '7s' }} />
                    <div className="absolute -bottom-24 -right-16 w-[300px] h-[300px] rounded-full bg-primary-600/20 blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '3s' }} />
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full bg-primary/10 blur-3xl animate-pulse`} style={{ animationDuration: '11s', animationDelay: '5s' }} />
                </div>
            )}

            {/* Status-bar spacer */}
            <div className="h-14" />

            {/* Step progress bar */}
            <div className="flex justify-center gap-2 px-6 mb-4">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            width: i === step ? '2rem' : '0.5rem',
                            opacity: i <= step ? 1 : 0.3,
                            scale: i === step ? 1.1 : 1,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 24 }}
                        className={`h-1.5 rounded-full relative overflow-hidden ${i <= step
                            ? `bg-[${accentColor}]`
                            : selectedTheme === 'light' ? 'bg-black/10' : 'bg-white/15'
                        }`}
                        style={{ backgroundColor: i <= step ? accentColor : undefined }}
                    >
                        {i === step && (
                            <motion.div
                                className="absolute inset-0 rounded-full"
                                style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)` }}
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                            />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Page content */}
            <div
                className="flex-1 overflow-hidden relative"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <AnimatePresence custom={direction} mode="wait">

                    {/* Ã¢â€â‚¬Ã¢â€â‚¬ Step 0: Welcome Ã¢â€â‚¬Ã¢â€â‚¬ */}
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
                            {/* App icon with glow ring */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0, rotate: -20 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 14, mass: 0.9 }}
                                className="relative mb-8"
                            >
                                {/* Outer glow ring */}
                                <motion.div
                                    className="absolute -inset-4 rounded-[36px]"
                                    style={{ background: `conic-gradient(from 0deg, ${accentColor}00, ${accentColor}66, ${accentColor}00, ${accentColor}44, ${accentColor}00)` }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                                />
                                {/* Pulsing glow */}
                                <motion.div
                                    className="absolute -inset-3 rounded-[34px] blur-xl"
                                    style={{ backgroundColor: `${accentColor}30` }}
                                    animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.05, 0.95] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <div
                                    className={`relative w-[88px] h-[88px] rounded-[28px] bg-gradient-to-br ${accentGradient} flex items-center justify-center shadow-2xl`}
                                    style={{ boxShadow: `0 20px 60px ${accentColor}55` }}
                                >
                                    <Icon name={config.appIcon} className="text-white text-[44px]" />
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, type: 'spring', stiffness: 250, damping: 22 }}
                                className="text-[28px] font-extrabold tracking-tight mb-3 leading-tight"
                            >
                                {config.appName}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, type: 'spring', stiffness: 250, damping: 22 }}
                                className={`text-[15px] leading-relaxed ${muted}`}
                            >
                                {config.tagline}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.65, type: 'spring', stiffness: 200, damping: 20 }}
                                className={`mt-8 text-[12px] font-medium ${muted} flex items-center gap-1.5`}
                            >
                                <motion.span
                                    animate={{ x: [0, 8, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <Icon name="swipe" className="text-[16px]" />
                                </motion.span>
                                Swipe through to get started
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Ã¢â€â‚¬Ã¢â€â‚¬ Step 1: AI Tips Ã¢â€â‚¬Ã¢â€â‚¬ */}
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
                                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center`}
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
                                        initial={{ opacity: 0, x: 60, scale: 0.85 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{ delay: i * 0.12 + 0.15, type: 'spring', stiffness: 280, damping: 22, mass: 0.8 }}
                                        className={`p-4 rounded-2xl flex gap-4 ${cardClass}`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accentGradient}`}
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
                                className={`mt-4 p-3.5 rounded-2xl flex items-center gap-3 ${selectedTheme === 'light' ? 'bg-ds-warning/5 border border-ds-warning/10' : 'bg-ds-warning/10 border border-ds-warning/20'}`}
                            >
                                <Icon name="lightbulb" className="text-[20px] text-ds-warning shrink-0" />
                                <p className={`text-[12px] leading-relaxed ${selectedTheme === 'light' ? 'text-ds-gray-700' : 'text-ds-warning'}`}>
                                    Tap the <span className="font-bold">Ã¢Å“Â¦ sparkle button</span> in the top-right corner anytime to open Copilot.
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Ã¢â€â‚¬Ã¢â€â‚¬ Step 2: What's Inside Ã¢â€â‚¬Ã¢â€â‚¬ */}
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
                                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center`}
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
                                        initial={{ opacity: 0, y: 30, scale: 0.88 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ delay: i * 0.1 + 0.12, type: 'spring', stiffness: 280, damping: 22, mass: 0.8 }}
                                        className={`flex items-center gap-4 p-4 rounded-2xl ${cardClass}`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${accentGradient}`}
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

                    {/* Ã¢â€â‚¬Ã¢â€â‚¬ Step 3: Theme Picker Ã¢â€â‚¬Ã¢â€â‚¬ */}
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
                                    className={`w-8 h-8 rounded-xl bg-gradient-to-br ${accentGradient} flex items-center justify-center`}
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
                                Pick a theme Ã¢â‚¬â€ you can always change it in your Profile
                            </motion.p>

                            <div className="space-y-3">
                                {THEME_OPTIONS.map((t, i) => {
                                    const selected = selectedTheme === t.v;
                                    return (
                                        <motion.button
                                            key={t.v}
                                            initial={{ opacity: 0, y: 30, scale: 0.88 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: i * 0.14 + 0.12, type: 'spring', stiffness: 260, damping: 22 }}
                                            onClick={() => setSelectedTheme(t.v)}
                                            whileTap={{ scale: 0.94 }}
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
                                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary-dark/20 rounded-xl" />
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
                    transition={{ layout: { type: 'spring', stiffness: 350, damping: 26 } }}
                    onClick={handleNext}
                    className={`flex-1 h-12 rounded-full flex items-center justify-center gap-2 font-bold text-[15px] text-white shadow-lg bg-gradient-to-r ${accentGradient} relative overflow-hidden`}
                    style={{ boxShadow: `0 8px 28px ${accentColor}45` }}
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ scale: 1.02 }}
                >
                    {/* Shimmer sweep */}
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)' }}
                        animate={{ x: ['-150%', '250%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                    {isLast ? (
                        <>
                            <Icon name="rocket_launch" className="text-[18px]" />
                            Get Started
                        </>
                    ) : (
                        <>
                            Continue
                            <motion.span
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                <Icon name="arrow_forward" className="text-[18px]" />
                            </motion.span>
                        </>
                    )}
                    </span>
                </motion.button>
            </div>

        </div>
    );
}
