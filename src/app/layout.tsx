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
import { i18n, getLocaleConfig } from '../i18n';
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

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

/**
 * Locale-neutral document defaults.
 *
 * This layout sits above the [locale] segment and therefore has no access to
 * the active locale — anything language-specific (title, description, OG,
 * canonical, hreflang) belongs in src/app/[locale]/layout.tsx or the individual
 * pages, which do know it. Deliberately no `alternates.canonical` here: a
 * canonical set on the root layout is inherited by every page that doesn't
 * override it, which would point unrelated pages at the homepage.
 */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Ali Al-Zuhairi - Product Owner & Design Leader',
    template: '%s | Ali Al-Zuhairi',
  },
  description:
    'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation. Based in Helsinki, Finland.',
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
      { url: '/favicon.png?v=2', type: 'image/png' },
    ],
    apple: '/favicon.png?v=2',
    shortcut: '/favicon.ico?v=2',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

/**
 * Pre-paint locale bootstrap.
 *
 * Static export means there is no middleware and no request-time render, so the
 * <html> element below can't be given lang/dir from the route. `next build`
 * bakes the correct values into every emitted file (scripts/inject-html-lang.js);
 * this script covers `next dev` and any client-side navigation, and runs before
 * first paint so an RTL locale never flashes LTR.
 */
const localeDirectionMap = Object.fromEntries(
  i18n.locales.map((locale) => {
    const config = getLocaleConfig(locale);
    return [locale, [config.htmlLang, config.dir]];
  })
);

const localeBootstrapScript = `(function(){try{var m=${JSON.stringify(
  localeDirectionMap
)},s=location.pathname.split("/").filter(Boolean)[0],c=m[s]||m[${JSON.stringify(
  i18n.defaultLocale
)}];var d=document.documentElement;d.setAttribute("lang",c[0]);d.setAttribute("dir",c[1]);}catch(e){}})()`;

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
    // lang/dir are intentionally not set here — see localeBootstrapScript above.
    // suppressHydrationWarning keeps React quiet about the attributes the build
    // step and the bootstrap script write onto this element.
    <html suppressHydrationWarning>
      <head>
        {/* Blocking script: resolve locale from the URL and set lang/dir BEFORE
            first paint, so RTL locales never flash left-to-right. */}
        <script dangerouslySetInnerHTML={{ __html: localeBootstrapScript }} />
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
