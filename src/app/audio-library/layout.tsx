'use client';

import { ReactNode, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { useTheme } from '@/context/ThemeContext';

interface AudioLibraryLayoutProps {
  children: ReactNode;
}

export default function AudioLibraryLayout({ children }: AudioLibraryLayoutProps) {
  const { theme } = useTheme();

  const backgroundClass = useMemo(() => {
    if (theme === 'colorful') {
      return 'min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-fuchsia-50/20 dark:from-gray-900 dark:via-purple-900/10 dark:to-fuchsia-900/5';
    } else if (theme === 'dark') {
      return 'min-h-screen bg-gray-900';
    } else {
      return 'min-h-screen bg-gray-50';
    }
  }, [theme]);

  return (
    <div className={backgroundClass}>
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
