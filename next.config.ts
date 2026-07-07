import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath: isProd && !isVercel ? "/digital-agency" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
