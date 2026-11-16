import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Clock3,
  Wand2,
  FileCheck2,
  UserRound,
  Lock,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Sparkles,
  Users,
  Layers,
  Target,
  Frown,
  ListChecks,
  Quote,
  Linkedin,
} from "lucide-react";

const FLOWI_URL = "https://cuxui-flowi.netlify.app/login";
const FIGMA_PROCESS_URL = "https://www.figma.com/design/CMRujLgPhwXOyC98efl8x9/Flowi-App--Copy-?node-id=0-1";
const FIGMA_EMBED_URL = `https://embed.figma.com/design/CMRujLgPhwXOyC98efl8x9/Flowi-App--Copy-?node-id=0-1&embed-host=share`;
const ASSETS = "/Assets/Proyectos/Flowi";
const YOUTUBE_WATCH_URL = "https://www.youtube.com/live/iIGyGMDSfbo?si=cZM6V9KHY8hUrlZu";

const heroChips = ["UX Research", "UI Design", "Product Strategy", "Design System"];

const stats = [
  { value: "41", label: "Entrevistas con usuarios reales" },
  { value: "100%", label: "Confirmó el problema" },
  { value: "7", label: "Sprints de diseño y validación" },
  { value: "MVP", label: "Validación y listo para escalar" },
];

const projectSheet = [
  { label: "Duración", value: "7 sprints" },
  { label: "Equipo", value: "10 diseñadoras UX/UI + 1 desarrollador" },
  { label: "Público objetivo", value: "Personas con malestar intestinal y cuidadores de familia" },
  { label: "Estado actual", value: "Producto vivo — MVP desplegado" },
  { label: "Sector", value: "Wellness · Trackeo personal · PWA" },
  { label: "Mi rol", value: "Researcher — investigación con usuarios y síntesis de hallazgos" },
];

const tools = ["Figma", "Miro", "Notion", "Slack", "GitHub", "Maze", "Lápiz y papel", "Lovable", "Stitch", "Claude"];

const benchmarkApps = [
  {
    name: "Cara Care",
    category: "Salud intestinal",
    pros: "Educación y contenido de calidad.",
    cons: "Registro poco flexible y experiencia infantilizada para adultos.",
  },
  {
    name: "Bowelle",
    category: "Salud intestinal",
    pros: "Educación y contenido de calidad.",
    cons: "Registro poco flexible y experiencia infantilizada para adultos.",
  },
  {
    name: "Happy Poop",
    category: "Salud digestiva",
    pros: "Gamificación atractiva.",
    cons: "Enfoque infantil y sin integración de emociones o contexto familiar.",
  },
];

type Strength = "fuerte" | "parcial" | "debil";

const benchmarkMatrix: { app: string; scores: Strength[] }[] = [
  { app: "Cara Care", scores: ["fuerte", "parcial", "debil", "parcial", "debil", "debil", "parcial"] },
  { app: "Bowelle", scores: ["parcial", "parcial", "debil", "debil", "fuerte", "debil", "debil"] },
  { app: "Happy Poop", scores: ["fuerte", "debil", "debil", "debil", "debil", "debil", "debil"] },
];

const benchmarkColumns = [
  "Registro rápido",
  "Correlaciones",
  "Emociones",
  "Alimentación",
  "Multiusuario",
  "Exportar a médico",
  "Simplicidad",
];

const objectives = [
  {
    icon: Clock3,
    title: "Registro en menos de 5 segundos",
    description: "Si el registro es más rápido que el agotamiento, el hábito se sostiene más allá de los primeros 7 días.",
  },
  {
    icon: Wand2,
    title: "Correlaciones automáticas",
    description: "El usuario no quiere analizar sus propios datos: quiere que la app le diga qué los está causando.",
  },
  {
    icon: FileCheck2,
    title: "Historial exportable para el médico",
    description: "Que la consulta no vuelva a empezar de cero.",
  },
  {
    icon: UserRound,
    title: "Cero vergüenza, cero jerga clínica",
    description: "Iconografía y lenguaje que un adolescente pueda usar en público sin incomodidad.",
  },
  {
    icon: Lock,
    title: "Privacidad como punto de entrada",
    description: "Visibilidad familiar para quien cuida, sin exponer a quien es cuidado.",
  },
];

const marketGaps = [
  {
    title: "Apps existentes: clínicas o infantiles",
    description: "El mercado resuelve para un extremo u otro. Ninguna app fue pensada para una familia con edades mixtas bajo un mismo techo.",
  },
  {
    title: "El lenguaje clínico avergüenza",
    description: "Términos médicos como “Escala de Bristol” generan distancia. La vergüenza compite directamente con la formación del hábito.",
  },
  {
    title: "Tracking manual insostenible",
    description: "Llevar la cuenta a mano se pierde bajo estrés y no escala a más de un miembro del hogar.",
  },
  {
    title: "Nadie resuelve lo familiar",
    description: "Cuidadores necesitan visibilidad de varios miembros del hogar sin invadir la privacidad de cada uno.",
  },
];

const sitemap = [
  { title: "Inicio", items: ["Alertas", "Panel personal", "Panel familiar", "Panel simplificado"] },
  { title: "Actividad / Registros", items: ["Selección de miembro", "Patrones por miembro", "Filtros", "Nivel de detalle"] },
  { title: "CTA (+)", items: ["Registro rápido", "Registro extendido", "Confirmación"] },
  { title: "Reportes / Historial", items: ["Historial cronológico", "Selección de rango", "Vista previa", "Exportar datos propios"] },
  { title: "Usuario", items: ["Configuración personal", "Perfil personal", "Gestión del hogar"] },
];

const personaGoals = ["Entender qué le pasa", "Cuidar a su familia", "Llegar preparada a la consulta"];
const personaFrustrations = ["Registrar es tedioso.", "Se siente juzgada.", "Pierde el hábito fácilmente."];
const personaNeeds = ["Registro simple e inmediato.", "Ver patrones claros.", "Compartir información con su médico."];

const journeySteps = [
  { phase: "Siente el malestar", emotion: "Preocupación", flowi: "Registro inmediato" },
  { phase: "Intenta registrar", emotion: "Agotamiento", flowi: "Mínima fricción" },
  { phase: "Abandona el hábito", emotion: "Culpa", flowi: "Recordatorios discretos" },
  { phase: "Consulta médica", emotion: "Vergüenza", flowi: "Historial exportable" },
  { phase: "Recae de nuevo", emotion: "Frustración", flowi: "IA identifica correlaciones" },
];

const uiKitColors = [
  { hex: "#F5F5F5", name: "Background" },
  { hex: "#646373", name: "Texto secundario" },
  { hex: "#E9E5FF", name: "Superficie suave" },
  { hex: "#6A4FA3", name: "Primario oscuro" },
  { hex: "#5056A9", name: "Primario / acento" },
];

const lowFiFindings = [
  { value: "80%", label: "completó la tarea principal." },
  { value: "3 de 5", label: "usuarios entendieron el acceso al registro." },
  { value: "Fricción", label: "el texto libre generó fricción en el flujo." },
];

const mazeStats = [
  { value: "40", label: "participantes en total formaron parte del testeo no moderado." },
  { value: "86%", label: "encontró cómo registrar en el primer intento." },
  { value: "↓ Tiempo", label: "reducción del tiempo necesario para completar el registro." },
];

const moderatedFindings = [
  { title: "Mayor claridad de flujo", description: "Los usuarios entendieron el camino sin necesidad de ayuda." },
  { title: "Menos dudas al registrar síntomas", description: "El usuario percibe la experiencia de manera simple y natural." },
  { title: "Más confianza para llevar información al médico", description: "El historial exportable fue positivamente valorado por los usuarios." },
];

const team: { name: string; role: string; photo?: string; linkedin?: string }[] = [
  { name: "Sofía Álvarez", role: "Design Lead" },
  { name: "Agustina Marino", role: "Researcher", photo: "agustina" },
  { name: "Luisa García", role: "UX Generalista", photo: "luisa" },
  { name: "Karina López", role: "UX Writer", photo: "karina" },
  { name: "Belen Vitorino", role: "UX Generalista", photo: "belen" },
  { name: "Rossana Peñaloza", role: "UI Designer", photo: "rossana" },
  { name: "Katerine Elera", role: "UX Generalista", photo: "katerine" },
  { name: "Gabriel da Silva Valer", role: "UI Designer", photo: "gabriel-da-silva" },
  { name: "Diana García", role: "UX Generalista", photo: "diana" },
  { name: "Gabriel Sebastián López Illia", role: "Desarrollador", photo: "gabriel-lopez" },
  { name: "Sara Ruiz", role: "Researcher", photo: "sara", linkedin: "https://www.linkedin.com/in/sararuiz-ux-ui/" },
];

const participantQuotes = [
  { text: "Ahora entiendo mejor el flujo, todo se siente más claro y directo.", who: "Participante 02" },
  { text: "Me dio más confianza saber que puedo llevar mi información al médico.", who: "Participante 04" },
];

function StrengthDot({ level }: { level: Strength }) {
  if (level === "fuerte") return <CheckCircle2 size={18} className="text-[#5D56A6]" aria-label="Fuerte" />;
  if (level === "parcial") return <MinusCircle size={18} className="text-[#9C93D6]" aria-label="Parcial" />;
  return <XCircle size={18} className="text-[#D8D4EC]" aria-label="Débil" />;
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6A4FA3]">{children}</p>
  );
}

export default function FlowiCaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-manrope min-h-screen bg-[#FBFAFF] text-[#241F33]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-[#EDE9FB] bg-[#FBFAFF]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-3 sm:px-6">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B4460] transition-colors hover:text-[#5D56A6]"
          >
            <ArrowLeft size={16} />
            Portafolio
          </Link>
          <img src="/Assets/Proyectos/Flowi/flowi-lockup.png" alt="Flowi" className="h-8 w-auto rounded-lg sm:h-9" />
        </div>
      </header>


      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="relative h-[52vh] min-h-[340px] w-full overflow-hidden sm:h-[60vh] md:h-[68vh]">
            <video
              className="h-full w-full object-cover"
              src={`${ASSETS}/banner.mp4`}
              poster={`${ASSETS}/banner-poster.jpg`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Video de Flowi: una familia registra sus síntomas y los comparte en consulta médica"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3C2F6B] via-[#3C2F6B]/25 to-transparent" />
            <img
              src="/Assets/Proyectos/Flowi/flowi-lockup.png"
              alt=""
              aria-hidden="true"
              className="absolute left-4 top-4 h-14 w-14 rounded-2xl shadow-lg sm:left-8 sm:top-8 sm:h-16 sm:w-16"
            />
          </div>

          <div className="bg-[#5D56A6] px-4 pb-10 pt-8 text-white sm:px-6 sm:pb-14 sm:pt-10">
            <div className="mx-auto max-w-[1000px]">
              <div className="flex flex-wrap gap-2">
                {heroChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/90 sm:text-xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <h1 className="mt-5 max-w-3xl text-[1.9rem] font-extrabold leading-[1.15] sm:text-4xl md:text-[2.75rem]">
                Para que hablar de lo que pasa en el baño sea tan normal en casa como hablar del clima.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                Flowi es un proyecto de diseño de producto: equipo de 10 diseñadoras y un desarrollador, cubriendo research,
                UX, UI y writing en siete sprints. Una app de salud intestinal para toda la familia.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={FLOWI_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#5D56A6] transition-transform hover:-translate-y-0.5"
                >
                  Ir a Flowi
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={YOUTUBE_WATCH_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
                >
                  <Play size={15} fill="currentColor" />
                  Ver demostración
                </a>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 bg-[#8079D6] text-white md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-white/10 px-5 py-7 text-center sm:px-6">
                <p className="text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-white/85 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCT DESCRIPTION + PROJECT SHEET */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
            <div>
              <SectionEyebrow>El proyecto</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">Descripción del producto</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#4B4460]">
                <p>
                  Flowi nace como un proyecto de diseño de producto end-to-end dentro de una comunidad de práctica UX/UI: un
                  equipo de 10 diseñadoras y un desarrollador se propuso resolver un problema real de salud digestiva
                  familiar, cubriendo research, UX, UI y writing a lo largo de siete sprints.
                </p>
                <p>
                  El desafío partió de una oportunidad clara: las personas con malestar intestinal no cuentan con ninguna
                  herramienta pensada para registrar sus síntomas de forma simple, compartirlos en familia y llevarlos a una
                  consulta médica sin vergüenza ni fricción.
                </p>
                <p>
                  El objetivo del MVP era validar que un registro de menos de 5 segundos, sin jerga clínica, podía sostener
                  el hábito más allá de la primera semana — y dejar el producto listo para escalar.
                </p>
                <p>
                  Como equipo cubrimos el proceso completo: investigación con usuarios reales, definición de arquitectura de
                  información, ideación y wireframes, sistema de diseño y prototipo de alta fidelidad, y dos rondas de
                  testing (moderado y no moderado) antes del handoff a desarrollo.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#EDE9FB] bg-white p-6 shadow-[0_20px_50px_-30px_rgba(93,86,166,0.35)] sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#6A4FA3]">Ficha técnica</h3>
              <dl className="mt-5 space-y-4">
                {projectSheet.map((row) => (
                  <div key={row.label} className="border-b border-[#F1EEFB] pb-4 last:border-0 last:pb-0">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[#9088B8]">{row.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-[#241F33]">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <h4 className="mt-6 text-xs font-bold uppercase tracking-wide text-[#6A4FA3]">Herramientas</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full bg-[#F1EEFB] px-3 py-1.5 text-xs font-semibold text-[#5D56A6]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EMPATIZAR: PROBLEM */}
        <section className="bg-[#EFECFB] py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14">
            <div>
              <SectionEyebrow>Empatizar — Sprint 1</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-[#241F33] sm:text-3xl md:text-[2rem]">
                La <span className="text-[#6A4FA3]">brecha</span> entre lo que sientes y lo que puedes decirle a tu médico.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#4B4460]">
                Las personas con problemas digestivos viven en un punto ciego: entre el síntoma y la consulta médica, no
                tienen ninguna herramienta que las acompañe. Nadie resolvió cómo una familia completa pueda usarla en
                conjunto, y el lenguaje clínico incomoda tanto que termina siendo el mayor enemigo del hábito de registrar.
              </p>

              <blockquote className="relative mt-7 rounded-2xl bg-white p-6 shadow-[0_20px_50px_-30px_rgba(93,86,166,0.35)]">
                <Quote className="text-[#D8D0F5]" size={28} />
                <p className="mt-2 text-base italic leading-relaxed text-[#3A3350]">
                  “Me siento mal porque tengo la panza hinchada y no quiero salir, no quiero ver a nadie... Es toda una
                  cadena, un ciclo de emociones.”
                </p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#9088B8]">Participante de research</p>
              </blockquote>
            </div>

            <div className="flex items-center justify-center">
              <img
                src={`${ASSETS}/problema.webp`}
                alt="Usuaria abrumada por informes médicos, la escala de Bristol y la falta de privacidad al registrar síntomas"
                className="w-full max-w-[520px] rounded-3xl object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* BENCHMARK */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>Research</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">Benchmark</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-[#4B4460]">
            Analizamos las principales apps del segmento para entender sus aciertos, limitaciones y oportunidades.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {benchmarkApps.map((app) => (
              <div key={app.name} className="rounded-2xl border border-[#EDE9FB] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#241F33]">{app.name}</h3>
                <p className="text-xs font-medium text-[#9088B8]">{app.category}</p>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#5D56A6]">Ventajas</p>
                  <p className="mt-1 text-sm text-[#4B4460]">{app.pros}</p>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#B0538B]">Desventajas</p>
                  <p className="mt-1 text-sm text-[#4B4460]">{app.cons}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#EDE9FB] bg-white">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#F1EEFB] bg-[#FAF9FF] text-left text-xs font-bold uppercase tracking-wide text-[#9088B8]">
                  <th className="px-4 py-3">App</th>
                  {benchmarkColumns.map((col) => (
                    <th key={col} className="px-3 py-3 text-center">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {benchmarkMatrix.map((row) => (
                  <tr key={row.app} className="border-b border-[#F1EEFB] last:border-0">
                    <td className="px-4 py-3 font-semibold text-[#241F33]">{row.app}</td>
                    {row.scores.map((score, i) => (
                      <td key={i} className="px-3 py-3">
                        <div className="flex justify-center">
                          <StrengthDot level={score} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-wrap items-center gap-4 border-t border-[#F1EEFB] px-4 py-3 text-xs text-[#9088B8]">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#5D56A6]" /> Fuerte</span>
              <span className="inline-flex items-center gap-1.5"><MinusCircle size={14} className="text-[#9C93D6]" /> Parcial</span>
              <span className="inline-flex items-center gap-1.5"><XCircle size={14} className="text-[#D8D4EC]" /> Débil</span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#5D56A6] p-6 text-white sm:p-7">
            <p className="text-base font-semibold leading-relaxed sm:text-lg">
              Ninguna app integra emociones, alimentación y síntomas de forma fluida, sin sacrificar simplicidad.
              <br />
              Ahí está el espacio en blanco.
            </p>
          </div>
        </section>

        {/* WHAT FLOWI HAD TO SOLVE */}
        <section className="bg-[#F4F2FC] py-14 sm:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <div className="grid gap-10 md:grid-cols-[1fr_0.9fr]">
              <div>
                <h2 className="text-2xl font-extrabold leading-tight text-[#241F33] sm:text-3xl">
                  Lo que <span className="text-[#6A4FA3]">Flowi</span> tenía que resolver:
                </h2>

                <ol className="mt-8 space-y-4">
                  {objectives.map((objective, index) => {
                    const Icon = objective.icon;
                    return (
                      <li
                        key={objective.title}
                        className="flex gap-4 rounded-2xl border border-[#EDE9FB] bg-white p-4 shadow-sm sm:p-5"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5D56A6] text-sm font-bold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <Icon size={16} className="text-[#6A4FA3]" />
                            <p className="text-sm font-bold text-[#241F33]">{objective.title}</p>
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-[#4B4460]">{objective.description}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-lg font-semibold leading-relaxed text-[#3A3350]">
                  Cinco objetivos clave que definieron el rumbo del producto y guiaron cada decisión de diseño.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {marketGaps.map((gap) => (
                    <div key={gap.title} className="rounded-2xl border border-[#DCD5F5] bg-white/60 p-5">
                      <p className="text-sm font-bold text-[#5D56A6]">{gap.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#4B4460]">{gap.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEFINIR: SOLUTION STATEMENT */}
        <section className="bg-[#241F33] py-14 text-white sm:py-16">
          <div className="mx-auto grid max-w-[1100px] gap-8 px-4 sm:px-6 md:grid-cols-[1fr_1px_1fr] md:gap-10">
            <div>
              <SectionEyebrow>Definir — Sprint 2</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
                Convertir el registro diario en un hábito posible y <span className="text-[#B7ADF0]">humano.</span>
              </h2>
            </div>
            <div className="hidden bg-white/15 md:block" />
            <div className="space-y-4 text-[15px] leading-relaxed text-white/80">
              <p>Flowi acompaña al usuario en su rutina digestiva con un sistema simple, empático y motivador.</p>
              <p>
                Diseñamos una experiencia que reduce la fricción, genera confianza y entrega insights accionables — tanto
                para quien registra como para quien cuida.
              </p>
            </div>
          </div>
        </section>

        {/* SITEMAP */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>Arquitectura de información</SectionEyebrow>
          <h2 className="mt-3 flex items-center gap-2 text-2xl font-extrabold text-[#241F33] sm:text-3xl">
            <Layers size={22} className="text-[#6A4FA3]" />
            Jerarquía y flujos de Flowi
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {sitemap.map((branch) => (
              <div key={branch.title} className="rounded-2xl border border-[#EDE9FB] bg-white p-5">
                <p className="rounded-full bg-[#5D56A6] px-3 py-1.5 text-center text-xs font-bold uppercase tracking-wide text-white">
                  {branch.title}
                </p>
                <ul className="mt-4 space-y-2">
                  {branch.items.map((item) => (
                    <li key={item} className="rounded-lg bg-[#F4F2FC] px-3 py-2 text-xs font-medium text-[#4B4460]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PERSONA + JOURNEY */}
        <section className="bg-[#F4F2FC] py-14 sm:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <SectionEyebrow>Usuario objetivo</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">Persona</h2>

            <div className="mt-8 grid gap-8 rounded-3xl border border-[#EDE9FB] bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[220px_1fr]">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <img
                  src="/Assets/Proyectos/Flowi/persona-cindy.jpg"
                  alt="Cindy, persona representativa de Flowi"
                  className="h-40 w-40 rounded-full object-cover object-top shadow-md"
                />
                <h3 className="mt-4 text-xl font-extrabold text-[#241F33]">Cindy, 38 años</h3>
                <p className="text-sm font-medium text-[#6A4FA3]">Cuidadora familiar · Administradora del hogar</p>
                <p className="mt-2 text-xs text-[#9088B8]">3 hijos · 1 adulto mayor · SII diagnosticado</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#5D56A6]">
                    <Target size={14} /> Objetivos
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#4B4460]">
                    {personaGoals.map((g) => <li key={g}>• {g}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#B0538B]">
                    <Frown size={14} /> Frustraciones
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#4B4460]">
                    {personaFrustrations.map((f) => <li key={f}>• {f}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#5D56A6]">
                    <ListChecks size={14} /> Necesidades
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#4B4460]">
                    {personaNeeds.map((n) => <li key={n}>• {n}</li>)}
                  </ul>
                </div>
              </div>
            </div>

            {/* Journey map */}
            <div className="mt-10">
              <h3 className="text-lg font-bold text-[#241F33]">Journey map</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-5">
                {journeySteps.map((step, index) => (
                  <div key={step.phase} className="rounded-2xl border border-[#EDE9FB] bg-white p-4">
                    <p className="text-xs font-bold text-[#9088B8]">0{index + 1}</p>
                    <p className="mt-1 text-sm font-bold text-[#241F33]">{step.phase}</p>
                    <p className="text-xs italic text-[#B0538B]">{step.emotion}</p>
                    <div className="mt-3 rounded-lg bg-[#F4F2FC] px-2.5 py-2 text-xs font-medium text-[#5D56A6]">
                      Flowi: {step.flowi}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* IDEAR / PROTOTIPAR */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>Idear y prototipar — Sprints 3 a 5</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">Del wireframe al prototipo funcional</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-[#4B4460]">
            De flujos en baja fidelidad pasamos a un prototipo de alta fidelidad para el registro diario, apoyado en un
            sistema de diseño propio basado en Material 3.
          </p>

          <div className="mt-8 grid items-center gap-8 rounded-3xl bg-[#5D56A6] p-6 sm:p-10 md:grid-cols-2">
            <div className="text-white">
              <p className="text-sm font-bold uppercase tracking-wide text-white/70">Prototipo de alta fidelidad</p>
              <p className="mt-3 text-lg font-semibold leading-relaxed">
                Onboarding, registro guiado en pasos y home con estado del hogar — probado con usuarios reales.
              </p>
              <a
                href={FLOWI_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#5D56A6]"
              >
                Ver producto vivo
                <ArrowUpRight size={15} />
              </a>
            </div>
            <img src="/Assets/Proyectos/Flowi/phones-hero.png" alt="Pantallas de registro de Flowi" className="mx-auto w-full max-w-sm object-contain" />
          </div>

          {/* Branding A/B */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#241F33]">
                <Sparkles size={18} className="text-[#6A4FA3]" />
                Identidad de marca: dos caminos
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B4460]">
                Exploramos dos propuestas con el mismo símbolo: una verde, cercana a la naturaleza y la calma (A), y una
                violeta, que comunica confianza, bienestar y cuidado (B). Las evaluamos con criterios de accesibilidad
                (contraste WCAG AA), claridad, consistencia y tono del producto.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B4460]">
                Elegimos la violeta: se diferencia del azul frío de las apps médicas tradicionales y se siente moderna,
                humana y cálida. El logo nace de una forma fluida y continua, como el sistema digestivo que Flowi acompaña.
              </p>
            </div>
            <img
              src={`${ASSETS}/branding-ab.jpg`}
              alt="Propuestas A (verde) y B (violeta) de la identidad de Flowi aplicadas al home de la app"
              className="w-full rounded-3xl border border-[#EDE9FB] shadow-sm"
              loading="lazy"
            />
          </div>

          {/* App en vivo */}
          <div className="mt-14 grid items-center gap-8 rounded-3xl border border-[#EDE9FB] bg-white p-6 sm:p-10 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="text-lg font-bold text-[#241F33]">Pruébala: la app en vivo</h3>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#4B4460]">
                El MVP final está desplegado como PWA. Navega por el onboarding y el registro directamente aquí, o ábrela en una pestaña nueva para usarla en tu celular.
              </p>
              <a
                href={FLOWI_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#5D56A6] px-5 py-2.5 text-sm font-bold text-white"
              >
                Abrir Flowi
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="mx-auto h-[640px] w-[320px] max-w-full overflow-hidden rounded-[2.5rem] border-[10px] border-[#241F33] bg-white shadow-2xl">
              <iframe src={FLOWI_URL} title="Flowi — app en vivo" className="h-full w-full" loading="lazy" />
            </div>
          </div>

          {/* UI Kit */}
          <div className="mt-14">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#241F33]">
              <Sparkles size={18} className="text-[#6A4FA3]" />
              UI Kit — basado en Material 3
            </h3>
            <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1.4fr]">
              <div className="rounded-2xl border border-[#EDE9FB] bg-[#5D56A6] p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wide text-white/70">Tipografía</p>
                <p className="mt-2 text-4xl font-extrabold">Manrope</p>
                <p className="mt-3 text-sm text-white/80">
                  Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Ññ 0123456789
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {uiKitColors.map((color) => (
                  <div key={color.hex} className="overflow-hidden rounded-2xl border border-[#EDE9FB]">
                    <div className="h-20" style={{ backgroundColor: color.hex }} />
                    <div className="bg-white px-3 py-2">
                      <p className="text-[11px] font-bold text-[#241F33]">{color.hex}</p>
                      <p className="text-[10px] text-[#9088B8]">{color.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTEAR */}
        <section className="bg-[#F4F2FC] py-14 sm:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <SectionEyebrow>Testear — Sprints 6 y 7</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">Validación con usuarios reales</h2>

            {/* Baja fidelidad */}
            <div className="mt-8 rounded-3xl border border-[#EDE9FB] bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#241F33]">Testing de baja fidelidad</h3>
              <p className="mt-1 text-sm text-[#4B4460]">
                Validamos la estructura y el flujo principal antes de invertir en diseño visual.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {lowFiFindings.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#F4F2FC] p-5">
                    <p className="text-2xl font-extrabold text-[#5D56A6]">{item.value}</p>
                    <p className="mt-1 text-xs text-[#4B4460]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Maze */}
            <div className="mt-6 rounded-3xl border border-[#EDE9FB] bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#241F33]">Testing no moderado — Maze</h3>
              <p className="mt-1 text-sm text-[#4B4460]">
                Validamos la estructura en Maze para medir comprensión y éxito en tareas clave.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {mazeStats.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#F4F2FC] p-5">
                    <p className="text-2xl font-extrabold text-[#5D56A6]">{item.value}</p>
                    <p className="mt-1 text-xs text-[#4B4460]">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-[#5D56A6] p-5 text-sm font-semibold text-white">
                La navegación ya no se cuestiona: el esfuerzo se dirige a completar la tarea.
              </div>
            </div>

            {/* Moderado */}
            <div className="mt-6 rounded-3xl border border-[#EDE9FB] bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#241F33]">Testing moderado final</h3>
              <p className="mt-1 text-sm text-[#4B4460]">
                Validamos con usuarios reales en sesiones moderadas para profundizar en percepciones y emociones — 6
                personas, prototipo funcional, sesiones moderadas.
              </p>
              <div className="mt-5 divide-y divide-[#F1EEFB]">
                {moderatedFindings.map((finding) => (
                  <div key={finding.title} className="flex items-start gap-3 py-4 first:pt-0 last:pb-0">
                    <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#5D56A6]" />
                    <div>
                      <p className="text-sm font-bold text-[#241F33]">{finding.title}</p>
                      <p className="text-xs text-[#4B4460]">{finding.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {participantQuotes.map((q) => (
                  <figure key={q.who} className="rounded-2xl bg-[#F4F2FC] p-5">
                    <Quote size={20} className="text-[#B7ADF0]" />
                    <blockquote className="mt-2 text-sm italic leading-relaxed text-[#3A3350]">“{q.text}”</blockquote>
                    <figcaption className="mt-2 text-xs font-semibold text-[#5D56A6]">{q.who}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <p className="mt-8 text-center text-lg italic text-[#6A4FA3]">Diseñamos con datos. Decidimos con empatía.</p>
          </div>
        </section>

        {/* FIGMA */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>Proceso completo</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">Explora el Figma de trabajo</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-[#4B4460]">
            Research, flujos, wireframes, sistema de diseño y prototipos: el archivo donde el equipo trabajó cada sprint.
          </p>
          <div className="mt-6 overflow-hidden rounded-3xl border border-[#EDE9FB] bg-white shadow-sm">
            <iframe src={FIGMA_EMBED_URL} title="Figma de trabajo de Flowi" className="h-[520px] w-full sm:h-[640px]" loading="lazy" allowFullScreen />
          </div>
          <a
            href={FIGMA_PROCESS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#5D56A6] hover:underline"
          >
            Abrir en Figma <ArrowUpRight size={14} />
          </a>
        </section>

        {/* CIERRE Y DEMO PÚBLICA */}
        <section className="bg-[#241F33] py-14 text-white sm:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <SectionEyebrow>Cierre</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">¿Qué logramos con Flowi?</h2>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-black">
                <div className="aspect-video w-full">
                  <video
                    className="h-full w-full"
                    src={`${ASSETS}/resumen.mp4`}
                    poster={`${ASSETS}/resumen-poster.jpg`}
                    controls
                    playsInline
                    preload="metadata"
                    title="Flowi: proceso, equipo y producto"
                  />
                </div>
              </div>

              <div className="space-y-5 text-[15px] leading-relaxed text-white/80">
                <p>
                  Cerramos el proyecto con una demo pública en vivo ante la comunidad de diseño, y con un MVP validado con
                  usuarios reales en dos rondas de testing.
                </p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/50">Aprendizajes del equipo</p>
                  <p className="mt-1.5">
                    Diseñar para el hogar completo — no para un único usuario — obliga a repensar privacidad, permisos y
                    tono desde el primer wireframe, no como un ajuste posterior.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/50">Impacto del producto</p>
                  <p className="mt-1.5">
                    Un flujo de registro validado en menos de 5 segundos, con historial exportable y una identidad de marca
                    propia lista para escalar más allá del MVP.
                  </p>
                </div>
                <a
                  href={YOUTUBE_WATCH_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Play size={14} fill="currentColor" />
                  Ver la demo en vivo en YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-[#6A4FA3]" />
            <h2 className="text-xl font-extrabold text-[#241F33] sm:text-2xl">El equipo</h2>
          </div>
          <p className="mt-2 max-w-xl text-sm text-[#4B4460]">
            Nuestro objetivo: ayudar a las personas a comprender lo que sienten y a comunicarlo mejor en sus consultas médicas.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <li key={member.name} className="flex items-center gap-4 rounded-2xl border border-[#EDE9FB] bg-white p-4">
                {member.photo ? (
                  <img
                    src={`${ASSETS}/team/${member.photo}.jpg`}
                    alt={member.name}
                    className="h-14 w-14 shrink-0 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#8079D6] text-lg font-bold text-white">
                    {member.name[0]}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug text-[#241F33]">{member.name}</p>
                  <p className="text-xs text-[#9088B8]">{member.role}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[#5D56A6] hover:underline"
                    >
                      <Linkedin size={12} /> LinkedIn
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-[#EDE9FB] bg-white py-8">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 px-4 text-center sm:px-6">
          <img src="/Assets/Proyectos/Flowi/flowi-wordmark.png" alt="Flowi" className="h-6 w-auto object-contain opacity-70" />
          <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#5D56A6] hover:underline">
            <ArrowLeft size={15} />
            Volver al portafolio de Sara Ruiz
          </Link>
        </div>
      </footer>
    </div>
  );
}
