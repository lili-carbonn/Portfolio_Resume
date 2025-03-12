import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/api/media/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/uploads/**',
      },
    ],
    unoptimized: true,
  },
  // Serve static files from the uploads directory
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*',
      },
    ];
  },
  // Configure static file serving
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  // Configure static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : '',
  // Configure static folder
  distDir: '.next',
  // Configure public directory
  publicRuntimeConfig: {
    staticFolder: '/uploads',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@payload-config': path.join(__dirname, 'payload.config.js'),
    };
    return config;
  },
};

export default withPayload(nextConfig);
