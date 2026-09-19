"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { monthlyPlans } from "@/data/monthly-plans";
import { useVehicle } from "@/components/VehicleContext";
import { cn, formatPKR } from "@/lib/utils";
import { getWhatsAppUrl, getMonthlyPlanWhatsAppMessage } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function MonthlyPlans() {
  const { vehicle } = useVehicle();

  return (
    <section id="monthly-plans" className="bg-light py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            Keep the Glow All Month
          </h2>
          <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">
            Subscribe to a monthly plan and skip the hassle of booking every wash.
          </p>
        </div>

        <div className="mt-8 grid sm:mt-10 gap-6 md:grid-cols-3">
          {monthlyPlans.map((plan) => {
            const highlighted = Boolean(plan.badge);
            const whatsappUrl = getWhatsAppUrl(getMonthlyPlanWhatsAppMessage(plan.name, vehicle));
            return (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col rounded-2xl border bg-white p-5 sm:p-7 shadow-sm transition-shadow hover:shadow-lg",
                  highlighted ? "border-primary ring-2 ring-primary" : "border-slate-200"
                )}
              >
                {plan.badge && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-navy px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-lg font-bold text-navy">{plan.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{plan.description}</p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-navy">
                    {formatPKR(plan.prices[vehicle])}
                  </span>
                  <span className="text-sm text-muted">/month</span>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.included.map((item) => (
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
                    {plan.ctaLabel}
                  </Link>
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ask about ${plan.name} on WhatsApp`}
                      title="Ask on WhatsApp"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[#0D6E3A] transition-colors hover:bg-[#25D366]/20"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
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
