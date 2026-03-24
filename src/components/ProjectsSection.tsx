import { useState } from "react";

import { usePreferences } from "@/context/PreferencesContext";

const projects = [
  {
    title: "Fuerza Interior",
    subtitle: "App de bienestar y meditación",
    image: "/Assets/Proyectos/CoverFuerzaInterior.svg",
    href: "https://fuerza-interior.pages.dev/",
  },
  {
    title: "Sinergia",
    subtitle: "Landing estratégica orientada a conversión",
    image: "/Assets/Proyectos/CoverSinergia.png",
    href: "https://sinergia-website.netlify.app/",
  },
];

export default function ProjectsSection() {
  const { language } = usePreferences();
  const isEnglish = language === "en";

  const localizedProjects = isEnglish
    ? projects.map((project) => ({
        ...project,
        subtitle:
          project.title === "Fuerza Interior"
            ? "Wellness and meditation app"
            : "Strategic landing page focused on conversion",
      }))
    : projects;

  const [active, setActive] = useState(1);

  return (
    <section id="projects" className="scroll-mt-28 bg-[#0a0a0a] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="section-title">
            {isEnglish ? "MY " : "MIS "}<span className="section-title-accent">{isEnglish ? "PROJECTS" : "PROYECTOS"}</span>
          </h2>
          <p className="section-lead mt-5">
            {isEnglish
              ? "Cases where strategy, UX, and detail come together."
              : "Casos donde estrategia, UX y detalle se encuentran."}
          </p>
        </div>

        <div className="lux-glass mt-12 flex h-auto w-full flex-col gap-3 overflow-hidden rounded-[28px] p-2 md:h-[520px] md:flex-row md:gap-4">
          {localizedProjects.map((project, index) => {
            const isActive = active === index;

            return (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`lux-card group relative h-[260px] w-full overflow-hidden rounded-[24px] border border-white/10 transition-[flex,transform] duration-500 ease-out md:h-full ${
                  isActive ? "md:flex-[5]" : "md:flex-[1.6]"
                } framer-glow-sweep`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    isActive ? "scale-[1.02]" : "md:scale-100 md:grayscale"
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                <div
                  className={`absolute bottom-0 left-0 w-full p-4 transition-all duration-500 md:p-6 ${
                    isActive ? "md:translate-y-0 md:opacity-100" : "md:translate-y-4 md:opacity-0"
                  } translate-y-0 opacity-100`}
                >
                  <div className="lux-glass-soft rounded-2xl p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">{isEnglish ? "Project" : "Proyecto"}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white md:text-3xl">{project.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-sm text-white/78">{project.subtitle}</p>
                  </div>
                </div>

                {!isActive && (
                  <p className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 -rotate-90 whitespace-nowrap text-xs uppercase tracking-[0.25em] text-white/70 md:block">
                    {project.title}
                  </p>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
