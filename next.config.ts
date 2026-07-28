import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Set NEXT_PUBLIC_BASE_PATH=/raeen-site when deploying to a GitHub Pages
  // project page; leave unset for a custom domain or local dev.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
