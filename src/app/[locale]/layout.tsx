import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { i18n, isLocale, getLocaleConfig } from '@/i18n';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

const siteMetadata: Record<string, { title: string; description: string; keywords: string }> = {
  en: {
    title: 'Ali Al-Zuhairi - Product Owner & Design Leader',
    description:
      'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation. Based in Helsinki, Finland.',
    keywords:
      'Product Owner, Design Leader, UX Design, UI Design, Agile, Scrum, Helsinki, Finland, Digital Innovation, User Experience, Design Thinking',
  },
  fi: {
    title: 'Ali Al-Zuhairi - Tuoteomistaja & Design-johtaja',
    description:
      'Tuoteomistaja ja design-johtaja, jolla on asiantuntemusta UX-suunnittelussa, ketterissä menetelmissä ja luovassa innovaatiossa. Toimii Helsingissä, Suomessa.',
    keywords:
      'Tuoteomistaja, Design-johtaja, UX-suunnittelu, UI-suunnittelu, Agile, Scrum, Helsinki, Suomi, Digitaalinen innovaatio, Käyttäjäkokemus, Muotoilumenetelmät',
  },
};

/**
 * Site-wide, language-specific document metadata.
 *
 * Lives here rather than in the root layout because this is the shallowest
 * layout that actually knows the locale. Canonical URLs stay out of it on
 * purpose — a canonical set on a layout is inherited by every descendant page
 * that doesn't override it. Pages declare their own.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const config = getLocaleConfig(locale);
  const content = siteMetadata[config.code] ?? siteMetadata.en;

  return {
    title: {
      default: content.title,
      template: `%s | ${content.title.split(' - ')[0]}`,
    },
    description: content.description,
    keywords: content.keywords,
    openGraph: {
      title: content.title,
      description: content.description,
      type: 'website',
      url: `${baseUrl}/${config.code}`,
      siteName: 'Ali Al-Zuhairi',
      locale: config.ogLocale,
      alternateLocale: i18n.locales
        .filter((other) => other !== config.code)
        .map((other) => getLocaleConfig(other).ogLocale),
      images: [
        {
          url: `${baseUrl}/images/main.jpg`,
          width: 1200,
          height: 630,
          alt: content.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
      creator: '@alialzuhairi',
      site: '@alialzuhairi',
      images: [`${baseUrl}/images/main.jpg`],
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return children;
}
