import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Binary, Check, CheckCircle2, Eye, FileCode2, Smartphone } from "lucide-react";

import { usePreferences, type AppLanguage } from "@/context/PreferencesContext";

const ASSETS = "/Assets/Proyectos/verytel";
const ACCENT = "#E85D04"; // Accent/600 del propio design system

type Landing = "a" | "b" | "c";

const es = {
  nav: { back: "Portafolio", backFull: "Volver al portafolio de Sara Ruiz", language: "Idioma" },
  hero: {
    eyebrow: "Caso de estudio · Freelance · 2026",
    title: "Verytel: un design system para tres landing pages",
    subtitle: "Auditoría y consolidación de un design system en Figma para un cliente del sector seguridad y tecnología territorial.",
    role: "Rol",
    roleText: "Diseño UI y design systems · Figma",
    chips: [],
  },
  stats: [
    { value: "3", label: "landings sobre un solo sistema" },
    { value: "2", label: "breakpoints: 1440 y 390" },
    { value: "−27 %", label: "variables duplicadas" },
    { value: "AA", label: "contraste WCAG corregido" },
  ],
  context: {
    title: "Contexto",
    text: "Tres públicos, una misma estructura y marca. Sin un sistema común, cada landing habría crecido con sus propios valores.",
    audiences: [
      ["A", "Ciudades y gobernaciones"],
      ["B", "Gobierno central"],
      ["C", "Hidrocarburos"],
    ],
  },
  work: {
    title: "Qué hice",
    items: [
      { icon: "audit", title: "Auditoría y consolidación", text: "Eliminé variables duplicadas y dejé una sola fuente de verdad para color, tipografía, radios y sombras." },
      { icon: "a11y", title: "Contraste WCAG AA", text: "Corregí las combinaciones que no cumplían AA directamente en los tokens, para las tres landings a la vez." },
      { icon: "responsive", title: "Tokens responsive", text: "Arquitectura Desktop 1440 y Mobile 390 con Auto Layout: el escalado entre breakpoints es automático." },
      { icon: "handoff", title: "Handoff", text: "Documentación del archivo, convenciones de nombrado, anotaciones de Dev Mode y componentes compartidos." },
    ],
    systemTitle: "Tokens de color y tipografía",
    systemText: "",
  },
  gallery: {
    title: "Las tres landings",
    intro: "Desplázate dentro de cada marco.",
    tabs: { a: "A · Ciudades", b: "B · Gobierno central", c: "C · Hidrocarburos" },
    desktop: "Desktop · 1440",
    mobile: "Mobile · 390",
    note: "Logo y datos del cliente ocultos por confidencialidad.",
    altDesktop: "Landing en escritorio",
    altMobile: "Landing en móvil",
  },
  docs: {
    title: "Documentación de handoff",
    text: "Alcance, arquitectura del archivo y convenciones de nombrado en una sola página.",
    alt: "Página de documentación general del archivo en Figma",
  },
  time: {
    title: "Gestión del tiempo",
    intro: "Una base, reutilizada. Tres entregas en las fechas acordadas.",
    steps: [
      ["30–31 jul", "Base", "Landing A con variables, Auto Layout y versión móvil."],
      ["1 ago", "Entrega de A", "Checklist de handoff. El 2 de agosto quedó como colchón."],
      ["3 ago", "B y C", "Se duplica la base: cambia el contenido, no el sistema."],
      ["4 ago", "Entrega de B y C", "Revisión responsive final y checklist de handoff."],
    ] as [string, string, string][],
  },
  next: {
    eyebrow: "Conclusión",
    title: "Un sistema, tres landings entregadas",
    intro: "Las tres landings se entregaron en las fechas acordadas y comparten un único design system en Figma, listo para desarrollo.",
    steps: [
      ["Un solo sistema", "Navbar, Footer, botones, formularios e íconos se reutilizan tal cual en A, B y C."],
      ["Más limpio y accesible", "27 % menos variables duplicadas y contraste corregido a WCAG AA en los tokens."],
      ["Responsive automático", "El escalado entre Desktop 1440 y Mobile 390 no requiere ajustes manuales."],
      ["Handoff documentado", "Alcance, nombrado y anotaciones de Dev Mode en el propio archivo."],
    ] as [string, string][],
  },
  footer: "Volver al portafolio",
};

const en: typeof es = {
  nav: { back: "Portfolio", backFull: "Back to Sara Ruiz's portfolio", language: "Language" },
  hero: {
    eyebrow: "Case study · Freelance · 2026",
    title: "Verytel: one design system for three landing pages",
    subtitle: "Audit and consolidation of a Figma design system for a client in the security and territorial technology sector.",
    role: "Role",
    roleText: "UI and design systems · Figma",
    chips: [],
  },
  stats: [
    { value: "3", label: "landings on one system" },
    { value: "2", label: "breakpoints: 1440 and 390" },
    { value: "−27%", label: "duplicated variables" },
    { value: "AA", label: "WCAG contrast fixed" },
  ],
  context: {
    title: "Context",
    text: "Three audiences, one shared structure and brand. Without a common system, each landing would have grown with its own values.",
    audiences: [
      ["A", "Cities and governorates"],
      ["B", "Central government"],
      ["C", "Oil and gas"],
    ],
  },
  work: {
    title: "What I did",
    items: [
      { icon: "audit", title: "Audit and consolidation", text: "Removed duplicated variables and left a single source of truth for color, typography, radii and shadows." },
      { icon: "a11y", title: "WCAG AA contrast", text: "Fixed non-compliant combinations directly in the tokens, for all three landings at once." },
      { icon: "responsive", title: "Responsive tokens", text: "Desktop 1440 and Mobile 390 architecture with Auto Layout: scaling between breakpoints is automatic." },
      { icon: "handoff", title: "Handoff", text: "File documentation, naming conventions, Dev Mode annotations and shared components." },
    ],
    systemTitle: "Color and typography tokens",
    systemText: "",
  },
  gallery: {
    title: "The three landings",
    intro: "Scroll inside each frame.",
    tabs: { a: "A · Cities", b: "B · Central government", c: "C · Oil and gas" },
    desktop: "Desktop · 1440",
    mobile: "Mobile · 390",
    note: "Client logo and details hidden for confidentiality.",
    altDesktop: "Landing on desktop",
    altMobile: "Landing on mobile",
  },
  docs: {
    title: "Handoff documentation",
    text: "Scope, file architecture and naming conventions on a single page.",
    alt: "General documentation page of the Figma file",
  },
  time: {
    title: "Time management",
    intro: "One base, reused. Three deliveries on the agreed dates.",
    steps: [
      ["Jul 30–31", "Base", "Landing A with variables, Auto Layout and mobile version."],
      ["Aug 1", "Delivery of A", "Handoff checklist. August 2 was kept as a buffer."],
      ["Aug 3", "B and C", "The base is duplicated: the content changes, not the system."],
      ["Aug 4", "Delivery of B and C", "Final responsive review and handoff checklist."],
    ],
  },
  next: {
    eyebrow: "Conclusion",
    title: "One system, three landings delivered",
    intro: "The three landings were delivered on the agreed dates and share a single Figma design system, ready for development.",
    steps: [
      ["One system", "Navbar, Footer, buttons, forms and icons are reused as-is across A, B and C."],
      ["Cleaner and accessible", "27% fewer duplicated variables and contrast fixed to WCAG AA in the tokens."],
      ["Automatically responsive", "Scaling between Desktop 1440 and Mobile 390 needs no manual tweaks."],
      ["Documented handoff", "Scope, naming and Dev Mode annotations in the file itself."],
    ],
  },
  footer: "Back to portfolio",
};

const copyByLanguage = { es, en };

const workIcons = { audit: Binary, a11y: Eye, responsive: Smartphone, handoff: FileCode2 } as const;

function LanguageToggle({
  language,
  setLanguage,
  label,
}: {
  language: AppLanguage;
  setLanguage: (l: AppLanguage) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-full border border-white/15 p-0.5 text-[11px] font-semibold">
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            language === code ? "bg-white text-black" : "text-white/70 hover:text-white"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">{children}</p>;
}

export default function VerytelCaseStudy() {
  const { language, setLanguage } = usePreferences();
  const c = copyByLanguage[language];
  const [params] = useSearchParams();
  const embedded = params.get("embed") === "1";
  const [landing, setLanding] = useState<Landing>("a");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = "Verytel | Case study · Sara Ruiz";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-manrope text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {embedded ? (
            <p className="text-sm font-semibold text-white/85">Verytel</p>
          ) : (
            <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-white">
              <ArrowLeft size={16} />
              {c.nav.back}
            </Link>
          )}
          <LanguageToggle language={language} setLanguage={setLanguage} label={c.nav.language} />
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
          <div className="mx-auto max-w-[900px]">
            <Eyebrow>{c.hero.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-[2.1rem] font-bold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl">{c.hero.title}</h1>
            <p className="mt-5 max-w-[720px] text-base leading-relaxed text-white/75 sm:text-lg">{c.hero.subtitle}</p>
            <p className="mt-5 text-sm text-white/65">
              <span className="font-semibold text-white/85">{c.hero.role}: </span>
              {c.hero.roleText}
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-white/10 bg-white/[0.02]">
          <dl className="mx-auto grid max-w-[1000px] grid-cols-2 md:grid-cols-4">
            {c.stats.map((s, i) => (
              <div key={s.label} className={`px-5 py-7 ${i % 2 === 1 ? "border-l border-white/10" : ""} ${i > 1 ? "border-t border-white/10 md:border-t-0" : ""} ${i > 0 ? "md:border-l md:border-white/10" : ""}`}>
                <dt className="text-3xl font-bold sm:text-4xl" style={{ color: ACCENT }}>
                  {s.value}
                </dt>
                <dd className="mt-2 text-xs leading-snug text-white/70 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CONTEXTO */}
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-[1000px] gap-8 md:grid-cols-[1.2fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">{c.context.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">{c.context.text}</p>
            </div>
            <ul className="space-y-3">
              {c.context.audiences.map(([letter, name]) => (
                <li key={letter} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-black" style={{ background: ACCENT }}>
                    {letter}
                  </span>
                  <span className="text-sm font-semibold sm:text-base">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* QUÉ HICE */}
        <section className="border-y border-white/10 bg-white/[0.02] px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="text-2xl font-semibold sm:text-3xl">{c.work.title}</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-2">
              {c.work.items.map((item) => {
                const Icon = workIcons[item.icon as keyof typeof workIcons];
                return (
                  <li key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl text-black" style={{ background: ACCENT }}>
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold leading-snug">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{item.text}</p>
                  </li>
                );
              })}
            </ol>

            <h3 className="mt-12 text-xl font-semibold">{c.work.systemTitle}</h3>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <img src={`${ASSETS}/ds-color.webp`} alt="Escalas de color del design system" loading="lazy" className="w-full rounded-2xl border border-white/10 bg-white" />
              <img src={`${ASSETS}/ds-typography.webp`} alt="Tipografía, sombras y radios del design system" loading="lazy" className="w-full rounded-2xl border border-white/10 bg-white" />
            </div>
          </div>
        </section>

        {/* GALERÍA */}
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="text-2xl font-semibold sm:text-3xl">{c.gallery.title}</h2>
            <p className="mt-3 text-sm text-white/70">{c.gallery.intro}</p>

            <div role="tablist" className="mt-6 flex flex-wrap gap-2">
              {(["a", "b", "c"] as const).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={landing === key}
                  onClick={() => setLanding(key)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                    landing === key ? "border-transparent text-black" : "border-white/20 text-white/80 hover:text-white"
                  }`}
                  style={landing === key ? { background: ACCENT } : undefined}
                >
                  {c.gallery.tabs[key]}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
              <figure>
                <figcaption className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/55">{c.gallery.desktop}</figcaption>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <div className="h-[420px] overflow-y-auto overscroll-contain sm:h-[560px]" tabIndex={0} aria-label={c.gallery.altDesktop}>
                    <img key={landing} src={`${ASSETS}/landing-${landing}-desktop.webp`} alt={`${c.gallery.altDesktop} ${landing.toUpperCase()}`} loading="lazy" className="block h-auto w-full" />
                  </div>
                </div>
              </figure>

              <figure className="mx-auto w-full max-w-[300px]">
                <figcaption className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/55">{c.gallery.mobile}</figcaption>
                <div className="overflow-hidden rounded-[2rem] border-[6px] border-[#1a1a1a] bg-black">
                  <div className="h-[420px] overflow-y-auto overscroll-contain sm:h-[560px]" tabIndex={0} aria-label={c.gallery.altMobile}>
                    <img key={landing} src={`${ASSETS}/landing-${landing}-mobile.webp`} alt={`${c.gallery.altMobile} ${landing.toUpperCase()}`} loading="lazy" className="block h-auto w-full" />
                  </div>
                </div>
              </figure>
            </div>
            <p className="mt-4 text-xs text-white/50">{c.gallery.note}</p>
          </div>
        </section>

        {/* DOCUMENTACIÓN */}
        <section className="border-y border-white/10 bg-white/[0.02] px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-[1000px] items-center gap-8 md:grid-cols-[1fr_380px]">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">{c.docs.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">{c.docs.text}</p>
            </div>
            <img src={`${ASSETS}/documentacion.webp`} alt={c.docs.alt} loading="lazy" className="w-full rounded-2xl border border-white/10" />
          </div>
        </section>

        {/* TIEMPO */}
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="text-2xl font-semibold sm:text-3xl">{c.time.title}</h2>
            <p className="mt-3 max-w-[720px] text-base text-white/75">{c.time.intro}</p>
            <ol className="mt-8 space-y-0">
              {c.time.steps.map(([date, title, text], i) => (
                <li key={date} className="grid grid-cols-[64px_1fr] gap-4 sm:grid-cols-[84px_1fr] sm:gap-6">
                  <div className="relative flex flex-col items-center">
                    <span className="rounded-full border px-2.5 py-1 text-[11px] font-bold" style={{ borderColor: ACCENT, color: ACCENT }}>
                      {date}
                    </span>
                    {i < c.time.steps.length - 1 && <span className="mt-1 w-px flex-1 bg-white/15" />}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONCLUSIÓN */}
        <section className="px-4 pb-14 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-[1000px] rounded-3xl border border-emerald-300/30 bg-emerald-300/[0.06] p-6 sm:p-10">
            <div className="flex items-center gap-3 text-emerald-200">
              <CheckCircle2 size={22} />
              <Eyebrow>{c.next.eyebrow}</Eyebrow>
            </div>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{c.next.title}</h2>
            <p className="mt-3 max-w-[760px] text-base leading-relaxed text-white/80">{c.next.intro}</p>
            <ol className="mt-7 grid gap-4 sm:grid-cols-2">
              {c.next.steps.map(([title, text]) => (
                <li key={title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-300 text-black">
                    <Check size={16} strokeWidth={3} />
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      {!embedded && (
        <footer className="border-t border-white/10 py-8">
          <div className="mx-auto flex max-w-[1100px] justify-center px-4 sm:px-6">
            <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 hover:text-white">
              <ArrowLeft size={15} />
              {c.nav.backFull}
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
}
