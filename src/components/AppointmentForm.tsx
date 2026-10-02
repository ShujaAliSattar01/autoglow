"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { appointmentSchema, type AppointmentFormValues } from "@/lib/validation";
import { vehicleOptions } from "@/data/vehicles";
import { pricingPackages } from "@/data/packages";
import { monthlyPlans } from "@/data/monthly-plans";
import { serviceCategories } from "@/data/service-categories";
import { solarPanelCountOptions, solarServiceOptions } from "@/data/solar-packages";
import {
  sofaFabricOptions,
  sofaSeatCountOptions,
  sofaServiceOptions,
  sofaTypeOptions,
} from "@/data/sofa-packages";
import { getWhatsAppUrl, getBookingWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import type { ServiceCategoryId } from "@/types";

const serviceOptionsByCategory: Record<ServiceCategoryId, string[]> = {
  car: [
    ...pricingPackages.map((pkg) => pkg.name),
    ...monthlyPlans.map((plan) => `${plan.name} (Monthly Plan)`),
  ],
  solar: solarServiceOptions,
  sofa: sofaServiceOptions,
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function AppointmentForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{
    whatsappSent: boolean;
    values: AppointmentFormValues;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      category: "car",
      fullName: "",
      phone: "",
      email: "",
      vehicleType: "sedan",
      vehicleModel: "",
      panelCount: "",
      roofAccess: "",
      sofaType: "",
      seatCount: "",
      fabricType: "",
      service: "",
      date: "",
      time: "",
      address: "",
      area: "",
      notes: "",
      website: "",
    },
  });

  // useWatch (rather than watch()) returns a value, which keeps this component
  // eligible for React Compiler memoization.
  const category = useWatch({ control, name: "category" }) ?? "car";

  // Switching category changes which package list applies, so clear the
  // previously chosen service and any stale validation messages.
  function selectCategory(next: ServiceCategoryId) {
    if (next === category) return;
    setValue("category", next);
    setValue("service", "");
    clearErrors();
  }

  // Package cards link to /#book-solar etc. The hash matches no element, so
  // preselect the category and scroll to the form here instead.
  useEffect(() => {
    const applyHash = () => {
      const match = /^#book-(car|solar|sofa)$/.exec(window.location.hash);
      if (!match) return;
      setValue("category", match[1] as ServiceCategoryId);
      setValue("service", "");
      clearErrors();
      document.getElementById("book")?.scrollIntoView({ block: "start" });
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [setValue, clearErrors]);

  async function onSubmit(values: AppointmentFormValues) {
    setSubmitError(null);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSubmitted({
        whatsappSent: Boolean(result.whatsappSent),
        values,
      });
      reset();
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    }
  }

  if (submitted) {
    const { values } = submitted;
    const summary = `${values.service} on ${values.date} at ${values.time}`;
    const whatsappMessage = getBookingWhatsAppMessage({
      category: values.category,
      service: values.service,
      date: values.date,
      time: values.time,
      vehicleType: values.vehicleType,
      vehicleModel: values.vehicleModel,
      panelCount: values.panelCount,
      sofaType: values.sofaType,
      seatCount: values.seatCount,
      fabricType: values.fabricType,
    });
    // A wa.me link only pre-fills a message for the customer to send themselves --
    // we always offer it regardless of whether the Cloud API notified the owner.
    const continueWhatsappUrl = getWhatsAppUrl(whatsappMessage);

    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-xl font-bold text-navy">Booking Request Received</h3>
        <p className="mt-2 text-sm text-muted">
          We&apos;ve received your request for <strong>{summary}</strong>. Our team will
          contact you shortly to confirm.
        </p>
        {continueWhatsappUrl && (
          <a
            href={continueWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0F7A40] px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <WhatsAppIcon className="h-4 w-4" /> Continue on WhatsApp
          </a>
        )}
        <button
          type="button"
          onClick={() => setSubmitted(null)}
          className="mt-5 block w-full text-sm font-medium text-primary hover:underline"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="appt-website">Website</label>
        <input id="appt-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        <input type="hidden" {...register("category")} />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-navy">
          What would you like cleaned? <span className="text-red-500">*</span>
        </legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {serviceCategories.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectCategory(item.id)}
                className={cn(
                  "rounded-xl border px-2 py-2.5 text-xs font-semibold transition-colors sm:px-3 sm:text-sm",
                  active
                    ? "border-primary bg-primary/5 text-primary-strong ring-1 ring-primary"
                    : "border-slate-200 bg-white text-navy hover:border-primary/30 hover:bg-slate-50"
                )}
              >
                <span className="sm:hidden">{item.shortName}</span>
                <span className="hidden sm:inline">{item.name}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id="appt-fullName" label="Full Name" required error={errors.fullName?.message}>
          <input
            id="appt-fullName"
            type="text"
            className="input"
            aria-invalid={Boolean(errors.fullName)}
            {...register("fullName")}
          />
        </Field>

        <Field id="appt-phone" label="Phone Number" required error={errors.phone?.message}>
          <input
            id="appt-phone"
            type="tel"
            className="input"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </Field>

        <Field id="appt-email" label="Email" required error={errors.email?.message}>
          <input
            id="appt-email"
            type="email"
            className="input"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>

        {category === "car" && (
          <>
            <Field
              id="appt-vehicleType"
              label="Vehicle Type"
              required
              error={errors.vehicleType?.message}
            >
              <select id="appt-vehicleType" className="input" {...register("vehicleType")}>
                {vehicleOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id="appt-vehicleModel"
              label="Vehicle Make / Model"
              required
              error={errors.vehicleModel?.message}
            >
              <input
                id="appt-vehicleModel"
                type="text"
                placeholder="e.g. Toyota Corolla"
                className="input"
                {...register("vehicleModel")}
              />
            </Field>
          </>
        )}

        {category === "solar" && (
          <>
            <Field
              id="appt-panelCount"
              label="Number of Solar Panels"
              required
              error={errors.panelCount?.message}
            >
              <select id="appt-panelCount" className="input" defaultValue="" {...register("panelCount")}>
                <option value="" disabled>
                  Select panel count
                </option>
                {solarPanelCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id="appt-roofAccess"
              label="Roof / Access Details"
              required
              error={errors.roofAccess?.message}
            >
              <input
                id="appt-roofAccess"
                type="text"
                placeholder="e.g. single storey, stairs to roof"
                className="input"
                {...register("roofAccess")}
              />
            </Field>
          </>
        )}

        {category === "sofa" && (
          <>
            <Field id="appt-sofaType" label="Sofa Type" required error={errors.sofaType?.message}>
              <select id="appt-sofaType" className="input" defaultValue="" {...register("sofaType")}>
                <option value="" disabled>
                  Select sofa type
                </option>
                {sofaTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id="appt-seatCount"
              label="Number of Seats"
              required
              error={errors.seatCount?.message}
            >
              <select id="appt-seatCount" className="input" defaultValue="" {...register("seatCount")}>
                <option value="" disabled>
                  Select number of seats
                </option>
                {sofaSeatCountOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="appt-fabricType" label="Fabric Type (if known)" error={errors.fabricType?.message}>
              <select id="appt-fabricType" className="input" defaultValue="" {...register("fabricType")}>
                <option value="">Not sure</option>
                {sofaFabricOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
          </>
        )}

        <Field id="appt-service" label="Select Service / Package" required error={errors.service?.message}>
          <select id="appt-service" className="input" {...register("service")}>
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptionsByCategory[category].map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </Field>

        <Field id="appt-date" label="Preferred Date" required error={errors.date?.message}>
          <input id="appt-date" type="date" min={todayISO()} className="input" {...register("date")} />
        </Field>

        <Field id="appt-time" label="Preferred Time" required error={errors.time?.message}>
          <input id="appt-time" type="time" className="input" {...register("time")} />
        </Field>

        <Field id="appt-address" label="Service Address" required error={errors.address?.message} full>
          <input
            id="appt-address"
            type="text"
            placeholder="House / street / landmark"
            className="input"
            {...register("address")}
          />
        </Field>

        <Field id="appt-area" label="Area" required error={errors.area?.message}>
          <input id="appt-area" type="text" placeholder="e.g. DHA Phase 6" className="input" {...register("area")} />
        </Field>

        <Field id="appt-notes" label="Additional Notes" error={errors.notes?.message} full>
          <textarea id="appt-notes" rows={3} className="input resize-none" {...register("notes")} />
        </Field>
      </div>

      {category === "solar" && (
        <p className="mt-5 rounded-lg bg-light px-4 py-3 text-xs leading-relaxed text-muted">
          Prices start from the rates shown in our packages. Safe access to the panels is
          required — we confirm access details and service eligibility with you before
          finalising a booking.
        </p>
      )}

      {category === "sofa" && (
        <p className="mt-5 rounded-lg bg-light px-4 py-3 text-xs leading-relaxed text-muted">
          Prices start from the rates shown in our packages. Delicate fabrics, heavy stains,
          oversize sofas and additional seats may require a custom quotation.
        </p>
      )}

      {submitError && (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary-strong px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0559b0] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Book AutoGlow at Your Doorstep
      </button>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #e2e8f0;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #071426;
          outline: none;
        }
        .input:focus {
          border-color: #087cf0;
          box-shadow: 0 0 0 1px #087cf0;
        }
      `}</style>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  full,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
