import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-ace06bc8e29145f6bac2d895c26b5043.r2.dev",
      },
    ],
  },
};

export default nextConfig;
