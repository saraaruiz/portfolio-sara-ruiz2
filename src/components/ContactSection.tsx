import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Camera,
  Mic,
  MoreVertical,
  Phone,
  Plus,
  Video,
} from "lucide-react";

type ScreenBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const DEBUG_SCREEN = false;

const desktopScreen: ScreenBox = {
  left: 24,
  top: 7.3,
  width: 15.5,
  height: 78,
};

const tabletScreen: ScreenBox = {
  left: 22.8,
  top: 7.1,
  width: 18.2,
  height: 78.4,
};

const mobileScreen: ScreenBox = {
  left: 22.2,
  top: 7.4,
  width: 20.5,
  height: 77.5,
};

function useViewportWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return width;
}

function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.58 2 2.15 6.42 2.15 11.88c0 1.75.46 3.46 1.33 4.96L2 22l5.31-1.39a9.86 9.86 0 0 0 4.72 1.2h.01c5.45 0 9.88-4.43 9.88-9.88 0-2.64-1.03-5.12-2.87-6.99Zm-7.02 15.24h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.15.82.84-3.07-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.52 3.67-8.19 8.2-8.19 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.39 5.79c0 4.52-3.68 8.2-8.12 8.2Z"/>
    </svg>
  );
}

function PhoneScreenUI() {
  return (
    <>
      <style>{`

      @keyframes typing {
        0%,80%,100% {opacity:.3}
        40% {opacity:1}
      }

      @keyframes heartbeat {
        0%,100%{transform:scale(1)}
        30%{transform:scale(1.05)}
        60%{transform:scale(1)}
      }

      .typing span{
        animation:typing 1.2s infinite
      }

      .typing span:nth-child(2){
        animation-delay:.2s
      }

      .typing span:nth-child(3){
        animation-delay:.4s
      }

      .heartbeat{
        animation:heartbeat 2.4s infinite
      }

      `}</style>

      <div className="relative h-full w-full rounded-[7%] overflow-hidden bg-[#0b141a] shadow-2xl">

        {/* STATUS BAR */}
        <div className="flex justify-between px-[5%] pt-[4%] text-white text-[10px]">
          <span>9:41</span>
          <span>● ● ●</span>
        </div>

        {/* HEADER */}
        <div className="flex items-center gap-2 px-[4%] py-[3%] border-b border-white/10 bg-[#111b21]">
          <ArrowLeft size={14} className="text-white/70"/>

          <div className="w-[28px] h-[28px] rounded-full bg-pink-500 flex items-center justify-center text-[10px] text-white">
            S
          </div>

          <div className="flex-1">
            <p className="text-white text-[11px] font-semibold">Sara</p>
            <p className="text-white/50 text-[9px]">responde rápido</p>
          </div>

          <Video size={12} className="text-white/70"/>
          <Phone size={12} className="text-white/70"/>
          <MoreVertical size={12} className="text-white/70"/>
        </div>

        {/* CHAT */}
        <div className="flex flex-col justify-end h-[65%] px-[4%] pb-[22%] pt-[4%]">

          <div className="self-start bg-[#1c262d] text-white text-[10px] px-[4%] py-[3%] rounded-xl mb-[3%]">
            ¡Hola, soy Sara!
          </div>

          <div className="typing flex gap-[3px] bg-[#1c262d] px-[4%] py-[3%] rounded-xl w-fit mb-[3%]">
            <span className="w-[4px] h-[4px] bg-white rounded-full"></span>
            <span className="w-[4px] h-[4px] bg-white rounded-full"></span>
            <span className="w-[4px] h-[4px] bg-white rounded-full"></span>
          </div>

          <div className="bg-[#284437] text-white text-[10px] px-[4%] py-[3%] rounded-xl border border-white/30 mb-[4%]">
            ¿Hablamos sobre tu próximo proyecto?
          </div>

          <a
            href="https://wa.me/573024157219"
            className="heartbeat flex items-center gap-2 bg-[#25D366] text-black font-semibold px-[5%] py-[3%] rounded-full text-[10px]"
          >
            <WhatsAppGlyph className="w-[12px] h-[12px]" />
            Iniciar conversación
          </a>

        </div>

        {/* INPUT */}
        <div className="absolute bottom-0 w-full flex items-center gap-2 px-[4%] pb-[3%] pt-[2%] bg-[#0f171d] border-t border-white/10">

          <Plus size={12} className="text-white/70"/>

          <div className="flex-1 bg-[#1d2a32] text-white/40 rounded-full px-[4%] py-[2%] text-[9px]">
            Escribe un mensaje...
          </div>

          <Camera size={12} className="text-white/70"/>
          <Mic size={12} className="text-green-400"/>

        </div>

      </div>
    </>
  );
}

export default function ContactSection() {
  const width = useViewportWidth();

  const screen =
    width <= 640
      ? mobileScreen
      : width <= 1024
      ? tabletScreen
      : desktopScreen;

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-black">

      <div className="mx-auto max-w-[1800px] px-4">

        <div className="relative isolate mx-auto max-w-[1440px]">

          {/* UI DETRÁS */}
          <div
            className="absolute z-0 overflow-hidden"
            style={{
              left: `${screen.left}%`,
              top: `${screen.top}%`,
              width: `${screen.width}%`,
              height: `${screen.height}%`,
              borderRadius: "7%",
              outline: DEBUG_SCREEN ? "2px solid red" : "none",
            }}
          >
            <PhoneScreenUI />
          </div>

          {/* IMAGEN DELANTE */}
          <img
            src="/Assets/Contactame/AvatarContactame.svg"
            alt="Sara sosteniendo celular"
            className="absolute inset-0 z-30 w-full h-full pointer-events-none select-none"
          />

          {/* ESPACIADOR */}
          <img
            src="/Assets/Contactame/AvatarContactame.svg"
            alt=""
            className="opacity-0 w-full select-none pointer-events-none"
          />

        </div>
      </div>
    </section>
  );
}
