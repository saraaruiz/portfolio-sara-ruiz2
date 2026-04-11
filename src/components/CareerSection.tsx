import { useState } from "react";
import { ChevronDown, ExternalLink, Eye, X } from "lucide-react";
import { usePreferences } from "@/context/PreferencesContext";

type CareerItem = {
  title: string;
  meta: string;
  dates?: string;
  year?: string;
  description?: string;
  bullets?: string[];
  certFiles?: string[];
  externalUrl?: string;
};

type CareerCategory = {
  id: string;
  label: string;
  items: CareerItem[];
};

const categoriesByLanguage: Record<"es" | "en", CareerCategory[]> = {
  es: [
    {
      id: "educacion",
      label: "EDUCACIÓN",
      items: [
        {
          title: "Diseño UX/UI",
          meta: "Bogotá Institute of Technology & Corp. Univ. Iberoamericana",
          dates: "Ago. 2023 – Ene. 2026",
          description:
            "Con foco en metodologías ágiles, investigación de usuarios y prototipado avanzado en Figma.",
          certFiles: ["/Assets/Carrera/diploma-diseño-ux-ui.pdf"],
        },
        {
          title: "Diseño Industrial",
          meta: "Politécnico Grancolombiano · Bogotá",
          dates: "Feb. 2019 – Abr. 2023",
          certFiles: ["/Assets/Carrera/diploma-diseño-industrial.pdf"],
        },
        {
          title: "Desarrolladora Full Stack Java Junior",
          meta: "BIT & Generation Colombia",
          dates: "Ago. – Nov. 2023",
          certFiles: ["/Assets/Carrera/diploma-fullstack.pdf"],
        },
      ],
    },
    {
      id: "experiencia",
      label: "EXPERIENCIA LABORAL",
      items: [
        {
          title: "Bliss Companies (EE.UU.) · Asistente Virtual",
          meta: "Clínica estética líder · Remoto · Atención en inglés",
          dates: "Abr. 2024 – Jul. 2025",
          bullets: [
            "Identifiqué patrones de fricción en el flujo de agendamiento a partir de interacción directa con pacientes.",
            "Analicé comportamientos para optimizar procesos en entorno de alto volumen y diseñé materiales de onboarding estructurados.",
            "Reduje consultas repetidas de pacientes al proponer mejoras al flujo de atención.",
            "Logré incorporación funcional de nuevos agentes en menos de una semana.",
          ],
        },
        {
          title: "Teleperformance · Representante de Soporte — Cuenta PlayStation",
          meta: "Bogotá, Colombia · Atención a usuarios de EE.UU. y Canadá en inglés",
          dates: "Feb. – Abr. 2024",
          bullets: [
            "Analicé y resolví problemas de usabilidad en software, hardware y accesos; identifiqué puntos críticos en la experiencia de usuario.",
            "Gestioné casos bajo métricas SLA manteniendo tiempos de resolución óptimos del equipo.",
          ],
        },
        {
          title: "International Business School Américas · Creadora de Contenido",
          meta: "California, EE.UU. · Marketing Digital",
          dates: "Dic. 2022 – Ene. 2023",
          bullets: [
            "Produje contenido visual adaptado a múltiples plataformas, reforzando identidad visual e interacción en redes sociales.",
          ],
          externalUrl: "https://www.instagram.com/reel/C1CzyTwso3D/?igsh=OHQxbjFyNXdocWZt",
        },
      ],
    },
    {
      id: "certificaciones",
      label: "CERTIFICACIONES & LOGROS",
      items: [
        {
          title: "SCRUM Foundation Professional Certificate",
          meta: "CertiProf",
          year: "2024",
          certFiles: ["/Assets/Carrera/certificado-scrum.pdf"],
        },
        {
          title: "Workplace Communication + Public Speaking",
          meta: "Colombo Americano",
          year: "2023",
          certFiles: [
            "/Assets/Carrera/certificado-workplace-communication.pdf",
            "/Assets/Carrera/certificado-public-speaking.pdf",
          ],
        },
        {
          title: "Design Thinking & Storytelling",
          meta: "California State University Northridge · IBS International Business School Americas",
          year: "Ene. 2023",
        },
        {
          title: "Protagonistas del Futuro & Disney",
          meta: "Chicas en Tecnología",
          year: "2023",
        },
        {
          title: "Red de Mentoras Voluntarias del Programa Chicas STEAM",
          meta: "Corporación Maloka de Ciencia, Tecnología e Innovación",
          year: "10 Nov. 2022",
        },
        {
          title: "Crear prototipos y diseños de alta fidelidad en Figma",
          meta: "Google · Coursera",
          year: "En curso",
        },
      ],
    },
  ],
  en: [
    {
      id: "educacion",
      label: "EDUCATION",
      items: [
        {
          title: "UX/UI Design",
          meta: "Bogotá Institute of Technology & Corp. Univ. Iberoamericana",
          dates: "Aug. 2023 – Jan. 2026",
          description:
            "Focused on agile methodologies, user research, and advanced prototyping in Figma.",
          certFiles: ["/Assets/Carrera/diploma-diseño-ux-ui.pdf"],
        },
        {
          title: "Industrial Design",
          meta: "Politécnico Grancolombiano · Bogotá",
          dates: "Feb. 2019 – Apr. 2023",
          certFiles: ["/Assets/Carrera/diploma-diseño-industrial.pdf"],
        },
        {
          title: "Junior Full Stack Java Developer",
          meta: "BIT & Generation Colombia",
          dates: "Aug. – Nov. 2023",
          certFiles: ["/Assets/Carrera/diploma-fullstack.pdf"],
        },
      ],
    },
    {
      id: "experiencia",
      label: "WORK EXPERIENCE",
      items: [
        {
          title: "Bliss Companies (U.S.) · Virtual Assistant",
          meta: "Leading aesthetic clinic · Remote · English support",
          dates: "Apr. 2024 – Jul. 2025",
          bullets: [
            "Identified friction patterns in the scheduling flow through direct interaction with patients.",
            "Analyzed behavior to optimize high-volume processes and designed structured onboarding materials.",
            "Reduced repeated patient inquiries by proposing improvements to the service flow.",
            "Enabled new agents to become fully operational in under one week.",
          ],
        },
        {
          title: "Teleperformance · Support Representative — PlayStation Account",
          meta: "Bogotá, Colombia · English support for U.S. and Canada users",
          dates: "Feb. – Apr. 2024",
          bullets: [
            "Analyzed and resolved usability issues in software, hardware, and access flows; identified critical UX pain points.",
            "Managed cases under SLA metrics while maintaining optimal team resolution times.",
          ],
        },
        {
          title: "International Business School Américas · Content Creator",
          meta: "California, U.S. · Digital Marketing",
          dates: "Dec. 2022 – Jan. 2023",
          bullets: [
            "Produced visual content adapted for multiple platforms, reinforcing visual identity and social engagement.",
          ],
          externalUrl: "https://www.instagram.com/reel/C1CzyTwso3D/?igsh=OHQxbjFyNXdocWZt",
        },
      ],
    },
    {
      id: "certificaciones",
      label: "CERTIFICATIONS & ACHIEVEMENTS",
      items: [
        {
          title: "SCRUM Foundation Professional Certificate",
          meta: "CertiProf",
          year: "2024",
          certFiles: ["/Assets/Carrera/certificado-scrum.pdf"],
        },
        {
          title: "Workplace Communication + Public Speaking",
          meta: "Colombo Americano",
          year: "2023",
          certFiles: [
            "/Assets/Carrera/certificado-workplace-communication.pdf",
            "/Assets/Carrera/certificado-public-speaking.pdf",
          ],
        },
        {
          title: "Design Thinking & Storytelling",
          meta: "California State University Northridge · IBS International Business School Americas",
          year: "Jan. 2023",
        },
        {
          title: "Future Protagonists & Disney",
          meta: "Chicas en Tecnología",
          year: "2023",
        },
        {
          title: "Volunteer Mentors Network · Chicas STEAM Program",
          meta: "Maloka Science, Technology and Innovation Corporation",
          year: "Nov. 10, 2022",
        },
        {
          title: "Create High-Fidelity Prototypes and Designs in Figma",
          meta: "Google · Coursera",
          year: "In progress",
        },
      ],
    },
  ],
};

type ModalState = {
  title: string;
  files: string[];
} | null;

export default function CareerSection() {
  const { language } = usePreferences();
  const isEnglish = language === "en";
  const categories = categoriesByLanguage[language];

  const [open, setOpen] = useState("");
  const [modal, setModal] = useState<ModalState>(null);

  const openPdfModal = (title: string, files: string[]) => {
    setModal({ title, files });
  };

  return (
    <>
      <section id="career" className="career-theme-glass scroll-mt-28 py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
          <div className="max-w-4xl">
            <h2 className="section-title">
              {isEnglish ? "DISCOVER MY" : "DESCUBRE MI"}
              <br />
              <span className="section-title-accent">{isEnglish ? "PROFESSIONAL PATH" : "CAMINO PROFESIONAL"}</span>
            </h2>
          </div>

          <div className="mt-14 space-y-5">
            {categories.map((category) => {
              const isOpen = category.id === open;

              return (
                <div
                  key={category.id}
                  className="lux-glass lux-card framer-glow-sweep rounded-[28px] p-5 md:p-7"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-6 text-left"
                    onClick={(event) => {
                      event.preventDefault();
                      setOpen(isOpen ? "" : category.id);
                    }}
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-2xl font-medium tracking-wide md:text-4xl">
                      {category.label}
                    </h3>
                    <ChevronDown
                      size={24}
                      className={`shrink-0 text-white/70 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-7 space-y-4">
                      {category.items.map((item) => (
                        <article
                          key={item.title}
                          className="lux-glass-soft lux-card rounded-2xl p-5"
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                            <div className="max-w-4xl">
                              <h4 className="text-base font-semibold md:text-lg">{item.title}</h4>
                              <p className="mt-1 text-sm text-white/65">{item.meta}</p>
                            </div>

                            <div className="flex flex-col items-start gap-2 md:items-end">
                              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                                {item.certFiles && item.certFiles.length > 0 && (
                                  <button
                                    onClick={() => openPdfModal(item.title, item.certFiles!)}
                                    className="cert-cta-attention inline-flex items-center gap-2 rounded-full border border-[#9cc02c] bg-[#d4ff59]/18 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#e9f8b6] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#d4ff59] hover:bg-[#d4ff59]/28 hover:text-[#f5ffd8]"
                                    aria-label={`${isEnglish ? "View certificate for" : "Ver diploma de"} ${item.title}`}
                                  >
                                    <Eye size={15} />
                                    {isEnglish ? "View certificate" : "Ver certificado"}
                                  </button>
                                )}

                                {item.externalUrl && (
                                  <a
                                    href={item.externalUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-[#9cc02c] bg-[#d4ff59]/18 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#e9f8b6] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#d4ff59] hover:bg-[#d4ff59]/28 hover:text-[#f5ffd8]"
                                    aria-label={`${isEnglish ? "Open link for" : "Abrir enlace de"} ${item.title}`}
                                  >
                                    <ExternalLink size={15} />
                                    {isEnglish ? "View proof" : "Ver evidencia"}
                                  </a>
                                )}
                              </div>

                              {(item.dates || item.year) && (
                                <div className="space-y-1 text-[11px] font-medium tracking-[0.12em] text-white/55 md:text-right">
                                  {item.dates && <p>{item.dates}</p>}
                                  {item.year && <p>{item.year}</p>}
                                </div>
                              )}
                            </div>
                          </div>

                          {item.description && (
                            <p className="mt-4 text-sm leading-7 text-white/75">{item.description}</p>
                          )}

                          {item.bullets && (
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/75">
                              {item.bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-3">
                                  <span className="mt-[11px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#CD3075]" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 px-6 backdrop-blur-sm">
          <div className="lux-glass w-full max-w-5xl overflow-hidden rounded-[28px] p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white/80">{modal.title}</p>
              <button
                onClick={() => setModal(null)}
                className="lux-chip inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="h-[70vh] overflow-y-auto rounded-[22px] bg-black p-2">
              {modal.files.map((file, fileIndex) => (
                <div key={file} className="mb-4 h-[68vh] overflow-hidden rounded-xl border border-white/10">
                  <iframe className="h-full w-full" src={file} title={`${modal.title}-${fileIndex + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
