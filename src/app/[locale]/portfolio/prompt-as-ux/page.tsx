import { Metadata } from 'next';
import { i18n } from '@/i18n';
import PromptAsUxClient from '@/components/portfolio/PromptAsUxClient';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
    return i18n.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

    const title = 'Prompt as UX Case Study | Portfolio';
    const description = 'What if writing prompts is the most important UX skill of the next decade?';

    // TODO: Add actual cover image if available, using a placeholder for now
    const imageUrl = `${baseUrl}/images/portfolio/five-cases/PromptasUX.jpg`;

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            url: `${baseUrl}/${locale}/portfolio/prompt-as-ux`,
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
            canonical: `${baseUrl}/${locale}/portfolio/prompt-as-ux`,
            languages: i18n.locales.reduce((acc, lang) => {
                acc[lang] = `${baseUrl}/${lang}/portfolio/prompt-as-ux`;
                return acc;
            }, {} as Record<string, string>),
        }
    };
}

export default async function PromptAsUxPage({ params }: { params: Promise<{ locale: string }> }) {
    await params; // locale is provided by root layout context
    return <PromptAsUxClient />;
}
