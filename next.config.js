/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['honeypot-file.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
