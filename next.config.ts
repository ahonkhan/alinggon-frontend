import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "hoirqrkdgbmvpwutwuwj.supabase.co",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "sc04.alicdn.com",
      },
      {
        protocol: "https",
        hostname: "sc01.alicdn.com",
      }
    ],
  },
};

export default nextConfig;
