import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let raf = 0;
    let current = 0;

    const update = () => {
      const section = sectionRef.current;
      const mask = maskRef.current;
      const intro = introRef.current;
      const video = videoRef.current;

      if (!section || !mask || !intro || !video) {
        raf = requestAnimationFrame(update);
        return;
      }

      const rect = section.getBoundingClientRect();
      const maxScroll = window.innerHeight * 1.35;
      const scrollAmount = -rect.top;
      const raw = clamp01(scrollAmount / maxScroll);

      current = lerp(current, raw, 0.075);

      const w = lerp(85, 100, current);
      const h = lerp(55, 100, current);
      const r = lerp(24, 0, current);
      const top = lerp(72, 50, current);

      mask.style.width = `${w}vw`;
      mask.style.height = `${h}svh`;
      mask.style.borderRadius = `${r}px`;
      mask.style.position = "absolute";
      mask.style.left = "50%";
      mask.style.top = `${top}%`;
      mask.style.transform = "translate(-50%, -50%)";

      const introOpacity = Math.max(0, 1 - current * 2.15);
      intro.style.opacity = String(introOpacity);
      intro.style.transform = `translateY(${current * -18}px)`;

      const microZoom = lerp(1.02, 1.09, current);
      const microParallax = lerp(0, -12, current);
      video.style.transform = `scale(${microZoom}) translateY(${microParallax}px)`;

      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate bg-black"
      style={{ height: "230svh" }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <div className="relative h-svh w-full">
          <div
            ref={introRef}
            className="absolute inset-x-0 top-0 z-20 text-center pointer-events-none"
            style={{ paddingTop: "96px" }}
          >
            <h1
              className="font-faith hero-gradient-text leading-none"
              style={{
                fontSize: "clamp(3.5rem, 10vw, 143px)",
                lineHeight: 1.12,
                paddingBottom: "0.14em",
              }}
            >
              Sara Ruiz
            </h1>

            <p
              className="mt-1 uppercase text-white/92"
              style={{
                fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                fontSize: "clamp(14px, 2.5vw, 26.61px)",
                letterSpacing: "0.30em",
              }}
            >
              DISEÑADORA UX/UI
            </p>

            <p
              className="mt-1 text-white/72"
              style={{
                fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                fontSize: "clamp(12px, 1.5vw, 16px)",
                letterSpacing: "0.35em",
              }}
            >
              Research · Flows · Product Strategy
            </p>
          </div>

          <div className="absolute inset-0 z-10">
            <div
              ref={maskRef}
              className="relative overflow-hidden"
              style={{ width: "85vw", height: "55svh", borderRadius: "24px" }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
              >
                <source src="/Assets/Header/VideoBanner.mp4" type="video/mp4" />
              </video>

              <div className="video-vignette" aria-hidden="true" />

              <div className="hero-scroll absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2">
                <div className="hero-chevrons" aria-hidden="true">
                  <ChevronDown size={22} className="text-white/85" />
                  <ChevronDown size={22} className="text-white/85 -mt-3" />
                </div>

                <span
                  className="text-[11px] uppercase"
                  style={{
                    fontFamily: "Montserrat, system-ui, -apple-system, sans-serif",
                    letterSpacing: "0.22em",
                    color: "rgba(255,255,255,0.62)",
                  }}
                >
                  Desliza para ver más
                </span>
              </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute left-0 right-0 top-0 z-30 h-40"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,0) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}