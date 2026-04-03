#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASELINE_PATH = path.join(__dirname, 'material-symbols-baseline.json');
const WRITE_BASELINE = process.argv.includes('--write-baseline');

const TEXT_EXTENSIONS = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.css',
  '.md',
  '.json',
  '.txt',
  '.yml',
  '.yaml',
]);

const MATERIAL_SYMBOLS_EXTENSIONS = new Set(['.ts', '.tsx']);
const SKIP_DIRS = new Set([
  '.git',
  '.next',
  '.next-prod',
  'node_modules',
  'out',
  'dist',
  'build',
  'coverage',
  'build-runner',
  'reports',
]);

const SKIP_FILES = new Set([
  'build_output.txt',
  'eslint-client.json',
  'eslint-output.json',
  'eslint.json',
  'eslint_out.txt',
  'tsc_errors.txt',
]);

const MOJIBAKE_ALLOWLIST = new Set([
  '.github/copilot-instructions.md',
  'scripts/validate-text-integrity.js',
  'src/components/portfolio/AccessibilityClient.tsx',
]);

const MOJIBAKE_PATTERNS = [
  {
    label: 'double-decoded UTF-8 punctuation',
    regex: /Ã¢â‚¬(?:â€|Â¦|Â¢|Â™|Âœ|Â|Â“|Â”|Â˜)?/u,
  },
  {
    label: 'Windows-1252 punctuation mojibake',
    regex: /â€™|â€œ|â€|â€“|â€”|â€¦|â€¢/u,
  },
  {
    label: 'stray Latin-1 prefix',
    regex: /Â[\s:;,.!?()[\]{}'"·]/u,
  },
  {
    label: 'replacement character',
    regex: /�/u,
  },
];

const MATERIAL_SYMBOLS_PATTERN = /\bmaterial-symbols(?:-rounded)?\b/g;

function toRelativePath(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join('/');
}

function walk(dirPath, files = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) {
        walk(path.join(dirPath, entry.name), files);
      }
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (SKIP_FILES.has(entry.name)) {
      continue;
    }

    if (TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

function collectMojibakeFindings(textFiles) {
  const findings = [];

  for (const filePath of textFiles) {
    const relativePath = toRelativePath(filePath);
    if (MOJIBAKE_ALLOWLIST.has(relativePath)) {
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    for (const { label, regex } of MOJIBAKE_PATTERNS) {
      const match = content.match(regex);
      if (!match) {
        continue;
      }

      findings.push({
        file: relativePath,
        label,
        sample: match[0],
      });
      break;
    }
  }

  return findings;
}

function collectMaterialSymbolsCounts(textFiles) {
  const counts = {};

  for (const filePath of textFiles) {
    if (!MATERIAL_SYMBOLS_EXTENSIONS.has(path.extname(filePath))) {
      continue;
    }

    const relativePath = toRelativePath(filePath);
    const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
    const matchingLineCount = lines.filter((line) => MATERIAL_SYMBOLS_PATTERN.test(line)).length;
    MATERIAL_SYMBOLS_PATTERN.lastIndex = 0;
    if (matchingLineCount > 0) {
      counts[relativePath] = matchingLineCount;
    }
  }

  return Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
}

function loadBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) {
    throw new Error(`Missing baseline file: ${path.relative(ROOT, BASELINE_PATH)}`);
  }

  return JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'));
}

function compareAgainstBaseline(currentCounts, baseline) {
  const regressions = [];
  const improvements = [];

  for (const [file, count] of Object.entries(currentCounts)) {
    const baselineCount = baseline[file];
    if (baselineCount === undefined) {
      regressions.push({ file, count, baselineCount: 0, type: 'new-file' });
      continue;
    }

    if (count > baselineCount) {
      regressions.push({ file, count, baselineCount, type: 'count-increase' });
      continue;
    }

    if (count < baselineCount) {
      improvements.push({ file, count, baselineCount });
    }
  }

  for (const [file, baselineCount] of Object.entries(baseline)) {
    if (!(file in currentCounts)) {
      improvements.push({ file, count: 0, baselineCount });
    }
  }

  return { regressions, improvements };
}

function writeBaseline(currentCounts) {
  fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(currentCounts, null, 2)}\n`, 'utf8');
  console.log(`Wrote Material Symbols baseline to ${path.relative(ROOT, BASELINE_PATH)}.`);
}

function formatCountDelta(entry) {
  return `${entry.file} (${entry.baselineCount} -> ${entry.count})`;
}

function main() {
  const textFiles = walk(ROOT);
  const mojibakeFindings = collectMojibakeFindings(textFiles);
  const materialSymbolsCounts = collectMaterialSymbolsCounts(textFiles);

  if (WRITE_BASELINE) {
    writeBaseline(materialSymbolsCounts);
    return;
  }

  const baseline = loadBaseline();
  const { regressions, improvements } = compareAgainstBaseline(materialSymbolsCounts, baseline);

  if (mojibakeFindings.length > 0) {
    console.error('Mojibake safeguard failed:');
    for (const finding of mojibakeFindings) {
      console.error(`  - ${finding.file}: ${finding.label} (${JSON.stringify(finding.sample)})`);
    }
  }

  if (regressions.length > 0) {
    console.error('Material Symbols safeguard failed:');
    for (const regression of regressions) {
      if (regression.type === 'new-file') {
        console.error(`  - ${regression.file}: new raw material-symbols usage (${regression.count})`);
      } else {
        console.error(`  - ${formatCountDelta(regression)}`);
      }
    }
    console.error('Use the shared Icon component or update the baseline only after an intentional migration review.');
  }

  if (mojibakeFindings.length > 0 || regressions.length > 0) {
    process.exit(1);
  }

  if (improvements.length > 0) {
    console.log('Material Symbols debt reduced in:');
    for (const improvement of improvements) {
      console.log(`  - ${formatCountDelta(improvement)}`);
    }
  }

  console.log('Text integrity checks passed.');
}

main();