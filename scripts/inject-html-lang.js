#!/usr/bin/env node
/**
 * Bake `lang` and `dir` into every exported HTML file.
 *
 * Why this exists: next.config.js uses `output: 'export'`, so there is no
 * request-time render and no middleware. The root layout owns <html> but sits
 * above the [locale] segment, which means it cannot know which language a given
 * page was generated for. Rather than restructure the app around multiple root
 * layouts, we resolve the locale from each emitted file's path and write the
 * attributes in directly.
 *
 * Result: crawlers and no-JS clients get correct static markup, and RTL locales
 * are right-to-left from the very first byte instead of after hydration.
 *
 * Runs from `npm run build` via scripts/seo-build.js's caller. Idempotent.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');

/**
 * Mirrors src/i18n.ts. Kept as a plain literal because this script runs in
 * bare Node before/outside the TypeScript pipeline.
 *
 * Adding a locale? Update src/i18n.ts and this map together — validate-locales.js
 * fails the build if they drift apart.
 */
const LOCALE_ATTRIBUTES = {
  en: { lang: 'en', dir: 'ltr' },
  fi: { lang: 'fi', dir: 'ltr' },
  ar: { lang: 'ar', dir: 'rtl' },
};

const DEFAULT_LOCALE = 'en';

function collectHtmlFiles(dir, found = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectHtmlFiles(full, found);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      found.push(full);
    }
  }
  return found;
}

/** `out/fi/blog/index.html` -> `fi`; `out/mobile/...` -> default locale. */
function localeForFile(filePath) {
  const relative = path.relative(OUT_DIR, filePath).split(path.sep);
  const first = relative[0];
  return Object.prototype.hasOwnProperty.call(LOCALE_ATTRIBUTES, first)
    ? first
    : DEFAULT_LOCALE;
}

function inject(filePath) {
  const locale = localeForFile(filePath);
  const { lang, dir } = LOCALE_ATTRIBUTES[locale];
  const html = fs.readFileSync(filePath, 'utf8');

  const openingTag = html.match(/<html\b[^>]*>/i);
  if (!openingTag) return { changed: false, locale };

  let tag = openingTag[0];

  // Replace existing attributes if present, otherwise append. Handles reruns.
  tag = /\blang\s*=/i.test(tag)
    ? tag.replace(/\blang\s*=\s*(".*?"|'.*?'|[^\s>]+)/i, `lang="${lang}"`)
    : tag.replace(/^<html\b/i, `<html lang="${lang}"`);

  tag = /\bdir\s*=/i.test(tag)
    ? tag.replace(/\bdir\s*=\s*(".*?"|'.*?'|[^\s>]+)/i, `dir="${dir}"`)
    : tag.replace(/^<html\b/i, `<html dir="${dir}"`);

  if (tag === openingTag[0]) return { changed: false, locale };

  fs.writeFileSync(
    filePath,
    html.replace(openingTag[0], tag),
    'utf8'
  );
  return { changed: true, locale };
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error(`[inject-html-lang] No out/ directory at ${OUT_DIR} — did the export run?`);
    process.exit(1);
  }

  const files = collectHtmlFiles(OUT_DIR);
  if (files.length === 0) {
    console.error('[inject-html-lang] No .html files found in out/ — refusing to report success.');
    process.exit(1);
  }

  const counts = {};
  let changed = 0;

  for (const file of files) {
    const result = inject(file);
    counts[result.locale] = (counts[result.locale] || 0) + 1;
    if (result.changed) changed += 1;
  }

  const summary = Object.entries(counts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([locale, count]) => `${locale}=${count}`)
    .join(' ');

  console.log(`[inject-html-lang] ${changed}/${files.length} files updated (${summary})`);
}

main();
