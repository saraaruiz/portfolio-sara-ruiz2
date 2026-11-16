import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, ClipboardCheck, MoveHorizontal } from "lucide-react";

import { usePreferences, type AppLanguage } from "@/context/PreferencesContext";

const BEFORE_URL = "https://sitio-selecto-presentacion.netlify.app/";
const AFTER_URL = "https://selectobarbershop.pages.dev/";
const ASSETS = "/Assets/Proyectos/selecto";

type Decision = { title: string; problem: string; decision: string; principle: string };

const es = {
  nav: { back: "Portafolio", backFull: "Volver al portafolio de Sara Ruiz", language: "Idioma" },
  hero: {
    eyebrow: "Caso de estudio · 2023 → 2026",
    title: "Selecto: antes y después",
    subtitle:
      "El primer sitio web de Selecto Barber Shop (Bogotá) fue mi primer proyecto full-stack, en 2023. No era responsive y tenía problemas de usabilidad. En 2026 lo rediseñé.",
    before: "Ver sitio anterior",
    after: "Ver rediseño",
  },
  compare: {
    title: "Arrastra para comparar",
    desktop: "Escritorio",
    mobile: "Móvil",
    before: "Antes · 2023",
    after: "Después · 2026",
    hint: "Desliza el control para ver el antes y el después",
    altBefore: "Sitio de Selecto en 2023",
    altAfter: "Rediseño de Selecto en 2026",
  },
  context: {
    title: "El contexto",
    text: "Sinergia fue una agencia/equipo de 2023 con la que desarrollamos el primer sitio de Selecto. Fue mi primer proyecto full-stack. Tres años después, rediseñé el sitio completo.",
    v1: "Versión 2023 · Sinergia",
    v2: "Rediseño 2026",
    tools1: ["HTML", "CSS", "JavaScript", "React", "Java", "Spring Boot", "MySQL"],
    tools2: ["Next.js", "Tailwind", "Framer Motion"],
  },
  changes: {
    title: "Qué cambié y por qué",
    problemLabel: "Problema",
    decisionLabel: "Decisión",
    principleLabel: "Principio UX",
    items: [
      {
        title: "Un solo llamado a la acción por pantalla",
        problem:
          "En el hero había dos botones casi iguales (“Reserva y reclama tu estilo único” y “¡Descubre tu próximo look!”) que competían entre sí.",
        decision:
          "Bajo el título ahora van las reseñas de Google y las redes. Agendar queda en el menú y en WhatsApp.",
        principle: "Carga cognitiva y diseño minimalista (Nielsen).",
      },
      {
        title: "Contenido real en vez de vacío",
        problem:
          "Servicios y productos se cargaban desde listas vacías y la página de reservas decía “en construcción”.",
        decision: "Ahora hay productos con precios reales, equipo, reseñas reales de Google y mapa.",
        principle: "Correspondencia entre el sistema y el mundo real (Nielsen).",
      },
      {
        title: "Prueba social y datos de contacto arriba",
        problem: "El sitio no tenía horario, mapa ni reseñas.",
        decision: "Ahora hay reseñas de Google, un mapa embebido, y teléfono y correo clicables.",
        principle: "Credibilidad y reconocer en vez de recordar (Nielsen).",
      },
      {
        title: "Agendar por el canal que el cliente ya usa",
        problem: "La página de reservas decía “en construcción”: desde el sitio no había forma real de agendar.",
        decision: "El formulario abre WhatsApp con la solicitud ya escrita.",
        principle: "Ley de Jakob (consistencia con lo conocido) y reducir fricción.",
      },
    ] as Decision[],
    responsive: {
      title: "Diseño responsive",
      text: "El sitio de 2023 no se adaptaba a móvil. El rediseño sí.",
    },
  },
  pending: {
    eyebrow: "Qué falta comprobar",
    title: "Próximos pasos: validar con datos reales",
    intro:
      "Hoy el rediseño se apoya en una revisión experta con las 10 heurísticas de Nielsen, no en pruebas con usuarios, y todavía no tengo métricas de conversión. Así lo voy a comprobar:",
    steps: [
      {
        title: "Conocer a usuarios reales",
        text: "Conversaciones breves con clientes de la barbería para entender cómo buscan el horario, cómo llegan y cómo reservan hoy.",
      },
      {
        title: "Pruebas con 5 usuarios en ambos sitios",
        text: "Dos tareas en el sitio anterior y en el rediseño: encontrar el horario y cómo llegar, y pedir una cita. Comparar si lo logran, cuánto tardan y dónde se traban.",
      },
      {
        title: "Medir con Google Analytics",
        text: "Configurar eventos para los clics en “Agenda aquí”, WhatsApp, reseñas, mapa, teléfono y correo, y revisar cómo se comporta la gente en el sitio.",
      },
      {
        title: "Iterar con lo aprendido",
        text: "Ajustar las decisiones según lo que muestren las pruebas y los datos, y actualizar este caso con resultados reales.",
      },
    ],
  },
  cta: { title: "Compara los dos sitios en vivo", before: "Ver sitio anterior", after: "Ver rediseño" },
};

const en: typeof es = {
  nav: { back: "Portfolio", backFull: "Back to Sara Ruiz's portfolio", language: "Language" },
  hero: {
    eyebrow: "Case study · 2023 → 2026",
    title: "Selecto: before and after",
    subtitle:
      "The first website for Selecto Barber Shop (Bogotá) was my first full-stack project, in 2023. It wasn't responsive and had usability problems. In 2026 I redesigned it.",
    before: "View previous site",
    after: "View redesign",
  },
  compare: {
    title: "Drag to compare",
    desktop: "Desktop",
    mobile: "Mobile",
    before: "Before · 2023",
    after: "After · 2026",
    hint: "Slide the handle to see before and after",
    altBefore: "Selecto website in 2023",
    altAfter: "Selecto redesign in 2026",
  },
  context: {
    title: "The context",
    text: "Sinergia was a 2023 agency/team that built Selecto's first website with me. It was my first full-stack project. Three years later, I redesigned the whole site.",
    v1: "2023 version · Sinergia",
    v2: "2026 redesign",
    tools1: ["HTML", "CSS", "JavaScript", "React", "Java", "Spring Boot", "MySQL"],
    tools2: ["Next.js", "Tailwind", "Framer Motion"],
  },
  changes: {
    title: "What I changed and why",
    problemLabel: "Problem",
    decisionLabel: "Decision",
    principleLabel: "UX principle",
    items: [
      {
        title: "One call to action per screen",
        problem:
          "The hero had two almost identical buttons (“Book and claim your unique style” and “Discover your next look!”) competing with each other.",
        decision:
          "Under the headline there are now Google reviews and social links. Booking lives in the menu and on WhatsApp.",
        principle: "Cognitive load and minimalist design (Nielsen).",
      },
      {
        title: "Real content instead of empty states",
        problem:
          "Services and products loaded from empty lists, and the booking page said “under construction”.",
        decision: "Now there are products with real prices, the team, real Google reviews and a map.",
        principle: "Match between the system and the real world (Nielsen).",
      },
      {
        title: "Social proof and contact details up front",
        problem: "The site had no opening hours, no map and no reviews.",
        decision: "Now there are Google reviews, an embedded map, and clickable phone and email.",
        principle: "Credibility and recognition over recall (Nielsen).",
      },
      {
        title: "Booking through the channel the client already uses",
        problem: "The booking page said “under construction”: there was no real way to book from the site.",
        decision: "The form opens WhatsApp with the request already written.",
        principle: "Jakob's Law (consistency with what people know) and less friction.",
      },
    ],
    responsive: {
      title: "Responsive design",
      text: "The 2023 site didn't adapt to mobile. The redesign does.",
    },
  },
  pending: {
    eyebrow: "What still needs to be tested",
    title: "Next steps: validate with real data",
    intro:
      "Today the redesign rests on an expert review with Nielsen's 10 heuristics, not on user testing, and I don't have conversion metrics yet. This is how I'll check it:",
    steps: [
      {
        title: "Get to know real users",
        text: "Short conversations with the barbershop's clients to understand how they look for opening hours, how they get there and how they book today.",
      },
      {
        title: "Tests with 5 users on both sites",
        text: "Two tasks on the previous site and on the redesign: find the opening hours and how to get there, and request an appointment. Compare whether they succeed, how long it takes and where they get stuck.",
      },
      {
        title: "Measure with Google Analytics",
        text: "Set up events for clicks on “Agenda aquí”, WhatsApp, reviews, map, phone and email, and look at how people behave on the site.",
      },
      {
        title: "Iterate on what I learn",
        text: "Adjust the decisions based on what the tests and data show, and update this case with real results.",
      },
    ],
  },
  cta: { title: "Compare both sites live", before: "View previous site", after: "View redesign" },
};

const copyByLanguage = { es, en };

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

function LinkButtons({ beforeLabel, afterLabel }: { beforeLabel: string; afterLabel: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={BEFORE_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        {beforeLabel}
        <ArrowUpRight size={16} />
      </a>
      <a
        href={AFTER_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition-colors hover:bg-white/85"
      >
        {afterLabel}
        <ArrowUpRight size={16} />
      </a>
    </div>
  );
}

/** Comparador antes/después: input range nativo invisible encima (arrastre, teclado y táctil). */
function Compare({
  before,
  after,
  aspect,
  labelBefore,
  labelAfter,
  altBefore,
  altAfter,
  hint,
}: {
  before: string;
  after: string;
  aspect: string;
  labelBefore: string;
  labelAfter: string;
  altBefore: string;
  altAfter: string;
  hint: string;
}) {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const moveTo = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      className="relative w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 bg-black"
      style={{ aspectRatio: aspect }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        moveTo(e);
      }}
      onPointerMove={(e) => {
        if (dragging.current) moveTo(e);
      }}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img src={after} alt={altAfter} draggable={false} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <img
        src={before}
        alt={altBefore}
        draggable={false}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
        {labelBefore}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black">
        {labelAfter}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)]" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/70 text-white backdrop-blur-md">
          <MoveHorizontal size={18} />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={hint}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
      />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">{children}</p>;
}

export default function SelectoCaseStudy() {
  const { language, setLanguage } = usePreferences();
  const c = copyByLanguage[language];
  const [params] = useSearchParams();
  const embedded = params.get("embed") === "1";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = "Selecto: antes y después | Case study · Sara Ruiz";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-manrope text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {embedded ? (
            <p className="text-sm font-semibold text-white/85">Selecto</p>
          ) : (
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-white"
            >
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
            <h1 className="mt-4 text-[2.2rem] font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {c.hero.title}
            </h1>
            <p className="mt-5 max-w-[680px] text-base leading-relaxed text-white/75 sm:text-lg">{c.hero.subtitle}</p>
            <div className="mt-7">
              <LinkButtons beforeLabel={c.hero.before} afterLabel={c.hero.after} />
            </div>
          </div>
        </section>

        {/* COMPARADOR */}
        <section className="px-4 pb-14 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-[1000px]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold sm:text-xl">{c.compare.title}</h2>
              <span className="text-xs uppercase tracking-wider text-white/50">{c.compare.desktop}</span>
            </div>
            <Compare
              before={`${ASSETS}/antes-desktop.webp`}
              after={`${ASSETS}/despues-desktop.webp`}
              aspect="16 / 10"
              labelBefore={c.compare.before}
              labelAfter={c.compare.after}
              altBefore={c.compare.altBefore}
              altAfter={c.compare.altAfter}
              hint={c.compare.hint}
            />

            <p className="mb-3 mt-10 text-xs uppercase tracking-wider text-white/50">{c.compare.mobile}</p>
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {(
                [
                  ["antes-mobile", c.compare.before, c.compare.altBefore],
                  ["despues-mobile", c.compare.after, c.compare.altAfter],
                ] as const
              ).map(([file, label, alt]) => (
                <figure key={file} className="mx-auto w-full max-w-[300px]">
                  <div className="overflow-hidden rounded-[1.6rem] border-[6px] border-[#1a1a1a] bg-black shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                    <img
                      src={`${ASSETS}/${file}.webp`}
                      alt={`${alt} (${c.compare.mobile.toLowerCase()})`}
                      loading="lazy"
                      className="block h-auto w-full"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-wider text-white/65">
                    {label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CONTEXTO */}
        <section className="border-y border-white/10 bg-white/[0.02] px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-[1000px] gap-8 md:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">{c.context.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">{c.context.text}</p>
            </div>
            <div className="space-y-5">
              {(
                [
                  [c.context.v1, c.context.tools1],
                  [c.context.v2, c.context.tools2],
                ] as const
              ).map(([label, tools]) => (
                <div key={label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{label}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tools.map((t) => (
                      <span key={t} className="rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/85">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUÉ CAMBIÉ */}
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1000px]">
            <h2 className="text-2xl font-semibold sm:text-3xl">{c.changes.title}</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-2">
              {c.changes.items.map((item, i) => (
                <li key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug">{item.title}</h3>
                  <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-rose-300/90">{c.changes.problemLabel}</dt>
                      <dd className="mt-1 text-white/75">{item.problem}</dd>
                    </div>
                    <div className="flex items-center gap-2 text-white/35">
                      <ArrowRight size={14} />
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300/90">{c.changes.decisionLabel}</dt>
                      <dd className="mt-1 text-white/85">{item.decision}</dd>
                    </div>
                    <div className="border-t border-white/10 pt-3">
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-white/50">{c.changes.principleLabel}</dt>
                      <dd className="mt-1 text-white/70">{item.principle}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-black">5</span>
              <div>
                <h3 className="text-lg font-semibold">{c.changes.responsive.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/75">{c.changes.responsive.text}</p>
              </div>
            </div>
          </div>
        </section>

        {/* QUÉ FALTA COMPROBAR */}
        <section className="px-4 pb-14 sm:px-6 sm:pb-20">
          <div className="mx-auto max-w-[1000px] rounded-3xl border border-amber-300/30 bg-amber-300/[0.06] p-6 sm:p-10">
            <div className="flex items-center gap-3 text-amber-200">
              <ClipboardCheck size={22} />
              <Eyebrow>{c.pending.eyebrow}</Eyebrow>
            </div>
            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{c.pending.title}</h2>
            <p className="mt-3 max-w-[760px] text-base leading-relaxed text-white/80">{c.pending.intro}</p>
            <ol className="mt-7 grid gap-4 md:grid-cols-2">
              {c.pending.steps.map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-300 text-xs font-bold text-black">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/75">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/10 px-4 py-14 text-center sm:px-6">
          <h2 className="text-xl font-semibold sm:text-2xl">{c.cta.title}</h2>
          <div className="mt-6 flex justify-center">
            <LinkButtons beforeLabel={c.cta.before} afterLabel={c.cta.after} />
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
