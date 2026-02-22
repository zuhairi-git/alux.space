import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Market Intelligence Pro',
    description: 'AI-Powered Market Intelligence Mobile Prototype',
};

export default function MobileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout restricts the max-width to simulate a mobile device on desktop monitors
    return (
        <div className="bg-transparent min-h-screen w-full flex items-center justify-center font-sans">
            <div className="mobile-frame w-full h-[100dvh] sm:h-[844px] sm:w-[390px] sm:rounded-[3rem] sm:border-[8px] sm:border-neutral-800 bg-black overflow-hidden relative shadow-2xl sm:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {/* Dynamic Island / Notch Simulation (only visible on desktop wrapper) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl z-50 hidden sm:block"></div>

                {/* App Content */}
                <div className="h-full w-full overflow-hidden text-white relative bg-transparent">
                    <style>{`
                        footer, #back-to-top, .translation-badge-container { display: none !important; }
                        .mobile-frame * { scrollbar-width: none !important; -ms-overflow-style: none !important; }
                        .mobile-frame *::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
                    `}</style>
                    {children}
                </div>

                {/* Home Indicator Simulation */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/30 rounded-full z-50 hidden sm:block pointer-events-none"></div>
            </div>
        </div>
    );
}
