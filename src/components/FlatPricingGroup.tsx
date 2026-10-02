import { Info } from "lucide-react";
import FlatPricingCard from "@/components/FlatPricingCard";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { getWhatsAppUrl, getCustomQuoteWhatsAppMessage } from "@/lib/whatsapp";
import { solarPackages, solarPricingNotes } from "@/data/solar-packages";
import { sofaPackages, sofaPricingNotes } from "@/data/sofa-packages";
import type { ServiceCategoryId } from "@/types";

const groups = {
  solar: {
    packages: solarPackages,
    notes: solarPricingNotes,
    quoteLabel: "More than 30 panels? Get a custom quote",
  },
  sofa: {
    packages: sofaPackages,
    notes: sofaPricingNotes,
    quoteLabel: "Extra seats or a delicate fabric? Get a custom quote",
  },
} as const;

interface FlatPricingGroupProps {
  category: Extract<ServiceCategoryId, "solar" | "sofa">;
}

/**
 * The three packages, pricing notes and custom-quote action for one flat-rate
 * category. Shared by the homepage pricing tabs and the dedicated service pages
 * so prices only ever come from the data files.
 */
export default function FlatPricingGroup({ category }: FlatPricingGroupProps) {
  const group = groups[category];
  const quoteUrl = getWhatsAppUrl(getCustomQuoteWhatsAppMessage(category));

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {group.packages.map((pkg) => (
          <FlatPricingCard key={pkg.id} pkg={pkg} category={category} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-light p-5 sm:p-6">
        <div className="flex items-start gap-2.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-navy">Before you book</p>
            <ul className="mt-2 space-y-1.5">
              {group.notes.map((note) => (
                <li key={note} className="text-sm leading-relaxed text-muted">
                  {note}
                </li>
              ))}
            </ul>
            {quoteUrl && (
              <a
                href={quoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-5 py-2.5 text-sm font-semibold text-[#0D6E3A] transition-colors hover:bg-[#25D366]/20"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {group.quoteLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
