import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AppLanguage = "es" | "en";
export type AppTheme = "dark" | "light";

type CopyShape = {
  nav: {
    about: string;
    career: string;
    services: string;
    projects: string;
    testimonials: string;
    talk: string;
    cvTip: string;
    menuOpen: string;
    menuClose: string;
    skipToContent: string;
    languageLabel: string;
    themeLight: string;
    themeDark: string;
    motionOn: string;
    motionOff: string;
  };
  footer: {
    about: string;
    portfolioText: string;
    navigation: string;
    networks: string;
    projects: string;
    talk: string;
    signature: string;
  };
};

type PreferencesContextValue = {
  language: AppLanguage;
  setLanguage: (value: AppLanguage) => void;
  theme: AppTheme;
  toggleTheme: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  copy: CopyShape;
};

const STORAGE_KEYS = {
  language: "sara.language",
  theme: "sara.theme",
  reducedMotion: "sara.motion",
} as const;

const copyByLanguage: Record<AppLanguage, CopyShape> = {
  es: {
    nav: {
      about: "Sobre mí",
      career: "Carrera",
      services: "Servicios",
      projects: "Proyectos",
      testimonials: "Testimonios",
      talk: "Hablemos",
      cvTip: "Se abre en nueva pestaña",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      skipToContent: "Saltar al contenido",
      languageLabel: "Idioma",
      themeLight: "Modo claro",
      themeDark: "Modo oscuro",
      motionOn: "Reducir movimiento",
      motionOff: "Movimiento normal",
    },
    footer: {
      about: "Sobre mí",
      portfolioText:
        "Portfolio UX/UI orientado a estrategia, diseño y experiencias digitales con criterio de producto.",
      navigation: "Navegación",
      networks: "Redes",
      projects: "Mis proyectos",
      talk: "Hablemos",
      signature: "Sara Ruiz - Portfolio UX/UI",
    },
  },
  en: {
    nav: {
      about: "About",
      career: "Career",
      services: "Services",
      projects: "Projects",
      testimonials: "Testimonials",
      talk: "Let's talk",
      cvTip: "Opens in a new tab",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      skipToContent: "Skip to content",
      languageLabel: "Language",
      themeLight: "Light mode",
      themeDark: "Dark mode",
      motionOn: "Reduce motion",
      motionOff: "Normal motion",
    },
    footer: {
      about: "About",
      portfolioText:
        "UX/UI portfolio focused on strategy, design, and digital experiences with a product mindset.",
      navigation: "Navigation",
      networks: "Social",
      projects: "My projects",
      talk: "Let's talk",
      signature: "Sara Ruiz - UX/UI Portfolio",
    },
  },
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function getInitialLanguage(): AppLanguage {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem(STORAGE_KEYS.language);
  return saved === "en" || saved === "es" ? saved : "es";
}

function getInitialTheme(): AppTheme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem(STORAGE_KEYS.theme);
  return saved === "light" || saved === "dark" ? saved : "dark";
}

function getInitialMotion(): boolean {
  return false;
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<AppLanguage>(getInitialLanguage);
  const [theme, setTheme] = useState<AppTheme>(getInitialTheme);
  const [reducedMotion, setReducedMotion] = useState<boolean>(getInitialMotion);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.language, language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.reducedMotion, "full");
    document.documentElement.setAttribute("data-motion", "full");
  }, [reducedMotion]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      language,
      setLanguage,
      theme,
      toggleTheme: () => setTheme((prev) => (prev === "dark" ? "light" : "dark")),
      reducedMotion,
      toggleReducedMotion: () => setReducedMotion((prev) => !prev),
      copy: copyByLanguage[language],
    }),
    [language, theme, reducedMotion],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }
  return context;
}
