import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Metadata } from 'next';
import { i18n } from '@/i18n';
import PromptPageContent from '../../prompt/page';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const localizedMetadata = {
    en: {
      title: 'Prompts Gallery | Ali Al-Zuhairi',
      description: 'A collection of prompts I\'ve crafted for various creative AI tools and development tasks.',
    },
    fi: {
      title: 'Kehotteet | Ali Al-Zuhairi',
      description: 'Kokoelma kehotteitä, jotka olen luonut erilaisille luoville tekoälytyökaluille ja kehitystehtäville.',
    },
    ar: {
      title: 'معرض الأوامر | علي الزهيري',
      description: 'مجموعة من الأوامر التي صممتها لمختلف أدوات الذكاء الاصطناعي الإبداعية ومهام التطوير.',
    }
  };
  
  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
  
  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/prompt`,
      languages: i18n.locales.reduce((acc, lang) => {
        acc[lang] = `${baseUrl}/${lang}/prompt`;
        return acc;
      }, {} as Record<string, string>),
    }
  };
}

export default function PromptPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  
  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={locale}>
        <PromptPageContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}