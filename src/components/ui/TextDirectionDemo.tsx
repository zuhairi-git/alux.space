'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import RTLText, { RTLNumber, RTLDate, RTLIcon } from '@/components/ui/RTLText';
import { DirectionalFlex, DirectionalGrid, DirectionalButton } from '@/components/ui/DirectionalUI';
import { getMarginClass, getPaddingClass, getFlexDirectionClass } from '@/utils/rtl';

export default function TextDirectionDemo() {
  const { locale, isRTL } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">RTL Text Direction Demo</h1>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Language Settings</h2>
        <p className="mb-2"><strong>Locale:</strong> {locale}</p>
        <p className="mb-2"><strong>Direction:</strong> {isRTL ? 'RTL' : 'LTR'}</p>
        <p className="mb-2"><strong>HTML dir attribute:</strong> {document.documentElement.dir}</p>
      </div>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Text Display</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Regular Text</h3>
            <p>This is regular text in English. It should always display left-to-right.</p>
            <p dir="rtl">هذا نص عربي عادي. يجب أن يظهر دائمًا من اليمين إلى اليسار.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">RTLText Component</h3>
            <RTLText>This text uses the RTLText component and respects the current language direction.</RTLText>
            <br />
            <RTLText>هذا النص يستخدم مكون RTLText ويحترم اتجاه اللغة الحالي.</RTLText>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Numbers in Text</h3>
            <p>Regular numbers: 1234567890</p>
            <p dir="rtl">أرقام في النص العربي: 1234567890</p>
            <RTLText>أرقام مع نص باستخدام RTLText: <RTLNumber>1234567890</RTLNumber></RTLText>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Dates</h3>
            <p>Regular date: May 11, 2025</p>
            <p dir="rtl">تاريخ في النص العربي: 11 مايو، 2025</p>
            <RTLText>تاريخ باستخدام RTLDate: <RTLDate>11 مايو، 2025</RTLDate></RTLText>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Layout Direction</h2>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Flex Direction</h3>
            
            <p className="mb-4">Standard Flex Row:</p>
            <div className="flex flex-row bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4">
              <div className="bg-blue-500 text-white p-2 rounded">Item 1</div>
              <div className="bg-green-500 text-white p-2 rounded ml-2">Item 2</div>
              <div className="bg-red-500 text-white p-2 rounded ml-2">Item 3</div>
            </div>
            
            <p className="mb-4">DirectionalFlex Component:</p>
            <DirectionalFlex className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded">Item 1</div>
              <div className="bg-green-500 text-white p-2 rounded ml-2 mr-2">Item 2</div>
              <div className="bg-red-500 text-white p-2 rounded">Item 3</div>
            </DirectionalFlex>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Grid Layout</h3>
            
            <p className="mb-4">Standard Grid:</p>
            <div className="grid grid-cols-3 gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4">
              <div className="bg-blue-500 text-white p-2 rounded text-center">1</div>
              <div className="bg-green-500 text-white p-2 rounded text-center">2</div>
              <div className="bg-red-500 text-white p-2 rounded text-center">3</div>
            </div>
            
            <p className="mb-4">DirectionalGrid Component:</p>
            <DirectionalGrid className="grid-cols-3 gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded">
              <div className="bg-blue-500 text-white p-2 rounded text-center">1</div>
              <div className="bg-green-500 text-white p-2 rounded text-center">2</div>
              <div className="bg-red-500 text-white p-2 rounded text-center">3</div>
            </DirectionalGrid>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">UI Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Buttons with Icons</h3>
            
            <div className="space-y-4">
              <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                <span className="material-symbols-rounded mr-2">arrow_back</span>
                Back
              </button>
              
              <DirectionalButton 
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                iconStart={<span className="material-symbols-rounded">arrow_back</span>}
              >
                Back
              </DirectionalButton>
              
              <DirectionalButton 
                className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                iconEnd={<span className="material-symbols-rounded">arrow_forward</span>}
              >
                Next
              </DirectionalButton>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Form Elements</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Input Field:</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded" 
                  placeholder={isRTL ? "أدخل النص هنا" : "Enter text here"} 
                />
              </div>
              
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                <input type="checkbox" id="checkbox" className="mr-2 ml-2" />
                <label htmlFor="checkbox">
                  {isRTL ? "خيار للاختيار" : "Checkbox option"}
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Utility Functions Demo</h2>
        
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium mb-3">RTL Utility Functions</h3>
          
          <div className="space-y-4">
            <div className={`${getFlexDirectionClass(locale)} bg-gray-100 dark:bg-gray-800 p-4 rounded`}>
              <div className="bg-purple-500 text-white p-2 rounded">First using getFlexDirectionClass</div>
              <div className={`bg-yellow-500 text-white p-2 rounded ${getMarginClass(locale, 2, 'start')}`}>Middle with margin</div>
              <div className="bg-pink-500 text-white p-2 rounded">Last</div>
            </div>
            
            <div className={`bg-gray-100 dark:bg-gray-800 ${getPaddingClass(locale, 8, 'start')} rounded`}>
              <p>This element uses getPaddingClass for the correct side padding.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Special Cases</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Bidirectional Text</h3>
            <p dir="auto">
              Mixed languages: This is English text with some Arabic: هذا نص عربي and back to English.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3">Forced Direction</h3>
            <div className="mb-2">
              <RTLText forceRTL={true}>This text is forced to RTL mode even in English.</RTLText>
            </div>
            <div>
              <RTLText forceLTR={true}>هذا النص مجبر على وضع LTR حتى في اللغة العربية.</RTLText>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
