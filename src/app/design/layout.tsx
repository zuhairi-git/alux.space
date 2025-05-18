'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.includes(path);

  const designComponents = [
    { name: 'Timeline Cards', path: '/design/timeline-cards' },
    { name: 'Media Cards', path: '/design/media-cards' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4" style={{ textShadow: 'none' }}>
          Design Components
        </h1>
        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
          Explore our reusable design components for building beautiful interfaces.
        </p>
        
        <nav className="flex flex-wrap gap-2">
          {designComponents.map((component) => (
            <Link
              key={component.path}
              href={component.path}
              className={`px-4 py-2 rounded-md transition-all ${
                isActive(component.path)
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {component.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800">
        {children}
      </div>
    </div>
  );
}
