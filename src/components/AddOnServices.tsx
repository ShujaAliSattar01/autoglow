import { Plus } from "lucide-react";
import { addOnServices } from "@/data/add-ons";

export default function AddOnServices() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            Individual Services &amp; Add-Ons
          </h2>
          <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">
            Need just one thing done? Add any of these on their own or alongside a package.
          </p>
        </div>

        <div className="mt-6 grid sm:mt-8 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {addOnServices.map((addon) => (
            <div
              key={addon.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-light px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Plus className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-navy">{addon.name}</span>
              </div>
              <span className="shrink-0 text-sm font-semibold text-primary-strong">
                {addon.priceLabel}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Add-on prices may vary based on vehicle size and condition and will be confirmed before service.
        </p>
      </div>
    </section>
  );
}
