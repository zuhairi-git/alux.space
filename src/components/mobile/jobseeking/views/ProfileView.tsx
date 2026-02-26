import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/app/mobile/shared';
import type { MobileTheme } from '@/app/mobile/themes';

interface ViewProps {
    card?: string;
    isLight: boolean;
    isColorful?: boolean;
    theme: MobileTheme;
    themeMode: string;
    setThemeMode: (mode: string) => void;
}

export function ProfileView({ card, isLight, isColorful, theme, themeMode, setThemeMode }: ViewProps) {
    const settingsBgClass = isColorful ? 'bg-white/10' : theme.profile.settingsBg(isLight);
    const sectionVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <div className={`h-full w-full overflow-y-auto ${theme.contentPaddingTop} pb-28 px-5 no-scrollbar`}>
            {/* User Profile Info */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className={`${card} p-6 flex flex-col items-center mb-6`}>
                <div className={`w-24 h-24 ${theme.platform === 'ios' ? 'rounded-[24px]' : 'rounded-full'} border-[3px] ${theme.accent.avatarBorder(isLight)} bg-gradient-to-tr from-blue-500 to-cyan-400 overflow-hidden mb-4 shadow-xl`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/me/ali.png" className="w-full h-full object-cover scale-110" alt="Ali Al-Zuhairi" />
                </div>
                <h2 className={`text-[24px] font-bold tracking-tight mb-1 ${theme.platform === 'ios' ? 'font-serif' : ''}`}>Ali Al-Zuhairi</h2>
                <div className={`text-[15px] font-medium mb-4 ${theme.profile.roleColor}`}>Hospitality & Retail Enthusiast</div>

                <div className="flex space-x-3 w-full justify-center">
                    <div className={`flex flex-col items-center p-3 rounded-2xl flex-1 ${settingsBgClass}`}>
                        <span className="font-bold text-[18px]">12</span>
                        <span className="text-[12px] opacity-70">Jobs Saved</span>
                    </div>
                    <div className={`flex flex-col items-center p-3 rounded-2xl flex-1 ${settingsBgClass}`}>
                        <span className="font-bold text-[18px]">4</span>
                        <span className="text-[12px] opacity-70">Applications</span>
                    </div>
                    <div className={`flex flex-col items-center p-3 rounded-2xl flex-1 ${settingsBgClass}`}>
                        <span className="font-bold text-[18px]">88%</span>
                        <span className="text-[12px] opacity-70">Avg Match</span>
                    </div>
                </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-6">
                <h3 className="text-[15px] font-bold tracking-wider uppercase opacity-60 mb-3 px-2">Availability</h3>
                <div className={`${card} overflow-hidden`}>
                    {[
                        { day: 'Weekdays', value: 'Evenings (after 5 PM)', icon: 'bedtime' },
                        { day: 'Weekend', value: 'Any time', icon: 'wb_sunny' }
                    ].map((item, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 ${i !== 0 ? 'border-t border-black/5 border-white/5' : ''}`}>
                            <div className="flex items-center">
                                <Icon name={item.icon as string} className={`text-[20px] mr-4 ${isLight ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span className={`text-[16px] font-medium ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>{item.day}</span>
                            </div>
                            <span className="text-[14px] opacity-70">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* App Settings */}
            <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mb-8">
                <h3 className="text-[15px] font-bold tracking-wider uppercase opacity-60 mb-3 px-2">App Appearance</h3>
                <div className={`${card} overflow-hidden`}>
                    {[
                        { label: 'System Automatic', value: 'system', icon: 'brightness_auto' },
                        { label: 'Light Theme', value: 'light', icon: 'light_mode' },
                        { label: 'Dark Theme', value: 'dark', icon: 'dark_mode' },
                        { label: 'Colorful Theme', value: 'colorful', icon: 'palette' }
                    ].map((t, i) => (
                        <button key={i} onClick={() => setThemeMode(t.value !== 'system' ? t.value : 'dark')}
                            className={`w-full flex items-center justify-between p-4 active:bg-black/5 dark:active:bg-white/5 transition-colors ${i !== 0 ? 'border-t border-black/5 border-white/5' : ''}`}
                        >
                            <div className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${themeMode === t.value ? theme.profile.engagementActiveBg : theme.profile.settingsBg(isLight)}`}>
                                    <Icon name={t.icon as string} className={`text-[18px] ${themeMode === t.value ? 'text-white' : ''}`} />
                                </div>
                                <span className={`text-[16px] font-medium ${isLight ? 'text-gray-800' : 'text-gray-100'}`}>{t.label}</span>
                            </div>
                            {themeMode === t.value && <Icon name="check" className={`text-[20px] ${theme.platform === 'ios' ? 'text-blue-500' : 'text-purple-500'}`} />}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
