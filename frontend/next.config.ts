import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "geticon.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
