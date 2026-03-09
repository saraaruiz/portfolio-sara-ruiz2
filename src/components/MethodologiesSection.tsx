import { useEffect, useState } from "react";

const methods = ["Design Thinking", "Atomic Design", "Lean UX", "JTBD", "Scrum"];

export default function MethodologiesSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((value) => (value + 1) % methods.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="bg-[linear-gradient(135deg,#6e1d49_0%,#CD3075_55%,#e872b0_100%)] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 text-center md:px-10 xl:px-16">
        <p className="text-balance text-2xl font-normal leading-relaxed text-white md:text-3xl">
          No sigo una única metodología, elijo el marco según el problema:
        </p>

        <div className="mt-4 h-12 overflow-hidden md:h-16">
          <div
            key={methods[index]}
            className="animate-in fade-in slide-in-from-bottom-2 text-3xl font-semibold text-white md:text-5xl"
          >
            {methods[index]}
          </div>
        </div>
      </div>
    </section>
  );
}