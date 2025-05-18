import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import "./no-glow.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import BackToTop from "@/components/ui/BackToTop";
import Footer from "@/components/Footer";
import { i18n } from '../i18n';

// Add Material Symbols stylesheet with better support for all languages including RTL
const materialSymbolsUrl = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=swap';

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  display: 'swap',
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
});

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const localeSpecificMetadata = {
    en: {
      title: 'Ali Al-Zuhairi - Product Owner & Design Leader',
      description: 'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation.',
    },
    fi: {
      title: 'Ali Al-Zuhairi - Tuoteomistaja & Design-johtaja',
      description: 'Tuoteomistaja ja design-johtaja, jolla on asiantuntemusta UX-suunnittelussa, ketterissä menetelmissä ja luovassa innovaatiossa.',
    }
  };
  
  const metadata = localeSpecificMetadata[locale as keyof typeof localeSpecificMetadata] || localeSpecificMetadata.en;
  
  const alternateLanguages = i18n.locales.reduce((acc, lang) => {
    acc[lang] = `${baseUrl}/${lang}`;
    return acc;
  }, {} as Record<string, string>);
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: metadata.title,
      template: `%s | ${metadata.title.split(' - ')[0]}`
    },
    description: metadata.description,
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      siteName: 'Ali Al-Zuhairi',
      locale: locale === 'en' ? 'en_US' : 'fi_FI',
      alternateLocale: i18n.locales.filter(l => l !== locale).map(l => 
        l === 'en' ? 'en_US' : 'fi_FI'
      ),
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      creator: '@alialzuhairi',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternateLanguages,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We don't know the locale yet at this level, but the LanguageProvider will handle setting the dir attribute
  return (
    <html suppressHydrationWarning>
      <head>
        <link href={materialSymbolsUrl} rel="stylesheet" />
      </head>
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <BackToTop />
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
