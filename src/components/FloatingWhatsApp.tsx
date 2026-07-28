import { WHATSAPP_URL } from "@/lib/contact";
import { usePreferences } from "@/context/PreferencesContext";

export default function FloatingWhatsApp() {
  const { language } = usePreferences();
  const label = language === "en" ? "Chat on WhatsApp" : "Chatear por WhatsApp";

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="group fixed bottom-4 right-4 z-[960] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-[#062414] shadow-[0_18px_42px_rgba(37,211,102,0.34)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#35e173] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4ff59] focus-visible:ring-offset-2 focus-visible:ring-offset-black active:translate-y-0 active:scale-95 sm:h-14 sm:w-14 md:bottom-7 md:right-7 md:h-16 md:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 blur-md transition-opacity duration-300 group-hover:opacity-55" />
      <span className="absolute inset-0 rounded-full border border-white/30" />
      <img
        src="/Assets/Body/whatsapp.svg"
        alt=""
        aria-hidden="true"
        className="relative h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8"
        loading="eager"
        decoding="async"
      />
    </a>
  );
}
