"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { addOnServices } from "@/data/add-ons";

export default function AddOnServices() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Individual Services &amp; Add-Ons
          </h2>
          <p className="mt-3 text-base text-muted">
            Need just one thing done? Add any of these on their own or alongside a package.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {addOnServices.map((addon, i) => (
            <motion.div
              key={addon.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
              className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-light px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Plus className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-navy">{addon.name}</span>
              </div>
              <span className="shrink-0 text-sm font-semibold text-primary">
                {addon.priceLabel}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Add-on prices may vary based on vehicle size and condition and will be confirmed before service.
        </p>
      </div>
    </section>
  );
}
