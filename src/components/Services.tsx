import Link from "next/link";
import {
  Droplets,
  Sparkles,
  ShieldCheck,
  Wand2,
  Cog,
  CircleDot,
  ShieldHalf,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/data/services";
import { getWhatsAppUrl, getPackageWhatsAppMessage } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Sparkles,
  ShieldCheck,
  Wand2,
  Cog,
  CircleDot,
  ShieldHalf,
  Lightbulb,
};

export default function Services() {
  return (
    <section id="services" className="bg-light py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            Everything Your Car Needs
          </h2>
          <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">
            From a quick refresh to full protection — our detailers handle it all,
            right at your doorstep.
          </p>
        </div>

        <div className="mt-8 grid sm:mt-10 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Sparkles;
            const whatsappUrl = getWhatsAppUrl(getPackageWhatsAppMessage(service.name));
            return (
              <div
                key={service.id}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy">{service.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <Link
                    href={service.href ?? "/#pricing"}
                    className="inline-flex items-center text-sm font-semibold text-primary-strong transition-colors group-hover:text-[#0559b0]"
                  >
                    {service.href ? "Learn More" : "Book Now"} &rarr;
                  </Link>
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ask about ${service.name} on WhatsApp`}
                      title="Ask on WhatsApp"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#25D366] transition-colors hover:bg-[#25D366]/10"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
