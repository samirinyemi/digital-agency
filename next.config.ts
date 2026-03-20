import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath: isProd ? "/digital-agency" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
