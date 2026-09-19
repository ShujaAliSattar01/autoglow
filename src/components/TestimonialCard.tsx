"use client";

import { Star } from "lucide-react";
import SafeImage from "@/components/SafeImage";
import type { Testimonial } from "@/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const date = new Date(testimonial.created_at).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        {testimonial.image_url ? (
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200">
            <SafeImage
              src={testimonial.image_url}
              alt={testimonial.name}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {initials(testimonial.name)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-navy">{testimonial.name}</p>
          <p className="text-xs text-muted">
            {[testimonial.vehicle, testimonial.area].filter(Boolean).join(" · ") || date}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4"
            fill={i < testimonial.rating ? "#00C8FF" : "none"}
            stroke={i < testimonial.rating ? "#00C8FF" : "#cbd5e1"}
          />
        ))}
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{testimonial.review}</p>
      <p className="mt-4 text-xs text-muted">{date}</p>
    </div>
  );
}
