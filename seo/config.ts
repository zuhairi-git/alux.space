/**
 * SEO Configuration for alux.space
 * Comprehensive SEO settings for Ali Al-Zuhairi's portfolio
 */

export const seoConfig = {
  // === BASIC SITE INFORMATION ===
  siteName: 'Ali Al-Zuhairi',
  siteTitle: 'Ali Al-Zuhairi - Product Designer & UX Leader',
  siteDescription: 'Product Designer and UX Leader based in Helsinki, Finland. Specializing in accessible design systems, AI integration, and creative innovation.',
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space',
  
  // === OWNER INFORMATION ===
  author: {
    name: 'Ali Al-Zuhairi',
    title: 'Product Designer & UX Leader',
    location: 'Helsinki, Finland',
    email: 'hello@alux.space',
    linkedin: 'https://www.linkedin.com/in/ali-zuhairi/',
    twitter: '@alialzuhairi',
    github: 'https://github.com/'
  },

  // === BUSINESS INFORMATION ===
  business: {
    type: 'Professional Services',
    category: 'UX Design & Product Management',
    services: [
      'User Experience Design',
      'Product Strategy',
      'Design Systems',
      'Accessibility Consulting',
      'AI Integration',
      'Creative Direction'
    ],
    serviceArea: {
      city: 'Helsinki',
      country: 'Finland',
      region: 'Nordic Countries',
      coordinates: {
        latitude: 60.1699,
        longitude: 24.9384
      }
    }
  },

  // === KEYWORDS & TOPICS ===
  keywords: {
    primary: [
      'AI Driven Product Designer',
      'UX Designer Helsinki',
      'Product Designer Finland',
      'Design Leader',
      'Accessibility Expert',
      'AI UX Design',
      'Creative Innovation'
    ],
    secondary: [
      'AI Product Design',
      'User Experience',
      'Product Design',
      'Design Systems',
      'Helsinki Design',
      'Nordic Design',
      'Finnish Designer',
      'Accessibility',
      'Inclusive Design',
      'AI Integration',
      'Creative Direction',
      'Portfolio',
      'Case Studies'    ],    technical: [
      'React',
      'Prompt Engineering',
      'Next.js',
      'Figma',
      'Figma Make',
      'Design Systems', 
      'Accessibility',  
      'VS Code Copilot',
      'AI Design Tools',
      'WCAG',
      'ARIA',
      'TypeScript',
      'Tailwind CSS',
      'AI Ethics',
      'Machine Learning',
      'Critical Thinking',
      'Human Intelligence',
      'Technology Philosophy',
      'AI Strategy',
      'Cognitive Enhancement',
      'AI Adversarial Training'
    ],
    local: [
      'Helsinki UX',
      'Finland Design',
      'Nordic UX',
      'Scandinavian Design',
      'Finnish Technology',
      'Helsinki Innovation',
      'Suomi Design',
      'Baltic Design'
    ]
  },

  // === SOCIAL MEDIA ===
  social: {
    twitter: {
      handle: '@alialzuhairi',
      site: '@alialzuhairi'
    },
    linkedin: 'https://www.linkedin.com/in/ali-zuhairi/',
    github: 'https://github.com/'
  },

  // === IMAGES ===
  images: {
    logo: '/images/logo/AluxLogoLabel.svg',
    favicon: '/favicon.ico',
    ogDefault: '/images/og/default-og.jpg',
    authorPhoto: '/images/me/ali.png'
  },

  // === LANGUAGE & LOCALIZATION ===
  languages: ['en', 'fi'],
  defaultLanguage: 'en',
  alternateLanguages: {
    'en': 'English',
    'fi': 'Suomi'
  },

  // === STRUCTURED DATA ===
  structuredData: {
    organization: {
      '@type': 'Person',
      name: 'Ali Al-Zuhairi',
      jobTitle: 'AI Driven Product Designer & Product Owner',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Helsinki',
        addressCountry: 'Finland'
      },
      sameAs: [
        'https://www.linkedin.com/in/ali-zuhairi/',
        'https://github.com/'
      ]
    }
  },

  // === ANALYTICS ===
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    googleSearchConsole: process.env.NEXT_PUBLIC_GSC_ID
  },

  // === ROBOTS & CRAWLING ===
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1
  },

  // === VERIFICATION ===
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION
  }
} as const;

export type SEOConfig = typeof seoConfig;
