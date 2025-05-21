import { i18n } from '@/i18n';
import LocalizedComingSoonPageWithProviders from './client-page';

// This is a server component that uses the client component
export default function LocalizedComingSoonPage() {
  return <LocalizedComingSoonPageWithProviders />;
}

// This function is required for static export with dynamic routes
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
