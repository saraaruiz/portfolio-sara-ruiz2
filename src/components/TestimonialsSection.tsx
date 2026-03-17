import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Steven Mendez Velandia",
    role: "Bootcamp Full-stack Java Jr.",
    body: "He tenido la oportunidad de compartir un mismo entorno de aprendizaje con Sara. Es una profesional destacable; sus capacidades técnicas y blandas la llevan a desempeñar papeles fundamentales en cada equipo de trabajo.",
    tags: ["Creatividad", "Trabajo en equipo", "Aprendizaje continuo"],
  },
  {
    name: "Laura Gómez",
    role: "Product Manager · Fintech",
    body: "Sara tiene una mirada estratégica muy clara. Propone soluciones viables sin perder sensibilidad por la experiencia del usuario y cuida cada detalle visual con criterio de negocio.",
    tags: ["Estrategia", "UX", "Comunicación"],
  },
  {
    name: "Andrés Castillo",
    role: "Tech Lead · SaaS",
    body: "Trabajar con Sara fue muy fluido. Documenta, itera rápido y mantiene foco en impacto. Sus decisiones de diseño siempre llegan con argumentos y una ejecución consistente.",
    tags: ["Iteración", "Colaboración", "Calidad"],
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const prev = () => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((value) => (value + 1) % testimonials.length);

  return (
    <section id="testimonials" className="scroll-mt-28 bg-[#0a0a0a] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="max-w-4xl">
          <h2 className="section-title">
            CÓMO ES
            <br />
            <span className="section-title-accent">TRABAJAR CONMIGO</span>
          </h2>
        </div>

        <div className="lux-glass lux-card framer-glow-sweep mt-12 overflow-hidden rounded-[30px] bg-[radial-gradient(1000px_380px_at_15%_0%,rgba(205,48,117,0.26),transparent_65%),linear-gradient(180deg,#171025_0%,#0c0c10_100%)] p-6 md:p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#CD3075] to-[#d4ff59] text-lg font-semibold text-black">
                {current.name
                  .split(" ")
                  .slice(0, 2)
                  .map((chunk) => chunk[0])
                  .join("")}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{current.name}</h3>
                <p className="text-sm text-white/60">{current.role}</p>
              </div>
            </div>

            <Quote className="hidden text-white/40 md:block" size={28} />
          </div>

          <p className="mt-8 max-w-[72ch] text-base leading-8 text-white/82 md:text-lg">{current.body}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {current.tags.map((tag) => (
              <span key={tag} className="lux-chip rounded-full px-3 py-1.5 text-xs text-white/80">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {testimonials.map((item, dot) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setIndex(dot)}
                  className={`h-2.5 rounded-full transition-all ${dot === index ? "w-6 bg-[#CD3075]" : "w-2.5 bg-white/35"}`}
                  aria-label={`Ver testimonio ${dot + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d4ff59]/45 bg-[#d4ff59]/12 text-[#d4ff59] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#d4ff59]/24 hover:text-[#f6ffd8]"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={next}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d4ff59]/45 bg-[#d4ff59]/12 text-[#d4ff59] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#d4ff59]/24 hover:text-[#f6ffd8]"
                >
                  <ArrowRight size={16} />
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
