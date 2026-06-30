import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Intro from "@/components/Intro";
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
  title: "Labhonitta Ladies Beauty Parlour | Bridal Makeup & Salon — Thrissur",
  description:
    "Award-winning bridal makeup, artist makeup, hair cutting & hair treatments in Thrissur, Kerala. A premium 3D experience by Labhonitta Ladies Beauty Parlour.",
  keywords: [
    "bridal makeup Thrissur",
    "beauty parlour Thrissur",
    "ladies salon Kerala",
    "hair treatment",
    "artist makeup",
  ],
  openGraph: {
    title: "Labhonitta Ladies Beauty Parlour",
    description: "Bridal & artist makeup, hair cutting and treatments in Thrissur.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-[#0d0610] text-cream">
        <Intro />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
