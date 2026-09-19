import Link from "next/link";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function FinalCTA() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section className="relative overflow-hidden bg-navy py-10 sm:py-12 lg:py-14">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan/10" />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Ready to Give Your Car the AutoGlow Treatment?
        </h2>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          Book professional car care at your home or office.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/#book"
            className="inline-flex items-center justify-center rounded-full bg-primary-strong px-6 py-3 sm:px-7 sm:py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#0559b0]"
          >
            Book Appointment
          </Link>
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0F7A40] px-6 py-3 sm:px-7 sm:py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#0B6333]"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Us
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
