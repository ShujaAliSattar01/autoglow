import type { VehicleOption } from "@/types";

export const vehicleOptions: VehicleOption[] = [
  { id: "hatchback", label: "Hatchback", description: "Compact city cars" },
  { id: "sedan", label: "Sedan", description: "Saloon & family cars" },
  { id: "crossover", label: "Crossover", description: "Compact SUVs" },
  { id: "suv", label: "SUV / 7-Seater", description: "Large SUVs & vans" },
];

export const defaultVehicle = "sedan" as const;
