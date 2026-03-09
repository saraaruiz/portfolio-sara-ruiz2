import { useEffect, useMemo, useRef, useState } from "react";
import { Copy, Mail, ExternalLink, Link as LinkIcon, X, MapPin } from "lucide-react";

const socials = [
  {
    id: "whatsapp",
    icon: "/Assets/Body/whatsapp.svg",
    label: "WhatsApp",
    meta: "+57 3024157219",
    actionLabel: "Chatear ahora",
    href: "https://wa.me/573024157219",
  },
  {
    id: "email",
    icon: "/Assets/Body/email.svg",
    label: "Email",
    meta: "saruizdi@gmail.com",
    actionLabel: "Enviar rápido",
    href: "mailto:saruizdi@gmail.com",
  },
  {
    id: "linkedin",
    icon: "/Assets/Body/linkedin.svg",
    label: "LinkedIn",
    meta: "sararuiz-ux-ui",
    actionLabel: "Conectemos",
    href: "https://www.linkedin.com/in/sararuiz-ux-ui/",
  },
  {
    id: "instagram",
    icon: "/Assets/Body/instagram.svg",
    label: "Instagram",
    meta: "@saridesign__",
    actionLabel: "Visitar",
    href: "https://instagram.com/saridesign__",
  },
];

const skills = [
  "PROACTIVA",
  "EMPÁTICA",
  "CREATIVA",
  "RESOLUTIVA",
  "ESTRATÉGICA",
  "ANALÍTICA",
  "MENTALIDAD DE CRECIMIENTO",
];

const certificatePreview =
  "https://drive.google.com/file/d/15khPgycybFJI1rGCRMT1AKr3ZbMZuoE6/preview";

export default function AboutSection() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const node = portraitRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("saruizdi@gmail.com");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const skillNodes = useMemo(
    () =>
      skills.map((skill, index) => (
        <div key={skill} className="flex items-center gap-3">
          <span
            className="uppercase text-[#F199B9]"
            style={{
              fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
              fontWeight: 300,
              fontSize: "15px",
              letterSpacing: "0.13em",
              lineHeight: 1,
            }}
          >
            {skill}
          </span>

          {index < skills.length - 1 && (
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="#F9F6E5"
              aria-hidden="true"
              className="shrink-0 opacity-90"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          )}
        </div>
      )),
    []
  );

  return (
    <>
      <section id="about" className="relative bg-[#0a0a0a] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1280px] gap-20 px-6 md:px-10 xl:grid-cols-[400px_minmax(0,1fr)] xl:gap-32 xl:px-16">
          {/* LEFT COLUMN */}
          <div className="flex flex-col items-center xl:items-start">
            <div className="relative mb-10 flex h-[350px] w-[350px] items-center justify-center md:h-[390px] md:w-[390px]">
              <div className="about-orb-wrap" aria-hidden="true">
                <div className="about-orb about-orb-green" />
                <div className="about-orb about-orb-pink" />
                <div className="about-orb-ring" />
              </div>

              <div
                ref={portraitRef}
                className="relative z-10 h-[325px] w-[325px] overflow-visible rounded-full md:h-[360px] md:w-[360px]"
              >
                <img
                  src="/Assets/Body/FotoSara.png"
                  alt="Sara Ruiz"
                  className={`h-full w-full object-cover object-top transition-[filter,transform] duration-[1800ms] ease-out ${
                    inView ? "grayscale-0 scale-[1.015]" : "grayscale"
                  }`}
                  style={{
                    clipPath: "circle(50% at 50% 50%)",
                  }}
                />
              </div>
            </div>

            <div className="w-full max-w-[420px]">
              <div className="space-y-2 pl-1">
                <div className="flex items-center gap-3 text-white/55">
                  <MapPin size={14} className="shrink-0 text-white/55" />
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                      fontWeight: 300,
                      fontSize: "11px",
                      letterSpacing: "0.22em",
                    }}
                  >
                    Bogotá, Colombia
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[#d4ff59]">
                  <span className="h-2 w-2 rounded-full bg-[#d4ff59] animate-pulse" />
                  <span
                    className="uppercase"
                    style={{
                      fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                      fontWeight: 600,
                      fontSize: "11px",
                      letterSpacing: "0.22em",
                    }}
                  >
                    Open to work
                  </span>
                </div>
              </div>

              {/* socials aligned higher */}
              <div className="mt-8 flex items-center gap-4 pl-1">
                {socials.map((social) => (
                  <div key={social.id} className="group relative">
                    <button
                      className="inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.02] transition-all duration-300 hover:border-[#d4ff59]/35 hover:bg-white/[0.05]"
                      aria-label={social.label}
                    >
                      <img src={social.icon} alt={social.label} className="h-5 w-5 opacity-90" />
                    </button>

                    <div className="pointer-events-none absolute bottom-[125%] left-1/2 z-30 w-[176px] -translate-x-1/2 rounded-2xl border border-white/10 bg-[rgba(12,12,12,0.98)] p-4 opacity-0 shadow-2xl backdrop-blur-[15px] transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-white/38">
                        {social.label}
                      </p>
                      <p className="mt-2 text-xs text-white/82">{social.meta}</p>

                      {social.id === "email" ? (
                        <div className="mt-4 flex flex-col gap-2">
                          <button
                            onClick={handleCopy}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4ff59]/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d4ff59] hover:text-black"
                          >
                            <Copy size={12} />
                            {copied ? "Copiado" : "Copiar"}
                          </button>

                          <a
                            href={social.href}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4ff59]/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d4ff59] hover:text-black"
                          >
                            <Mail size={12} />
                            Enviar rápido
                          </a>
                        </div>
                      ) : (
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d4ff59]/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d4ff59] hover:text-black"
                        >
                          <ExternalLink size={12} />
                          {social.actionLabel}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* separate presentation button */}
              <button
                onClick={() => setVideoOpen(true)}
                className="mt-9 inline-flex items-center gap-4 rounded-full border border-[#d4ff59]/22 bg-[#d4ff59]/4 px-6 py-4 text-[#d4ff59] transition-all duration-300 hover:bg-[#d4ff59]/10"
              >
                <img src="/Assets/Body/VideoGreen.svg" alt="" className="h-9 w-9" />
                <span
                  style={{
                    fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                >
                  Ver video presentación
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col">
            <h2
              className="mb-10 uppercase leading-none"
              style={{
                fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                fontWeight: 500,
                fontSize: "clamp(56px, 6.2vw, 90px)",
                letterSpacing: "-0.03em",
                color: "#F7F3EA",
              }}
            >
              SOBRE <span className="text-[#F199B9]">MÍ</span>
            </h2>

            <div
              className="space-y-9 text-white/84"
              style={{
                fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                fontWeight: 300,
                fontSize: "clamp(22px, 2vw, 32px)",
                lineHeight: 1.52,
              }}
            >
              <p className="max-w-[830px]">
                Diseño experiencias digitales con{" "}
                <span className="font-medium text-[#F199B9]">visión estratégica</span>, materializando ideas en{" "}
                <span className="font-medium text-[#F199B9]">interfaces reales y escalables</span>.
              </p>

              <p className="max-w-[830px]">
                Trabajo de forma{" "}
                <span className="font-medium text-[#F199B9]">estructurada e iterativa</span>, equilibrando{" "}
                <span className="font-medium text-[#F199B9]">experiencia de usuario</span>,{" "}
                <span className="font-medium text-[#F199B9]">objetivos del negocio</span> y{" "}
                <span className="font-medium text-[#F199B9]">viabilidad</span> para construir soluciones con impacto real.
              </p>
            </div>

            <div className="mt-12 flex max-w-[900px] flex-wrap gap-x-6 gap-y-6">
              {skillNodes}
            </div>

            {/* smaller, higher language box */}
            <div className="mt-10 w-full max-w-[730px] rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] px-8 py-4 backdrop-blur-[20px]">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
                <div className="text-center">
                  <p
                    className="uppercase text-white/30"
                    style={{
                      fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                      fontWeight: 400,
                      fontSize: "8px",
                      letterSpacing: "0.45em",
                    }}
                  >
                    Nativo
                  </p>
                  <p
                    className="mt-2 text-white"
                    style={{
                      fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      letterSpacing: "0.18em",
                    }}
                  >
                    ESPAÑOL
                  </p>
                </div>

                <div className="h-11 w-px bg-white/10" />

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <p
                      className="uppercase text-white/30"
                      style={{
                        fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                        fontWeight: 400,
                        fontSize: "8px",
                        letterSpacing: "0.45em",
                      }}
                    >
                      Fluidez
                    </p>

                    <button
                      onClick={() => setCertificateOpen(true)}
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 text-white/45 transition-colors hover:border-[#d4ff59]/35 hover:text-[#d4ff59]"
                      aria-label="Ver certificado de inglés"
                      title="Ver certificado"
                    >
                      <LinkIcon size={10} />
                    </button>
                  </div>

                  <p
                    className="mt-2 text-white"
                    style={{
                      fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      letterSpacing: "0.18em",
                    }}
                  >
                    INGLÉS (B2+)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {videoOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white/80">Video presentación</p>
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
                src="https://www.youtube.com/embed/urnHh5QM6b4"
                title="Video presentación Sara Ruiz"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {certificateOpen && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="w-full max-w-4xl overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white/80">Certificado de inglés</p>
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
                title="Certificado de inglés"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}