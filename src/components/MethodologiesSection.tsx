import { useEffect, useState, type CSSProperties } from "react";

const methods = ["DESIGN THINKING", "ATOMIC DESIGN", "LEAN UX", "JTBD", "SCRUM"];

export default function MethodologiesSection() {
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
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="methods-theme-glass framer-glow-sweep py-10 md:py-12" style={methodsThemeVars}>
      <p className="relative z-20 px-6 text-center text-[1.1rem] font-normal leading-relaxed text-white md:px-10 md:text-2xl xl:px-16">
        No sigo una única metodología, elijo el marco según el problema:
      </p>

      <div className="relative z-20 mx-auto mt-4 h-12 max-w-max overflow-hidden px-6 text-center md:h-14 md:px-10 xl:px-16">
        <div
          key={methods[index]}
          className="animate-in fade-in slide-in-from-bottom-2 text-2xl font-semibold tracking-tight text-white md:text-3xl"
        >
          {methods[index]}
        </div>
      </div>
    </section>
  );
}

