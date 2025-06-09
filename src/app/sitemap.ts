import { MetadataRoute } from 'next'
import { posts } from './blog/posts/data'
import { i18n } from '../i18n'

export const dynamic = 'force-static'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = []

  // Add homepage for each locale
  i18n.locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: i18n.locales.reduce((acc, lang) => {
          acc[lang] = `${baseUrl}/${lang}`
          return acc
        }, {} as Record<string, string>)
      }
    })
  })

  // Add main pages for each locale
  const mainPages = ['portfolio', 'blog', 'prompts', 'contact']
  
  mainPages.forEach(page => {
    i18n.locales.forEach(locale => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: page === 'blog' ? 'weekly' : 'monthly',
        priority: 0.8,
        alternates: {
          languages: i18n.locales.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}/${page}`
            return acc
          }, {} as Record<string, string>)
        }
      })
    })
  })

  // Add blog posts for each locale
  posts.forEach(post => {
    i18n.locales.forEach(locale => {
      routes.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.content.en.publishedDate),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: i18n.locales.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}/blog/${post.slug}`
            return acc
          }, {} as Record<string, string>)
        }
      })
    })
  })

  // Add portfolio items if they exist
  const portfolioItems = [
    'enterprise-design-system',
    'mobile-app-redesign',
    'data-visualization-platform',
    'ai-powered-analytics'
  ]

  portfolioItems.forEach(item => {
    i18n.locales.forEach(locale => {
      routes.push({
        url: `${baseUrl}/${locale}/portfolio/${item}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: i18n.locales.reduce((acc, lang) => {
            acc[lang] = `${baseUrl}/${lang}/portfolio/${item}`
            return acc
          }, {} as Record<string, string>)
        }
      })
    })
  })

  return routes
}
