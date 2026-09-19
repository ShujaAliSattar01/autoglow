"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { VehicleType } from "@/types";
import { defaultVehicle } from "@/data/vehicles";

interface VehicleContextValue {
  vehicle: VehicleType;
  setVehicle: (vehicle: VehicleType) => void;
}

const VehicleContext = createContext<VehicleContextValue | null>(null);

export function VehicleProvider({ children }: { children: ReactNode }) {
  const [vehicle, setVehicle] = useState<VehicleType>(defaultVehicle);
  return (
    <VehicleContext.Provider value={{ vehicle, setVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
}

export function useVehicle() {
  const ctx = useContext(VehicleContext);
  if (!ctx) throw new Error("useVehicle must be used within a VehicleProvider");
  return ctx;
}
