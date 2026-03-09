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
    <section id="services" className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="max-w-3xl">
          <p className="eyebrow">QUÉ PUEDO HACER POR TI</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-tight text-white md:text-5xl">
            Transformo ideas en productos digitales claros, funcionales y listos para crecer.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <article
              key={card.title}
              className="group rounded-[32px] border border-white/10 bg-white/[0.03] p-7 transition-transform duration-300 hover:-translate-y-1 hover:border-white/15"
            >
              <p className="text-sm font-medium text-[#d4ff59]">{card.eyebrow}</p>
              <h3 className="mt-5 text-2xl font-medium text-white">{card.title}</h3>
              <p className="mt-4 max-w-[36ch] text-sm leading-7 text-white/72">{card.body}</p>

              <ul className="mt-8 space-y-3 text-sm text-white/82">
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