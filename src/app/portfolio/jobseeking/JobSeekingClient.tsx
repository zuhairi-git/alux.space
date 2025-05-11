'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';
import Navigation from '@/components/Navigation';

interface Props {
  locale?: string;
}

export default function JobSeekingClient({ locale: initialLocale }: Props) {
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
        title: "Job Seeking Application",
        intro: "A mobile app designed to streamline job searches—especially for local, part-time, and weekend work. Created to make job hunting faster, easier, and more efficient for people seeking additional income opportunities.",
        projectType: "Project Type",
        projectTypeValues: "Frontend Application for End Users",
        timeline: "Timeline",
        timelineValue: "8 Weeks",
        tools: "Tools",
        toolsValue: "Figma, FigJam, Maze",
        roles: "Roles",
        designProcess: "Design Process",
        designModel: "Model:",
        doubleD: "Double Diamond",
        discoverPhase: "Discover Phase",
        definePhase: "Define Phase",
        developPhase: "Develop Phase",
        deliverPhase: "Deliver Phase",
        challenge: "Challenge",
        challengeDesc: "How can users quickly find trustworthy local jobs, either temporary or permanent?",
        discoveryInsights: "Discovery Insights",
        discoveryDesc: "Rising living costs are pushing people to seek extra income—weekend jobs being the most flexible option. A reliable job app helps users showcase their availability and skills efficiently.",
        initialResearch: "Initial Research",
        initialResearchDesc: "Job platforms vary in usability and trust. One solution is to introduce job contracts post-match for more reliability and user trust.",
        hypothesis: "Hypothesis",
        hypothesisDesc: "A locally-focused, easy-to-use job app with personalized profiles can better serve job seekers compared to global platforms.",
        primaryResearch: "Primary Research",
        objectives: "Objectives:",
        methods: "Methods:",
        ethics: "Ethics:",
        personas: "Personas",
        userFlow: "User Flow",
        userFlowDesc: "MVP supports quick ideation and development for early product maturity—ideal for independent designers and startups.",
        productRequirements: "Product Requirements",
        epicGoal: "Epic Goal",
        epicGoalDesc: "Enable fast income opportunities via local gigs",
        userTesting: "User Testing",
        inProgress: "In progress",
        hifiProto: "High-Fidelity Prototype:",
        hifiProtoDesc: "Visual walkthrough of the final UI, tested against user goals.",
        designReviews: "Design Reviews:",
        designReviewsDesc: "Structured feedback sessions to evaluate UI quality and usability. All feedback is documented.",
        qa: "Quality Assurance:",
        qaDesc: "Covers usability, cross-device compatibility, and visual consistency",
        designDocs: "Design Documentation:",
        designDocsDesc: "Finalized assets, design decisions, and handoff materials—ready for development collaboration.",
      },
      fi: {
        title: "Työnhakusovellus",
        intro: "Mobiilisovellus, joka on suunniteltu virtaviivaistamaan työnhakua – erityisesti paikallisiin, osa-aikaisiin ja viikonlopputöihin. Luotu tekemään työnhausta nopeampaa, helpompaa ja tehokkaampaa ihmisille, jotka etsivät lisätuloja.",
        projectType: "Projektityyppi",
        projectTypeValues: "Frontend-sovellus loppukäyttäjille",
        timeline: "Aikataulu",
        timelineValue: "8 viikkoa",
        tools: "Työkalut",
        toolsValue: "Figma, FigJam, Maze",
        roles: "Roolit",
        designProcess: "Suunnitteluprosessi",
        designModel: "Malli:",
        doubleD: "Double Diamond",
        discoverPhase: "Löytämisvaihe",
        definePhase: "Määrittelyvaihe",
        developPhase: "Kehitysvaihe",
        deliverPhase: "Toimitusvaihe",
        challenge: "Haaste",
        challengeDesc: "Miten käyttäjät voivat nopeasti löytää luotettavia paikallisia työpaikkoja, joko tilapäisiä tai pysyviä?",
        discoveryInsights: "Löydökset",
        discoveryDesc: "Nousevat elinkustannukset ajavat ihmisiä etsimään lisätuloja – viikonlopputyöt ovat joustavin vaihtoehto. Luotettava työnhakusovellus auttaa käyttäjiä esittelemään saatavuutensa ja taitonsa tehokkaasti.",
        initialResearch: "Alustava tutkimus",
        initialResearchDesc: "Työalustat vaihtelevat käytettävyydessä ja luotettavuudessa. Yksi ratkaisu on ottaa käyttöön työsopimukset sovittelun jälkeen paremman luotettavuuden ja käyttäjien luottamuksen varmistamiseksi.",
        hypothesis: "Hypoteesi",
        hypothesisDesc: "Paikallisesti keskittynyt, helppokäyttöinen työnhakusovellus personoiduilla profiileilla voi palvella työnhakijoita paremmin verrattuna globaaleihin alustoihin.",
        primaryResearch: "Ensisijainen tutkimus",
        objectives: "Tavoitteet:",
        methods: "Menetelmät:",
        ethics: "Eettiset periaatteet:",
        personas: "Käyttäjäpersoonat",
        userFlow: "Käyttäjäpolku",
        userFlowDesc: "MVP tukee nopeaa ideointia ja kehitystä varhaiselle tuotekypsyydelle – ihanteellinen itsenäisille suunnittelijoille ja startupeille.",
        productRequirements: "Tuotevaatimukset",
        epicGoal: "Epiiinen tavoite",
        epicGoalDesc: "Mahdollistaa nopeat tulomahdollisuudet paikallisten keikkatöiden kautta",
        userTesting: "Käyttäjätestaus",
        inProgress: "Käynnissä",
        hifiProto: "Korkean tarkkuuden prototyyppi:",
        hifiProtoDesc: "Visuaalinen läpikäynti lopullisesta käyttöliittymästä, testattu käyttäjien tavoitteita vastaan.",
        designReviews: "Suunnittelukatsaukset:",
        designReviewsDesc: "Strukturoidut palautesessiot käyttöliittymän laadun ja käytettävyyden arvioimiseksi. Kaikki palaute dokumentoidaan.",
        qa: "Laadunvarmistus:",
        qaDesc: "Kattaa käytettävyyden, laiteyhteensopivuuden ja visuaalisen johdonmukaisuuden",
        designDocs: "Suunnitteludokumentaatio:",
        designDocsDesc: "Viimeistellyt resurssit, suunnittelupäätökset ja luovutusmateriaalit – valmiina kehitysyhteistyöhön.",
      },
      ar: {
        title: "تطبيق البحث عن وظائف",
        intro: "تطبيق للهاتف المحمول مصمم لتبسيط عمليات البحث عن الوظائف - خاصة للعمل المحلي، بدوام جزئي، وفي عطلة نهاية الأسبوع. تم إنشاؤه لجعل البحث عن وظيفة أسرع وأسهل وأكثر كفاءة للأشخاص الذين يبحثون عن فرص دخل إضافية.",
        projectType: "نوع المشروع",
        projectTypeValues: "تطبيق واجهة أمامية للمستخدمين النهائيين",
        timeline: "الجدول الزمني",
        timelineValue: "8 أسابيع",
        tools: "أدوات",
        toolsValue: "فيجما، فيج جام، ميز",
        roles: "الأدوار",
        designProcess: "عملية التصميم",
        designModel: "النموذج:",
        doubleD: "الماسة المزدوجة",
        discoverPhase: "مرحلة الاكتشاف",
        definePhase: "مرحلة التحديد",
        developPhase: "مرحلة التطوير",
        deliverPhase: "مرحلة التسليم",
        challenge: "التحدي",
        challengeDesc: "كيف يمكن للمستخدمين العثور بسرعة على وظائف محلية موثوقة، سواء مؤقتة أو دائمة؟",
        discoveryInsights: "رؤى الاكتشاف",
        discoveryDesc: "تدفع تكاليف المعيشة المتزايدة الناس إلى البحث عن دخل إضافي - وظائف نهاية الأسبوع هي الخيار الأكثر مرونة. يساعد تطبيق وظائف موثوق المستخدمين على عرض توفرهم ومهاراتهم بكفاءة.",
        initialResearch: "البحث الأولي",
        initialResearchDesc: "تختلف منصات العمل في سهولة الاستخدام والثقة. أحد الحلول هو تقديم عقود عمل بعد التطابق لمزيد من الموثوقية وثقة المستخدم.",
        hypothesis: "الفرضية",
        hypothesisDesc: "يمكن لتطبيق وظائف سهل الاستخدام يركز محليًا مع ملفات شخصية مخصصة أن يخدم الباحثين عن عمل بشكل أفضل مقارنة بالمنصات العالمية.",
        primaryResearch: "البحث الأساسي",
        objectives: "الأهداف:",
        methods: "الأساليب:",
        ethics: "الأخلاقيات:",
        personas: "الشخصيات",
        userFlow: "مسار المستخدم",
        userFlowDesc: "يدعم الحد الأدنى من المنتج القابل للتطبيق التفكير السريع والتطوير لنضج المنتج المبكر - مثالي للمصممين المستقلين والشركات الناشئة.",
        productRequirements: "متطلبات المنتج",
        epicGoal: "الهدف الملحمي",
        epicGoalDesc: "تمكين فرص الدخل السريع عبر الوظائف المحلية",
        userTesting: "اختبار المستخدم",
        inProgress: "قيد التقدم",
        hifiProto: "نموذج أولي عالي الدقة:",
        hifiProtoDesc: "عرض مرئي لواجهة المستخدم النهائية، تم اختباره مقابل أهداف المستخدم.",
        designReviews: "مراجعات التصميم:",
        designReviewsDesc: "جلسات ملاحظات منظمة لتقييم جودة واجهة المستخدم وسهولة الاستخدام. يتم توثيق جميع الملاحظات.",
        qa: "ضمان الجودة:",
        qaDesc: "يغطي قابلية الاستخدام والتوافق عبر الأجهزة والاتساق المرئي",
        designDocs: "وثائق التصميم:",
        designDocsDesc: "الأصول النهائية، وقرارات التصميم، ومواد التسليم - جاهزة للتعاون التطويري.",
      }
    };
    
    return content[locale as keyof typeof content] || content.en;
  };

  const content = getLocalizedContent();

  return (
    <>
      <Navigation />
      <article className="pt-24 pb-16 relative z-10">
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
                src="/images/portfolio/jobseeking/cover.jpeg"
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
                    <li>{locale === 'fi' ? 'Tuotesuunnittelija' : locale === 'ar' ? 'مصمم المنتج' : 'Product Designer'}</li>
                    <li>{locale === 'fi' ? 'Tuotejohtaja' : locale === 'ar' ? 'مدير المنتج' : 'Product Manager'}</li>
                    <li>{locale === 'fi' ? 'Käyttäjätutkimus' : locale === 'ar' ? 'بحث المستخدم' : 'User Research'}</li>
                    <li>{locale === 'fi' ? 'Testaus' : locale === 'ar' ? 'اختبار' : 'Testing'}</li>
                    <li>{locale === 'fi' ? 'Käyttäytymisanalytiikka' : locale === 'ar' ? 'تحليلات السلوك' : 'Behavior Analytics'}</li>
                  </ul>
                </div>
              </div>
            </motion.section>

            {/* Design Process */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.designProcess}</h2>
              <div className="mb-4 opacity-80">{content.designModel} <span className="font-semibold text-primary">{content.doubleD}</span></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105">
                    <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                      <span className="material-symbols text-3xl text-purple-400">search</span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {locale === 'fi' ? "Löydä" : locale === 'ar' ? "اكتشف" : "Discover"}
                    </h3>
                    <p className="opacity-80">
                      {locale === 'fi' ? "Tutkimukset ja haastattelut käyttäjien kipupisteiden ymmärtämiseksi" : locale === 'ar' ? "البحث والمقابلات لفهم نقاط ألم المستخدم" : "Research and interviews to understand user pain points"}
                    </p>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105">
                    <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                      <span className="material-symbols text-3xl text-purple-400">notes</span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {locale === 'fi' ? "Määrittele" : locale === 'ar' ? "حدّد" : "Define"}
                    </h3>
                    <p className="opacity-80">
                      {locale === 'fi' ? "Analysoi oivalluksia selkeiden suunnitteluongelmien määrittämiseksi" : locale === 'ar' ? "تحليل الرؤى لتحديد مشاكل التصميم بوضوح" : "Analyze insights to frame clear design problems"}
                    </p>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105">
                    <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                      <span className="material-symbols text-3xl text-purple-400">edit</span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {locale === 'fi' ? "Kehitä" : locale === 'ar' ? "طوّر" : "Develop"}
                    </h3>
                    <p className="opacity-80">
                      {locale === 'fi' ? "Ideoi ratkaisuja ja testaa prototyyppejä" : locale === 'ar' ? "ابتكار الحلول واختبار النماذج الأولية" : "Ideate solutions and test prototypes"}
                    </p>
                  </div>
                </div>

                <div className="theme-card">
                  <div className="theme-card-content p-6 hover:bg-theme/70 transition-all duration-300 transform hover:scale-105">
                    <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-4">
                      <span className="material-symbols text-3xl text-purple-400">rocket_launch</span>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {locale === 'fi' ? "Toimita" : locale === 'ar' ? "سلّم" : "Deliver"}
                    </h3>
                    <p className="opacity-80">
                      {locale === 'fi' ? "Viimeistele ratkaisu iteratiivisen testauksen ja palautteen avulla" : locale === 'ar' ? "وضع اللمسات الأخيرة على الحل من خلال الاختبار والتغذية الراجعة المتكررة" : "Finalize solution through iterative testing and feedback"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Discover Phase */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.discoverPhase}</h2>
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.challenge}</h3>
                      <p className="opacity-80">{content.challengeDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.discoveryInsights}</h3>
                      <p className="opacity-80">{content.discoveryDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.initialResearch}</h3>
                      <p className="opacity-80">{content.initialResearchDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.hypothesis}</h3>
                      <p className="opacity-80">{content.hypothesisDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.primaryResearch}</h3>
                      <div className="mb-2 font-medium">{content.objectives}</div>
                      <ul className="list-inside mb-4 opacity-80 space-y-1">
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">target</span>
                          {locale === 'fi' ? 'Mittaa sovellustietoisuutta ja käyttöä' : locale === 'ar' ? 'تقييم الوعي باستخدام التطبيق' : 'Gauge app awareness and usage'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">psychology</span>
                          {locale === 'fi' ? 'Tunnista käyttäjien kipupisteet' : locale === 'ar' ? 'تحديد نقاط ألم المستخدم' : 'Identify user pain points'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">lightbulb</span>
                          {locale === 'fi' ? 'Kerää käyttökokemuksen parannusehdotuksia' : locale === 'ar' ? 'جمع اقتراحات لتحسين تجربة المستخدم' : 'Gather UX improvement suggestions'}
                        </li>
                      </ul>
                      <div className="mb-2 font-medium">{content.methods}</div>
                      <ul className="list-inside mb-4 opacity-80 space-y-1">
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">group</span>
                          {locale === 'fi' ? 'Haastattelut (puolistrukturoidut)' : locale === 'ar' ? 'المقابلات (شبه منظمة)' : 'Interviews (semi-structured)'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">list_alt</span>
                          {locale === 'fi' ? 'Kyselyt (sekalaiset kysymykset)' : locale === 'ar' ? 'استطلاعات الرأي (أسئلة مختلطة)' : 'Surveys (mixed questions)'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">trending_up</span>
                          {locale === 'fi' ? 'Sovelluksen käytön seuranta' : locale === 'ar' ? 'تتبع استخدام التطبيق' : 'App usage tracking'}
                        </li>
                        <li className="flex items-center">
                          <span className="material-symbols text-sm text-purple-400 mr-2">data_object</span>
                          {locale === 'fi' ? 'Temaattinen ja kvantitatiivinen data-analyysi' : locale === 'ar' ? 'التحليل الموضوعي والكمي للبيانات' : 'Thematic and quantitative data analysis'}
                        </li>
                      </ul>
                      <div className="mb-2 font-medium">{content.ethics}</div>
                      <p className="opacity-80 flex items-center">
                        <span className="material-symbols text-sm text-purple-400 mr-2">verified_user</span>
                        {locale === 'fi' ? 'Tietoinen suostumus, anonymiteetti, vapaaehtoinen osallistuminen' : locale === 'ar' ? 'الموافقة المستنيرة والسرية والمشاركة الطوعية' : 'Informed consent, anonymity, voluntary participation'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Define Phase */}
            <motion.section variants={fadeInUp} className="mb-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">{content.definePhase}</h2>
              <div className="theme-card">
                <div className="theme-card-content p-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-4">{content.personas}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-theme/20 p-4 rounded-lg">
                          <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-3">
                            <span className="material-symbols text-3xl text-purple-400">person</span>
                          </div>
                          <div className="font-bold text-primary mb-2">{locale === 'fi' ? 'Allen (20, Opiskelija)' : locale === 'ar' ? 'ألن (20, طالب)' : 'Allen (20, Student)'}</div>
                          <p className="opacity-80 text-sm">{locale === 'fi' ? 'Käyttää sovellusta satunnaisesti saadakseen nopeasti rahaa. Joustava yö-/viikonloppuvuorojen suhteen. Luotettava työskennellessään.' : locale === 'ar' ? 'يستخدم التطبيق بشكل متقطع للحصول على المال السريع. مرن مع المناوبات الليلية / في عطلة نهاية الأسبوع. موثوق به عندما يعمل.' : 'Uses app infrequently for quick cash. Flexible with night/weekend shifts. Reliable when he works.'}</p>
                        </div>
                        <div className="bg-theme/20 p-4 rounded-lg">
                          <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-3">
                            <span className="material-symbols text-3xl text-purple-400">school</span>
                          </div>
                          <div className="font-bold text-primary mb-2">{locale === 'fi' ? 'James (23, Yliopisto-opiskelija)' : locale === 'ar' ? 'جيمس (23, طالب جامعي)' : 'James (23, Uni Student)'}</div>
                          <p className="opacity-80 text-sm">{locale === 'fi' ? 'Työskentelee 2-3 vuoroa/viikko ravintola-alalla. Suosii säännöllisiä tehtäviä suosikkipaikoissaan.' : locale === 'ar' ? 'يعمل 2-3 مناوبات/أسبوع في مجال الضيافة. يفضل الأدوار المستمرة في الأماكن المفضلة لديه.' : 'Works 2–3 shifts/week in hospitality. Prefers consistent roles at favorite venues.'}</p>
                        </div>
                        <div className="bg-theme/20 p-4 rounded-lg">
                          <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mb-3">
                            <span className="material-symbols text-3xl text-purple-400">work</span>
                          </div>
                          <div className="font-bold text-primary mb-2">{locale === 'fi' ? 'Eeva (40, Säännöllinen käyttäjä)' : locale === 'ar' ? 'إيفا (40، مستخدم منتظم)' : 'Eeva (40, Regular User)'}</div>
                          <p className="opacity-80 text-sm">{locale === 'fi' ? 'Sovellus tuottaa 20-40% tuloista. Suunnittelee työt etukäteen, erittäin luotettava, ei toimialapreferenssiä.' : locale === 'ar' ? 'يعتمد على التطبيق لتوفير 20-40٪ من الدخل. يخطط للعمل مسبقًا، يمكن الاعتماد عليه بشكل كبير، بدون تفضيل قطاع معين.' : 'Relies on app for 20–40% of income. Plans work in advance, highly dependable, no sector preference.'}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.userFlow}</h3>
                      <p className="opacity-80">{content.userFlowDesc}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{content.productRequirements}</h3>
                      <ul className={`list-disc  opacity-80 space-y-2`}>
                        <li>{locale === 'fi' ? 'Käyttäjäprofiilit: Rekisteröityminen, taidot, kokemus, saatavuus' : locale === 'ar' ? 'ملفات المستخدم: التسجيل، المهارات، الخبرة، التوفر' : 'User Profiles: Sign-up, skills, experience, availability'}</li>
                        <li>{locale === 'fi' ? 'Työnhaku ja suodattimet: Sijainti, palkka, toimiala, tallennetut suodattimet' : locale === 'ar' ? 'البحث عن وظائف والتصفية: الموقع، الأجر، الصناعة، عوامل التصفية المحفوظة' : 'Job Search & Filters: Location, pay, industry, saved filters'}</li>
                        <li>{locale === 'fi' ? 'Ilmoitukset: Uudet ilmoitukset, määräajat, haastattelut' : locale === 'ar' ? 'الإشعارات: القوائم الجديدة، المواعيد النهائية، المقابلات' : 'Notifications: New listings, deadlines, interviews'}</li>
                        <li>{locale === 'fi' ? 'Viestintä: Sovelluksen sisäinen keskustelu työnantajan/työnhakijan välillä' : locale === 'ar' ? 'المراسلة: دردشة داخل التطبيق للتفاعل بين صاحب العمل والباحث عن عمل' : 'Messaging: In-app chat for employer/job seeker interaction'}</li>
                        <li>{locale === 'fi' ? 'Suositukset: Räätälöidyt työehdotukset' : locale === 'ar' ? 'التوصيات: اقتراحات وظيفية مخصصة' : 'Recommendations: Tailored job suggestions'}</li>
                        <li>{locale === 'fi' ? 'Analytiikka: Hakemustilastot ja työnhakutiedot' : locale === 'ar' ? 'التحليلات: إحصائيات التقديم ورؤى البحث عن وظائف' : 'Analytics: Application stats and job search insights'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Develop & Deliver Phases */}
            <motion.section variants={fadeInUp} className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="theme-card">
                  <div className="theme-card-content p-8">
                    <h2 className="text-2xl font-bold mb-6 text-primary">{content.developPhase}</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">{content.epicGoal}</h3>
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mr-3">
                            <span className="material-symbols text-3xl text-purple-400">flight_takeoff</span>
                          </div>
                          <p className="opacity-80">{content.epicGoalDesc}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-primary mb-2">{content.userTesting}</h3>
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex items-center justify-center text-purple-400 bg-purple-400/10 rounded-lg mr-3">
                            <span className="material-symbols text-3xl text-purple-400">checklist</span>
                          </div>
                          <p className="opacity-80">{content.inProgress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="theme-card">
                  <div className="theme-card-content p-8">
                    <h2 className="text-2xl font-bold mb-6 text-primary">{content.deliverPhase}</h2>
                    <ul className={`list-disc  opacity-80 space-y-3`}>
                      <li><span className="font-semibold text-primary">{content.hifiProto}</span> {content.hifiProtoDesc}</li>
                      <li><span className="font-semibold text-primary">{content.designReviews}</span> {content.designReviewsDesc}</li>
                      <li><span className="font-semibold text-primary">{content.qa}</span> {content.qaDesc}</li>
                      <li><span className="font-semibold text-primary">{content.designDocs}</span> {content.designDocsDesc}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </article>
    </>
  );
}
