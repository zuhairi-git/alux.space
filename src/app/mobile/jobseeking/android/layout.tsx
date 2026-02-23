import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Job Seeking — Android Prototype',
    description: 'Android Material You prototype for the Job Seeking App',
};

export default function AndroidLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
