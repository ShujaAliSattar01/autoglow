import Link from "next/link";
import { Globe, AtSign, Mail, MapPin, Clock } from "lucide-react";
import { businessConfig } from "@/lib/config";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import SafeImage from "@/components/SafeImage";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Monthly Plans", href: "#monthly-plans" },
  { label: "Reviews", href: "#reviews" },
  { label: "Book Appointment", href: "#book" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const whatsappUrl = getWhatsAppUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-navy text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="#home" className="flex items-center gap-2">
              <SafeImage
                src="/images/autoglow-logo.png"
                alt="AutoGlow logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-md object-contain"
                fallbackClassName="rounded-md"
              />
              <span className="text-lg font-bold text-white">AutoGlow</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Premium mobile car wash &amp; detailing delivered to your doorstep.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="AutoGlow on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-primary hover:text-primary"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="AutoGlow on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-primary hover:text-primary"
              >
                <AtSign className="h-4 w-4" />
              </a>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AutoGlow on WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 text-slate-400 transition-colors hover:border-primary hover:text-primary"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {whatsappUrl && (
                <li className="flex items-start gap-2.5">
                  <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp AutoGlow
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href={`mailto:${businessConfig.contactEmail}`} className="hover:text-white">
                  {businessConfig.contactEmail}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{businessConfig.serviceArea}, Pakistan</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{businessConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          &copy; {year} AutoGlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
