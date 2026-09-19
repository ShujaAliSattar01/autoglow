import AppointmentForm from "@/components/AppointmentForm";

export default function AppointmentSection() {
  return (
    <section id="book" className="bg-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Book AutoGlow at Your Doorstep
          </h2>
          <p className="mt-3 text-base text-muted">
            Fill in your details and we&apos;ll confirm your appointment shortly.
          </p>
        </div>

        <div className="mt-12">
          <AppointmentForm />
        </div>
      </div>
    </section>
  );
}
