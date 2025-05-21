import { redirect } from 'next/navigation';
import { i18n } from '@/i18n';

export default function DesignLocalePage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/design/coming-soon`);
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
