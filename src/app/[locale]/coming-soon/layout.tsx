import { i18n } from '@/i18n';

// Split the layout into two files to avoid the "use client" + generateStaticParams error
export default function LocalizedComingSoonLayout({ children }: { children: React.ReactNode }) {
  return children;
}

// This function is required for static export with dynamic routes
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
