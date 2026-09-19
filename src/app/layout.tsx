import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { businessConfig } from "@/lib/config";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://autoglow.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AutoGlow | Mobile Car Wash & Detailing in Lahore",
    template: "%s | AutoGlow",
  },
  description:
    "Professional doorstep car wash and detailing services in Lahore. Book exterior washing, interior cleaning, complete detailing, polishing and ceramic protection with AutoGlow.",
  keywords: [
    "car wash Lahore",
    "mobile car wash",
    "car detailing Lahore",
    "doorstep car wash",
    "ceramic coating Lahore",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName: "AutoGlow",
    title: "AutoGlow | Mobile Car Wash & Detailing in Lahore",
    description:
      "Professional doorstep car wash and detailing services in Lahore. Book exterior washing, interior cleaning, complete detailing, polishing and ceramic protection.",
    images: [{ url: "/images/hero-car-wash.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoGlow | Mobile Car Wash & Detailing in Lahore",
    description:
      "Professional doorstep car wash and detailing services in Lahore, delivered directly to your home or office.",
    images: ["/images/hero-car-wash.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: businessConfig.name,
  description:
    "Premium mobile car wash and detailing service delivering professional car care to homes and offices in Lahore.",
  areaServed: businessConfig.serviceArea,
  email: businessConfig.contactEmail,
  openingHours: "Mo-Su 09:00-21:00",
  url: siteUrl,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-navy font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
