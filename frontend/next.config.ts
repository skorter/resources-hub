import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "geticon.dev",
        pathname: "/**",
        port: "",
      },
      {
        protocol: "https",
        hostname: "bennettfeely.com",
        pathname: "/clippy/pics/favicon.png",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lawsofux.com",
        pathname: "/icons/favicon.ico",
        port: "",
      },
      {
        protocol: "https",
        hostname: "react-icons.github.io",
        pathname: "/react-icons/favicon.png",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.svgrepo.com",
        pathname: "/apple-touch-icon.png",
        port: "",
      },
      {
        protocol: "https",
        hostname: "uiverse.io",
        pathname: "/favicon-32x32.png",
        port: "",
      },
      {
        protocol: "https",
        hostname: "delphi.tools",
        pathname: "/delphi-lowlod.png",
        port: "",
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
