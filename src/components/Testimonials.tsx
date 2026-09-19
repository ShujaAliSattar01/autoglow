"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Plus, CheckCircle2 } from "lucide-react";
import TestimonialCard from "@/components/TestimonialCard";
import { seedTestimonials } from "@/data/testimonials-seed";
import type { Testimonial } from "@/types";

// Deferred: only needed once a visitor opens the review form.
const AddReviewModal = dynamic(() => import("@/components/AddReviewModal"), {
  ssr: false,
});

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(seedTestimonials);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  const loadTestimonials = useCallback(async () => {
    try {
      const response = await fetch("/api/testimonials", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data.testimonials)) {
        setTestimonials(data.testimonials);
      }
    } catch {
      // Keep showing seed testimonials on network failure.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadTestimonials();
  }, [loadTestimonials]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  function closeModal() {
    setModalOpen(false);
    addButtonRef.current?.focus();
  }

  function handleSuccess(testimonial: Testimonial) {
    setTestimonials((prev) => [testimonial, ...prev]);
    setModalOpen(false);
    setToast("Thanks! Your review has been posted.");
    addButtonRef.current?.focus();
  }

  return (
    <section id="reviews" className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
              Loved by Car Owners
            </h2>
            <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">
              Real feedback from customers across Lahore.
            </p>
          </div>
          <button
            ref={addButtonRef}
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-strong px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0559b0]"
          >
            <Plus className="h-4 w-4" /> Add Your Review
          </button>
        </div>

        <div
          aria-busy={loading}
          className="mt-8 grid sm:mt-10 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {modalOpen && (
        <AddReviewModal open={modalOpen} onClose={closeModal} onSuccess={handleSuccess} />
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-medium text-white shadow-lg"
        >
          <CheckCircle2 className="h-4 w-4 text-cyan" />
          {toast}
        </div>
      )}
    </section>
  );
}
