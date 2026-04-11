import { useEffect, useState, type CSSProperties } from "react";
import {
  BrainCircuit,
  Compass,
  KanbanSquare,
  Layers3,
  Target,
  type LucideIcon,
} from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

type MethodItem = {
  label: string;
  Icon: LucideIcon;
};

const methods: MethodItem[] = [
  { label: "DESIGN THINKING", Icon: BrainCircuit },
  { label: "ATOMIC DESIGN", Icon: Layers3 },
  { label: "LEAN UX", Icon: Target },
  { label: "JTBD", Icon: Compass },
  { label: "SCRUM", Icon: KanbanSquare },
];

export default function MethodologiesSection() {
  const { language } = usePreferences();
  const isEnglish = language === "en";
  const [index, setIndex] = useState(0);

  // Independent color controls only for Methodologies section.
  const methodsThemeVars: CSSProperties = {
    ["--methods-bg-1" as string]: "rgba(150, 20, 85, 0.94)",
    ["--methods-bg-2" as string]: "rgba(52, 14, 40, 0.95)",
    ["--methods-bg-3" as string]: "rgba(10, 10, 18, 0.98)",
    ["--methods-glow-a" as string]: "rgba(241, 153, 185, 0.32)",
    ["--methods-glow-b" as string]: "rgba(212, 255, 89, 0.16)",
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((value) => (value + 1) % methods.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, []);

  const ActiveIcon = methods[index].Icon;

  return (
    <section className="methods-theme-glass framer-glow-sweep py-6 md:py-8" style={methodsThemeVars}>
      <div className="methods-layout relative z-20 mx-auto max-w-[980px] px-6 text-center md:px-10 xl:px-16">
        <p className="eyebrow methods-eyebrow">{isEnglish ? "METHODOLOGIES" : "METODOLOGÍAS"}</p>

        <p className="methods-copy mt-4 text-[1.08rem] font-light leading-[1.45] text-white/78 md:text-[1.42rem]">
          {isEnglish
            ? "I do not follow a single methodology; I choose the framework based on the problem:"
            : "No sigo una única metodología, elijo el marco según el problema:"}
        </p>

        <div className="methods-word-shell mx-auto mt-5 flex max-w-max items-center justify-center px-3 md:px-5">
          <div
            key={methods[index].label}
            className="methods-word-swap inline-flex items-center justify-center gap-5 pl-1 pr-3 text-2xl font-semibold leading-none tracking-[0.018em] text-white md:gap-6 md:pr-4 md:text-[2.6rem]"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#d4ff59]/55 bg-[radial-gradient(130%_165%_at_18%_0%,rgba(212,255,89,0.22)_0%,rgba(38,52,30,0.72)_48%,rgba(11,16,13,0.86)_100%)] text-[#d4ff59] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_6px_16px_rgba(0,0,0,0.28)] backdrop-blur-[12px] md:h-10 md:w-10">
              <ActiveIcon size={18} />
            </span>
            <span>{methods[index].label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
