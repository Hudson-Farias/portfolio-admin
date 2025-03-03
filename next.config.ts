import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: process.env.NODE_ENV === 'production' ? '/admin' : '',
  images: {
    loader: 'default',
    path: process.env.NODE_ENV === 'production' ? '/admin/_next/image' : '/_next/image'
  },
};

export default nextConfig;
