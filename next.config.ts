import type { NextConfig } from "next";

// Bundle analyzer (dev-only) - dynamically imported to avoid issues in production
const withBundleAnalyzer = process.env.ANALYZE === "true"
  ? require("@next/bundle-analyzer")({
      enabled: true,
    })
  : (config: NextConfig) => config;

const nextConfig: NextConfig = {
  // Turbopack config for Next.js 16+
  turbopack: {},
  
  // Webpack config (only used if --webpack flag is passed)
  webpack: (config, { isServer }) => {
    // Handle mapbox-gl which uses Web Workers
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // Optimize bundle splitting for client-side chunks
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            // Separate vendor chunks
            default: false,
            vendors: false,
            // Mapbox and react-map-gl in separate chunk (heavy)
            mapbox: {
              name: "mapbox",
              test: /[\\/]node_modules[\\/](mapbox-gl|react-map-gl)[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            // React in separate chunk
            react: {
              name: "react",
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            // Other vendors
            vendor: {
              name: "vendor",
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Add remote domains if using external CDN
    remotePatterns: [
      // Example: Uncomment and configure if using Cloudinary, Imgix, etc.
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com",
      // },
    ],
  },

  // HTTP headers for caching and security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache fonts
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache buttons/assets
        source: "/buttons/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache _next/static files
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Compression
  compress: true,

  // Production source maps (optional - disable for smaller builds)
  productionBrowserSourceMaps: false,
};

export default withBundleAnalyzer(nextConfig);
