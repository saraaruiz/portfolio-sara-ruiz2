const projects = [
  {
    title: "Fuerza Interior",
    subtitle: "App de bienestar y meditación",
    image: "/Assets/Proyectos/CoverFuerzaInterior.svg",
    href: "https://lovable.dev/projects/10bc8466-b467-45b6-b216-a00ea943f20b",
  },
  {
    title: "Sinergia",
    subtitle: "Landing estratégica orientada a conversión",
    image: "/Assets/Proyectos/CoverSinergia.png",
    href: "https://sinergia-website.netlify.app/",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#0a0a0a] py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">MIS PROYECTOS</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-tight text-white md:text-5xl">
            Casos donde estrategia, UX y detalle se encuentran.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[16/11] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-7 pb-7 pt-16">
                <p className="text-sm uppercase tracking-[0.2em] text-white/55">Proyecto</p>
                <h3 className="mt-2 text-3xl font-medium text-white">{project.title}</h3>
                <p className="mt-2 text-sm text-white/72">{project.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}