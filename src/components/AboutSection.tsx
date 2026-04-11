import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  Copy,
  Mail,
  ExternalLink,
  Link as LinkIcon,
  X,
  MapPin,
  Play,
  Minimize2,
  Maximize2,
} from "lucide-react";

const socials = [
  {
    id: "whatsapp",
    icon: "/Assets/Body/whatsapp.svg",
    label: "WhatsApp",
    meta: "+57 302 1133071",
    actionLabel: "Chatear ahora",
    href: "https://wa.me/573021133071",
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

const skillRows = [["PROACTIVA", "EMPÁTICA", "CREATIVA"], ["MENTALIDAD DE CRECIMIENTO"]];

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

const profileVideoId = "enHbPDw8sVc";

const buildProfileVideoSrc = (startAt = 0) => {
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    controls: "1",
  });

  if (startAt > 0) {
    params.set("start", String(startAt));
  }

  return `https://www.youtube.com/embed/${profileVideoId}?${params.toString()}`;
};

export default function AboutSection() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const socialsWrapRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  const [inView, setInView] = useState(false);
  const [profileVideoPlaying, setProfileVideoPlaying] = useState(false);
  const [inlineVideoSrc, setInlineVideoSrc] = useState<string | null>(null);
  const [floatingVideoSrc, setFloatingVideoSrc] = useState<string | null>(null);
  const [floatingOpen, setFloatingOpen] = useState(false);
  const [floatingMinimized, setFloatingMinimized] = useState(false);
  const [videoOffsetSec, setVideoOffsetSec] = useState(0);
  const [videoStartedAt, setVideoStartedAt] = useState<number | null>(null);

  const [certificateOpen, setCertificateOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openSocialId, setOpenSocialId] = useState<string | null>(null);

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

  const startInlineVideo = (startAt = 0) => {
    setFloatingOpen(false);
    setFloatingMinimized(false);
    setFloatingVideoSrc(null);
    setInlineVideoSrc(buildProfileVideoSrc(startAt));
    setProfileVideoPlaying(true);
    setVideoOffsetSec(startAt);
    setVideoStartedAt(Date.now());
  };

  const closeVideoPlayers = () => {
    setProfileVideoPlaying(false);
    setInlineVideoSrc(null);
    setFloatingOpen(false);
    setFloatingVideoSrc(null);
    setFloatingMinimized(false);
    setVideoOffsetSec(0);
    setVideoStartedAt(null);
  };

  const moveInlineToFloating = () => {
    if (!profileVideoPlaying || !inlineVideoSrc) return;

    const elapsed = videoStartedAt ? Math.max(0, Math.floor((Date.now() - videoStartedAt) / 1000)) : 0;
    const startAt = videoOffsetSec + elapsed;

    setVideoOffsetSec(startAt);
    setVideoStartedAt(Date.now());
    setProfileVideoPlaying(false);
    setInlineVideoSrc(null);
    setFloatingOpen(true);
    setFloatingMinimized(false);
    setFloatingVideoSrc(buildProfileVideoSrc(startAt));
  };

  useEffect(() => {
    if (profileVideoPlaying && !inView) {
      moveInlineToFloating();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, profileVideoPlaying]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && (profileVideoPlaying || floatingOpen)) {
        closeVideoPlayers();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [floatingOpen, profileVideoPlaying]);

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

  const onPlayButtonKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      startInlineVideo(0);
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
                className="group relative z-10 h-[274px] w-[274px] overflow-visible rounded-full shadow-[0_20px_46px_rgba(205,48,117,0.4)] md:h-[306px] md:w-[306px]"
              >
                <div
                  className="relative h-full w-full overflow-hidden rounded-full"
                  style={{ clipPath: "circle(50% at 50% 50%)" }}
                >
                  <img
                    src="/Assets/Body/FotoSara.png"
                    alt="Sara Ruiz"
                    loading="lazy"
                    decoding="async"
                    className={`h-full w-full object-cover object-[center_8%] translate-y-[5px] transition-[filter,transform,opacity] ease-out group-hover:brightness-[0.72] group-hover:saturate-[0.92] ${
                      profileVideoPlaying
                        ? "grayscale-0 scale-[1.01] opacity-0"
                        : inView
                          ? "grayscale-0 scale-[1.01] opacity-100"
                          : "grayscale scale-[1.005] opacity-100"
                    }`}
                    style={{ transitionDuration: "1600ms" }}
                  />

                  {inlineVideoSrc && (
                    <iframe
                      className={`absolute inset-0 h-full w-full scale-[1.26] transition-opacity duration-500 ${
                        profileVideoPlaying ? "opacity-100" : "opacity-0"
                      }`}
                      src={inlineVideoSrc}
                      title="Video presentación Sara Ruiz"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )}
                </div>

                {!profileVideoPlaying && (
                  <button
                    type="button"
                    onClick={() => startInlineVideo(0)}
                    onKeyDown={onPlayButtonKeyDown}
                    className="absolute inset-0 z-20 cursor-pointer rounded-full"
                    aria-label="Ver video de presentación"
                    role="button"
                    tabIndex={0}
                    title="Ver video presentación"
                  >
                    <span className="absolute inset-0 rounded-full bg-black/0 transition-colors duration-300 group-hover:bg-black/24" />

                    <span className="pointer-events-none absolute left-1/2 top-[86%] -translate-x-1/2 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] font-medium text-white/95 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Ver video presentación
                    </span>

                    <span className="absolute left-1/2 top-[73%] inline-flex h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4ff59]/90 bg-[rgba(8,8,8,0.38)] shadow-[0_14px_28px_rgba(0,0,0,0.48)] backdrop-blur-md transition-all duration-300 animate-[playHeartbeat_12.5s_ease-in-out_infinite] group-hover:animate-none group-hover:scale-110 group-hover:bg-[rgba(8,8,8,0.62)]">
                      <Play size={30} strokeWidth={2.2} className="ml-[3px] text-[#d4ff59]" />
                    </span>
                  </button>
                )}

                {profileVideoPlaying && (
                  <button
                    type="button"
                    onClick={closeVideoPlayers}
                    className="absolute right-3 top-3 z-30 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white transition-colors hover:border-white/40"
                    aria-label="Cerrar video"
                    title="Cerrar video"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex w-full max-w-[420px] flex-1 flex-col items-center">
              <div className="mt-2 flex flex-col items-center justify-center space-y-2 text-center">
                <div className="flex items-center justify-center gap-2 text-white/60">
                  <MapPin size={14} className="shrink-0 text-white/55" />
                  <span className="text-[11px] font-normal uppercase tracking-[0.22em]">Bogotá, Colombia</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-[#d4ff59]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4ff59]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.22em]">Open to work</span>
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
                            {copied ? "Copiado" : "Copiar"}
                          </button>

                          <a
                            href={social.href}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#d4ff59]/35 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d4ff59] hover:text-black"
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
                          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d4ff59]/35 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#d4ff59] hover:text-black"
                        >
                          <ExternalLink size={12} />
                          {social.actionLabel}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col">
            <h2 className="section-title">
              SOBRE <span className="section-title-accent">MÍ</span>
            </h2>

            <div className="mt-6 space-y-7 text-[15px] font-light leading-[1.52] text-white/72 md:text-[18px] xl:text-[22px]">
              <p className="max-w-[820px]">
                Diseño experiencias digitales con <span className="font-medium text-white/98">visión estratégica</span>,
                materializando ideas en <span className="font-medium text-white/98">interfaces reales y escalables</span>.
              </p>

              <p className="max-w-[820px]">
                Trabajo de forma <span className="font-medium text-white/98">estructurada e iterativa</span>, equilibrando
                <span className="font-medium text-white/98"> experiencia de usuario</span>,
                <span className="font-medium text-white/98"> objetivos del negocio</span> y
                <span className="font-medium text-white/98"> viabilidad</span> para construir soluciones con impacto
                real.
              </p>
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
                  <p className="text-[8px] font-normal uppercase tracking-[0.42em] text-white/34">Nativo</p>
                  <p className="mt-1.5 text-[13px] font-medium tracking-[0.2em] text-white">ESPAÑOL</p>
                </div>

                <div className="h-9 w-px bg-white/10" />

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-[8px] font-normal uppercase tracking-[0.42em] text-white/34">Fluidez</p>

                    <button
                      onClick={() => setCertificateOpen(true)}
                      className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/10 text-white/45 transition-colors hover:border-[#d4ff59]/35 hover:text-[#d4ff59]"
                      aria-label="Ver certificado de inglés"
                      title="Ver certificado"
                    >
                      <LinkIcon size={9} />
                    </button>
                  </div>

                  <p className="mt-1.5 text-[13px] font-medium tracking-[0.2em] text-white">INGLÉS (B2+)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {floatingOpen && floatingVideoSrc && (
        <div className="fixed bottom-5 right-4 z-[140] w-[min(92vw,420px)] md:right-6">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-[rgba(8,8,8,0.92)] shadow-[0_24px_55px_rgba(0,0,0,0.48)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">Video presentación</p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFloatingMinimized((prev) => !prev)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:text-white"
                  aria-label={floatingMinimized ? "Expandir video" : "Minimizar video"}
                  title={floatingMinimized ? "Expandir" : "Minimizar"}
                >
                  {floatingMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>

                <button
                  onClick={closeVideoPlayers}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:text-white"
                  aria-label="Cerrar video"
                  title="Cerrar"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!floatingMinimized && (
              <div className="aspect-video overflow-hidden bg-black">
                <iframe
                  className="h-full w-full"
                  src={floatingVideoSrc}
                  title="Video presentación Sara Ruiz flotante"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      )}

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
              <iframe className="h-full w-full" src={certificatePreview} title="Certificado de inglés" allow="autoplay" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
