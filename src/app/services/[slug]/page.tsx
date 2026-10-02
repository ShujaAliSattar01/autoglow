import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SafeImage from "@/components/SafeImage";
import FlatPricingGroup from "@/components/FlatPricingGroup";
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

  const image = page.image ?? "/images/hero-car-wash.webp";
  // The four original car pages already carry the brand inside page.title, so
  // only the newer pages need it appended for social cards.
  const socialTitle = page.category
    ? `${page.title} | ${businessConfig.name}`
    : page.title;

  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `/services/${page.slug}`,
    },
    openGraph: {
      title: socialTitle,
      description: page.metaDescription,
      url: `${siteUrl}/services/${page.slug}`,
      images: [{ url: image, width: 1600, height: 900 }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.metaDescription,
      images: [image],
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
      // Car care is an AutoRepair business; the solar and sofa services are
      // offered by the same local business but are not vehicle services.
      "@type": page.category ? "LocalBusiness" : "AutoRepair",
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

  // FAQ markup is added only on the newer pages so the four original car
  // service pages keep exactly the structured data they shipped with.
  const faqStructuredData = page.category
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
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

            {page.image && (
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:aspect-[21/9]">
                <SafeImage
                  src={page.image}
                  alt={page.imageAlt ?? page.h1}
                  fill
                  priority
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-cover object-center"
                />
              </div>
            )}
          </div>
        </section>

        {page.category && (
          <section className="bg-white py-14 sm:py-18">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                {page.packagesTitle ?? "Packages"}
              </h2>
              {page.packagesIntro && (
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {page.packagesIntro}
                </p>
              )}
              <div className="mt-8">
                <FlatPricingGroup category={page.category} />
              </div>
            </div>
          </section>
        )}

        <section className={`${page.category ? "bg-light" : "bg-white"} py-14 sm:py-18`}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {page.includedTitle ?? "What's Included"}
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

        {page.howItWorks && (
          <section className="bg-white py-14 sm:py-18">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                {page.howItWorksTitle ?? "How Booking Works"}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {page.howItWorks.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h3 className="text-base font-semibold text-navy">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

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

        {page.serviceArea && (
          <section className="bg-white py-14 sm:py-18">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                {page.serviceAreaTitle ?? "Service Area"}
              </h2>
              <div className="mt-5 space-y-4">
                {page.serviceArea.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={`${page.serviceArea ? "bg-light" : "bg-white"} py-14 sm:py-18`}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="px-5 py-5 sm:px-6">
                  <h3 className="text-sm font-semibold text-navy sm:text-base">{faq.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {page.related && (
          <section className="bg-white py-14 sm:py-18">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                {page.relatedTitle ?? "Related Services"}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {page.related.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-base font-semibold text-navy group-hover:text-primary-strong">
                      {item.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-navy py-14 text-center sm:py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to Book {page.h1}?
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              {page.category
                ? "Pick the package that matches your job and book online, or message us directly on WhatsApp."
                : "See full pricing by vehicle type and book online, or message us directly on WhatsApp."}
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
