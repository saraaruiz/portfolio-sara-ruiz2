import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Hero() {
  const { language } = usePreferences();
  const isEnglish = language === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const section = sectionRef.current;
      const mask = maskRef.current;
      const intro = introRef.current;
      const video = videoRef.current;
      if (!section || !mask || !intro || !video) return;

      const rect = section.getBoundingClientRect();
      const maxScroll = window.innerHeight * 1.18;
      const scrollAmount = -rect.top;
      const progress = clamp01(scrollAmount / maxScroll);

      const isMobile = window.innerWidth < 768;
      const startW = isMobile ? 92 : 85;
      const startH = isMobile ? 54 : 56;
      const startR = isMobile ? 22 : 30;
      const startTop = isMobile ? 81 : 76;

      const w = lerp(startW, 100, progress);
      const h = lerp(startH, 100, progress);
      const r = lerp(startR, 0, progress);
      const top = lerp(startTop, 50, progress);

      mask.style.setProperty("--hero-w", `${w}vw`);
      mask.style.setProperty("--hero-h", `${h}svh`);
      mask.style.setProperty("--hero-r", `${r}px`);
      mask.style.setProperty("--hero-top", `${top}%`);

      const introOpacity = Math.max(0, 1 - progress * 2.05);
      intro.style.setProperty("--hero-intro-opacity", String(introOpacity));
      intro.style.setProperty("--hero-intro-y", `${progress * -10}px`);

      const microZoom = lerp(1.02, 1.085, progress);
      const microParallax = lerp(0, -10, progress);
      video.style.setProperty("--hero-video-zoom", String(microZoom));
      video.style.setProperty("--hero-video-y", `${microParallax}px`);
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative isolate bg-black" style={{ height: "220svh" }}>
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="relative h-svh w-full">
          <div
            ref={introRef}
            className="hero-intro pointer-events-none absolute inset-x-0 top-0 z-20 px-4 text-center motion-safe:animate-[framerFadeUp_.75s_cubic-bezier(.22,1,.36,1)]"
          >
            <h1
              className="font-faith hero-gradient-text leading-none"
              style={{
                fontSize: "clamp(3.3rem, 16.2vw, 154px)",
                lineHeight: 1.14,
                paddingBottom: "0.14em",
              }}
            >
              Sara Ruiz
            </h1>

            <p
              className="mt-0.5 md:-mt-3 uppercase text-white/92"
              style={{
                fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(12px, 2.05vw, 22px)",
                letterSpacing: "clamp(0.26em, 0.48vw, 0.52em)",
              }}
            >
              {isEnglish ? "UX/UI DESIGNER" : "DISEÑADORA UX/UI"}
            </p>

            <p
              className="mt-2 text-white/76"
              style={{
                fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(11px, 1.25vw, 14px)",
                letterSpacing: "clamp(0.16em, 0.32vw, 0.38em)",
              }}
            >
              Research · Flows · Product Strategy
            </p>
          </div>

          <div className="absolute inset-0 z-10">
            <div ref={maskRef} className="hero-mask">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="hero-video absolute inset-0 h-full w-full object-cover"
              >
                <source src="/Assets/Header/VideoBanner.mp4" type="video/mp4" />
              </video>

              <div className="hero-scroll absolute bottom-9 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-10">
                <div className="hero-chevrons" aria-hidden="true">
                  <ChevronDown size={22} className="text-white/85" />
                  <ChevronDown size={22} className="-mt-3 text-white/85" />
                </div>

                <span
                  className="text-[11px] uppercase"
                  style={{
                    fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                    letterSpacing: "0.2em",
                    color: "rgba(255,255,255,0.62)",
                  }}
                >
                  {isEnglish ? "Scroll to explore" : "Desliza para ver más"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
