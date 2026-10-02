"use client";

import { useEffect, useState } from "react";
import { pricingPackages } from "@/data/packages";
import { serviceCategories } from "@/data/service-categories";
import { useVehicle } from "@/components/VehicleContext";
import VehicleSelector from "@/components/VehicleSelector";
import PricingCard from "@/components/PricingCard";
import FlatPricingGroup from "@/components/FlatPricingGroup";
import { cn } from "@/lib/utils";
import type { ServiceCategoryId } from "@/types";

const subheadings: Record<ServiceCategoryId, string> = {
  car: "Select your vehicle type to see accurate pricing for every package.",
  solar: "Solar panel cleaning is priced by the number of panels on your roof.",
  sofa: "Sofa cleaning is priced by the number of seats or your sofa type.",
};

export default function PricingSection() {
  const { vehicle } = useVehicle();
  const [category, setCategory] = useState<ServiceCategoryId>("car");

  // "View Packages" links elsewhere on the site point at /#pricing-solar etc.
  // The hash matches no element, so select the tab and scroll here instead.
  useEffect(() => {
    const applyHash = () => {
      const match = /^#pricing-(car|solar|sofa)$/.exec(window.location.hash);
      if (!match) return;
      setCategory(match[1] as ServiceCategoryId);
      document.getElementById("pricing")?.scrollIntoView({ block: "start" });
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section id="pricing" className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">
            {subheadings[category]}
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Choose a service to see its pricing"
          className="mx-auto mt-6 flex max-w-xl gap-1.5 rounded-full border border-slate-200 bg-light p-1.5 sm:mt-8"
        >
          {serviceCategories.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`pricing-tab-${item.id}`}
                aria-selected={active}
                aria-controls={`pricing-panel-${item.id}`}
                onClick={() => setCategory(item.id)}
                className={cn(
                  "min-w-0 flex-1 rounded-full px-2 py-2.5 text-xs font-semibold transition-colors sm:px-4 sm:text-sm",
                  active
                    ? "bg-primary-strong text-white shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-primary-strong"
                )}
              >
                <span className="sm:hidden">{item.shortName}</span>
                <span className="hidden sm:inline">{item.name}</span>
              </button>
            );
          })}
        </div>

        {category === "car" && (
          <div
            role="tabpanel"
            id="pricing-panel-car"
            aria-labelledby="pricing-tab-car"
            className="mt-8"
          >
            <VehicleSelector />
            <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {pricingPackages.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} vehicle={vehicle} />
              ))}
            </div>
          </div>
        )}

        {category === "solar" && (
          <div
            role="tabpanel"
            id="pricing-panel-solar"
            aria-labelledby="pricing-tab-solar"
            className="mt-8 sm:mt-10"
          >
            <FlatPricingGroup category="solar" />
          </div>
        )}

        {category === "sofa" && (
          <div
            role="tabpanel"
            id="pricing-panel-sofa"
            aria-labelledby="pricing-tab-sofa"
            className="mt-8 sm:mt-10"
          >
            <FlatPricingGroup category="sofa" />
          </div>
        )}
      </div>
    </section>
  );
}
