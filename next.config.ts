import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // experimental: {
  //   cacheComponents: true,
  // },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
