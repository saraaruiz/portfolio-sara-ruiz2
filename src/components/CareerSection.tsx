import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

const driveFolder =
  "https://drive.google.com/drive/folders/1KLKSbOdauBZczlnJOXxI1jNrasbqCKQV?dmr=1&ec=wgc-drive-%5Bmodule%5D-goto";

const categories = [
  {
    id: "educacion",
    label: "Educación",
    items: [
      {
        title: "Diseño UX/UI",
        meta: "Bogotá Institute of Technology & Corp. Univ. Iberoamericana",
        dates: "Ago. 2023 – Ene. 2026",
        description:
          "Con foco en metodologías ágiles, investigación de usuarios y prototipado avanzado en Figma.",
      },
      {
        title: "Diseño Industrial",
        meta: "Politécnico Grancolombiano · Bogotá",
        dates: "Feb. 2019 – Abr. 2023",
        description: "",
      },
      {
        title: "Desarrolladora Full Stack Java Junior",
        meta: "BIT & Generation Colombia",
        dates: "Ago. – Nov. 2023",
        description: "",
      },
    ],
  },
  {
    id: "experiencia",
    label: "Experiencia laboral",
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
      },
    ],
  },
  {
    id: "certificaciones",
    label: "Certificaciones & logros",
    items: [
      {
        title: "Google UX Design Certificate",
        meta: "Prototipado y Diseño de Alta Fidelidad (En curso)",
        dates: "2025",
        description: "",
      },
      {
        title: "SCRUM Foundation Professional Certificate",
        meta: "CertiProf",
        dates: "",
        description: "",
      },
      {
        title: "Public Speaking & Workplace Communication",
        meta: "Colombo Americano",
        dates: "",
        description: "",
      },
    ],
  },
];

export default function CareerSection() {
  const [open, setOpen] = useState("educacion");

  return (
    <section id="career" className="bg-[#F9F6E5] py-24 text-[#1A1A1A] md:py-28">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="max-w-3xl">
          <p className="eyebrow text-[#1A1A1A]/55">DESCUBRE MI CAMINO PROFESIONAL</p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-tight md:text-5xl">
            Formación, experiencia y una trayectoria construida entre diseño, estrategia y ejecución.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-5">
            {categories.map((category) => {
              const isOpen = category.id === open;

              return (
                <div key={category.id} className="career-card rounded-[28px] border border-black/10 bg-white/45 p-5 md:p-7">
                  <button
                    className="flex w-full items-center justify-between gap-6 text-left"
                    onClick={() => setOpen(isOpen ? "" : category.id)}
                  >
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[#1A1A1A]/55">Categoría</p>
                      <h3 className="mt-2 text-2xl font-medium">{category.label}</h3>
                    </div>

                    <ChevronDown
                      size={22}
                      className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-6 space-y-6">
                      {category.items.map((item) => (
                        <article key={item.title} className="rounded-[24px] border border-black/8 bg-white/70 p-5">
                          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="max-w-3xl">
                              <h4 className="text-lg font-semibold">{item.title}</h4>
                              <p className="mt-1 text-sm text-[#1A1A1A]/70">{item.meta}</p>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-[#1A1A1A]/60">
                              {item.dates && <span>{item.dates}</span>}
                              <a
                                href={driveFolder}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black hover:text-white"
                                aria-label="Abrir carpeta de certificados"
                              >
                                <ExternalLink size={15} />
                              </a>
                            </div>
                          </div>

                          {item.description && <p className="mt-4 text-sm leading-7 text-[#1A1A1A]/78">{item.description}</p>}

                          {item.bullets && (
                            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#1A1A1A]/78">
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

          <aside className="rounded-[32px] border border-black/10 bg-white/65 p-6 md:p-8">
            <p className="eyebrow text-[#1A1A1A]/55">Certificados</p>
            <h3 className="mt-4 text-2xl font-medium">Estructura preparada para tus cargas de Google Drive</h3>
            <p className="mt-4 text-sm leading-7 text-[#1A1A1A]/72">
              Mantengo un solo acceso base mientras completas la carpeta con PDFs o enlaces individuales. Cuando tengas
              los documentos finales, solo reemplazamos cada link por certificado sin tocar el layout.
            </p>

            <a
              href={driveFolder}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/15 px-4 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white"
            >
              Abrir carpeta base <ExternalLink size={14} />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}