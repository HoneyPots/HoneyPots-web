/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['d1e3ghmypsjap8.cloudfront.net'],
  },
};

module.exports = nextConfig;
