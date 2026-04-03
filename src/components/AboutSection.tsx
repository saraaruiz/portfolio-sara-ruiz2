import { useEffect, useRef, useState } from "react";
import { Copy, Mail, ExternalLink, Link as LinkIcon, X, MapPin } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

const socials = [
  {
    id: "whatsapp",
    icon: "/Assets/Body/whatsapp.svg",
    label: "WhatsApp",
    meta: "+57 3024157219",
    href: "https://wa.me/573024157219",
  },
  {
    id: "email",
    icon: "/Assets/Body/email.svg",
    label: "Email",
    meta: "saruizdi@gmail.com",
    href: "mailto:saruizdi@gmail.com",
  },
  {
    id: "linkedin",
    icon: "/Assets/Body/linkedin.svg",
    label: "LinkedIn",
    meta: "sararuiz-ux-ui",
    href: "https://www.linkedin.com/in/sararuiz-ux-ui/",
  },
  {
    id: "instagram",
    icon: "/Assets/Body/instagram.svg",
    label: "Instagram",
    meta: "@saridesign__",
    href: "https://instagram.com/saridesign__",
  },
];

const SkillStar = () => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 24 24"
    fill="#F9F6E5"
    aria-hidden="true"
    className="shrink-0 opacity-85"
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

const certificatePreview =
  "https://drive.google.com/file/d/15khPgycybFJI1rGCRMT1AKr3ZbMZuoE6/preview";

export default function AboutSection() {
  const { language } = usePreferences();
  const isEnglish = language === "en";
  const portraitRef = useRef<HTMLDivElement>(null);
  const socialsWrapRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [inView, setInView] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openSocialId, setOpenSocialId] = useState<string | null>(null);

  const skillRows = isEnglish
    ? [["PROACTIVE", "EMPATHETIC", "CREATIVE"], ["GROWTH MINDSET"]]
    : [["PROACTIVA", "EMPÁTICA", "CREATIVA"], ["MENTALIDAD DE CRECIMIENTO"]];

  const getSocialActionLabel = (id: string) => {
    if (id === "whatsapp") return isEnglish ? "Chat now" : "Chatear ahora";
    if (id === "linkedin") return isEnglish ? "Connect" : "Conectemos";
    if (id === "instagram") return isEnglish ? "Visit" : "Visitar";
    return isEnglish ? "Open" : "Abrir";
  };

  useEffect(() => {
    const node = portraitRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (socialsWrapRef.current && !socialsWrapRef.current.contains(target)) {
        setOpenSocialId(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openSocialMenu = (id: string) => {
    clearCloseTimer();
    setOpenSocialId(id);
  };

  const scheduleSocialClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenSocialId(null);
    }, 180);
  };

  const toggleSocialMenu = (id: string) => {
    clearCloseTimer();
    setOpenSocialId((prev) => (prev === id ? null : id));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("saruizdi@gmail.com");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <section id="about" className="relative scroll-mt-28 bg-[#0a0a0a] py-16 md:py-20">
        <div className="framer-fade-up mx-auto grid max-w-[1280px] items-stretch gap-12 px-6 md:px-10 xl:grid-cols-[400px_minmax(0,1fr)] xl:gap-20 xl:px-16">
          <div className="flex h-full flex-col items-center">
            <div className="relative mb-8 flex h-[300px] w-[300px] items-center justify-center md:h-[330px] md:w-[330px]">
              <div className="about-orb-wrap" aria-hidden="true">
                <div className="about-orb about-orb-green" />
                <div className="about-orb about-orb-pink" />
                <div className="about-orb-ring" />
              </div>

              <div
                ref={portraitRef}
                className="relative z-10 h-[274px] w-[274px] overflow-visible rounded-full shadow-[0_20px_46px_rgba(205,48,117,0.4)] md:h-[306px] md:w-[306px]"
              >
                <img
                  src="/Assets/Body/FotoSara.png"
                  alt="Sara Ruiz"
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover object-top transition-[filter,transform] ease-out ${
                    inView ? "grayscale-0 scale-[1.05]" : "grayscale scale-[1.01]"
                  }`}
                  style={{ clipPath: "circle(50% at 50% 50%)", transitionDuration: "1600ms" }}
                />
              </div>
            </div>

            <div className="flex w-full max-w-[420px] flex-1 flex-col items-center">
              <div className="mt-2 flex flex-col items-center justify-center space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-white/60">
                  <MapPin size={14} className="shrink-0 text-white/55" />
                  <span className="text-[11px] font-normal uppercase tracking-[0.22em]">
                    Bogotá, Colombia
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 text-[#d4ff59]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4ff59]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em]">
                    Open to work
                  </span>
                </div>
              </div>

              <div ref={socialsWrapRef} className="mt-7 flex w-full max-w-[292px] items-center justify-center gap-2">
                {socials.map((social) => (
                  <div
                    key={social.id}
                    className="relative"
                    onMouseEnter={() => openSocialMenu(social.id)}
                    onMouseLeave={scheduleSocialClose}
                  >
                    <button
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                      aria-label={social.label}
                      aria-expanded={openSocialId === social.id}
                      aria-controls={`social-menu-${social.id}`}
                      onClick={() => toggleSocialMenu(social.id)}
                      onFocus={() => openSocialMenu(social.id)}
                      onBlur={scheduleSocialClose}
                    >
                      <img
                        src={social.icon}
                        alt={social.label}
                        loading="lazy"
                        decoding="async"
                        className="h-[23px] w-[23px] opacity-80 transition-opacity duration-300 hover:opacity-100"
                      />
                    </button>

                    <div
                      id={`social-menu-${social.id}`}
                      className={`absolute bottom-[125%] left-1/2 z-30 w-[178px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[rgba(12,12,12,0.98)] p-4 shadow-2xl backdrop-blur-[16px] transition-all duration-200 ${
                        openSocialId === social.id
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-1 opacity-0"
                      }`}
                      onMouseEnter={() => openSocialMenu(social.id)}
                      onMouseLeave={scheduleSocialClose}
                    >
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">{social.label}</p>
                      <p className="mt-2 text-xs text-white/82">{social.meta}</p>

                      {social.id === "email" ? (
                        <div className="mt-4 flex flex-col gap-2">
                          <button
                            onClick={handleCopy}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4ff59]/35 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d4ff59] hover:text-black"
                          >
                            <Copy size={12} />
                            {copied ? (isEnglish ? "Copied" : "Copiado") : isEnglish ? "Copy" : "Copiar"}
                          </button>

                          <a
                            href={social.href}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4ff59]/35 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d4ff59] hover:text-black"
                          >
                            <Mail size={12} />
                            {isEnglish ? "Quick send" : "Enviar rápido"}
                          </a>
                        </div>
                      ) : (
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d4ff59]/35 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d4ff59] hover:text-black"
                        >
                          <ExternalLink size={12} />
                          {getSocialActionLabel(social.id)}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex w-full justify-center pb-0 pt-4 md:mt-auto md:pt-6">
                <button
                  onClick={() => setVideoOpen(true)}
                  className="inline-flex w-full max-w-[292px] items-center justify-center gap-3 rounded-full border border-[#d4ff59]/25 bg-[#d4ff59]/6 px-5 py-2.5 text-[#d4ff59] transition-all duration-300 hover:bg-[#d4ff59]/12"
                >
                  <img src="/Assets/Body/VideoGreen.svg" alt="" className="h-7 w-7" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.09em]">
                    {isEnglish ? "Watch presentation video" : "Ver video presentación"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col">
            <h2 className="section-title">
              {isEnglish ? "ABOUT " : "SOBRE "}
              <span className="section-title-accent">{isEnglish ? "ME" : "MÍ"}</span>
            </h2>

            <div className="mt-6 space-y-7 text-[15px] font-light leading-[1.52] text-white/72 md:text-[18px] xl:text-[22px]">
              {isEnglish ? (
                <>
                  <p className="max-w-[820px]">
                    I design digital experiences with{" "}
                    <span className="font-medium text-white/98">strategic vision</span>, turning ideas into{" "}
                    <span className="font-medium text-white/98">real and scalable interfaces</span>.
                  </p>

                  <p className="max-w-[820px]">
                    I work in a{" "}
                    <span className="font-medium text-white/98">structured and iterative</span> way, balancing
                    <span className="font-medium text-white/98"> user experience</span>,
                    <span className="font-medium text-white/98"> business goals</span>, and
                    <span className="font-medium text-white/98"> feasibility</span> to build solutions with real impact.
                  </p>
                </>
              ) : (
                <>
                  <p className="max-w-[820px]">
                    Diseño experiencias digitales con <span className="font-medium text-white/98">visión estratégica</span>,
                    materializando ideas en{" "}
                    <span className="font-medium text-white/98">interfaces reales y escalables</span>.
                  </p>

                  <p className="max-w-[820px]">
                    Trabajo de forma <span className="font-medium text-white/98">estructurada e iterativa</span>,
                    equilibrando
                    <span className="font-medium text-white/98"> experiencia de usuario</span>,
                    <span className="font-medium text-white/98"> objetivos del negocio</span> y
                    <span className="font-medium text-white/98"> viabilidad</span> para construir soluciones con impacto
                    real.
                  </p>
                </>
              )}
            </div>

            <div className="mt-12 w-full max-w-[840px] space-y-5 pt-5 pb-5">
              <div className="flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-3 px-1 md:flex-nowrap md:justify-center md:gap-x-5 md:px-2">
                <SkillStar />
                {skillRows[0].flatMap((skill) => [
                  <span
                    key={`${skill}-label`}
                    className="text-[12px] font-light uppercase tracking-[0.28em] text-[#F199B9] sm:text-[13px] sm:tracking-[0.34em] md:text-[15px] md:tracking-[0.44em]"
                  >
                    {skill}
                  </span>,
                  <SkillStar key={`${skill}-star`} />,
                ])}
              </div>

              <div className="flex w-full items-center justify-center px-1 md:px-2">
                <div className="inline-flex w-full max-w-[680px] items-center justify-between gap-3">
                  <SkillStar />

                  <span className="flex-1 text-center text-[12px] font-light uppercase tracking-[0.28em] text-[#F199B9] sm:text-[13px] sm:tracking-[0.35em] md:text-[15px] md:tracking-[0.5em]">
                    {skillRows[1][0]}
                  </span>

                  <SkillStar />
                </div>
              </div>
            </div>

            <div className="lux-glass language-glass mt-8 w-full max-w-[840px] rounded-[22px] px-8 py-2 md:mt-auto">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5">
                <div className="text-center">
                  <p className="text-[8px] font-normal uppercase tracking-[0.42em] text-white/34">{isEnglish ? "Native" : "Nativo"}</p>
                  <p className="mt-1.5 text-[13px] font-medium tracking-[0.2em] text-white">{isEnglish ? "SPANISH" : "ESPAÑOL"}</p>
                </div>

                <div className="h-9 w-px bg-white/10" />

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-[8px] font-normal uppercase tracking-[0.42em] text-white/34">{isEnglish ? "Fluency" : "Fluidez"}</p>

                    <button
                      onClick={() => setCertificateOpen(true)}
                      className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/10 text-white/45 transition-colors hover:border-[#d4ff59]/35 hover:text-[#d4ff59]"
                      aria-label={isEnglish ? "View English certificate" : "Ver certificado de inglés"}
                      title={isEnglish ? "View certificate" : "Ver certificado"}
                    >
                      <LinkIcon size={9} />
                    </button>
                  </div>

                  <p className="mt-1.5 text-[13px] font-medium tracking-[0.2em] text-white">{isEnglish ? "ENGLISH (B2+)" : "INGLÉS (B2+)"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {videoOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white/80">{isEnglish ? "Presentation video" : "Video presentación"}</p>
              <button
                onClick={() => setVideoOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-[22px]">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/dBjgAdOgkYk"
                title={isEnglish ? "Sara Ruiz presentation video" : "Video presentación Sara Ruiz"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {certificateOpen && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white/80">{isEnglish ? "English certificate" : "Certificado de inglés"}</p>
              <button
                onClick={() => setCertificateOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="h-[70vh] overflow-hidden rounded-[22px] bg-black">
              <iframe
                className="h-full w-full"
                src={certificatePreview}
                title={isEnglish ? "English certificate" : "Certificado de inglés"}
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
