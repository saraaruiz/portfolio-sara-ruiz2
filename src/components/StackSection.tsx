import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { Hand, MousePointer2 } from "lucide-react";

type StackLogo = {
  file: string;
  label: string;
};

type TooltipPlacement = "top" | "bottom";

type TooltipState = {
  id: string;
  label: string;
  x: number;
  y: number;
  placement: TooltipPlacement;
};

const fileNames = [
  "Figma.svg",
  "Framer.svg",
  "Maze.svg",
  "Photoshop.svg",
  "Illustrator.svg",
  "Css.svg",
  "Html.svg",
  "Chatgpt.svg",
  "Gemini.svg",
  "Claude.svg",
  "Canva.svg",
  "Notion.svg",
  "Miro.svg",
  "Jira.svg",
  "Slack.svg",
  "Lovable.svg",
  "Stitch.svg",
  "Trello.svg",
];

const labelByBase: Record<string, string> = {
  Chatgpt: "ChatGPT",
  Css: "CSS3",
  Html: "HTML5",
};

const logos: StackLogo[] = fileNames.map((file) => {
  const base = file.replace(/\.svg$/i, "");
  return {
    file,
    label: labelByBase[base] ?? base,
  };
});

const TOOLTIP_ID = "stack-tooltip-active";

export default function StackSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const track = useMemo(() => [...logos, ...logos], []);
  const isPaused = activeId !== null;

  // Independent color controls for Stack section glassmorphism.
  const stackThemeVars: CSSProperties = {
    ["--stack-bg-1" as string]: "rgba(154, 24, 88, 0.94)",
    ["--stack-bg-2" as string]: "rgba(61, 14, 44, 0.95)",
    ["--stack-bg-3" as string]: "rgba(8, 8, 16, 0.98)",
    ["--stack-glow-a" as string]: "rgba(230, 63, 138, 0.42)",
    ["--stack-glow-b" as string]: "rgba(212, 255, 89, 0.18)",
    ["--stack-rail-1" as string]: "rgba(145, 29, 90, 0.84)",
    ["--stack-rail-2" as string]: "rgba(24, 10, 24, 0.92)",
  };

  const updateTooltipPosition = (id: string, label: string) => {
    const anchor = itemRefs.current[id];
    if (!anchor) {
      setActiveId(null);
      setTooltip(null);
      return;
    }

    const rect = anchor.getBoundingClientRect();
    const gap = 10;
    const placeBottom = rect.top < 60;

    setTooltip({
      id,
      label,
      x: rect.left + rect.width / 2,
      y: placeBottom ? rect.bottom + gap : rect.top - gap,
      placement: placeBottom ? "bottom" : "top",
    });
  };

  const openTooltip = (id: string, label: string) => {
    setActiveId(id);
    updateTooltipPosition(id, label);
  };

  const closeTooltip = () => {
    setActiveId(null);
    setTooltip(null);
  };

  const handleToggleTap = (id: string, label: string) => {
    if (activeId === id) {
      closeTooltip();
      return;
    }

    openTooltip(id, label);
  };

  useEffect(() => {
    if (!activeId || !tooltip) return;

    const refresh = () => {
      updateTooltipPosition(activeId, tooltip.label);
    };

    const handlePointerDownOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      const clickedItem = Object.values(itemRefs.current).some((node) => node?.contains(target));
      const clickedTooltip = tooltipRef.current?.contains(target) ?? false;

      if (!clickedItem && !clickedTooltip) {
        closeTooltip();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeTooltip();
    };

    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, true);
    document.addEventListener("pointerdown", handlePointerDownOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh, true);
      document.removeEventListener("pointerdown", handlePointerDownOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeId, tooltip]);

  return (
    <section
      className="stack-theme-glass relative z-30 mt-3 overflow-x-hidden overflow-y-visible py-6 md:mt-4 md:py-8"
      style={stackThemeVars}
    >
      <h3 className="relative z-20 px-6 text-center text-[20px] font-medium tracking-[0.01em] text-white/96 md:px-10 md:text-[28px] xl:px-16">
        MI STACK DE HERRAMIENTAS
      </h3>

      <div className="relative z-20 mt-2 flex items-center justify-center gap-2 px-6 text-white/62 md:px-10 xl:px-16">
        <MousePointer2 size={13} className="hidden shrink-0 md:block" aria-hidden="true" />
        <Hand size={13} className="shrink-0 md:hidden" aria-hidden="true" />
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.14em] md:text-[11px]">
          Pasa o toca los íconos
        </p>
      </div>
      <div className="stack-fullbleed relative z-20 mt-5">
        <div className="stack-marquee stack-fade-mask" aria-label="Herramientas y tecnologías">
          <div
            className="stack-track stack-track-premium items-center gap-7 md:gap-9"
            style={{ animationPlayState: isPaused ? "paused" : "running" }}
          >
            {track.map((tool, index) => {
              const id = `${tool.file}-${index}`;
              const isActive = activeId === id;

              return (
                <button
                  key={id}
                  ref={(node) => {
                    itemRefs.current[id] = node;
                  }}
                  type="button"
                  onMouseEnter={() => openTooltip(id, tool.label)}
                  onMouseLeave={closeTooltip}
                  onFocus={() => openTooltip(id, tool.label)}
                  onBlur={closeTooltip}
                  onClick={() => handleToggleTap(id, tool.label)}
                  className="group relative inline-flex h-10 w-10 items-center justify-center transition-transform duration-300 hover:-translate-y-0.5 md:h-11 md:w-11"
                  aria-label={tool.label}
                  aria-describedby={isActive ? TOOLTIP_ID : undefined}
                >
                  <img
                    src={`/Assets/Stack/${tool.file}`}
                    alt={tool.label}
                    className="stack-logo-hint h-8 w-8 object-contain opacity-95 transition-transform duration-300 group-hover:scale-110 md:h-9 md:w-9"
                    style={{ filter: "brightness(0) invert(1)", animationDelay: `${(index % logos.length) * 0.08}s` }}
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {tooltip &&
        createPortal(
          <div
            id={TOOLTIP_ID}
            ref={tooltipRef}
            role="tooltip"
            className="stack-tooltip-portal pointer-events-none fixed z-[9999] whitespace-nowrap rounded-md border border-white/12 bg-black/92 px-2.5 py-1 text-[10px] font-medium text-white/90 shadow-[0_10px_28px_rgba(0,0,0,0.4)] backdrop-blur-md"
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              transform: tooltip.placement === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0)",
            }}
          >
            {tooltip.label}
          </div>,
          document.body,
        )}
    </section>
  );
}

