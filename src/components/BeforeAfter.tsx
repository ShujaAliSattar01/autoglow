"use client";

import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";

const examples = [
  {
    id: "exterior",
    label: "Exterior Detailing",
    before: "/images/before-after/exterior-before.png",
    after: "/images/before-after/exterior-after.png",
  },
  {
    id: "interior",
    label: "Interior Deep Clean",
    before: "/images/before-after/interior-before.png",
    after: "/images/before-after/interior-after.png",
  },
  {
    id: "ceramic",
    label: "Ceramic Protection",
    before: "/images/before-after/ceramic-before.png",
    after: "/images/before-after/ceramic-after.png",
  },
];

export default function BeforeAfter() {
  return (
    <section className="bg-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            See the Difference
          </h2>
          <p className="mt-3 text-base text-muted">
            Real results from our detailing work around Lahore.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {examples.map((example, i) => (
            <motion.div
              key={example.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="grid grid-cols-2">
                <div className="relative aspect-square">
                  <SafeImage
                    src={example.before}
                    alt={`${example.label} — before`}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-navy/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Before
                  </span>
                </div>
                <div className="relative aspect-square">
                  <SafeImage
                    src={example.after}
                    alt={`${example.label} — after`}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-cover object-center"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    After
                  </span>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm font-semibold text-navy">{example.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
