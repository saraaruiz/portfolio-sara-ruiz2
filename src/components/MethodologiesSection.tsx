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

  return (
    <section className="methods-theme-glass framer-glow-sweep py-8 md:py-10" style={methodsThemeVars}>
      <div className="methods-layout relative z-20 mx-auto max-w-[980px] px-6 text-center md:px-10 xl:px-16">
        <p className="eyebrow methods-eyebrow">{isEnglish ? "METHODOLOGIES" : "METODOLOGÍAS"}</p>

        <p className="methods-copy mt-4 text-[1.08rem] font-light leading-[1.45] text-white/78 md:text-[1.42rem]">
          {isEnglish
            ? "I do not follow a single methodology; I choose the framework based on the problem:"
            : "No sigo una única metodología, elijo el marco según el problema:"}
        </p>

        <div className="methods-word-shell mx-auto mt-6 flex h-14 max-w-max items-center justify-center overflow-hidden rounded-full px-5 md:h-16 md:px-8">
          <div
            key={methods[index].label}
            className="methods-word-swap text-2xl font-semibold leading-none tracking-[0.018em] text-white md:text-[2.6rem]"
          >
            {methods[index].label}
          </div>
        </div>

        <div className="methods-icon-row mx-auto mt-6 flex w-full max-w-[460px] items-center justify-center gap-3">
          {methods.map((method, iconIndex) => {
            const isActive = iconIndex === index;
            const Icon = method.Icon;
            return (
              <span
                key={method.label}
                className={`methods-icon-chip inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive ? "methods-icon-chip-active" : ""
                }`}
                title={method.label}
                aria-hidden="true"
              >
                <Icon size={17} />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
