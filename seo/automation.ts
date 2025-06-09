/**
 * SEO Automation Scripts
 * Comprehensive SEO auditing, monitoring, and optimization tools
 */

import { MetadataRoute } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { posts } from '../src/app/blog/posts/data';
import { seoConfig } from './config';

// Types for SEO audit results
export interface SEOAuditResult {
  score: number;
  issues: SEOIssue[];
  recommendations: string[];
  metrics: SEOMetrics;
  timestamp: Date;
}

export interface SEOIssue {
  severity: 'error' | 'warning' | 'info';
  category: 'meta' | 'content' | 'technical' | 'performance' | 'accessibility';
  message: string;
  page?: string;
  element?: string;
  fix?: string;
}

export interface SEOMetrics {
  totalPages: number;
  pagesWithMeta: number;
  pagesWithImages: number;
  averageContentLength: number;
  internalLinks: number;
  externalLinks: number;
  h1Count: number;
  duplicateMetaDescriptions: number;
  duplicateTitles: number;
  missingAltTags: number;
}

export class SEOAutomation {
  private baseUrl: string;
  private outputDir: string;

  constructor() {
    this.baseUrl = seoConfig.siteUrl;
    this.outputDir = path.join(process.cwd(), 'seo', 'reports');
  }

  /**
   * Generate comprehensive sitemap with advanced features
   */
  public async generateSitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemap: MetadataRoute.Sitemap = [];
    const currentDate = new Date().toISOString();

    // Homepage - highest priority
    sitemap.push({
      url: this.baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${this.baseUrl}/en`,
          fi: `${this.baseUrl}/fi`,
        }
      }
    });

    // Portfolio pages
    const portfolioPages = [
      { slug: '', priority: 0.9 },
      { slug: '/jobseeking', priority: 0.8 },
      { slug: '/accessibility', priority: 0.8 },
      { slug: '/designsystem', priority: 0.8 },
    ];

    portfolioPages.forEach(page => {
      seoConfig.languages.forEach(lang => {
        sitemap.push({
          url: `${this.baseUrl}/${lang}/portfolio${page.slug}`,
          lastModified: currentDate,
          changeFrequency: 'monthly',
          priority: page.priority,
          alternates: {
            languages: {
              en: `${this.baseUrl}/en/portfolio${page.slug}`,
              fi: `${this.baseUrl}/fi/portfolio${page.slug}`,
            }
          }
        });
      });
    });

    // Blog index pages
    seoConfig.languages.forEach(lang => {
      sitemap.push({
        url: `${this.baseUrl}/${lang}/blog`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${this.baseUrl}/en/blog`,
            fi: `${this.baseUrl}/fi/blog`,
          }
        }
      });
    });

    // Blog posts
    posts.forEach(post => {
      seoConfig.languages.forEach(lang => {
        // Get the publish date for last modified
        const publishDate = post.content[lang as keyof typeof post.content]?.publishedDate || 
                           post.content.en.publishedDate;
        
        sitemap.push({
          url: `${this.baseUrl}/${lang}/blog/${post.slug}`,
          lastModified: new Date(publishDate).toISOString(),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: {
              en: `${this.baseUrl}/en/blog/${post.slug}`,
              fi: `${this.baseUrl}/fi/blog/${post.slug}`,
            }
          }
        });
      });
    });

    // Prompt page
    sitemap.push({
      url: `${this.baseUrl}/prompt`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    });

    return sitemap;
  }

  /**
   * Perform comprehensive SEO audit
   */
  public async performSEOAudit(): Promise<SEOAuditResult> {
    const issues: SEOIssue[] = [];
    const metrics: SEOMetrics = {
      totalPages: 0,
      pagesWithMeta: 0,
      pagesWithImages: 0,
      averageContentLength: 0,
      internalLinks: 0,
      externalLinks: 0,
      h1Count: 0,
      duplicateMetaDescriptions: 0,
      duplicateTitles: 0,
      missingAltTags: 0,
    };

    // Audit blog posts
    const metaDescriptions: Set<string> = new Set();
    const titles: Set<string> = new Set();
    let totalContentLength = 0;

    posts.forEach(post => {
      metrics.totalPages++;

      // Check for meta data
      seoConfig.languages.forEach(lang => {
        const content = post.content[lang as keyof typeof post.content];
        if (!content) {
          issues.push({
            severity: 'warning',
            category: 'content',
            message: `Missing content for language: ${lang}`,
            page: `/blog/${post.slug}`,
            fix: `Add ${lang} translation for this post`
          });
          return;
        }

        metrics.pagesWithMeta++;

        // Check for duplicate meta descriptions
        if (metaDescriptions.has(content.description)) {
          metrics.duplicateMetaDescriptions++;
          issues.push({
            severity: 'warning',
            category: 'meta',
            message: 'Duplicate meta description detected',
            page: `/${lang}/blog/${post.slug}`,
            fix: 'Create unique meta description for this page'
          });
        } else {
          metaDescriptions.add(content.description);
        }

        // Check for duplicate titles
        if (titles.has(content.title)) {
          metrics.duplicateTitles++;
          issues.push({
            severity: 'error',
            category: 'meta',
            message: 'Duplicate title detected',
            page: `/${lang}/blog/${post.slug}`,
            fix: 'Create unique title for this page'
          });
        } else {
          titles.add(content.title);
        }

        // Check meta description length
        if (content.description.length < 120) {
          issues.push({
            severity: 'warning',
            category: 'meta',
            message: 'Meta description too short (should be 120-160 characters)',
            page: `/${lang}/blog/${post.slug}`,
            fix: 'Expand meta description to provide more detail'
          });
        } else if (content.description.length > 160) {
          issues.push({
            severity: 'warning',
            category: 'meta',
            message: 'Meta description too long (should be 120-160 characters)',
            page: `/${lang}/blog/${post.slug}`,
            fix: 'Shorten meta description to prevent truncation'
          });
        }

        // Check title length
        if (content.title.length > 60) {
          issues.push({
            severity: 'warning',
            category: 'meta',
            message: 'Title too long (should be under 60 characters)',
            page: `/${lang}/blog/${post.slug}`,
            fix: 'Shorten title to prevent truncation in search results'
          });
        }        // Count content length
        if (content.content) {
          totalContentLength += content.content.length;
        }
      });

      // Check for featured image
      if (post.image) {
        metrics.pagesWithImages++;
      } else {
        issues.push({
          severity: 'warning',
          category: 'content',
          message: 'Missing featured image',
          page: `/blog/${post.slug}`,
          fix: 'Add a featured image for better social sharing'
        });
      }
    });

    metrics.averageContentLength = totalContentLength / (posts.length * seoConfig.languages.length);

    // Technical SEO checks
    await this.performTechnicalAudit(issues, metrics);

    // Calculate score based on issues
    const score = this.calculateSEOScore(issues, metrics);

    // Generate recommendations
    const recommendations = this.generateRecommendations(issues, metrics);

    return {
      score,
      issues,
      recommendations,
      metrics,
      timestamp: new Date()
    };
  }

  /**
   * Perform technical SEO audit
   */
  private async performTechnicalAudit(issues: SEOIssue[], metrics: SEOMetrics): Promise<void> {
    // Check robots.txt
    try {
      const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
      await fs.access(robotsPath);
    } catch {
      issues.push({
        severity: 'error',
        category: 'technical',
        message: 'robots.txt file not found',
        fix: 'Create robots.txt file in public directory'
      });
    }

    // Check sitemap
    try {
      const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
      await fs.access(sitemapPath);
    } catch {
      issues.push({
        severity: 'warning',
        category: 'technical',
        message: 'sitemap.xml not found in public directory',
        fix: 'Generate and deploy sitemap.xml'
      });
    }

    // Check favicon
    try {
      const faviconPath = path.join(process.cwd(), 'public', 'favicon.ico');
      await fs.access(faviconPath);
    } catch {
      issues.push({
        severity: 'warning',
        category: 'technical',
        message: 'favicon.ico not found',
        fix: 'Add favicon.ico to public directory'
      });
    }

    // Check for HTTPS in config
    if (!seoConfig.siteUrl.startsWith('https://')) {
      issues.push({
        severity: 'error',
        category: 'technical',
        message: 'Site URL should use HTTPS',
        fix: 'Update site URL to use HTTPS protocol'
      });
    }

    // Check for trailing slash consistency
    if (!seoConfig.siteUrl.endsWith('/')) {
      issues.push({
        severity: 'info',
        category: 'technical',
        message: 'Consider adding trailing slash to base URL for consistency',
        fix: 'Add trailing slash to base URL or ensure consistent URL structure'
      });
    }
  }

  /**
   * Calculate SEO score based on issues and metrics
   */
  private calculateSEOScore(issues: SEOIssue[], metrics: SEOMetrics): number {
    let score = 100;

    // Deduct points for issues
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'error':
          score -= 5;
          break;
        case 'warning':
          score -= 2;
          break;
        case 'info':
          score -= 0.5;
          break;
      }
    });

    // Bonus points for good metrics
    if (metrics.pagesWithMeta / metrics.totalPages > 0.9) {
      score += 5;
    }
    if (metrics.pagesWithImages / metrics.totalPages > 0.8) {
      score += 3;
    }
    if (metrics.averageContentLength > 1000) {
      score += 2;
    }

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(issues: SEOIssue[], metrics: SEOMetrics): string[] {
    const recommendations: string[] = [];

    // Priority recommendations based on issues
    const errorCount = issues.filter(i => i.severity === 'error').length;
    const warningCount = issues.filter(i => i.severity === 'warning').length;

    if (errorCount > 0) {
      recommendations.push(`Fix ${errorCount} critical SEO errors immediately`);
    }

    if (warningCount > 5) {
      recommendations.push(`Address ${warningCount} SEO warnings to improve rankings`);
    }

    if (metrics.duplicateMetaDescriptions > 0) {
      recommendations.push('Create unique meta descriptions for all pages');
    }

    if (metrics.duplicateTitles > 0) {
      recommendations.push('Ensure all page titles are unique');
    }

    if (metrics.averageContentLength < 500) {
      recommendations.push('Increase content length for better SEO performance');
    }

    if (metrics.pagesWithImages / metrics.totalPages < 0.8) {
      recommendations.push('Add featured images to more pages for better social sharing');
    }

    // Performance recommendations
    recommendations.push('Enable image optimization and lazy loading');
    recommendations.push('Implement structured data markup for rich snippets');
    recommendations.push('Add breadcrumb navigation for better UX and SEO');
    recommendations.push('Optimize Core Web Vitals for better search rankings');

    // Content recommendations
    recommendations.push('Create more localized content for Helsinki/Finland audience');
    recommendations.push('Add FAQ section to address common user queries');
    recommendations.push('Implement internal linking strategy');

    return recommendations;
  }

  /**
   * Generate SEO report and save to file
   */
  public async generateSEOReport(): Promise<string> {
    const audit = await this.performSEOAudit();
    
    // Ensure output directory exists
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create output directory:', error);
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(this.outputDir, `seo-audit-${timestamp}.json`);

    const report = {
      ...audit,
      generatedBy: 'SEO Automation Script',
      siteUrl: this.baseUrl,
      auditVersion: '1.0.0'
    };

    try {
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      return reportPath;
    } catch (error) {
      console.error('Failed to save SEO report:', error);
      throw error;
    }
  }

  /**
   * Monitor SEO performance over time
   */
  public async monitorSEOPerformance(): Promise<void> {
    const audit = await this.performSEOAudit();
    
    // Load previous audit if exists
    const historyPath = path.join(this.outputDir, 'seo-history.json');
    let history: any[] = [];
    
    try {
      const historyData = await fs.readFile(historyPath, 'utf-8');
      history = JSON.parse(historyData);
    } catch {
      // History file doesn't exist yet
    }

    // Add current audit to history
    history.push({
      timestamp: audit.timestamp,
      score: audit.score,
      issueCount: audit.issues.length,
      errorCount: audit.issues.filter(i => i.severity === 'error').length,
      warningCount: audit.issues.filter(i => i.severity === 'warning').length,
    });

    // Keep only last 30 audits
    if (history.length > 30) {
      history = history.slice(-30);
    }

    // Save updated history
    try {
      await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
    } catch (error) {
      console.error('Failed to save SEO history:', error);
    }

    // Alert on significant score drops
    if (history.length >= 2) {
      const current = history[history.length - 1];
      const previous = history[history.length - 2];
      
      if (current.score < previous.score - 10) {
        console.warn(`⚠️  SEO Score dropped significantly: ${previous.score} → ${current.score}`);
      }

      if (current.errorCount > previous.errorCount) {
        console.warn(`⚠️  New SEO errors detected: ${current.errorCount - previous.errorCount} new errors`);
      }
    }
  }

  /**
   * Generate structured data for the site
   */
  public generateStructuredData(): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        // Personal/Professional Profile
        {
          '@type': 'Person',
          '@id': `${this.baseUrl}#person`,
          name: seoConfig.author.name,
          jobTitle: seoConfig.author.title,
          description: seoConfig.siteDescription,
          url: this.baseUrl,
          image: `${this.baseUrl}${seoConfig.images.authorPhoto}`,
          sameAs: [
            seoConfig.social.linkedin,
            seoConfig.social.github,
            `https://twitter.com/${seoConfig.social.twitter.handle.replace('@', '')}`
          ],
          address: {
            '@type': 'PostalAddress',
            addressLocality: seoConfig.business.serviceArea.city,
            addressCountry: seoConfig.business.serviceArea.country
          },
          knowsAbout: [...seoConfig.keywords.primary, ...seoConfig.keywords.secondary] as string[],
          alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Design & Technology Education'
          }
        },
        // Website
        {
          '@type': 'WebSite',
          '@id': `${this.baseUrl}#website`,
          url: this.baseUrl,
          name: seoConfig.siteName,
          description: seoConfig.siteDescription,
          publisher: {
            '@id': `${this.baseUrl}#person`
          },
          inLanguage: seoConfig.languages,
          copyrightYear: new Date().getFullYear(),
          copyrightHolder: {
            '@id': `${this.baseUrl}#person`
          }
        },
        // Professional Service
        {
          '@type': 'ProfessionalService',
          '@id': `${this.baseUrl}#service`,
          name: seoConfig.business.category,
          description: seoConfig.siteDescription,
          provider: {
            '@id': `${this.baseUrl}#person`
          },
          areaServed: {
            '@type': 'Place',
            name: seoConfig.business.serviceArea.region
          },
          serviceType: seoConfig.business.services,
          url: this.baseUrl
        }
      ]
    };
  }
}

// Export automation tools
export const seoAutomation = new SEOAutomation();

// CLI-friendly functions for build scripts
export async function generateSEOAudit(): Promise<void> {
  console.log('🔍 Starting SEO audit...');
  
  try {
    const reportPath = await seoAutomation.generateSEOReport();
    console.log(`✅ SEO audit completed! Report saved to: ${reportPath}`);
    
    await seoAutomation.monitorSEOPerformance();
    console.log('📊 SEO performance monitoring updated');
  } catch (error) {
    console.error('❌ SEO audit failed:', error);
    process.exit(1);
  }
}

export async function generateSitemap(): Promise<void> {
  console.log('🗺️  Generating sitemap...');
  
  try {
    const sitemap = await seoAutomation.generateSitemap();
    console.log(`✅ Sitemap generated with ${sitemap.length} URLs`);
  } catch (error) {
    console.error('❌ Sitemap generation failed:', error);
    process.exit(1);
  }
}
