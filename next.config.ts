import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF when a browser supports it, falling back to WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
