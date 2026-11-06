import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { FooterWrapper } from "@/components/FooterWrapper";
import { UIExtras } from "@/components/UIExtras";
import { profile } from "@/data/resume";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} · ${profile.role}`;

// The share image is src/app/opengraph-image.jpg (regenerate: node scripts/og.mjs).
export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title,
  description: profile.summary,
  openGraph: { title, description: profile.summary, type: "website", siteName: profile.name },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the saved theme and animation choice before first paint, so no loader screen is needed */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;if(localStorage.getItem("theme")==="dark")d.setAttribute("data-theme","dark");if(localStorage.getItem("motion")==="reduce")d.setAttribute("data-motion","reduce")}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-full bg-base-100 text-base-content">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-base-100 focus:text-base-content focus:rounded-lg focus:shadow-lg focus:border focus:border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <UIExtras />
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <FooterWrapper />
        </ThemeProvider>
        {/* in development it would load its debug script from a third-party CDN, which the CSP blocks */}
        {process.env.NODE_ENV === "production" && <SpeedInsights />}
      </body>
    </html>
  );
}
