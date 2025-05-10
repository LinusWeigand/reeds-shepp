/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const repoName = "reeds-shepp";

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  output: "export",

  basePath: isProd ? `/${repoName}` : "",

  assetPrefix: isProd ? `/${repoName}/` : "",
};

export default nextConfig;
