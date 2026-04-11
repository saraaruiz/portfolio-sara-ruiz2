import { useState } from "react";
import { ExternalLink, Hand, MousePointer2, X } from "lucide-react";

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
  const [projectModal, setProjectModal] = useState<{ title: string; href: string } | null>(null);

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
                onClick={(event) => {
                  event.preventDefault();
                  setActive(index);
                  setProjectModal({ title: project.title, href: project.href });
                }}
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

      {projectModal && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/82 px-6 backdrop-blur-sm">
          <div className="w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/12 bg-[#090909] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white/85">
                {isEnglish ? "Project preview" : "Vista previa del proyecto"} · {projectModal.title}
              </p>
              <button
                onClick={() => setProjectModal(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/75 transition-colors hover:text-white"
                aria-label={isEnglish ? "Close preview" : "Cerrar vista previa"}
              >
                <X size={16} />
              </button>
            </div>

            <div className="h-[70vh] overflow-hidden rounded-[20px] border border-white/10 bg-black">
              <iframe
                className="h-full w-full"
                src={projectModal.href}
                title={`${projectModal.title}-preview`}
                allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <a
                href={projectModal.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/85 transition-colors hover:text-white"
              >
                <ExternalLink size={13} />
                {isEnglish ? "Open in new tab" : "Abrir en nueva pestaña"}
              </a>
              <button
                onClick={() => setProjectModal(null)}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/85 transition-colors hover:text-white"
              >
                {isEnglish ? "Close" : "Cerrar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

