import type { Metadata } from 'next';
import LocaleRedirect from '@/components/ui/LocaleRedirect';
import { i18n } from '@/i18n';
import { posts } from '../posts/data';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * Legacy un-prefixed post URL. These were shared publicly before the locale
 * prefix existed, so they redirect rather than 404 — the canonical points at
 * the localised article.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    robots: { index: false, follow: true },
    alternates: { canonical: `${baseUrl}/${i18n.defaultLocale}/blog/${slug}` },
  };
}

export default async function BlogPostRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LocaleRedirect path={`/blog/${slug}`} />;
}
