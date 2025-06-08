'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      <div className="container mx-auto px-4">        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
          {/* Brand & About Section */}          <div>
            {/* Logo and Brand */}
            <div className="flex flex-col items-start mb-6">
              <motion.div 
                className="mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/images/logo/AluxLogoLabel.svg"
                  alt="Alux Logo"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain rounded-2xl filter drop-shadow-sm"
                  priority
                />
              </motion.div>
              <h3 className="font-bold text-xl text-primary">Ali Al-Zuhairi</h3>
            </div>
            <p className="text-sm opacity-80 mb-4">
              {t('home.about.quote')}
            </p>
            {/* Social Links */}
            <nav 
              role="navigation" 
              aria-label={t('footer.aria.socialMedia')}
              className="mt-4"
            >              <div className="flex space-x-4">                <motion.a 
                  href="https://www.linkedin.com/in/ali-zuhairi/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded-sm p-1"
                  whileHover={{ scale: 1.1 }}
                  aria-label={`${t('footer.aria.socialPlatform')} LinkedIn`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
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
        </div>        {/* Bottom section with copyright */}
        <div className="pt-6 border-t border-gray-200/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm opacity-60">
              &copy; {currentYear} Ali Al-Zuhairi. {t('footer.copyright')}
            </div>
            {/* City and profession */}
            <div className="text-xs opacity-50 flex flex-wrap gap-4">
              <span>{t('footer.location')}</span>
              <span>{t('footer.profession')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
