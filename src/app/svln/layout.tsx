import type { Metadata } from "next";

// Not linked from the site; keep it out of search results.
export const metadata: Metadata = { robots: { index: false } };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
