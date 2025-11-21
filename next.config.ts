import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack config for Next.js 16+
  turbopack: {},
  
  // Webpack config (only used if --webpack flag is passed)
  webpack: (config) => {
    // Handle mapbox-gl which uses Web Workers
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

export default nextConfig;
