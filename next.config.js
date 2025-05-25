/** @type {import('next').NextConfig} */
const { buildTranslationsFromExcel } = require('./src/scripts/buildTranslations');

// Build translations from Excel before Next.js starts building
if (!process.env.SKIP_EXCEL_TRANSLATIONS) {
  console.log('Building translations from Excel...');
  buildTranslationsFromExcel().catch(err => {
    console.error('Error building translations:', err);
  });
}

const nextConfig = {
  images: {
    unoptimized: true, // <- disables image optimization for export mode
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com'
      }
    ],
  },  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  },
  // Using standard server-side rendering for now to get internationalization working
  // We can switch to 'export' mode once we resolve the static generation issues  output: 'export',
  // Enable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable ESLint checking during build
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
