import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tori's Cleaning Service | Professional Cleaning in Houston",
    template: "%s | Tori's Cleaning Service",
  },
  description:
    "Professional cleaning services for residential and commercial spaces in the Houston, TX area. Reliable, thorough, and tailored to your needs.",
  keywords: [
    "cleaning service",
    "professional cleaning",
    "residential cleaning",
    "commercial cleaning",
    "deep cleaning",
    "house cleaning",
    "office cleaning",
    "carpet cleaning",
    "window cleaning",
    "Houston cleaning",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tori's Cleaning Service",
    title: "Tori's Cleaning Service | Professional Cleaning in Houston",
    description:
      "Professional cleaning services for residential and commercial spaces in the Houston, TX area.",
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tori's Cleaning Service | Professional Cleaning in Houston",
    description:
      "Professional cleaning services for residential and commercial spaces in the Houston, TX area.",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-warm-50 antialiased">{children}</body>
    </html>
  );
}
