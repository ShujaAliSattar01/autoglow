import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { servicePages, getServicePage } from "@/data/service-pages";
import { getWhatsAppUrl, getPackageWhatsAppMessage } from "@/lib/whatsapp";
import { siteUrl, businessConfig } from "@/lib/config";

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `/services/${page.slug}`,
    },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: `${siteUrl}/services/${page.slug}`,
      images: [{ url: "/images/hero-car-wash.webp", width: 1600, height: 900 }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
      images: ["/images/hero-car-wash.webp"],
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const whatsappUrl = getWhatsAppUrl(getPackageWhatsAppMessage(page.h1));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: page.h1,
    name: page.h1,
    description: page.metaDescription,
    provider: {
      "@type": "AutoRepair",
      name: businessConfig.name,
      url: siteUrl,
    },
    areaServed: {
      "@type": "City",
      name: businessConfig.serviceArea,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: page.startingPrice.replace(/[^\d]/g, ""),
      url: `${siteUrl}/services/${page.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main className="flex-1">
        <section className="bg-light py-14 sm:py-18">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-navy">{page.h1}</span>
            </nav>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {page.h1}
            </h1>

            <div className="mt-5 space-y-4">
              {page.intro.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#book"
                className="inline-flex items-center justify-center rounded-full bg-primary-strong px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-colors hover:bg-[#0559b0]"
              >
                Book Now &mdash; from {page.startingPrice}
              </Link>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-7 py-3.5 text-sm font-semibold text-[#0D6E3A] transition-colors hover:bg-[#25D366]/15"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-18">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              What&apos;s Included
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {page.included.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-light py-14 sm:py-18">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {page.whyTitle}
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {page.why.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-base font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-18">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="px-5 py-5 sm:px-6">
                  <h3 className="text-sm font-semibold text-navy sm:text-base">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-14 text-center sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Book {page.h1}?
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              See full pricing by vehicle type and book online, or message us directly on WhatsApp.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#pricing"
                className="inline-flex items-center justify-center rounded-full bg-primary-strong px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0559b0]"
              >
                View Full Pricing
              </Link>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F7A40] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B6333]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
