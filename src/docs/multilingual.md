# Multilingual Support Documentation

This document explains how to use the multilingual features implemented in cvlanes.com.

## Available Languages

The website supports the following languages:
- English (default, `en`)
- Finnish (`fi`)

## Implementation Details

### Language Context and Providers

The multilingual system is built around the `LanguageContext` which provides:
- Current language/locale
- Function to change the language

### Translation Files

Translation files are stored in JSON format in the following directories:
- `src/locales/en/common.json` (English)
- `src/locales/fi/common.json` (Finnish)

### How to Use Translations

In any component, import the necessary hooks:

```tsx
import { useLanguage } from '@/context/LanguageContext';
import { useTranslations } from '@/utils/translations';

function YourComponent() {
  const { locale } = useLanguage(); // Get current language
  const { t } = useTranslations(locale); // Get translation function
  
  return (
    <div>
      <h1>{t('your.translation.key')}</h1>
    </div>
  );
}
```

### Adding New Translations

To add new translatable text:

1. Add the key to `src/locales/en/common.json` with the English text
2. Add the same key to `src/locales/fi/common.json` with the Finnish translation

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
```

Then use it in a component:
```tsx
const { locale } = useLanguage();
const { t } = useTranslations(locale);

return <p>{t('example.greeting')}</p>;
```

### Language Switcher

The language switcher component in the navigation allows users to change languages. It:
1. Shows the current language flag
2. Displays a dropdown with all available languages
3. Stores the selected language in localStorage for persistence

## Adding More Languages

To add a new language:

1. Add the language code to `src/i18n.js` in the `locales` array
2. Create a new directory in `src/locales/[language-code]`
3. Create a `common.json` file in that directory with translated strings
4. Add the language to the `LanguageSwitcher` component