import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  cacheComponents: false,
  partialPrefetching: false,
};

export default nextConfig;
