import { Metadata } from 'next';
import { i18n, alternateLanguages } from '@/i18n';
import IntelligenceByDesignClient from '@/components/portfolio/IntelligenceByDesignClient';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
    return i18n.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

    const title = 'Intelligence by Design Case Study | Portfolio';
    const description = 'Documenting the real impact of AI integration in a live product at Webropol.';

    // TODO: Add actual cover image if available, using a placeholder for now
    const imageUrl = `${baseUrl}/images/portfolio/five-cases/IntelligencebyDesign.jpg`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `${baseUrl}/${locale}/portfolio/intelligence-by-design`,
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
            canonical: `${baseUrl}/${locale}/portfolio/intelligence-by-design`,
            languages: alternateLanguages(baseUrl, '/portfolio/intelligence-by-design'),
        }
    };
}

export default async function IntelligenceByDesignPage({ params }: { params: Promise<{ locale: string }> }) {
    await params; // locale is provided by root layout context
    return <IntelligenceByDesignClient />;
}
