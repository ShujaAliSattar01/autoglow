import AppointmentForm from "@/components/AppointmentForm";

export default function AppointmentSection() {
  return (
    <section id="book" className="bg-light py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            Book AutoGlow at Your Doorstep
          </h2>
          <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">
            Fill in your details and we&apos;ll confirm your appointment shortly.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
