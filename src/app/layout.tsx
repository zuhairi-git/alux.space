import type { Metadata } from "next";
import { Poppins, Roboto, Tajawal } from "next/font/google";
import "./globals.css";
import "./no-glow.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import BackToTop from "@/components/ui/BackToTop";
import TranslationBadge from "@/components/ui/TranslationBadge";
import Footer from "@/components/Footer";
import SkipLinks from "@/components/ui/SkipLinks";
import { i18n } from '../i18n';
import { AnalyticsProvider } from "../../seo/AnalyticsProvider";
import SmoothMotionProvider from "@/components/SmoothMotionProvider";
import { structuredDataGenerator } from "../../seo/structured-data";

// Self-hosted Font Awesome kit (Duotone Thin) — see public/fa-kit-60396e54cd-web
const fontAwesomeBase = '/fa-kit-60396e54cd-web/css';

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

const tajawal = Tajawal({
  variable: "--font-tajawal",
  weight: ['400', '500', '700'],
  subsets: ["arabic"],
  display: 'swap',
});

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
  const localeSpecificMetadata = {
    en: {
      title: 'Ali Al-Zuhairi - Product Owner & Design Leader',
      description: 'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation. Based in Helsinki, Finland.',
      keywords: 'Product Owner, Design Leader, UX Design, UI Design, Agile, Scrum, Helsinki, Finland, Digital Innovation, User Experience, Design Thinking',
    },
    fi: {
      title: 'Ali Al-Zuhairi - Tuoteomistaja & Design-johtaja',
      description: 'Tuoteomistaja ja design-johtaja, jolla on asiantuntemusta UX-suunnittelussa, ketterissä menetelmissä ja luovassa innovaatiossa. Toimii Helsingissä, Suomessa.',
      keywords: 'Tuoteomistaja, Design-johtaja, UX-suunnittelu, UI-suunnittelu, Agile, Scrum, Helsinki, Suomi, Digitaalinen innovaatio, Käyttäjäkokemus, Muotoilumenetelmät',
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
    keywords: metadata.keywords,
    authors: [{ name: 'Ali Al-Zuhairi', url: baseUrl }],
    creator: 'Ali Al-Zuhairi',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico?v=2', sizes: 'any' },
        { url: '/favicon.png?v=2', type: 'image/png' }
      ],
      apple: '/favicon.png?v=2',
      shortcut: '/favicon.ico?v=2',
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      url: `${baseUrl}/${locale}`,
      siteName: 'Ali Al-Zuhairi',
      locale: locale === 'en' ? 'en_US' : 'fi_FI',
      alternateLocale: i18n.locales.filter(l => l !== locale).map(l =>
        l === 'en' ? 'en_US' : 'fi_FI'
      ), images: [
        {
          url: `${baseUrl}/images/main.jpg`,
          width: 1200,
          height: 630,
          alt: metadata.title,
          type: 'image/jpeg'
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      creator: '@alialzuhairi',
      site: '@alialzuhairi',
      images: [`${baseUrl}/images/main.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: alternateLanguages,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = structuredDataGenerator.generatePageStructuredData({
    url: 'https://alux.space',
    pageType: 'homepage'
  });

  return (
    <html suppressHydrationWarning>
      <head>
        {/* Blocking script: detect mobile + reduced-motion BEFORE first paint.
            Sets window.__ALUX_DISABLE_ANIM which SmoothMotionProvider reads
            via useSyncExternalStore — zero-gap, no flicker.
            Note: mobile animations are now ENABLED — only prefers-reduced-motion disables them. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var d=document.documentElement,w=window,m=w.innerWidth<=768,r=w.matchMedia("(prefers-reduced-motion:reduce)").matches;if(m)d.setAttribute("data-mobile-device","");if(r)d.setAttribute("data-reduce-motion","");w.__ALUX_DISABLE_ANIM=r}catch(e){}})()` }} />
        <link href={`${fontAwesomeBase}/fontawesome.css`} rel="stylesheet" />
        <link href={`${fontAwesomeBase}/duotone-thin.min.css`} rel="stylesheet" />
        {/* Additional favicon meta tags for better browser support */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png?v=2" />
        <link rel="apple-touch-icon" href="/favicon.png?v=2" />
        <meta name="msapplication-TileImage" content="/favicon.png?v=2" />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </head>
      <body className={`${poppins.variable} ${roboto.variable} ${tajawal.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <AnalyticsProvider>
              <SmoothMotionProvider>
                <SkipLinks />
                {children}
                <BackToTop />
                <TranslationBadge />
                <Footer />
              </SmoothMotionProvider>
            </AnalyticsProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
