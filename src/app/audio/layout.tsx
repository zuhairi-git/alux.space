import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';

interface AudioLayoutProps {
  children: ReactNode;
}

export default function AudioLayout({ children }: AudioLayoutProps) {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
}
