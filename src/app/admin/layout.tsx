import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Panel | Collaboration Workflow Platform',
    description: 'Platform administration dashboard for managing users, workspaces, and AI collaboration tools',
    robots: { index: false, follow: false },
};

export default function AdminLayout({
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
