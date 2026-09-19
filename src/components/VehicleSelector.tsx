"use client";

import { Car, CarFront, Truck, Bus } from "lucide-react";
import { vehicleOptions } from "@/data/vehicles";
import { useVehicle } from "@/components/VehicleContext";
import { cn } from "@/lib/utils";
import type { VehicleType } from "@/types";

const icons: Record<VehicleType, typeof Car> = {
  hatchback: Car,
  sedan: CarFront,
  crossover: Truck,
  suv: Bus,
};

export default function VehicleSelector() {
  const { vehicle, setVehicle } = useVehicle();

  return (
    <div
      role="radiogroup"
      aria-label="Select your vehicle type"
      className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {vehicleOptions.map((option) => {
        const Icon = icons[option.id];
        const active = vehicle === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setVehicle(option.id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-center transition-all",
              active
                ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary"
                : "border-slate-200 bg-white hover:border-primary/30 hover:bg-slate-50"
            )}
          >
            <Icon className={cn("h-6 w-6", active ? "text-primary" : "text-slate-500")} />
            <span className={cn("text-sm font-semibold", active ? "text-primary-strong" : "text-navy")}>
              {option.label}
            </span>
            <span className="text-xs text-muted">{option.description}</span>
          </button>
        );
      })}
    </div>
  );
}
