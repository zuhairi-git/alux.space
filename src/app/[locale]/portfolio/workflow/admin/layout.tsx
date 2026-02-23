import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Portal | Workflow Platform',
    description: 'Platform collaboration portal for managing users, workspaces, and AI tools',
    robots: { index: false, follow: false },
};

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full font-sans">
            <style>{`
                footer, #back-to-top, .translation-badge-container, nav.main-nav { display: none !important; }
            `}</style>
            {children}
        </div>
    );
}
