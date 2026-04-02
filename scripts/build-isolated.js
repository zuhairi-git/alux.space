#!/usr/bin/env node
/**
 * Runs `npm run build` in a separate cloned workspace to avoid
 * .next / watcher conflicts with a running dev server.
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const BUILD_DIR = path.resolve(ROOT, '..', 'build-runner');

function run(cmd, cwd) {
  console.log(`\n▶  ${cmd}\n`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

// 1. Clone or update
if (!fs.existsSync(BUILD_DIR)) {
  console.log(`Cloning into ${BUILD_DIR} …`);
  run(`git clone . "${BUILD_DIR}"`, ROOT);
} else {
  console.log(`Updating existing clone at ${BUILD_DIR} …`);
  run('git fetch origin', BUILD_DIR);
  // Reset to match current branch
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: ROOT })
    .toString()
    .trim();
  run(`git checkout ${branch}`, BUILD_DIR);
  run(`git reset --hard HEAD`, BUILD_DIR);
  // Pull latest committed changes
  run('git pull --ff-only', BUILD_DIR);
  // Sync uncommitted changes to tracked files (staged + unstaged) via a temporary patch
  try {
    const diff = execSync('git diff HEAD', { cwd: ROOT });
    if (diff.length > 0) {
      const patchFile = path.join(BUILD_DIR, '.tmp-build-patch');
      fs.writeFileSync(patchFile, diff);
      run(`git apply --allow-empty .tmp-build-patch`, BUILD_DIR);
      fs.unlinkSync(patchFile);
      console.log('Applied uncommitted changes.');
    }
  } catch {
    console.warn('⚠  Could not apply uncommitted diff — building from last commit.');
  }

  // Copy new untracked files not yet committed (new components, pages, etc.)
  try {
    const newFiles = execSync('git ls-files --others --exclude-standard', { cwd: ROOT })
      .toString().trim().split('\n').filter(Boolean);
    for (const file of newFiles) {
      const src = path.join(ROOT, file);
      const dest = path.join(BUILD_DIR, file);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    }
    if (newFiles.length > 0) console.log(`Copied ${newFiles.length} new untracked file(s).`);
  } catch {
    console.warn('⚠  Could not copy new untracked files.');
  }
}

// 2. Install dependencies
run('npm install', BUILD_DIR);

// 3. Build
run('npm run build', BUILD_DIR);

console.log('\n✅  Isolated build finished successfully.\n');
