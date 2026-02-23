import { getUnsplashPhoto } from '@/utils/unsplash';
import PortfolioClient from '@/components/portfolio/PortfolioClient';
import { Metadata } from 'next';
import { i18n } from '@/i18n';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

interface PortfolioItem {
  title: {
    en: string;
    fi?: string;
  };
  type: {
    en: string;
    fi?: string;
  };
  desc: {
    en: string;
    fi?: string;
  };
  link: string;
  gradient: string;
  status: {
    en: string;
    fi?: string;
    type: 'in-progress' | 'accomplished';
  };
  photo?: {
    url: string;
    author?: {
      name: string;
      username: string;
      link: string;
    };
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space';
  const localizedMetadata = {
    en: {
      title: 'Portfolio | Ali Al-Zuhairi',
      description: 'Explore my portfolio of UX design and product management projects, showcasing creative solutions to real-world challenges.',
    },
    fi: {
      title: 'Portfolio | Ali Al-Zuhairi',
      description: 'Tutustu UX-suunnittelu- ja tuotehallintaprojektieni portfolioon, joka esittelee luovia ratkaisuja todellisiin haasteisiin.',
    }
  };

  const metadata = localizedMetadata[locale as keyof typeof localizedMetadata] || localizedMetadata.en;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/portfolio`,
      languages: i18n.locales.reduce((acc, lang) => {
        acc[lang] = `${baseUrl}/${lang}/portfolio`;
        return acc;
      }, {} as Record<string, string>),
    }
  };
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; const portfolioItems: PortfolioItem[] = [
    {
      title: {
        en: 'AI-Powered Market Intelligence',
        fi: 'Tekoälypohjainen markkinatieto'
      },
      type: {
        en: 'Mobile UX/UI Design',
        fi: 'Mobiili UX/UI -suunnittelu'
      },
      desc: {
        en: 'Designing a mobile-first, AI-powered market intelligence application for enterprise users relying on trusted financial content.',
        fi: 'Mobiililähtöisen, tekoälypohjaisen markkinatietosovelluksen suunnittelu yrityskäyttäjille, jotka luottavat luotettavaan taloudelliseen sisältöön.'
      },
      link: `/${locale}/portfolio/market-intelligence`,
      gradient: 'from-blue-600 to-indigo-500',
      status: {
        en: 'In Progress',
        fi: 'Kehitteillä',
        type: 'in-progress'
      },
      photo: {
        url: '/images/portfolio/market/market-intellegence.jpg'
      }
    },
    {
      title: {
        en: 'Healthcare Product Prioritization',
        fi: 'Terveydenhuollon tuotepriorisointi'
      },
      type: {
        en: 'Product Management Case Study',
        fi: 'Tuotehallinnan tapaustutkimus'
      },
      desc: {
        en: 'Balancing technical debt, user needs, and strict compliance in a healthcare SaaS environment—a strategic approach to backlog prioritization and conflict resolution.',
        fi: 'Teknisen velan, käyttäjätarpeiden ja tiukan vaatimustenmukaisuuden tasapainottaminen terveydenhuollon SaaS-ympäristössä—strateginen lähestymistapa kehitysjonon priorisointiin ja konfliktien ratkaisuun.'
      },
      link: `/${locale}/portfolio/healthcare-prioritization`,
      gradient: 'from-blue-500 to-teal-400',
      status: {
        en: 'Accomplished',
        fi: 'Saavutettu',
        type: 'accomplished'
      },
      photo: {
        url: '/images/portfolio/healthcare/healthcare.jpg'
      }
    },
    {
      title: {
        en: 'Inclusive Design System',
        fi: 'Inklusiivinen suunnittelujärjestelmä'
      },
      type: {
        en: 'Design System Case Study',
        fi: 'Suunnittelujärjestelmä tapaustutkimus'
      },
      desc: {
        en: 'Building accessible design systems from the ground up—research-driven approach to creating inclusive digital products that work for everyone.',
        fi: 'Saavutettavien suunnittelujärjestelmien rakentaminen alusta alkaen—tutkimuspohjainen lähestymistapa inklusiivisten digitaalisten tuotteiden luomiseen, jotka toimivat kaikille.'
      }, link: `/${locale}/portfolio/accessibility`,
      gradient: 'from-indigo-400 to-purple-500',
      status: {
        en: 'In Progress',
        fi: 'Kehitteillä',
        type: 'in-progress'
      },
      photo: {
        url: '/images/portfolio/accessibility/accessiblity-showcase.jpg'
      }
    },
    {
      title: {
        en: 'Workflow Platform',
        fi: 'Työnkulkualusta'
      },
      type: {
        en: 'AI-Powered Collaboration',
        fi: 'Tekoälypohjainen yhteistyö'
      },
      desc: {
        en: 'An AI-powered platform with intelligent workspaces, AI copilot, and cross-platform prototypes for iOS, Android, and admin portal.',
        fi: 'Tekoälypohjainen alusta älykkäillä työtiloilla, tekoälyavustajalla ja monialustaisilla prototyypeillä iOS:lle, Androidille ja hallintaportaalille.'
      },
      link: `/${locale}/portfolio/workflow`,
      gradient: 'from-blue-400 to-purple-500',
      status: {
        en: 'Accomplished',
        fi: 'Saavutettu',
        type: 'accomplished'
      },
      photo: {
        url: '/images/portfolio/workflow/cover.jpg'
      }
    },
    {
      title: {
        en: 'Career Development',
        fi: 'Urakehitys'
      },
      type: {
        en: 'Job Seeking Application',
        fi: 'Työnhakusovellus'
      },
      desc: {
        en: 'Job seeking app for efficient job searching',
        fi: 'Työnhakusovellus tehokkaaseen työnhakuun'
      },
      link: `/${locale}/portfolio/jobseeking`,
      gradient: 'from-purple-400 to-pink-500',
      status: {
        en: 'Accomplished',
        fi: 'Saavutettu',
        type: 'accomplished'
      },
      photo: {
        url: '/images/portfolio/jobseeking/cover.jpg'
      }
    }
  ];

  // Fetch Unsplash photos as fallback if local images fail to load
  const itemsWithPhotos = await Promise.all(
    portfolioItems.map(async (item) => {
      // If we already have a local image, use it
      if (item.photo) {
        return item;
      }      // Otherwise try to get an Unsplash photo
      try {
        // Use more specific search terms for better image results
        let searchQuery = item.title.en.toLowerCase();
        // Special search terms for specific portfolio items
        if (item.title.en.includes('Inclusive') || item.title.en.includes('Accessibility')) {
          searchQuery = 'inclusive design accessibility diversity design system';
        } else if (item.title.en.includes('Workflow')) {
          searchQuery = 'team collaboration ai workspace';
        } else if (item.title.en.includes('Career') || item.title.en.includes('Job')) {
          searchQuery = 'career growth professional development';
        } else if (item.title.en.includes('Healthcare')) {
          searchQuery = 'healthcare medical doctor hospital';
        }

        const photo = await getUnsplashPhoto(searchQuery);
        if (photo) {
          return {
            ...item,
            photo: {
              url: photo.urls.regular,
              author: {
                name: photo.user.name,
                username: photo.user.username,
                link: photo.user.links.html,
              }
            }
          };
        }
      } catch (error) {
        console.warn(`Failed to fetch Unsplash image for ${item.title.en}:`, error);
      }
      // Fallback to a default gradient background
      return {
        ...item,
        photo: {
          url: '/images/portfolio/workflow/cover.jpg', // Use existing image as fallback
          author: {
            name: 'Default',
            username: 'default',
            link: '',
          }
        }
      };
    })
  );
  return (
    <PortfolioClient items={itemsWithPhotos} />
  );
}