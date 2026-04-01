import { useState } from "react";
import { Hand, MousePointer2 } from "lucide-react";

import { usePreferences } from "@/context/PreferencesContext";

const projects = [
  {
    title: "Fuerza Interior",
    subtitle: "Plataforma de bienestar emocional con micro-hábitos",
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

const toolLabelsByProject: Record<string, string[]> = {
  "Fuerza Interior": ["Miro", "Figma", "Maze"],
  Sinergia: ["HTML", "CSS", "React", "JavaScript", "MySQL", "Java", "Spring Boot", "Git & GitHub"],
};

export default function ProjectsSection() {
  const { language } = usePreferences();
  const isEnglish = language === "en";

  const localizedProjects = isEnglish
    ? projects.map((project) => ({
        ...project,
        subtitle:
          project.title === "Fuerza Interior"
            ? "Emotional wellness platform with micro-habits"
            : "Strategic landing page focused on conversion",
      }))
    : projects;

  const [active, setActive] = useState(0);

  return (
    <section id="projects" className="scroll-mt-28 bg-[#0a0a0a] py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="section-title">
            {isEnglish ? "MY " : "MIS "}
            <span className="section-title-accent">{isEnglish ? "PROJECTS" : "PROYECTOS"}</span>
          </h2>
          <p className="section-lead mt-5">
            {isEnglish
              ? "Cases where strategy, UX, and detail come together."
              : "Casos donde estrategia, UX y detalle se encuentran."}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/60 backdrop-blur-sm md:text-[11px]">
            <MousePointer2 size={12} className="hidden md:block" aria-hidden="true" />
            <Hand size={12} className="md:hidden" aria-hidden="true" />
            <span>{isEnglish ? "Hover or tap to preview" : "Pasa o toca para explorar"}</span>
          </div>
        </div>

        <div className="lux-glass mt-12 flex h-auto w-full flex-col gap-3 overflow-hidden rounded-[28px] p-2 md:h-[520px] md:flex-row md:gap-4">
          {localizedProjects.map((project, index) => {
            const isActive = active === index;
            const projectToolLabels = toolLabelsByProject[project.title] ?? [];

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
                    isActive ? "scale-[1.02]" : "md:scale-100 md:grayscale md:blur-[2.2px] md:brightness-[0.55]"
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                {!isActive && <div className="absolute inset-0 hidden bg-black/22 md:block" aria-hidden="true" />}

                <div
                  className={`absolute bottom-0 left-0 w-full p-3 transition-all duration-500 md:p-4 ${
                    isActive ? "md:translate-y-0 md:opacity-100" : "md:translate-y-4 md:opacity-0"
                  } translate-y-0 opacity-100`}
                >
                  <div className="lux-glass-soft mx-auto w-[98%] rounded-2xl p-2.5 md:w-[96.5%] md:p-3.5">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/60">{isEnglish ? "Project" : "Proyecto"}</p>
                      <h3 className="mt-1.5 text-[1.55rem] font-semibold leading-tight text-white md:text-[1.9rem]">{project.title}</h3>
                      <p className="mt-1.5 text-[13px] leading-[1.4] text-white/78 md:text-sm">{project.subtitle}</p>

                      {projectToolLabels.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          {projectToolLabels.map((tool) => (
                            <span
                              key={tool}
                              className="inline-flex items-center rounded-full border border-white/16 bg-[linear-gradient(145deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.02)_100%)] px-3 py-1 text-[10px] font-medium tracking-[0.04em] text-white/82 backdrop-blur-md"
                              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 20px rgba(0,0,0,0.2)" }}
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!isActive && (
                  <p className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[16px] font-medium uppercase tracking-[0.2em] text-white/90 [writing-mode:vertical-rl] md:block">
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
