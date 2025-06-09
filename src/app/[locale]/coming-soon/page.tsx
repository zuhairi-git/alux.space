import { i18n } from '@/i18n';
import ComingSoonPageContent from '@/app/coming-soon/page';

// This is a server component that wraps the client component
export default function LocalizedComingSoonPage() {
  return <ComingSoonPageContent />;
}

// This function is required for static export with dynamic routes
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
