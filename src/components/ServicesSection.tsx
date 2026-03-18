import { usePreferences } from "@/context/PreferencesContext";

type ToolItem = {
  label: string;
  file: string;
};

type ServiceCard = {
  title: string;
  eyebrow: string;
  body: string;
  keywords: [string, string, string];
  tools: ToolItem[];
};

export default function ServicesSection() {
  const { language } = usePreferences();
  const isEnglish = language === "en";
  const cardLooks = [
    { line: "#d4ff59", title: "#d4ff59", glow: "rgba(212,255,89,0.24)" },
    { line: "#c6ef7a", title: "#c6ef7a", glow: "rgba(198,239,122,0.24)" },
    { line: "#B62A66", title: "#B62A66", glow: "rgba(182,42,102,0.24)" },
    { line: "#F199B9", title: "#F199B9", glow: "rgba(241,153,185,0.26)" },
  ] as const;

  const cards: ServiceCard[] = isEnglish
    ? [
        {
          title: "Structure & UX",
          eyebrow: "Understand before creating.",
          body: "I structure digital systems with a clear focus on who uses them and why.",
          keywords: ["Research", "Flows", "Architecture"],
          tools: [
            { label: "Figma", file: "Figma.svg" },
            { label: "Miro", file: "Miro.svg" },
            { label: "Notion", file: "Notion.svg" },
            { label: "Maze", file: "Maze.svg" },
          ],
        },
        {
          title: "Design & Prototype",
          eyebrow: "From idea to form.",
          body: "I design intuitive, functional prototypes and interfaces for web and mobile platforms.",
          keywords: ["Wireframes", "UI Systems", "Prototypes"],
          tools: [
            { label: "Figma", file: "Figma.svg" },
            { label: "Illustrator", file: "Illustrator.svg" },
            { label: "Photoshop", file: "Photoshop.svg" },
            { label: "Stitch", file: "Stitch.svg" },
            { label: "Lovable", file: "Lovable.svg" },
          ],
        },
        {
          title: "Validation & Iteration",
          eyebrow: "Listen to improve.",
          body: "I iterate solutions based on real testing and usage patterns, not assumptions.",
          keywords: ["Usability", "Feedback", "Iteration"],
          tools: [
            { label: "Maze", file: "Maze.svg" },
            { label: "Figma", file: "Figma.svg" },
            { label: "Notion", file: "Notion.svg" },
            { label: "Slack", file: "Slack.svg" },
          ],
        },
        {
          title: "Interactions & Detail",
          eyebrow: "Details matter.",
          body: "I design interactions and micro-animations that elevate the experience without distraction.",
          keywords: ["Micro UX", "Transitions", "UI Detail"],
          tools: [
            { label: "Figma", file: "Figma.svg" },
            { label: "Framer", file: "Framer.svg" },
            { label: "CSS3", file: "Css.svg" },
            { label: "Lovable", file: "Lovable.svg" },
          ],
        },
      ]
    : [
        {
          title: "Estructura & UX",
          eyebrow: "Comprender antes de crear.",
          body: "Estructuro sistemas digitales teniendo presente quién los usa y por qué.",
          keywords: ["Research", "Flujos", "Arquitectura"],
          tools: [
            { label: "Figma", file: "Figma.svg" },
            { label: "Miro", file: "Miro.svg" },
            { label: "Notion", file: "Notion.svg" },
            { label: "Maze", file: "Maze.svg" },
          ],
        },
        {
          title: "Diseño & Prototipo",
          eyebrow: "De la idea a la forma.",
          body: "Diseño prototipos e interfaces intuitivas y funcionales para plataformas web y mobile.",
          keywords: ["Wireframes", "Sistemas UI", "Prototipos"],
          tools: [
            { label: "Figma", file: "Figma.svg" },
            { label: "Illustrator", file: "Illustrator.svg" },
            { label: "Photoshop", file: "Photoshop.svg" },
            { label: "Stitch", file: "Stitch.svg" },
            { label: "Lovable", file: "Lovable.svg" },
          ],
        },
        {
          title: "Validación e Iteración",
          eyebrow: "Escuchar para mejorar.",
          body: "Itero soluciones a partir de pruebas reales y patrón de uso, no suposiciones.",
          keywords: ["Usabilidad", "Feedback", "Iteración"],
          tools: [
            { label: "Maze", file: "Maze.svg" },
            { label: "Figma", file: "Figma.svg" },
            { label: "Notion", file: "Notion.svg" },
            { label: "Slack", file: "Slack.svg" },
          ],
        },
        {
          title: "Interacciones & Detalle",
          eyebrow: "Los detalles cuentan.",
          body: "Diseño interacciones y micro-animaciones que elevan la experiencia sin distraer.",
          keywords: ["Micro UX", "Transiciones", "Detalle UI"],
          tools: [
            { label: "Figma", file: "Figma.svg" },
            { label: "Framer", file: "Framer.svg" },
            { label: "CSS3", file: "Css.svg" },
            { label: "Lovable", file: "Lovable.svg" },
          ],
        },
      ];

  return (
    <section id="services" className="scroll-mt-28 bg-[#0a0a0a] py-14 md:py-16">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10 xl:px-16">
        <div className="max-w-4xl">
          <h2 className="section-title">
            {isEnglish ? "WHAT I CAN" : "QUÉ PUEDO"}
            <br />
            <span className="section-title-accent">{isEnglish ? "DO FOR YOU" : "HACER POR TI"}</span>
          </h2>
          <p className="section-lead mt-4 max-w-[560px] text-white/85">
            {isEnglish
              ? "I turn ideas into clear, functional digital products ready to scale."
              : "Transformo ideas en productos digitales claros, funcionales y listos para crecer."}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
          {cards.map((card, index) => {
            const look = cardLooks[index % cardLooks.length];
            return (
            <article
              key={card.title}
              className="lux-glass lux-card framer-fade-up group relative flex flex-col overflow-hidden rounded-[26px] border border-white/12 p-6 transition-transform duration-300 hover:-translate-y-[3px] md:min-h-[340px] md:p-7"
              style={{
                animationDelay: `${index * 90}ms`,
                background: "linear-gradient(160deg, rgba(10,10,14,0.92) 0%, rgba(10,10,14,0.8) 100%)",
                boxShadow: "0 20px 44px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <span
                className="pointer-events-none absolute left-6 top-0 h-[2px] w-14 rounded-full transition-all duration-300 group-hover:w-24"
                style={{ backgroundColor: look.line, boxShadow: `0 0 16px ${look.glow}` }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(900px 240px at 0% 0%, rgba(255,255,255,0.06), transparent 62%)",
                }}
              />

              <div className="relative flex items-center justify-between">
                <p className="text-sm font-medium text-white/74">{card.eyebrow}</p>
                <span className="text-xs font-semibold tracking-[0.14em] text-white/36">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="relative mt-3 text-[1.72rem] font-semibold leading-tight md:text-[1.9rem]" style={{ color: look.title }}>{card.title}</h3>
              <p className="relative mt-3 max-w-[40ch] text-[14px] leading-6 text-white/78 md:text-[15px] md:leading-6">{card.body}</p>

              <ul className="relative mt-5 grid grid-cols-3 gap-2 text-center text-[11px] uppercase tracking-[0.12em] text-white/76">
                {card.keywords.map((keyword) => (
                  <li
                    key={keyword}
                    className="rounded-full border border-[#44283a]/80 bg-[linear-gradient(180deg,rgba(22,26,18,0.95)_0%,rgba(31,12,24,0.95)_100%)] px-2 py-1.5 text-white/92 shadow-[0_8px_18px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 hover:-translate-y-[1px] hover:border-[#CD3075]/52 hover:shadow-[0_10px_22px_rgba(205,48,117,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]"
                    style={{
                      textShadow: "0 0 8px rgba(255,255,255,0.12)",
                    }}
                  >
                    {keyword}
                  </li>
                ))}
              </ul>

              <div className="relative mt-auto border-t border-white/10 pt-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/42">
                  {isEnglish ? "Tools" : "Herramientas"}
                </p>

                <ul className="mt-2.5 flex flex-wrap items-center gap-2.5">
                  {card.tools.map((tool) => (
                    <li key={`${card.title}-${tool.label}`}>
                      <span
                        className="group/tool inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#412739]/82 bg-white/[0.03] transition-all duration-200 hover:-translate-y-[1px] hover:scale-[1.06] hover:border-[#d4ff59]/55 hover:shadow-[0_0_16px_rgba(212,255,89,0.22)]"
                        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)" }}
                        title={tool.label}
                        aria-label={tool.label}
                      >
                        <img
                          src={`/Assets/Stack/${tool.file}`}
                          alt=""
                          aria-hidden="true"
                          className="h-4 w-4 object-contain opacity-90 transition-transform duration-200 group-hover/tool:scale-110"
                          style={{ filter: "brightness(0) invert(1)" }}
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
