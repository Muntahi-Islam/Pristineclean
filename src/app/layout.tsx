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
    default: "PristineClean | Premium Cleaning Services",
    template: "%s | PristineClean",
  },
  description:
    "Experience premium cleaning services for residential and commercial spaces. Professional, reliable, and meticulously thorough cleaning tailored to your needs.",
  keywords: [
    "cleaning service",
    "premium cleaning",
    "residential cleaning",
    "commercial cleaning",
    "deep cleaning",
    "house cleaning",
    "office cleaning",
    "carpet cleaning",
    "window cleaning",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "PristineClean",
    title: "PristineClean | Premium Cleaning Services",
    description:
      "Experience the difference of professional premium cleaning services.",
    url: process.env.NEXT_PUBLIC_APP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "PristineClean | Premium Cleaning Services",
    description:
      "Experience the difference of professional premium cleaning services.",
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
