const testimonials = [
  {
    name: "Steven Mendez Velandia",
    role: "Bootcamp Full-stack java jr.",
    body:
      "He tenido la oportunidad de compartir un mismo entorno de aprendizaje con Sara, es una profesional destacable, sus capacidades y aptitudes técnicas y blandas la llevan a desempeñar unos papeles fundamentales en cada equipo de trabajo en el que se encuentra, con una orientación creativa, Sara siempre desarrolla soluciones innovadoras para cualquier problema que se le presente y nunca para de aprender.",
  },
  {
    name: "Más testimonios próximamente",
    role: "Estructura lista",
    body:
      "Esta tarjeta se mantiene preparada para agregar nuevas reseñas reales de LinkedIn sin modificar el sistema visual de la sección.",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="max-w-3xl">
          <p className="eyebrow">CÓMO ES</p>
          <h2 className="mt-4 text-4xl font-medium leading-tight text-white md:text-5xl">TRABAJAR CONMIGO</h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[32px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#CD3075] to-[#d4ff59] text-lg font-semibold text-black">
                  {item.name === "Más testimonios próximamente" ? "+" : "SM"}
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white">{item.name}</h3>
                  <p className="text-sm text-white/55">{item.role}</p>
                </div>
              </div>

              <p className="mt-8 text-sm leading-8 text-white/76">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}