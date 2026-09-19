import { getWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function FinalCTA() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section className="relative overflow-hidden bg-navy py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan/10" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Give Your Car the AutoGlow Treatment?
        </h2>
        <p className="mt-4 text-base text-slate-300">
          Book professional car care at your home or office.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#0668c9]"
          >
            Book Appointment
          </a>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#1ebe5a]"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
