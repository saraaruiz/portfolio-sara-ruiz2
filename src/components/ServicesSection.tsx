const cards = [
  {
    title: "Estructura & UX",
    eyebrow: "Comprender antes de crear.",
    body: "Estructuro sistemas digitales teniendo presente quién los usa y por qué.",
    bullets: ["Investigación de usuarios", "Flujos de usuario", "Arquitectura de la información"],
  },
  {
    title: "Diseño & Prototipo",
    eyebrow: "De la idea a la forma.",
    body: "Diseño prototipos e interfaces intuitivas y funcionales para plataformas web y mobile.",
    bullets: ["Wireframing y prototipado", "Diseño de interfaces (web & mobile)"],
  },
  {
    title: "Validación e Iteración",
    eyebrow: "Escuchar para mejorar.",
    body: "Itero soluciones a partir de pruebas reales y patrón de uso, no suposiciones.",
    bullets: ["Pruebas de usabilidad", "Análisis de feedback"],
  },
  {
    title: "Interacciones & Detalle",
    eyebrow: "Los detalles cuentan.",
    body: "Diseño interacciones y micro-animaciones que elevan la experiencia sin distraer.",
    bullets: ["Interacciones UI", "Micro-animaciones", "Feedback visual", "Transiciones micro UX"],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-28 bg-[#0a0a0a] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="max-w-4xl">
          <h2 className="section-title">
            QUÉ PUEDO
            <br />
            <span className="section-title-accent">HACER POR TI</span>
          </h2>
          <p className="section-lead mt-5 max-w-[620px]">
            Transformo ideas en productos digitales claros, funcionales y listos para crecer.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="lux-glass lux-card group relative rounded-[28px] p-7"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "radial-gradient(1000px 220px at 0% 0%, rgba(205,48,117,0.14), transparent 60%)" }} />

              <p className="relative text-sm font-medium text-[#d4ff59]">{card.eyebrow}</p>
              <h3 className="relative mt-4 text-2xl font-semibold text-white md:text-[30px]">{card.title}</h3>
              <p className="relative mt-4 max-w-[38ch] text-sm leading-7 text-white/76 md:text-[15px]">{card.body}</p>

              <ul className="relative mt-8 space-y-3 text-sm text-white/82">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center gap-3">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#CD3075]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
