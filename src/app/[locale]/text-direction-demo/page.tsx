import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import Navigation from '@/components/Navigation';
import { i18n } from '@/i18n';

// Required for static site generation with internationalized routes
export function generateStaticParams() {
  return i18n.locales.map(locale => ({ locale }));
}

// TextDirectionDemo component to test RTL functionality
function TextDirectionDemo({ locale }: { locale: string }) {
  // Sample text in different languages
  const sampleText = {
    en: {
      title: "Text Direction Demo",
      paragraph: "This is a demonstration of text direction handling in this application. Notice how the text layout and alignment changes based on the selected language.",
      bulletPoints: ["Left-aligned for English", "Right-aligned for Arabic", "Proper punctuation", "Numbers stay left-to-right"],
      mixedContent: "Numbers in any language: 123,456.789",
      quote: "Great design is eliminating all unnecessary details - Michio Kaku"
    },
    fi: {
      title: "Tekstin suunnan demo",
      paragraph: "Tämä on demonstraatio tekstin suunnan käsittelystä tässä sovelluksessa. Huomaa, kuinka tekstin asettelu ja kohdistus muuttuvat valitun kielen perusteella.",
      bulletPoints: ["Vasemmalle tasattu englanniksi", "Oikealle tasattu arabiaksi", "Oikea välimerkit", "Numerot pysyvät vasemmalta oikealle"],
      mixedContent: "Numerot millä tahansa kielellä: 123,456.789",
      quote: "Hyvä suunnittelu eliminoi kaikki tarpeettomat yksityiskohdat - Michio Kaku"
    },
    ar: {
      title: "عرض اتجاه النص",
      paragraph: "هذا عرض توضيحي لكيفية التعامل مع اتجاه النص في هذا التطبيق. لاحظ كيف يتغير تنسيق النص والمحاذاة بناءً على اللغة المحددة.",
      bulletPoints: ["محاذاة لليسار للإنجليزية", "محاذاة لليمين للعربية", "علامات الترقيم المناسبة", "الأرقام تبقى من اليسار إلى اليمين"],
      mixedContent: "الأرقام بأي لغة: 123,456.789",
      quote: "التصميم الرائع هو التخلص من جميع التفاصيل غير الضرورية - ميشيو كاكو"
    }
  };
  
  // Get the correct text for the current locale
  const text = sampleText[locale as keyof typeof sampleText] || sampleText.en;
  
  // Check if the current language is RTL (Arabic)
  const isRTL = locale === 'ar';
  
  return (
    <div className="min-h-screen bg-theme text-theme">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">{text.title}</h1>
          
          <div className="bg-theme-card p-6 rounded-lg shadow-lg mb-8">
            <p className="text-xl mb-6">{text.paragraph}</p>
            
            <h2 className="text-2xl font-semibold mb-4">
              {isRTL ? "قائمة النقاط" : "Bullet Points"}
            </h2>
            
            <ul className={`list-disc ${isRTL ? 'mr-6' : 'ml-6'} space-y-2 mb-6`}>
              {text.bulletPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
            
            <div className="bg-theme p-4 rounded mb-6">
              <h3 className="text-xl font-medium mb-2">
                {isRTL ? "محتوى مختلط" : "Mixed Content"}
              </h3>
              <p>{text.mixedContent}</p>
            </div>
            
            <blockquote className={`border-l-4 border-purple-500 ${isRTL ? 'border-r-4 border-l-0 pr-4' : 'pl-4'} py-2 italic`}>
              {text.quote}
            </blockquote>
          </div>
          
          {/* RTL-specific tests */}
          {isRTL && (
            <div className="bg-theme-card p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4">اختبارات خاصة للغة العربية</h2>
              
              <div className="space-y-4">
                <p>هذا النص يجب أن يظهر بالتنسيق الصحيح من اليمين إلى اليسار.</p>
                
                <p>نص مع أرقام: 1234 يجب أن تظهر الأرقام بشكل صحيح.</p>
                
                <p>نص مع <span className="text-purple-500">تنسيق خاص</span> وأرقام 456.</p>
                
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="material-symbols text-purple-500">check_circle</span>
                  <p>عنصر مع أيقونة</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <button className="bg-purple-600 text-white px-4 py-2 rounded">
              {isRTL ? "زر تجريبي" : "Example Button"}
            </button>
            <button className="bg-transparent border border-purple-600 text-purple-600 px-4 py-2 rounded">
              {isRTL ? "زر ثانوي" : "Secondary Button"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function TextDirectionDemoPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  
  return (
    <ThemeProvider>
      <LanguageProvider initialLocale={locale}>
        <TextDirectionDemo locale={locale} />
      </LanguageProvider>
    </ThemeProvider>
  );
}
