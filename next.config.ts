import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Same top-level paths as the beta site
  async redirects() {
    return [
      { source: "/retailers", destination: "/cleaners", permanent: true },
      { source: "/drivers", destination: "/drive", permanent: true },
    ];
  },
};

export default nextConfig;
