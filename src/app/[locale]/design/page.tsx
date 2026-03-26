import { redirect } from 'next/navigation';
import { i18n } from '@/i18n';

export default async function DesignLocalePage() {
  redirect('/design');
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
