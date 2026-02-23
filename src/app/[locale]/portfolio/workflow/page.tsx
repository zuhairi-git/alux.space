import CollaborationClient from '@/components/portfolio/CollaborationClient';
import { Metadata } from 'next';
import { i18n } from '@/i18n';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
    return i18n.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
    const localizedMetadata = {
        en: {
            title: 'Workflow Platform Case Study | Portfolio',
            description: 'A case study on building an AI-powered platform for seamless team collaboration, intelligent workspaces, and real-time activity tracking across iOS, Android, and admin portal.',
        },
        fi: {
            title: 'Työnkulkualustan tapaustutkimus | Portfolio',
            description: 'Tapaustutkimus tekoälypohjaisesta alustasta saumattomaan tiimityöskentelyyn, älykkäisiin työtiloihin ja reaaliaikaiseen toiminnan seurantaan iOS:lle, Androidille ja hallintaportaalille.',
        }
    };
    const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;
    const imageUrl = `${baseUrl}/images/portfolio/workflow/cover.jpg`;

    return {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            url: `${baseUrl}/${locale}/portfolio/workflow`,
            siteName: 'Ali Al-Zuhairi',
            locale: locale,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: metadata.title,
                    type: 'image/jpeg'
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: metadata.title,
            description: metadata.description,
            creator: '@alialzuhairi',
            site: '@alialzuhairi',
            images: [imageUrl],
        },
        alternates: {
            canonical: `${baseUrl}/${locale}/portfolio/workflow`,
            languages: i18n.locales.reduce((acc, lang) => {
                acc[lang] = `${baseUrl}/${lang}/portfolio/workflow`;
                return acc;
            }, {} as Record<string, string>),
        }
    };
}

export default async function WorkflowPage({ params }: { params: Promise<{ locale: string }> }) {
    await params; // locale is provided by root layout context
    return <CollaborationClient />;
}
