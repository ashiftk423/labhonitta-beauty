import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Intro from "@/components/Intro";
import Providers from "@/components/Providers";
import SmoothScroll from "@/components/SmoothScroll";

const display = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Labhonitta by Soumya | Bridal Makeup & Ladies Beauty Parlour — Thrissur",
  description:
    "Labhonitta by Soumya — celebrity makeup artist in Thrissur, Kerala with 20+ years of expertise and 1K+ happy brides. Bridal makeup, artist makeup, hair styling & hair treatments.",
  keywords: [
    "bridal makeup Thrissur",
    "beauty parlour Thrissur",
    "ladies salon Kerala",
    "hair treatment",
    "artist makeup",
  ],
  openGraph: {
    title: "Labhonitta by Soumya",
    description:
      "Celebrity makeup artist · 20+ years of expertise · 1K+ happy brides. Bridal & artist makeup, hair styling and treatments in Thrissur.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#faf1ec",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} light`}>
      <body className="min-h-screen overflow-x-hidden bg-bg text-cream">
        <Providers>
          <Intro />
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
