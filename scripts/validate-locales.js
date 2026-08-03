#!/usr/bin/env node
/**
 * Guards the translation layer against silent drift.
 *
 * Checks, for every locale listed in src/i18n.ts:
 *   1. src/locales/<code>/common.json exists and parses
 *   2. its key set matches the reference locale exactly (no missing, no extra)
 *   3. leaf types match — a string in the reference stays a string
 *   4. {{placeholder}} tokens are identical on both sides
 *   5. no value is an untranslated copy of the reference (warning only)
 *   6. src/i18n.ts and scripts/inject-html-lang.js agree on the locale list
 *
 * Missing keys silently fall back to English at runtime, which is exactly the
 * kind of bug nobody notices until a user reports a half-translated page.
 *
 * Exits non-zero on error. Wired into `npm run prebuild` and `npm run precommit`.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LOCALES_DIR = path.join(ROOT, 'src', 'locales');
const I18N_SOURCE = path.join(ROOT, 'src', 'i18n.ts');
const INJECT_SCRIPT = path.join(ROOT, 'scripts', 'inject-html-lang.js');
const TRANSLATIONS_SOURCE = path.join(ROOT, 'src', 'utils', 'translations.ts');

const errors = [];
const warnings = [];

/** Pull the active locale list + default out of src/i18n.ts without compiling it. */
function readI18nConfig() {
  const source = fs.readFileSync(I18N_SOURCE, 'utf8');

  const localesMatch = source.match(/locales:\s*\[([^\]]*)\]/);
  const defaultMatch = source.match(/defaultLocale:\s*'([^']+)'/);

  if (!localesMatch || !defaultMatch) {
    errors.push(`Could not parse "locales" / "defaultLocale" out of ${path.relative(ROOT, I18N_SOURCE)}`);
    return { locales: [], defaultLocale: 'en' };
  }

  const locales = localesMatch[1]
    .split(',')
    .map((entry) => entry.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);

  return { locales, defaultLocale: defaultMatch[1] };
}

/** Every locale that has a config entry, active or not. */
function readConfiguredLocales() {
  const source = fs.readFileSync(I18N_SOURCE, 'utf8');
  const block = source.match(/LOCALE_CONFIG:\s*Record<Locale,\s*LocaleConfig>\s*=\s*\{([\s\S]*?)\n\};/);
  if (!block) return [];
  return [...block[1].matchAll(/^\s{2}(\w+):\s*\{/gm)].map((m) => m[1]);
}

function readInjectScriptLocales() {
  const source = fs.readFileSync(INJECT_SCRIPT, 'utf8');
  const block = source.match(/const LOCALE_ATTRIBUTES = \{([\s\S]*?)\n\};/);
  if (!block) return null;
  return [...block[1].matchAll(/^\s{2}(\w+):\s*\{/gm)].map((m) => m[1]);
}

/**
 * Locales wired into the runtime bundle. `staticTranslations` has to name every
 * locale explicitly — bundlers can't glob a directory — so it is easy to add a
 * language everywhere else and have it silently serve English at runtime.
 */
function readBundledLocales() {
  const source = fs.readFileSync(TRANSLATIONS_SOURCE, 'utf8');
  const block = source.match(/const staticTranslations[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!block) return null;
  return [...block[1].matchAll(/^\s{2}(\w+):/gm)].map((m) => m[1]);
}

/** Flatten to `a.b.c` -> value, so key sets can be compared directly. */
function flatten(value, prefix = '', out = {}) {
  for (const [key, entry] of Object.entries(value)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
      flatten(entry, full, out);
    } else {
      out[full] = entry;
    }
  }
  return out;
}

function placeholders(value) {
  if (typeof value !== 'string') return [];
  return [...value.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]).sort();
}

function loadLocale(locale) {
  const file = path.join(LOCALES_DIR, locale, 'common.json');
  if (!fs.existsSync(file)) {
    errors.push(`${locale}: missing ${path.relative(ROOT, file)}`);
    return null;
  }
  try {
    return flatten(JSON.parse(fs.readFileSync(file, 'utf8')));
  } catch (error) {
    errors.push(`${locale}: ${path.relative(ROOT, file)} is not valid JSON — ${error.message}`);
    return null;
  }
}

function main() {
  const { locales, defaultLocale } = readI18nConfig();
  if (errors.length) {
    report();
    return;
  }

  // Config lists must agree, or a new language ships with the wrong direction.
  const configured = readConfiguredLocales();
  const injectLocales = readInjectScriptLocales();
  if (injectLocales === null) {
    errors.push('Could not parse LOCALE_ATTRIBUTES from scripts/inject-html-lang.js');
  } else {
    for (const locale of configured) {
      if (!injectLocales.includes(locale)) {
        errors.push(
          `"${locale}" is in LOCALE_CONFIG (src/i18n.ts) but not in LOCALE_ATTRIBUTES (scripts/inject-html-lang.js) — exported pages would get the wrong lang/dir.`
        );
      }
    }
  }

  const bundled = readBundledLocales();
  if (bundled === null) {
    errors.push('Could not parse staticTranslations from src/utils/translations.ts');
  }

  for (const locale of locales) {
    if (!configured.includes(locale)) {
      errors.push(`"${locale}" is in i18n.locales but has no LOCALE_CONFIG entry in src/i18n.ts`);
    }
    if (bundled && !bundled.includes(locale)) {
      errors.push(
        `"${locale}" is in i18n.locales but not in staticTranslations (src/utils/translations.ts) — every string would silently fall back to ${defaultLocale}.`
      );
    }
  }

  const reference = loadLocale(defaultLocale);
  if (!reference) {
    report();
    return;
  }

  const referenceKeys = Object.keys(reference);
  console.log(
    `[validate-locales] reference "${defaultLocale}" — ${referenceKeys.length} keys; checking ${locales.length} locale(s)`
  );

  for (const locale of locales) {
    if (locale === defaultLocale) continue;

    const translated = loadLocale(locale);
    if (!translated) continue;

    const missing = referenceKeys.filter((key) => !(key in translated));
    const extra = Object.keys(translated).filter((key) => !(key in reference));

    for (const key of missing) errors.push(`${locale}: missing key "${key}"`);
    for (const key of extra) errors.push(`${locale}: unknown key "${key}" (not in ${defaultLocale})`);

    let identical = 0;
    for (const key of referenceKeys) {
      if (!(key in translated)) continue;

      const source = reference[key];
      const target = translated[key];

      if (typeof source !== typeof target) {
        errors.push(
          `${locale}: type mismatch on "${key}" — expected ${typeof source}, got ${typeof target}`
        );
        continue;
      }

      const sourceTokens = placeholders(source).join(',');
      const targetTokens = placeholders(target).join(',');
      if (sourceTokens !== targetTokens) {
        errors.push(
          `${locale}: placeholder mismatch on "${key}" — expected {{${sourceTokens || 'none'}}}, got {{${targetTokens || 'none'}}}`
        );
      }

      // Proper nouns legitimately match; a large share matching means the file
      // was copied and not translated.
      if (typeof source === 'string' && source.length > 25 && source === target) {
        identical += 1;
      }
    }

    if (identical > 0) {
      warnings.push(
        `${locale}: ${identical} long value(s) are byte-identical to ${defaultLocale} — likely untranslated`
      );
    }

    if (missing.length === 0 && extra.length === 0) {
      console.log(`[validate-locales] ${locale}: OK (${Object.keys(translated).length} keys)`);
    }
  }

  report();
}

function report() {
  for (const warning of warnings) console.warn(`⚠  ${warning}`);

  if (errors.length > 0) {
    console.error(`\n✖ Locale validation failed with ${errors.length} error(s):\n`);
    for (const error of errors) console.error(`   ${error}`);
    console.error('');
    process.exit(1);
  }

  console.log('[validate-locales] All locale files are in sync.');
}

main();
