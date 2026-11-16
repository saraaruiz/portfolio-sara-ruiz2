import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Frown,
  Linkedin,
  ListChecks,
  Loader2,
  Lock,
  Maximize2,
  Minus,
  Pause,
  Play,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Users,
  Volume2,
  VolumeX,
  Wand2,
  X,
} from "lucide-react";

import { usePreferences, type AppLanguage } from "@/context/PreferencesContext";

const FLOWI_URL = "https://cuxui-flowi.netlify.app/login";
const YOUTUBE_WATCH_URL = "https://www.youtube.com/live/iIGyGMDSfbo?si=cZM6V9KHY8hUrlZu";
const FIGMA_PROCESS_URL = "https://www.figma.com/design/CMRujLgPhwXOyC98efl8x9/Flowi-App--Copy-?node-id=0-1";
const FIGMA_EMBED_URL =
  "https://embed.figma.com/design/CMRujLgPhwXOyC98efl8x9/Flowi-App--Copy-?node-id=0-1&embed-host=share";
const ASSETS = "/Assets/Proyectos/Flowi";

/* ----------------------------- non-translatable data ----------------------------- */

// Tokens oficiales (archivo Figma "Flowi-color", Material 3)
const brandColors = [
  { hex: "#5D56A6", key: "primary" },
  { hex: "#6A4FA3", key: "secondary" },
  { hex: "#5056A9", key: "tertiary" },
  { hex: "#E4DFFF", key: "primaryContainer" },
  { hex: "#FCF8FD", key: "surface" },
  { hex: "#1C1B1F", key: "onSurface" },
] as const;

const objectiveIcons = [Clock3, Wand2, FileCheck2, UserRound, Lock];
const nextStepIcons = [Rocket, Brain, FileText, ShieldCheck];

const teamBase: { name: string; roleKey: string; photo?: string; linkedin?: string }[] = [
  { name: "Sofía Álvarez", roleKey: "lead", photo: "sofia" },
  { name: "Agustina Maurino", roleKey: "researcher", photo: "agustina" },
  { name: "Luisa García", roleKey: "generalist", photo: "luisa" },
  { name: "Karina López", roleKey: "writer", photo: "karina" },
  { name: "Belen Vitorino", roleKey: "generalist", photo: "belen" },
  { name: "Rossana Peñaloza", roleKey: "ui", photo: "rossana" },
  { name: "Katerine Elera", roleKey: "generalist", photo: "katerine" },
  { name: "Gabriel da Silva Valer", roleKey: "ui", photo: "gabriel-da-silva" },
  { name: "Diana García", roleKey: "generalist", photo: "diana" },
  { name: "Gabriel Sebastián López Illia", roleKey: "dev", photo: "gabriel-lopez" },
  { name: "Sara Ruiz", roleKey: "researcher", photo: "sara", linkedin: "https://www.linkedin.com/in/sararuiz-ux-ui/" },
];

/* ----------------------------------- copy ----------------------------------- */

const es = {
  nav: { back: "Portafolio", backFull: "Volver al portafolio de Sara Ruiz", language: "Idioma" },
  hero: {
    chips: ["UX Research", "UI Design", "Product Strategy", "Design System"],
    title: "Para que hablar de lo que pasa en el baño sea tan normal en casa como hablar del clima.",
    subtitle:
      "Flowi es una app de salud intestinal para toda la familia. 10 diseñadoras y un desarrollador, 7 sprints, del research al handoff.",
    roleLabel: "Mi rol",
    role: "Researcher · research, testing, diseño y comunicación",
    ctaApp: "Ir a Flowi",
    ctaDemo: "Ver demostración",
    videoLabel: "Video de Flowi: una familia registra sus síntomas y los comparte en consulta médica",
  },
  stats: [
    { value: "95%", label: "encontró el botón de registro en el test final" },
    { value: "3", label: "rondas de testing con usuarios reales" },
    { value: "7", label: "sprints de diseño y validación" },
    { value: "MVP", label: "validado y listo para escalar" },
  ],
  outcome: {
    eyebrow: "Resultado",
    title: "Flowi en 2 minutos",
    intro: "El proceso, el equipo y el producto: de la investigación al MVP validado.",
    ctaYoutube: "Ver la demo completa en vivo en YouTube",
    play: "Reproducir video",
    loading: "Cargando video…",
    pause: "Pausar",
    resume: "Reproducir",
    mute: "Silenciar",
    unmute: "Activar sonido",
    minimize: "Minimizar",
    expand: "Expandir",
    close: "Cerrar video",
    floating: "Reproduciendo en la ventana flotante",
    videoTitle: "Flowi: proceso, equipo y producto",
  },
  product: {
    eyebrow: "El proyecto",
    title: "Qué es Flowi",
    text: "Una app para registrar síntomas digestivos en segundos, compartirlos en familia y llevar un historial claro a la consulta médica, sin vergüenza ni jerga clínica.",
    sheet: [
      { label: "Duración", value: "7 sprints" },
      { label: "Equipo", value: "10 diseñadoras UX/UI + 1 desarrollador" },
      { label: "Público", value: "Personas con malestar intestinal y cuidadores de familia" },
      { label: "Estado", value: "Producto vivo (PWA)" },
    ],
  },
  problem: {
    eyebrow: "Empatizar",
    titleA: "La ",
    titleB: "brecha",
    titleC: " entre lo que sientes y lo que puedes decirle a tu médico.",
    body: "Entre el síntoma y la consulta no hay ninguna herramienta que acompañe a las personas, y el lenguaje clínico da tanta vergüenza que termina matando el hábito de registrar.",
    quote:
      "Me siento mal porque tengo la panza hinchada y no quiero salir, no quiero ver a nadie... Es toda una cadena, un ciclo de emociones.",
    quoteWho: "Participante de research",
    gap: "Ninguna app integra emociones, alimentación y síntomas de forma simple. Ahí está el espacio en blanco.",
    imageAlt: "Usuaria abrumada por informes médicos, la escala de Bristol y la falta de privacidad al registrar síntomas",
    solveTitle: "Lo que Flowi tenía que resolver",
    objectives: [
      "Registro en menos de 5 segundos",
      "Correlaciones automáticas",
      "Historial exportable para el médico",
      "Cero vergüenza, cero jerga clínica",
      "Privacidad como punto de entrada",
    ],
    personaName: "Cindy, 38 años",
    personaRole: "Cuidadora familiar · 3 hijos · 1 adulto mayor",
    goalsTitle: "Objetivo",
    goal: "Entender qué le pasa",
    frustrationsTitle: "Frustración",
    frustration: "Registrar es tedioso",
    needsTitle: "Necesidad",
    need: "Registro simple e inmediato",
    personaAlt: "Cindy, persona representativa de Flowi",
  },
  proto: {
    eyebrow: "Prototipo y marca",
    title: "De wireframes a una app funcionando",
    liveLabel: "App en vivo",
    liveText: "Pruébala aquí mismo: es la app real.",
    liveHint: "Si el acceso con Google no abre aquí, entra con email o ábrela en una pestaña nueva.",
    liveCta: "Abrir Flowi en pestaña nueva",
    liveTitle: "Flowi: app en vivo",
    brandTitle: "Marca: elegimos el violeta",
    brandText:
      "Entre una propuesta verde (A) y una violeta (B), elegimos la violeta: transmite confianza y cuidado, y se aleja del azul frío de las apps médicas.",
    brandAlt: "Propuestas A (verde) y B (violeta) de la identidad de Flowi aplicadas al home de la app",
    uiKitTitle: "UI Kit · Material 3 · Manrope",
    colorNames: {
      primary: "Primary",
      secondary: "Secondary",
      tertiary: "Tertiary",
      primaryContainer: "Container",
      surface: "Surface",
      onSurface: "On Surface",
    },
  },
  test: {
    eyebrow: "Testear y mejorar",
    title: "De 4 de 5 a 95 %: así mejoró el registro",
    intro: "El hallazgo clave: cuatro de cada cinco personas no reconocían el botón de registro. Iteramos y, en el test final, lo encontró el 95 %.",
    fromLabel: "Punto de partida",
    fromMeta: "Sprint 3 · wireframes · 5 usuarios por Zoom",
    from: [
      { value: "4 de 5", label: "no reconocieron el botón “+”." },
      { value: "3 de 5", label: "completaron el registro sin ayuda." },
    ],
    toLabel: "Resultado",
    toMeta: "Sprint 6 · prototipo en Maze · hasta 20 usuarios",
    to: [
      { value: "95%", label: "encontró y presionó el botón de registro." },
      { value: "93,8%", label: "completó el registro de evacuación." },
    ],
    changeTitle: "Qué cambiamos",
    before: "Antes",
    after: "Después",
    changes: [
      { before: "Solo un “+” en la barra.", after: "Pantalla “Crear registro” con título y etiqueta visible." },
      { before: "Formulario en scroll largo.", after: "3 pasos con barra de progreso." },
      { before: "Texto libre para cantidad y síntomas.", after: "Chips: un toque, sin escribir." },
    ],
    heatTitle: "Mapa de calor · Tarea 1",
    heatTask: "“Encuentra y presiona el botón para iniciar un registro”",
    heatMeta: "Maze · 20 respuestas",
    heatNote: "El punto de mayor concentración de clics es el botón “Registro” del menú inferior.",
    heatAlt: "Mapa de calor de clics sobre la pantalla de inicio de Flowi en el test de Maze",
    modTitle: "Testing moderado final · 5 personas",
    modText: "Entendieron el flujo sin ayuda y valoraron el historial exportable para llevar al médico.",
    quote: "Me dio más confianza saber que puedo llevar mi información al médico.",
    quoteWho: "Participante 04",
  },
  figma: {
    title: "Explora el proceso en Figma",
    open: "Abrir en Figma",
    iframeTitle: "Figma de trabajo de Flowi",
  },
  next: {
    title: "¿Qué sigue?",
    steps: [
      { title: "Escalar el MVP", description: "Más familias para validar el hábito." },
      { title: "Insights con IA", description: "Correlaciones entre síntomas, comida y emociones." },
      { title: "Reporte médico validado", description: "Historial exportable revisado con profesionales." },
      { title: "Privacidad familiar", description: "Roles y permisos más finos." },
    ],
    cta: "Probar Flowi",
  },
  mine: {
    eyebrow: "Mi aporte",
    title: "Mi caso en Flowi",
    role: "Diseñadora industrial · Researcher",
    p1: "Soy diseñadora industrial, enfocada en experiencias digitales con mirada integral de producto. En Flowi conecté research, testing, diseño y comunicación para convertir hallazgos de usuarios en mejores decisiones.",
    quote: "La usabilidad no se mide solo por completar una tarea, sino por la claridad con la que el usuario llega a ella.",
    p2: "Lo vimos en el botón de registro: en las primeras pruebas, cuatro de cada cinco usuarios no lo identificaron. Tras analizar su comportamiento e iterar con el equipo, el flujo alcanzó un 95 % de éxito.",
    p3: "Este proyecto reafirmó mi propósito: usar el diseño para crear soluciones humanas que mejoren la vida cotidiana de muchas personas.",
    fromValue: "4 de 5",
    fromLabel: "no identificaban el botón",
    toValue: "95%",
    toLabel: "tasa de éxito",
    linkedin: "Conectemos en LinkedIn",
  },
  team: {
    title: "El equipo",
    roles: {
      lead: "Design Lead",
      researcher: "Researcher",
      generalist: "UX Generalista",
      writer: "UX Writer",
      ui: "UI Designer",
      dev: "Desarrollador",
    } as Record<string, string>,
  },
};

const en: typeof es = {
  nav: { back: "Portfolio", backFull: "Back to Sara Ruiz's portfolio", language: "Language" },
  hero: {
    chips: ["UX Research", "UI Design", "Product Strategy", "Design System"],
    title: "So that talking about what happens in the bathroom is as normal at home as talking about the weather.",
    subtitle:
      "Flowi is a gut health app for the whole family. 10 designers and one developer, 7 sprints, from research to handoff.",
    roleLabel: "My role",
    role: "Researcher · research, testing, design and communication",
    ctaApp: "Go to Flowi",
    ctaDemo: "Watch the demo",
    videoLabel: "Flowi video: a family logs their symptoms and shares them at a medical appointment",
  },
  stats: [
    { value: "95%", label: "found the log button in the final test" },
    { value: "3", label: "rounds of testing with real users" },
    { value: "7", label: "design and validation sprints" },
    { value: "MVP", label: "validated and ready to scale" },
  ],
  outcome: {
    eyebrow: "Outcome",
    title: "Flowi in 2 minutes",
    intro: "The process, the team and the product: from research to a validated MVP.",
    ctaYoutube: "Watch the full live demo on YouTube",
    play: "Play video",
    loading: "Loading video…",
    pause: "Pause",
    resume: "Play",
    mute: "Mute",
    unmute: "Unmute",
    minimize: "Minimize",
    expand: "Expand",
    close: "Close video",
    floating: "Playing in the floating window",
    videoTitle: "Flowi: process, team and product",
  },
  product: {
    eyebrow: "The project",
    title: "What is Flowi",
    text: "An app to log digestive symptoms in seconds, share them with family and bring a clear history to the doctor, without shame or clinical jargon.",
    sheet: [
      { label: "Duration", value: "7 sprints" },
      { label: "Team", value: "10 UX/UI designers + 1 developer" },
      { label: "Audience", value: "People with gut discomfort and family caregivers" },
      { label: "Status", value: "Live product (PWA)" },
    ],
  },
  problem: {
    eyebrow: "Empathize",
    titleA: "The ",
    titleB: "gap",
    titleC: " between what you feel and what you can tell your doctor.",
    body: "Between the symptom and the appointment there is no tool that accompanies people, and clinical language is so uncomfortable that it ends up killing the logging habit.",
    quote:
      "I feel bad because my belly is bloated and I don't want to go out, I don't want to see anyone... It's a whole chain, a cycle of emotions.",
    quoteWho: "Research participant",
    gap: "No app simply integrates emotions, food and symptoms. That is the white space.",
    imageAlt: "A user overwhelmed by medical reports, the Bristol scale and the lack of privacy when logging symptoms",
    solveTitle: "What Flowi had to solve",
    objectives: [
      "Logging in under 5 seconds",
      "Automatic correlations",
      "Exportable history for the doctor",
      "Zero shame, zero clinical jargon",
      "Privacy as the entry point",
    ],
    personaName: "Cindy, 38 years old",
    personaRole: "Family caregiver · 3 kids · 1 older adult",
    goalsTitle: "Goal",
    goal: "Understand what is happening to her",
    frustrationsTitle: "Frustration",
    frustration: "Logging is tedious",
    needsTitle: "Need",
    need: "Simple, immediate logging",
    personaAlt: "Cindy, a representative Flowi persona",
  },
  proto: {
    eyebrow: "Prototype and brand",
    title: "From wireframes to a working app",
    liveLabel: "Live app",
    liveText: "Try it right here: this is the real app.",
    liveHint: "If Google sign-in doesn't open here, sign in with email or open the app in a new tab.",
    liveCta: "Open Flowi in a new tab",
    liveTitle: "Flowi: live app",
    brandTitle: "Brand: we chose violet",
    brandText:
      "Between a green proposal (A) and a violet one (B), we chose violet: it conveys trust and care, and stands apart from the cold blue of medical apps.",
    brandAlt: "Flowi brand proposals A (green) and B (violet) applied to the app home screen",
    uiKitTitle: "UI Kit · Material 3 · Manrope",
    colorNames: {
      primary: "Primary",
      secondary: "Secondary",
      tertiary: "Tertiary",
      primaryContainer: "Container",
      surface: "Surface",
      onSurface: "On Surface",
    },
  },
  test: {
    eyebrow: "Test and improve",
    title: "From 4 of 5 to 95%: how logging improved",
    intro: "The key finding: four out of five people did not recognize the log button. We iterated and, in the final test, 95% found it.",
    fromLabel: "Starting point",
    fromMeta: "Sprint 3 · wireframes · 5 users on Zoom",
    from: [
      { value: "4 of 5", label: "did not recognize the “+” button." },
      { value: "3 of 5", label: "completed logging without help." },
    ],
    toLabel: "Result",
    toMeta: "Sprint 6 · prototype in Maze · up to 20 users",
    to: [
      { value: "95%", label: "found and pressed the log button." },
      { value: "93.8%", label: "completed the bowel log." },
    ],
    changeTitle: "What we changed",
    before: "Before",
    after: "After",
    changes: [
      { before: "Only a “+” in the bar.", after: "A “Create log” screen with a title and a visible label." },
      { before: "A long scrolling form.", after: "3 steps with a progress bar." },
      { before: "Free text for amount and symptoms.", after: "Chips: one tap, no typing." },
    ],
    heatTitle: "Heatmap · Task 1",
    heatTask: "“Find and press the button to start a log”",
    heatMeta: "Maze · 20 responses",
    heatNote: "The strongest concentration of clicks is on the “Registro” button in the bottom menu.",
    heatAlt: "Click heatmap over Flowi's home screen from the Maze test",
    modTitle: "Final moderated testing · 5 people",
    modText: "They understood the flow without help and valued the exportable history to bring to the doctor.",
    quote: "It gave me more confidence to know I can take my information to the doctor.",
    quoteWho: "Participant 04",
  },
  figma: {
    title: "Explore the process in Figma",
    open: "Open in Figma",
    iframeTitle: "Flowi working Figma file",
  },
  next: {
    title: "What's next?",
    steps: [
      { title: "Scale the MVP", description: "More families to validate the habit." },
      { title: "AI-powered insights", description: "Correlations between symptoms, food and emotions." },
      { title: "Validated medical report", description: "Exportable history reviewed by professionals." },
      { title: "Family privacy", description: "Finer roles and permissions." },
    ],
    cta: "Try Flowi",
  },
  mine: {
    eyebrow: "My contribution",
    title: "My case in Flowi",
    role: "Industrial designer · Researcher",
    p1: "I'm an industrial designer focused on digital experiences with a whole-product mindset. In Flowi I connected research, testing, design and communication to turn user findings into better decisions.",
    quote: "Usability isn't measured only by completing a task, but by how clearly the user gets there.",
    p2: "We saw it in the log button: in the first tests, four out of five users didn't identify it. After analyzing their behavior and iterating with the team, the flow reached a 95% success rate.",
    p3: "This project reaffirmed my purpose: using design to create human solutions that improve the everyday life of many people.",
    fromValue: "4 of 5",
    fromLabel: "didn't identify the button",
    toValue: "95%",
    toLabel: "success rate",
    linkedin: "Let's connect on LinkedIn",
  },
  team: {
    title: "The team",
    roles: {
      lead: "Design Lead",
      researcher: "Researcher",
      generalist: "UX Generalist",
      writer: "UX Writer",
      ui: "UI Designer",
      dev: "Developer",
    } as Record<string, string>,
  },
};

const copyByLanguage: Record<AppLanguage, typeof es> = { es, en };

/* --------------------------------- components --------------------------------- */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6A4FA3]">{children}</p>;
}

type VideoLabels = {
  play: string;
  loading: string;
  pause: string;
  resume: string;
  mute: string;
  unmute: string;
  minimize: string;
  expand: string;
  close: string;
  floating: string;
};

/**
 * Video pesado: no descarga nada hasta que la sección está cerca y arranca al primer clic.
 * Si el usuario baja por la página mientras se reproduce, pasa a una ventana flotante
 * (silenciar, minimizar, cerrar) para que pueda seguir viéndolo.
 */
function LazyVideo({
  src,
  poster,
  title,
  labels,
}: {
  src: string;
  poster: string;
  title: string;
  labels: VideoLabels;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [inView, setInView] = useState(true);
  const [floating, setFloating] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // precarga cuando la sección está cerca + detecta si el video salió de la pantalla
  useEffect(() => {
    const node = wrapRef.current;
    const video = ref.current;
    if (!node || !video || typeof IntersectionObserver === "undefined") return;
    const preload = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          video.preload = "auto";
          preload.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    preload.observe(node);
    return () => preload.disconnect();
  }, []);

  // ¿sigue visible el espacio original del video? (listener de scroll: funciona en cualquier navegador)
  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;
    const check = () => {
      const rect = node.getBoundingClientRect();
      setInView(rect.bottom > 60 && rect.top < window.innerHeight);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      setFloating(false);
      setMinimized(false);
      setDismissed(false);
    } else if (started && playing && !dismissed) {
      setFloating(true);
    }
  }, [inView, started, playing, dismissed]);

  const start = () => {
    const video = ref.current;
    if (!video) return;
    setStarted(true);
    setBuffering(true);
    video.preload = "auto";
    video.play().catch(() => setBuffering(false));
  };

  const togglePlay = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => undefined);
    else video.pause();
  };

  const toggleMute = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const closeFloating = () => {
    ref.current?.pause();
    setDismissed(true);
    setFloating(false);
    setMinimized(false);
  };

  const iconBtn =
    "flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25";

  return (
    <div ref={wrapRef} className="relative aspect-video w-full bg-black">
      {floating && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#16131F] text-center text-white/80">
          <img src={poster} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-20" />
          <p className="relative text-sm font-semibold">{labels.floating}</p>
        </div>
      )}

      <div
        className={
          floating
            ? "fixed bottom-4 left-4 z-[60] w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
            : "absolute inset-0"
        }
      >
        {floating && (
          <div className="flex items-center gap-2 bg-[#241F33] px-3 py-2">
            <p className="min-w-0 flex-1 truncate text-xs font-semibold text-white">{title}</p>
            <button type="button" onClick={togglePlay} aria-label={playing ? labels.pause : labels.resume} className={iconBtn}>
              {playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" className="ml-0.5" />}
            </button>
            <button type="button" onClick={toggleMute} aria-label={muted ? labels.unmute : labels.mute} className={iconBtn}>
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <button
              type="button"
              onClick={() => setMinimized((value) => !value)}
              aria-label={minimized ? labels.expand : labels.minimize}
              className={iconBtn}
            >
              {minimized ? <Maximize2 size={13} /> : <Minus size={14} />}
            </button>
            <button type="button" onClick={closeFloating} aria-label={labels.close} className={iconBtn}>
              <X size={14} />
            </button>
          </div>
        )}

        <div className={floating ? (minimized ? "h-0 overflow-hidden" : "aspect-video w-full") : "h-full w-full"}>
          <video
            ref={ref}
            className="h-full w-full"
            poster={poster}
            controls={started}
            playsInline
            preload="none"
            title={title}
            onWaiting={() => setBuffering(true)}
            onPlaying={() => {
              setBuffering(false);
              setPlaying(true);
            }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
            onCanPlay={() => setBuffering(false)}
            onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>

        {!started && (
          <button
            type="button"
            onClick={start}
            aria-label={labels.play}
            className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#5D56A6] shadow-xl sm:h-20 sm:w-20">
              <Play size={28} fill="currentColor" className="ml-1" />
            </span>
          </button>
        )}
        {started && buffering && !minimized && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 text-white">
            <Loader2 className="animate-spin" size={30} />
            <span className="text-xs font-semibold">{labels.loading}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/** Marco de celular con la app real: el iframe usa un viewport de 390x844 y se escala al ancho disponible. */
function PhoneEmbed({ src, title }: { src: string; title: string }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(298 / 390);

  useEffect(() => {
    const node = screenRef.current;
    if (!node) return;
    const update = () => setScale(node.clientWidth / 390);
    update();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative mx-auto w-[320px] max-w-full rounded-[3rem] border-[11px] border-[#16131F] bg-[#16131F] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
      <div
        className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#16131F]"
        aria-hidden="true"
      />
      <div ref={screenRef} className="w-full overflow-hidden rounded-[2.2rem] bg-white" style={{ height: 844 * scale }}>
        <iframe
          src={src}
          title={title}
          className="block border-0 bg-white"
          style={{ width: 390, height: 844, transform: `scale(${scale})`, transformOrigin: "top left" }}
          allow="clipboard-write; fullscreen"
        />
      </div>
    </div>
  );
}

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
    <div role="group" aria-label={label} className="inline-flex overflow-hidden rounded-full border border-[#DCD5F5] bg-white text-xs font-bold">
      {(["es", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={`px-3 py-1.5 uppercase transition-colors ${
            language === code ? "bg-[#5D56A6] text-white" : "text-[#5D56A6] hover:bg-[#F1EEFB]"
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

/* ----------------------------------- page ----------------------------------- */

export default function FlowiCaseStudy() {
  const { language, setLanguage } = usePreferences();
  const c = copyByLanguage[language];
  const [params] = useSearchParams();
  const embedded = params.get("embed") === "1";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previous = document.title;
    document.title = "Flowi | Case study · Sara Ruiz";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFAFF] font-manrope text-[#241F33]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-[#EDE9FB] bg-[#FBFAFF]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          {embedded ? (
            <img src={`${ASSETS}/flowi-lockup.png`} alt="Flowi" className="h-8 w-auto rounded-lg sm:h-9" />
          ) : (
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B4460] transition-colors hover:text-[#5D56A6]"
            >
              <ArrowLeft size={16} />
              {c.nav.back}
            </Link>
          )}
          <div className="flex items-center gap-3">
            <LanguageToggle language={language} setLanguage={setLanguage} label={c.nav.language} />
            {!embedded && (
              <img src={`${ASSETS}/flowi-lockup.png`} alt="Flowi" className="hidden h-8 w-auto rounded-lg sm:block sm:h-9" />
            )}
          </div>
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
              aria-label={c.hero.videoLabel}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3C2F6B] via-[#3C2F6B]/25 to-transparent" />
            <img
              src={`${ASSETS}/flowi-lockup.png`}
              alt=""
              aria-hidden="true"
              className="absolute left-4 top-4 h-14 w-14 rounded-2xl shadow-lg sm:left-8 sm:top-8 sm:h-16 sm:w-16"
            />
          </div>

          <div className="bg-[#5D56A6] px-4 pb-10 pt-8 text-white sm:px-6 sm:pb-14 sm:pt-10">
            <div className="mx-auto max-w-[1000px]">
              <div className="flex flex-wrap gap-2">
                {c.hero.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white/90 sm:text-xs"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 max-w-3xl text-[1.9rem] font-extrabold leading-[1.15] sm:text-4xl md:text-[2.75rem]">
                {c.hero.title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">{c.hero.subtitle}</p>
              <p className="mt-3 text-sm text-white/85">
                <span className="font-bold text-white">{c.hero.roleLabel}:</span> {c.hero.role}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={FLOWI_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#5D56A6] transition-transform hover:-translate-y-0.5"
                >
                  {c.hero.ctaApp}
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={YOUTUBE_WATCH_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15"
                >
                  <Play size={15} fill="currentColor" />
                  {c.hero.ctaDemo}
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-[#8079D6] text-white md:grid-cols-4">
            {c.stats.map((stat) => (
              <div key={stat.label} className="border border-white/10 px-5 py-7 text-center sm:px-6">
                <p className="text-3xl font-extrabold sm:text-4xl">{stat.value}</p>
                <p className="mt-1.5 text-xs leading-snug text-white/85 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OUTCOME + VIDEO */}
        <section id="demo" className="bg-[#241F33] py-14 text-white sm:py-20">
          <div className="mx-auto max-w-[900px] px-4 sm:px-6">
            <SectionEyebrow>{c.outcome.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{c.outcome.title}</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/75">{c.outcome.intro}</p>
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <LazyVideo
                src={`${ASSETS}/resumen.mp4`}
                poster={`${ASSETS}/resumen-poster.jpg`}
                title={c.outcome.videoTitle}
                labels={c.outcome}
              />
            </div>
            <a
              href={YOUTUBE_WATCH_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              <Play size={14} fill="currentColor" />
              {c.outcome.ctaYoutube}
            </a>
          </div>
        </section>

        {/* PRODUCT */}
        <section className="mx-auto max-w-[1000px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-12">
            <div>
              <SectionEyebrow>{c.product.eyebrow}</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.product.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-[#4B4460]">{c.product.text}</p>
            </div>
            <dl className="rounded-3xl border border-[#EDE9FB] bg-white p-6 shadow-[0_20px_50px_-30px_rgba(93,86,166,0.35)]">
              {c.product.sheet.map((row) => (
                <div key={row.label} className="border-b border-[#F1EEFB] py-3 first:pt-0 last:border-0 last:pb-0">
                  <dt className="text-xs font-semibold uppercase tracking-wide text-[#9088B8]">{row.label}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-[#241F33]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="bg-[#EFECFB] py-14 sm:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <div className="grid gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <SectionEyebrow>{c.problem.eyebrow}</SectionEyebrow>
                <h2 className="mt-3 text-2xl font-extrabold leading-tight text-[#241F33] sm:text-3xl">
                  {c.problem.titleA}
                  <span className="text-[#6A4FA3]">{c.problem.titleB}</span>
                  {c.problem.titleC}
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-[#4B4460]">{c.problem.body}</p>
                <blockquote className="mt-6 rounded-2xl bg-white p-6 shadow-[0_20px_50px_-30px_rgba(93,86,166,0.35)]">
                  <Quote className="text-[#D8D0F5]" size={26} />
                  <p className="mt-2 text-base italic leading-relaxed text-[#3A3350]">“{c.problem.quote}”</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#9088B8]">{c.problem.quoteWho}</p>
                </blockquote>
                <p className="mt-5 text-sm font-semibold leading-relaxed text-[#5D56A6]">{c.problem.gap}</p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src={`${ASSETS}/problema.webp`}
                  alt={c.problem.imageAlt}
                  className="w-full max-w-[460px] rounded-3xl object-contain"
                />
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-[1.4fr_1fr]">
              <div className="rounded-3xl border border-[#DCD5F5] bg-white/70 p-6">
                <h3 className="text-lg font-bold text-[#241F33]">{c.problem.solveTitle}</h3>
                <ol className="mt-4 space-y-3">
                  {c.problem.objectives.map((title, index) => {
                    const Icon = objectiveIcons[index];
                    return (
                      <li key={title} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5D56A6] text-xs font-bold text-white">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <Icon size={16} className="shrink-0 text-[#6A4FA3]" />
                        <span className="text-sm font-semibold text-[#241F33]">{title}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="rounded-3xl border border-[#EDE9FB] bg-white p-6">
                <div className="flex items-center gap-4">
                  <span className="block h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#E4DFFF]">
                    <img
                      src={`${ASSETS}/persona-cindy.jpg`}
                      alt={c.problem.personaAlt}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover object-top"
                    />
                  </span>
                  <div>
                    <p className="font-extrabold text-[#241F33]">{c.problem.personaName}</p>
                    <p className="text-xs text-[#6A4FA3]">{c.problem.personaRole}</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-[#4B4460]">
                  <li className="flex items-start gap-2">
                    <Target size={15} className="mt-0.5 shrink-0 text-[#5D56A6]" />
                    <span>
                      <b className="text-[#241F33]">{c.problem.goalsTitle}:</b> {c.problem.goal}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Frown size={15} className="mt-0.5 shrink-0 text-[#B0538B]" />
                    <span>
                      <b className="text-[#241F33]">{c.problem.frustrationsTitle}:</b> {c.problem.frustration}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ListChecks size={15} className="mt-0.5 shrink-0 text-[#5D56A6]" />
                    <span>
                      <b className="text-[#241F33]">{c.problem.needsTitle}:</b> {c.problem.need}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROTOTYPE */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>{c.proto.eyebrow}</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.proto.title}</h2>

          <div className="mt-8 grid items-center gap-8 rounded-3xl bg-[#5D56A6] p-6 sm:p-10 md:grid-cols-[1fr_auto]">
            <div className="text-white">
              <p className="text-sm font-bold uppercase tracking-wide text-white/70">{c.proto.liveLabel}</p>
              <p className="mt-3 max-w-md text-xl font-semibold leading-relaxed">{c.proto.liveText}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{c.proto.liveHint}</p>
              <a
                href={FLOWI_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#5D56A6]"
              >
                {c.proto.liveCta}
                <ArrowUpRight size={15} />
              </a>
            </div>

            <PhoneEmbed src={FLOWI_URL} title={c.proto.liveTitle} />
          </div>

          <div className="mt-12 grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#241F33]">
                <Sparkles size={18} className="text-[#6A4FA3]" />
                {c.proto.brandTitle}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B4460]">{c.proto.brandText}</p>
              <p className="mt-6 text-xs font-bold uppercase tracking-wide text-[#6A4FA3]">{c.proto.uiKitTitle}</p>
              <div className="mt-3 grid grid-cols-6 overflow-hidden rounded-xl border border-[#EDE9FB]">
                {brandColors.map((color) => (
                  <div key={color.hex} title={`${c.proto.colorNames[color.key]} ${color.hex}`}>
                    <div className="h-12" style={{ backgroundColor: color.hex }} />
                    <p className="bg-white py-1 text-center text-[9px] font-semibold text-[#4B4460]">{color.hex}</p>
                  </div>
                ))}
              </div>
            </div>
            <img
              src={`${ASSETS}/branding-ab.jpg`}
              alt={c.proto.brandAlt}
              width={2000}
              height={1500}
              className="w-full rounded-3xl border border-[#EDE9FB] bg-white shadow-sm"
            />
          </div>
        </section>

        {/* TEST */}
        <section className="bg-[#F4F2FC] py-14 sm:py-20">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
            <SectionEyebrow>{c.test.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.test.title}</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4B4460]">{c.test.intro}</p>

            <div className="mt-8 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-3xl border border-[#EDE9FB] bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-[#9088B8]">{c.test.fromLabel}</p>
                <p className="mt-1 text-xs text-[#9088B8]">{c.test.fromMeta}</p>
                <ul className="mt-5 space-y-4">
                  {c.test.from.map((item) => (
                    <li key={item.label} className="flex items-baseline gap-3">
                      <span className="w-20 shrink-0 text-2xl font-extrabold text-[#6A4FA3]">{item.value}</span>
                      <span className="text-sm text-[#4B4460]">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center text-[#5D56A6]" aria-hidden="true">
                <ArrowRight size={28} className="rotate-90 md:rotate-0" />
              </div>
              <div className="rounded-3xl bg-[#5D56A6] p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wide text-white/70">{c.test.toLabel}</p>
                <p className="mt-1 text-xs text-white/70">{c.test.toMeta}</p>
                <ul className="mt-5 space-y-4">
                  {c.test.to.map((item) => (
                    <li key={item.label} className="flex items-baseline gap-3">
                      <span className="w-20 shrink-0 text-2xl font-extrabold">{item.value}</span>
                      <span className="text-sm text-white/90">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-[#EDE9FB] bg-white p-6">
              <h3 className="text-lg font-bold text-[#241F33]">{c.test.changeTitle}</h3>
              <div className="mt-4 space-y-3">
                {c.test.changes.map((change) => (
                  <div key={change.after} className="grid gap-2 md:grid-cols-[1fr_auto_1fr] md:items-center">
                    <div className="rounded-xl bg-[#F4F2FC] px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#9088B8]">{c.test.before}</p>
                      <p className="text-sm text-[#4B4460]">{change.before}</p>
                    </div>
                    <ArrowRight size={18} className="mx-auto rotate-90 text-[#5D56A6] md:rotate-0" aria-hidden="true" />
                    <div className="rounded-xl bg-[#E4DFFF] px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-[#5D56A6]">{c.test.after}</p>
                      <p className="text-sm font-medium text-[#241F33]">{change.after}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-6 rounded-3xl border border-[#EDE9FB] bg-white p-6 md:grid-cols-[auto_1fr] md:items-center">
              <img
                src={`${ASSETS}/maze-heatmap.jpg`}
                alt={c.test.heatAlt}
                width={780}
                height={2004}
                className="mx-auto w-full max-w-[220px] rounded-xl"
              />
              <div>
                <p className="text-sm font-bold text-[#241F33]">{c.test.heatTitle}</p>
                <p className="mt-1 text-sm italic text-[#4B4460]">{c.test.heatTask}</p>
                <p className="mt-0.5 text-xs text-[#9088B8]">{c.test.heatMeta}</p>
                <p className="mt-3 text-sm leading-relaxed text-[#4B4460]">{c.test.heatNote}</p>

                <div className="mt-6 border-t border-[#F1EEFB] pt-5">
                  <p className="flex items-center gap-2 text-sm font-bold text-[#241F33]">
                    <CheckCircle2 size={16} className="text-[#5D56A6]" />
                    {c.test.modTitle}
                  </p>
                  <p className="mt-1 text-sm text-[#4B4460]">{c.test.modText}</p>
                  <blockquote className="mt-3 rounded-xl bg-[#F4F2FC] p-4 text-sm italic text-[#3A3350]">
                    “{c.test.quote}”
                    <span className="mt-1 block text-xs font-semibold not-italic text-[#5D56A6]">{c.test.quoteWho}</span>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FIGMA */}
        <section className="mx-auto max-w-[1000px] px-4 py-14 sm:px-6 sm:py-16">
          <h2 className="text-xl font-extrabold text-[#241F33] sm:text-2xl">{c.figma.title}</h2>
          <div className="mt-5 overflow-hidden rounded-3xl border border-[#EDE9FB] bg-white shadow-sm">
            <iframe
              src={FIGMA_EMBED_URL}
              title={c.figma.iframeTitle}
              className="h-[460px] w-full sm:h-[560px]"
              loading="lazy"
              allowFullScreen
            />
          </div>
          <a
            href={FIGMA_PROCESS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#5D56A6] hover:underline"
          >
            {c.figma.open} <ArrowUpRight size={14} />
          </a>
        </section>

        {/* NEXT STEPS */}
        <section className="bg-[#241F33] py-14 text-white sm:py-16">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{c.next.title}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.next.steps.map((step, index) => {
                const Icon = nextStepIcons[index];
                return (
                  <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5D56A6]">
                      <Icon size={17} />
                    </span>
                    <p className="mt-3 text-sm font-bold">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/70">{step.description}</p>
                  </div>
                );
              })}
            </div>
            <a
              href={FLOWI_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#5D56A6]"
            >
              {c.next.cta}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* MINE */}
        <section className="mx-auto max-w-[1000px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>{c.mine.eyebrow}</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.mine.title}</h2>
          <div className="mt-8 grid gap-8 rounded-3xl border border-[#EDE9FB] bg-white p-6 shadow-[0_20px_50px_-30px_rgba(93,86,166,0.35)] sm:p-10 md:grid-cols-[200px_1fr]">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="block h-24 w-24 overflow-hidden rounded-full bg-[#E4DFFF]">
                <img src={`${ASSETS}/team/sara.jpg`} alt="Sara Ruiz" width={96} height={96} className="h-full w-full object-cover" />
              </span>
              <p className="mt-4 text-lg font-extrabold text-[#241F33]">Sara Ruiz</p>
              <p className="text-sm font-medium text-[#6A4FA3]">{c.mine.role}</p>
              <a
                href="https://www.linkedin.com/in/sararuiz-ux-ui/"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#DCD5F5] px-3 py-1.5 text-xs font-semibold text-[#5D56A6] hover:bg-[#F1EEFB]"
              >
                <Linkedin size={13} />
                {c.mine.linkedin}
              </a>
              <div className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#F4F2FC] p-4 md:justify-start">
                <div>
                  <p className="text-xl font-extrabold text-[#6A4FA3]">{c.mine.fromValue}</p>
                  <p className="text-[11px] leading-tight text-[#4B4460]">{c.mine.fromLabel}</p>
                </div>
                <ArrowRight size={18} className="shrink-0 text-[#5D56A6]" aria-hidden="true" />
                <div>
                  <p className="text-xl font-extrabold text-[#5D56A6]">{c.mine.toValue}</p>
                  <p className="text-[11px] leading-tight text-[#4B4460]">{c.mine.toLabel}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#4B4460]">
              <p>{c.mine.p1}</p>
              <blockquote className="border-l-4 border-[#B7ADF0] pl-4 text-lg font-semibold italic leading-snug text-[#3A3350]">
                “{c.mine.quote}”
              </blockquote>
              <p>{c.mine.p2}</p>
              <p>{c.mine.p3}</p>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="mx-auto max-w-[1000px] px-4 pb-14 sm:px-6 sm:pb-20">
          <div className="flex items-center gap-2">
            <Users size={18} className="text-[#6A4FA3]" />
            <h2 className="text-lg font-extrabold text-[#241F33] sm:text-xl">{c.team.title}</h2>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {teamBase.map((member) => (
              <li key={member.name} className="flex items-center gap-3 rounded-2xl border border-[#EDE9FB] bg-white p-3">
                <span className="block h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#E4DFFF]">
                  <img
                    src={`${ASSETS}/team/${member.photo}.jpg`}
                    alt={member.name}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-snug text-[#241F33]">{member.name}</p>
                  <p className="text-[11px] text-[#9088B8]">{c.team.roles[member.roleKey]}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {!embedded && (
        <footer className="border-t border-[#EDE9FB] bg-white py-8">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-4 px-4 text-center sm:px-6">
            <img src={`${ASSETS}/flowi-wordmark.png`} alt="Flowi" className="h-6 w-auto object-contain opacity-70" />
            <Link to="/#projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#5D56A6] hover:underline">
              <ArrowLeft size={15} />
              {c.nav.backFull}
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
}
