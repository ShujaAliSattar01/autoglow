"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Star, ImagePlus, Loader2 } from "lucide-react";
import {
  reviewSchema,
  type ReviewFormValues,
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_SIZE_BYTES,
} from "@/lib/validation";
import type { Testimonial } from "@/types";

interface AddReviewModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (testimonial: Testimonial) => void;
}

export default function AddReviewModal({ open, onClose, onSuccess }: AddReviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { name: "", vehicle: "", area: "", rating: 0, review: "", website: "" },
  });

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- resets form state after close animation */
    if (!open) {
      reset();
      setImageFile(null);
      setImagePreview(null);
      setImageError(null);
      setSubmitError(null);
      setHoverRating(0);
      setRating(0);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [open, reset]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  if (!open) return null;

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setImageError(null);
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setImageError("Please upload a JPG, PNG or WEBP image.");
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setImageError("Image must be smaller than 4MB.");
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function onSubmit(values: ReviewFormValues) {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("vehicle", values.vehicle ?? "");
      formData.append("area", values.area ?? "");
      formData.append("rating", String(values.rating));
      formData.append("review", values.review);
      formData.append("website", values.website ?? "");
      if (imageFile) formData.append("image", imageFile);

      const response = await fetch("/api/testimonials", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        setSubmitError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      onSuccess(result.testimonial as Testimonial);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-review-title"
        tabIndex={-1}
        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl outline-none sm:p-7"
      >
        <div className="flex items-start justify-between">
          <h2 id="add-review-title" className="text-xl font-bold text-navy">
            Add Your Review
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close review form"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-navy"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4" noValidate>
          {/* Honeypot field -- hidden from real users, catches simple bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <div>
            <label htmlFor="review-name" className="text-sm font-medium text-navy">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="review-name"
              type="text"
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              aria-invalid={Boolean(errors.name)}
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="review-vehicle" className="text-sm font-medium text-navy">
                Vehicle
              </label>
              <input
                id="review-vehicle"
                type="text"
                placeholder="e.g. Honda Civic"
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                {...register("vehicle")}
              />
            </div>
            <div>
              <label htmlFor="review-area" className="text-sm font-medium text-navy">
                City / Area
              </label>
              <input
                id="review-area"
                type="text"
                placeholder="e.g. DHA Lahore"
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                {...register("area")}
              />
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-navy">
              Rating <span className="text-red-500">*</span>
            </span>
            <div
              role="radiogroup"
              aria-label="Star rating"
              className="mt-1.5 flex items-center gap-1"
              onMouseLeave={() => setHoverRating(0)}
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const filled = (hoverRating || rating) >= value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    onMouseEnter={() => setHoverRating(value)}
                    onFocus={() => setHoverRating(value)}
                    onClick={() => {
                      setRating(value);
                      setValue("rating", value, { shouldValidate: true });
                    }}
                    className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Star
                      className="h-7 w-7"
                      fill={filled ? "#00C8FF" : "none"}
                      stroke={filled ? "#00C8FF" : "#cbd5e1"}
                    />
                  </button>
                );
              })}
            </div>
            {errors.rating && (
              <p className="mt-1 text-xs text-red-600">{errors.rating.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="review-text" className="text-sm font-medium text-navy">
              Review <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review-text"
              rows={4}
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm text-navy outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              aria-invalid={Boolean(errors.review)}
              {...register("review")}
            />
            {errors.review && (
              <p className="mt-1 text-xs text-red-600">{errors.review.message}</p>
            )}
          </div>

          <div>
            <span className="text-sm font-medium text-navy">Customer Image (optional)</span>
            <div className="mt-1.5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3.5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:border-primary hover:text-primary"
              >
                <ImagePlus className="h-4 w-4" /> Upload photo
              </button>
              <input
                ref={fileInputRef}
                id="review-image"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
                onChange={handleImageChange}
                aria-describedby="review-image-help"
              />
              {imagePreview && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Selected preview"
                  className="h-12 w-12 rounded-lg object-cover"
                />
              )}
            </div>
            <p id="review-image-help" className="mt-1 text-xs text-muted">
              JPG, PNG or WEBP, up to 4MB.
            </p>
            {imageError && <p className="mt-1 text-xs text-red-600">{imageError}</p>}
          </div>

          {submitError && (
            <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
              {submitError}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0668c9] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
