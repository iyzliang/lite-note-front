import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  reactStrictMode: true,
  compress: true,
  // Tailwind v4 支持
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
