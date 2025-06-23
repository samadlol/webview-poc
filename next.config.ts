import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'export',
  // Replace with your repo name
  basePath: '/webview-poc',
  assetPrefix: '/webview-poc/',
};

export default nextConfig;
