import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/components/providers/AppProviders";
import SocialSidebar from "@/components/layout/SocialSidebar/SocialSidebar";
import { FloatingActionButtons } from "@/components/layout/FloatingActionButtons/FloatingActionButtons";
import { BookingDrawer } from "@/components/booking/BookingDrawer/BookingDrawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CityCalls | Trusted Home & Professional Services in Ghaziabad",
  description:
    "CityCalls is Ghaziabad's premier marketplace for trusted, background-verified home services. Book AC repair, deep cleaning, pest control, salon at home, and more in under 60 minutes.",
  keywords: [
    "home services",
    "appliance repair",
    "pest control",
    "deep cleaning",
    "sofa cleaning",
    "salon at home",
    "Ghaziabad services",
    "CityCalls",
  ],
  authors: [{ name: "CityCalls" }],
  openGraph: {
    title: "CityCalls — Fast & Reliable Home Services",
    description:
      "Verified professionals. Transparent pricing. Doorstep service across Ghaziabad in under 60 minutes. Book your service today.",
    type: "website",
    siteName: "CityCalls",
  },
  twitter: {
    card: "summary_large_image",
    title: "CityCalls | Trusted Home Services",
    description: "Ghaziabad's top-rated home services marketplace. Book AC repair, cleaning, pest control and more instantly.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppProviders>
          {children}

          {/* Global floating UI — shown on every page. */}
          <SocialSidebar />
          <FloatingActionButtons />
          <BookingDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
