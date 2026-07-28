import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

const testimonialsByLanguage = {
  es: [
    {
      name: "Steven Mendez Velandia",
      role: "Bootcamp Full-stack Java Jr.",
      body: "He tenido la oportunidad de compartir un mismo entorno de aprendizaje con Sara. Es una profesional destacable; sus capacidades técnicas y blandas la llevan a desempeñar papeles fundamentales en cada equipo de trabajo.",
      tags: ["Creatividad", "Trabajo en equipo", "Aprendizaje continuo"],
    },
    {
      name: "Anita Sevilla Ull",
      role: "Fundador de Comunidad UXUI · UX Lead · IA Designer",
      body: "En una auditoría UX de producto de Comunidad UXUI, Sara realizó un análisis excepcional y lo resolvió con una tesis que ordenó todo lo que necesitábamos: \"la principal deuda no es visual, es de confianza\". Presentó cada hallazgo con una claridad que me dejó sin preguntas. Ella no audita solo pantallas: piensa el producto como sistema y lo conecta con lo que le importa al negocio. La recomiendo sin dudar.",
      tags: ["Estrategia", "UX Research", "Producto"],
    },
    {
      name: "Nicolás Díaz Gil",
      role: "Coordinador de Marketing · Diseño con IA",
      body: "Conozco a Sara desde la universidad y he visto cómo se ha consolidado en el mundo del diseño. Piensa desde el usuario: no se queda en la idea, busca entender a las personas para crear soluciones que generen valor. Tiene una base muy sólida en Design Thinking y se destaca por su capacidad para el trabajo en equipo, escuchando, aportando y construyendo en conjunto.",
      tags: ["Design Thinking", "Trabajo en equipo", "Comunicación"],
    },
    {
      name: "Evelyn Hasbleydi Bernal Romero",
      role: "Bootcamp UX/UI",
      body: "Tuve la oportunidad de trabajar con Sara durante nuestro Bootcamp de diseño UX/UI, destacaba por su enfoque, creatividad y calidad en cada entrega. Cuenta con un excelente dominio de Figma y sobresale por su capacidad de pensar desde la experiencia del usuario, proponiendo soluciones que responden a necesidades reales. La recomiendo sin ninguna duda.",
      tags: ["Figma", "UX Research", "Trabajo en equipo"],
    },
  ],
  en: [
    {
      name: "Steven Mendez Velandia",
      role: "Full-stack Java Jr. Bootcamp",
      body: "I had the opportunity to share the same learning environment with Sara. She is an outstanding professional; her technical and soft skills allow her to play key roles in every team she joins.",
      tags: ["Creativity", "Teamwork", "Continuous learning"],
    },
    {
      name: "Anita Sevilla Ull",
      role: "Founder of Comunidad UXUI · UX Lead · AI Designer",
      body: "In a product UX audit for Comunidad UXUI, Sara delivered an exceptional analysis and resolved it with a thesis that organized everything we needed: \"the main debt isn't visual, it's trust.\" She presented every finding with a clarity that left me without questions. She doesn't just audit screens: she thinks of the product as a system and connects it to what matters to the business. I recommend her without hesitation.",
      tags: ["Strategy", "UX Research", "Product"],
    },
    {
      name: "Nicolás Díaz Gil",
      role: "Marketing Coordinator · AI-driven Design",
      body: "I've known Sara since university and have seen how she's grown in the design world. She thinks from the user's perspective: she doesn't stop at the idea, she seeks to understand people to create solutions that generate value. She has a very solid foundation in Design Thinking and stands out for her teamwork, listening, contributing, and building together.",
      tags: ["Design Thinking", "Teamwork", "Communication"],
    },
    {
      name: "Evelyn Hasbleydi Bernal Romero",
      role: "UX/UI Bootcamp",
      body: "I had the opportunity to work with Sara during our UX/UI design Bootcamp; she stood out for her focus, creativity, and quality in every deliverable. She has excellent command of Figma and stands out for her ability to think from the user's experience, proposing solutions that respond to real needs. I recommend her without any doubt.",
      tags: ["Figma", "UX Research", "Teamwork"],
    },
  ],
} as const;

const sectionTitles = {
  es: { line1: "CÓMO ES", line2: "TRABAJAR CONMIGO", dot: "Ver testimonio" },
  en: { line1: "WHAT IT'S LIKE", line2: "WORKING WITH ME", dot: "View testimonial" },
} as const;

export default function TestimonialsSection() {
  const { language } = usePreferences();
  const [index, setIndex] = useState(0);

  const testimonials = testimonialsByLanguage[language];
  const current = testimonials[index];
  const labels = sectionTitles[language];

  const prev = () => setIndex((value) => (value - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((value) => (value + 1) % testimonials.length);

  return (
    <section id="testimonials" className="scroll-mt-28 bg-[#0a0a0a] py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="max-w-4xl">
          <h2 className="section-title">
            {labels.line1}
            <br />
            <span className="section-title-accent">{labels.line2}</span>
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
                  aria-label={`${labels.dot} ${dot + 1}`}
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
