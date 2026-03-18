import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowLeft, Camera, CheckCheck, Mic,
  MoreVertical, Phone, Plus, RotateCcw, Video, type LucideIcon,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

const DEBUG_SCREEN = false;
const DESIGN_WIDTH = 224;

type ScreenBox = { left: number; top: number; width: number; height: number };
const screens: Record<"desktop" | "tablet" | "mobile", ScreenBox> = {
  desktop: { left: 24, top: 6.8, width: 15.6, height: 79.9 },
  tablet:  { left: 24, top: 6.8, width: 15.6, height: 79.9 },
  mobile:  { left: 24, top: 6.8, width: 15.6, height: 79.9 },
};

const chatCopyByLanguage = {
  es: {
    msg1: "¡Llegaste hasta aquí! 👀\nGracias por visitar mi portafolio",
    msg2: "¿Qué te trajo por aquí? 🤔",
    replies: [
      { id: "a", chip: "Tengo un proyecto 💡", response: ["¡Me lo imaginaba! 🔥", "Cuéntame todo 👇"] },
      { id: "b", chip: "Solo espío 👀", response: ["Espiar está permitido aquí 👀✨", "¿Qué encontraste?"] },
      { id: "c", chip: "Quiero saber más 🧩", response: ["¡Preguntá lo que quieras! 😊", "Estoy por aquí"] },
    ],
    online: "En línea",
    typing: "escribiendo…",
    startConversation: "Iniciar conversación",
    restart: "Volver a empezar",
    inputPlaceholder: "Escribe un mensaje…",
    back: "Volver",
    attach: "Adjuntar",
    camera: "Cámara",
    mic: "Micrófono",
    resetAria: "Reiniciar conversación",
    reactTitle: "Toca para reaccionar",
    stickerAlt: "Sticker de gato con corazones",
  },
  en: {
    msg1: "You made it this far! 👀\nThanks for visiting my portfolio",
    msg2: "What brought you here? 🤔",
    replies: [
      { id: "a", chip: "I have a project 💡", response: ["I knew it! 🔥", "Tell me everything 👇"] },
      { id: "b", chip: "Just browsing 👀", response: ["Browsing is welcome here 👀✨", "What caught your eye?"] },
      { id: "c", chip: "I want to know more 🧩", response: ["Ask me anything! 😊", "I'm right here"] },
    ],
    online: "Online",
    typing: "typing…",
    startConversation: "Start conversation",
    restart: "Start over",
    inputPlaceholder: "Type a message…",
    back: "Back",
    attach: "Attach",
    camera: "Camera",
    mic: "Microphone",
    resetAria: "Restart conversation",
    reactTitle: "Tap to react",
    stickerAlt: "Cat sticker with hearts",
  },
} as const;

const REPLIES = chatCopyByLanguage.es.replies;
type ReplyId = typeof REPLIES[number]["id"];

const REACTIONS = ["❤️", "😂", "🔥", "👏"];
type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
const TIMING: Record<number, number> = { 0:480, 1:1200, 2:420, 3:950, 4:480, 5:1000 };

function useViewportWidth() {
  const [w, setW] = useState(() => typeof window !== "undefined" ? window.innerWidth : 1440);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
}

function useElementSize(ref: React.RefObject<HTMLElement>) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setSize({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.58 2 2.15 6.42 2.15 11.88c0 1.75.46 3.46 1.33 4.96L2 22l5.31-1.39a9.86 9.86 0 0 0 4.72 1.2h.01c5.45 0 9.88-4.43 9.88-9.88 0-2.64-1.03-5.12-2.87-6.99Zm-7.02 15.24h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.15.82.84-3.07-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.52 3.67-8.19 8.2-8.19 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.39 5.79c0 4.52-3.68 8.2-8.12 8.2Zm4.49-6.11c-.25-.12-1.49-.73-1.72-.82-.23-.08-.39-.12-.56.12-.17.25-.64.82-.79.99-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.41-.56-.42h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.4 1.01 2.57.12.16 1.75 2.68 4.24 3.75.59.25 1.06.41 1.42.52.6.19 1.15.16 1.58.1.48-.07 1.49-.61 1.7-1.2.21-.6.21-1.11.15-1.21-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="msg-in flex w-fit items-center gap-[4px] rounded-[14px] rounded-bl-[5px] bg-[#1c262d] px-[10px] py-[8px]">
      {[0, 160, 320].map((delay) => (
        <span key={delay} className="typing-dot h-[4px] w-[4px] rounded-full bg-white/45" style={{ animationDelay: `${delay}ms` }} />
      ))}
    </div>
  );
}

function MessageMeta({ time, sent = false }: { time: string; sent?: boolean }) {
  return (
    <span className="mt-[4px] flex items-center justify-end gap-[2px] text-[7px] leading-none opacity-45">
      {time}
      {sent && <CheckCheck size={8} className="text-[#8fd3ff]" strokeWidth={2.2} />}
    </span>
  );
}

function HeartFloating() {
  return (
    <>
      <span className="heart-a pointer-events-none absolute left-[10%] top-[8%] z-20 text-[10px]">💖</span>
      <span className="heart-b pointer-events-none absolute right-[10%] top-[10%] z-20 text-[10px]">💕</span>
      <span className="heart-c pointer-events-none absolute left-[55%] top-[2%] z-20 -translate-x-1/2 text-[9px]">💗</span>
    </>
  );
}

function Bubble({ children, sent = false, reaction, onReact, delay = 0, reactTitle }: {
  children: React.ReactNode; sent?: boolean; reaction?: string; onReact?: () => void; delay?: number; reactTitle?: string;
}) {
  return (
    <div className={`msg-in relative w-fit cursor-pointer select-none ${sent ? "ml-auto" : ""}`} style={{ animationDelay: `${delay}ms` }} onClick={onReact} title={reactTitle}>
      <div className={`max-w-[88%] rounded-[14px] px-[9px] py-[7px] text-[11px] leading-[1.45] shadow-[0_2px_8px_rgba(0,0,0,.2)] transition-transform active:scale-[0.97] ${sent ? "rounded-br-[4px] bg-[#204b39] text-[#effff6]" : "rounded-bl-[4px] bg-[#1c262d] text-[#f2f5f7]"}`}>
        {children}
      </div>
      {reaction && (
        <span key={reaction} className="reaction-badge absolute -bottom-[10px] right-[4px] rounded-full bg-[#1a2730] px-[5px] py-[1px] text-[9px] shadow-[0_1px_5px_rgba(0,0,0,.5)]">
          {reaction}
        </span>
      )}
    </div>
  );
}

function PhoneScreenUI({ onReset, language }: { onReset: () => void; language: "es" | "en" }) {
  const chatCopy = chatCopyByLanguage[language];
  const REPLIES = chatCopy.replies;
  const MSG1 = chatCopy.msg1;
  const MSG2 = chatCopy.msg2;

  const [phase, setPhase]         = useState<Phase>(0);
  const [picked, setPicked]       = useState<ReplyId | null>(null);
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const timerRef                  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const chatRef                   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phase >= 6) return;
    timerRef.current = setTimeout(() => setPhase((p) => (p + 1) as Phase), TIMING[phase] ?? 800);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [phase]);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  }, [phase, picked]);

  const handleReply = useCallback((id: ReplyId) => {
    if (picked) return;
    setPicked(id);
    setPhase(7);
    timerRef.current = setTimeout(() => setPhase(8), 1300);
  }, [picked]);

  const handleReact = useCallback((msgId: string) => {
    setReactions((prev) => {
      const cur  = prev[msgId] ?? "";
      const idx  = REACTIONS.indexOf(cur);
      const next = idx >= REACTIONS.length - 1 ? "" : REACTIONS[idx + 1] ?? REACTIONS[0];
      return { ...prev, [msgId]: next };
    });
  }, []);

  const pickedReply = REPLIES.find((r) => r.id === picked);

  const iconBtns: LucideIcon[] = [Video, Phone, MoreVertical];

  return (
    <>
      <style>{`
        @keyframes msgIn { from{opacity:0;transform:translateY(8px) scale(.95)} to{opacity:1;transform:none} }
        @keyframes replyIn { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:none} }
        @keyframes reactBadge { 0%{transform:scale(.3)} 70%{transform:scale(1.25)} 100%{transform:scale(1)} }
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0);opacity:.38} 30%{transform:translateY(-4px);opacity:1} }
        @keyframes heartbeatCta {
          0%,100%{transform:scale(1);box-shadow:0 8px 20px rgba(37,211,102,.22)}
          18%{transform:scale(1.045);box-shadow:0 12px 28px rgba(37,211,102,.34)}
          36%{transform:scale(1)}
          54%{transform:scale(1.02);box-shadow:0 10px 24px rgba(37,211,102,.28)}
        }
        @keyframes floatHeartA { 0%{opacity:0;transform:translateY(8px) scale(.82)} 18%{opacity:.95} 100%{opacity:0;transform:translateY(-22px) translateX(-8px) scale(1.08)} }
        @keyframes floatHeartB { 0%{opacity:0;transform:translateY(10px) scale(.8)} 20%{opacity:.94} 100%{opacity:0;transform:translateY(-28px) translateX(8px) scale(1.1)} }
        @keyframes floatHeartC { 0%{opacity:0;transform:translateY(10px) scale(.76)} 18%{opacity:.9} 100%{opacity:0;transform:translateY(-18px) translateX(2px) scale(1.02)} }
        @keyframes batteryCharge { 0%{width:18%;opacity:.55} 25%{width:45%;opacity:.72} 55%{width:72%;opacity:.85} 80%{width:92%;opacity:.95} 90%{width:96%;opacity:1} 100%{width:18%;opacity:.55} }
        @keyframes batteryBolt { 0%,49%{opacity:0} 50%,100%{opacity:1} }
        .msg-in         { animation: msgIn 230ms ease-out both; }
        .reply-in       { animation: replyIn 200ms ease-out both; }
        .reaction-badge { animation: reactBadge 270ms cubic-bezier(.34,1.56,.64,1) both; }
        .typing-dot     { animation: typingBounce 1.1s ease-in-out infinite; }
        .heartbeat-cta  { animation: heartbeatCta 2.6s ease-in-out infinite; }
        .heart-a { animation: floatHeartA 960ms ease-out infinite; }
        .heart-b { animation: floatHeartB 1100ms ease-out infinite 120ms; }
        .heart-c { animation: floatHeartC 900ms ease-out infinite 220ms; }
        .battery-fill { animation: batteryCharge 4s ease-in-out infinite; }
        .battery-bolt { animation: batteryBolt 4s ease-in-out infinite; }
        .chat-scroll { scrollbar-width:none; -ms-overflow-style:none; }
        .chat-scroll::-webkit-scrollbar { display:none; }
        .reply-chip { transition: background 140ms, border-color 140ms, transform 80ms; }
        .reply-chip:hover  { background: rgba(37,211,102,.13); border-color: rgba(37,211,102,.42); }
        .reply-chip:active { transform: scale(.95); }
        .reset-btn { transition: background 140ms, opacity 140ms; }
        .reset-btn:hover  { background: rgba(255,255,255,.1); }
        .reset-btn:active { opacity: .7; }
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#09131a_0%,#0b141a_48%,#0a1116_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.022] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.3)_1px,transparent_0)] [background-size:20px_20px]" />
      <div className="pointer-events-none absolute z-[1]" style={{ left:"-12%", top:"28%", width:"70%", height:"55%", background:"radial-gradient(ellipse at center, rgba(236,72,153,.13) 0%, transparent 68%)", filter:"blur(18px)" }} />
      <div className="pointer-events-none absolute z-[1]" style={{ right:"-10%", top:"42%", width:"60%", height:"45%", background:"radial-gradient(ellipse at center, rgba(251,113,133,.09) 0%, transparent 65%)", filter:"blur(14px)" }} />
      <div className="pointer-events-none absolute z-[1]" style={{ left:"20%", top:"22%", width:"55%", height:"30%", background:"radial-gradient(ellipse at center, rgba(217,70,239,.06) 0%, transparent 70%)", filter:"blur(22px)" }} />

      <div className="absolute left-1/2 top-0 z-20 h-[4%] min-h-[9px] max-h-[13px] w-[36%] -translate-x-1/2 rounded-b-[13px] bg-black/96" />

      <div className="relative z-10 flex items-center justify-between px-[5%] pb-[1.5%] pt-[7%] text-white/85">
        <span className="text-[11px] font-semibold tracking-[0.01em]">9:41</span>
        <div className="flex items-center gap-[5px] text-white/68">
          <span className="inline-flex items-end gap-[1px]">
            {[3, 5, 7, 9].map((h) => <i key={h} className="w-[2px] rounded-sm bg-current" style={{ height: h }} />)}
          </span>
          <svg viewBox="0 0 16 10" className="h-[8px] w-[12px]" fill="none">
            <path d="M1 9C3 6 5 5 8 5C11 5 13 6 15 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M3 9C4.7 7.2 6 6.8 8 6.8C10 6.8 11.3 7.2 13 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="8" cy="8.6" r="1" fill="currentColor" />
          </svg>
          <span className="relative inline-flex h-[8px] w-[15px] items-center rounded-[3px] border border-white/48 p-[1px]">
            <span className="battery-fill h-full rounded-[2px] bg-[#4ade80]" />
            <span className="battery-bolt pointer-events-none absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 6 9" className="h-[6px] w-[4px]" fill="none">
                <path d="M4 0.5L1 4.5H3L2 8.5L5 3.5H3L4 0.5Z" fill="white" fillOpacity=".9" />
              </svg>
            </span>
            <span className="absolute -right-[2px] top-[2px] h-[4px] w-[1.5px] rounded-r-sm bg-white/45" />
          </span>
        </div>
      </div>

      <div className="relative z-10 border-b border-white/[0.05] bg-[#111b21]/96 px-[4%] py-[2.4%] backdrop-blur-sm">
        <div className="flex items-center gap-[6px]">
          <button aria-label={chatCopy.back} className="grid h-[22px] w-[22px] place-items-center rounded-full bg-white/[0.06] text-white/75 transition hover:bg-white/10">
            <ArrowLeft size={11} />
          </button>
          <div className="relative grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full bg-[#CD3075] text-[10px] font-semibold text-white shadow-[0_0_0_2px_rgba(205,48,117,.28)]">
            S
            <span className="absolute bottom-0 right-0 h-[7px] w-[7px] rounded-full border-[1.5px] border-[#111b21] bg-[#25D366]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold leading-none text-white">Sara</p>
            <p className={`mt-[2px] text-[9px] leading-none transition-colors duration-300 ${phase === 7 ? "text-[#25D366]/80" : "text-white/50"}`}>
              {phase === 7 ? chatCopy.typing : chatCopy.online}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-[5px] text-white/60">
            {iconBtns.map((Icon, i) => (
              <button key={i} className="grid h-[22px] w-[22px] place-items-center rounded-full bg-white/[0.06] transition hover:bg-white/10">
                <Icon size={10} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={chatRef} className="chat-scroll relative z-10 min-h-0 flex-1 overflow-y-auto px-[4.5%] py-[3%]">
        <div className="flex min-h-full flex-col justify-end gap-[8px]">

          {phase >= 2 && (
            <Bubble reaction={reactions.m1} onReact={() => handleReact("m1")} reactTitle={chatCopy.reactTitle}>
              {MSG1.split("\n").map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
              <MessageMeta time="9:41" />
            </Bubble>
          )}

          {phase >= 4 && (
            <div className="msg-in relative w-fit max-w-[52%]">
              <HeartFloating />
              <img src="/Assets/Contactame/StickerGato.png" alt={chatCopy.stickerAlt} className="block h-auto max-h-[72px] w-auto rounded-[8px] object-contain" loading="lazy" decoding="async" />
              <span className="mt-[3px] block text-right text-[7px] leading-none text-white/36">9:41</span>
            </div>
          )}

          {phase >= 6 && (
            <Bubble reaction={reactions.m2} onReact={() => handleReact("m2")} reactTitle={chatCopy.reactTitle}>
              {MSG2}
              <MessageMeta time="9:41" />
            </Bubble>
          )}

          {phase >= 6 && !picked && (
            <div className="flex flex-col gap-[5px] pl-[1px]">
              {REPLIES.map((r, i) => (
                <button key={r.id} onClick={() => handleReply(r.id)} className="reply-chip reply-in w-fit rounded-full border border-white/20 bg-white/[0.06] px-[10px] py-[5px] text-left text-[10px] text-white/78" style={{ animationDelay: `${i * 70}ms` }}>
                  {r.chip}
                </button>
              ))}
            </div>
          )}

          {picked && (
            <Bubble sent reactTitle={chatCopy.reactTitle}>
              {pickedReply!.chip}
              <MessageMeta time="9:42" sent />
            </Bubble>
          )}

          {(phase === 1 || phase === 3 || phase === 5 || phase === 7) && <TypingIndicator />}

          {phase === 8 && pickedReply && (
            <>
              <Bubble reaction={reactions.m8} onReact={() => handleReact("m8")} reactTitle={chatCopy.reactTitle}>
                {pickedReply.response[0]}<br />{pickedReply.response[1]}
                <MessageMeta time="9:42" />
              </Bubble>
              <a href="https://wa.me/573024157219" target="_blank" rel="noreferrer" className="heartbeat-cta msg-in ml-[1px] inline-flex w-fit items-center gap-[6px] rounded-full bg-[#25D366] px-[11px] py-[6px] text-[10px] font-semibold text-[#04140d] transition hover:scale-[1.02] active:scale-[0.97]" style={{ animationDelay: "120ms" }}>
                <WhatsAppGlyph className="h-[11px] w-[11px]" />
                {chatCopy.startConversation}
              </a>
              <button onClick={onReset} className="reset-btn msg-in ml-[1px] inline-flex w-fit items-center gap-[5px] rounded-full border border-white/14 bg-white/[0.05] px-[9px] py-[5px] text-[9px] text-white/45 transition" style={{ animationDelay: "220ms" }} aria-label={chatCopy.resetAria}>
                <RotateCcw size={8} strokeWidth={2} />
                {chatCopy.restart}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-auto border-t border-white/[0.05] bg-[#0f171d]/96 px-[4%] pb-[3%] pt-[2.2%] backdrop-blur-sm">
        <div className="flex items-center gap-[4px]">
          <button aria-label={chatCopy.attach} className="grid h-[24px] w-[24px] place-items-center rounded-full bg-white/[0.06] text-white/70"><Plus size={9} /></button>
          <div className="flex h-[24px] flex-1 items-center rounded-full bg-[#1d2a32] px-[8px] text-[9px] text-white/32">{chatCopy.inputPlaceholder}</div>
          <button aria-label={chatCopy.camera} className="grid h-[24px] w-[24px] place-items-center rounded-full bg-white/[0.06] text-white/70"><Camera size={9} /></button>
          <button aria-label={chatCopy.mic} className="grid h-[24px] w-[24px] place-items-center rounded-full bg-[#25D366] text-black shadow-[0_5px_14px_rgba(37,211,102,.3)]"><Mic size={9} /></button>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[7.2%] ring-1 ring-inset ring-white/[0.06]" />
    </>
  );
}

export default function ContactSection() {
  const { language } = usePreferences();
  const viewportWidth = useViewportWidth();
  const screenRef     = useRef<HTMLDivElement>(null);
  const { width: screenWidth, height: screenHeight } = useElementSize(screenRef as React.RefObject<HTMLElement>);
  const activeScreen  = screens.desktop;
  const [resetKey, setResetKey] = useState(0);
  const handleReset   = useCallback(() => setResetKey((k) => k + 1), []);
  const scale         = screenWidth > 0 ? screenWidth / DESIGN_WIDTH : 1;
  const innerWidth    = DESIGN_WIDTH;
  const innerHeight   = screenHeight > 0 ? screenHeight / scale : DESIGN_WIDTH * (79.9 / 15.6);

  const minWidth =
    viewportWidth < 640  ? "860px"  :
    viewportWidth < 1024 ? "1300px" : "0px";

  const shiftX =
    viewportWidth < 640  ? "-18%" :
    viewportWidth < 1024 ? "-12%" : "0%";

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-[#050505]">
      <div className="mx-auto w-full max-w-[1800px] px-0 md:px-4 xl:px-6">
        <div className="relative isolate mx-auto w-full max-w-[1440px]" style={{ minWidth, transform: `translateX(${shiftX})` }}>

          <div ref={screenRef} className="absolute z-0 overflow-hidden" style={{ left:`${activeScreen.left}%`, top:`${activeScreen.top}%`, width:`${activeScreen.width}%`, height:`${activeScreen.height}%`, borderRadius:"6.95%", outline: DEBUG_SCREEN ? "2px solid red" : "none" }}>
            {screenWidth > 0 && (
              <div key={resetKey} style={{ position:"absolute", top:0, left:0, width:innerWidth, height:innerHeight, transform:`scale(${scale})`, transformOrigin:"top left", background:"#0b141a", display:"flex", flexDirection:"column" }}>
                <PhoneScreenUI onReset={handleReset} language={language} />
              </div>
            )}
          </div>

          <img src="/Assets/Contactame/AvatarContactame.svg" alt="Sara sosteniendo celular" className="pointer-events-none absolute inset-0 z-30 h-full w-full select-none" loading="lazy" decoding="async" />
          <img src="/Assets/Contactame/AvatarContactame.svg" alt="" aria-hidden className="pointer-events-none block w-full max-w-[1440px] select-none opacity-0" style={{ minWidth }} loading="lazy" decoding="async" />

        </div>
      </div>
    </section>
  );
}
