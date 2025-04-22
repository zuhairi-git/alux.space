import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

// Add Material Symbols stylesheet
const materialSymbolsUrl = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,200,0..1,-50..200';

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
    <html lang="en" className="theme-colorful">
      <head>
        <link rel="stylesheet" href={materialSymbolsUrl} />
      </head>
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
