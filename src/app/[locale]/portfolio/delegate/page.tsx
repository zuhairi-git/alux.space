import { Metadata } from 'next';
import { i18n, alternateLanguages } from '@/i18n';
import DelegateClient from '@/components/portfolio/DelegateClient';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
    return i18n.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

    const title = 'Delegate Case Study | Portfolio';
    const description = 'Designing trust, transparency, and control for agentic AI workflows.';

    // TODO: Add actual cover image if available, using a placeholder for now
    const imageUrl = `${baseUrl}/images/portfolio/five-cases/Delegate.jpg`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `${baseUrl}/${locale}/portfolio/delegate`,
            siteName: 'Ali Al-Zuhairi',
            locale: locale,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                    type: 'image/jpeg'
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            creator: '@alialzuhairi',
            site: '@alialzuhairi',
            images: [imageUrl],
        },
        alternates: {
            canonical: `${baseUrl}/${locale}/portfolio/delegate`,
            languages: alternateLanguages(baseUrl, '/portfolio/delegate'),
        }
    };
}

export default async function DelegatePage({ params }: { params: Promise<{ locale: string }> }) {
    await params; // locale is provided by root layout context
    return <DelegateClient />;
}
