import AccessibilityClient from './AccessibilityClient';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Metadata } from 'next';
import { i18n } from '@/i18n';

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const localizedMetadata = {
    en: {
      title: 'Accessibility Portfolio - WCAG 2.2 & Inclusive Design | Portfolio',
      description: 'Comprehensive showcase of accessibility standards, WCAG 2.2 compliance, color contrast optimization, keyboard navigation, screen reader compatibility, and inclusive design patterns with real-world examples.',
    },
    fi: {
      title: 'Saavutettavuusportfolio - WCAG 2.2 & Inklusiivinen suunnittelu | Portfolio',
      description: 'Kattava esittely saavutettavuusstandardeista, WCAG 2.2 -vaatimustenmukaisuudesta, värikontrastin optimoinnista, näppäimistönavigaatiosta, ruudunlukijan yhteensopivuudesta ja inklusiivisista suunnittelumalleista todellisilla esimerkeillä.',
    }
  };
  
  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
  
  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/portfolio/accessibility`,
      languages: i18n.locales.reduce((acc, lang) => {
        acc[lang] = `${baseUrl}/${lang}/portfolio/accessibility`;
        return acc;
      }, {} as Record<string, string>),
    }
  };
}

export default function AccessibilityPage({ params }: { params: { locale?: string } }) {
  const locale = params.locale || i18n.defaultLocale;
  
  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={locale}>
        <AccessibilityClient locale={locale} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
