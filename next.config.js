/** @type {import('next').NextConfig} */

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
    ],  },  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'https://alux.space',
    NEXT_PUBLIC_UNSPLASH_ACCESS_KEY: process.env.MGCOVB5mKIixxirqfmmamrLRlykJIbc2ZDD5jo3lXbE,
  },// Using static export mode for deployment
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
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
