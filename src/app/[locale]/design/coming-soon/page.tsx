import { i18n } from '@/i18n';
import ComingSoonDesignPageContent from '@/app/design/coming-soon/page';

// This has to be a separate component to avoid issues with 
// server/client component boundaries
export default function ComingSoonDesignPage() {
  return <ComingSoonDesignPageContent />;
}

// This function is required for static export with dynamic routes
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
