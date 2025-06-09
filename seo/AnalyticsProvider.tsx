/**
 * Google Analytics Provider Component
 * Handles analytics initialization and tracking across the application
 */

'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { analytics, useAnalytics, PageViewEvent } from './analytics';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface AnalyticsContextType {
  trackPageView: (event: Partial<PageViewEvent>) => void;
  trackEvent: (action: string, category: string, label?: string, value?: number) => void;
  trackPortfolioView: (projectName: string, category: string) => void;
  trackBlogEngagement: (postTitle: string, action: 'view' | 'share' | 'read_complete') => void;
  trackContactInteraction: (action: 'form_start' | 'form_submit' | 'email_click', source: string) => void;
  trackNavigation: (to: string, type?: 'internal' | 'external') => void;
  trackUserPreference: (type: 'theme' | 'language', value: string) => void;
  trackSocialShare: (platform: string, content: string, url: string) => void;
  trackDownload: (fileName: string, fileType: string, source: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { 
    init, 
    trackPageView: baseTrackPageView, 
    trackEvent: baseTrackEvent, 
    trackSEO,
    trackWebVitals 
  } = useAnalytics();

  // Initialize analytics on mount
  useEffect(() => {
    init();
    trackWebVitals();
  }, [init, trackWebVitals]);

  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      const pageTitle = document.title;
      const pageLocation = window.location.href;
      
      // Determine page section and category
      let contentGroup1 = 'homepage';
      let contentGroup2 = 'general';
      
      if (pathname.includes('/portfolio')) {
        contentGroup1 = 'portfolio';
        contentGroup2 = pathname.includes('/jobseeking') ? 'jobseeking' : 
                       pathname.includes('/accessibility') ? 'accessibility' :
                       pathname.includes('/designsystem') ? 'designsystem' : 'overview';
      } else if (pathname.includes('/blog')) {
        contentGroup1 = 'blog';
        contentGroup2 = pathname.split('/').length > 3 ? 'blog_post' : 'blog_index';
      } else if (pathname.includes('/prompt')) {
        contentGroup1 = 'prompt';
        contentGroup2 = 'development';
      }

      baseTrackPageView({
        page_title: pageTitle,
        page_location: pageLocation,
        language: locale,
        content_group1: contentGroup1,
        content_group2: contentGroup2,
        custom_map: {
          custom_dimension_1: locale,
          custom_dimension_2: theme,
          custom_dimension_3: contentGroup1,
          custom_dimension_4: contentGroup2,
        }
      });
    }
  }, [pathname, locale, theme, baseTrackPageView]);

  // Context methods
  const contextValue: AnalyticsContextType = {
    trackPageView: (event: Partial<PageViewEvent>) => {
      baseTrackPageView({
        page_title: document.title,
        page_location: window.location.href,
        language: locale,
        ...event
      });
    },

    trackEvent: (action: string, category: string, label?: string, value?: number) => {
      baseTrackEvent({
        action,
        category,
        label,
        value,
        custom_parameters: {
          user_language: locale,
          theme_preference: theme,
        }
      });
    },

    trackPortfolioView: (projectName: string, category: string) => {
      trackSEO.portfolioView(projectName, category, locale);
    },

    trackBlogEngagement: (postTitle: string, action: 'view' | 'share' | 'read_complete') => {
      trackSEO.blogEngagement(postTitle, action, locale);
    },

    trackContactInteraction: (action: 'form_start' | 'form_submit' | 'email_click', source: string) => {
      trackSEO.contactInteraction(action, source);
    },

    trackNavigation: (to: string, type: 'internal' | 'external' = 'internal') => {
      const from = pathname;
      trackSEO.navigation(from, to, type);
    },

    trackUserPreference: (type: 'theme' | 'language', value: string) => {
      trackSEO.userPreference(type, value);
    },

    trackSocialShare: (platform: string, content: string, url: string) => {
      trackSEO.socialShare(platform, content, url);
    },

    trackDownload: (fileName: string, fileType: string, source: string) => {
      trackSEO.download(fileName, fileType, source);
    },
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsTracking(): AnalyticsContextType {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsTracking must be used within an AnalyticsProvider');
  }
  return context;
}

// HOC for automatic component tracking
export function withAnalytics<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
  category: string = 'Component'
) {
  return function AnalyticsWrappedComponent(props: P) {
    const { trackEvent } = useAnalyticsTracking();

    useEffect(() => {
      trackEvent('component_view', category, componentName);
    }, [trackEvent]);

    return <Component {...props} />;
  };
}

// Consent banner component
export function ConsentBanner() {
  const [showBanner, setShowBanner] = React.useState(false);
  const [consentGiven, setConsentGiven] = React.useState<boolean | null>(null);

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('analytics-consent');
    if (consent === null) {
      setShowBanner(true);
    } else {
      setConsentGiven(consent === 'true');
      // Update analytics consent
      analytics.updateConsent(consent === 'true');
    }
  }, []);

  const handleConsent = (granted: boolean) => {
    setConsentGiven(granted);
    setShowBanner(false);
    localStorage.setItem('analytics-consent', granted.toString());
    analytics.updateConsent(granted);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p>
            This website uses analytics to improve user experience. 
            Your data is processed according to our privacy policy.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleConsent(false)}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
