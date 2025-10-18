import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ezedin Ebrahim - Full Stack Developer Portfolio",
    template: "%s | Ezedin Ebrahim",
  },
  description:
    "Full-stack developer specializing in React, Next.js, Node.js, and cloud solutions. View my projects, experience, and get in touch for collaboration opportunities.",
  keywords: [
    "Ezedin Ebrahim",
    "Full Stack Developer",
    "React Developer",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Ezedin Ebrahim" }],
  creator: "Ezedin Ebrahim",
  metadataBase: new URL("https://ezedin.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ezedin.me",
    title: "Ezedin Ebrahim - Full Stack Developer Portfolio",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and cloud solutions.",
    siteName: "Ezedin Ebrahim Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ezedin Ebrahim - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ezedin Ebrahim - Full Stack Developer Portfolio",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and cloud solutions.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#1f2937",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="application-name" content="Ezedin Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ezedin Portfolio" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
