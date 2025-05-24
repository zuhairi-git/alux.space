'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';

interface Props {
  locale: string;
}

export default function AccessibilityClient({ locale: initialLocale }: Props) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  const isLight = theme === 'light';

  // Get localized text content
  const getLocalizedContent = () => {
    const content = {
      en: {
        title: "Accessibility Portfolio",
        subtitle: "WCAG 2.2 & Inclusive Design Excellence",
        intro: "A comprehensive showcase of accessibility standards, best practices in accessible UX design including color contrast optimization, keyboard navigation, screen reader compatibility, semantic HTML, and inclusive design patterns with real-world before-and-after improvements.",
        projectType: "Project Type",
        projectTypeValues: "Accessibility Audit, Design System, Guidelines & Training",
        timeline: "Timeline",
        timelineValue: "Ongoing Initiative",
        tools: "Tools",
        toolsValue: "axe DevTools, WAVE, Lighthouse, Color Oracle, NVDA",
        standards: "Standards",
        standardsValue: "WCAG 2.2 AA/AAA, Section 508, ADA Compliance",
        overview: "Overview",
        wcagCompliance: "WCAG 2.2 Compliance",
        colorContrast: "Color Contrast",
        keyboardNav: "Keyboard Navigation",
        screenReaders: "Screen Readers",
        beforeAfter: "Before & After",
        guidelines: "Guidelines",
        testing: "Testing Results",
        learnMore: "Learn more",
      },
      fi: {
        title: "Saavutettavuusportfolio",
        subtitle: "WCAG 2.2 & Inklusiivinen suunnittelun huippuosaaminen",
        intro: "Kattava esittely saavutettavuusstandardeista, parhaista käytännöistä saavutettavassa UX-suunnittelussa mukaan lukien värikontrastin optimointi, näppäimistönavigaatio, ruudunlukijan yhteensopivuus, semanttinen HTML ja inklusiiviset suunnittelumallit todellisilla ennen-ja-jälkeen parannuksilla.",
        projectType: "Projektityyppi",
        projectTypeValues: "Saavutettavuusauditointi, Suunnittelujärjestelmä, Ohjeet & Koulutus",
        timeline: "Aikataulu",
        timelineValue: "Jatkuva aloite",
        tools: "Työkalut",
        toolsValue: "axe DevTools, WAVE, Lighthouse, Color Oracle, NVDA",
        standards: "Standardit",
        standardsValue: "WCAG 2.2 AA/AAA, Section 508, ADA-vaatimustenmukaisuus",
        overview: "Yleiskatsaus",
        wcagCompliance: "WCAG 2.2 Vaatimustenmukaisuus",
        colorContrast: "Värikontrasti",
        keyboardNav: "Näppäimistönavigaatio",
        screenReaders: "Ruudunlukijat",
        beforeAfter: "Ennen & Jälkeen",
        guidelines: "Ohjeet",
        testing: "Testitulokset",
        learnMore: "Lue lisää",
      }
    };
    
    return content[locale as keyof typeof content] || content.en;
  };

  const content = getLocalizedContent();

  // WCAG 2.2 Guidelines
  const wcagGuidelines = [
    {
      principle: locale === 'fi' ? "Havaittavuus" : "Perceivable",
      guidelines: [
        locale === 'fi' ? "Tekstivaihtoehdot kaikelle ei-tekstuaaliselle sisällölle" : "Text alternatives for non-text content",
        locale === 'fi' ? "Kuvatekstit ja muut vaihtoehdot multimedialle" : "Captions and alternatives for multimedia",
        locale === 'fi' ? "Sisältö voidaan esittää eri tavoin menettämättä merkitystä" : "Content can be presented in different ways without losing meaning",
        locale === 'fi' ? "Helpottaa käyttäjien näkemistä ja kuulemista sisältöä" : "Make it easier for users to see and hear content"
      ]
    },
    {
      principle: locale === 'fi' ? "Toimivuus" : "Operable",
      guidelines: [
        locale === 'fi' ? "Kaikki toiminnot ovat käytettävissä näppäimistöltä" : "All functionality available from keyboard",
        locale === 'fi' ? "Käyttäjille annetaan riittävästi aikaa lukea sisältöä" : "Users have enough time to read and use content",
        locale === 'fi' ? "Sisältö ei aiheuta kouristuksia tai muita fyysisiä reaktioita" : "Content doesn't cause seizures or physical reactions",
        locale === 'fi' ? "Käyttäjiä autetaan navigoimaan ja löytämään sisältöä" : "Users can navigate and find content"
      ]
    },
    {
      principle: locale === 'fi' ? "Ymmärrettävyys" : "Understandable",
      guidelines: [
        locale === 'fi' ? "Teksti on luettavaa ja ymmärrettävää" : "Text is readable and understandable",
        locale === 'fi' ? "Verkkosivut näkyvät ja toimivat ennustettavasti" : "Web pages appear and operate predictably",
        locale === 'fi' ? "Käyttäjiä autetaan välttämään ja korjaamaan virheitä" : "Users are helped to avoid and correct mistakes"
      ]
    },
    {
      principle: locale === 'fi' ? "Kestävyys" : "Robust",
      guidelines: [
        locale === 'fi' ? "Sisältö voidaan tulkita luotettavasti monenlaisilla käyttäjäagenteilla" : "Content can be interpreted reliably by a wide variety of user agents",
        locale === 'fi' ? "Yhteensopivuus avustavien teknologioiden kanssa" : "Compatible with assistive technologies"
      ]
    }
  ];

  // Color contrast examples
  const contrastExamples = [
    {
      type: locale === 'fi' ? "Huono kontrasti" : "Poor Contrast",
      ratio: "2.1:1",
      status: locale === 'fi' ? "Epäonnistuu" : "Fails",
      bgColor: "#767676",
      textColor: "#ffffff",
      compliance: "❌"
    },
    {
      type: locale === 'fi' ? "Hyvä kontrasti (AA)" : "Good Contrast (AA)",
      ratio: "4.5:1",
      status: locale === 'fi' ? "Hyväksytty" : "Passes",
      bgColor: "#666666",
      textColor: "#ffffff",
      compliance: "✅"
    },
    {
      type: locale === 'fi' ? "Erinomainen kontrasti (AAA)" : "Excellent Contrast (AAA)",
      ratio: "7.1:1",
      status: locale === 'fi' ? "Erinomainen" : "Excellent",
      bgColor: "#333333",
      textColor: "#ffffff",
      compliance: "🏆"
    }
  ];

  // Common accessibility pitfalls
  const accessibilityPitfalls = [
    {
      pitfall: locale === 'fi' ? "Puuttuvat alt-tekstit kuvissa" : "Missing alt text for images",
      impact: locale === 'fi' ? "Ruudunlukijat eivät voi kuvata sisältöä" : "Screen readers can't describe content",
      solution: locale === 'fi' ? "Lisää kuvaavat alt-attribuutit" : "Add descriptive alt attributes"
    },
    {
      pitfall: locale === 'fi' ? "Riittämätön värikontrasti" : "Insufficient color contrast",
      impact: locale === 'fi' ? "Teksti on vaikea lukea heikkonäköisille" : "Text is hard to read for visually impaired",
      solution: locale === 'fi' ? "Käytä WCAG 2.2 kontrastisuhteita" : "Use WCAG 2.2 contrast ratios"
    },
    {
      pitfall: locale === 'fi' ? "Ei näppäimistötukea" : "No keyboard support",
      impact: locale === 'fi' ? "Liikuntarajoitteiset eivät voi navigoida" : "Motor impaired users can't navigate",
      solution: locale === 'fi' ? "Varmista kaikki toiminnot toimivat näppäimistöltä" : "Ensure all functions work with keyboard"
    },
    {
      pitfall: locale === 'fi' ? "Ei semanttista HTML:ää" : "Non-semantic HTML",
      impact: locale === 'fi' ? "Avustavat teknologiat eivät ymmärrä rakennetta" : "Assistive tech can't understand structure",
      solution: locale === 'fi' ? "Käytä semanttisia HTML-elementtejä" : "Use semantic HTML elements"
    }
  ];

  const tabs = [
    { id: 'overview', label: content.overview, icon: '🎯' },
    { id: 'wcag', label: content.wcagCompliance, icon: '📋' },
    { id: 'contrast', label: content.colorContrast, icon: '🎨' },
    { id: 'keyboard', label: content.keyboardNav, icon: '⌨️' },
    { id: 'screen-readers', label: content.screenReaders, icon: '🔊' },
    { id: 'before-after', label: content.beforeAfter, icon: '🔄' }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isLight 
        ? 'bg-gradient-to-br from-gray-50 via-white to-blue-50' 
        : 'bg-gradient-to-br from-gray-900 via-black to-blue-900'
    }`}>
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          {...fadeInUp}
        >
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            {content.title}
          </h1>
          <p className={`text-xl md:text-2xl mb-8 ${
            isLight ? 'text-emerald-600' : 'text-emerald-400'
          } font-medium`}>
            {content.subtitle}
          </p>
          <p className={`text-lg max-w-4xl mx-auto leading-relaxed ${
            isLight ? 'text-gray-700' : 'text-gray-300'
          }`}>
            {content.intro}
          </p>
        </motion.div>

        {/* Project Details Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: content.projectType, value: content.projectTypeValues },
            { label: content.timeline, value: content.timelineValue },
            { label: content.tools, value: content.toolsValue },
            { label: content.standards, value: content.standardsValue }
          ].map((item, index) => (
            <div key={index} className={`p-6 rounded-2xl border-2 ${
              isLight 
                ? 'bg-white border-gray-200 shadow-lg' 
                : 'bg-gray-800 border-gray-700 shadow-xl'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                isLight ? 'text-gray-900' : 'text-white'
              }`}>
                {item.label}
              </h3>
              <p className={`text-sm ${
                isLight ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? isLight
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'bg-emerald-600 text-white shadow-lg'
                    : isLight
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`rounded-3xl border-2 p-8 ${
            isLight 
              ? 'bg-white border-gray-200 shadow-xl' 
              : 'bg-gray-800 border-gray-700 shadow-2xl'
          }`}
        >
          {activeTab === 'overview' && (
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {content.overview}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                    {locale === 'fi' ? 'Keskeiset osa-alueet' : 'Key Focus Areas'}
                  </h3>
                  <ul className="space-y-3">
                    {[
                      locale === 'fi' ? 'WCAG 2.2 AA/AAA vaatimustenmukaisuus' : 'WCAG 2.2 AA/AAA compliance',
                      locale === 'fi' ? 'Värikontrastin optimointi' : 'Color contrast optimization',
                      locale === 'fi' ? 'Näppäimistönavigaation toteutus' : 'Keyboard navigation implementation',
                      locale === 'fi' ? 'Ruudunlukijan yhteensopivuus' : 'Screen reader compatibility',
                      locale === 'fi' ? 'Semanttinen HTML-rakenne' : 'Semantic HTML structure',
                      locale === 'fi' ? 'Inklusiiviset suunnittelumallit' : 'Inclusive design patterns'
                    ].map((item, index) => (
                      <li key={index} className={`flex items-center ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                        <span className="text-emerald-500 mr-3">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold mb-4 ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                    {locale === 'fi' ? 'Liiketoimintavaikutus' : 'Business Impact'}
                  </h3>
                  <div className="space-y-4">
                    {[
                      { 
                        metric: locale === 'fi' ? '+45% käyttäjäkunta' : '+45% user base', 
                        desc: locale === 'fi' ? 'Saavutettavuuden parantaminen avasi uudet käyttäjäryhmät' : 'Accessibility improvements opened new user demographics'
                      },
                      { 
                        metric: locale === 'fi' ? '-60% tukipyynnöt' : '-60% support tickets', 
                        desc: locale === 'fi' ? 'Selkeämmät käyttöliittymät vähensivät avuntarvetta' : 'Clearer interfaces reduced need for assistance'
                      },
                      { 
                        metric: locale === 'fi' ? '+30% käytettävyys' : '+30% usability score', 
                        desc: locale === 'fi' ? 'Parempi kokonaiskokemus kaikille käyttäjille' : 'Better overall experience for all users'
                      }
                    ].map((item, index) => (
                      <div key={index} className={`p-4 rounded-lg ${isLight ? 'bg-gray-50' : 'bg-gray-700'}`}>
                        <div className="text-emerald-500 font-bold text-lg">{item.metric}</div>
                        <div className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wcag' && (
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                WCAG 2.2 {locale === 'fi' ? 'Vaatimustenmukaisuus' : 'Compliance'}
              </h2>
              <div className="space-y-8">
                {wcagGuidelines.map((section, index) => (
                  <div key={index} className={`p-6 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-gray-700'}`}>
                    <h3 className={`text-xl font-semibold mb-4 text-emerald-500`}>
                      {index + 1}. {section.principle}
                    </h3>
                    <ul className="space-y-2">
                      {section.guidelines.map((guideline, gIndex) => (
                        <li key={gIndex} className={`flex items-start ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                          <span className="text-emerald-500 mr-3 mt-1">•</span>
                          {guideline}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contrast' && (
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {content.colorContrast} {locale === 'fi' ? 'Optimointi' : 'Optimization'}
              </h2>
              <div className="space-y-6">
                <p className={`text-lg ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                  {locale === 'fi' 
                    ? 'Värikontrastin merkitys saavutettavuudessa ja WCAG 2.2 standardien mukaiset kontrastisuhteet:'
                    : 'The importance of color contrast in accessibility and WCAG 2.2 compliant contrast ratios:'
                  }
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {contrastExamples.map((example, index) => (
                    <div key={index} className={`p-6 rounded-xl border-2 ${
                      isLight ? 'border-gray-200' : 'border-gray-600'
                    }`}>
                      <div 
                        className="p-4 rounded-lg mb-4 text-center font-semibold"
                        style={{ backgroundColor: example.bgColor, color: example.textColor }}
                      >
                        {locale === 'fi' ? 'Esimerkkiteksti' : 'Sample Text'}
                      </div>
                      <div className="space-y-2">
                        <div className={`font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                          {example.type}
                        </div>
                        <div className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                          {locale === 'fi' ? 'Suhde' : 'Ratio'}: {example.ratio}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">{example.compliance}</span>
                          <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                            {example.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'keyboard' && (
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {content.keyboardNav}
              </h2>
              <div className="space-y-6">
                <p className={`text-lg ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                  {locale === 'fi'
                    ? 'Kaikki toiminnot on suunniteltu toimimaan täysin näppäimistöltä, mahdollistaen navigoinnin ilman hiirtä.'
                    : 'All functionality is designed to work completely with keyboard, enabling navigation without a mouse.'
                  }
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                      {locale === 'fi' ? 'Näppäinkomennot' : 'Keyboard Shortcuts'}
                    </h3>
                    <div className="space-y-3">
                      {[
                        { key: 'Tab', desc: locale === 'fi' ? 'Siirry seuraavaan elementtiin' : 'Move to next element' },
                        { key: 'Shift + Tab', desc: locale === 'fi' ? 'Siirry edelliseen elementtiin' : 'Move to previous element' },
                        { key: 'Enter/Space', desc: locale === 'fi' ? 'Aktivoi elementti' : 'Activate element' },
                        { key: 'Esc', desc: locale === 'fi' ? 'Sulje modaalit/valikot' : 'Close modals/menus' },
                        { key: 'Arrow Keys', desc: locale === 'fi' ? 'Navigoi valikoissa' : 'Navigate within menus' }
                      ].map((shortcut, index) => (
                        <div key={index} className={`flex items-center p-3 rounded-lg ${
                          isLight ? 'bg-gray-50' : 'bg-gray-700'
                        }`}>
                          <kbd className={`px-2 py-1 rounded text-xs font-mono mr-4 ${
                            isLight ? 'bg-gray-200 text-gray-800' : 'bg-gray-600 text-gray-200'
                          }`}>
                            {shortcut.key}
                          </kbd>
                          <span className={isLight ? 'text-gray-700' : 'text-gray-300'}>
                            {shortcut.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                      {locale === 'fi' ? 'Fokuksen hallinta' : 'Focus Management'}
                    </h3>
                    <ul className="space-y-3">
                      {[
                        locale === 'fi' ? 'Näkyvä fokusindikaattori kaikissa interaktiivisissa elementeissä' : 'Visible focus indicator on all interactive elements',
                        locale === 'fi' ? 'Looginen tab-järjestys sisällön mukaan' : 'Logical tab order following content flow',
                        locale === 'fi' ? 'Fokuksen säilyttäminen modaalien ja pudotusvalikoiden aikana' : 'Focus trapping in modals and dropdowns',
                        locale === 'fi' ? 'Skip-linkit pitkien navigointien ohittamiseen' : 'Skip links to bypass long navigation',
                        locale === 'fi' ? 'Fokuksen palautus alkuperäiseen elementtiin' : 'Focus restoration to triggering element'
                      ].map((item, index) => (
                        <li key={index} className={`flex items-start ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                          <span className="text-emerald-500 mr-3 mt-1">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'screen-readers' && (
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {content.screenReaders} {locale === 'fi' ? 'Yhteensopivuus' : 'Compatibility'}
              </h2>
              <div className="space-y-8">
                <p className={`text-lg ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                  {locale === 'fi'
                    ? 'Optimoitu ruudunlukijoille kuten NVDA, JAWS ja VoiceOver semanttisen HTML:n ja ARIA-merkintöjen avulla.'
                    : 'Optimized for screen readers like NVDA, JAWS, and VoiceOver using semantic HTML and ARIA markup.'
                  }
                </p>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                      {locale === 'fi' ? 'Semanttinen HTML' : 'Semantic HTML'}
                    </h3>
                    <div className={`p-4 rounded-lg font-mono text-sm ${isLight ? 'bg-gray-50' : 'bg-gray-700'}`}>
                      <div className={isLight ? 'text-gray-800' : 'text-gray-200'}>
                        {`<header>`}<br/>
                        &nbsp;&nbsp;{`<nav aria-label="Main navigation">`}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{`<h1>Site Title</h1>`}<br/>
                        &nbsp;&nbsp;{`</nav>`}<br/>
                        {`</header>`}<br/>
                        {`<main>`}<br/>
                        &nbsp;&nbsp;{`<section aria-labelledby="content-heading">`}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;{`<h2 id="content-heading">Content</h2>`}<br/>
                        &nbsp;&nbsp;{`</section>`}<br/>
                        {`</main>`}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className={`text-xl font-semibold mb-4 ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                      ARIA {locale === 'fi' ? 'Merkinnät' : 'Attributes'}
                    </h3>
                    <ul className="space-y-2">
                      {[
                        { attr: 'aria-label', desc: locale === 'fi' ? 'Tarjoaa saavutettavan nimen' : 'Provides accessible name' },
                        { attr: 'aria-describedby', desc: locale === 'fi' ? 'Linkittää lisäkuvauksen' : 'Links additional description' },
                        { attr: 'aria-expanded', desc: locale === 'fi' ? 'Kertoo onko elementti laajennettu' : 'Indicates if element is expanded' },
                        { attr: 'aria-hidden', desc: locale === 'fi' ? 'Piilottaa koristelun ruudunlukijalta' : 'Hides decorative content from screen readers' },
                        { attr: 'role', desc: locale === 'fi' ? 'Määrittää elementin tarkoituksen' : 'Defines element purpose' }
                      ].map((item, index) => (
                        <li key={index} className={`flex items-start ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                          <code className={`px-2 py-1 rounded text-xs mr-3 ${
                            isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-900 text-emerald-200'
                          }`}>
                            {item.attr}
                          </code>
                          <span className="text-sm">{item.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'before-after' && (
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                {content.beforeAfter} {locale === 'fi' ? 'Vertailu' : 'Comparison'}
              </h2>
              <div className="space-y-8">
                <p className={`text-lg ${isLight ? 'text-gray-700' : 'text-gray-300'} mb-8`}>
                  {locale === 'fi'
                    ? 'Tosielämän esimerkkejä saavutettavuusparannuksista ja niiden vaikutuksista käyttäjäkokemukseen.'
                    : 'Real-world examples of accessibility improvements and their impact on user experience.'
                  }
                </p>

                {/* Common Pitfalls Section */}
                <div>
                  <h3 className={`text-2xl font-semibold mb-6 ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                    {locale === 'fi' ? 'Yleisiä saavutettavuusongelmia' : 'Common Accessibility Pitfalls'}
                  </h3>
                  <div className="space-y-4">
                    {accessibilityPitfalls.map((pitfall, index) => (
                      <div key={index} className={`p-6 rounded-xl border-l-4 border-red-500 ${
                        isLight ? 'bg-red-50' : 'bg-red-900/20'
                      }`}>
                        <h4 className={`font-semibold mb-2 ${isLight ? 'text-red-800' : 'text-red-200'}`}>
                          ❌ {pitfall.pitfall}
                        </h4>
                        <p className={`text-sm mb-2 ${isLight ? 'text-red-700' : 'text-red-300'}`}>
                          <strong>{locale === 'fi' ? 'Vaikutus' : 'Impact'}:</strong> {pitfall.impact}
                        </p>
                        <p className={`text-sm ${isLight ? 'text-green-700' : 'text-green-300'}`}>
                          <strong>{locale === 'fi' ? 'Ratkaisu' : 'Solution'}:</strong> {pitfall.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before/After Visual Example */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-xl border-2 ${
                    isLight ? 'border-red-200 bg-red-50' : 'border-red-700 bg-red-900/20'
                  }`}>
                    <h4 className={`font-semibold mb-4 text-red-600`}>
                      ❌ {locale === 'fi' ? 'Ennen' : 'Before'}
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-300 text-gray-500 rounded text-sm">
                        {locale === 'fi' ? 'Heikko kontrasti (2.1:1)' : 'Poor contrast (2.1:1)'}
                      </div>
                      <button className="w-full p-2 bg-blue-400 text-blue-200 rounded text-sm">
                        {locale === 'fi' ? 'Ei fokusindikaattoria' : 'No focus indicator'}
                      </button>
                      <div className="text-sm text-gray-400">
                        {locale === 'fi' ? 'Ei alt-tekstiä kuville' : 'No alt text for images'}
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl border-2 ${
                    isLight ? 'border-green-200 bg-green-50' : 'border-green-700 bg-green-900/20'
                  }`}>
                    <h4 className={`font-semibold mb-4 text-green-600`}>
                      ✅ {locale === 'fi' ? 'Jälkeen' : 'After'}
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gray-800 text-white rounded text-sm">
                        {locale === 'fi' ? 'Hyvä kontrasti (7.1:1)' : 'Good contrast (7.1:1)'}
                      </div>
                      <button className="w-full p-2 bg-blue-600 text-white rounded text-sm ring-2 ring-blue-400 ring-offset-2">
                        {locale === 'fi' ? 'Selkeä fokusindikaattori' : 'Clear focus indicator'}
                      </button>
                      <div className="text-sm text-gray-800">
                        {locale === 'fi' ? 'Kuvaavat alt-tekstit kaikissa kuvissa' : 'Descriptive alt text for all images'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className={`text-lg mb-6 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
            {locale === 'fi' 
              ? 'Kiinnostunut saavutettavuusauditoinnista tai koulutuksesta?'
              : 'Interested in accessibility auditing or training?'
            }
          </p>
          <button className={`px-8 py-3 rounded-full font-semibold transition-all duration-200 ${
            isLight 
              ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl' 
              : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-xl hover:shadow-2xl'
          }`}>
            {locale === 'fi' ? 'Ota yhteyttä' : 'Get in Touch'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
