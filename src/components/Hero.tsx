"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import SafeImage from "@/components/SafeImage";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const trustIndicators = [
  "Doorstep Service",
  "Professional Equipment",
  "Premium Products",
  "Easy Booking",
];

export default function Hero() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section id="home" className="relative overflow-hidden bg-light">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            Premium Mobile Car Care in Lahore
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-[3.25rem]">
            Your Car Deserves the <span className="text-primary">AutoGlow</span> Treatment.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Professional car wash and detailing delivered directly to your home
            or office. No queues. No waiting rooms. Just a cleaner, brighter car.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#book"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition-colors hover:bg-[#0668c9]"
            >
              Book Your Wash
            </a>
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-7 py-3.5 text-sm font-semibold text-[#128C4A] transition-colors hover:bg-[#25D366]/15"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
              </a>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
            {trustIndicators.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
            <div>
              <dt className="sr-only">Cars serviced</dt>
              <dd className="text-2xl font-bold text-navy sm:text-3xl">500+</dd>
              <p className="mt-1 text-xs text-muted sm:text-sm">Cars Serviced</p>
            </div>
            <div>
              <dt className="sr-only">Customer rating</dt>
              <dd className="text-2xl font-bold text-navy sm:text-3xl">4.9/5</dd>
              <p className="mt-1 text-xs text-muted sm:text-sm">Customer Rating</p>
            </div>
            <div>
              <dt className="sr-only">Doorstep service</dt>
              <dd className="text-2xl font-bold text-navy sm:text-3xl">100%</dd>
              <p className="mt-1 text-xs text-muted sm:text-sm">Doorstep Service</p>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 bg-light shadow-xl shadow-slate-900/5 lg:aspect-[4/3]">
            <SafeImage
              src="/images/hero-car-wash.png"
              alt="AutoGlow technicians washing a car at a customer's home in Lahore"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-lg sm:block">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Fully Mobile
            </p>
            <p className="mt-1 text-sm font-medium text-navy">We come to you, anywhere in Lahore</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
