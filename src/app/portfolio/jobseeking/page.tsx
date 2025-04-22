import React from 'react';
import Navigation from '@/components/Navigation';
import JobSeekingClient from './JobSeekingClient';
import { ThemeProvider } from '@/context/ThemeContext';

export default function JobseekingPage() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-theme text-theme">
        <Navigation />
        <div className="absolute inset-0 z-0">
          {/* BackgroundEffect removed */}
        </div>
        <JobSeekingClient />
      </main>
    </ThemeProvider>
  );
}