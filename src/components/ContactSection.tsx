import { Mail, MapPin, Clock } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function ContactSection() {
  const whatsappUrl = getWhatsAppUrl();

  const items = [
    {
      icon: Mail,
      label: "Email",
      value: businessConfig.contactEmail,
      href: `mailto:${businessConfig.contactEmail}`,
    },
    {
      icon: MapPin,
      label: "Service Area",
      value: businessConfig.serviceArea,
      href: null,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: businessConfig.hours,
      href: null,
    },
  ];

  return (
    <section id="contact" className="bg-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">Get In Touch</h2>
          <p className="mt-3 text-base text-muted">
            Reach out with any questions, or book directly online.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#25D366]/15 text-[#128C4A]">
                <WhatsAppIcon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-navy">WhatsApp</p>
              <p className="mt-1 text-sm text-[#128C4A]">WhatsApp AutoGlow &rarr;</p>
            </a>
          )}

          {items.map((item) => {
            const Content = (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm font-semibold text-navy">{item.label}</p>
                <p className="mt-1 text-sm text-muted">{item.value}</p>
              </>
            );
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                {Content}
              </a>
            ) : (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-6">
                {Content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
