import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { FooterWrapper } from "@/components/FooterWrapper";
import { PageLoader } from "@/components/PageLoader";
import { AskAILazy } from "@/components/AskAILazy";
import { UIExtras } from "@/components/UIExtras";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Passon Rattanakongton — Senior Frontend Developer",
  description: "Senior Frontend Developer based in Bangkok. React, Next.js, TypeScript, Tailwind CSS.",
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
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,800,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-full bg-base-100 bg-dot-pattern text-base-content">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-base-100 focus:text-base-content focus:rounded-lg focus:shadow-lg focus:border focus:border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <PageLoader />
          <UIExtras />
          <AskAILazy />
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <FooterWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
