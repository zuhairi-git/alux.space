import React from 'react';
import { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import HomePage from '../page';
import { i18n } from '@/i18n';
import Link from 'next/link';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
  
  const localizedMetadata = {
    en: {
      title: 'Ali Al-Zuhairi | Product Designer & UX Leader',
      description: 'Personal portfolio showcasing product design, UX leadership, and creative project work.',
    },
    fi: {
      title: 'Ali Al-Zuhairi | Tuotesuunnittelija & UX-johtaja',
      description: 'Henkilökohtainen portfolio, joka esittelee tuotesuunnittelua, UX-johtajuutta ja luovia projektitöitä.',
    },
    ar: {
      title: 'علي الزهيري | مصمم منتجات وقائد تجربة المستخدم',
      description: 'معرض أعمال شخصي يعرض تصميم المنتجات، وقيادة تجربة المستخدم، والعمل في المشاريع الإبداعية.',
    }
  };
  
  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
  
  return {
    title: metadata.title,
    description: metadata.description,
  };
}

export default function LocalizedHomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  
  return (
    <>
      {/* Test language navigation links */}
      <div className="hidden fixed top-24 right-4 z-50 bg-black bg-opacity-50 p-2 rounded">
        <div className="flex flex-col gap-2">
          {i18n.locales.map((lang) => (
            <Link 
              key={lang} 
              href={`/${lang}/blog`} 
              className={`text-white px-3 py-1 rounded ${locale === lang ? 'bg-purple-600' : 'bg-gray-700'}`}
            >
              {lang.toUpperCase()} Blog
            </Link>
          ))}
        </div>
      </div>
      
      <ThemeProvider>
        <LanguageProvider initialLocale={locale}>
          <HomePage />
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}