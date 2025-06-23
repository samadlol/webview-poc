import type { NextConfig } from "next";
const repo = 'webview-poc';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
};

export default nextConfig;
