import { usePreferences } from "@/context/PreferencesContext";

const socialIcons = [
  { label: "WhatsApp", href: "https://wa.me/573021133071", icon: "/Assets/Body/whatsapp.svg" },
  { label: "Email", href: "mailto:saruizdi@gmail.com", icon: "/Assets/Body/email.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sararuiz-ux-ui/", icon: "/Assets/Body/linkedin.svg" },
  { label: "Instagram", href: "https://instagram.com/saridesign__", icon: "/Assets/Body/instagram.svg" },
];

export default function Footer() {
  const { language, setLanguage, copy } = usePreferences();

  const quickLinks = [
    { label: copy.footer.about, href: "#about" },
    { label: copy.nav.career, href: "#career" },
    { label: copy.nav.services, href: "#services" },
    { label: copy.footer.projects, href: "#projects" },
    { label: copy.nav.testimonials, href: "#testimonials" },
    { label: copy.footer.talk, href: "#contact" },
  ];

  return (
    <footer className="border-t border-white/10 bg-[#060606] py-16">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-6 md:px-10 xl:px-16">
        <div className="lux-glass rounded-[30px] p-7 md:p-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-sm">
              <img src="/Assets/Header/LogoSari.png" alt="Logo Sara Ruiz" className="h-10 w-auto" />
              <p className="mt-5 text-sm leading-7 text-white/62">{copy.footer.portfolioText}</p>

              <div className="mt-5 flex items-center gap-2">
                <div className="lux-chip inline-flex items-center rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setLanguage("es")}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] ${
                      language === "es" ? "bg-white text-black" : "text-white/75"
                    }`}
                  >
                    ESP
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage("en")}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.12em] ${
                      language === "en" ? "bg-white text-black" : "text-white/75"
                    }`}
                  >
                    ENG
                  </button>
                </div>

              </div>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
              <div>
                <p className="eyebrow">{copy.footer.navigation}</p>
                <ul className="mt-5 space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-sm text-white/72 transition-colors hover:text-[#d4ff59]">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow">{copy.footer.networks}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {socialIcons.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="lux-chip inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/[0.06]"
                      aria-label={social.label}
                    >
                      <img src={social.icon} alt={social.label} className="h-5 w-5" loading="lazy" decoding="async" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.18em] text-white/35 md:flex-row md:items-center md:justify-between">
          <span>{copy.footer.signature}</span>
          <span>{language === "es" ? "ESP" : "ENG"}</span>
        </div>
      </div>
    </footer>
  );
}

