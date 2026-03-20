import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath: "/digital-agency",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
