#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const isBuildRunner = path.basename(ROOT).toLowerCase() === 'build-runner';
const isCI = Boolean(
  process.env.CI ||
  process.env.GITHUB_ACTIONS ||
  process.env.VERCEL ||
  process.env.NETLIFY ||
  process.env.ALUX_DIRECT_BUILD === '1'
);

function run(command) {
  execSync(command, { cwd: ROOT, stdio: 'inherit' });
}

if (isBuildRunner || isCI) {
  run('next build');
  run('node scripts/seo-build.js');
} else {
  console.log('Local main-workspace build detected; using isolated build runner to avoid .next cache conflicts.');
  run('node scripts/build-isolated.js');
}
