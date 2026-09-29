import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 for the app screenshots, so their small text stays sharp; 75 for everything else.
    qualities: [75, 90],
  },
};

export default nextConfig;
