import { useState } from "react";
import { ExternalLink, Hand, MousePointer2, Play, X } from "lucide-react";

import { usePreferences } from "@/context/PreferencesContext";

type Project = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  previewHref?: string;
  kind: "site" | "video";
};

const projects: Project[] = [
  {
    title: "Fuerza Interior",
    subtitle: "Plataforma de bienestar emocional con micro-habitos",
    image: "/Assets/Proyectos/CoverFuerzaInterior.svg",
    href: "https://fuerza-interior.pages.dev/",
    kind: "site",
  },
  {
    title: "Sinergia",
    subtitle: "Landing estrategica orientada a conversion",
    image: "/Assets/Proyectos/CoverSinergia.png",
    href: "https://sinergia-website.netlify.app/",
    kind: "site",
  },
  {
    title: "Flowi",
    subtitle: "Demo de producto para comunidad UX/UI",
    image: "/Assets/Proyectos/CoverFlowi.png",
    href: "https://www.youtube.com/live/iIGyGMDSfbo?si=cZM6V9KHY8hUrlZu",
    previewHref: "https://www.youtube.com/embed/iIGyGMDSfbo?autoplay=1&rel=0&modestbranding=1",
    kind: "video",
  },
];

const toolLabelsByProject: Record<string, string[]> = {
  "Fuerza Interior": ["Miro", "Figma", "Maze"],
  Sinergia: ["HTML", "CSS", "React", "JavaScript", "MySQL", "Java", "Spring Boot", "Git & GitHub"],
  Flowi: ["Product demo", "UX/UI", "YouTube Live"],
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
            : project.title === "Flowi"
              ? "Product demo for a UX/UI community"
              : "Strategic landing page focused on conversion",
      }))
    : projects;

  const [active, setActive] = useState(0);
  const [projectModal, setProjectModal] = useState<{
    title: string;
    href: string;
    previewHref: string;
    kind: Project["kind"];
  } | null>(null);

  return (
    <section id="projects" className="scroll-mt-28 bg-[#0a0a0a] py-12 sm:py-14 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 md:px-10 xl:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="section-title">
            {isEnglish ? "MY " : "MIS "}
            <span className="section-title-accent">{isEnglish ? "PROJECTS" : "PROYECTOS"}</span>
          </h2>
          <p className="section-lead mt-4 sm:mt-5">
            {isEnglish
              ? "Cases where strategy, UX, and detail come together."
              : "Casos donde estrategia, UX y detalle se encuentran."}
          </p>

          <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/60 backdrop-blur-sm md:text-[11px]">
            <MousePointer2 size={12} className="hidden shrink-0 md:block" aria-hidden="true" />
            <Hand size={12} className="shrink-0 md:hidden" aria-hidden="true" />
            <span className="truncate">{isEnglish ? "Hover or tap to preview" : "Toca para explorar"}</span>
          </div>
        </div>

        <div className="lux-glass mt-9 grid h-auto w-full gap-3 overflow-hidden rounded-[22px] p-2 sm:mt-10 sm:rounded-[26px] md:mt-12 md:flex md:h-[520px] md:flex-row md:gap-4 md:rounded-[28px]">
          {localizedProjects.map((project, index) => {
            const isActive = active === index;
            const previewHref = project.previewHref ?? project.href;
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
                  setProjectModal({ title: project.title, href: project.href, previewHref, kind: project.kind });
                }}
                className={`lux-card group relative h-[300px] w-full overflow-hidden rounded-[20px] border border-white/10 transition-[flex,transform] duration-500 ease-out sm:h-[330px] sm:rounded-[22px] md:h-full md:rounded-[24px] ${
                  isActive ? "md:flex-[5]" : "md:flex-[1.6]"
                } framer-glow-sweep`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    project.title === "Flowi" ? "object-center" : ""
                  } ${isActive ? "scale-[1.02]" : "md:scale-100 md:grayscale md:blur-[2.2px] md:brightness-[0.55]"}`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/24 to-black/6" />
                {!isActive && <div className="absolute inset-0 hidden bg-black/22 md:block" aria-hidden="true" />}

                {project.kind === "video" && (
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/88 backdrop-blur-md">
                    <Play size={12} fill="currentColor" />
                    YouTube
                  </div>
                )}

                <div
                  className={`absolute bottom-0 left-0 w-full p-2.5 transition-all duration-500 sm:p-3 md:p-4 ${
                    isActive ? "md:translate-y-0 md:opacity-100" : "md:translate-y-4 md:opacity-0"
                  } translate-y-0 opacity-100`}
                >
                  <div className="lux-glass-soft mx-auto w-full rounded-[18px] p-3 sm:p-3.5 md:w-[96.5%]">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/60 sm:text-xs">
                        {project.kind === "video" ? "Demo" : isEnglish ? "Project" : "Proyecto"}
                      </p>
                      <h3 className="mt-1.5 text-[1.5rem] font-semibold leading-tight text-white sm:text-[1.7rem] md:text-[1.9rem]">
                        {project.title}
                      </h3>
                      <p className="mt-1.5 text-[12.5px] leading-[1.42] text-white/80 sm:text-[13px] md:text-sm">
                        {project.subtitle}
                      </p>

                      {projectToolLabels.length > 0 && (
                        <div className="mt-2.5 flex max-h-[72px] flex-wrap items-center gap-1.5 overflow-hidden sm:gap-2 md:max-h-none">
                          {projectToolLabels.map((tool) => (
                            <span
                              key={tool}
                              className="inline-flex items-center rounded-full border border-white/16 bg-[linear-gradient(145deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.02)_100%)] px-2.5 py-1 text-[9.5px] font-medium tracking-[0.03em] text-white/82 backdrop-blur-md sm:px-3 sm:text-[10px]"
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
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/84 px-3 py-4 backdrop-blur-sm sm:px-6">
          <div className="flex max-h-[94svh] w-full max-w-6xl flex-col overflow-hidden rounded-[22px] border border-white/12 bg-[#090909] p-3 shadow-2xl sm:rounded-[28px] sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3 sm:mb-4">
              <p className="min-w-0 truncate text-xs font-medium text-white/85 sm:text-sm">
                {projectModal.kind === "video" ? "Video" : isEnglish ? "Project preview" : "Vista previa del proyecto"} · {projectModal.title}
              </p>
              <button
                onClick={() => setProjectModal(null)}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/75 transition-colors hover:text-white"
                aria-label={isEnglish ? "Close preview" : "Cerrar vista previa"}
              >
                <X size={16} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-hidden rounded-[18px] border border-white/10 bg-black sm:rounded-[20px]">
              <iframe
                className="h-[62svh] w-full sm:h-[70vh]"
                src={projectModal.previewHref}
                title={`${projectModal.title}-preview`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
              <a
                href={projectModal.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.1em] text-white/85 transition-colors hover:text-white"
              >
                <ExternalLink size={13} />
                {projectModal.kind === "video" ? "YouTube" : isEnglish ? "Open in new tab" : "Abrir"}
              </a>
              <button
                onClick={() => setProjectModal(null)}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white/85 transition-colors hover:text-white"
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
