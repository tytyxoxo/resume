import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Content-Security-Policy",
          value: "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;",
        },
      ],
    },
  ],
};

export default nextConfig;
