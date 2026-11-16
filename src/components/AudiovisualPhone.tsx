import { useEffect, useRef, useState } from "react";
import { Bookmark, Film, Heart, MessageCircle, Send, Volume2, VolumeX } from "lucide-react";

import { usePreferences } from "@/context/PreferencesContext";

/**
 * DATOS — edita aquí.
 * Los videos viven en /public/Assets/Audiovisual/<marca>/.
 */
type Avatar = { src: string; bg: string; style: React.CSSProperties };
type Brand = { name: string; from: string; to: string; avatar: Avatar };

// Cada avatar es la imagen recortada dentro de una máscara circular (posición/zoom en %)
const BRANDS: Record<string, Brand> = {
  selecto: {
    name: "Selecto Barbershop",
    from: "#f59e0b",
    to: "#b45309",
    avatar: { src: "/Assets/Audiovisual/selecto/logo.png", bg: "#fff", style: { width: "130%", left: "-15%", top: "7%" } },
  },
  dlmd: {
    name: "Dra. Luz Marina Díaz",
    from: "#ec4899",
    to: "#9333ea",
    avatar: { src: "/Assets/Audiovisual/dlmd/avatar.webp", bg: "#fff", style: { width: "187%", left: "-45%", top: "-30%" } },
  },
  saludpedia: {
    name: "Saludpedia",
    from: "#22d3ee",
    to: "#2563eb",
    avatar: { src: "/Assets/Audiovisual/saludpedia/avatar.jpg", bg: "#c2410c", style: { width: "100%", left: "0%", top: "-6%" } },
  },
  ecoce: {
    name: "ECOCE",
    from: "#4ade80",
    to: "#15803d",
    avatar: { src: "/Assets/Audiovisual/ecoce/logo.jpg", bg: "#5a9a1f", style: { width: "100%", left: "0%", top: "0%" } },
  },
};

type Reel = {
  brand: keyof typeof BRANDS;
  titleEs: string;
  titleEn: string;
  src: string;
  tools: string[];
};

const REELS: Reel[] = [
  {
    brand: "selecto",
    titleEs: "Reel comercial",
    titleEn: "Commercial reel",
    src: "/Assets/Audiovisual/selecto/reel-comercial.mov",
    tools: ["Higgsfield", "Edición"],
  },
  {
    brand: "dlmd",
    titleEs: "El futuro de tu piel",
    titleEn: "The future of your skin",
    src: "/Assets/Audiovisual/dlmd/el-futuro-de-tu-piel.mp4",
    tools: ["Higgsfield", "ElevenLabs", "Edición"],
  },
  {
    brand: "dlmd",
    titleEs: "Renovación clínica",
    titleEn: "Clinic renewal",
    src: "/Assets/Audiovisual/dlmd/renovacion-clinica.mp4",
    tools: ["Higgsfield", "ElevenLabs", "Edición"],
  },
  {
    brand: "saludpedia",
    titleEs: "Teleorientación",
    titleEn: "Tele-guidance",
    src: "/Assets/Audiovisual/saludpedia/teleorientacion.mp4",
    tools: ["Fotografía y video", "Edición"],
  },
  {
    brand: "ecoce",
    titleEs: "Economía circular",
    titleEn: "Circular economy",
    src: "/Assets/Audiovisual/ecoce/economia-circular.mp4",
    tools: ["Higgsfield", "Magnific", "Edición"],
  },
  {
    brand: "ecoce",
    titleEs: "Reciclable",
    titleEn: "Recyclable",
    src: "/Assets/Audiovisual/ecoce/reciclable.mp4",
    tools: ["Higgsfield", "Magnific", "Edición"],
  },
];

function ReelItem({
  reel,
  muted,
  isEnglish,
  index,
  total,
}: {
  reel: Reel;
  muted: boolean;
  isEnglish: boolean;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [missing, setMissing] = useState(false);
  const [liked, setLiked] = useState(false);
  const brand = BRANDS[reel.brand];

  // Reproduce solo el reel que está a la vista
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.6 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full shrink-0 snap-start snap-always overflow-hidden bg-black">
      {missing ? (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 text-center text-white"
          style={{ background: `linear-gradient(160deg, ${brand.from}, ${brand.to})` }}
        >
          <Film size={28} />
          <p className="text-xs font-semibold">{isEnglish ? "Video coming soon" : "Video próximamente"}</p>
        </div>
      ) : (
        <video
          ref={ref}
          src={reel.src}
          loop
          muted={muted}
          playsInline
          preload={index < 2 ? "auto" : "metadata"}
          onError={() => setMissing(true)}
          onClick={(e) => {
            const v = e.currentTarget;
            if (v.paused) void v.play();
            else v.pause();
          }}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="absolute bottom-24 right-3 z-10 flex flex-col items-center gap-4 text-white">
        <button onClick={() => setLiked((l) => !l)} aria-label="Like">
          <Heart size={24} className={liked ? "fill-rose-500 text-rose-500" : ""} />
        </button>
        <MessageCircle size={24} />
        <Send size={23} />
        <Bookmark size={23} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 pb-8 pr-14 text-white">
        <div className="flex items-center gap-2">
          <span
            className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white/80"
            style={{ background: brand.avatar.bg }}
          >
            <img src={brand.avatar.src} alt="" className="absolute max-w-none" style={brand.avatar.style} />
          </span>
          <span className="text-[13px] font-semibold">{brand.name}</span>
        </div>
        <p className="mt-2 text-[13px] leading-tight">{isEnglish ? reel.titleEn : reel.titleEs}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {reel.tools.map((t) => (
            <span key={t} className="rounded-full bg-white/18 px-2 py-0.5 text-[10px] font-medium backdrop-blur-md">
              {t}
            </span>
          ))}
        </div>
        <p className="mt-3 text-[10px] text-white/60">
          {index + 1} / {total}
        </p>
      </div>
    </div>
  );
}

export default function AudiovisualPhone() {
  const { language } = usePreferences();
  const isEnglish = language === "en";
  const [muted, setMuted] = useState(true);
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = feedRef.current;
      if (!el) return;
      if (e.key === "ArrowDown") el.scrollBy({ top: el.clientHeight, behavior: "smooth" });
      if (e.key === "ArrowUp") el.scrollBy({ top: -el.clientHeight, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center py-2">
      <div className="relative aspect-[9/19] h-[min(78svh,720px)] max-w-full rounded-[48px] border-[3px] border-zinc-600 bg-zinc-900 p-[9px] shadow-[0_30px_80px_rgba(0,0,0,0.65),inset_0_0_0_2px_rgba(255,255,255,0.06)]">
        <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-black">
          <div
            ref={feedRef}
            className="flex h-full w-full snap-y snap-mandatory flex-col overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {REELS.map((reel, i) => (
              <ReelItem key={reel.src} reel={reel} muted={muted} isEnglish={isEnglish} index={i} total={REELS.length} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-black/60 to-transparent" />
          <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-4 pt-11 text-white">
            <p className="text-[15px] font-bold">Reels</p>
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? (isEnglish ? "Unmute" : "Activar sonido") : isEnglish ? "Mute" : "Silenciar"}
              className="rounded-full bg-black/35 p-1.5 backdrop-blur-md hover:bg-black/55"
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Dynamic Island */}
          <div className="pointer-events-none absolute left-1/2 top-2.5 z-40 h-[24px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
