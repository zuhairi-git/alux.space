'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/hooks/useTranslations';
import { i18n } from '@/i18n';

const Footer = () => {
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  
  const currentYear = new Date().getFullYear();
  
  // Helper function to add locale to paths
  const localizedHref = (path: string) => {
    // Check if the path already contains the locale
    if (path.startsWith('/') && i18n.locales.some(loc => path.startsWith(`/${loc}/`))) {
      return path; // Path already has locale, don't add it again
    }
    return `/${locale}${path}`;
  };
  
  // Quick links for footer navigation
  const quickLinks = [
    { href: '/', textKey: 'nav.home' },
    { href: '/portfolio', textKey: 'nav.portfolio' },
    { href: '/blog', textKey: 'nav.blog' },
    { href: '/prompt', textKey: 'nav.prompts' }
  ];
    // Portfolio section links
  const portfolioLinks = [
    { href: '/portfolio/accessibility', textKey: 'portfolio.cases.accessibility' },
    { href: '/portfolio/collaboration', textKey: 'portfolio.cases.collaboration' },
    { href: '/portfolio/jobseeking', textKey: 'portfolio.cases.jobseeking' }
  ];
  // Debug translations if needed - enable this temporarily to troubleshoot
  const debugTranslations = false; // Set to false once translations are working
  
  // Use useEffect to avoid console spam during renders
  React.useEffect(() => {
    if (debugTranslations) {
      console.group(`Footer Translations (${locale})`);
      console.log(`Quick Links: "${t('footer.quickLinks')}"`);
      console.log(`Portfolio: "${t('footer.portfolio')}"`);
      console.log(`Contact: "${t('footer.contact')}"`);
      console.log(`Copyright: "${t('footer.copyright')}"`);
      console.log(`Additional Info Title: "${t('footer.additionalInfo.title')}"`);
      console.log(`Additional Info Content: "${t('footer.additionalInfo.content')}"`);
      console.groupEnd();
    }
  }, [locale, t, debugTranslations]);  return (
    <footer 
      id="footer" 
      className="bg-theme border-t border-gray-200/10 pt-12 pb-4"
      role="contentinfo"
      aria-label={t('footer.aria.siteFooter')}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* Brand & About Section */}
          <div>
            <h3 className="font-bold text-2xl mb-4 text-primary">Ali Al-Zuhairi</h3>
            <p className="text-sm opacity-80 mb-4">
              {t('home.about.quote')}
            </p>
            {/* Social Links */}
            <nav 
              role="navigation" 
              aria-label={t('footer.aria.socialMedia')}
              className="mt-4"
            >              <div className="flex space-x-4">
                <motion.a 
                  href="https://www.linkedin.com/in/ali-zuhairi/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm p-1"
                  whileHover={{ scale: 1.1 }}
                  aria-label={`${t('footer.aria.socialPlatform')} LinkedIn`}
                >
                  <span className="material-symbols material-symbols-rounded text-xl" aria-hidden="true">work</span>
                </motion.a>
                <motion.a 
                  href="https://github.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm p-1"
                  whileHover={{ scale: 1.1 }}
                  aria-label={`${t('footer.aria.socialPlatform')} GitHub`}
                >
                  <span className="material-symbols material-symbols-rounded text-xl" aria-hidden="true">code</span>
                </motion.a>
              </div>
            </nav>
          </div>
          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <nav role="navigation" aria-label={t('footer.aria.quickLinks')}>
              <ul className="space-y-2" role="list">
                {quickLinks.map((link) => (
                  <li key={link.href} role="listitem">
                    <Link 
                      href={localizedHref(link.href)} 
                      className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm py-1"
                    >
                      {t(link.textKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Additional Information Section */}
            <section className="mt-8" aria-labelledby="additional-info-heading">
              <h4 id="additional-info-heading" className="font-semibold mb-4">{t('footer.additionalInfo.title')}</h4>
              <div className="text-sm opacity-80">
                {t('footer.additionalInfo.content')}
              </div>
            </section>
          </div>
          {/* Portfolio section */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.portfolio')}</h4>
            <nav role="navigation" aria-label={t('footer.aria.portfolioLinks')}>
              <ul className="space-y-2" role="list">
                {portfolioLinks.map((link) => (
                  <li key={link.href} role="listitem">
                    <Link 
                      href={localizedHref(link.href)} 
                      className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm py-1"
                    >
                      {t(link.textKey)}
                    </Link>
                  </li>
                ))}
              </ul>            </nav>
          </div>
        </div>
        {/* Bottom section with copyright */}
        <div className="pt-6 border-t border-gray-200/10">
          <div className="text-sm opacity-60">
            &copy; {currentYear} Ali Al-Zuhairi. {t('footer.copyright')}
          </div>
          {/* City and profession */}
          <div className="mt-3 text-xs opacity-50 flex flex-wrap gap-4">
            <span>{t('footer.location')}</span>
            <span>{t('footer.profession')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
