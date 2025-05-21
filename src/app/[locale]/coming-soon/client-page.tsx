'use client';

import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import ComingSoonPageContent from '@/app/coming-soon/page';

export default function LocalizedComingSoonPageWithProviders() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <ComingSoonPageContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}
