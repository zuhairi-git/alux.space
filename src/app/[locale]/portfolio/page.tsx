import { getUnsplashPhoto } from '@/utils/unsplash';
import PortfolioClient from '@/components/portfolio/PortfolioClient';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
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
  photo?: {
    url: string;
    author?: {
      name: string;
      username: string;
      link: string;
    };
  };
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || i18n.defaultLocale;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
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

export default async function PortfolioPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
    const portfolioItems: PortfolioItem[] = [    {
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
      },      link: `/${locale}/portfolio/accessibility`,
      gradient: 'from-indigo-400 to-purple-500',
      photo: {
        url: '/images/portfolio/accessibility/accessiblity-showcase.jpg'
      }
    },
    {
      title: {
        en: 'Collaboration & Leadership',
        fi: 'Yhteistyö & Johtajuus'
      },
      type: {
        en: 'Team Management',
        fi: 'Tiimin hallinta'
      },
      desc: {
        en: 'Building bridges between design, development, and business through effective collaboration.',
        fi: 'Rakentaa siltoja suunnittelun, kehityksen ja liiketoiminnan välille tehokkaan yhteistyön avulla.'
      },
      link: `/${locale}/portfolio/collaboration`,
      gradient: 'from-blue-400 to-purple-500',
      photo: {
        url: '/images/portfolio/collaboration/cover.jpg'
      }
    },
    {
      title: {
        en: 'Career Development',
        fi: 'Urakehitys'
      },
      type: {
        en: 'Professional Growth',
        fi: 'Ammatillinen kasvu'
      },
      desc: {
        en: 'Continuous learning and evolution in product design and leadership roles.',
        fi: 'Jatkuva oppiminen ja kehitys tuotesuunnittelun ja johtamisen rooleissa.'
      },
      link: `/${locale}/portfolio/jobseeking`,
      gradient: 'from-purple-400 to-pink-500',
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
        } else if (item.title.en.includes('Collaboration')) {
          searchQuery = 'team collaboration workplace';
        } else if (item.title.en.includes('Career') || item.title.en.includes('Job')) {
          searchQuery = 'career growth professional development';
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
          url: '/images/portfolio/collaboration/cover.jpg', // Use existing image as fallback
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
    <ThemeProvider>
      <LanguageProvider initialLocale={locale}>
        <PortfolioClient items={itemsWithPhotos} locale={locale} />
      </LanguageProvider>
    </ThemeProvider>
  );
}