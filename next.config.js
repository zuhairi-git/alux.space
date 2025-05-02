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
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  },
  // Using standard server-side rendering for now to get internationalization working
  // We can switch to 'export' mode once we resolve the static generation issues
  // output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
