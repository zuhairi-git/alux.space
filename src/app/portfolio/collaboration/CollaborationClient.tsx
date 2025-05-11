'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';

interface Props {
  locale: string;
}

export default function CollaborationClient({ locale: initialLocale }: Props) {
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
        title: "Collaboration Workflow Platform",
        intro: "At the heart of the Collaboration Workflow Platform is a commitment to creativity, interconnectivity, and real-time teamwork. This platform is designed to simplify live collaboration, improve communication, and help teams deliver content more efficiently across devices, time zones, and locations.",
        projectType: "Project Type",
        projectTypeValues: "Landing Page, Web & Mobile Platform, Mobile Application",
        timeline: "Timeline",
        timelineValue: "18 Weeks",
        tools: "Tools",
        toolsValue: "Figma, FigJam, Maze",
        roles: "Roles",
        objectives: "Objectives",
        designProcess: "Design Process",
        researchInsights: "Research Insights",
        participantFeedback: "Participant Feedback",
        keyRecommendations: "Key Recommendations",
        userPersonas: "User Personas",
        productRequirements: "Product Requirements",
        userTesting: "User Testing",
        testScenario: "Test Scenario",
        testScenarioValue: "Configure a new device using the prototype",
        focusAreas: "Focus Areas",
        deliveryPhase: "Delivery Phase",
        completed: "Completed",
        learnMore: "Learn more",
      },
      fi: {
        title: "Yhteistyön työnkulkualusta",
        intro: "Yhteistyön työnkulkualustan ytimessä on sitoutuminen luovuuteen, yhteyskykyyn ja reaaliaikaiseen tiimityöhön. Tämä alusta on suunniteltu yksinkertaistamaan reaaliaikaista yhteistyötä, parantamaan viestintää ja auttamaan tiimejä toimittamaan sisältöä tehokkaammin eri laitteiden, aikavyöhykkeiden ja sijaintien välillä.",
        projectType: "Projektityyppi",
        projectTypeValues: "Laskeutumissivu, verkko- ja mobiilialusta, mobiilisovellus",
        timeline: "Aikataulu",
        timelineValue: "18 viikkoa",
        tools: "Työkalut",
        toolsValue: "Figma, FigJam, Maze",
        roles: "Roolit",
        objectives: "Tavoitteet",
        designProcess: "Suunnitteluprosessi",
        researchInsights: "Tutkimustulokset",
        participantFeedback: "Osallistujien palaute",
        keyRecommendations: "Tärkeimmät suositukset",
        userPersonas: "Käyttäjäpersoonat",
        productRequirements: "Tuotevaatimukset",
        userTesting: "Käyttäjätestaus",
        testScenario: "Testiskenaario",
        testScenarioValue: "Määritä uusi laite käyttäen prototyyppiä",
        focusAreas: "Keskittymisalueet",
        deliveryPhase: "Toimitusvaihe",
        completed: "Valmis",
        learnMore: "Lue lisää",
      },
      ar: {
        title: "منصة سير عمل التعاون",
        intro: "في قلب منصة سير عمل التعاون التزام بالإبداع والترابط والعمل الجماعي في الوقت الحقيقي. تم تصميم هذه المنصة لتبسيط التعاون المباشر، وتحسين التواصل، ومساعدة الفرق على توصيل المحتوى بشكل أكثر كفاءة عبر الأجهزة والمناطق الزمنية والمواقع.",
        projectType: "نوع المشروع",
        projectTypeValues: "صفحة هبوط، منصة ويب وجوال، تطبيق جوال",
        timeline: "الجدول الزمني",
        timelineValue: "18 أسبوعا",
        tools: "أدوات",
        toolsValue: "فيجما، فيججام، ميز",
        roles: "الأدوار",
        objectives: "الأهداف",
        designProcess: "عملية التصميم",
        researchInsights: "نتائج البحث",
        participantFeedback: "تعليقات المشاركين",
        keyRecommendations: "التوصيات الرئيسية",
        userPersonas: "شخصيات المستخدمين",
        productRequirements: "متطلبات المنتج",
        userTesting: "اختبار المستخدم",
        testScenario: "سيناريو الاختبار",
        testScenarioValue: "تكوين جهاز جديد باستخدام النموذج الأولي",
        focusAreas: "مجالات التركيز",
        deliveryPhase: "مرحلة التسليم",
        completed: "مكتمل",
        learnMore: "اقرأ المزيد",
      }
    };
    
    return content[locale as keyof typeof content] || content.en;
  };

  // Get localized objectives
  const getObjectives = () => {
    const objectives = {
      en: [
        "Clarify each step's purpose for better user understanding",
        "Communicate using business logic",
        "Offer UI customization",
        "Maintain consistent UI patterns",
        "Ensure mobile-first responsive design"
      ],
      fi: [
        "Selkeytä jokaisen vaiheen tarkoitus parempaa käyttäjäymmärrystä varten",
        "Kommunikoi käyttäen liiketoimintalogiikkaa",
        "Tarjoa käyttöliittymän mukauttamista",
        "Ylläpidä johdonmukaisia käyttöliittymäkuvioita",
        "Varmista mobiilipainotteinen responsiivinen suunnittelu"
      ],
      ar: [
        "توضيح الغرض من كل خطوة لفهم أفضل للمستخدم",
        "التواصل باستخدام منطق الأعمال",
        "تقديم تخصيص واجهة المستخدم",
        "الحفاظ على أنماط متسقة لواجهة المستخدم",
        "ضمان تصميم متجاوب يعطي الأولوية للجوال"
      ]
    };
    
    return objectives[locale as keyof typeof objectives] || objectives.en;
  };

  const content = getLocalizedContent();
  const objectives = getObjectives();

  const designProcessSteps = [
    { 
      phase: locale === 'fi' ? "Tutki" : locale === 'ar' ? "اكتشف" : "Discover",
      desc: locale === 'fi' ? "Tutki käyttäjien tarpeita ja kipupisteitä" : locale === 'ar' ? "بحث احتياجات ومشاكل المستخدم" : "Research user needs and pain points",
      icon: (
        <span className="material-symbols text-4xl">search</span>
      )
    },
    { 
      phase: locale === 'fi' ? "Määrittele" : locale === 'ar' ? "حدّد" : "Define",
      desc: locale === 'fi' ? "Analysoi oivalluksia haasteen rajaamiseksi" : locale === 'ar' ? "تحليل الرؤى لتحديد نطاق التحدي" : "Analyze insights to scope the challenge",
      icon: (
        <span className="material-symbols text-4xl">notes</span>
      )
    },
    { 
      phase: locale === 'fi' ? "Kehitä" : locale === 'ar' ? "طوّر" : "Develop",
      desc: locale === 'fi' ? "Luo ratkaisukonsepteja" : locale === 'ar' ? "إنشاء مفاهيم الحلول" : "Create solution concepts",
      icon: (
        <span className="material-symbols text-4xl">edit</span>
      )
    },
    { 
      phase: locale === 'fi' ? "Toimita" : locale === 'ar' ? "قدّم" : "Deliver",
      desc: locale === 'fi' ? "Testaa käyttäjillä ja iteroidu" : locale === 'ar' ? "اختبار مع المستخدمين والتكرار" : "Test with users and iterate",
      icon: (
        <span className="material-symbols text-4xl">rocket_launch</span>
      )
    }
  ];
  
  // Translation for roles
  const roles = locale === 'fi' ? 
    ["Tuotesuunnittelija", "Tuotepäällikkö", "Käyttäjätutkimus", "Testaus", "Analytiikka"] :
    locale === 'ar' ?
    ["مصمم منتجات", "مدير منتج", "بحث المستخدم", "اختبار", "تحليلات"] :
    ["Product Designer", "Product Manager", "User Research", "Testing", "Analytics"];

  // Localized metrics
  const metrics = [
    { 
      label: locale === 'fi' ? "Luovuuden arvo" : locale === 'ar' ? "قيمة الإبداع" : "Creativity Value", 
      value: 90 
    },
    { 
      label: locale === 'fi' ? "Käyttäjäystävällisyys" : locale === 'ar' ? "سهولة الاستخدام" : "User-Friendliness", 
      value: 95 
    },
    { 
      label: locale === 'fi' ? "Värien hyväksyntä" : locale === 'ar' ? "اعتماد الألوان" : "Color Approval", 
      value: 80 
    },
    { 
      label: locale === 'fi' ? "Esteettömyys" : locale === 'ar' ? "إمكانية الوصول" : "Accessibility", 
      value: 85 
    }
  ];

  return (
    <main className={`min-h-screen bg-theme text-theme `}>
      <Navigation />

      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className={`max-w-4xl `}
          >
            {/* Hero Image */}
            <motion.div 
              variants={fadeInUp}
              className="relative w-full h-[400px] mb-12 rounded-2xl overflow-hidden"
            >
              <Image
                src="/images/portfolio/collaboration/cover.jpg"
                alt={content.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Header Section */}
            <motion.h1 
              variants={fadeInUp}
              className={`text-5xl font-bold mb-6 ${isLight ? 'text-gray-900' : 'text-white'}`}
            >
              {content.title}
            </motion.h1>

            <motion.div variants={fadeInUp} className="mb-12">
              <p className="text-xl opacity-80 leading-relaxed">
                {content.intro}
              </p>
            </motion.div>

            {/* Project Overview */}
            <motion.section variants={fadeInUp} className="mb-16">
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 `}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{content.projectType}</h3>
                    <p className="opacity-80">{content.projectTypeValues}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{content.timeline}</h3>
                    <p className="opacity-80">{content.timelineValue}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">{content.tools}</h3>
                    <p className="opacity-80">{content.toolsValue}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">{content.roles}</h3>
                  <ul className={`list-disc  opacity-80 space-y-2`}>
                    {roles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Objectives */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.objectives}</h2>
              <ul className="list-none space-y-4">
                {objectives.map((objective: string, index: number) => (
                  <li key={index} className={`flex items-start `}>
                    <span className={`inline-block w-2 h-2 mt-2  bg-primary rounded-full`}></span>
                    <span className="opacity-80">{objective}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Design Process */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.designProcess}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {designProcessSteps.map((item, index) => (
                  <div
                    key={index}
                    className="theme-card-flex p-6 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{item.phase}</h3>
                    <p className="opacity-80">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Research Findings */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.researchInsights}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-lg5">
                  <h3 className="text-xl font-semibold text-primary mb-6">{content.participantFeedback}</h3>
                  <div className="space-y-6">
                    {metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        className="relative pt-1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className={`flex items-center justify-between mb-2 `}>
                          <span className="text-opacity-80">{metric.label}</span>
                          <span className="text-primary font-semibold">{metric.value}%</span>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-purple-400/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${metric.value}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-400 `}
                            style={{ 
                              width: `${metric.value}%`
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-primary mb-6">{content.keyRecommendations}</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: locale === 'fi' ? "Parannettu saavutettavuus" : locale === 'ar' ? "إمكانية وصول محسّنة" : "Enhanced Accessibility",
                        description: locale === 'fi' ? "Lisää selkeät etiketit kaikkiin kuvakkeisiin ja kuviin" : locale === 'ar' ? "إضافة تسميات واضحة لجميع الرموز والصور" : "Add clear labels to all icons and images",
                        icon: (
                          <span className="material-symbols text-4xl">person</span>
                        )
                      },
                      {
                        title: locale === 'fi' ? "Näppäimistön navigointi" : locale === 'ar' ? "التنقل عبر لوحة المفاتيح" : "Keyboard Navigation",
                        description: locale === 'fi' ? "Paranna kohdistustiloja ja näppäimistön pikavalintoja" : locale === 'ar' ? "تحسين حالات التركيز واختصارات لوحة المفاتيح" : "Improve focus states and keyboard shortcuts",
                        icon: (
                          <span className="material-symbols text-4xl">keyboard</span>
                        )
                      },
                      {
                        title: locale === 'fi' ? "Värikontrasti" : locale === 'ar' ? "تباين الألوان" : "Color Contrast",
                        description: locale === 'fi' ? "Paranna kontrastisuhteita paremman luettavuuden vuoksi" : locale === 'ar' ? "تعزيز نسب التباين لتحسين قابلية القراءة" : "Enhance contrast ratios for better readability",
                        icon: (
                          <span className="material-symbols text-4xl">palette</span>
                        )
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="theme-card-flex p-4 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex items-start space-x-4 self-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0">
                          <div className="h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                            {item.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-primary">{item.title}</h4>
                          <p className="text-opacity-80">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Personas */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.userPersonas}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                { [
                  {
                    name: locale === 'fi' ? "John J." : locale === 'ar' ? "جون ج." : "John J.",
                    role: locale === 'fi' ? "Markkinointipäällikkö" : locale === 'ar' ? "مدير التسويق" : "Marketing Manager",
                    traits: locale === 'fi' ? ["Teknologiaosaava", "Innovaatioihin keskittyvä"] : locale === 'ar' ? ["متمرس بالتكنولوجيا", "يركز على الابتكار"] : ["Tech-savvy", "Innovation-focused"],
                    needs: locale === 'fi' ? ["Yhteistyötyökalut", "Strategian yhdenmukaistaminen"] : locale === 'ar' ? ["أدوات التعاون", "مواءمة الاستراتيجية"] : ["Collaboration tools", "Strategy alignment"],
                    goals: locale === 'fi' ? ["Tehosta tiimiviestintää", "Ota käyttöön uusia markkinointistrategioita"] : locale === 'ar' ? ["تبسيط التواصل بين الفريق", "تنفيذ استراتيجيات تسويقية جديدة"] : ["Streamline team communication", "Implement new marketing strategies"],
                    painPoints: locale === 'fi' ? ["Monimutkaiset hyväksymisprosessit", "Hajautetut palautekanavat"] : locale === 'ar' ? ["عمليات الموافقة المعقدة", "قنوات التغذية الراجعة المتفرقة"] : ["Complex approval processes", "Scattered feedback channels"],
                    icon: (
                      <span className="material-symbols text-4xl">groups</span>
                    )
                  },
                  {
                    name: locale === 'fi' ? "Julia Romes" : locale === 'ar' ? "جوليا رومز" : "Julia Romes",
                    role: locale === 'fi' ? "Myyntijohtaja" : locale === 'ar' ? "مدير المبيعات" : "Sales Director",
                    traits: locale === 'fi' ? ["Tuloksiin keskittyvä", "Mobiilipainotteinen"] : locale === 'ar' ? ["يركز على النتائج", "يعطي الأولوية للجوال"] : ["Results-driven", "Mobile-first"],
                    needs: locale === 'fi' ? ["Nopea yhteistyö", "Liikkuva pääsy"] : locale === 'ar' ? ["تعاون سريع", "الوصول أثناء التنقل"] : ["Quick collaboration", "On-the-go access"],
                    goals: locale === 'fi' ? ["Sulje kaupat nopeammin", "Paranna tiimikoordinointia"] : locale === 'ar' ? ["إتمام الصفقات بشكل أسرع", "تحسين تنسيق الفريق"] : ["Close deals faster", "Improve team coordination"],
                    painPoints: locale === 'fi' ? ["Rajoitettu mobiilitoiminnallisuus", "Viivästyneet vastaukset"] : locale === 'ar' ? ["وظائف محدودة للجوال", "ردود متأخرة"] : ["Limited mobile functionality", "Delayed responses"],
                    icon: (
                      <span className="material-symbols text-4xl">groups</span>
                    )
                  }
                ].map((persona, index) => (
                  <motion.div
                    key={index}
                    className="theme-card-flex p-6 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mr-4">
                        {persona.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{persona.name}</h3>
                        <p className="text-opacity-80">{persona.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">{locale === 'fi' ? "Ominaisuudet" : locale === 'ar' ? "السمات" : "Traits"}</h4>
                        <div className="flex flex-wrap gap-2">
                          {persona.traits.map((trait, i) => (
                            <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">{locale === 'fi' ? "Tarpeet" : locale === 'ar' ? "الاحتياجات" : "Needs"}</h4>
                        <ul className="space-y-2">
                          {persona.needs.map((need, i) => (
                            <li key={i} className="flex items-center text-opacity-80">
                              <span className="material-symbols text-sm mr-2">check_circle</span>
                              {need}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">{locale === 'fi' ? "Tavoitteet" : locale === 'ar' ? "الأهداف" : "Goals"}</h4>
                        <ul className="space-y-2">
                          {persona.goals.map((goal, i) => (
                            <li key={i} className="flex items-center text-opacity-80">
                              <span className="material-symbols text-sm mr-2">arrow_forward</span>
                              {goal}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">{locale === 'fi' ? "Kipupisteet" : locale === 'ar' ? "نقاط الألم" : "Pain Points"}</h4>
                        <ul className="space-y-2">
                          {persona.painPoints.map((point, i) => (
                            <li key={i} className="flex items-center text-opacity-80">
                              <span className="material-symbols text-sm mr-2">warning</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Requirements & Testing */}
            <motion.section variants={fadeInUp} className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-lg">
                  <h2 className="text-3xl font-bold mb-6 text-primary">{content.productRequirements}</h2>
                  <div className="space-y-4">
                    {[
                      {
                        title: locale === 'fi' ? "Tiimiviestintä" : locale === 'ar' ? "تواصل الفريق" : "Team Communication",
                        description: locale === 'fi' ? "Mahdollista saumaton reaaliaikainen yhteistyö" : locale === 'ar' ? "تمكين التعاون في الوقت الحقيقي بسلاسة" : "Enable seamless real-time collaboration",
                        icon: (
                          <span className="material-symbols text-4xl">group</span>
                        )
                      },
                      {
                        title: locale === 'fi' ? "Käyttäjäpalautesilmukka" : locale === 'ar' ? "حلقة تغذية راجعة المستخدم" : "User Feedback Loop",
                        description: locale === 'fi' ? "Jatkuva käyttäjäoivallusten kerääminen" : locale === 'ar' ? "جمع مستمر لرؤى المستخدم" : "Continuous collection of user insights",
                        icon: (
                          <span className="material-symbols text-4xl">feedback</span>
                        )
                      },
                      {
                        title: locale === 'fi' ? "Koulutusresurssit" : locale === 'ar' ? "موارد التدريب" : "Training Resources",
                        description: locale === 'fi' ? "Monitasoiset oppimateriaalit" : locale === 'ar' ? "مواد تعليمية متعددة المستويات" : "Multi-level learning materials",
                        icon: (
                          <span className="material-symbols text-4xl">school</span>
                        )
                      },
                      {
                        title: locale === 'fi' ? "Dokumentaatio" : locale === 'ar' ? "التوثيق" : "Documentation",
                        description: locale === 'fi' ? "Kattavat tukiresurssit" : locale === 'ar' ? "موارد دعم شاملة" : "Comprehensive support resources",
                        icon: (
                          <span className="material-symbols text-4xl">description</span>
                        )
                      }
                    ].map((req, index) => (
                      <motion.div
                        key={index}
                        className="theme-card-flex p-4 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex items-start space-x-4 self-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 10 }}
                      >
                        <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                          {req.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary">{req.title}</h3>
                          <p className="text-opacity-80">{req.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-lg">
                  <h2 className="text-3xl font-bold mb-6 text-primary">{content.userTesting}</h2>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-primary mb-4">{content.testScenario}</h3>
                    <div className="theme-card-flex p-4 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 self-start">
                      <p className="text-opacity-80">{content.testScenarioValue}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-4">{content.focusAreas}</h3>
                    <div className="grid grid-cols-2 gap-4 grid-flow-row auto-rows-auto">
                      { [
                        {
                          area: locale === 'fi' ? "Käytettävyys" : locale === 'ar' ? "سهولة الاستخدام" : "Usability",
                          icon: (
                            <span className="material-symbols text-4xl">touch_app</span>
                          )
                        },
                        {
                          area: locale === 'fi' ? "Luovuus" : locale === 'ar' ? "الإبداع" : "Creativity",
                          icon: (
                            <span className="material-symbols text-4xl">brush</span>
                          )
                        },
                        {
                          area: locale === 'fi' ? "Esteettömyys" : locale === 'ar' ? "إمكانية الوصول" : "Accessibility",
                          icon: (
                            <span className="material-symbols text-4xl">accessibility</span>
                          )
                        },
                        {
                          area: locale === 'fi' ? "Visuaalinen suunnittelu" : locale === 'ar' ? "التصميم البصري" : "Visual Design",
                          icon: (
                            <span className="material-symbols text-4xl">image</span>
                          )
                        }
                      ].map((focus, index) => (
                        <div
                          key={index}
                          className="theme-card-flex p-4 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
                        >
                          <div className="h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-2">
                            <div className="text-purple-400">
                              {focus.icon}
                            </div>
                          </div>
                          <span className="text-opacity-80 text-sm text-center">{focus.area}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Delivery Phase */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.deliveryPhase}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                { [
                  {
                    title: locale === 'fi' ? "Korkean tarkkuuden prototyyppi" : locale === 'ar' ? "نموذج أولي عالي الدقة" : "High Fidelity Prototype",
                    description: locale === 'fi' ? "Vuorovaikutteiset suunnitelmat, jotka esittelevät keskeisiä ominaisuuksia käyttäjien tavoitteiden ja käytettävyyden periaatteiden mukaisesti" : locale === 'ar' ? "تصاميم تفاعلية تعرض الميزات الرئيسية المتوافقة مع أهداف المستخدم ومبادئ سهولة الاستخدام" : "Interactive designs showcasing key features aligned with user goals and usability principles",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">devices</span>
                    )
                  },
                  {
                    title: locale === 'fi' ? "Suunnittelukatsaukset" : locale === 'ar' ? "مراجعات التصميم" : "Design Reviews",
                    description: locale === 'fi' ? "Rakenteelliset palautesessiot sidosryhmien kanssa dokumentoimaan keskeisiä päätöksiä ja parannuksia" : locale === 'ar' ? "جلسات ملاحظات منظمة مع أصحاب المصلحة لتوثيق القرارات الرئيسية والتحسينات" : "Structured feedback sessions with stakeholders to document key decisions and improvements",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">reviews</span>
                    )
                  },
                  {
                    title: locale === 'fi' ? "Laadunvarmistus" : locale === 'ar' ? "ضمان الجودة" : "Quality Assurance",
                    description: locale === 'fi' ? "Kattava testaus eri laitteilla varmistamaan johdonmukainen kokemus ja suorituskyky" : locale === 'ar' ? "اختبار شامل عبر الأجهزة لضمان تجربة وأداء متسقين" : "Comprehensive testing across devices to ensure consistent experience and performance",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">verified</span>
                    )
                  },
                  {
                    title: locale === 'fi' ? "Dokumentaatio" : locale === 'ar' ? "التوثيق" : "Documentation",
                    description: locale === 'fi' ? "Selkeä dokumentaatio tulevaa kehitystä ja monitoimista yhteistyötä varten." : locale === 'ar' ? "توثيق واضح للتطوير المستقبلي والتعاون متعدد الوظائف." : "Clear documentation for future development and cross-functional collaboration.",
                    progress: 100,
                    icon: (
                      <span className="material-symbols text-4xl">folder</span>
                    )
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="theme-card-flex p-6 rounded-lg hover:bg-theme/70 transition-all duration-300 transform hover:scale-105"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 h-[68px] w-[68px] flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg">
                        {item.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                        <p className="text-opacity-80 mb-4">{item.description}</p>
                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                                {content.completed}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-semibold inline-block text-primary">
                                {item.progress}%
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-purple-400/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </article>
    </main>
  );
}
