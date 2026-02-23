import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Workflow Platform — Android Prototype',
    description: 'Android Material You prototype for the Workflow Platform',
};

export default function AndroidLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
