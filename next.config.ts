import withBundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const isAnalyzeEnabled = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  /* config options here */
};

// Configure the bundle analyzer
const analyzedConfig = withBundleAnalyzer({
  enabled: isAnalyzeEnabled,
})(nextConfig);

export default analyzedConfig;
