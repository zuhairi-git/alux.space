# Multilingual Support Documentation

This document explains how to use the multilingual features implemented in cvlanes.com.

## Available Languages

The website supports the following languages:
- English (default, `en`)
- Finnish (`fi`)
- Arabic (`ar`) - with Right-to-Left (RTL) support

## Implementation Details

### Language Context and Providers

The multilingual system is built around the `LanguageContext` which provides:
- Current language/locale
- Function to change the language
- RTL status flag for Arabic

### Translation Files

Translation files are stored in JSON format in the following directories:
- `src/locales/en/common.json` (English)
- `src/locales/fi/common.json` (Finnish)
- `src/locales/ar/common.json` (Arabic)

### How to Use Translations

In any component, import the necessary hooks:

```tsx
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';

function YourComponent() {
  const { locale, isRTL } = useLanguage(); // Get current language and RTL status
  const { t } = useTranslations(locale); // Get translation function
  
  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <h1>{t('your.translation.key')}</h1>
    </div>
  );
}
```

### Adding New Translations

To add new translatable text:

1. Add the key to `src/locales/en/common.json` with the English text
2. Add the same key to `src/locales/fi/common.json` with the Finnish translation
3. Add the same key to `src/locales/ar/common.json` with the Arabic translation

For example:
```json
// In English file
{
  "example": {
    "greeting": "Hello, world!"
  }
}

// In Finnish file
{
  "example": {
    "greeting": "Hei, maailma!"
  }
}

// In Arabic file
{
  "example": {
    "greeting": "مرحبا بالعالم!"
  }
}
```

Then use it in a component:
```tsx
const { locale } = useLanguage();
const { t } = useTranslations(locale);

return <p>{t('example.greeting')}</p>;
```

### RTL Support

For Arabic language, the Right-to-Left layout is automatically applied when the language is set to Arabic (`ar`). The system:

1. Sets the `dir="rtl"` attribute on the HTML document
2. Flips margins, paddings, and text alignment
3. Reverses flex directions as needed

### Language Switcher

The language switcher component in the navigation allows users to change languages. It:
1. Shows the current language flag
2. Displays a dropdown with all available languages
3. Stores the selected language in localStorage for persistence
4. Updates the UI direction based on language selection

## Adding More Languages

To add a new language:

1. Add the language code to `src/i18n.js` in the `locales` array
2. Create a new directory in `src/locales/[language-code]`
3. Create a `common.json` file in that directory with translated strings
4. Add the language to the `LanguageSwitcher` component

## Handling Arabic and RTL Text

Arabic text requires special handling:

1. Make sure the text flows from right to left
2. Correctly handle bidirectional text with numbers and Latin characters
3. Adjust UI elements that have specific direction requirements