import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Market Intelligence — iOS Prototype',
    description: 'iOS Human Interface Guidelines prototype for Market Intelligence',
};

export default function IOSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
