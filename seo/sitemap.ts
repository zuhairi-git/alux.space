import { MetadataRoute } from 'next';
import { posts } from '../src/app/blog/posts/data';
import { i18n } from '../src/i18n';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();
  const sitemap: MetadataRoute.Sitemap = [];

  // Add homepage for each locale
  i18n.locales.forEach(locale => {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: i18n.locales.reduce((acc, lang) => {
          acc[lang] = `${baseUrl}/${lang}`;
          return acc;
        }, {} as Record<string, string>)
      }
    });
  });

  // Add main pages for each locale
  const mainPages = [
    { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/prompt', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/design', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  mainPages.forEach(page => {
    i18n.locales.forEach(locale => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: i18n.locales.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}${page.path}`;
            return acc;
          }, {} as Record<string, string>)
        }
      });
    });
  });

  // Add portfolio case studies for each locale
  const portfolioPages = [
    '/portfolio/accessibility',
    '/portfolio/collaboration', 
    '/portfolio/jobseeking'
  ];

  portfolioPages.forEach(portfolioPath => {
    i18n.locales.forEach(locale => {
      sitemap.push({
        url: `${baseUrl}/${locale}${portfolioPath}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: i18n.locales.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}${portfolioPath}`;
            return acc;
          }, {} as Record<string, string>)
        }
      });
    });
  });

  // Add blog posts for each locale
  posts.forEach(post => {
    // Get publication date or use current date
    const publishedDate = post.content.en?.publishedDate 
      ? new Date(post.content.en.publishedDate).toISOString()
      : currentDate;

    i18n.locales.forEach(locale => {
      // Only add if content exists for this locale
      const hasContent = post.content[locale as keyof typeof post.content];
      if (hasContent) {
        sitemap.push({
          url: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastModified: publishedDate,
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: i18n.locales.reduce((acc, lang) => {
              const langContent = post.content[lang as keyof typeof post.content];
              if (langContent) {
                acc[lang] = `${baseUrl}/${lang}/blog/${post.slug}`;
              }
              return acc;
            }, {} as Record<string, string>)
          }
        });
      }
    });
  });

  return sitemap;
}
