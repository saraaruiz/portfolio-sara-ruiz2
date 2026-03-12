import { useEffect, useRef, useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Sobre mí", href: "#about" },
  { label: "Carrera", href: "#career" },
  { label: "Servicios", href: "#services" },
  { label: "Proyectos", href: "#projects" },
  { label: "Testimonios", href: "#testimonials" },
];

const mobileSocials = [
  { label: "WhatsApp", href: "https://wa.me/573024157219", icon: "/Assets/Body/whatsapp.svg" },
  { label: "Email", href: "mailto:saruizdi@gmail.com", icon: "/Assets/Body/email.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sararuiz-ux-ui/", icon: "/Assets/Body/linkedin.svg" },
  { label: "Instagram", href: "https://instagram.com/saridesign__", icon: "/Assets/Body/instagram.svg" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCvTip, setShowCvTip] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#about");

  const tipTimeoutRef = useRef<number | null>(null);

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
    const getSection = (id: string) => document.getElementById(id);

    const updateActiveByRange = () => {
      const career = getSection("career");
      const services = getSection("services");
      const projects = getSection("projects");
      const testimonials = getSection("testimonials");
      const contact = getSection("contact");

      if (!career || !services || !projects || !testimonials || !contact) {
        setActiveHref("#about");
        return;
      }

      const probeY = window.scrollY + window.innerHeight * 0.42;
      const tolerance = 8;

      let nextActive = "#about";

      if (probeY >= contact.offsetTop - tolerance) {
        nextActive = "";
      } else if (probeY >= testimonials.offsetTop - tolerance) {
        nextActive = "#testimonials";
      } else if (probeY >= projects.offsetTop - tolerance) {
        nextActive = "#projects";
      } else if (probeY >= services.offsetTop - tolerance) {
        nextActive = "#services";
      } else if (probeY >= career.offsetTop - tolerance) {
        nextActive = "#career";
      }

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
    return () => {
      if (tipTimeoutRef.current) window.clearTimeout(tipTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const showTooltipTemporarily = () => {
    setShowCvTip(true);
    if (tipTimeoutRef.current) window.clearTimeout(tipTimeoutRef.current);
    tipTimeoutRef.current = window.setTimeout(() => setShowCvTip(false), 1700);
  };

  const handleCvClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const isTouchLike = window.matchMedia("(hover: none)").matches;
    if (isTouchLike && !showCvTip) {
      event.preventDefault();
      showTooltipTemporarily();
    }
  };

  const shell = scrolled
    ? "text-white border-b border-white/10 backdrop-blur-xl bg-[linear-gradient(90deg,rgba(8,8,12,0.96)_0%,rgba(34,12,26,0.9)_44%,rgba(8,8,12,0.96)_100%)]"
    : "text-white backdrop-blur-md bg-[linear-gradient(90deg,rgba(8,8,12,0.78)_0%,rgba(43,15,32,0.64)_45%,rgba(8,8,12,0.78)_100%)]";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[990] transition-all duration-500 ${shell}`}>
        <nav className="relative z-[995] mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3 md:px-10 md:py-3.5 xl:px-16">
          <a href="#top" className="shrink-0" onClick={() => setIsOpen(false)}>
            <img src="/Assets/Header/LogoSari.png" alt="Logo Sara Ruiz" className="h-7 w-auto md:h-8" />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;

              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link-tubelight text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-300 ${
                      isActive ? "active text-[#d4ff59]" : "text-white/75 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="group relative">
              <a
                href="/Assets/Header/CVSaraRuiz.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={handleCvClick}
                onFocus={() => setShowCvTip(true)}
                onBlur={() => setShowCvTip(false)}
                className="lux-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white"
              >
                CV <ExternalLink size={14} />
              </a>

              <div
                className={`pointer-events-none absolute left-1/2 top-[120%] z-20 w-max -translate-x-1/2 rounded-md border border-white/10 bg-black/90 px-3 py-1.5 text-[11px] text-white/75 backdrop-blur-md transition-all duration-200 ${
                  showCvTip ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                }`}
              >
                Se abre en nueva pestaña
              </div>
            </div>

            <a href="#contact" className="btn-cta">
              Hablemos
            </a>
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.04)] text-white backdrop-blur-md lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            type="button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-[980] lg:hidden">
          {/* Fondo mobile más denso para que no se lea la página detrás */}
          <div className="absolute inset-0 bg-[rgba(6,6,9,0.76)] backdrop-blur-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(7,7,11,0.98)_0%,rgba(28,10,22,0.96)_38%,rgba(7,7,11,0.98)_100%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(34%_60%_at_14%_0%,rgba(205,48,117,0.14),transparent_65%),radial-gradient(34%_60%_at_86%_0%,rgba(205,48,117,0.14),transparent_65%),radial-gradient(24%_40%_at_50%_0%,rgba(212,255,89,0.06),transparent_70%)]" />

          {/* Panel debajo de la barra fija */}
          <div className="relative z-[981] flex h-full flex-col pt-[78px]">
            <div className="mx-auto flex h-full w-full max-w-[1280px] flex-col px-7 pb-9 md:px-12">
              <div className="mx-auto w-full max-w-[680px] space-y-8 pt-6 text-center md:space-y-9">
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
                  <div className="relative">
                    <a
                      href="/Assets/Header/CVSaraRuiz.pdf"
                      target="_blank"
                      rel="noreferrer"
                      onClick={handleCvClick}
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white transition-colors duration-300 hover:text-white"
                      style={mobileChipColors}
                    >
                      CV <ExternalLink size={14} />
                    </a>

                    <div
                      className={`pointer-events-none absolute left-1/2 top-[120%] z-20 w-max -translate-x-1/2 rounded-md border border-white/10 bg-black px-3 py-1.5 text-[11px] text-white/78 transition-all duration-200 ${
                        showCvTip ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                      }`}
                    >
                      Se abre en nueva pestaña
                    </div>
                  </div>

                  <a href="#contact" onClick={() => setIsOpen(false)} className="btn-cta">
                    Hablemos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}