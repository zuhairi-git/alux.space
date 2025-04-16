import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: 'Ali Al-Zuhairi - Product Owner & Design Leader',
    template: '%s | Ali Al-Zuhairi'
  },
  description: 'Product Owner and Design Leader with expertise in UX design, agile methodologies, and creative innovation.',
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
