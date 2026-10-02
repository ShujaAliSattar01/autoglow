"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { serviceCategories } from "@/data/service-categories";
import SafeImage from "@/components/SafeImage";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services", hasMenu: true },
  { label: "Pricing", href: "/#pricing" },
  { label: "Monthly Plans", href: "/#monthly-plans" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Book Appointment", href: "/#book" },
  { label: "Contact", href: "/#contact" },
];

// The Services entry opens this list instead of growing the top-level bar.
const serviceLinks = [
  { label: "All Services", href: "/#services" },
  ...serviceCategories.map((category) => ({
    label: category.name,
    href: category.href,
  })),
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const whatsappUrl = getWhatsAppUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-slate-200 bg-white/95 shadow-sm backdrop-blur"
          : "border-transparent bg-white/70 backdrop-blur-sm"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="AutoGlow home">
          <SafeImage
            src="/images/autoglow-logo.webp"
            alt="AutoGlow mobile car wash and detailing logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-md object-contain"
            fallbackClassName="rounded-md"
          />
          <span className="text-lg font-bold tracking-tight text-navy">AutoGlow</span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <div key={link.href} ref={servicesRef} className="relative">
                <button
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  onClick={() => setServicesOpen((v) => !v)}
                  className="flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      servicesOpen && "rotate-180"
                    )}
                  />
                </button>
                {servicesOpen && (
                  <div className="absolute left-1/2 top-full z-50 mt-3 w-60 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                    {serviceLinks.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setServicesOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-light hover:text-primary-strong"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            )
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with AutoGlow on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#25D366] transition-colors hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          )}
          <Link
            href="/#book"
            className="rounded-full bg-primary-strong px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0559b0]"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full text-navy lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-slate-100 bg-white transition-[grid-template-rows] duration-300 ease-in-out lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary"
                  >
                    {link.label}
                  </a>
                  {link.hasMenu && (
                    <div className="ml-3 flex flex-col border-l border-slate-200 pl-3">
                      {serviceCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-primary"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <Link
                href="/#book"
                onClick={() => setOpen(false)}
                className="rounded-full bg-primary-strong px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Book Appointment
              </Link>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#0F7A40] px-5 py-3 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
