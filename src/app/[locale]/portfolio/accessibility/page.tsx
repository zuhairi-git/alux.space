import AccessibilityClient from '@/components/portfolio/AccessibilityClient';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Metadata } from 'next';
import { i18n } from '@/i18n';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const localizedMetadata = {
    en: {
      title: 'Inclusive Design System Case Study | Portfolio',
      description: 'A comprehensive case study on building accessible design systems from the ground up—research-driven approach to creating inclusive digital products that work for everyone.',
    },
    fi: {
      title: 'Inklusiivinen suunnittelujärjestelmä tapaustutkimus | Portfolio',
      description: 'Kattava tapaustutkimus saavutettavien suunnittelujärjestelmien rakentamisesta alusta alkaen—tutkimuspohjainen lähestymistapa inklusiivisten digitaalisten tuotteiden luomiseen, jotka toimivat kaikille.',
    }
  };

  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/${locale}/portfolio/accessibility`,
      siteName: 'Ali Al-Zuhairi',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/portfolio/accessibility-og.jpg`,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [`${baseUrl}/images/portfolio/accessibility-og.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/portfolio/accessibility`,
      languages: {
        en: `${baseUrl}/en/portfolio/accessibility`,
        fi: `${baseUrl}/fi/portfolio/accessibility`,
      },
    },
  };
}

export default function AccessibilityPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  
  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={locale}>
        <AccessibilityClient locale={locale} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
