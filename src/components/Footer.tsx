'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import { i18n } from '@/i18n';
import RTLText from '@/components/ui/RTLText';

const Footer = () => {
  const { locale, isRTL } = useLanguage();
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
    { href: '/portfolio/collaboration', textKey: 'portfolio.cases.collaboration' },
    { href: '/portfolio/jobseeking', textKey: 'portfolio.cases.jobseeking' }
  ];

  return (
    <footer className="bg-theme border-t border-gray-200/10 pt-12 pb-4">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>          {/* Brand & About Section */}
          <div>
            <h3 className="font-bold text-2xl mb-4 text-primary">Ali Al-Zuhairi</h3>
            <p className="text-sm opacity-80 mb-4 rtl:text-right">
              <RTLText>{t('home.about.quote')}</RTLText>
            </p>
            
            {/* Social Links */}
            <div className={`flex ${isRTL ? 'justify-end space-x-reverse' : 'justify-start'} space-x-4 mt-4`}>
              <motion.a 
                href="https://twitter.com/alialzuhairi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover transition-colors"
                whileHover={{ scale: 1.1 }}
                aria-label="Twitter"
              >
                <span className="material-symbols material-symbols-rounded text-xl">flutter_dash</span>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/alialzuhairi/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover transition-colors"
                whileHover={{ scale: 1.1 }}
                aria-label="LinkedIn"
              >
                <span className="material-symbols material-symbols-rounded text-xl">group</span>
              </motion.a>
              <motion.a 
                href="https://github.com/alialzuhairi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover transition-colors"
                whileHover={{ scale: 1.1 }}
                aria-label="GitHub"
              >
                <span className="material-symbols material-symbols-rounded text-xl">code</span>
              </motion.a>
            </div>
          </div>
            {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4"><RTLText>{t('footer.quickLinks')}</RTLText></h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={localizedHref(link.href)} 
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    <RTLText>{t(link.textKey)}</RTLText>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Additional Information Section */}
            <div className="mt-8">
              <h4 className="font-semibold mb-4"><RTLText>{t('footer.additionalInfo.title')}</RTLText></h4>
              <p className="text-sm opacity-80 rtl:text-right">
                <RTLText>{t('footer.additionalInfo.content')}</RTLText>
              </p>
            </div>
          </div>
            {/* Portfolio section */}
          <div>
            <h4 className="font-semibold mb-4"><RTLText>{t('footer.portfolio')}</RTLText></h4>
            <ul className="space-y-2">
              {portfolioLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={localizedHref(link.href)} 
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    <RTLText>{t(link.textKey)}</RTLText>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Contact info */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4"><RTLText>{t('footer.contact')}</RTLText></h4>
              <a 
                href="mailto:info@cvlanes.com" 
                className={`text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <span className="material-symbols material-symbols-rounded text-base">mail</span>
                <RTLText>info@cvlanes.com</RTLText>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="pt-6 border-t border-gray-200/10 text-center">
          <p className="text-sm opacity-60">
            <RTLText>&copy; {currentYear} Ali Al-Zuhairi. {t('footer.copyright')}</RTLText>
          </p>
          
          {/* City and profession */}
          <div className="mt-3 text-xs opacity-50 flex flex-wrap justify-center gap-4">
            <span><RTLText>Helsinki, Finland</RTLText></span>
            <span><RTLText>{locale === 'ar' ? 'مالك المنتج وقائد التصميم' : 'Product Owner & Design Leader'}</RTLText></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;