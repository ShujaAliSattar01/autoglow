"use client";

import { pricingPackages } from "@/data/packages";
import { useVehicle } from "@/components/VehicleContext";
import VehicleSelector from "@/components/VehicleSelector";
import PricingCard from "@/components/PricingCard";

export default function PricingSection() {
  const { vehicle } = useVehicle();

  return (
    <section id="pricing" className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">
            Select your vehicle type to see accurate pricing for every package.
          </p>
        </div>

        <div className="mt-8">
          <VehicleSelector />
        </div>

        <div className="mt-8 grid sm:mt-10 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPackages.map((pkg) => (
            <PricingCard key={pkg.id} pkg={pkg} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
