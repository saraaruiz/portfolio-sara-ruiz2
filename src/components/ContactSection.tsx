import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Camera,
  CheckCheck,
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

/**
 * Mantengo tu ajuste desktop como base y afino responsive
 * para que no se vea desproporcionado.
 */
const desktopScreen: ScreenBox = {
  left: 24,
  top: 6.8,
  width: 15.6,
  height: 79.9,
};

const tabletScreen: ScreenBox = {
  left: 23.2,
  top: 6.9,
  width: 17.4,
  height: 79.2,
};

const mobileScreen: ScreenBox = {
  left: 22.7,
  top: 7.2,
  width: 20.2,
  height: 78.2,
};

function useViewportWidth() {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 1440
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return width;
}

function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.58 2 2.15 6.42 2.15 11.88c0 1.75.46 3.46 1.33 4.96L2 22l5.31-1.39a9.86 9.86 0 0 0 4.72 1.2h.01c5.45 0 9.88-4.43 9.88-9.88 0-2.64-1.03-5.12-2.87-6.99Zm-7.02 15.24h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.15.82.84-3.07-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.52 3.67-8.19 8.2-8.19 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.39 5.79c0 4.52-3.68 8.2-8.12 8.2Zm4.49-6.11c-.25-.12-1.49-.73-1.72-.82-.23-.08-.39-.12-.56.12-.17.25-.64.82-.79.99-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.41-.56-.42h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.68 4.24 3.75.59.25 1.06.41 1.42.52.6.19 1.15.16 1.58.1.48-.07 1.49-.61 1.7-1.2.21-.6.21-1.11.15-1.21-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function HeartFloating() {
  return (
    <>
      <span className="heart-a pointer-events-none absolute left-[10%] top-[8%] z-20 text-[10px]">
        💖
      </span>
      <span className="heart-b pointer-events-none absolute right-[10%] top-[10%] z-20 text-[10px]">
        💕
      </span>
      <span className="heart-c pointer-events-none absolute left-[55%] top-[2%] z-20 -translate-x-1/2 text-[9px]">
        💗
      </span>
    </>
  );
}

function MessageMeta({
  time,
  sent = false,
}: {
  time: string;
  sent?: boolean;
}) {
  return (
    <span className="mt-[4px] flex items-center justify-end gap-[3px] text-[7px] leading-none text-white/42">
      {time}
      {sent ? <CheckCheck size={9} className="text-[#8fd3ff]" strokeWidth={2.1} /> : null}
    </span>
  );
}

function PhoneScreenUI() {
  return (
    <>
      <style>{`
        @keyframes heartbeatCta {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 24px rgba(37,211,102,.24);
          }
          18% {
            transform: scale(1.03);
            box-shadow: 0 14px 30px rgba(37,211,102,.30);
          }
          36% {
            transform: scale(1);
            box-shadow: 0 10px 24px rgba(37,211,102,.24);
          }
          54% {
            transform: scale(1.018);
            box-shadow: 0 12px 26px rgba(37,211,102,.28);
          }
          72%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 24px rgba(37,211,102,.24);
          }
        }

        @keyframes floatHeartA {
          0% { opacity: 0; transform: translateY(8px) scale(.82); }
          18% { opacity: .95; }
          100% { opacity: 0; transform: translateY(-24px) translateX(-10px) scale(1.08); }
        }

        @keyframes floatHeartB {
          0% { opacity: 0; transform: translateY(10px) scale(.8); }
          20% { opacity: .94; }
          100% { opacity: 0; transform: translateY(-30px) translateX(10px) scale(1.1); }
        }

        @keyframes floatHeartC {
          0% { opacity: 0; transform: translateY(10px) scale(.76); }
          18% { opacity: .9; }
          100% { opacity: 0; transform: translateY(-20px) translateX(2px) scale(1.02); }
        }

        .heartbeat-cta {
          animation: heartbeatCta 2.5s ease-in-out infinite;
        }

        .heart-a {
          animation: floatHeartA 960ms ease-out infinite;
        }

        .heart-b {
          animation: floatHeartB 1100ms ease-out infinite;
          animation-delay: 120ms;
        }

        .heart-c {
          animation: floatHeartC 900ms ease-out infinite;
          animation-delay: 220ms;
        }

        .chat-scroll {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .chat-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="relative h-full w-full overflow-hidden rounded-[7.2%] bg-[#0b141a] shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#09131a_0%,#0b141a_48%,#0a1116_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.28)_1px,transparent_0)] [background-size:22px_22px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(255,255,255,.06),transparent_28%),radial-gradient(circle_at_80%_100%,rgba(37,211,102,.05),transparent_26%)]" />

        {/* Dynamic island */}
        <div className="absolute left-1/2 top-0 z-20 h-[16px] w-[40%] -translate-x-1/2 rounded-b-[16px] bg-black/92" />

        {/* Status bar iOS */}
        <div className="relative z-10 flex items-center justify-between px-[4.8%] pb-[1.8%] pt-[3.3%] text-white/90">
          <span className="text-[clamp(8px,1vw,10px)] font-semibold tracking-[0.01em]">
            9:41
          </span>

          <div className="flex items-center gap-[5px] text-white/76">
            <span className="inline-flex items-end gap-[1px]">
              <i className="h-[3px] w-[2px] rounded-sm bg-white/75" />
              <i className="h-[5px] w-[2px] rounded-sm bg-white/75" />
              <i className="h-[7px] w-[2px] rounded-sm bg-white/75" />
              <i className="h-[9px] w-[2px] rounded-sm bg-white/75" />
            </span>

            <span className="inline-flex h-[8px] w-[12px] items-center justify-center">
              <svg viewBox="0 0 16 10" className="h-full w-full" fill="none">
                <path
                  d="M1 9C3 6 5 5 8 5C11 5 13 6 15 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M3 9C4.7 7.2 6 6.8 8 6.8C10 6.8 11.3 7.2 13 9"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="8.6" r="1" fill="currentColor" />
              </svg>
            </span>

            <span className="relative inline-flex h-[8px] w-[16px] items-center rounded-[3px] border border-white/55 p-[1px]">
              <span className="h-full w-[65%] rounded-[2px] bg-white/85" />
              <span className="absolute -right-[2px] top-[2px] h-[4px] w-[1.5px] rounded-r-sm bg-white/60" />
            </span>
          </div>
        </div>

        {/* Header estilo iOS */}
        <div className="relative z-10 border-b border-white/[0.04] bg-[#111b21]/95 px-[4%] py-[2.55%] backdrop-blur-sm">
          <div className="flex items-center gap-[2.6%]">
            <button className="grid h-[24px] w-[24px] place-items-center rounded-full bg-white/[0.06] text-white/80">
              <ArrowLeft size={12} />
            </button>

            <div className="relative grid h-[25px] w-[25px] shrink-0 place-items-center rounded-full bg-[#CD3075] text-[9px] font-medium text-white">
              S
              <span className="absolute bottom-0 right-0 h-[7px] w-[7px] rounded-full border border-[#111b21] bg-[#25D366]" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[clamp(10px,1.05vw,11px)] font-semibold leading-none text-white">
                Sara
              </p>
              <p className="mt-[2px] text-[clamp(7px,0.9vw,8px)] leading-none text-white/56">
                En línea
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-[6px] text-white/72">
              <button className="grid h-[24px] w-[24px] place-items-center rounded-full bg-white/[0.06]">
                <Video size={10} />
              </button>
              <button className="grid h-[24px] w-[24px] place-items-center rounded-full bg-white/[0.06]">
                <Phone size={10} />
              </button>
              <button className="grid h-[24px] w-[24px] place-items-center rounded-full bg-white/[0.06]">
                <MoreVertical size={10} />
              </button>
            </div>
          </div>
        </div>

        {/* Chat viewport */}
        <div className="chat-scroll relative z-10 h-[calc(100%-100px)] overflow-y-auto px-[4%] pb-[16%] pt-[3%]">
          <div className="flex min-h-full flex-col justify-end gap-[8px]">
            <div className="max-w-[86%] rounded-[16px] rounded-bl-[7px] bg-[#1c262d] px-[4%] py-[2.7%] text-[clamp(8px,0.98vw,10px)] leading-[1.3] text-[#f2f5f7] shadow-[0_4px_12px_rgba(0,0,0,.18)]">
              Hola! 👋 soy Sara
              <br />
              Gracias por darte una vuelta por mi portafolio
              <MessageMeta time="9:41" />
            </div>

            <div className="relative w-fit max-w-[58%]">
              <HeartFloating />
              <img
                src="/Assets/Contactame/StickerGato.png"
                alt="Sticker de gato con corazones"
                className="block h-auto w-auto max-h-[90px] max-w-full rounded-[10px] object-contain"
              />
              <span className="mt-[4px] block text-right text-[7px] leading-none text-white/42">
                9:41
              </span>
            </div>

            <div className="max-w-[88%] rounded-[16px] rounded-bl-[7px] bg-[#1c262d] px-[4%] py-[2.7%] text-[clamp(8px,0.98vw,10px)] leading-[1.3] text-[#f2f5f7] shadow-[0_4px_12px_rgba(0,0,0,.18)]">
              Si llegaste aquí
              <br />
              probablemente tienes una idea en mente 👀
              <MessageMeta time="9:42" />
            </div>

            <div className="ml-auto max-w-[86%] rounded-[16px] rounded-br-[7px] bg-[#204b39] px-[4%] py-[2.7%] text-[clamp(8px,0.98vw,10px)] leading-[1.3] text-[#effff6] shadow-[0_4px_12px_rgba(0,0,0,.16)]">
              Sí… tengo algo en mente
              <br />
              pero no sé por dónde empezar 😅
              <MessageMeta time="9:42" sent />
            </div>

            <div className="max-w-[78%] rounded-[16px] rounded-bl-[7px] bg-[#1c262d] px-[4%] py-[2.7%] text-[clamp(8px,0.98vw,10px)] leading-[1.3] text-[#f2f5f7] shadow-[0_4px_12px_rgba(0,0,0,.18)]">
              Perfecto! Cuéntame tu idea👇
              <MessageMeta time="9:42" />
            </div>

            <a
              href="https://wa.me/573024157219"
              target="_blank"
              rel="noreferrer"
              className="heartbeat-cta inline-flex w-fit items-center gap-[7px] rounded-full bg-[#25D366] px-[5.6%] py-[3%] text-[clamp(8px,0.98vw,10px)] font-semibold text-[#04140d] transition hover:scale-[1.02]"
            >
              <WhatsAppGlyph className="h-[12px] w-[12px]" />
              Iniciar conversación
            </a>
          </div>
        </div>

        {/* Composer */}
        <div className="absolute bottom-0 z-10 w-full border-t border-white/6 bg-[#0f171d]/96 px-[4%] pb-[3%] pt-[2.3%] backdrop-blur-sm">
          <div className="flex items-center gap-[2.2%]">
            <button className="grid h-[26px] w-[26px] place-items-center rounded-full bg-white/[0.06] text-white/82">
              <Plus size={10} />
            </button>

            <div className="flex h-[26px] flex-1 items-center rounded-full bg-[#1d2a32] px-[4%] text-[8px] text-white/45">
              Escribe un mensaje...
            </div>

            <button className="grid h-[26px] w-[26px] place-items-center rounded-full bg-white/[0.06] text-white/82">
              <Camera size={10} />
            </button>

            <button className="grid h-[26px] w-[26px] place-items-center rounded-full bg-[#25D366] text-black shadow-[0_8px_20px_rgba(37,211,102,.24)]">
              <Mic size={10} />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[7.2%] ring-1 ring-inset ring-white/8" />
      </div>
    </>
  );
}

export default function ContactSection() {
  const viewportWidth = useViewportWidth();

  const activeScreen =
    viewportWidth <= 640
      ? mobileScreen
      : viewportWidth <= 1024
      ? tabletScreen
      : desktopScreen;

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#050505]">
      <div className="mx-auto w-full max-w-[1800px] px-2 md:px-4 xl:px-6">
        <div className="relative isolate mx-auto w-full max-w-[1440px] min-w-[320px]">
          <div
            className="absolute z-0 overflow-hidden"
            style={{
              left: `${activeScreen.left}%`,
              top: `${activeScreen.top}%`,
              width: `${activeScreen.width}%`,
              height: `${activeScreen.height}%`,
              borderRadius: "6.95%",
              outline: DEBUG_SCREEN ? "2px solid red" : "none",
              background: DEBUG_SCREEN ? "rgba(255,0,0,0.05)" : "transparent",
            }}
          >
            <PhoneScreenUI />
          </div>

          <img
            src="/Assets/Contactame/AvatarContactame.svg"
            alt="Sara sosteniendo celular"
            className="absolute inset-0 z-30 h-full w-full select-none pointer-events-none"
          />

          <img
            src="/Assets/Contactame/AvatarContactame.svg"
            alt=""
            aria-hidden="true"
            className="block w-full max-w-[1440px] min-w-[320px] select-none opacity-0 pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}