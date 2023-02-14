/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['aiffel-front-prod-asset.s3.ap-northeast-2.amazonaws.com'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  experimental: {
    webVitalsAttribution: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP']
  }
};

module.exports = nextConfig;
