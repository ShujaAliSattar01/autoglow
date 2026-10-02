import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { businessConfig, siteUrl } from "@/lib/config";
import { serviceCategories } from "@/data/service-categories";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AutoGlow | Mobile Car Wash & Car Detailing in Lahore",
    template: "%s | AutoGlow",
  },
  description:
    "Book professional doorstep cleaning in Lahore with AutoGlow: mobile car wash and detailing, solar panel cleaning and sofa cleaning. Exterior washing, interior deep cleaning, polishing, waxing and ceramic protection.",
  keywords: [
    "mobile car wash Lahore",
    "car wash at home Lahore",
    "doorstep car wash Lahore",
    "car detailing Lahore",
    "mobile car detailing Lahore",
    "interior car cleaning Lahore",
    "ceramic coating Lahore",
    "car polish Lahore",
    "solar panel cleaning Lahore",
    "sofa cleaning Lahore",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: siteUrl,
    siteName: "AutoGlow",
    title: "AutoGlow | Mobile Car Wash & Car Detailing in Lahore",
    description:
      "Book professional doorstep cleaning in Lahore: mobile car wash and detailing, solar panel cleaning and sofa cleaning.",
    images: [{ url: "/images/hero-car-wash.webp", width: 1600, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoGlow | Mobile Car Wash & Car Detailing in Lahore",
    description:
      "Professional mobile car wash and detailing, solar panel cleaning and sofa cleaning in Lahore, delivered directly to your home or office.",
    images: ["/images/hero-car-wash.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  verification: {
    google: "Pwe-3RYuPfiFnDG63DUs4WIIrVYhcgnfN752pIqP9gA",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: businessConfig.name,
  description:
    "Premium doorstep cleaning service in Lahore, Pakistan: mobile car wash and detailing, solar panel cleaning and sofa cleaning, delivered to homes and offices.",
  areaServed: {
    "@type": "City",
    name: businessConfig.serviceArea,
  },
  email: businessConfig.contactEmail,
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
  image: `${siteUrl}/images/hero-car-wash.webp`,
  logo: `${siteUrl}/images/autoglow-logo.webp`,
  url: siteUrl,
  priceRange: "Rs 500 - Rs 21999",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AutoGlow Doorstep Services in Lahore",
    itemListElement: serviceCategories.map((category) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: category.name,
        description: category.description,
        url: `${siteUrl}${category.href}`,
      },
    })),
  },
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
