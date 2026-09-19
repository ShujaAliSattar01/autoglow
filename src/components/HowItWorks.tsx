import { CalendarClock, Car, ListChecks, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Service",
    description: "Select the service or package your vehicle needs.",
    icon: ListChecks,
  },
  {
    number: "02",
    title: "Pick a Time",
    description: "Choose your preferred appointment date and time.",
    icon: CalendarClock,
  },
  {
    number: "03",
    title: "We Come to You",
    description: "Our detailing team arrives at your home or office.",
    icon: Car,
  },
  {
    number: "04",
    title: "Enjoy the Glow",
    description: "Your vehicle is cleaned, detailed and ready to shine.",
    icon: Sparkles,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-4xl">
            Car Care Without Leaving Home
          </h2>
          <p className="mt-2 text-sm text-muted sm:mt-3 sm:text-base">
            A simple, four-step process from booking to a spotless car.
          </p>
        </div>

        <div className="relative mt-8 grid sm:mt-10 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-9 left-0 right-0 hidden h-px bg-slate-200 lg:block" />
          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-start">
              <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                <step.icon className="h-7 w-7 text-primary" />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
