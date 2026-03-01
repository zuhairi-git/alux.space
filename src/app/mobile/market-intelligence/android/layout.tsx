import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Market Intelligence — Android Prototype',
    description: 'Android Material You prototype for Market Intelligence',
};

export default function AndroidLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
