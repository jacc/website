import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "a.ltrbxd.com",
      "images-na.ssl-images-amazon.com",
    ],
  },
};

export default nextConfig;
