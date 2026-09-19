"use client";

import { motion } from "framer-motion";
import { Home, Wrench, FlaskConical, UserCheck, ReceiptText, CalendarCheck2 } from "lucide-react";

const benefits = [
  {
    title: "Doorstep Convenience",
    description: "No driving, no queues. We come to your home or office at a time that suits you.",
    icon: Home,
  },
  {
    title: "Professional Equipment",
    description: "Our team uses proper detailing equipment for a consistent, high-quality finish.",
    icon: Wrench,
  },
  {
    title: "Quality Products",
    description: "We use trusted car care products suited to your vehicle's paint and interior.",
    icon: FlaskConical,
  },
  {
    title: "Trained Detailers",
    description: "Every technician is trained on proper technique to keep your car looking its best.",
    icon: UserCheck,
  },
  {
    title: "Transparent Pricing",
    description: "Clear, upfront pricing by vehicle type — no surprises when the job is done.",
    icon: ReceiptText,
  },
  {
    title: "Easy Booking",
    description: "Book online or on WhatsApp in minutes, with flexible date and time slots.",
    icon: CalendarCheck2,
  },
];

export default function WhyAutoGlow() {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Why AutoGlow</h2>
          <p className="mt-3 text-base text-slate-300">
            The details that make doorstep car care simple, reliable and worth it.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{benefit.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
