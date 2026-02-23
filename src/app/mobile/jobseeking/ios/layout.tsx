import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Job Seeking — iOS Prototype',
    description: 'iOS Human Interface Guidelines prototype for the Job Seeking App',
};

export default function IOSLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
