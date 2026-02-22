import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Collaboration Platform — iOS Prototype',
    description: 'iOS Human Interface Guidelines prototype for the Collaboration Workflow Platform',
};

export default function IOSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
