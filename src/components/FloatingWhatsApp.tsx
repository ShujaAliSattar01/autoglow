import { getWhatsAppUrl } from "@/lib/whatsapp";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function FloatingWhatsApp() {
  const whatsappUrl = getWhatsAppUrl();
  if (!whatsappUrl) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AutoGlow on WhatsApp"
      className="group fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
      style={{
        right: "max(1.25rem, env(safe-area-inset-right, 0px) + 1.25rem)",
        bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px) + 1.25rem)",
      }}
    >
      <WhatsAppIcon className="h-7 w-7" />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-navy px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat with AutoGlow
      </span>
    </a>
  );
}
