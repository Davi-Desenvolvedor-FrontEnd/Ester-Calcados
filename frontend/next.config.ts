import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "dltuwyly5s83r.cloudfront.net",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
