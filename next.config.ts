import type { NextConfig } from "next";

// 'unsafe-eval' is only needed by React's development tooling.
const csp = [
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  devIndicators: false,
  // The old pages now live in the home journey; keep links that were shared working.
  // ponytail: 307 until the owner confirms the old pages are gone for good, then `permanent: true`.
  redirects: async () => [
    { source: "/portfolio", destination: "/#work", permanent: false },
    { source: "/contact", destination: "/#contact", permanent: false },
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: [{ key: "Content-Security-Policy", value: csp }],
    },
  ],
};

export default nextConfig;
