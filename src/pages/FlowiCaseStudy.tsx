import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Frown,
  Layers,
  Linkedin,
  ListChecks,
  Loader2,
  Lock,
  MinusCircle,
  Play,
  Quote,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UserRound,
  Users,
  Wand2,
  XCircle,
} from "lucide-react";

import { usePreferences, type AppLanguage } from "@/context/PreferencesContext";

const FLOWI_URL = "https://cuxui-flowi.netlify.app/login";
const YOUTUBE_WATCH_URL = "https://www.youtube.com/live/iIGyGMDSfbo?si=cZM6V9KHY8hUrlZu";
const FIGMA_PROCESS_URL = "https://www.figma.com/design/CMRujLgPhwXOyC98efl8x9/Flowi-App--Copy-?node-id=0-1";
const FIGMA_EMBED_URL =
  "https://embed.figma.com/design/CMRujLgPhwXOyC98efl8x9/Flowi-App--Copy-?node-id=0-1&embed-host=share";
const ASSETS = "/Assets/Proyectos/Flowi";

type Strength = "fuerte" | "parcial" | "debil";

/* ----------------------------- non-translatable data ----------------------------- */

const benchmarkMatrix: { app: string; scores: Strength[] }[] = [
  { app: "Cara Care", scores: ["fuerte", "parcial", "debil", "parcial", "debil", "debil", "parcial"] },
  { app: "Bowelle", scores: ["parcial", "parcial", "debil", "debil", "fuerte", "debil", "debil"] },
  { app: "Happy Poop", scores: ["fuerte", "debil", "debil", "debil", "debil", "debil", "debil"] },
];

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
  { name: "Agustina Marino", roleKey: "researcher", photo: "agustina" },
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
      "Flowi es un proyecto de diseño de producto: equipo de 10 diseñadoras y un desarrollador, cubriendo research, UX, UI y writing en siete sprints. Una app de salud intestinal para toda la familia.",
    ctaApp: "Ir a Flowi",
    ctaDemo: "Ver demostración",
    videoLabel: "Video de Flowi: una familia registra sus síntomas y los comparte en consulta médica",
  },
  stats: [
    { value: "41", label: "Entrevistas con usuarios reales" },
    { value: "100%", label: "Confirmó el problema" },
    { value: "7", label: "Sprints de diseño y validación" },
    { value: "MVP", label: "Validación y listo para escalar" },
  ],
  outcome: {
    eyebrow: "Resultado",
    title: "¿Qué logramos con Flowi?",
    intro:
      "Dos minutos para ver el proceso, el equipo y el producto: de la investigación con usuarios reales a un MVP validado y funcionando.",
    learningsTitle: "Aprendizajes del equipo",
    learnings:
      "Diseñar para el hogar completo, y no para un único usuario, obliga a pensar privacidad, permisos y tono desde el primer wireframe, no como un ajuste posterior.",
    impactTitle: "Impacto del producto",
    impact:
      "Un flujo de registro validado en menos de 5 segundos, con historial exportable y una identidad de marca propia lista para escalar más allá del MVP.",
    ctaYoutube: "Ver la demo completa en vivo en YouTube",
    play: "Reproducir video",
    loading: "Cargando video…",
    videoTitle: "Flowi: proceso, equipo y producto",
  },
  product: {
    eyebrow: "El proyecto",
    title: "Descripción del producto",
    paragraphs: [
      "Flowi nace como un proyecto de diseño de producto end-to-end dentro de una comunidad de práctica UX/UI: un equipo de 10 diseñadoras y un desarrollador se propuso resolver un problema real de salud digestiva familiar, cubriendo research, UX, UI y writing a lo largo de siete sprints.",
      "El desafío partió de una oportunidad clara: las personas con malestar intestinal no cuentan con ninguna herramienta pensada para registrar sus síntomas de forma simple, compartirlos en familia y llevarlos a una consulta médica sin vergüenza ni fricción.",
      "El objetivo del MVP era validar que un registro de menos de 5 segundos, sin jerga clínica, podía sostener el hábito más allá de la primera semana, y dejar el producto listo para escalar.",
      "Como equipo cubrimos el proceso completo: investigación con usuarios reales, arquitectura de información, ideación y wireframes, sistema de diseño y prototipo de alta fidelidad, y dos rondas de testing (moderado y no moderado) antes del handoff a desarrollo.",
    ],
    sheetTitle: "Ficha técnica",
    sheet: [
      { label: "Duración", value: "7 sprints" },
      { label: "Equipo", value: "10 diseñadoras UX/UI + 1 desarrollador" },
      { label: "Público objetivo", value: "Personas con malestar intestinal y cuidadores de familia" },
      { label: "Estado actual", value: "Producto vivo: MVP desplegado" },
      { label: "Sector", value: "Wellness · Trackeo personal · PWA" },
      { label: "Mi rol", value: "Researcher: investigación con usuarios y síntesis de hallazgos" },
    ],
    toolsTitle: "Herramientas",
  },
  problem: {
    eyebrow: "Empatizar — Sprint 1",
    titleA: "La ",
    titleB: "brecha",
    titleC: " entre lo que sientes y lo que puedes decirle a tu médico.",
    body: "Las personas con problemas digestivos viven en un punto ciego: entre el síntoma y la consulta médica, no tienen ninguna herramienta que las acompañe. Nadie resolvió cómo una familia completa pueda usarla en conjunto, y el lenguaje clínico incomoda tanto que termina siendo el mayor enemigo del hábito de registrar.",
    quote:
      "Me siento mal porque tengo la panza hinchada y no quiero salir, no quiero ver a nadie... Es toda una cadena, un ciclo de emociones.",
    quoteWho: "Participante de research",
    imageAlt: "Usuaria abrumada por informes médicos, la escala de Bristol y la falta de privacidad al registrar síntomas",
  },
  benchmark: {
    eyebrow: "Research",
    title: "Benchmark",
    intro: "Analizamos las principales apps del segmento para entender sus aciertos, limitaciones y oportunidades.",
    pros: "Ventajas",
    cons: "Desventajas",
    apps: [
      { name: "Cara Care", category: "Salud intestinal", pros: "Educación y contenido de calidad.", cons: "Registro poco flexible y experiencia infantilizada para adultos." },
      { name: "Bowelle", category: "Salud intestinal", pros: "Educación y contenido de calidad.", cons: "Registro poco flexible y experiencia infantilizada para adultos." },
      { name: "Happy Poop", category: "Salud digestiva", pros: "Gamificación atractiva.", cons: "Enfoque infantil y sin integración de emociones o contexto familiar." },
    ],
    columns: ["Registro rápido", "Correlaciones", "Emociones", "Alimentación", "Multiusuario", "Exportar a médico", "Simplicidad"],
    legend: { fuerte: "Fuerte", parcial: "Parcial", debil: "Débil" },
    gap1: "Ninguna app integra emociones, alimentación y síntomas de forma fluida, sin sacrificar simplicidad.",
    gap2: "Ahí está el espacio en blanco.",
  },
  solve: {
    titleA: "Lo que ",
    titleB: "Flowi",
    titleC: " tenía que resolver:",
    objectives: [
      { title: "Registro en menos de 5 segundos", description: "Si el registro es más rápido que el agotamiento, el hábito se sostiene más allá de los primeros 7 días." },
      { title: "Correlaciones automáticas", description: "El usuario no quiere analizar sus propios datos: quiere que la app le diga qué los está causando." },
      { title: "Historial exportable para el médico", description: "Que la consulta no vuelva a empezar de cero." },
      { title: "Cero vergüenza, cero jerga clínica", description: "Iconografía y lenguaje que un adolescente pueda usar en público sin incomodidad." },
      { title: "Privacidad como punto de entrada", description: "Visibilidad familiar para quien cuida, sin exponer a quien es cuidado." },
    ],
    lead: "Cinco objetivos clave que definieron el rumbo del producto y guiaron cada decisión de diseño.",
    gaps: [
      { title: "Apps existentes: clínicas o infantiles", description: "El mercado resuelve para un extremo u otro. Ninguna app fue pensada para una familia con edades mixtas bajo un mismo techo." },
      { title: "El lenguaje clínico avergüenza", description: "Términos médicos como “Escala de Bristol” generan distancia. La vergüenza compite directamente con la formación del hábito." },
      { title: "Tracking manual insostenible", description: "Llevar la cuenta a mano se pierde bajo estrés y no escala a más de un miembro del hogar." },
      { title: "Nadie resuelve lo familiar", description: "Cuidadores necesitan visibilidad de varios miembros del hogar sin invadir la privacidad de cada uno." },
    ],
  },
  define: {
    eyebrow: "Definir — Sprint 2",
    titleA: "Convertir el registro diario en un hábito posible y ",
    titleB: "humano.",
    p1: "Flowi acompaña al usuario en su rutina digestiva con un sistema simple, empático y motivador.",
    p2: "Diseñamos una experiencia que reduce la fricción, genera confianza y entrega insights accionables, tanto para quien registra como para quien cuida.",
  },
  ia: {
    eyebrow: "Arquitectura de información",
    title: "Jerarquía y flujos de Flowi",
    sitemap: [
      { title: "Inicio", items: ["Alertas", "Panel personal", "Panel familiar", "Panel simplificado"] },
      { title: "Actividad / Registros", items: ["Selección de miembro", "Patrones por miembro", "Filtros", "Nivel de detalle"] },
      { title: "CTA (+)", items: ["Registro rápido", "Registro extendido", "Confirmación"] },
      { title: "Reportes / Historial", items: ["Historial cronológico", "Selección de rango", "Vista previa", "Exportar datos propios"] },
      { title: "Usuario", items: ["Configuración personal", "Perfil personal", "Gestión del hogar"] },
    ],
  },
  persona: {
    eyebrow: "Usuario objetivo",
    title: "Persona",
    name: "Cindy, 38 años",
    role: "Cuidadora familiar · Administradora del hogar",
    meta: "3 hijos · 1 adulto mayor · SII diagnosticado",
    goalsTitle: "Objetivos",
    goals: ["Entender qué le pasa", "Cuidar a su familia", "Llegar preparada a la consulta"],
    frustrationsTitle: "Frustraciones",
    frustrations: ["Registrar es tedioso.", "Se siente juzgada.", "Pierde el hábito fácilmente."],
    needsTitle: "Necesidades",
    needs: ["Registro simple e inmediato.", "Ver patrones claros.", "Compartir información con su médico."],
    alt: "Cindy, persona representativa de Flowi",
    journeyTitle: "Journey map",
    flowi: "Flowi",
    journey: [
      { phase: "Siente el malestar", emotion: "Preocupación", flowi: "Registro inmediato" },
      { phase: "Intenta registrar", emotion: "Agotamiento", flowi: "Mínima fricción" },
      { phase: "Abandona el hábito", emotion: "Culpa", flowi: "Recordatorios discretos" },
      { phase: "Consulta médica", emotion: "Vergüenza", flowi: "Historial exportable" },
      { phase: "Recae de nuevo", emotion: "Frustración", flowi: "IA identifica correlaciones" },
    ],
  },
  proto: {
    eyebrow: "Idear y prototipar — Sprints 3 a 5",
    title: "Del wireframe al prototipo funcional",
    intro:
      "De flujos en baja fidelidad pasamos a un prototipo de alta fidelidad para el registro diario, apoyado en un sistema de diseño propio basado en Material 3.",
    liveLabel: "Prototipo de alta fidelidad · App en vivo",
    liveText: "Pruébala aquí mismo: es la app real, desplegada como PWA. Crea un registro, explora el home y el historial.",
    liveHint: "Si el acceso con Google no abre dentro del celular, entra con email o abre la app en una pestaña nueva.",
    liveCta: "Abrir Flowi en pestaña nueva",
    liveTitle: "Flowi: app en vivo",
    brandTitle: "Identidad de marca: dos caminos",
    brandP1:
      "Exploramos dos propuestas con el mismo símbolo: una verde, cercana a la naturaleza y la calma (A), y una violeta, que comunica confianza, bienestar y cuidado (B). Las evaluamos con criterios de accesibilidad (contraste WCAG AA), claridad, consistencia y tono del producto.",
    brandP2:
      "Elegimos la violeta: se diferencia del azul frío de las apps médicas tradicionales y se siente moderna, humana y cálida. El logo nace de una forma fluida y continua, como el sistema digestivo que Flowi acompaña.",
    brandAlt: "Propuestas A (verde) y B (violeta) de la identidad de Flowi aplicadas al home de la app",
    uiKitTitle: "UI Kit: basado en Material 3",
    typography: "Tipografía",
    colorNames: {
      primary: "Primary",
      secondary: "Secondary",
      tertiary: "Tertiary",
      primaryContainer: "Primary Container",
      surface: "Surface",
      onSurface: "On Surface",
    },
  },
  test: {
    eyebrow: "Testear — Sprints 6 y 7",
    title: "Validación con usuarios reales",
    lowTitle: "Testing de baja fidelidad",
    lowText: "Validamos la estructura y el flujo principal antes de invertir en diseño visual.",
    low: [
      { value: "80%", label: "completó la tarea principal." },
      { value: "3 de 5", label: "usuarios entendieron el acceso al registro." },
      { value: "Fricción", label: "el texto libre generó fricción en el flujo." },
    ],
    mazeTitle: "Testing no moderado: Maze",
    mazeText: "Validamos la estructura en Maze para medir comprensión y éxito en tareas clave.",
    maze: [
      { value: "40", label: "participantes en total formaron parte del testeo no moderado." },
      { value: "86%", label: "encontró cómo registrar en el primer intento." },
      { value: "↓ Tiempo", label: "reducción del tiempo necesario para completar el registro." },
    ],
    mazeCallout: "La navegación ya no se cuestiona: el esfuerzo se dirige a completar la tarea.",
    modTitle: "Testing moderado final",
    modText:
      "Validamos con usuarios reales en sesiones moderadas para profundizar en percepciones y emociones: 6 personas, prototipo funcional, sesiones moderadas.",
    moderated: [
      { title: "Mayor claridad de flujo", description: "Los usuarios entendieron el camino sin necesidad de ayuda." },
      { title: "Menos dudas al registrar síntomas", description: "El usuario percibe la experiencia de manera simple y natural." },
      { title: "Más confianza para llevar información al médico", description: "El historial exportable fue positivamente valorado por los usuarios." },
    ],
    quotes: [
      { text: "Ahora entiendo mejor el flujo, todo se siente más claro y directo.", who: "Participante 02" },
      { text: "Me dio más confianza saber que puedo llevar mi información al médico.", who: "Participante 04" },
    ],
    motto: "Diseñamos con datos. Decidimos con empatía.",
  },
  figma: {
    eyebrow: "Proceso completo",
    title: "Explora el Figma de trabajo",
    text: "Research, flujos, wireframes, sistema de diseño y prototipos: el archivo donde el equipo trabajó cada sprint.",
    open: "Abrir en Figma",
    iframeTitle: "Figma de trabajo de Flowi",
  },
  next: {
    eyebrow: "Cierre",
    title: "¿Qué sigue para Flowi?",
    intro: "El MVP validó el problema y la solución. Estos son los próximos pasos para llevarlo más lejos.",
    steps: [
      { title: "Escalar el MVP", description: "Ampliar la base de usuarios y familias para seguir validando que el hábito se sostiene más allá de la primera semana." },
      { title: "Insights con IA", description: "Cruzar síntomas, alimentación y emociones para sugerir correlaciones: la promesa central del producto." },
      { title: "Reporte médico validado", description: "Revisar el historial exportable con profesionales de la salud para que la consulta nunca empiece de cero." },
      { title: "Privacidad familiar avanzada", description: "Roles y permisos más finos entre quien cuida y quien es cuidado." },
    ],
    cta: "Probar Flowi",
  },
  team: {
    title: "El equipo",
    objective: "Nuestro objetivo: ayudar a las personas a comprender lo que sienten y a comunicarlo mejor en sus consultas médicas.",
    roles: {
      lead: "Design Lead",
      researcher: "Researcher",
      generalist: "UX Generalista",
      writer: "UX Writer",
      ui: "UI Designer",
      dev: "Desarrollador",
    } as Record<string, string>,
  },
  tools: ["Figma", "FigJam", "Miro", "Notion", "Slack", "Google Meet", "Maze", "Adobe Illustrator", "Stitch", "Lovable", "Claude", "GitHub", "Lápiz y papel"],
};

const en: typeof es = {
  nav: { back: "Portfolio", backFull: "Back to Sara Ruiz's portfolio", language: "Language" },
  hero: {
    chips: ["UX Research", "UI Design", "Product Strategy", "Design System"],
    title: "So that talking about what happens in the bathroom is as normal at home as talking about the weather.",
    subtitle:
      "Flowi is a product design project: a team of 10 designers and one developer covering research, UX, UI and writing over seven sprints. A gut health app for the whole family.",
    ctaApp: "Go to Flowi",
    ctaDemo: "Watch the demo",
    videoLabel: "Flowi video: a family logs their symptoms and shares them at a medical appointment",
  },
  stats: [
    { value: "41", label: "Interviews with real users" },
    { value: "100%", label: "Confirmed the problem" },
    { value: "7", label: "Design and validation sprints" },
    { value: "MVP", label: "Validated and ready to scale" },
  ],
  outcome: {
    eyebrow: "Outcome",
    title: "What did we achieve with Flowi?",
    intro:
      "Two minutes to see the process, the team and the product: from research with real users to a validated, working MVP.",
    learningsTitle: "Team learnings",
    learnings:
      "Designing for the whole household, not a single user, means thinking about privacy, permissions and tone from the very first wireframe, not as a later adjustment.",
    impactTitle: "Product impact",
    impact:
      "A logging flow validated at under 5 seconds, with an exportable history and its own brand identity, ready to scale beyond the MVP.",
    ctaYoutube: "Watch the full live demo on YouTube",
    play: "Play video",
    loading: "Loading video…",
    videoTitle: "Flowi: process, team and product",
  },
  product: {
    eyebrow: "The project",
    title: "Product overview",
    paragraphs: [
      "Flowi started as an end-to-end product design project inside a UX/UI practice community: a team of 10 designers and one developer set out to solve a real family digestive health problem, covering research, UX, UI and writing across seven sprints.",
      "The challenge came from a clear opportunity: people with gut discomfort have no tool designed to log their symptoms simply, share them with family and bring them to a medical appointment without shame or friction.",
      "The goal of the MVP was to validate that logging in under 5 seconds, without clinical jargon, could sustain the habit beyond the first week, and leave the product ready to scale.",
      "As a team we covered the whole process: research with real users, information architecture, ideation and wireframes, design system and high-fidelity prototype, and two rounds of testing (moderated and unmoderated) before the handoff to development.",
    ],
    sheetTitle: "Project sheet",
    sheet: [
      { label: "Duration", value: "7 sprints" },
      { label: "Team", value: "10 UX/UI designers + 1 developer" },
      { label: "Target audience", value: "People with gut discomfort and family caregivers" },
      { label: "Current status", value: "Live product: MVP deployed" },
      { label: "Sector", value: "Wellness · Personal tracking · PWA" },
      { label: "My role", value: "Researcher: user research and synthesis of findings" },
    ],
    toolsTitle: "Tools",
  },
  problem: {
    eyebrow: "Empathize — Sprint 1",
    titleA: "The ",
    titleB: "gap",
    titleC: " between what you feel and what you can tell your doctor.",
    body: "People with digestive issues live in a blind spot: between the symptom and the appointment, they have no tool that accompanies them. Nobody solved how a whole family could use one together, and clinical language is so uncomfortable that it ends up being the biggest enemy of the logging habit.",
    quote:
      "I feel bad because my belly is bloated and I don't want to go out, I don't want to see anyone... It's a whole chain, a cycle of emotions.",
    quoteWho: "Research participant",
    imageAlt: "A user overwhelmed by medical reports, the Bristol scale and the lack of privacy when logging symptoms",
  },
  benchmark: {
    eyebrow: "Research",
    title: "Benchmark",
    intro: "We analyzed the main apps in the segment to understand their strengths, limitations and opportunities.",
    pros: "Strengths",
    cons: "Weaknesses",
    apps: [
      { name: "Cara Care", category: "Gut health", pros: "Quality education and content.", cons: "Inflexible logging and a childish experience for adults." },
      { name: "Bowelle", category: "Gut health", pros: "Quality education and content.", cons: "Inflexible logging and a childish experience for adults." },
      { name: "Happy Poop", category: "Digestive health", pros: "Engaging gamification.", cons: "Child-oriented and no integration of emotions or family context." },
    ],
    columns: ["Quick logging", "Correlations", "Emotions", "Food", "Multi-user", "Export to doctor", "Simplicity"],
    legend: { fuerte: "Strong", parcial: "Partial", debil: "Weak" },
    gap1: "No app fluidly integrates emotions, food and symptoms without sacrificing simplicity.",
    gap2: "That is the white space.",
  },
  solve: {
    titleA: "What ",
    titleB: "Flowi",
    titleC: " had to solve:",
    objectives: [
      { title: "Logging in under 5 seconds", description: "If logging is faster than exhaustion, the habit lasts beyond the first 7 days." },
      { title: "Automatic correlations", description: "Users don't want to analyze their own data: they want the app to tell them what is causing it." },
      { title: "Exportable history for the doctor", description: "So the appointment never starts from scratch." },
      { title: "Zero shame, zero clinical jargon", description: "Iconography and language a teenager could use in public without discomfort." },
      { title: "Privacy as the entry point", description: "Family visibility for the caregiver, without exposing the person being cared for." },
    ],
    lead: "Five key goals that set the direction of the product and guided every design decision.",
    gaps: [
      { title: "Existing apps: clinical or childish", description: "The market solves for one extreme or the other. No app was designed for a family of mixed ages under one roof." },
      { title: "Clinical language causes shame", description: "Medical terms like “Bristol scale” create distance. Shame competes directly with habit formation." },
      { title: "Manual tracking is unsustainable", description: "Keeping count by hand falls apart under stress and doesn't scale to more than one household member." },
      { title: "Nobody solves the family side", description: "Caregivers need visibility into several household members without invading each person's privacy." },
    ],
  },
  define: {
    eyebrow: "Define — Sprint 2",
    titleA: "Turn daily logging into a habit that is possible and ",
    titleB: "human.",
    p1: "Flowi accompanies users in their digestive routine with a simple, empathetic and motivating system.",
    p2: "We designed an experience that reduces friction, builds trust and delivers actionable insights, for the person logging and the person caring.",
  },
  ia: {
    eyebrow: "Information architecture",
    title: "Flowi hierarchy and flows",
    sitemap: [
      { title: "Home", items: ["Alerts", "Personal dashboard", "Family dashboard", "Simplified dashboard"] },
      { title: "Activity / Logs", items: ["Member selection", "Patterns by member", "Filters", "Level of detail"] },
      { title: "CTA (+)", items: ["Quick log", "Extended log", "Confirmation"] },
      { title: "Reports / History", items: ["Chronological history", "Range selection", "Preview", "Export own data"] },
      { title: "User", items: ["Personal settings", "Personal profile", "Household management"] },
    ],
  },
  persona: {
    eyebrow: "Target user",
    title: "Persona",
    name: "Cindy, 38 years old",
    role: "Family caregiver · Household manager",
    meta: "3 kids · 1 older adult · diagnosed IBS",
    goalsTitle: "Goals",
    goals: ["Understand what is happening to her", "Take care of her family", "Arrive prepared to the appointment"],
    frustrationsTitle: "Frustrations",
    frustrations: ["Logging is tedious.", "She feels judged.", "She loses the habit easily."],
    needsTitle: "Needs",
    needs: ["Simple, immediate logging.", "Clear patterns.", "Share information with her doctor."],
    alt: "Cindy, a representative Flowi persona",
    journeyTitle: "Journey map",
    flowi: "Flowi",
    journey: [
      { phase: "Feels discomfort", emotion: "Worry", flowi: "Instant logging" },
      { phase: "Tries to log", emotion: "Exhaustion", flowi: "Minimal friction" },
      { phase: "Drops the habit", emotion: "Guilt", flowi: "Discreet reminders" },
      { phase: "Medical appointment", emotion: "Shame", flowi: "Exportable history" },
      { phase: "Relapses", emotion: "Frustration", flowi: "AI finds correlations" },
    ],
  },
  proto: {
    eyebrow: "Ideate and prototype — Sprints 3 to 5",
    title: "From wireframe to working prototype",
    intro:
      "From low-fidelity flows we moved to a high-fidelity prototype for daily logging, backed by our own design system based on Material 3.",
    liveLabel: "High-fidelity prototype · Live app",
    liveText: "Try it right here: this is the real app, deployed as a PWA. Create a log, explore the home screen and the history.",
    liveHint: "If Google sign-in doesn't open inside the phone, sign in with email or open the app in a new tab.",
    liveCta: "Open Flowi in a new tab",
    liveTitle: "Flowi: live app",
    brandTitle: "Brand identity: two paths",
    brandP1:
      "We explored two proposals with the same symbol: a green one, close to nature and calm (A), and a violet one, conveying trust, wellbeing and care (B). We evaluated them on accessibility (WCAG AA contrast), clarity, consistency and product tone.",
    brandP2:
      "We chose violet: it stands apart from the cold blue of traditional medical apps and feels modern, human and warm. The logo comes from a fluid, continuous shape, like the digestive system Flowi accompanies.",
    brandAlt: "Flowi brand proposals A (green) and B (violet) applied to the app home screen",
    uiKitTitle: "UI Kit: based on Material 3",
    typography: "Typography",
    colorNames: {
      primary: "Primary",
      secondary: "Secondary",
      tertiary: "Tertiary",
      primaryContainer: "Primary Container",
      surface: "Surface",
      onSurface: "On Surface",
    },
  },
  test: {
    eyebrow: "Test — Sprints 6 and 7",
    title: "Validation with real users",
    lowTitle: "Low-fidelity testing",
    lowText: "We validated the structure and main flow before investing in visual design.",
    low: [
      { value: "80%", label: "completed the main task." },
      { value: "3 of 5", label: "users understood how to access logging." },
      { value: "Friction", label: "free text created friction in the flow." },
    ],
    mazeTitle: "Unmoderated testing: Maze",
    mazeText: "We validated the structure in Maze to measure comprehension and success on key tasks.",
    maze: [
      { value: "40", label: "participants in total took part in the unmoderated test." },
      { value: "86%", label: "found how to log on the first attempt." },
      { value: "↓ Time", label: "reduction in the time needed to complete a log." },
    ],
    mazeCallout: "Navigation is no longer questioned: the effort goes into completing the task.",
    modTitle: "Final moderated testing",
    modText:
      "We validated with real users in moderated sessions to dig deeper into perceptions and emotions: 6 people, working prototype, moderated sessions.",
    moderated: [
      { title: "Clearer flow", description: "Users understood the path without needing help." },
      { title: "Fewer doubts when logging symptoms", description: "Users perceive the experience as simple and natural." },
      { title: "More confidence bringing information to the doctor", description: "The exportable history was positively valued by users." },
    ],
    quotes: [
      { text: "Now I understand the flow better, everything feels clearer and more direct.", who: "Participant 02" },
      { text: "It gave me more confidence to know I can take my information to the doctor.", who: "Participant 04" },
    ],
    motto: "We design with data. We decide with empathy.",
  },
  figma: {
    eyebrow: "Full process",
    title: "Explore the working Figma file",
    text: "Research, flows, wireframes, design system and prototypes: the file where the team worked through every sprint.",
    open: "Open in Figma",
    iframeTitle: "Flowi working Figma file",
  },
  next: {
    eyebrow: "Closing",
    title: "What's next for Flowi?",
    intro: "The MVP validated the problem and the solution. These are the next steps to take it further.",
    steps: [
      { title: "Scale the MVP", description: "Grow the base of users and families to keep validating that the habit lasts beyond the first week." },
      { title: "AI-powered insights", description: "Cross symptoms, food and emotions to suggest correlations: the core promise of the product." },
      { title: "Validated medical report", description: "Review the exportable history with health professionals so appointments never start from scratch." },
      { title: "Advanced family privacy", description: "Finer roles and permissions between the caregiver and the person being cared for." },
    ],
    cta: "Try Flowi",
  },
  team: {
    title: "The team",
    objective: "Our goal: help people understand what they feel and communicate it better in their medical appointments.",
    roles: {
      lead: "Design Lead",
      researcher: "Researcher",
      generalist: "UX Generalist",
      writer: "UX Writer",
      ui: "UI Designer",
      dev: "Developer",
    } as Record<string, string>,
  },
  tools: ["Figma", "FigJam", "Miro", "Notion", "Slack", "Google Meet", "Maze", "Adobe Illustrator", "Stitch", "Lovable", "Claude", "GitHub", "Pen and paper"],
};

const copyByLanguage: Record<AppLanguage, typeof es> = { es, en };

/* --------------------------------- components --------------------------------- */

function StrengthDot({ level, label }: { level: Strength; label: string }) {
  if (level === "fuerte") return <CheckCircle2 size={18} className="text-[#5D56A6]" aria-label={label} />;
  if (level === "parcial") return <MinusCircle size={18} className="text-[#9C93D6]" aria-label={label} />;
  return <XCircle size={18} className="text-[#D8D4EC]" aria-label={label} />;
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6A4FA3]">{children}</p>;
}

/** Video pesado: no descarga nada hasta que la sección está cerca y arranca al primer clic. */
function LazyVideo({
  src,
  poster,
  title,
  playLabel,
  loadingLabel,
}: {
  src: string;
  poster: string;
  title: string;
  playLabel: string;
  loadingLabel: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [buffering, setBuffering] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    const video = ref.current;
    if (!node || !video || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          video.preload = "auto";
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const start = () => {
    const video = ref.current;
    if (!video) return;
    setStarted(true);
    setBuffering(true);
    video.preload = "auto";
    video.play().catch(() => setBuffering(false));
  };

  return (
    <div ref={wrapRef} className="relative aspect-video w-full bg-black">
      <video
        ref={ref}
        className="h-full w-full"
        poster={poster}
        controls={started}
        playsInline
        preload="none"
        title={title}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onCanPlay={() => setBuffering(false)}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={playLabel}
          className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-[#5D56A6] shadow-xl sm:h-20 sm:w-20">
            <Play size={28} fill="currentColor" className="ml-1" />
          </span>
        </button>
      )}
      {started && buffering && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 text-white">
          <Loader2 className="animate-spin" size={30} />
          <span className="text-xs font-semibold">{loadingLabel}</span>
        </div>
      )}
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
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <SectionEyebrow>{c.outcome.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{c.outcome.title}</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/75">{c.outcome.intro}</p>

            <div className="mt-8 grid items-start gap-8 md:grid-cols-[1.35fr_1fr]">
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <LazyVideo
                  src={`${ASSETS}/resumen.mp4`}
                  poster={`${ASSETS}/resumen-poster.jpg`}
                  title={c.outcome.videoTitle}
                  playLabel={c.outcome.play}
                  loadingLabel={c.outcome.loading}
                />
              </div>

              <div className="space-y-5 text-[15px] leading-relaxed text-white/80">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/50">{c.outcome.learningsTitle}</p>
                  <p className="mt-1.5">{c.outcome.learnings}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white/50">{c.outcome.impactTitle}</p>
                  <p className="mt-1.5">{c.outcome.impact}</p>
                </div>
                <a
                  href={YOUTUBE_WATCH_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  <Play size={14} fill="currentColor" />
                  {c.outcome.ctaYoutube}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT DESCRIPTION + SHEET */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
            <div>
              <SectionEyebrow>{c.product.eyebrow}</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.product.title}</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#4B4460]">
                {c.product.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#EDE9FB] bg-white p-6 shadow-[0_20px_50px_-30px_rgba(93,86,166,0.35)] sm:p-8">
              <h3 className="text-sm font-bold uppercase tracking-wide text-[#6A4FA3]">{c.product.sheetTitle}</h3>
              <dl className="mt-5 space-y-4">
                {c.product.sheet.map((row) => (
                  <div key={row.label} className="border-b border-[#F1EEFB] pb-4 last:border-0 last:pb-0">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[#9088B8]">{row.label}</dt>
                    <dd className="mt-1 text-sm font-medium text-[#241F33]">{row.value}</dd>
                  </div>
                ))}
              </dl>
              <h4 className="mt-6 text-xs font-bold uppercase tracking-wide text-[#6A4FA3]">{c.product.toolsTitle}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.tools.map((tool) => (
                  <span key={tool} className="rounded-full bg-[#F1EEFB] px-3 py-1.5 text-xs font-semibold text-[#5D56A6]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EMPATHIZE */}
        <section className="bg-[#EFECFB] py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1100px] gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14">
            <div>
              <SectionEyebrow>{c.problem.eyebrow}</SectionEyebrow>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight text-[#241F33] sm:text-3xl md:text-[2rem]">
                {c.problem.titleA}
                <span className="text-[#6A4FA3]">{c.problem.titleB}</span>
                {c.problem.titleC}
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#4B4460]">{c.problem.body}</p>
              <blockquote className="relative mt-7 rounded-2xl bg-white p-6 shadow-[0_20px_50px_-30px_rgba(93,86,166,0.35)]">
                <Quote className="text-[#D8D0F5]" size={28} />
                <p className="mt-2 text-base italic leading-relaxed text-[#3A3350]">“{c.problem.quote}”</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#9088B8]">{c.problem.quoteWho}</p>
              </blockquote>
            </div>
            <div className="flex items-center justify-center">
              <img
                src={`${ASSETS}/problema.webp`}
                alt={c.problem.imageAlt}
                className="w-full max-w-[520px] rounded-3xl object-contain"
              />
            </div>
          </div>
        </section>

        {/* BENCHMARK */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>{c.benchmark.eyebrow}</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.benchmark.title}</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-[#4B4460]">{c.benchmark.intro}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {c.benchmark.apps.map((app) => (
              <div key={app.name} className="rounded-2xl border border-[#EDE9FB] bg-white p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#241F33]">{app.name}</h3>
                <p className="text-xs font-medium text-[#9088B8]">{app.category}</p>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#5D56A6]">{c.benchmark.pros}</p>
                  <p className="mt-1 text-sm text-[#4B4460]">{app.pros}</p>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#B0538B]">{c.benchmark.cons}</p>
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
                  {c.benchmark.columns.map((col) => (
                    <th key={col} className="px-3 py-3 text-center">
                      {col}
                    </th>
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
                          <StrengthDot level={score} label={c.benchmark.legend[score]} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-wrap items-center gap-4 border-t border-[#F1EEFB] px-4 py-3 text-xs text-[#9088B8]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#5D56A6]" /> {c.benchmark.legend.fuerte}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MinusCircle size={14} className="text-[#9C93D6]" /> {c.benchmark.legend.parcial}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <XCircle size={14} className="text-[#D8D4EC]" /> {c.benchmark.legend.debil}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-[#5D56A6] p-6 text-white sm:p-7">
            <p className="text-base font-semibold leading-relaxed sm:text-lg">
              {c.benchmark.gap1}
              <br />
              {c.benchmark.gap2}
            </p>
          </div>
        </section>

        {/* WHAT FLOWI HAD TO SOLVE */}
        <section className="bg-[#F4F2FC] py-14 sm:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <div className="grid gap-10 md:grid-cols-[1fr_0.9fr]">
              <div>
                <h2 className="text-2xl font-extrabold leading-tight text-[#241F33] sm:text-3xl">
                  {c.solve.titleA}
                  <span className="text-[#6A4FA3]">{c.solve.titleB}</span>
                  {c.solve.titleC}
                </h2>
                <ol className="mt-8 space-y-4">
                  {c.solve.objectives.map((objective, index) => {
                    const Icon = objectiveIcons[index];
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
                <p className="text-lg font-semibold leading-relaxed text-[#3A3350]">{c.solve.lead}</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {c.solve.gaps.map((gap) => (
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

        {/* DEFINE */}
        <section className="bg-[#5D56A6] py-14 text-white sm:py-16">
          <div className="mx-auto grid max-w-[1100px] gap-8 px-4 sm:px-6 md:grid-cols-[1fr_1px_1fr] md:gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">{c.define.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
                {c.define.titleA}
                <span className="text-[#D8D0F5]">{c.define.titleB}</span>
              </h2>
            </div>
            <div className="hidden bg-white/25 md:block" />
            <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
              <p>{c.define.p1}</p>
              <p>{c.define.p2}</p>
            </div>
          </div>
        </section>

        {/* IA */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>{c.ia.eyebrow}</SectionEyebrow>
          <h2 className="mt-3 flex items-center gap-2 text-2xl font-extrabold text-[#241F33] sm:text-3xl">
            <Layers size={22} className="text-[#6A4FA3]" />
            {c.ia.title}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {c.ia.sitemap.map((branch) => (
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
            <SectionEyebrow>{c.persona.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.persona.title}</h2>

            <div className="mt-8 grid gap-8 rounded-3xl border border-[#EDE9FB] bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[220px_1fr]">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <img
                  src={`${ASSETS}/persona-cindy.jpg`}
                  alt={c.persona.alt}
                  className="h-40 w-40 rounded-full object-cover object-top shadow-md"
                />
                <h3 className="mt-4 text-xl font-extrabold text-[#241F33]">{c.persona.name}</h3>
                <p className="text-sm font-medium text-[#6A4FA3]">{c.persona.role}</p>
                <p className="mt-2 text-xs text-[#9088B8]">{c.persona.meta}</p>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#5D56A6]">
                    <Target size={14} /> {c.persona.goalsTitle}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#4B4460]">
                    {c.persona.goals.map((g) => (
                      <li key={g}>• {g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#B0538B]">
                    <Frown size={14} /> {c.persona.frustrationsTitle}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#4B4460]">
                    {c.persona.frustrations.map((f) => (
                      <li key={f}>• {f}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#5D56A6]">
                    <ListChecks size={14} /> {c.persona.needsTitle}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-sm text-[#4B4460]">
                    {c.persona.needs.map((n) => (
                      <li key={n}>• {n}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-bold text-[#241F33]">{c.persona.journeyTitle}</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-5">
                {c.persona.journey.map((step, index) => (
                  <div key={step.phase} className="rounded-2xl border border-[#EDE9FB] bg-white p-4">
                    <p className="text-xs font-bold text-[#9088B8]">0{index + 1}</p>
                    <p className="mt-1 text-sm font-bold text-[#241F33]">{step.phase}</p>
                    <p className="text-xs italic text-[#B0538B]">{step.emotion}</p>
                    <div className="mt-3 rounded-lg bg-[#F4F2FC] px-2.5 py-2 text-xs font-medium text-[#5D56A6]">
                      {c.persona.flowi}: {step.flowi}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* IDEATE / PROTOTYPE */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>{c.proto.eyebrow}</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.proto.title}</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-[#4B4460]">{c.proto.intro}</p>

          {/* Live app inside a phone */}
          <div className="mt-8 grid items-center gap-8 rounded-3xl bg-[#5D56A6] p-6 sm:p-10 md:grid-cols-[1fr_auto]">
            <div className="text-white">
              <p className="text-sm font-bold uppercase tracking-wide text-white/70">{c.proto.liveLabel}</p>
              <p className="mt-3 max-w-md text-lg font-semibold leading-relaxed">{c.proto.liveText}</p>
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

            <div className="relative mx-auto h-[660px] w-[320px] max-w-full rounded-[3rem] border-[11px] border-[#16131F] bg-[#16131F] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              <div
                className="pointer-events-none absolute left-1/2 top-1.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-[#16131F]"
                aria-hidden="true"
              />
              <iframe
                src={FLOWI_URL}
                title={c.proto.liveTitle}
                className="h-full w-full rounded-[2.2rem] bg-white"
                allow="clipboard-write; fullscreen"
              />
            </div>
          </div>

          {/* Branding */}
          <div className="mt-14 grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-[#241F33]">
                <Sparkles size={18} className="text-[#6A4FA3]" />
                {c.proto.brandTitle}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B4460]">{c.proto.brandP1}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#4B4460]">{c.proto.brandP2}</p>
            </div>
            <img
              src={`${ASSETS}/branding-ab.jpg`}
              alt={c.proto.brandAlt}
              width={2000}
              height={1500}
              className="w-full rounded-3xl border border-[#EDE9FB] bg-white shadow-sm"
            />
          </div>

          {/* UI kit */}
          <div className="mt-14">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[#241F33]">
              <Sparkles size={18} className="text-[#6A4FA3]" />
              {c.proto.uiKitTitle}
            </h3>
            <div className="mt-6 grid gap-5 md:grid-cols-[1fr_1.6fr]">
              <div className="rounded-2xl bg-[#5D56A6] p-6 text-white">
                <p className="text-xs font-bold uppercase tracking-wide text-white/70">{c.proto.typography}</p>
                <p className="mt-2 text-4xl font-extrabold">Manrope</p>
                <p className="mt-3 text-sm text-white/80">Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Ññ 0123456789</p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {brandColors.map((color) => (
                  <div key={color.hex} className="overflow-hidden rounded-2xl border border-[#EDE9FB]">
                    <div className="h-20" style={{ backgroundColor: color.hex }} />
                    <div className="bg-white px-3 py-2">
                      <p className="text-[11px] font-bold text-[#241F33]">{color.hex}</p>
                      <p className="text-[10px] text-[#9088B8]">{c.proto.colorNames[color.key]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEST */}
        <section className="bg-[#F4F2FC] py-14 sm:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <SectionEyebrow>{c.test.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.test.title}</h2>

            <div className="mt-8 rounded-3xl border border-[#EDE9FB] bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#241F33]">{c.test.lowTitle}</h3>
              <p className="mt-1 text-sm text-[#4B4460]">{c.test.lowText}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {c.test.low.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#F4F2FC] p-5">
                    <p className="text-2xl font-extrabold text-[#5D56A6]">{item.value}</p>
                    <p className="mt-1 text-xs text-[#4B4460]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-[#EDE9FB] bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#241F33]">{c.test.mazeTitle}</h3>
              <p className="mt-1 text-sm text-[#4B4460]">{c.test.mazeText}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {c.test.maze.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-[#F4F2FC] p-5">
                    <p className="text-2xl font-extrabold text-[#5D56A6]">{item.value}</p>
                    <p className="mt-1 text-xs text-[#4B4460]">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-[#5D56A6] p-5 text-sm font-semibold text-white">{c.test.mazeCallout}</div>
            </div>

            <div className="mt-6 rounded-3xl border border-[#EDE9FB] bg-white p-6 sm:p-8">
              <h3 className="text-lg font-bold text-[#241F33]">{c.test.modTitle}</h3>
              <p className="mt-1 text-sm text-[#4B4460]">{c.test.modText}</p>
              <div className="mt-5 divide-y divide-[#F1EEFB]">
                {c.test.moderated.map((finding) => (
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
                {c.test.quotes.map((q) => (
                  <figure key={q.who} className="rounded-2xl bg-[#F4F2FC] p-5">
                    <Quote size={20} className="text-[#B7ADF0]" />
                    <blockquote className="mt-2 text-sm italic leading-relaxed text-[#3A3350]">“{q.text}”</blockquote>
                    <figcaption className="mt-2 text-xs font-semibold text-[#5D56A6]">{q.who}</figcaption>
                  </figure>
                ))}
              </div>
            </div>
            <p className="mt-8 text-center text-lg italic text-[#6A4FA3]">{c.test.motto}</p>
          </div>
        </section>

        {/* FIGMA */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <SectionEyebrow>{c.figma.eyebrow}</SectionEyebrow>
          <h2 className="mt-3 text-2xl font-extrabold text-[#241F33] sm:text-3xl">{c.figma.title}</h2>
          <p className="mt-3 max-w-2xl text-[15px] text-[#4B4460]">{c.figma.text}</p>
          <div className="mt-6 overflow-hidden rounded-3xl border border-[#EDE9FB] bg-white shadow-sm">
            <iframe
              src={FIGMA_EMBED_URL}
              title={c.figma.iframeTitle}
              className="h-[520px] w-full sm:h-[640px]"
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
        <section className="bg-[#241F33] py-14 text-white sm:py-20">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <SectionEyebrow>{c.next.eyebrow}</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">{c.next.title}</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/75">{c.next.intro}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.next.steps.map((step, index) => {
                const Icon = nextStepIcons[index];
                return (
                  <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5D56A6]">
                      <Icon size={18} />
                    </span>
                    <p className="mt-4 text-sm font-bold">{step.title}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/70">{step.description}</p>
                  </div>
                );
              })}
            </div>
            <a
              href={FLOWI_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#5D56A6]"
            >
              {c.next.cta}
              <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* TEAM */}
        <section className="mx-auto max-w-[1100px] px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-[#6A4FA3]" />
            <h2 className="text-xl font-extrabold text-[#241F33] sm:text-2xl">{c.team.title}</h2>
          </div>
          <p className="mt-2 max-w-xl text-sm text-[#4B4460]">{c.team.objective}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {teamBase.map((member) => (
              <li key={member.name} className="flex items-center gap-4 rounded-2xl border border-[#EDE9FB] bg-white p-4">
                {member.photo ? (
                  <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#E4DFFF]">
                    <img
                      src={`${ASSETS}/team/${member.photo}.jpg`}
                      alt={member.name}
                      width={56}
                      height={56}
                      className="h-full w-full scale-[1.15] object-cover"
                    />
                  </span>
                ) : (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#8079D6] text-lg font-bold text-white">
                    {member.name[0]}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug text-[#241F33]">{member.name}</p>
                  <p className="text-xs text-[#9088B8]">{c.team.roles[member.roleKey]}</p>
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
