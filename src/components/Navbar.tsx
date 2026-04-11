import { useEffect, useMemo, useState } from "react";
import { Download, ExternalLink, Menu, X } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

const mobileSocials = [
  { label: "WhatsApp", href: "https://wa.me/573021133071", icon: "/Assets/Body/whatsapp.svg" },
  { label: "Email", href: "mailto:saruizdi@gmail.com", icon: "/Assets/Body/email.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sararuiz-ux-ui/", icon: "/Assets/Body/linkedin.svg" },
  { label: "Instagram", href: "https://instagram.com/saridesign__", icon: "/Assets/Body/instagram.svg" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#about");

  const { language, setLanguage, copy } = usePreferences();
  const contactLabel = language === "en" ? "Contact me" : "Contáctame";

  const navLinks = useMemo(
    () => [
      { label: copy.nav.about, href: "#about" },
      { label: copy.nav.projects, href: "#projects" },
      { label: copy.nav.services, href: "#services" },
      { label: copy.nav.career, href: "#career" },
      { label: copy.nav.testimonials, href: "#testimonials" },
      { label: contactLabel, href: "#contact" },
    ],
    [contactLabel, copy.nav.about, copy.nav.career, copy.nav.projects, copy.nav.services, copy.nav.testimonials],
  );

  const mobileChipColors = {
    background:
      "radial-gradient(120% 140% at 12% -20%, rgba(153,39,94,0.28) 0%, rgba(12,12,16,0.92) 72%)",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(14px) saturate(114%)",
    WebkitBackdropFilter: "blur(14px) saturate(114%)",
  } as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const trackableSections = ["about", "career", "services", "projects", "testimonials", "contact"] as const;

    const updateActiveByRange = () => {
      const sectionPositions = trackableSections
        .map((id) => ({ id, node: document.getElementById(id) }))
        .filter((entry): entry is { id: (typeof trackableSections)[number]; node: HTMLElement } => Boolean(entry.node))
        .map((entry) => ({ id: entry.id, top: entry.node.offsetTop }))
        .sort((a, b) => a.top - b.top);

      if (sectionPositions.length === 0) {
        setActiveHref("#about");
        return;
      }

      const probeY = window.scrollY + window.innerHeight * 0.42;
      let currentId = "about";

      for (const section of sectionPositions) {
        if (probeY >= section.top - 8) currentId = section.id;
        else break;
      }

      const nextActive = currentId === "contact" ? "" : `#${currentId}`;
      setActiveHref((previous) => (previous === nextActive ? previous : nextActive));
    };

    window.addEventListener("scroll", updateActiveByRange, { passive: true });
    window.addEventListener("resize", updateActiveByRange);
    window.addEventListener("load", updateActiveByRange);
    updateActiveByRange();

    return () => {
      window.removeEventListener("scroll", updateActiveByRange);
      window.removeEventListener("resize", updateActiveByRange);
      window.removeEventListener("load", updateActiveByRange);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isOpen || cvOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, cvOpen]);

  const shell = scrolled
    ? "text-white backdrop-blur-2xl bg-[linear-gradient(90deg,rgba(8,8,12,0.78)_0%,rgba(34,12,26,0.68)_44%,rgba(8,8,12,0.78)_100%)]"
    : "text-white backdrop-blur-xl bg-[linear-gradient(90deg,rgba(8,8,12,0.58)_0%,rgba(43,15,32,0.48)_45%,rgba(8,8,12,0.58)_100%)]";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-[1200] rounded-full bg-[#d4ff59] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black"
      >
        {copy.nav.skipToContent}
      </a>

      <header className={`fixed inset-x-0 top-0 z-[990] transition-all duration-500 ${shell}`}>
        <nav className="relative z-[995] mx-auto flex max-w-[1440px] items-center px-4 py-3 md:px-6 md:py-3.5 xl:px-8">
          <a href="#top" className="shrink-0 lg:mr-8" onClick={() => setIsOpen(false)}>
            <img src="/Assets/Header/LogoSari.png" alt="Logo Sara Ruiz" className="h-7 w-auto md:h-8" />
          </a>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link-tubelight whitespace-nowrap text-[0.98rem] font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
                      isActive ? "active text-[#d4ff59]" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="ml-auto hidden items-center gap-2.5 lg:flex">
            <button
              type="button"
              onClick={() => setCvOpen(true)}
              className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#c8ee5c] bg-[#d4ff59] px-4 text-[12px] font-semibold uppercase leading-none tracking-[0.11em] text-black shadow-[0_12px_28px_rgba(212,255,89,0.18)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#e5ff90] hover:shadow-[0_16px_34px_rgba(212,255,89,0.24)]"
              aria-label={language === "en" ? "Open CV preview" : "Abrir vista previa de CV"}
            >
              CV <ExternalLink size={13} />
            </button>

            <div className="lux-chip inline-flex h-10 items-center rounded-full p-1">
              <button
                type="button"
                aria-label={language === "en" ? "Switch to Spanish" : "Cambiar a español"}
                onClick={() => setLanguage("es")}
                className={`inline-flex h-8 items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.12em] transition-colors ${
                  language === "es" ? "bg-white/85 text-black" : "text-white/75 hover:text-white"
                }`}
              >
                ESP
              </button>
              <button
                type="button"
                aria-label={language === "en" ? "Switch to English" : "Cambiar a inglés"}
                onClick={() => setLanguage("en")}
                className={`inline-flex h-8 items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.12em] transition-colors ${
                  language === "en" ? "bg-white/85 text-black" : "text-white/75 hover:text-white"
                }`}
              >
                ENG
              </button>
            </div>
          </div>

          <button
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] text-white backdrop-blur-md lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? copy.nav.menuClose : copy.nav.menuOpen}
            type="button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[980] lg:hidden">
          <div className="absolute inset-0 bg-[rgba(6,6,9,0.76)] backdrop-blur-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(7,7,11,0.98)_0%,rgba(28,10,22,0.96)_38%,rgba(7,7,11,0.98)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(34%_60%_at_14%_0%,rgba(205,48,117,0.14),transparent_65%),radial-gradient(34%_60%_at_86%_0%,rgba(205,48,117,0.14),transparent_65%),radial-gradient(24%_40%_at_50%_0%,rgba(212,255,89,0.06),transparent_70%)]" />

          <div className="relative z-[981] flex h-full flex-col pt-[78px]">
            <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col px-7 pb-9 md:px-12">
              <div className="mx-auto mt-1 flex items-center justify-center gap-2">
                <div className="lux-chip inline-flex items-center rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setLanguage("es")}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] ${
                      language === "es" ? "bg-white text-black" : "text-white/75"
                    }`}
                  >
                    ESP
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] ${
                      language === "en" ? "bg-white text-black" : "text-white/75"
                    }`}
                  >
                    ENG
                  </button>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[680px] space-y-8 pt-8 text-center md:space-y-9">
                {navLinks.map((link) => {
                  const isActive = activeHref === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block text-center text-[1.46rem] font-semibold uppercase leading-none tracking-[0.24em] transition-colors duration-300 focus-visible:outline-none active:scale-[0.99] md:text-[1.62rem] ${
                        isActive ? "text-[#d4ff59]" : "text-white/95 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>

              <div className="mt-auto pt-10">
                <div className="mx-auto flex w-full max-w-[360px] items-center justify-center gap-3 border-t border-white/12 pt-6">
                  {mobileSocials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
                      style={mobileChipColors}
                      aria-label={social.label}
                    >
                      <img src={social.icon} alt={social.label} className="h-6 w-6 opacity-95" />
                    </a>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setCvOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#c8ee5c] bg-[#d4ff59] px-4 py-2.5 text-[11px] font-semibold uppercase leading-none tracking-[0.13em] text-black shadow-[0_10px_24px_rgba(212,255,89,0.18)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#e5ff90]"
                  >
                    CV <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {cvOpen && (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/82 px-6 backdrop-blur-sm">
          <div className="w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/12 bg-[#090909] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white/85">{language === "en" ? "Curriculum preview" : "Vista previa de hoja de vida"}</p>
              <button
                onClick={() => setCvOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/75 transition-colors hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="h-[70vh] overflow-hidden rounded-[20px] border border-white/10 bg-black">
              <iframe
                className="h-full w-full"
                src="/Assets/Header/CVSaraRuiz.pdf"
                title="CV Sara Ruiz"
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <a
                href="/Assets/Header/CVSaraRuiz.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full border border-[#d4ff59]/45 bg-[#d4ff59]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#e9ffad] transition-colors hover:bg-[#d4ff59]/25"
              >
                <Download size={13} />
                {language === "en" ? "Download" : "Descargar"}
              </a>
              <a
                href="/Assets/Header/CVSaraRuiz.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/85 transition-colors hover:text-white"
              >
                <ExternalLink size={13} />
                {language === "en" ? "Open in new tab" : "Abrir en nueva pestaña"}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
