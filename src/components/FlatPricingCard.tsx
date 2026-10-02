import { CheckCircle2, Sun, Sofa } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { cn, formatPKR } from "@/lib/utils";
import { getWhatsAppUrl, getFlatPackageWhatsAppMessage } from "@/lib/whatsapp";
import type { FlatPricingPackage, ServiceCategoryId } from "@/types";

const icons = {
  solar: Sun,
  sofa: Sofa,
} as const;

interface FlatPricingCardProps {
  pkg: FlatPricingPackage;
  category: Extract<ServiceCategoryId, "solar" | "sofa">;
}

/**
 * Pricing card for services quoted from a flat starting rate (solar panels,
 * sofas) rather than by vehicle type. Deliberately image-free so the promo
 * artwork never sits behind this much text.
 */
export default function FlatPricingCard({ pkg, category }: FlatPricingCardProps) {
  const Icon = icons[category];
  const highlighted = Boolean(pkg.badge);
  const whatsappUrl = getWhatsAppUrl(
    getFlatPackageWhatsAppMessage(category, pkg.name, pkg.scope)
  );

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6",
        highlighted ? "border-primary ring-1 ring-primary" : "border-slate-200"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        {pkg.badge && (
          <span className="rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan">
            {pkg.badge}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold text-navy">{pkg.name}</h3>
      <p className="mt-1.5 inline-flex w-fit rounded-full border border-slate-200 bg-light px-2.5 py-1 text-xs font-semibold text-primary-strong">
        {pkg.scope}
      </p>
      <p className="mt-2.5 text-sm leading-relaxed text-muted">{pkg.description}</p>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="text-xs font-medium text-muted">Starting from</span>
        <span className="text-2xl font-bold text-navy">{formatPKR(pkg.price)}</span>
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
        {/* A plain anchor (not Link) so an on-page hash change actually fires
            hashchange and the booking form preselects this category. */}
        <a
          href={`/#book-${category}`}
          className={cn(
            "inline-flex flex-1 items-center justify-center rounded-full px-4 py-3 text-sm font-semibold transition-colors",
            highlighted
              ? "bg-primary-strong text-white hover:bg-[#0559b0]"
              : "border border-slate-200 text-navy hover:border-primary/30 hover:text-primary"
          )}
        >
          {pkg.ctaLabel}
        </a>
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
  );
}
