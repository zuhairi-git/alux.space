/**
 * Google Analytics 4 Integration
 * Advanced analytics tracking for alux.space
 */

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export interface PageViewEvent {
  page_title: string;
  page_location: string;
  language: string;
  content_group1?: string; // Section (portfolio, blog, etc.)
  content_group2?: string; // Category
  custom_map?: Record<string, any>;
}

export class Analytics {
  private static instance: Analytics;
  private gaId: string;
  private isInitialized: boolean = false;
  private debugMode: boolean = false;

  constructor() {
    this.gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-Q4W5CMHWD6';
    this.debugMode = process.env.NODE_ENV === 'development';
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  /**
   * Initialize Google Analytics
   */
  public init(): void {
    if (typeof window === 'undefined' || this.isInitialized) return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };    // Configure GA4
    window.gtag('js', new Date() as any);
    window.gtag('config', this.gaId, {
      page_title: document.title,
      page_location: window.location.href,
      debug_mode: this.debugMode,
      // Enhanced measurement
      enhanced_measurement_settings: {
        scrolls: true,
        outbound_clicks: true,
        site_search: true,
        file_downloads: true,
      },
      // Custom dimensions for better tracking
      custom_map: {
        custom_dimension_1: 'user_language',
        custom_dimension_2: 'theme_preference',
        custom_dimension_3: 'page_section',
        custom_dimension_4: 'portfolio_category',
        custom_dimension_5: 'blog_category',
      }
    });

    this.isInitialized = true;
    this.log('Analytics initialized successfully');
  }

  /**
   * Track page views with enhanced metadata
   */
  public trackPageView(event: PageViewEvent): void {
    if (!this.isInitialized) return;

    window.gtag('config', this.gaId, {
      page_title: event.page_title,
      page_location: event.page_location,
      content_group1: event.content_group1,
      content_group2: event.content_group2,
      language: event.language,
      custom_map: event.custom_map,
    });

    this.log('Page view tracked:', event);
  }

  /**
   * Track custom events
   */
  public trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized) return;

    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event.custom_parameters,
    });

    this.log('Event tracked:', event);
  }

  /**
   * SEO-specific tracking events
   */
  public trackSEOEvents = {
    /**
     * Track portfolio project views
     */
    portfolioView: (projectName: string, category: string, language: string) => {
      this.trackEvent({
        action: 'portfolio_view',
        category: 'Portfolio',
        label: projectName,
        custom_parameters: {
          portfolio_category: category,
          user_language: language,
          content_type: 'portfolio_project',
        }
      });
    },

    /**
     * Track blog post engagement
     */
    blogEngagement: (postTitle: string, action: 'view' | 'share' | 'read_complete', language: string) => {
      this.trackEvent({
        action: `blog_${action}`,
        category: 'Blog',
        label: postTitle,
        custom_parameters: {
          user_language: language,
          engagement_type: action,
          content_type: 'blog_post',
        }
      });
    },

    /**
     * Track contact form interactions
     */
    contactInteraction: (action: 'form_start' | 'form_submit' | 'email_click', source: string) => {
      this.trackEvent({
        action: `contact_${action}`,
        category: 'Contact',
        label: source,
        custom_parameters: {
          interaction_type: action,
          contact_source: source,
        }
      });
    },

    /**
     * Track navigation and user flow
     */
    navigation: (from: string, to: string, type: 'internal' | 'external') => {
      this.trackEvent({
        action: 'navigation',
        category: 'User Flow',
        label: `${from} -> ${to}`,
        custom_parameters: {
          navigation_type: type,
          source_page: from,
          destination_page: to,
        }
      });
    },

    /**
     * Track theme and language preferences
     */
    userPreference: (type: 'theme' | 'language', value: string) => {
      this.trackEvent({
        action: 'user_preference',
        category: 'User Experience',
        label: `${type}_${value}`,
        custom_parameters: {
          preference_type: type,
          preference_value: value,
        }
      });
    },

    /**
     * Track search queries (if search is implemented)
     */
    search: (query: string, results: number, language: string) => {
      this.trackEvent({
        action: 'search',
        category: 'Site Search',
        label: query,
        value: results,
        custom_parameters: {
          search_term: query,
          result_count: results,
          user_language: language,
        }
      });
    },

    /**
     * Track file downloads
     */
    download: (fileName: string, fileType: string, source: string) => {
      this.trackEvent({
        action: 'file_download',
        category: 'Downloads',
        label: fileName,
        custom_parameters: {
          file_type: fileType,
          download_source: source,
        }
      });
    },

    /**
     * Track social media shares
     */
    socialShare: (platform: string, content: string, url: string) => {
      this.trackEvent({
        action: 'social_share',
        category: 'Social Media',
        label: platform,
        custom_parameters: {
          share_platform: platform,
          shared_content: content,
          shared_url: url,
        }
      });
    },

    /**
     * Track performance metrics
     */
    performance: (metric: string, value: number, page: string) => {
      this.trackEvent({
        action: 'performance_metric',
        category: 'Core Web Vitals',
        label: metric,
        value: Math.round(value),
        custom_parameters: {
          metric_name: metric,
          page_path: page,
        }
      });
    },

    /**
     * Track accessibility interactions
     */
    accessibility: (action: 'keyboard_navigation' | 'screen_reader' | 'high_contrast', element: string) => {
      this.trackEvent({
        action: 'accessibility_interaction',
        category: 'Accessibility',
        label: `${action}_${element}`,
        custom_parameters: {
          accessibility_action: action,
          target_element: element,
        }
      });
    }
  };

  /**
   * Enhanced e-commerce tracking for service inquiries
   */
  public trackServiceInquiry(service: string, value: number, currency: string = 'EUR'): void {
    if (!this.isInitialized) return;

    window.gtag('event', 'generate_lead', {
      event_category: 'Service Inquiry',
      event_label: service,
      value: value,
      currency: currency,
      custom_parameters: {
        service_type: service,
        inquiry_value: value,
        lead_source: 'portfolio_website',
      }
    });

    this.log('Service inquiry tracked:', { service, value, currency });
  }

  /**
   * Track Core Web Vitals
   */
  public trackWebVitals(): void {
    if (typeof window === 'undefined' || !this.isInitialized) return;    // Track Core Web Vitals when available
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS((metric: any) => this.trackSEOEvents.performance('CLS', metric.value, window.location.pathname));
      onINP((metric: any) => this.trackSEOEvents.performance('INP', metric.value, window.location.pathname));
      onFCP((metric: any) => this.trackSEOEvents.performance('FCP', metric.value, window.location.pathname));
      onLCP((metric: any) => this.trackSEOEvents.performance('LCP', metric.value, window.location.pathname));
      onTTFB((metric: any) => this.trackSEOEvents.performance('TTFB', metric.value, window.location.pathname));
    });
  }

  /**
   * Consent management
   */
  public updateConsent(granted: boolean): void {
    if (!this.isInitialized) return;

    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied', // We don't use ads
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    this.log('Consent updated:', { granted });
  }

  /**
   * Debug logging
   */
  private log(message: string, data?: any): void {
    if (this.debugMode) {
      console.log(`[Analytics] ${message}`, data || '');
    }
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// Export convenience functions
export const initAnalytics = () => analytics.init();
export const trackEvent = (event: AnalyticsEvent) => analytics.trackEvent(event);
export const trackPageView = (event: PageViewEvent) => analytics.trackPageView(event);

// React hook for easy integration
export function useAnalytics() {
  return {
    init: () => analytics.init(),
    trackPageView: (event: PageViewEvent) => analytics.trackPageView(event),
    trackEvent: (event: AnalyticsEvent) => analytics.trackEvent(event),
    trackSEO: analytics.trackSEOEvents,
    trackWebVitals: () => analytics.trackWebVitals(),
    updateConsent: (granted: boolean) => analytics.updateConsent(granted),
  };
}
