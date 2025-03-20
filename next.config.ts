import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const isAnalyzeEnabled = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { dev, isServer }) => {
    // Optimize webpack cache serialization
    if (!dev) {
      config.cache = {
        ...config.cache,
        type: "filesystem",
        cacheDirectory: ".next/cache",
        // Store large strings as Buffers
        serialize: {
          buffer: true, // Use Buffer for large strings
        },
      };
    }
    return config;
  },
};

// Configure the bundle analyzer
const analyzedConfig = withBundleAnalyzer({
  enabled: isAnalyzeEnabled,
})(nextConfig);

export default analyzedConfig;
