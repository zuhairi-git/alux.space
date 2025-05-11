'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Card from '@/components/Card';
import CardContent from '@/components/CardContent';
import Hero from '@/components/hero/Hero';
import QuoteBlock from '@/components/ui/QuoteBlock';
import RTLText from '@/components/ui/RTLText';
import { HeroConfig } from '@/types/hero';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';

// A helper component for skill cards
const InteractiveSkillCard = ({ 
  skill,
  index
}: { 
  skill: { title: string, desc: string },
  index: number 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="theme-card"
    >
      <div className="theme-card-glow theme-card-glow-secondary"></div>
      <div className="theme-card-content p-6">
        <h4 className="text-xl font-medium mb-2">{skill.title}</h4>
        <p className="opacity-75 text-sm">{skill.desc}</p>
      </div>
    </motion.div>
  );
};

// Icon component to simplify icon usage
const Icon = ({ name, className = "" }: { name: string, className?: string }) => {
  return <span className={`material-symbols ${className}`}>{name}</span>;
};

export default function Home() {
  const { theme } = useTheme();
  const { locale } = useLanguage();
  const { t } = useTranslations(locale);
  
  // State to track scroll position and mouse position for parallax effects
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  // Refs for section tracking
  const workExperienceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  
  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position between -0.5 and 0.5 for subtle movement
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 0.1,
        y: (e.clientY / window.innerHeight - 0.5) * 0.1
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Hero configuration
  const heroConfig: HeroConfig = {
    variant: theme === 'colorful' ? 'creative' : 'default',
    title: t('home.hero.title'),
    subtitle: t('home.hero.subtitle'),
    backgroundEffect: theme === 'colorful' ? 'particles' : 'abstract-modern',
    cta: {
      text: t('home.hero.cta'),
      href: "/portfolio"
    }
  };

  // Skills data with translations
  const getSkills = () => {
    const skills = {
      en: [
        { title: 'UI/UX Design', desc: 'Expertise in Figma & Adobe CC' },
        { title: 'Research', desc: 'Skilled in qualitative and quantitative research' },
        { title: 'Product Management', desc: 'Agile methodologies and roadmapping' },
        { title: 'Design Leadership', desc: 'Team mentoring and process development' },
        { title: 'Design Systems', desc: 'Creating consistent, scalable frameworks' },
        { title: 'Project Management', desc: 'Agile methodology (Jira, Scrum, Kanban)' },
        { title: 'Test Management', desc: 'Proficient with Maze and Zephyr Scale' },
        { title: 'Tech Stack', desc: 'Web/mobile UI, WordPress, HubSpot, React JS' }
      ],
      fi: [
        { title: 'UI/UX Suunnittelu', desc: 'Asiantuntemus Figma & Adobe CC:ssä' },
        { title: 'Tutkimus', desc: 'Taitava kvalitatiivisessa ja kvantitatiivisessa tutkimuksessa' },
        { title: 'Tuotehallinta', desc: 'Ketterät menetelmät ja tiekartat' },
        { title: 'Designjohtajuus', desc: 'Tiimin mentorointi ja prosessien kehittäminen' },
        { title: 'Designjärjestelmät', desc: 'Johdonmukaisten, skaalautuvien kehysten luominen' },
        { title: 'Projektinhallinta', desc: 'Ketterä metodologia (Jira, Scrum, Kanban)' },
        { title: 'Testinhallinta', desc: 'Taitava Maze ja Zephyr Scale -työkaluissa' },
        { title: 'Teknologiat', desc: 'Web/mobiili UI, WordPress, HubSpot, React JS' }
      ],
      ar: [
        { title: 'تصميم واجهة المستخدم/تجربة المستخدم', desc: 'خبرة في فيجما وأدوبي' },
        { title: 'البحث', desc: 'ماهر في البحث النوعي والكمي' },
        { title: 'إدارة المنتج', desc: 'منهجيات أجايل ورسم خرائط الطريق' },
        { title: 'قيادة التصميم', desc: 'إرشاد الفريق وتطوير العمليات' },
        { title: 'أنظمة التصميم', desc: 'إنشاء أطر عمل متسقة وقابلة للتوسع' },
        { title: 'إدارة المشاريع', desc: 'منهجية أجايل (جيرا، سكرم، كانبان)' },
        { title: 'إدارة الاختبار', desc: 'متمكن من ميز وزفير سكيل' },
        { title: 'المجموعة التقنية', desc: 'واجهات الويب/الموبايل، وردبريس، هابسبوت، رياكت' }
      ]
    };
    
    return skills[locale as keyof typeof skills] || skills.en;
  };

  // Get work experience content by locale
  const getWorkExperience = () => {
    const workExperience = {
      en: {
        intro: "A journey through my professional career, showcasing my growth and expertise in design and technology.",
        positions: [
          {
            title: "Product Designer | Product Owner",
            company: "Webropol, Helsinki, Finland",
            description: "Product vision, specifying features, prototyping, and handing off design system to developers.",
            period: "2023 - Present"
          },
          {
            title: "Professional Product Designer",
            company: "Reslink, Espoo, Finland",
            description: "Workflow and Cloud Management, WebApp (SaaS), and Mobile.",
            period: "2017 - 2023"
          },
          {
            title: "Senior UI/UX Designer & IT Expert",
            company: "Reslink, Helsinki, Finland",
            description: "Web Application, Android UI Development, and VPN Management.",
            period: "2016 - 2023"
          },
          {
            title: "Earlier Positions",
            positions: [
              {
                title: "Graphic Designer UI/UX & IT Expert",
                company: "Reslink, Helsinki, Finland",
                period: "2014 - 2016"
              },
              {
                title: "Freelance IT Expert & UI Developer",
                company: "From Damascus to Espoo",
                period: "2000 - 2014"
              },
              {
                title: "Graphic Designer & IT Expert",
                company: "Various Magazines and Newspapers — Tehran, Iran",
                period: ""
              }
            ],
            period: "2000 - 2016"
          }
        ]
      },
      fi: {
        intro: "Matka ammattiurallani, joka osoittaa kasvuni ja asiantuntemukseni suunnittelussa ja teknologiassa.",
        positions: [
          {
            title: "Tuotesuunnittelija | Tuoteomistaja",
            company: "Webropol, Helsinki, Suomi",
            description: "Tuotevisio, ominaisuuksien määrittely, prototyyppien luonti ja suunnittelujärjestelmän luovuttaminen kehittäjille.",
            period: "2023 - Nykyhetki"
          },
          {
            title: "Ammattimainen tuotesuunnittelija",
            company: "Reslink, Espoo, Suomi",
            description: "Työnkulun ja pilvipalvelun hallinta, verkkosovellus (SaaS) ja mobiili.",
            period: "2017 - 2023"
          },
          {
            title: "Senior UI/UX-suunnittelija & IT-asiantuntija",
            company: "Reslink, Helsinki, Suomi",
            description: "Verkkosovellus, Android-käyttöliittymäkehitys ja VPN-hallinta.",
            period: "2016 - 2023"
          },
          {
            title: "Aikaisemmat tehtävät",
            positions: [
              {
                title: "Graafinen suunnittelija UI/UX & IT-asiantuntija",
                company: "Reslink, Helsinki, Suomi",
                period: "2014 - 2016"
              },
              {
                title: "Freelance IT-asiantuntija & UI-kehittäjä",
                company: "Damaskoksesta Espooseen",
                period: "2000 - 2014"
              },
              {
                title: "Graafinen suunnittelija & IT-asiantuntija",
                company: "Eri lehdet ja sanomalehdet — Teheran, Iran",
                period: ""
              }
            ],
            period: "2000 - 2016"
          }
        ]
      },
      ar: {
        intro: "رحلة عبر مسيرتي المهنية، تعرض نموي وخبرتي في التصميم والتكنولوجيا.",
        positions: [
          {
            title: "مصمم منتجات | مالك المنتج",
            company: "ويبروبول، هلسنكي، فنلندا",
            description: "رؤية المنتج، وتحديد الميزات، وإنشاء النماذج الأولية، وتسليم نظام التصميم للمطورين.",
            period: "2023 - الحاضر"
          },
          {
            title: "مصمم منتجات محترف",
            company: "ريسلينك، إسبو، فنلندا",
            description: "إدارة سير العمل والسحابة، تطبيق ويب (SaaS)، وتطبيق موبايل.",
            period: "2017 - 2023"
          },
          {
            title: "مصمم واجهة مستخدم/تجربة مستخدم كبير وخبير تكنولوجيا المعلومات",
            company: "ريسلينك، هلسنكي، فنلندا",
            description: "تطبيق ويب، وتطوير واجهة مستخدم أندرويد، وإدارة VPN.",
            period: "2016 - 2023"
          },
          {
            title: "المناصب السابقة",
            positions: [
              {
                title: "مصمم جرافيك واجهة مستخدم/تجربة مستخدم وخبير تكنولوجيا المعلومات",
                company: "ريسلينك، هلسنكي، فنلندا",
                period: "2014 - 2016"
              },
              {
                title: "خبير تكنولوجيا معلومات مستقل ومطور واجهة مستخدم",
                company: "من دمشق إلى إسبو",
                period: "2000 - 2014"
              },
              {
                title: "مصمم جرافيك وخبير تكنولوجيا معلومات",
                company: "مجلات وصحف مختلفة — طهران، إيران",
                period: ""
              }
            ],
            period: "2000 - 2016"
          }
        ]
      }
    };
    
    return workExperience[locale as keyof typeof workExperience] || workExperience.en;
  };

  // Get translated testimonials
  const getTestimonials = () => {
    const testimonials = {
      en: [
        {
          text: "Ali is a creative product designer. You will find a lot of artists with too busy layouts and art forms. But Ali takes a lead in impressive yet simple and relevant product designs. He has this cunning ability to solve complex problem with simple solutions using his design skills. His arts speaks visually, does the job perfectly and leaves a long lasting impression. I've worked with Ali in past and it was truly a fun experience. Would love to do that again and I highly recommend Ali too.",
          name: "Fahad M",
          position: "IT Contractor | Travelodge Hotels Limited"
        },
        {
          text: "Ali is an exceptional and experienced UI/UX designer with more than ten years of professional experience specialising in product design for technology companies. Ali believes that design is not about deliverables and beautiful pixels but about solving problems and achieving business and user goals. As a product designer, Ali focuses on usability, user experience, and user research in his designs. He has worked with small and large teams as well as a freelancer and enjoys the challenge of solving user problems. He always delivers on time and on budget.",
          name: "Constantin Buda",
          position: "CMO at Vidalico Digital | Hubspot Agency Partner | SicTic Member"
        }
      ],
      fi: [
        {
          text: "Ali on luova tuotesuunnittelija. Löydät paljon taiteilijoita, joilla on liian kiireisiä taiteen muotoja. Mutta Ali on edelläkävijä vaikuttavissa mutta yksinkertaisissa ja merkityksellisissä tuotesuunnitteluissa. Hänellä on tämä ovela kyky ratkaista monimutkaisia ongelmia yksinkertaisilla ratkaisuilla käyttäen suunnittelutaitojaan. Hänen taiteensa puhuu visuaalisesti, tekee työn täydellisesti ja jättää pitkäaikaisen vaikutelman. Olen työskennellyt Alin kanssa aiemmin ja se oli todella hauska kokemus. Haluaisin tehdä sen uudestaan ja suosittelen myös Alia.",
          name: "Fahad M",
          position: "IT-urakoitsija | Travelodge Hotels Limited"
        },
        {
          text: "Ali on poikkeuksellinen ja kokenut UI/UX-suunnittelija, jolla on yli kymmenen vuoden ammattikokemus erikoistuen tuotesuunnitteluun teknologiayrityksissä. Ali uskoo, että suunnittelu ei ole kyse toimitettavista ja kauniista pikseleistä, vaan ongelmien ratkaisemisesta ja liiketoiminnan ja käyttäjien tavoitteiden saavuttamisesta. Tuotesuunnittelijana Ali keskittyy käytettävyyteen, käyttäjäkokemukseen ja käyttäjätutkimukseen suunnittelussaan. Hän on työskennellyt pienissä ja suurissa tiimeissä sekä freelancerina ja nauttii käyttäjäongelmien ratkaisun haasteesta. Hän toimittaa aina ajallaan ja budjetissa.",
          name: "Constantin Buda",
          position: "CMO Vidalico Digitalissa | Hubspot Agency Partner | SicTic-jäsen"
        }
      ],
      ar: [
        {
          text: "علي مصمم منتجات مبدع. ستجد الكثير من الفنانين ذوي التصميمات المزدحمة والأشكال الفنية المعقدة. لكن علي يأخذ الريادة في تصاميم المنتجات المؤثرة والبسيطة والمناسبة. لديه هذه القدرة الذكية على حل المشاكل المعقدة بحلول بسيطة باستخدام مهاراته التصميمية. فنه يتحدث بصريًا، يؤدي المهمة بشكل مثالي ويترك انطباعًا دائمًا. لقد عملت مع علي في الماضي وكانت تجربة ممتعة حقًا. أود أن أفعل ذلك مرة أخرى وأوصي بعلي أيضًا.",
          name: "فهد م",
          position: "متعاقد تكنولوجيا المعلومات | ترافيلودج للفنادق المحدودة"
        },
        {
          text: "علي مصمم واجهة مستخدم/تجربة مستخدم استثنائي وذو خبرة مع أكثر من عشر سنوات من الخبرة المهنية متخصص في تصميم المنتجات لشركات التكنولوجيا. يعتقد علي أن التصميم لا يتعلق بالمنتجات النهائية والبكسلات الجميلة، بل بحل المشكلات وتحقيق أهداف العمل والمستخدم. كمصمم منتجات، يركز علي على قابلية الاستخدام وتجربة المستخدم وأبحاث المستخدم في تصاميمه. لقد عمل مع فرق صغيرة وكبيرة وكذلك كمستقل ويستمتع بتحدي حل مشاكل المستخدمين. يقدم دائمًا في الوقت المحدد وضمن الميزانية.",
          name: "قسطنطين بودا",
          position: "رئيس التسويق في فيداليكو الرقمية | شريك وكالة هابسبوت | عضو سيكتيك"
        }
      ]
    };
    
    return testimonials[locale as keyof typeof testimonials] || testimonials.en;
  };
  
  const workContent = getWorkExperience();
  const skills = getSkills();
  const testimonials = getTestimonials();
  
  return (
    <main className="min-h-screen bg-theme">
      {/* Background effect for colorful theme */}
      {theme === 'colorful' && (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-[30%] right-[10%] opacity-20 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-600 blur-3xl"
            style={{ 
              transform: `translateY(${scrollY * 0.2}px) translateX(${mousePos.x * 40}px)`,
              transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          />
          <div 
            className="absolute top-[50%] left-[5%] opacity-10 w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-600 blur-3xl"
            style={{ 
              transform: `translateY(${scrollY * -0.15}px) translateX(${mousePos.x * -40}px)`,
              transition: 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)'
            }}
          />
        </div>
      )}
      <Navigation />
      <Hero config={heroConfig} />
      
      {/* Work Experience Section */}
      <motion.section 
        ref={workExperienceRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black/5 relative overflow-hidden"
        id="work-experience"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              className="material-symbols text-3xl p-3 mb-5 rounded-lg text-purple-400 bg-purple-400/10"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              work_history
            </motion.span>
            <motion.h3 
              className="text-3xl font-bold"
              animate={{ 
                textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(168, 85, 247, 0.5)", "0 0 0px rgba(0,0,0,0)"] 
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {t('home.workExperience.title')}
            </motion.h3>
            
            <motion.div
              className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 mt-4"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 text-theme-text/70 max-w-2xl mx-auto"
            >
              {workContent.intro}
            </motion.p>
          </div>
          
          {/* Timeline container with vertical line */}
          <div className="relative max-w-4xl mx-auto">
            {/* Central timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-transparent"></div>
            
            {workContent.positions.map((position, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative ${index < workContent.positions.length - 1 ? 'mb-16' : ''}`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 -top-2 w-6 h-6 rounded-full ${
                  index === 0 
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/20' 
                    : index === workContent.positions.length - 1
                      ? 'bg-gradient-to-r from-gray-500 to-blue-500/50 shadow-lg shadow-gray-500/20'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20'
                } z-10`}></div>
                
                {/* Date badge */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 -top-12 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20' 
                    : index === workContent.positions.length - 1
                      ? 'bg-gradient-to-r from-gray-500/20 to-blue-500/10'
                      : 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                } text-primary px-4 py-1 rounded-full text-sm font-medium`}>
                  {position.period}
                </div>
                
                {/* Card positioned alternating */}
                <div className={`${
                  index % 2 === 0 
                    ? 'ml-auto mr-0 md:ml-[52%] md:w-[48%]' 
                    : 'mr-auto ml-0 md:mr-[52%] md:w-[48%]'
                }`}>
                  <Card>
                    <CardContent 
                      icon={
                        index === 0 
                          ? "rocket_launch" 
                          : index === workContent.positions.length - 1
                            ? "history"
                            : index % 2 === 0 ? "grid_view" : "insights"
                      } 
                      iconClassName={`${
                        index === 0 
                          ? 'text-purple-400 bg-purple-400/10' 
                          : index === workContent.positions.length - 1
                            ? 'text-gray-400 bg-gray-400/10'
                            : index % 2 === 0 ? 'text-cyan-400 bg-cyan-400/10' : 'text-blue-400 bg-blue-400/10'
                      }`}
                      title={position.title}
                      date={position.period}
                    >
                      <div className="space-y-4">
                        {position.positions ? (
                          // For the "Earlier Positions" with nested positions
                          position.positions.map((subPosition, subIndex) => (
                            <div key={subIndex}>
                              <h5 className="text-lg opacity-80 mb-1">{subPosition.title}</h5>
                              <p className="opacity-60">{subPosition.company} {subPosition.period ? `(${subPosition.period})` : ''}</p>
                            </div>
                          ))
                        ) : (
                          // For regular positions
                          <div>
                            <div className="flex items-center gap-2 opacity-80 mb-2">
                              <span className="material-symbols material-symbols-rounded text-sm">location_on</span>
                              <p>{position.company}</p>
                            </div>
                            <p className="opacity-70">{position.description}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>      </motion.section>
        {/* About Section with Digital Dreams anchor */}
      <motion.section
        ref={aboutRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-20 relative overflow-hidden"
        id="digital-dreams"
      >
        <div id="about"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-10 text-center"
            >
              {t('home.about.title')}
            </motion.h2>
            
            <div className="space-y-6 text-lg text-theme opacity-80 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {t('home.about.intro')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <QuoteBlock 
                  quote={t('home.about.quote')} 
                  author="Ali"
                  variant="default"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {t('home.about.second')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="pt-4"
              >
                <span className="opacity-70">{t('home.about.third')}</span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
        {/* Skills Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden pb-20"
        id="strengths-skills"
      >
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIiBmaWxsPSJub25lIj48cGF0aCBkPSJNNTYgNDRDNTYgNTQuNjM3IDQ3LjI5MjYgNjMgMzYgNjNDMjQuNzA3NCA2MyAxNiA1NC42MzcgMTYgNDQiIHN0cm9rZT0iIzY1NzZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMTYgNDRDMTYgMzMuMzYzIDI0LjcwNzQgMjUgMzYgMjVDNDcuMjkyNiAyNSA1NiAzMy4zNjMgNTYgNDQiIHN0cm9rZT0iIzY1NzZGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3N2Zz4=')",
            backgroundPosition: "center center",
            backgroundSize: '80% 80%',
            backgroundRepeat: 'no-repeat'
          }}
        />
      
        <div className="container mx-auto px-4">
          <motion.h3 
            className="text-3xl font-bold mb-12 text-center"
            animate={{ 
              textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(56, 189, 248, 0.5)", "0 0 0px rgba(0,0,0,0)"] 
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            {t('home.skills.title')}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <InteractiveSkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </motion.section>      {/* Testimonials Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-black/5 relative overflow-hidden"
        id="testimonials"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <motion.span 
              className="material-symbols inline-block text-3xl p-4 mb-5 rounded-full text-primary bg-primary/10"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 8 }}
            >
              format_quote
            </motion.span>
            <motion.h3 
              className="text-3xl md:text-4xl font-bold"
              animate={{ 
                textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 15px rgba(56, 189, 248, 0.5)", "0 0 0px rgba(0,0,0,0)"] 
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              {t('home.testimonials.title')}
            </motion.h3>
            
            <motion.div
              className="h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6"
              initial={{ width: "0%" }}
              whileInView={{ width: "80px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
          </div>
          
          <div className="space-y-16 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="theme-card relative overflow-hidden"
              >                <div className="theme-card-content p-8 md:p-10">
                  {/* Quote icon positioned on the correct side based on language direction */}
                  <div className={`absolute -top-16 ${locale === 'ar' ? '-right-16' : '-left-16'} text-8xl opacity-20 text-primary`}>
                    <Icon name="format_quote" className="" />
                  </div>
                  
                  {/* Main testimonial content with proper RTL support */}
                  <div className={`flex flex-col ${locale === 'ar' ? 'md:flex-row-reverse rtl' : 'md:flex-row'} gap-8 items-start relative z-10`}>
                    {/* Avatar - positioned on the right for Arabic, left for other languages */}
                    <div className={`flex-shrink-0 ${locale === 'ar' ? 'md:mr-0 md:ml-8' : 'md:ml-0 md:mr-8'}`}>
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-tr from-fuchsia-600/20 to-cyan-500/20 flex items-center justify-center p-1">
                        <div className="w-full h-full rounded-full bg-theme flex items-center justify-center">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">
                            {index === 0 ? 'FM' : 'CB'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Testimonial text content */}
                    <div className="flex-grow">
                      {/* Testimonial text with proper text alignment */}
                      <div className="mb-6">
                        <p className={`text-theme-text/80 text-lg leading-relaxed ${locale === 'ar' ? 'text-right' : ''}`}>
                          <RTLText>{testimonial.text}</RTLText>
                        </p>
                      </div>
                      
                      {/* Author information with proper alignment */}
                      <div className={`flex items-center ${locale === 'ar' ? 'flex-row-reverse justify-end' : 'justify-between'}`}>
                        <div className={locale === 'ar' ? 'text-right' : ''}>
                          <div className="font-medium text-primary text-xl"><RTLText>{testimonial.name}</RTLText></div>
                          <div className="text-sm text-theme-text/60 mt-1"><RTLText>{testimonial.position}</RTLText></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-600 to-cyan-500"
                    initial={{ scaleX: 0, transformOrigin: locale === 'ar' ? "right" : "left" }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Footer */}
    </main>
  );
}
