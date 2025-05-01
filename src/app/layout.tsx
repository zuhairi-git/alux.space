import type { Metadata } from "next";
import { Poppins, Roboto, Tajawal } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import BackToTop from "@/components/ui/BackToTop";
import Footer from "@/components/Footer";

// Add Material Symbols stylesheet with better support for RTL languages
const materialSymbolsUrl = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=block';

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

// Add Tajawal font for Arabic text
const tajawal = Tajawal({
  variable: "--font-tajawal",
  weight: ['400', '500', '700'],
  subsets: ["arabic"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'Ali Al-Zuhairi - Product Owner & Design Leader',
    template: '%s | Ali Al-Zuhairi'
  },
  description: 'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Ali Al-Zuhairi - Product Owner & Design Leader',
    description: 'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation.',
    type: 'website',
    siteName: 'Ali Al-Zuhairi',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ali Al-Zuhairi - Product Owner & Design Leader',
    description: 'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation.',
    creator: '@alialzuhairi',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link href={materialSymbolsUrl} rel="stylesheet" />
      </head>
      <body className={`${poppins.variable} ${roboto.variable} ${tajawal.variable}`}>
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
