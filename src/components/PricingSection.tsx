"use client";

import { pricingPackages } from "@/data/packages";
import { useVehicle } from "@/components/VehicleContext";
import VehicleSelector from "@/components/VehicleSelector";
import PricingCard from "@/components/PricingCard";

export default function PricingSection() {
  const { vehicle } = useVehicle();

  return (
    <section id="pricing" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 text-base text-muted">
            Select your vehicle type to see accurate pricing for every package.
          </p>
        </div>

        <div className="mt-8">
          <VehicleSelector />
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingPackages.map((pkg) => (
            <PricingCard key={pkg.id} pkg={pkg} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
