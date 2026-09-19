import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { cn, formatPKR } from "@/lib/utils";
import { getWhatsAppUrl, getPackageWhatsAppMessage } from "@/lib/whatsapp";
import type { PricingPackage, VehicleType } from "@/types";

interface PricingCardProps {
  pkg: PricingPackage;
  vehicle: VehicleType;
}

export default function PricingCard({ pkg, vehicle }: PricingCardProps) {
  const highlighted = Boolean(pkg.badge);
  const whatsappUrl = getWhatsAppUrl(getPackageWhatsAppMessage(pkg.name, vehicle));

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-lg",
        highlighted ? "border-primary ring-2 ring-primary" : "border-slate-200"
      )}
    >
      <div className="relative aspect-square w-full shrink-0 bg-gradient-to-b from-light to-white">
        <SafeImage
          src={pkg.image}
          alt={`${pkg.name} service in Lahore by AutoGlow`}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
          className="object-contain p-4"
        />
        {pkg.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan">
            {pkg.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold text-navy">{pkg.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{pkg.description}</p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-navy">{formatPKR(pkg.prices[vehicle])}</span>
          {pkg.duration && <span className="text-xs text-muted">{pkg.duration}</span>}
        </div>

        <ul className="mt-5 flex-1 space-y-2.5">
          {pkg.included.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-2">
          <Link
            href="/#book"
            className={cn(
              "inline-flex flex-1 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors",
              highlighted
                ? "bg-primary-strong text-white hover:bg-[#0559b0]"
                : "border border-slate-200 text-navy hover:border-primary/30 hover:text-primary"
            )}
          >
            {pkg.ctaLabel}
          </Link>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Ask about ${pkg.name} on WhatsApp`}
              title="Ask on WhatsApp"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[#0D6E3A] transition-colors hover:bg-[#25D366]/20"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
