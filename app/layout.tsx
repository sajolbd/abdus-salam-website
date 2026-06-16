// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

import { Josefin_Sans } from "next/font/google";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import BookingModal from "components/BookingModal";
import Breadcrumbs from "components/Breadcrumbs";


const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-josefin-sans",
});

const siteUrl = "https://jihad-hasan-editor.vercel.app/";
const ogImageUrl = `${siteUrl}/opengraph-image.png`;

/* ---------------- METADATA ---------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "JihadHasan | Professional Video Editor",
  description: "Professional video editing services. Transforming raw footage into cinematic masterpieces for brands, creators, and advertising campaigns.",
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
  },
  openGraph: {
    title: "JihadHasan | Professional Video Editor",
    description: "Professional video editing services. Transforming raw footage into cinematic masterpieces for brands, creators, and advertising campaigns.",
    url: siteUrl,
    siteName: "JihadHasan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "JihadHasan Video Editor Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JihadHasan | Professional Video Editor",
    description: "Professional video editing services. Transforming raw footage into cinematic masterpieces for brands, creators, and advertising campaigns.",
    images: [ogImageUrl],
  },
};

/* ---------------- ROOT LAYOUT ---------------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={josefinSans.variable}>
      <body className="bg-[#0C0C0E] min-h-screen overflow-x-hidden">
        {/* NoScript Fallback */}
        <noscript>
          <style>
            {`
              * {
                opacity: 1 !important;
                transform: none !important;
              }
            `}
          </style>
        </noscript>

        <Navbar />
        <Breadcrumbs />
        {children}
        <Footer />
        <BookingModal />
      </body>
    </html>
  );
}

