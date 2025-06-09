/**
 * Structured Data Schemas
 * JSON-LD structured data for enhanced SEO and rich snippets
 */

import { seoConfig } from './config';
import { posts } from '../src/app/blog/posts/data';

export interface StructuredDataOptions {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  language?: string;
  publishedDate?: string;
  modifiedDate?: string;
}

export class StructuredDataGenerator {
  private baseUrl: string;

  constructor() {
    this.baseUrl = seoConfig.siteUrl;
  }

  /**
   * Generate Organization/Person schema
   */
  public generatePersonSchema(): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${this.baseUrl}#person`,
      name: seoConfig.author.name,
      givenName: 'Ali',
      familyName: 'Al-Zuhairi',
      jobTitle: seoConfig.author.title,
      description: seoConfig.siteDescription,
      url: this.baseUrl,
      image: {
        '@type': 'ImageObject',
        url: `${this.baseUrl}${seoConfig.images.authorPhoto}`,
        width: 400,
        height: 400,
        caption: `${seoConfig.author.name} - ${seoConfig.author.title}`
      },
      sameAs: [
        seoConfig.social.linkedin,
        seoConfig.social.github,
        `https://twitter.com/${seoConfig.social.twitter.handle.replace('@', '')}`
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: seoConfig.business.serviceArea.city,
        addressRegion: 'Uusimaa',
        addressCountry: {
          '@type': 'Country',
          name: seoConfig.business.serviceArea.country,
          sameAs: 'https://en.wikipedia.org/wiki/Finland'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: seoConfig.business.serviceArea.coordinates.latitude,
          longitude: seoConfig.business.serviceArea.coordinates.longitude
        }
      },
      knowsAbout: [
        ...seoConfig.keywords.primary,
        ...seoConfig.keywords.secondary,
        ...seoConfig.keywords.technical
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'UX Designer',
        occupationLocation: {
          '@type': 'Place',
          name: `${seoConfig.business.serviceArea.city}, ${seoConfig.business.serviceArea.country}`
        },
        skills: seoConfig.business.services,
        experienceRequirements: 'Senior Level'
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Design & Technology Education',
        description: 'Specialized education in UX design, product management, and creative technologies'
      },
      memberOf: {
        '@type': 'ProfessionalOrganization',
        name: 'Design Community',
        description: 'Active member of international design and UX communities'
      },
      award: [
        'UX Excellence Recognition',
        'Accessibility Champion',
        'Innovation Leader'
      ],
      workLocation: {
        '@type': 'Place',
        name: seoConfig.business.serviceArea.city,
        address: {
          '@type': 'PostalAddress',
          addressLocality: seoConfig.business.serviceArea.city,
          addressCountry: seoConfig.business.serviceArea.country
        }
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Independent Design Consultant',
        description: 'Providing UX design and product strategy services'
      }
    };
  }

  /**
   * Generate WebSite schema with search functionality
   */
  public generateWebSiteSchema(): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${this.baseUrl}#website`,
      url: this.baseUrl,
      name: seoConfig.siteName,
      alternateName: 'ALUX.space',
      description: seoConfig.siteDescription,
      publisher: {
        '@id': `${this.baseUrl}#person`
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${this.baseUrl}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: seoConfig.languages.map(lang => ({
        '@type': 'Language',
        name: lang === 'en' ? 'English' : 'Finnish',
        alternateName: lang
      })),
      isAccessibleForFree: true,
      usageInfo: `${this.baseUrl}/privacy`,
      copyrightYear: new Date().getFullYear(),
      copyrightHolder: {
        '@id': `${this.baseUrl}#person`
      },
      license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      mainEntity: {
        '@id': `${this.baseUrl}#person`
      }
    };
  }

  /**
   * Generate ProfessionalService schema
   */
  public generateProfessionalServiceSchema(): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${this.baseUrl}#service`,
      name: seoConfig.business.category,
      description: seoConfig.siteDescription,
      provider: {
        '@id': `${this.baseUrl}#person`
      },
      serviceType: seoConfig.business.services,
      areaServed: [
        {
          '@type': 'City',
          name: seoConfig.business.serviceArea.city,
          containedInPlace: {
            '@type': 'Country',
            name: seoConfig.business.serviceArea.country
          }
        },
        {
          '@type': 'Place',
          name: seoConfig.business.serviceArea.region
        },
        {
          '@type': 'Place',
          name: 'Europe'
        },
        {
          '@type': 'Place',
          name: 'Remote Worldwide'
        }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'UX Design Services',
        itemListElement: seoConfig.business.services.map((service, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Service',
            name: service,
            description: `Professional ${service.toLowerCase()} services`
          },
          seller: {
            '@id': `${this.baseUrl}#person`
          },
          areaServed: {
            '@type': 'Place',
            name: seoConfig.business.serviceArea.region
          }
        }))
      },
      url: this.baseUrl,
      telephone: '+358-XX-XXX-XXXX', // Update with real number
      email: seoConfig.author.email,
      priceRange: '€€€',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Invoice, Bank Transfer',
      openingHours: 'Mo-Fr 09:00-17:00',
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: seoConfig.business.serviceArea.coordinates.latitude,
          longitude: seoConfig.business.serviceArea.coordinates.longitude
        },
        geoRadius: '50000' // 50km radius from Helsinki
      }
    };
  }

  /**
   * Generate Article schema for blog posts
   */
  public generateArticleSchema(options: StructuredDataOptions & {
    slug: string;
    author?: string;
    tags?: string[];
  }): Record<string, any> {
    const post = posts.find(p => p.slug === options.slug);
    if (!post) return {};

    const content = post.content[options.language as keyof typeof post.content] || post.content.en;

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${options.url}#article`,
      headline: content.title,
      description: content.description,
      image: {
        '@type': 'ImageObject',
        url: post.image.startsWith('http') ? post.image : `${this.baseUrl}${post.image}`,
        width: 1200,
        height: 630,
        caption: content.title
      },
      author: {
        '@type': 'Person',
        '@id': `${this.baseUrl}#person`,
        name: post.author || seoConfig.author.name,
        url: this.baseUrl
      },
      publisher: {
        '@type': 'Organization',
        '@id': `${this.baseUrl}#organization`,
        name: seoConfig.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}${seoConfig.images.logo}`,
          width: 200,
          height: 60
        }
      },
      datePublished: content.publishedDate,
      dateModified: options.modifiedDate || content.publishedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': options.url
      },
      articleSection: post.tags?.[0] || 'Technology',
      keywords: post.tags?.join(', ') || seoConfig.keywords.primary.join(', '),      articleBody: content.content?.substring(0, 500) + '...',
      wordCount: content.content?.length || 0,
      timeRequired: content.readTime || 'PT5M',
      inLanguage: options.language || 'en',
      isAccessibleForFree: true,
      url: options.url,
      potentialAction: {
        '@type': 'ReadAction',
        target: [options.url]
      },
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/ReadAction',
        userInteractionCount: 0 // Update with actual data
      }
    };
  }

  /**
   * Generate Portfolio/CreativeWork schema
   */
  public generatePortfolioSchema(options: StructuredDataOptions & {
    projectName: string;
    category: string;
    technologies?: string[];
  }): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${options.url}#creative-work`,
      name: options.projectName,
      description: options.description || `${options.projectName} - UX Design Case Study`,
      creator: {
        '@id': `${this.baseUrl}#person`
      },
      image: options.image ? {
        '@type': 'ImageObject',
        url: options.image.startsWith('http') ? options.image : `${this.baseUrl}${options.image}`,
        caption: options.projectName
      } : undefined,
      dateCreated: options.publishedDate,
      dateModified: options.modifiedDate || options.publishedDate,
      genre: options.category,
      keywords: options.technologies?.join(', ') || seoConfig.keywords.technical.join(', '),
      about: {
        '@type': 'Thing',
        name: 'UX Design',
        description: 'User Experience Design and Product Strategy'
      },
      workExample: {
        '@type': 'CreativeWork',
        name: options.projectName,
        description: options.description,
        url: options.url
      },
      isAccessibleForFree: true,
      license: 'https://creativecommons.org/licenses/by-nc-sa/4.0/',
      copyrightHolder: {
        '@id': `${this.baseUrl}#person`
      },
      inLanguage: options.language || 'en'
    };
  }

  /**
   * Generate BreadcrumbList schema
   */
  public generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
  }

  /**
   * Generate FAQ schema for common questions
   */
  public generateFAQSchema(): Record<string, any> {
    const faqs = [
      {
        question: 'What UX design services do you offer in Helsinki?',
        answer: 'I offer comprehensive UX design services including user research, wireframing, prototyping, design systems, accessibility consulting, and AI integration. Based in Helsinki, I work with companies across Finland and internationally.'
      },
      {
        question: 'Do you work with international clients remotely?',
        answer: 'Yes, I work with clients worldwide remotely. My experience includes collaborating with teams across different time zones while maintaining high-quality design standards and clear communication.'
      },
      {
        question: 'What is your approach to accessibility in design?',
        answer: 'I prioritize accessibility from the start of every project, following WCAG guidelines and conducting accessibility audits. This ensures designs are inclusive and usable by everyone, including users with disabilities.'
      },
      {
        question: 'How do you integrate AI into UX design projects?',
        answer: 'I leverage AI tools for user research analysis, design automation, and creating personalized user experiences. This includes using AI for rapid prototyping, content generation, and data-driven design decisions.'
      },
      {
        question: 'What industries do you have experience in?',
        answer: 'I have experience across various industries including technology, e-commerce, healthcare, education, and financial services. My approach adapts to each industry\'s unique requirements and user needs.'
      }
    ];

    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  /**
   * Generate LocalBusiness schema for Helsinki presence
   */
  public generateLocalBusinessSchema(): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${this.baseUrl}#local-business`,
      name: seoConfig.author.name,
      description: seoConfig.siteDescription,
      url: this.baseUrl,
      telephone: '+358-XX-XXX-XXXX', // Update with real number
      email: seoConfig.author.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: seoConfig.business.serviceArea.city,
        addressRegion: 'Uusimaa',
        addressCountry: seoConfig.business.serviceArea.country,
        postalCode: '00100' // Helsinki center postal code
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: seoConfig.business.serviceArea.coordinates.latitude,
        longitude: seoConfig.business.serviceArea.coordinates.longitude
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00'
      },
      sameAs: [
        seoConfig.social.linkedin,
        seoConfig.social.github
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'UX Design Services',
        itemListElement: seoConfig.business.services.map(service => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service
          }
        }))
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Helsinki'
        },
        {
          '@type': 'State',
          name: 'Uusimaa'
        },
        {
          '@type': 'Country',
          name: 'Finland'
        }
      ],
      priceRange: '€€€',
      paymentAccepted: ['Invoice', 'Bank Transfer', 'Credit Card'],
      currenciesAccepted: 'EUR'
    };
  }

  /**
   * Generate complete structured data for a page
   */
  public generatePageStructuredData(options: StructuredDataOptions & {
    pageType: 'homepage' | 'portfolio' | 'blog' | 'blog-post' | 'contact';
    breadcrumbs?: Array<{ name: string; url: string }>;
    slug?: string;
    projectName?: string;
    category?: string;
    technologies?: string[];
  }): string {
    const schemas = [];

    // Always include person and website schemas
    schemas.push(this.generatePersonSchema());
    schemas.push(this.generateWebSiteSchema());

    // Add page-specific schemas
    switch (options.pageType) {
      case 'homepage':
        schemas.push(this.generateProfessionalServiceSchema());
        schemas.push(this.generateLocalBusinessSchema());
        schemas.push(this.generateFAQSchema());
        break;
      
      case 'blog-post':
        if (options.slug) {
          schemas.push(this.generateArticleSchema(options as any));
        }
        break;
      
      case 'portfolio':
        if (options.projectName) {
          schemas.push(this.generatePortfolioSchema(options as any));
        }
        break;
    }

    // Add breadcrumbs if provided
    if (options.breadcrumbs && options.breadcrumbs.length > 1) {
      schemas.push(this.generateBreadcrumbSchema(options.breadcrumbs));
    }

    // Create graph structure
    const structuredData = {
      '@context': 'https://schema.org',
      '@graph': schemas
    };

    return JSON.stringify(structuredData, null, 2);
  }
}

export const structuredDataGenerator = new StructuredDataGenerator();
