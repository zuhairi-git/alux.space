import CollaborationClient from '@/components/portfolio/CollaborationClient';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Metadata } from 'next';
import { i18n } from '@/i18n';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const localizedMetadata = {
    en: {
      title: 'Collaboration Workflow Platform Case Study | Portfolio',
      description: 'A case study on building a platform for seamless team collaboration, improving communication, and content delivery across devices and time zones.',
    },
    fi: {
      title: 'Yhteistyön työnkulkualustan tapaustutkimus | Portfolio',
      description: 'Tapaustutkimus alustasta saumattomaan tiimityöskentelyyn, viestinnän parantamiseen ja sisällön toimittamiseen eri laitteilla ja aikavyöhykkeillä.',
    }
  };
  
  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
  
  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/portfolio/collaboration`,
      languages: i18n.locales.reduce((acc, lang) => {
        acc[lang] = `${baseUrl}/${lang}/portfolio/collaboration`;
        return acc;
      }, {} as Record<string, string>),
    }
  };
}

export default async function CollaborationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
    return (
    <ThemeProvider>
      <LanguageProvider initialLocale={locale}>
        <CollaborationClient />
      </LanguageProvider>
    </ThemeProvider>
  );
}