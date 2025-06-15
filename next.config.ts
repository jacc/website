import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "a.ltrbxd.com",
      "images-na.ssl-images-amazon.com",
      "assets.hardcover.app",
      "cdn.steamgriddb.com",
      "cdn2.steamgriddb.com",
    ],
  },
};

export default nextConfig;
