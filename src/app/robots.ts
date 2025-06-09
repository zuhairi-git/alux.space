import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Traditional search engines
      {
        userAgent: ['Googlebot', 'Bingbot', 'DuckDuckBot', 'YandexBot', 'facebookexternalhit'],
        allow: '/',
        crawlDelay: 1,
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '*.json',
          '/temp/',
          '/staging/',
        ],
      },
      // AI search engines and assistants
      {
        userAgent: [
          'ChatGPT-User',
          'GPTBot', 
          'Google-Extended',
          'Claude-Web',
          'ClaudeBot',
          'PerplexityBot',
          'YouBot',
          'KagiBot',
          'AI2Bot',
          'anthropic-ai',
          'Applebot-Extended'
        ],
        allow: '/',
        crawlDelay: 2,
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/temp/',
          '/staging/',
        ],
      },
      // Social media crawlers
      {
        userAgent: [
          'LinkedInBot',
          'TwitterBot',
          'WhatsApp',
          'TelegramBot',
          'DiscordBot',
          'SlackBot'
        ],
        allow: '/',
        crawlDelay: 1,
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
        ],
      },
      // Block aggressive crawlers
      {
        userAgent: [
          'SemrushBot',
          'AhrefsBot',
          'MJ12bot',
          'DotBot',
          'DataForSeoBot'
        ],
        disallow: '/',
      },
      // Allow all other bots with restrictions
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 3,
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/temp/',
          '/staging/',
          '*.json$',
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
